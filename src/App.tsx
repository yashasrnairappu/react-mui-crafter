import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PathanamthittaNewJhons from "./pages/Pathanamthitta/new-jhons";
import PathanamthittaAraman from "./pages/Pathanamthitta/araman";
import KottayamSaravanCh from "./pages/Kottayam/sa-ch";
import KottayamSaravanTh from "./pages/Kottayam/sa-th";
import KottayamTaban from "./pages/Kottayam/tabann";
import KottayamBbq from "./pages/Kottayam/Bbq";
import KottayamJosettayi from "./pages/Kottayam/jos";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/locations/Pathanamthitta/new-jhons" element={<PathanamthittaNewJhons />}/>
          <Route path="/locations/Pathanamthitta/aramana-resturant" element={<PathanamthittaAraman />}/>
          <Route path="/locations/Kottayam/saravana-hotel(thengana)" element={<KottayamSaravanTh />}/>
          <Route path="/locations/Kottayam/saravana-hotel(changanassery)" element={<KottayamSaravanCh />}/>
          <Route path="/locations/Kottayam/yemeni-mandhi" element={<KottayamTaban />}/>
          <Route path="/locations/Kottayam/josettayi-naandan-thattu-kada" element={<KottayamJosettayi />}/>
          <Route path="/locations/Kottayam/bbq-(eat-and-drink)" element={<KottayamBbq />}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
