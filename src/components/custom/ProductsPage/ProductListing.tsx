"use client";
import Link from "next/link";
import { ProductDocument } from "@/models/ProductDocument";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "../addToCartButton";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductListingProps {
  products: ProductDocument[];
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
  const featuredProducts = props.products;
  //console.log(featuredProducts);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, featuredProducts.length * 10);
  }, [featuredProducts.length]);

  if (isVisible == false)
    return <ProductPlaceholder count={featuredProducts.length} />;

  return (
    <>
      {featuredProducts.length === 0 ? (
        <div className="w-full h-20 items-center gap-y-10">
          <Separator />
          <p className="text-center justify-center font-mono">
            No new products at the moment
          </p>
        </div>
      ) : (
        <>
          {featuredProducts.map((item) => (
            <div key={item.id}>
              <div className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
                <Link href={`/products/${item.id}`}>
                  <img
                    alt=""
                    src={item.img}
                    className="h-56 w-full rounded-md object-cover"
                  />
                </Link>

                <div className="mt-2">
                  <dl>
                    <div>
                      <dt className="sr-only">Price</dt>
                      <dd className="text-sm text-gray-500">${item.price}</dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="sr-only">Title</dt>
                      <dd className="font-medium">{item.name}</dd>
                      {item.Featured ? (
                        <Badge variant="destructive">NEW!</Badge>
                      ) : null}
                    </div>
                  </dl>
                  <div className="py-2">
                    <AddToCartButton
                      variant="ghost"
                      cartState={false}
                      product={item}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

const ProductPlaceholder: React.FC<{ count: number }> = ({ count }) => {
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index} className='flex flex-col w-full'>
          <div className='relative bg-zinc-100 aspect-square w-full overflow-hidden rounded-xl'>
            <Skeleton className='h-full w-full' />
          </div>
          <Skeleton className='mt-2 w-12 h-3 rounded-lg' />
          <div className="flex justify-between items-center">
            <Skeleton className='mt-2 w-24 h-3 rounded-lg' />
            <Skeleton className='mt-2 w-12 h-6 rounded-lg' />
          </div>
          <Skeleton className='mt-2 w-full h-8 rounded-lg' />
        </div>
      ))}
    </>
  );
};


export default ProductListing;
