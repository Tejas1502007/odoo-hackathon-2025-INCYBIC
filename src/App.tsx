import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Browse } from "./pages/Browse";
import { AddItem } from "./pages/AddItem";
import { ItemDetail } from "./pages/ItemDetail";
import { Admin } from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Landing page (no navbar) */}
            <Route path="/" element={<Landing />} />
            
            {/* Auth pages (no navbar) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* App pages (with navbar) */}
            <Route path="/dashboard" element={
              <>
                <Navbar />
                <Dashboard />
              </>
            } />
            <Route path="/browse" element={
              <>
                <Navbar />
                <Browse />
              </>
            } />
            <Route path="/add-item" element={
              <>
                <Navbar />
                <AddItem />
              </>
            } />
            <Route path="/item/:id" element={
              <>
                <Navbar />
                <ItemDetail />
              </>
            } />
            <Route path="/admin" element={
              <>
                <Navbar />
                <Admin />
              </>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
