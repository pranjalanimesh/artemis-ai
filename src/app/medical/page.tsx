"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Plus,
  SlidersHorizontal,
  ListChecks,
  Download,
  Search
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type FindingType = 'Diagnosis' | 'Treatment' | 'Medication' | 'Test Result' | 'Symptom';

function FindingCard({
  type,
  category,
  description,
  date,
  source,
  doctor,
  confidence,
}: {
  type: string;
  category: string;
  description: string;
  date: string;
  source: string;
  doctor: string;
  confidence: number;
}) {
  let confidenceColor;
  if (confidence >= 90) {
    confidenceColor = "bg-emerald-100 text-emerald-700";
  } else if (confidence >= 75) {
    confidenceColor = "bg-blue-100 text-blue-700";
  } else if (confidence >= 60) {
    confidenceColor = "bg-yellow-100 text-yellow-700";
  } else {
    confidenceColor = "bg-red-100 text-red-700";
  }

  return (
    <div className="border rounded-xl p-4 space-y-2 bg-white/90 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-gray-500" />
          <h3 className="text-lg font-semibold text-gray-800">{type}</h3>
        </div>
        <Badge className={confidenceColor}>{confidence}%</Badge>
      </div>
      <div className="text-sm text-gray-500">{category}</div>
      <p className="text-sm text-gray-700">{description}</p>
      <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
        <div>Date: {date}</div>
        <div>Source: {source}</div>
        <div>Provider: {doctor}</div>
      </div>
    </div>
  );
}

function calculateConfidenceDistribution(findings: any[]) {
  const total = findings.length;
  if (total === 0) return { high: 0, good: 0, moderate: 0, low: 0 };

  const distribution = {
    high: findings.filter(f => f.confidence >= 90).length,
    good: findings.filter(f => f.confidence >= 75 && f.confidence < 90).length,
    moderate: findings.filter(f => f.confidence >= 60 && f.confidence < 75).length,
    low: findings.filter(f => f.confidence < 60).length
  };

  return {
    high: (distribution.high / total) * 100,
    good: (distribution.good / total) * 100,
    moderate: (distribution.moderate / total) * 100,
    low: (distribution.low / total) * 100
  };
}

function AnimatedProgressBar({ 
  value, 
  color 
}: { 
  value: number, 
  color: string 
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Start with 0
    setWidth(0);
    
    // Animate to actual value after a small delay
    const timeout = setTimeout(() => {
      setWidth(value);
    }, 50);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
      <div 
        className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}

function StatsSection({ findings }: { findings: any[] }) {
  const distribution = calculateConfidenceDistribution(findings);

  return (
    <div className="grid gap-4 sm:grid-cols-4">
      <div className="p-4 space-y-4 border rounded-lg bg-white/90 backdrop-blur-sm sm:col-span-3">
        <h3 className="text-lg font-semibold text-gray-800">Confidence Distribution</h3>
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                High (90%+)
              </span>
              <span>{findings.filter(f => f.confidence >= 90).length} ({Math.round(distribution.high)}%)</span>
            </div>
            <AnimatedProgressBar value={distribution.high} color="bg-emerald-500" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                Good (75-89%)
              </span>
              <span>{findings.filter(f => f.confidence >= 75 && f.confidence < 90).length} ({Math.round(distribution.good)}%)</span>
            </div>
            <AnimatedProgressBar value={distribution.good} color="bg-blue-500" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                Moderate (60-74%)
              </span>
              <span>{findings.filter(f => f.confidence >= 60 && f.confidence < 75).length} ({Math.round(distribution.moderate)}%)</span>
            </div>
            <AnimatedProgressBar value={distribution.moderate} color="bg-yellow-500" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                Low (&lt;60%)
              </span>
              <span>{findings.filter(f => f.confidence < 60).length} ({Math.round(distribution.low)}%)</span>
            </div>
            <AnimatedProgressBar value={distribution.low} color="bg-red-500" />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4 border rounded-lg bg-white/90 backdrop-blur-sm">
        <h3 className="text-lg font-semibold text-gray-800">Quick Stats</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Total Findings:</span>
            <span className="font-medium">{findings.length}</span>
          </div>
          <div className="flex justify-between">
            <span>High Confidence:</span>
            <span className="font-medium text-emerald-600">
              {findings.filter(f => f.confidence >= 90).length}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Body Systems:</span>
            <span className="font-medium text-blue-600">
              {new Set(findings.map(f => f.category)).size}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Selected:</span>
            <span className="font-medium text-purple-600">
              {findings.filter(f => f.selected).length || 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function MedicalPage() {
  const [systemFilter, setSystemFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showStats, setShowStats] = useState<boolean>(true); // NEW

  const handleSystemFilter = (system: string) => {
    setSystemFilter(system);
  };

    const findings = [
    {
      type: "Diagnosis",
      category: "Musculoskeletal",
      description: "Chronic lower back pain with L4-L5 disc herniation and radiculopathy affecting the left leg",
      date: "1/15/2024",
      source: "Dr. Smith - Orthopedic Consultation.pdf",
      doctor: "Dr. Michael Smith, MD",
      confidence: 95
    },
    {
      type: "Treatment",
      category: "Musculoskeletal",
      description: "Physical therapy sessions, 3x weekly for 6 weeks focusing on core strengthening and flexibility",
      date: "1/20/2024",
      source: "Physical Therapy Initial Evaluation.pdf",
      doctor: "Sarah Johnson, PT",
      confidence: 88
    },
    {
      type: "Medication",
      category: "Musculoskeletal",
      description: "Prescribed Ibuprofen 600mg TID for inflammation and Gabapentin 300mg BID for neuropathic pain",
      date: "1/15/2024",
      source: "Dr. Smith - Orthopedic Consultation.pdf",
      doctor: "Dr. Michael Smith, MD",
      confidence: 92
    },
    {
      type: "Test Result",
      category: "Musculoskeletal",
      description: "MRI lumbar spine shows moderate to severe disc herniation at L4-L5 with neural foraminal narrowing",
      date: "1/10/2024",
      source: "MRI Lumbar Spine Report.pdf",
      doctor: "Dr. Lisa Chen, MD",
      confidence: 98
    },
    {
      type: "Symptom",
      category: "Nervous System",
      description: "Patient reports severe shooting pain down left leg, numbness in left foot, difficulty walking",
      date: "1/15/2024",
      source: "Dr. Smith - Orthopedic Consultation.pdf",
      doctor: "Dr. Michael Smith, MD",
      confidence: 85
    },
    {
      type: "Diagnosis",
      category: "Cardiovascular",
      description: "Hypertension, well-controlled on current medication regimen",
      date: "1/12/2024",
      source: "Primary Care Visit Notes.pdf",
      doctor: "Dr. Robert Wilson, MD",
      confidence: 78
    },
    {
      type: "Test Result",
      category: "Cardiovascular",
      description: "ECG shows normal sinus rhythm, no ST changes, QRS duration within normal limits",
      date: "1/14/2024",
      source: "Cardiology Report.pdf",
      doctor: "Dr. Jane Wilson, MD",
      confidence: 96
    },
    {
      type: "Medication",
      category: "Cardiovascular",
      description: "Lisinopril 10mg daily for hypertension management",
      date: "1/12/2024",
      source: "Primary Care Visit Notes.pdf",
      doctor: "Dr. Robert Wilson, MD",
      confidence: 94
    },
    {
      type: "Symptom",
      category: "Respiratory",
      description: "Occasional shortness of breath with moderate exertion, no chest pain",
      date: "1/13/2024",
      source: "Patient Self-Report.pdf",
      doctor: "Dr. Robert Wilson, MD",
      confidence: 82
    },
    {
      type: "Test Result",
      category: "Laboratory",
      description: "Complete Blood Count within normal limits, Hemoglobin 14.2 g/dL",
      date: "1/11/2024",
      source: "Laboratory Results.pdf",
      doctor: "Dr. Sarah Chen, MD",
      confidence: 99
    },
    {
      type: "Diagnosis",
      category: "Endocrine",
      description: "Pre-diabetes, HbA1c 6.3%, recommended lifestyle modifications",
      date: "1/11/2024",
      source: "Endocrinology Consultation.pdf",
      doctor: "Dr. Maria Rodriguez, MD",
      confidence: 91
    },
    {
      type: "Treatment",
      category: "Nutritional",
      description: "Dietary consultation for diabetes prevention, recommended Mediterranean diet",
      date: "1/16/2024",
      source: "Nutritionist Consultation.pdf",
      doctor: "Emily Thompson, RD",
      confidence: 88
    },
    {
      type: "Medication",
      category: "Pain Management",
      description: "Tylenol 500mg PRN for breakthrough pain, not to exceed 4g/day",
      date: "1/15/2024",
      source: "Pain Management Notes.pdf",
      doctor: "Dr. Michael Smith, MD",
      confidence: 93
    },
    {
      type: "Test Result",
      category: "Imaging",
      description: "Chest X-ray shows clear lung fields, no active disease",
      date: "1/13/2024",
      source: "Radiology Report.pdf",
      doctor: "Dr. James Lee, MD",
      confidence: 97
    },
    {
      type: "Symptom",
      category: "Gastrointestinal",
      description: "Intermittent acid reflux symptoms, worse with lying flat",
      date: "1/14/2024",
      source: "GI Consultation Notes.pdf",
      doctor: "Dr. Lisa Brown, MD",
      confidence: 76
    },
    {
      type: "Treatment",
      category: "Lifestyle",
      description: "Sleep hygiene counseling, recommended consistent 8-hour sleep schedule",
      date: "1/16/2024",
      source: "Sleep Clinic Notes.pdf",
      doctor: "Dr. Thomas White, MD",
      confidence: 85
    },
    {
      type: "Diagnosis",
      category: "Mental Health",
      description: "Mild anxiety related to chronic health conditions",
      date: "1/17/2024",
      source: "Psychological Assessment.pdf",
      doctor: "Dr. Rachel Green, PhD",
      confidence: 89
    }
  ];

  const filteredFindings = React.useMemo(() => {
    let filtered = findings;

    if (systemFilter !== "All") {
      filtered = filtered.filter((finding) => finding.type === systemFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((finding) =>
        finding.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        finding.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [systemFilter, searchTerm]);

  return (
    <div className="space-y-6 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-gray-800">Medical Findings</h1>
          <p className="text-sm text-gray-600">AI-extracted medical information from your documents</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setShowStats((s) => !s)}                 // CHANGED
            aria-pressed={showStats}
            title={showStats ? "Hide stats" : "Show stats"}
          >
            {showStats ? "Hide Stats" : "Show Stats"}               {/* CHANGED */}
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Finding
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>
      </div>

      {showStats && <StatsSection findings={filteredFindings} />}    {/* NEW */}

      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 flex items-center gap-4">
          {['All', 'Diagnosis', 'Treatment', 'Medication', 'Test Result', 'Symptom'].map((type) => (
            <Button
              key={type}
              variant={systemFilter === type ? "default" : "outline"}
              onClick={() => handleSystemFilter(type)}
              className="flex items-center gap-2"
            >
              {type === 'All' && <ListChecks className="w-4 h-4" />}
              {type === 'Diagnosis' && <FileText className="w-4 h-4" />}
              {type === 'Treatment' && <SlidersHorizontal className="w-4 h-4" />}
              {type === 'Medication' && <Plus className="w-4 h-4" />}
              {type === 'Test Result' && <FileText className="w-4 h-4" />}
              {type === 'Symptom' && <Search className="w-4 h-4" />}
              {type}
            </Button>
          ))}
        </div>
        <Input
          type="search"
          placeholder="Search findings..."
          className="w-[300px]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFindings.map((finding, index) => (
          <FindingCard
            key={index}
            type={finding.type}
            category={finding.category}
            description={finding.description}
            date={finding.date}
            source={finding.source}
            doctor={finding.doctor}
            confidence={finding.confidence}
          />
        ))}
      </section>
    </div>
  );
}
