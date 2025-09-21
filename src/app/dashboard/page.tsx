"use client"
import * as React from "react"
import { Badge } from "@/components/ui/badge"
import { Clock, FileText, FileCheck, FileSpreadsheet, Loader2 } from "lucide-react"


function KPI({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div className="border rounded-xl p-4 px-6 bg-white/90 backdrop-blur hover:shadow transition space-y-4">
      <p className="text-lg text-gray-600 ">{title}</p>
      <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
      {sub && <p className="text-md text-green-700 mt-1">{sub}</p>}
    </div>
  )
}


function Activity({ title, meta, status, when, icon: Icon }: { title: string; meta: string; status: string; when: string; icon: React.ElementType }) {
  return (
    <li className="px-4 py-3 flex items-center justify-between">
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 text-gray-500 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-gray-800">{title}</p>
          <p className="text-xs text-gray-500">{meta}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Badge className="bg-emerald-100 text-emerald-700">{status}</Badge>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="w-4 h-4" /> {when}
        </p>
      </div>
    </li>
  )
}

function Processing({ name, state, progress, eta, icon: Icon }: { name: string; state: "Processing" | "Complete"; progress: number; eta?: string; icon: React.ElementType }) {
  const bar = state === "Complete" ? "bg-emerald-500" : "bg-yellow-500"
  return (
    <div>
      <div className="flex items-center gap-2">
        {state === "Processing" ? (
          <Loader2 className="w-4 h-4 animate-spin text-yellow-500" />
        ) : (
          <Icon className="w-4 h-4 text-emerald-600" />
        )}
        <p className="text-sm font-medium text-gray-800">{name}</p>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded mt-2 overflow-hidden">
        <div
          className={`h-2 ${bar} transition-[width,filter] duration-700 ${state === "Processing" ? "animate-pulse" : ""}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {state === "Complete" ? "100% complete" : `Processing • ${eta}`}
      </p>
    </div>
  )
}


export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPI title="Total Cases" value="24" sub="+3 this month" />
        <KPI title="Medical Findings" value="1,247" sub="+89 this week" />
        <KPI title="Briefs Generated" value="18" sub="+2 today" />
        <KPI title="Processing Time" value="4.2min" sub="-15% faster" />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 border rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="px-4 py-3 border-b">
            <h2 className="text-base font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <ul className="divide-y">
            <Activity title="Johnson, Mary - Medical Records" meta="487 pages • Post-hearing stage" status="Complete" when="2 hours ago" icon={FileText} />
            <Activity title="Smith, Robert - Disability Brief" meta="Generated using “By Provider” template" status="Complete" when="4 hours ago" icon={FileCheck} />
            <Activity title="23 new findings extracted" meta="Davis, Jennifer case • 94% confidence" status="Complete" when="6 hours ago" icon={FileSpreadsheet} />
            <Activity title="Wilson Brief exported to Word" meta="12 pages • Including citations" status="Complete" when="1 day ago" icon={FileText} />
          </ul>
        </div>


        <div className="border rounded-xl bg-white/80 backdrop-blur-sm">
          <div className="px-4 py-3 border-b">
            <h2 className="text-base font-semibold text-gray-800">Processing Queue</h2>
          </div>
          <div className="p-4 space-y-6">
            <Processing name="Thompson_Medical_Records.pdf" state="Processing" progress={67} eta="3 minutes remaining" icon={FileText} />
            <Processing name="Lee_Disability_File.pdf" state="Complete" progress={100} icon={FileCheck} />
          </div>
        </div>
      </section>
    </div>
  )
}