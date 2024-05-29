import Link from "next/link";
import ProductListing from "./ProductListing";
import { ProductDocument } from "@/models/ProductDocument";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

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

const ProductReel = async (props: ProductReelProps) => {
  const { title, subtitle, href } = props;

  const data = await getData();
  //console.log(data)

  let filteredProducts: ProductDocument[] = []; // Declare filteredProducts as an array

  if (data) {
    filteredProducts = data.filter((product) => product.State === "Active");
    filteredProducts = filteredProducts.filter(
      (product) => product.Featured === true
    );

    //console.log(filteredProducts);
  }

  return (
    <>
      <section className="py-12">
        <div className="md:flex md:items-center md:justify-between mb-4">
          <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
            {title ? (
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {title}
              </h1>
            ) : null}
            {filteredProducts.length === 0 ? null : (
              <>
                {subtitle ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                ) : null}
              </>
            )}
          </div>

          {href ? (
            <Link
              href={href}
              className="hidden text-sm font-medium text-black hover:text-gray-800 md:block"
            >
              Shop our collection<span aria-hidden="true">&rarr;</span>
            </Link>
          ) : null}
        </div>

        <div className="relative">
          <div className="mt-6 flex items-center w-full">
            <ProductListing products={filteredProducts} />
          </div>
        </div>
      </section>
    </>
  );
};
export default ProductReel;
