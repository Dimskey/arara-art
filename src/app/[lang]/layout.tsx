export default async function LangLayout({ 
  children, 
  params 
}: { 
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <section data-lang={lang}>
      {children}
    </section>
  );
}

export function generateStaticParams() {
  return [
    { lang: "id" },
    { lang: "en" },
  ];
}