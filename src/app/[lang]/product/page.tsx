"use client";
import Header from "@/components/layout/Header";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { allProductsQuery } from "@/sanity/queries/product";
import { useLang } from "@/contexts/langContext";
import { useSearchParams } from "next/navigation";

export default function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [loading, setLoading] = useState<boolean>(true);
  const searchParams = useSearchParams();

  const { lang, t } = useLang();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Ambil produk berdasarkan bahasa aktif
        const fetchedProducts = await client.fetch(allProductsQuery, { lang });

        // Hitung jumlah produk per kategori
        const categoryCountMap: Record<string, number> = {};
        fetchedProducts.forEach((p: any) => {
          const cat = p.category || t("product.uncategorized");
          categoryCountMap[cat] = (categoryCountMap[cat] || 0) + 1;
        });

        const categoryList = Object.entries(categoryCountMap).map(
          ([name, count]) => ({ name, count })
        );

        // Tambahkan kategori "All" di depan
        setCategories([{ name: t("product.all"), count: fetchedProducts.length }, ...categoryList]);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [lang, t]);

  // Handle category from URL params
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(t("product.all"));
    }
  }, [searchParams, t]);

  // Filter produk berdasarkan kategori
  const filteredProducts =
    selectedCategory === t("product.all")
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Update URL without page reload
    const url = new URL(window.location.href);
    if (category === t("product.all")) {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    window.history.pushState({}, '', url.toString());
  };

  return (
    <>
      <Header />

      <section className="max-w-7xl mx-auto px-6 py-12 transition-colors duration-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* === Sidebar Kategori === */}
          <aside className="md:col-span-1">
            <h2 className="text-sm font-semibold uppercase tracking-widest mb-4 text-[var(--color-accent)]">
              {t("product.category")}
            </h2>

            <div className="flex md:flex-col gap-2 md:gap-3 flex-wrap md:flex-nowrap border-r-2 pr-4 ">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg border text-sm transition-all duration-200 ${
                    selectedCategory === cat.name
                      ? "bg-[var(--color-foreground)] text-[var(--color-background)] border-[var(--color-foreground)] font-semibold"
                      : "border-[var(--color-border)] hover:border-[var(--color-foreground)]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span
                    className={`text-xs ${
                      selectedCategory === cat.name
                        ? "text-[var(--color-background)]"
                        : "text-[var(--color-accent)]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* === Grid Produk === */}
          <div className="md:col-span-3">
            <h1 className="text-3xl font-semibold tracking-widest mb-8">
              {selectedCategory === t("product.all")
                ? t("product.allProducts")
                : selectedCategory}
            </h1>

            {loading ? (
              <p className="text-center text-neutral-500">{t("product.loading")}</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-center text-neutral-500">
                {t("product.emptyCategory")}
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((item) => {
                  const imageUrl =
                    item.images && item.images.length > 0 ? item.images[0].url : null;

                  return (
                    <Link
                      key={item.slug}
                      href={`/${lang}/product/${item.slug}`}
                      className="border border-[var(--color-border)] rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all bg-[var(--color-card)]"
                    >
                      <div className="aspect-square relative bg-[var(--color-muted)]">
                        {imageUrl ? (
                          <Image
                            src={imageUrl}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
                            No Image
                          </div>
                        )}
                      </div>

                      <div className="p-5">
                        <h3 className="font-medium text-lg mb-1">{item.title}</h3>
                        <p className="text-[var(--color-accent)] font-semibold">
                          Rp.
                          {item.price != null
                            ? item.price.toLocaleString("id-ID")
                            : "N/A"}
                          {item.discountPrice && (
                            <span className="text-neutral-400 line-through ml-2 text-sm">
                              Rp.{item.discountPrice.toLocaleString("id-ID")}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
