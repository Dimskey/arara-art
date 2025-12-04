import { Suspense } from 'react';
import Header from "@/components/layout/Header";
import ProductClient from "./ProductClient";

export default async function ProductsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="text-lg">Loading products...</p>
          </div>
        </div>
      }>
        <ProductClient lang={lang} />
      </Suspense>
    </>
  );
}