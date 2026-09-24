import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { MobileNav } from "./components/layout/MobileNav";
import { Landing } from "./pages/Landing";
import { Converter } from "./pages/Converter";
import { Wallet } from "./pages/Wallet";
import { LiveScores } from "./pages/LiveScores";
import { History } from "./pages/History";
import { Account } from "./pages/Account";
import { Admin } from "./pages/Admin";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-app flex flex-col">
        <Routes>
          {/* Landing page is full-screen splash — no header/nav */}
          <Route path="/" element={<Landing />} />

          {/* App routes — with header and mobile nav */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/converter" element={<Converter />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/scores" element={<LiveScores />} />
                  <Route path="/history" element={<History />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <MobileNav />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
