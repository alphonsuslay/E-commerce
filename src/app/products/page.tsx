import MaxWidthWrapper from "@/components/custom/MaxWidthWrapper";
import ProductSection from "@/components/custom/ProductsPage/ProductsSection";



const ProductPage = () => {
  return (
    <MaxWidthWrapper>
      <ProductSection
        title="Products"
        href="/products"
        subtitle="Our Collection"
      ></ProductSection>
    </MaxWidthWrapper>
  );
};

export default ProductPage;
