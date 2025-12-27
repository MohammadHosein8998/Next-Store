import ProductsContainer from "@/components/products/ProductsContainer";

type searchProps = {
  searchParams: Promise<{ layout?: string; search?: string }>;
};

async function page({ searchParams }: searchProps) {
  const params = await searchParams;
  const layout = params.layout || "grid";
  const search = params.search || "";
  return <ProductsContainer layout={layout} search={search} />;
}

export default page;
