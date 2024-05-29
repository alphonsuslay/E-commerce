"use client";
import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button"; 
import { useCart } from "@/hooks/use-cart";
import { ProductDocument } from "@/models/ProductDocument";

interface VariantProps {
  variant: String;
  cartState: boolean;
  product: ProductDocument;
}

const AddToCartButton: React.FC<VariantProps> = ({ variant, cartState, product }) => {
  const { addItem } = useCart()
  const [successState, setSuccessState] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccessState(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, [successState]);

  return (
    <Button className="w-full gap-2" variant={variant} onClick={() => {
      addItem(product)
      setSuccessState(true)
    }}>
      {successState ? "Added" : "Add to Cart"}
      {cartState ? <ShoppingCart /> : null}
    </Button>
  );
};

export default AddToCartButton;


