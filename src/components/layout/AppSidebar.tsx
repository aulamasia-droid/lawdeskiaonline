import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  Lightbulb, 
  PenTool,
  FolderOpen,
  Settings,
  LogOut,
  Scale,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import automatixLogo from "@/assets/automatix-logo.png";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Nuevo Caso", url: "/nuevo-caso", icon: FileText },
  { title: "Análisis IA", url: "/analisis", icon: Brain },
  { title: "Sugerencias", url: "/sugerencias", icon: Lightbulb },
  { title: "Redacción", url: "/redaccion", icon: PenTool },
  { title: "Mis Casos", url: "/casos", icon: FolderOpen },
];

const bottomItems = [
  { title: "Configuración", url: "/configuracion", icon: Settings },
];

export function AppSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar transition-all duration-250 ease-in-out flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-sidebar-border">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-sidebar-primary">
          <Scale className="w-5 h-5 text-sidebar-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="animate-fade-in">
            <h1 className="text-lg font-serif font-semibold text-sidebar-foreground">
              LawDesk
            </h1>
            <p className="text-xs text-sidebar-foreground/60">AI Assistant</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              "sidebar-item",
              isActive(item.url) && "active"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span className="animate-fade-in truncate">{item.title}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        {bottomItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={cn(
              "sidebar-item",
              isActive(item.url) && "active"
            )}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span className="animate-fade-in truncate">{item.title}</span>
            )}
          </NavLink>
        ))}
        
        <button className="sidebar-item w-full text-left opacity-70 hover:opacity-100">
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="truncate">Cerrar Sesión</span>}
        </button>
      </div>

      {/* Automatix IA Branding */}
      <div className="px-3 py-4 border-t border-sidebar-border">
        <div className="flex flex-col items-center text-center space-y-2">
          <img 
            src={automatixLogo} 
            alt="Automatix IA" 
            className={cn(
              "transition-all duration-250",
              collapsed ? "w-10" : "w-20"
            )} 
          />
          {!collapsed && (
            <div className="animate-fade-in space-y-0.5">
              <p className="text-xs font-semibold text-sidebar-foreground">AUTOMATIX IA</p>
              <p className="text-[10px] text-sidebar-foreground/60 leading-tight">
                Diseño y Desarrollo de Productos y Servicios con Inteligencia Artificial
              </p>
              <p className="text-[10px] text-sidebar-foreground/50">7292564174</p>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border shadow-soft flex items-center justify-center hover:bg-secondary transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="w-3 h-3 text-foreground" />
        ) : (
          <ChevronLeft className="w-3 h-3 text-foreground" />
        )}
      </button>
    </aside>
  );
}
