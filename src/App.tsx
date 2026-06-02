import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LocationDetailPage from './components/LocationDetailPage';
import Header from "./components/Header";
import Footer from "./components/Footer";

const queryClient = new QueryClient();

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* ← Wrap all routes inside Layout */}
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/locations/:city/:id" element={<LocationDetailPage />} />
          </Route>

          {/* NotFound outside Layout — no header/footer on 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;