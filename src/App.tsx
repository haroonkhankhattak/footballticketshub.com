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
import Track from "./pages/track/Index";
import { CurrencyLanguageProvider } from "./lib/CurrencyLanguageContext";
import { ApolloProvider } from '@apollo/client';
import { client } from './api/client'; 
import AboutUs from "./pages/about-us/Index";
import FAQ from "./pages/faqs/Index";
import TermsConditions from "./pages/terms-and-conditions/Index";
import PrivacyPolicy from "./pages/privacy-policy/Index";
import ContactUs from "./pages/contact-us/Index";



const queryClient = new QueryClient();

const App = () => (
  <ApolloProvider client={client}>
    <QueryClientProvider client={queryClient}>
      <CurrencyLanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/test" element={<Test />} />
              {/* <Route path="/matches" element={<Matches />} /> */}
              <Route path="/matches/:league/:team" element={<Matches />} />
              <Route path="/league/:league" element={<League />} />
              {/* <Route path="/team/:teamName" element={<Index />} /> */}
              <Route path="/competition/:competitionName" element={<Index />} />
              <Route path="/tickets/:match" element={<Tickets />} />
              <Route path="/track" element={<Track />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="*" element={<NotFound />} />

            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CurrencyLanguageProvider>
    </QueryClientProvider>
  </ApolloProvider>

);

export default App;
