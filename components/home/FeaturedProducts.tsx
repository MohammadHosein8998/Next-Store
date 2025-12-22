import { getSearchProducts } from "@/utils/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeatureProduct() {
  const products = await getSearchProducts({ featured: true });
  if (products.length == 0) return <EmptyList />;
  
  return (
    <section className="pt-24 ">
      <SectionTitle text="feature Products" />
      <ProductsGrid products={products} />
    </section>
  );
}

export default FeatureProduct;
