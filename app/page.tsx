import LoadingContainer from "@/components/global/LoadingContainer";
import FeatureProduct from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

function HomePage() {
  return (
    <div>
      <Hero />
      {/* <LoadingContainer/> */}
      <Suspense fallback={<LoadingContainer/>}>
        <FeatureProduct />
      </Suspense>
    </div>
  );
}

export default HomePage;
