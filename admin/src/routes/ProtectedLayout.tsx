import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/features/auth/useAuth";
import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";

const TITLES: Record<string, string> = {
  "/": "Dashboard",
  "/media": "Media Library",
  "/portfolio": "Portfolio",
  "/homepage": "Homepage",
  "/services": "Services",
  "/testimonials": "Testimonials",
  "/about": "About Page",
  "/contact": "Contact & Social",
  "/seo": "SEO",
  "/settings": "Settings",
};

function titleFor(pathname: string): string {
  if (TITLES[pathname]) return TITLES[pathname];
  if (pathname.startsWith("/portfolio")) return "Portfolio";
  return "Prodyous Admin";
}

export function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-surface-muted">
        <Loader2 className="animate-spin text-navy" size={24} />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar title={titleFor(location.pathname)} />
        <main className="flex-1 overflow-y-auto px-8 py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
