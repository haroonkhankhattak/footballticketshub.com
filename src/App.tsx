import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Test from "./pages/test/Index";
import NotFound from "./pages/NotFound";
import Matches from "./pages/matches/Index";
import Tickets from "./pages/tickets/Index";
import League from "./pages/league/Index";
import CheckoutPage from "./pages/checkout/index";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/test" element={<Test />} />
          <Route path="/matches" element={<Matches />} />
          <Route path="/league" element={<League />} />
          <Route path="/team/:teamName" element={<Index />} />
          <Route path="/competition/:competitionName" element={<Index />} />
          <Route path="/tickets/:matchId" element={<Tickets />} />
          <Route path="/track" element={<Index />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
