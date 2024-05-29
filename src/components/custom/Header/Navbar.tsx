import MaxWidthWrapper from "../MaxWidthWrapper";
import { Icons } from "../../icons/Icons";
import NavItems from "./NavItems";
import Cart from "@/components/custom/Cart/Cart";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import UserAccountNav from "./UserAccountNav";
import { getServerSession } from "next-auth";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const user = await getServerSession();
  //console.log(user);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <MobileNav />

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {user ? null : (
                    <Link
                      href="/login"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Sign In
                    </Link>
                  )}
                  {user ? null : (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  )}{" "}
                  {user ? (
                    <UserAccountNav user={user} /> 
                  ) : (
                    <Link
                      href="/register"
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span
                      className="h-6 w-px bg-gray-200"
                      aria-hidden="true"
                    ></span>
                  ) : null}
                  {user ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      ></span>
                    </div>
                  )}
                 
                </div>
                <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
