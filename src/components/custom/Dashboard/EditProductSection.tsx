"use client";
import { useState } from "react";
import { toast } from "sonner"
import Link from "next/link";
import { ChevronLeft, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup } from "@/components/ui/toggle-group";
import { ProductDocument } from "@/models/ProductDocument";

interface ProductProp {
  products: ProductDocument[];
}

const EditProductSection: React.FC<ProductProp> = (props) => {
  const filteredData = props.products[0];
  //console.log(filteredData);

  const [productState, setProductState] = useState(filteredData.State);
  const [productHighlight, setProductHighlight] = useState((filteredData.Featured).toString());


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    return (
      toast("Feature currently not available", {
        duration: 2000
      })
    )
  };
  
  
  

  const handleSave = async () => {
    try {

      const name = (document.getElementById("name") as HTMLInputElement).value;
      const description = (document.getElementById("description") as HTMLTextAreaElement).value;
      const quantity = parseInt((document.getElementById("quantity") as HTMLInputElement).value);
      const price = parseFloat((document.getElementById("price") as HTMLInputElement).value);
      const state = productState;
      const id = filteredData.id;
      const featured = productHighlight === "True" ? true : false;

      if (!name || !description) {
        toast.error("General Product information is not filled", {
          duration: 4000,
          className: "text-red-300",
        });
        throw new Error("Name is required");
      }
      
      // Check if quantity and price are valid numbers and greater than or equal to 0
      if (isNaN(quantity) || quantity < 0 || isNaN(price) || price < 0) {
        toast.error("Error: Quantity and price must be valid numbers and greater than or equal to 0", {
          duration: 4000,
          className: "text-red-300",
        });
        throw new Error("Quantity and price must be valid numbers and greater than or equal to 0");
      }

      const updatedProductDetails = {
        name: name,
        description: description,
        quantity: quantity,
        price: price,
        State: state,
        id: id,
        Featured: featured,
      };


      const response = await fetch("/api/dashboard/saveProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProductDetails),
      });

      if (response.ok) {
        return (
          toast("Product has been updated", {
            description: "Name: " + name,
            closeButton: true,
            duration: 4000,
          })
        )

      } else {
        console.error("Failed to save product");
      }

    } catch (error) {
      console.error("Error occurred while saving product:", error);
    }
  };

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products">
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
        </Link>
        <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
          {filteredData.name}
        </h1>
        {filteredData.quantity >= 1 ? (
          <Badge variant="outline" className="ml-auto sm:ml-0 bg-green-300">
            In stock
          </Badge>
        ) : (
          <Badge variant="outline" className="ml-auto sm:ml-0 bg-red-300">
            No stock
          </Badge>
        )}

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button id="DesktopSaveBtn" size="sm" onClick={handleSave}>
            Save Product
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
        <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-0">
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    className="w-full"
                    defaultValue={filteredData.name}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    className="min-h-32"
                    defaultValue={filteredData.description}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-07-chunk-1">
            <CardHeader>
              <CardTitle>Stock</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      {filteredData.id}
                    </TableCell>
                    <TableCell>
                      <Label htmlFor="stock-1" className="sr-only">
                        Stock
                      </Label>
                      <Input
                        id="quantity"
                        type="number"
                        defaultValue={filteredData.quantity}
                      />
                    </TableCell>
                    <TableCell>
                      <Label htmlFor="price-1" className="sr-only">
                        Price
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        defaultValue={filteredData.price}
                      />
                    </TableCell>
                    <TableCell>
                      <ToggleGroup
                        type="single"
                        defaultValue="s"
                        variant="outline"
                      ></ToggleGroup>
                    </TableCell>
                  </TableRow>

                  {/*<TableRow>
                          <TableCell className="font-semibold">
                            GGPC-002
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-2" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-2"
                              type="number"
                              defaultValue="143"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-2" className="sr-only">
                              Price
                            </Label>
                            <Input
                              id="price-2"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="m"
                              variant="outline"
                            >
                            </ToggleGroup>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-semibold">
                            GGPC-003
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="stock-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="stock-3"
                              type="number"
                              defaultValue="32"
                            />
                          </TableCell>
                          <TableCell>
                            <Label htmlFor="price-3" className="sr-only">
                              Stock
                            </Label>
                            <Input
                              id="price-3"
                              type="number"
                              defaultValue="99.99"
                            />
                          </TableCell>
                          <TableCell>
                            <ToggleGroup
                              type="single"
                              defaultValue="s"
                              variant="outline"
                            >
                            </ToggleGroup>
                          </TableCell>
                        </TableRow> */}
                </TableBody>
              </Table>
            </CardContent>
            {/**<CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Variant
                    </Button>
                      </CardFooter> **/}
          </Card>
          {/**  <Card x-chunk="dashboard-07-chunk-2">
            <CardHeader>
              <CardTitle>Product Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-3">
                <div className="grid gap-3">
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clothing">NIL</SelectItem>
                      <SelectItem value="electronics">NIL</SelectItem>
                      <SelectItem value="accessories">NIL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="subcategory">Subcategory (optional)</Label>
                  <Select>
                    <SelectTrigger
                      id="subcategory"
                      aria-label="Select subcategory"
                    >
                      <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="t-shirts">NIL</SelectItem>
                      <SelectItem value="hoodies">NIL</SelectItem>
                      <SelectItem value="sweatshirts">NIL</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card> **/}
        </div>
        <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
          <Card x-chunk="dashboard-07-chunk-3">
            <CardHeader>
              <CardTitle>Product Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={(value) => setProductState(value)}>
                    <SelectTrigger id="status" aria-label="Select status">
                      <SelectValue placeholder={filteredData.State} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardContent>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="status">Highlight</Label>
                  <Select onValueChange={(value) => setProductHighlight(value)}>
                    <SelectTrigger id="Highlight" aria-label="T/F Highlight">
                      <SelectValue
                        placeholder={filteredData.Featured ? "True" : "False"}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="True">True</SelectItem>
                      <SelectItem value="False">False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <img
                  id="image"
                  alt="Product image"
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  src={filteredData.img}
                  width="300"
                />
                <div className="grid grid-cols-3 gap-2">
                  <label
                    htmlFor="file-upload"
                    className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                  >
                    <Upload className="h-4 text-muted-foreground" />
                    <span className="sr-only">Upload</span>
                  </label>
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload}/>
                </div>
              </div>
            </CardContent>
          </Card>
          {/** <Card x-chunk="dashboard-07-chunk-5">
            <CardHeader>
              <CardTitle>Archive Product</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div></div>
              <Button size="sm" variant="secondary">
                Archive Product
              </Button>
            </CardContent>
          </Card> **/}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 md:hidden">
        <Button variant="outline" size="sm">
          Discard
        </Button>
        <Button id="MobileSaveBtn" size="sm" onClick={handleSave}>
          Save Product
        </Button>
      </div>
    </div>
  );
};

export default EditProductSection;
