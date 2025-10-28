import { redirect } from "next/navigation";

export default function ProductDetailRedirect({ 
  params 
}: { 
  params: { slug: string } 
}) {
  redirect(`/id/product/${params.slug}`); // redirect ke bahasa default
}
