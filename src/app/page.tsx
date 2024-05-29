import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import { ArrowDownToLine, CheckCircle, Leaf } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/custom/Header/Navbar";
import ProductReel from "@/components/custom/FeaturedSection/ProductReels";
import Footer from "@/components/custom/Footer";


const perks = [
  {
    name: "Instant Delivery",
    Icon: ArrowDownToLine,
    description:
      "Get your assets delivered to your email in seconds and download them right away.",
  },
  {
    name: "Guaranteed Quality",
    Icon: CheckCircle,
    description:
      "Every asset on our platform is verified by our team to ensure our highest quality standards. Not happy? We offer a 30-day refund guarantee.",
  },
  {
    name: "For the Planet",
    Icon: Leaf,
    description:
      "We've pledged 1% of sales to the preservation and restoration of the natural environment.",
  },
];

export default function Home() {
  return (
    <>
      <Navbar />

      <div className="flex-grow flex-1">
        <MaxWidthWrapper>
          <div className="bg-white">
            <section className="bg-white ">
              <div className="container px-6 py-16 mx-auto text-center">
                <div className="max-w-lg mx-auto">
                  <h1 className="text-4xl font-bold text-gray-800 dark:text-white lg:text-4xl">
                    Your marketplace for high-quality digital assets.
                  </h1>
                  <p className="mt-6 text-gray-500 dark:text-gray-300">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Libero similique obcaecati illum mollitia.
                  </p>
                  <Link href="#">
                    {" "}
                    <button className="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
                      Browse Trending
                    </button>
                  </Link>

                  <p className="mt-3 text-sm text-gray-400 ">
                    No credit card required
                  </p>
                </div>
              </div>
            </section>
          </div>

          <ProductReel title="Brand New" href="/products" subtitle="Our new electronic devices!!"/>

        </MaxWidthWrapper>

        <section className="border-t">
          <MaxWidthWrapper className="py-20">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
              {perks.map((perk) => (
                <div
                  key={perk.name}
                  className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                >
                  <div className="md:flex-shrink-0 flex justify-center">
                    <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                      {<perk.Icon className="w-1/3 h-1/3" />}
                    </div>
                  </div>

                  <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                    <h3 className="text-base font-medium text-gray-900">
                      {perk.name}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {perk.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </MaxWidthWrapper>
        </section>
      </div>
      <Footer />

    </>
  );
}
