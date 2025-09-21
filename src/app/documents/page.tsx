"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  Plus,
  Eye,
  Edit,
  Trash2,
  FileText,
  SlidersHorizontal,
  ListChecks
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function DocumentCard({
  title,
  date,
  type,
  pages,
  exhibits,
  size,
  status,
}: {
  title: string;
  date: string;
  type: string;
  pages: number;
  exhibits: number;
  size: string;
  status: "Processed" | "Processing" | "Error";
}) {
  let statusColor;
  switch (status) {
    case "Processed":
      statusColor = "bg-emerald-100 text-emerald-700";
      break;
    case "Processing":
      statusColor = "bg-yellow-100 text-yellow-700";
      break;
    case "Error":
      statusColor = "bg-red-100 text-red-700";
      break;
    default:
      statusColor = "bg-gray-100 text-gray-700";
  }

  return (
    <div className="border rounded-xl p-4 space-y-2 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
        <Badge className={statusColor}>{status}</Badge>
      </div>
      <p className="text-xs text-gray-500">{date}</p>
      <div className="text-sm text-gray-600 grid grid-cols-2 gap-2">
        <div>
          Type: <span className="font-medium">{type}</span>
        </div>
        <div>
          Pages: <span className="font-medium">{pages}</span>
        </div>
        <div>
          Exhibits: <span className="font-medium">{exhibits}</span>
        </div>
        <div>
          Size: <span className="font-medium">{size}</span>
        </div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <Button variant="ghost" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Edit className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon">
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export default function DocumentsPage() {
  const [statusFilter, setStatusFilter] = useState<"All" | "Processed" | "Processing" | "Error">("All");
  const [searchTerm, setSearchTerm] = useState<string>(""); // Added search term state

  const handleStatusFilter = (status: "All" | "Processed" | "Processing" | "Error") => {
    setStatusFilter(status);
  };

  const filteredDocuments = React.useMemo(() => {
    const documents = [
      {
        title: "Johnson, Mary",
        date: "Jan 15, 2024",
        type: "Medical Records",
        pages: 487,
        exhibits: 23,
        size: "12.4 MB",
        status: "Processed" as const,
      },
      {
        title: "Smith, Robert",
        date: "Jan 14, 2024",
        type: "Hospital Records",
        pages: 234,
        exhibits: 15,
        size: "8.7 MB",
        status: "Processing" as const,
      },
      {
        title: "Davis, Jennifer",
        date: "Jan 13, 2024",
        type: "Complete File",
        pages: 651,
        exhibits: 31,
        size: "18.2 MB",
        status: "Error" as const,
      },
      {
        title: "Wilson, Michael",
        date: "Jan 12, 2024",
        type: "Specialist Reports",
        pages: 298,
        exhibits: 19,
        size: "9.8 MB",
        status: "Processed" as const,
      },
      {
        title: "Brown, Sarah",
        date: "Jan 11, 2024",
        type: "Lab Results",
        pages: 156,
        exhibits: 12,
        size: "5.3 MB",
        status: "Processed" as const,
      },
      {
        title: "Taylor, James",
        date: "Jan 10, 2024",
        type: "Medical Records",
        pages: 423,
        exhibits: 28,
        size: "14.1 MB",
        status: "Processing" as const,
      },
    ];

    let filtered = documents;

    if (statusFilter !== "All") {
      filtered = filtered.filter((doc) => doc.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((doc) =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [statusFilter, searchTerm]);

  return (
    <div className="space-y-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-gray-800">Documents</h1>
          <p className="text-sm text-gray-600">Manage and process your medical documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Files
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Case
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Input
          type="search"
          placeholder="Search documents by case name..."
          className=""
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Added onChange handler
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <ListChecks className="w-4 h-4 mr-2" />
              {statusFilter === "All" ? "All Status" : statusFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem onClick={() => handleStatusFilter("All")}>
              All Status
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("Processed")}>
              Processed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("Processing")}>
              Processing
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusFilter("Error")}>
              Error
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button variant="outline">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredDocuments.map((doc, index) => (
          <DocumentCard
            key={index}
            title={doc.title}
            date={doc.date}
            type={doc.type}
            pages={doc.pages}
            exhibits={doc.exhibits}
            size={doc.size}
            status={doc.status}
          />
        ))}
      </section>
    </div>
  );
}