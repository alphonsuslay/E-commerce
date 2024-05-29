import Link from "next/link";
import { ProductDocument } from "@/models/ProductDocument";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "../addToCartButton";

interface ProductListingProps {
  products: ProductDocument[];
}

const ProductListing: React.FC<ProductListingProps> = (props) => {
  const featuredProducts = props.products;
  console.log(featuredProducts);

  return (
    <>
      {featuredProducts.length === 0 ? (
        <div className="w-full h-20 flex items-center flex-col gap-y-10">
          <p className="text-center justify-center font-mono">
            No new products at the moment
          </p>
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
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
                      <dt className="sr-only">Title</dt>
                        <dd className="font-medium">{item.name}</dd>
                        
                      </div>

                      <div className="flex justify-between">
                      <dt className="sr-only">Price</dt>
                        <dd className="text-sm text-gray-500">${item.price}</dd>
                        {item.Featured ? (
                          <Badge variant="destructive">NEW!</Badge>
                        ) : null}
                      </div>
                    </dl>
                    <div className="py-2">
                      <AddToCartButton
                        variant="default"
                        cartState={false}
                        product={item}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ProductListing;
