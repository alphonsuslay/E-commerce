"use strict"
"use client"
import { Button } from "@/components/ui/button";
import { File } from "lucide-react";
import { ProductDocument } from "@/models/ProductDocument";

export default function ExportProductBtn({ data }: { data: ProductDocument[] })  {

  const handleExport = () => {
    // Convert data to CSV format
    const csv = convertToCSV(data);

    // Create a Blob from the CSV data
    const blob = new Blob([csv], { type: "text/csv" });

    // Create a URL for the Blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");
    link.href = url;
    link.download = "products.csv";

    // Simulate click event to trigger download
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: ProductDocument[]) => {
    const header = Object.keys(data[0]).join(",") + "\n";
    const body = data
      .map((item) =>
        Object.values(item)
          .map((value) => {
            // Escape double quotes by replacing them with two double quotes
            if (typeof value === "string") {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value;
          })
          .join(",")
      )
      .join("\n");
    return header + body;
  };
  

  return (
    <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Export
                </span>
              </Button>
  );
}