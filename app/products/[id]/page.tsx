import { fetchSingleProduct } from "@/utils/actions";
import Image from "next/image";
import { formatCurrency } from "@/utils/format";
import FavoriteToggleButton from "@/components/products/FavoriteToggleButton";
import AddToCart from "@/components/single-product/AddToCart";
import ProductRating from "@/components/single-product/ProductRating";
import BreadCrumbs from "@/components/single-product/BreadCrumbs";

type PageProps = {
  params: Promise<{ id: string }>;
};

async function SingleProductPage({ params }: PageProps) {
  // const productId = await params?.id;
  const { id } = await params;
  const product = await fetchSingleProduct(id);
  const { name, image, company, description, price } = product;
  const dollarAmount = formatCurrency(price);
  console.log(product);
  return (
    <section>
      <BreadCrumbs name={name} />
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16 ">
        {/* IMAGE FIRST COL */}
        <div className="relative h-full">
          <Image
            src={image}
            alt={name}
            unoptimized
            fill
            sizes="(max-width: 768px ) 100vw , (max-width: 1200px ) 50vw , 33vw"
            priority
            className="w-full rounded object-cover "
          />
        </div>
        {/* PRODUCT INFO SECOND COL */}
        <div>
          <div className="flex gap-x-8 items-center">
            <h1 className="capitalize text-3xl font-bold ">{name}</h1>
            <FavoriteToggleButton productId={id} />
          </div>
        <ProductRating productId={id} />
          <h4 className="text-xl mt-2">{company}</h4>
          <p className="mt-4 text-md bg-muted inline-block p-2 rounded">
            {dollarAmount}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">{description}</p>
          <AddToCart productId={id} />
        </div>
      </div>
    </section>
  );
}

export default SingleProductPage;
