import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import Link from "next/link";
import { Check, Shield, ChevronLeft, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { ProductDocument } from "@/models/ProductDocument";
import { Badge } from "@/components/ui/badge";
import AddToCartButton from "@/components/custom/addToCartButton";


interface PageProps {
  params: {
    productid: string; // Change to lowercase
  };
}

export const revalidate = 0; // this is the new line added

async function getData(): Promise<ProductDocument[] | undefined> {
  try {
    const res = await fetch("http://localhost:3000/api/fetch", {
      headers: {
        "Cache-Control": "no-store", // Disable caching
      },
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return undefined;
  }
}

const ProductIDPage = async ({ params }: PageProps) => {
  const productId = params.productid.toLowerCase();

  const data = await getData();
  let filteredData: ProductDocument | undefined; // Declare filteredData here

  if (data) {
    filteredData = data.find(product => product.id === productId); // Use find() instead of filter() to get a single item
    //console.log(filteredData);
  }

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Products", href: "/products" },
    { id: 3, name: filteredData?.name, href: `/products/${productId}` },
  ];  

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="py-8">
        <div className="mx-auto max-w-2xl px-4 sm:px-0 sm:py-4 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 ">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {filteredData?.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  ${filteredData?.price}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {filteredData?.Featured ? (
                    <Badge className="" variant="destructive">
                      NEW!
                    </Badge>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {filteredData?.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-5 w-5 flex-shrink-0 text-green-500"
                />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
              <div className="mt-6 group inline-flex text-sm text-medium">
                <Shield
                  aria-hidden="true"
                  className="mr-2 h-5 w-5 flex-shrink-0 text-gray-400"
                />
                <span className="text-muted-foreground hover:text-gray-700">
                  30 Day Return Guarantee
                </span>
              </div>
            </section>
          </div>

          {/* Product images */}
          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              {filteredData && (
                <img
                  src={filteredData.img}
                  alt="Product Image"
                  width={800}
                  height={533}
                  className="aspect-square rounded-lg"
                />
              )}
            </div>
          </div>

          {/* add to cart part */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10 flex gap-5">
                <Link href="/products" className="w-full">
                  <Button className="w-full gap-2">
                    {" "}
                    <ChevronLeft /> Back
                  </Button>
                </Link>
                <AddToCartButton variant="default" cartState={true} product={filteredData} />
              </div>
              <div className="mt-6 text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ProductIDPage;
