import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AuthGate } from "./components/auth/AuthGate";
import { Header } from "./components/layout/Header";
import { SidebarDrawer } from "./components/layout/SidebarDrawer";
import { MobileNav } from "./components/layout/MobileNav";

import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Converter } from "./pages/Converter";
import { HistoryPage } from "./pages/History";
import { Wallet } from "./pages/Wallet";
import { Account } from "./pages/Account";
import { Scores } from "./pages/Scores";
import { News } from "./pages/News";
import { Contact } from "./pages/Contact";
import { Privacy } from "./pages/Privacy";
import { Terms } from "./pages/Terms";

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-app text-text-primary selection:bg-brand-neon selection:text-black font-sans">
          <Header onToggleSidebar={() => setSidebarOpen(true)} />
          <SidebarDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <main>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/scores" element={<Scores />} />
              <Route path="/news" element={<News />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />

              <Route path="/dashboard" element={<AuthGate><Dashboard /></AuthGate>} />
              <Route path="/convert" element={<AuthGate><Converter /></AuthGate>} />
              <Route path="/history" element={<AuthGate><HistoryPage /></AuthGate>} />
              <Route path="/wallet" element={<AuthGate><Wallet /></AuthGate>} />
              <Route path="/account" element={<AuthGate><Account /></AuthGate>} />

              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <MobileNav />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
