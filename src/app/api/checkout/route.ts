import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const getActiveProducts = async () => {
  const checkProducts = await stripe.products.list();
  const availableProducts = checkProducts.data.filter(
    (product: any) => product.active === true
  );
  return availableProducts;
};

export const POST = async (request: any) => {
  try {
    const requestBody = await request.json();
    const activeProducts = await getActiveProducts();
    const stripeItems: any[] = [];

    for (const item of requestBody) {
      const { product } = item;
      const productName = product.name.toLowerCase();

      try {
        const stripeProduct = activeProducts.find(
          (stripeProduct: any) =>
            stripeProduct.name.toLowerCase() === productName
        );

        if (!stripeProduct) {
          const prod = await stripe.products.create({
            name: product.name,
            default_price_data: {
              unit_amount: product.price * 100,
              currency: "sgd",
            },
          });
          console.log("Created new Product");
        }
        // Push product to stripeItems for checkout session
        stripeItems.push({
          price: stripeProduct?.default_price,
          quantity: 1,
        });
      } catch (error) {
        console.error("Error in processing product", error);
        throw error;
      }
    }

    const session = await stripe.checkout.sessions.create({
      line_items: stripeItems,
      mode: "payment",
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error during checkout:", error);
  }
};
