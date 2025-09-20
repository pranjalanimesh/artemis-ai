"use client"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
    // If your sidebar lib provides these, great. Otherwise we use useSidebar below.
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
    Mail,
    Plus,
    ChevronDown,
    BookOpen,
    MessageCircle,
    Workflow,
    Search,
    Filter,
    MoreHorizontal,
    Folder,
    FileText,
    ChevronRight,
    Menu,
    Save,
    Clock,
    ChevronLeft,
} from "lucide-react"
import * as React from "react"

// Optional hook from your sidebar lib. If not available, we fall back to local state.
// @ts-ignore - tolerate missing export in some setups
import { useSidebar } from "@/components/ui/sidebar"

const libraryItems = [
    { name: "AML CTF", type: "folder", count: 23, icon: Folder },
    { name: "Environmental", type: "folder", count: 7, icon: Folder, avatar: "M" },
    { name: "Social", type: "folder", count: 4, icon: Folder },
    { name: "Energy Charter Treaty", type: "document", icon: FileText, avatars: ["A", "K"], additionalCount: 5, selected: true },
    { name: "Human Rights", type: "document", icon: FileText },
    { name: "Product safety", type: "document", icon: FileText },
    { name: "Supply chain transparency", type: "document", icon: FileText },
    { name: "Safety", type: "folder", count: 9, icon: Folder },
    { name: "ESG", type: "folder", count: 15, icon: Folder },
    { name: "Financial Services", type: "folder", count: 9, icon: Folder },
]

// Reusable wrapper to enforce black background + white icon foreground
function IconWrap({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex h-6 w-6 items-center justify-center rounded-md bg-black text-white ${className}`}>
            {children}
        </span>
    )
}

export default function Home() {
    // Sidebar toggle: use provider hook if available, else local visibility state
    const sidebarCtx = ((): { toggleSidebar?: () => void } => {
        try {
            // @ts-ignore
            const ctx = useSidebar?.()
            return ctx || {}
        } catch {
            return {}
        }
    })()

    const [openLocal, setOpenLocal] = React.useState(true)
    const [libOpen, setLibOpen] = React.useState(true) // controls Library dropdown

    // Library filter items and active state
    const libFilters = [
        { label: "All", count: 40 },
        { label: "Draft", count: 32 },
        { label: "Returned", count: 15 },
        { label: "For Review", count: 24 },
        { label: "Published", count: 24 },
        { label: "Archived", count: 19 },
        { label: "Uncategorised", count: 5 },
        { label: "Trash", count: 8 },
    ] as const
    type LibFilter = (typeof libFilters)[number]["label"]
    const [activeLib, setActiveLib] = React.useState<LibFilter>("All")


    // single source of truth for collapsed state
    const collapsed = !openLocal

    const toggle = React.useCallback(() => {
        if (sidebarCtx?.toggleSidebar) sidebarCtx.toggleSidebar()
        else setOpenLocal((v) => !v)
    }, [sidebarCtx])

    // auto-close dropdown when sidebar collapses
    React.useEffect(() => {
        if (collapsed) setLibOpen(false)
    }, [collapsed])

    // Smooth expanding of the right panel when sidebar width changes
    const sidebarWidth = collapsed ? 56 : 256 // px (w-14 vs w-64)
    // Keep middle panel at a comfortable reading width; let right panel take the rest
    const middleBasis = 520 // px

    // shared classes for animating text/badges when collapsing
    // Remove negative translate that pushed icons off-canvas
    const revealCls = `whitespace-nowrap overflow-hidden transition-[max-width,opacity] duration-300 ease-in-out ${collapsed ? "max-w-0 opacity-0" : "max-w-[200px] opacity-100"
        }`

    const rightRevealCls = `transition-[opacity,transform] duration-300 ease-in-out ${collapsed ? "opacity-0 -translate-x-1 pointer-events-none" : "opacity-100 translate-x-0"
        }`

    return (
        <SidebarProvider>
            {/* Use CSS grid so the right panel can smoothly absorb freed space */}
            <div
                className="h-screen bg-white grid"
                style={{
                    gridTemplateColumns: `${sidebarWidth}px ${middleBasis}px 1fr`,
                    transition: "grid-template-columns 300ms ease-in-out",
                }}
            >
                {/* Left Sidebar */}
                <div className="contents">
                    <Sidebar className={`group border-r transition-[width] duration-300 ease-in-out`} style={{ width: sidebarWidth }}>
                        <SidebarHeader className="p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {collapsed ? (
                                        <ChevronRight onClick={() => collapsed && toggle()} className="mt-2 w-4 h-4 transition-opacity duration-300" />
                                    ) : (
                                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer"
                                            onClick={() => collapsed && toggle()}
                                        >
                                            <span className="text-white font-bold text-sm">P</span>
                                        </div>
                                    )}
                                </div>
                                {!collapsed && (
                                    <Button variant="ghost" size="icon" aria-label="Toggle sidebar" onClick={toggle} className="shrink-0">
                                        {openLocal ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                    </Button>
                                )}
                            </div>
                        </SidebarHeader>

                        <SidebarContent className="px-2 overflow-visible">
                            <SidebarGroup>
                                <SidebarMenu>
                                    {/* Inbox */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`w-full px-2 ${collapsed ? "justify-center" : "justify-between"}`}>
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 shrink-0" />
                                                <span className={revealCls}>Inbox</span>
                                            </div>
                                            <SidebarMenuBadge className={rightRevealCls}>2</SidebarMenuBadge>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Create */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`w-full px-2 ${collapsed ? "justify-center" : "justify-between"}`}>
                                            <div className="flex items-center gap-2">
                                                <Plus className="w-4 h-4 shrink-0" />
                                                <span className={revealCls}>Create</span>
                                            </div>
                                            {!collapsed && <ChevronRight className="w-4 h-4" />}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Library toggle */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            className={`w-full px-2 ${collapsed ? "justify-center" : "justify-between"} ${libOpen && !collapsed ? "bg-purple-50 text-purple-700" : ""}`}
                                            aria-expanded={libOpen && !collapsed}
                                            aria-controls="library-sub"
                                            onClick={() => {
                                                if (!collapsed) setLibOpen((v) => !v)
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <BookOpen className="w-4 h-4 shrink-0" />
                                                <span className={`${revealCls}`}>Library</span>
                                            </div>
                                            {!collapsed && (
                                                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${libOpen ? "rotate-180" : "rotate-0"}`} />
                                            )}
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Animated dropdown container */}
                                    <SidebarMenuSub
                                    id="library-sub"
                                    aria-hidden={!libOpen || collapsed}
                                    className={`relative grid overflow-hidden transition-[grid-template-rows] duration-300 ease-in-out ${libOpen && !collapsed ? "grid-rows-[1fr]" : "grid-rows-[0fr]"} pl-3 [&_*]:border-l-0`}
                                    >
                                        {/* single gray vertical rail for the whole group */}
                                        <span
                                            aria-hidden
                                            className="pointer-events-none absolute left-3 top-2 bottom-2 w-px bg-gray-200"
                                        />

                                        <div className="min-h-0 overflow-hidden px-0">
                                            {libFilters.map(({ label, count }) => {
                                                const selected = activeLib === label
                                                return (
                                                    <SidebarMenuSubItem key={label}>
                                                        <SidebarMenuSubButton
                                                            onClick={() => setActiveLib(label)}
                                                            className={`relative w-full justify-between 
              ${selected ? "bg-purple-50 text-purple-700" : ""}`}
                                                        >
                                                            {/* blue line that OVERLAPS the gray rail only when selected */}
                                                            {selected && (
                                                                <span
                                                                    aria-hidden
                                                                    className="pointer-events-none absolute left-0 top-0 bottom-0 w-[2px] bg-blue-600"
                                                                />
                                                            )}
                                                            <span>{label}</span>
                                                            <SidebarMenuBadge>{count}</SidebarMenuBadge>
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                )
                                            })}
                                        </div>
                                    </SidebarMenuSub>



                                    {/* Chat */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`w-full px-2 ${collapsed ? "justify-center" : "justify-start"}`}>
                                            <div className="flex items-center gap-2">
                                                <MessageCircle className="w-4 h-4 shrink-0" />
                                                <span className={revealCls}>Chat</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>

                                    {/* Workflows */}
                                    <SidebarMenuItem>
                                        <SidebarMenuButton className={`w-full px-2 ${collapsed ? "justify-center" : "justify-start"}`}>
                                            <div className="flex items-center gap-2">
                                                <Workflow className="w-4 h-4 shrink-0" />
                                                <span className={revealCls}>Workflows</span>
                                            </div>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                </div>

                {/* Middle Panel - Library Content */}
                <div className="border-r bg-gray-50 min-w-0" style={{ width: middleBasis }}>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-2">
                                <h1 className="text-lg font-medium text-gray-700">Library / All</h1>
                                <Badge className="bg-gray-200 text-gray-600">40</Badge>
                            </div>
                        </div>

                        <div className="flex gap-2 mb-4">
                            <div className="flex-1 relative">
                                <span className="absolute left-2 top-1/2 -translate-y-1/2">
                                    <Search className="w-4 h-4" />
                                </span>
                                <Input placeholder="Search..." className="pl-12 bg-white" />
                            </div>
                            <Button variant="outline" className="bg-white">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </div>

                        <div className="flex gap-1 mb-4">
                            <Button className="bg-gray-200 text-gray-700">Pages</Button>
                            <Button variant="ghost" className="text-gray-500">
                                Events
                            </Button>
                        </div>

                        <div className="space-y-1">
                            {libraryItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-white cursor-pointer ${item.selected ? "bg-purple-50" : "bg-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <IconWrap>
                                            <item.icon className="w-4 h-4" />
                                        </IconWrap>
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        {item.count && <Badge className="bg-gray-200 text-gray-600">{item.count}</Badge>}
                                        {item.avatar && (
                                            <Avatar className="w-6 h-6">
                                                <AvatarFallback className="bg-purple-100 text-purple-700 text-xs">{item.avatar}</AvatarFallback>
                                            </Avatar>
                                        )}
                                        {item.avatars && (
                                            <div className="flex -space-x-1">
                                                {item.avatars.map((avatar, i) => (
                                                    <Avatar key={i} className="w-6 h-6 border-2 border-white">
                                                        <AvatarFallback
                                                            className={`text-xs ${i === 0 ? "bg-yellow-100 text-yellow-700" : "bg-blue-100 text-blue-700"}`}
                                                        >
                                                            {avatar}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                ))}
                                                <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600 border-2 border-white">
                                                    {item.additionalCount}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <MoreHorizontal className="w-4 h-4" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Panel - Document Detail */}
                <div className="bg-white min-w-0 overflow-auto">
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-medium text-gray-700">Energy Charter Treaty</h2>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="text-gray-600">
                                    New Version
                                    <IconWrap className="ml-1">
                                        <ChevronDown className="w-4 h-4" />
                                    </IconWrap>
                                </Button>
                                <div className="flex items-center gap-1 text-sm text-black">
                                    <Save className="w-4 h-4" />
                                    <span>Save</span>
                                </div>
                                <div className="flex -space-x-1">
                                    <Avatar className="w-8 h-8 border-2 border-white">
                                        <AvatarFallback className="bg-yellow-100 text-yellow-700 text-sm">A</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="w-8 h-8 border-2 border-white">
                                        <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">K</AvatarFallback>
                                    </Avatar>
                                    <Avatar className="w-8 h-8 border-2 border-white">
                                        <AvatarFallback className="bg-green-100 text-green-700 text-sm">J</AvatarFallback>
                                    </Avatar>
                                </div>
                                <Button variant="outline" size="sm" className="text-gray-600">
                                    For Review
                                    <IconWrap className="ml-1">
                                        <ChevronDown className="w-4 h-4" />
                                    </IconWrap>
                                </Button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 mb-6">
                            <Button variant="ghost" className="text-gray-600">
                                <Menu className="w-4 h-4" />
                                Content
                            </Button>
                        </div>

                        <div className="mb-6">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Energy Charter Treaty</h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                Updated 8 mins ago
                            </p>
                        </div>

                        {/* Comment Section */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                                <Avatar className="w-8 h-8">
                                    <AvatarFallback className="bg-blue-100 text-blue-700">K</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-800">Ken Aregon</span>
                                        <span className="text-sm text-gray-500">Aug 20, 2024 - 06:43 PM</span>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-2">Add: "On 15 February 2024"</p>
                                    <div className="text-sm text-gray-600 space-y-2">
                                        <p>
                                            <span className="bg-yellow-200 px-1 rounded">On 15 February 2024</span>, ASIC published a consultation on proposed changes to Derivative Transaction Rules
                                            <span className="bg-green-200 px-1 rounded">(Reporting)</span> 2024 and ASIC Derivative Transact 2015.
                                        </p>
                                        <p>
                                            <span className="bg-yellow-200 px-1 rounded">On 1 February 2024</span>, ASIC published guidance for market intermediaries on
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Document Content */}
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Summary</h2>
                                <h3 className="text-base font-semibold text-gray-800 mb-2">Objective and Scope</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    ASIC's consultation on amendments to the
                                    <span className="bg-green-200 px-1 rounded">ASIC Derivative Transaction Rules and Clearing 2015</span>
                                    aims to align with <span className="bg-green-200 px-1 rounded">international standards</span> and
                                    clarify <span className="bg-green-200 px-1 rounded">exclusions</span> while
                                    <span className="bg-green-200 px-1 rounded">updating data element values</span>.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-800 mb-3">Fair Presentation</h2>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    The proposed changes focus on enhancing disclosures and addressing
                                    sustainability-related risk opportunities. Minor updates to the Clearing Rules and
                                    definitions in the regulations Act are also included.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarProvider>
    )
}
