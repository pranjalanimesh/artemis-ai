"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  LayoutGrid,
  Upload,
  FileText,
  Stethoscope,
  Calendar,
  Briefcase,
  LayoutTemplate,
  Settings,
  ChevronRight,
  ChevronLeft,
  FolderOpen
} from "lucide-react"

type Props = {
  collapsed: boolean
  onToggle: () => void
}

const items = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "Import Records", icon: Upload },
  { label: "Documents", icon: FileText },
  { label: "Medical Findings", icon: Stethoscope },
  { label: "Chronologies", icon: Calendar },
  { label: "Briefs", icon: Briefcase },
  { label: "Templates", icon: LayoutTemplate },
  { label: "Settings", icon: Settings },
] as const

export function AppSidebar({ collapsed, onToggle }: Props) {
  const sidebarWidth = collapsed ? 56 : 256
  const revealCls = `whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${
    collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
  }`

  return (
    <div className="contents">
      <Sidebar className="group border-r transition-[width] duration-300 ease-in-out" style={{ width: sidebarWidth }}>
        {/* Header */}
        <SidebarHeader className={collapsed ? "p-2 pt-5" : "p-4 pt-5"}>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
            {!collapsed && <FolderOpen />}
            {collapsed && (
                <Button
                variant="ghost"
                size="icon"
                aria-label="Expand sidebar"
                onClick={onToggle}
                className="shrink-0"
                >
                <ChevronRight className="w-4 h-4" />
                </Button>
            )}
            {!collapsed && (
                <div className={revealCls}>
                <div className="text-sm font-semibold leading-tight">ArtemisAI</div>
                <div className="text-[11px] text-muted-foreground leading-tight">
                    Medical Research Suite
                </div>
                </div>
            )}
            </div>
            {!collapsed && (
            <Button
                variant="ghost"
                size="icon"
                aria-label="Collapse sidebar"
                onClick={onToggle}
                className="shrink-0"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>
            )}
        </div>
        </SidebarHeader>


        {/* Menu */}
        <SidebarContent className="px-2">
          <SidebarGroup>
            <SidebarMenu>
              {items.map(({ label, icon: Icon }) => (
                <SidebarMenuItem key={label}>
                  <SidebarMenuButton className={`w-full px-2 ${collapsed ? "justify-center" : "justify-start"}`}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className={revealCls}>{label}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer account card */}
        <div className="mt-auto p-3">
          <div className="flex items-center gap-2 rounded-md border p-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className={revealCls}>
              <div className="text-sm font-medium">Attorney</div>
              <div className="text-xs text-muted-foreground">Law Firm LLC</div>
            </div>
          </div>
        </div>
      </Sidebar>
    </div>
  )
}
