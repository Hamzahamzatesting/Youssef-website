import { createBrowserRouter } from "react-router-dom";
import { ProtectedLayout } from "@/routes/ProtectedLayout";
import { LoginPage } from "@/routes/LoginPage";
import { DashboardPage } from "@/routes/DashboardPage";
import { MediaLibraryPage } from "@/routes/media/MediaLibraryPage";
import { PortfolioListPage } from "@/routes/portfolio/PortfolioListPage";
import { PortfolioEditorPage } from "@/routes/portfolio/PortfolioEditorPage";
import { HomepageManagerPage } from "@/routes/homepage/HomepageManagerPage";
import { ServicesPage } from "@/routes/services/ServicesPage";
import { TestimonialsPage } from "@/routes/testimonials/TestimonialsPage";
import { AboutPageManager } from "@/routes/about/AboutPageManager";
import { ContactManager } from "@/routes/contact/ContactManager";
import { SEOManager } from "@/routes/seo/SEOManager";
import { SettingsManager } from "@/routes/settings/SettingsManager";

export const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  {
    path: "/",
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "media", element: <MediaLibraryPage /> },
      { path: "portfolio", element: <PortfolioListPage /> },
      { path: "portfolio/new", element: <PortfolioEditorPage /> },
      { path: "portfolio/:id", element: <PortfolioEditorPage /> },
      { path: "homepage", element: <HomepageManagerPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "testimonials", element: <TestimonialsPage /> },
      { path: "about", element: <AboutPageManager /> },
      { path: "contact", element: <ContactManager /> },
      { path: "seo", element: <SEOManager /> },
      { path: "settings", element: <SettingsManager /> },
    ],
  },
]);
