"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const steps = [
  { id: 1, label: "Access Mode", description: "Choose your access level" },
  { id: 2, label: "File Upload", description: "Upload your complete medical records" },
  { id: 3, label: "Case Details", description: "Provide case information" },
  { id: 4, label: "Processing Options", description: "Configure AI settings" },
  { id: 5, label: "Review & Import", description: "Confirm and start processing" },
];

function AccessModeCard({
  title,
  description,
  features,
  recommended,
}: {
  title: string;
  description: string;
  features: string[];
  recommended?: boolean;
}) {
  return (
      <div className="border rounded-xl p-6 space-y-4 ">    
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {recommended && (
              <Badge className="bg-blue-500 text-white">Recommended</Badge>
            )}
        </div>
      <p className="text-sm text-gray-600">{description}</p>
      <ul className="list-disc pl-5 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-700">
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ImportPage() {
  return (
    <div className="space-y-6 rounded-lg">
      <div className="flex items-center gap-4 rounded-lg">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-gray-800">Import Medical Records</h1>
          <p className="text-sm text-gray-600">Upload and process your complete medical documentation</p>
        </div>
      </div>

      <section className="flex items-center justify-between p-4 border rounded-lg">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              {step.id}
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-gray-800">{step.label}</p>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="space-y-4 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800">Choose Access Mode</h2>
        <p className="text-sm text-gray-600">Select how you'd like to access the Artemis AI Platform</p>

        <div className="grid gap-6 md:grid-cols-2">
          <AccessModeCard
            title="Full Account Access"
            description="Complete platform access with all features"
            features={[
              "Full document processing",
              "Save and organize cases",
              "Generate briefs and chronologies",
              "Advanced search and queries",
              "Export capabilities",
              "Unlimited storage",
            ]}
            recommended={true}
          />
          <AccessModeCard
            title="Guest Access"
            description="Temporary access for helpers and assistants"
            features={[
              "Process single document",
              "Basic findings extraction",
              "Export results",
              "Limited to 24 hours",
              "No case saving",
              "Basic search only",
            ]}
          />
        </div>
        <p className="text-xs text-gray-500 text-center">You can change your access level later in settings</p>
      </section>
    </div>
  );
}