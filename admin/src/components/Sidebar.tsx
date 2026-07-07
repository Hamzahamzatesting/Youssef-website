import { NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Image,
  GalleryHorizontalEnd,
  Home,
  Aperture,
  Briefcase,
  MessageSquareQuote,
  UserRound,
  Mail,
  Search,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/media", label: "Media Library", icon: Image },
  { to: "/portfolio", label: "Portfolio", icon: GalleryHorizontalEnd },
  { to: "/homepage", label: "Homepage", icon: Home },
  { to: "/services", label: "Services", icon: Briefcase },
  { to: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/about", label: "About", icon: UserRound },
  { to: "/contact", label: "Contact", icon: Mail },
  { to: "/seo", label: "SEO", icon: Search },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-gradient-to-b from-navy via-navy to-navy-dark">
      <div className="flex items-center gap-3 px-6 py-7">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
          <Aperture size={17} />
        </div>
        <div>
          <p className="font-display text-base leading-none text-white">Prodyous</p>
          <p className="mt-1.5 text-[10px] font-medium uppercase tracking-[0.15em] leading-none text-white/35">
            Admin
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 pt-2">
        {links.map(({ to, label, icon: Icon, end }) => {
          const isActive = end ? location.pathname === to : location.pathname.startsWith(to);
          return (
            <NavLink key={to} to={to} end={end} className="relative">
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  transition={{ type: "spring", stiffness: 420, damping: 38 }}
                  className="absolute inset-0 rounded-xl bg-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.35)]"
                />
              )}
              <span
                className={cn(
                  "relative z-10 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150",
                  isActive ? "text-navy" : "text-white/55 hover:text-white"
                )}
              >
                <Icon size={17} />
                {label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      <div className="mx-4 mb-5 rounded-xl bg-white/[0.06] px-4 py-3.5 text-[11px] leading-relaxed text-white/40 ring-1 ring-white/10">
        Every section of your site, managed from here.
      </div>
    </aside>
  );
}
