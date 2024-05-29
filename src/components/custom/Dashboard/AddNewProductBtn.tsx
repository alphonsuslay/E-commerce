"use client"
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { X, PlusCircle, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Prop {
  dataIndex: number;
}


const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  return toast.error("Feature currently not available", {
    duration: 2000,
  });
};
export default function AddNewProductBtn({dataIndex} : Prop) {
  
  const productImg = "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
  const productId = dataIndex;
  const [productState, setProductState] = useState("Active");
  const [productHighlight, setProductHighlight] = useState(true.toString());

  const handleSave = async () => {
    try {
      const ProductName = (document.getElementById("ProductName") as HTMLInputElement).value;
      const ProductDescription = (
        document.getElementById("ProductDescription") as HTMLTextAreaElement
      ).value;
      const Productquantity = parseInt(
        (document.getElementById("Productquantity") as HTMLInputElement).value
      );
      const Productprice = parseFloat(
        (document.getElementById("Productprice") as HTMLInputElement).value
      );
      const Productstatus = productState;
      const ProductId = productId;
      const featured = productHighlight === "True" ? true : false;


      if (!ProductName || !ProductDescription) {
        toast.error("General Product information is not filled", {
          duration: 4000,
          className: "text-red-300",
        });
        throw new Error("Name is required");
      }
      
      // Check if Productquantity and price are valid numbers and greater than or equal to 0
      if (isNaN(Productquantity) || Productquantity < 0 || isNaN(Productprice) || Productprice < 0) {
        toast.error("Error: Quantity and price must be valid numbers and greater than or equal to 0", {
          duration: 4000,
          className: "text-red-300",
        });
        throw new Error("Quantity and price must be valid numbers and greater than or equal to 0");
      }

      const newProductDetails = {
        name: ProductName,
        description: ProductDescription,
        quantity: Productquantity,
        price: Productprice,
        State: Productstatus,
        img: productImg,
        id: productId,
        Featured: featured,
      };



      /*const response = await fetch("/api/dashboard/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProductDetails),
      });

      if (response.ok) {
        return (
          toast("New Product Added", {
            description: "Name: " + ProductName,
            closeButton: true,
            duration: 4000,
          })
        )

      } else {
        console.error("Failed to add new product");
      } */
      

    } catch (error) {
      console.error("Error occurred while saving product info:", error);
    }
  }

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold flex justify-between">
              <div>Add New Product</div>
              <AlertDialogCancel>
                {" "}
                <X />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="Product Name">Product Name</Label>
                    <Input
                      id="ProductName"
                      type="text"
                      className="w-full"
                      defaultValue=""
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="Product Description">
                      Product Description
                    </Label>
                    <Textarea
                      id="ProductDescription"
                      className="min-h-32"
                      defaultValue=""
                    />
                  </div>
                </div>
                <div className="gap-4 py-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">SKU</TableHead>
                        <TableHead>Stock</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell id="productId" className="font-semibold">
                          {productId}
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="stock-1" className="sr-only">
                            Stock
                          </Label>
                          <Input id="Productquantity" type="number" defaultValue="1" />
                        </TableCell>
                        <TableCell>
                          <Label htmlFor="price-1" className="sr-only">
                            Price
                          </Label>
                          <Input id="Productprice" type="number" defaultValue="1" />
                        </TableCell>
                        <TableCell>
                          <ToggleGroup
                            type="single"
                            defaultValue="s"
                            variant="outline"
                          ></ToggleGroup>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>

                <div className="flex gap-6">
                  <div className="flex-1">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Product Status</Label>
                      <Select onValueChange={(value) => setProductState(value)}>
                        <SelectTrigger id="Productstatus" aria-label="Select status">
                          <SelectValue placeholder={productState} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Draft">Draft</SelectItem>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid gap-3">
                      <Label htmlFor="status">Highlight</Label>
                      <Select onValueChange={(value) => setProductHighlight(value)}>
                        <SelectTrigger
                          id="ProductHighlight"
                          aria-label="T/F Highlight"
                        >
                          <SelectValue placeholder={productHighlight} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="True">True</SelectItem>
                          <SelectItem value="False">False</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="gap-4 py-4">
                  <Label htmlFor="ProductImage">Product Image</Label>
                  <div className="w-full">
                    <Label
                      htmlFor="file-upload"
                      className="flex aspect-square w-14 h-14 justify-center rounded-md border border-dashed cursor-pointer text-sm flex-col items-center" // Added flex properties for centering
                    >
                      <Upload className="h-4 text-muted-foreground w-full" />
                      <span className="sr-only">Upload</span>
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>

                <div className="flex">
                  <Button className="w-full" onClick={handleSave}>Save</Button>
                </div>
              </CardContent>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
