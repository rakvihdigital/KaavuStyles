"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
import { Shield, Lock, Mail, ArrowLeft, CheckCircle2, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login, currentUser } = useStore();

  const [email, setEmail] = useState("admin@kavvustyle.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, "admin");
    router.push("/admin/dashboard");
  };

  const handleOneClickDemo = () => {
    login("admin@kavvustyle.com", "admin");
    router.push("/admin/dashboard");
  };

  return (
    <div className="min-h-screen bg-ink flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-ivory rounded-none border border-gold shadow-2xl overflow-hidden p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 mx-auto rounded-full overflow-hidden border border-gold shadow-sm">
            <Image src="/icon.jpeg" alt="Icon" fill className="object-cover" />
          </div>
          <h1 className="font-serif text-3xl text-ink uppercase tracking-wider">
            Kaavu Admin
          </h1>
          <p className="text-[10px] uppercase tracking-[0.24em] text-gold font-sans font-semibold">
            Management Portal Login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted mb-1">
              Admin Email
            </label>
            <div className="flex items-center border border-ivory-300 rounded bg-ivory-50 p-2.5 focus-within:border-gold">
              <Mail className="w-4 h-4 text-gold mr-2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xs text-ink outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted mb-1">
              Password
            </label>
            <div className="relative flex items-center border border-ivory-300 rounded bg-ivory-50 p-2.5 focus-within:border-gold">
              <Lock className="w-4 h-4 text-gold mr-2 flex-shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xs text-ink outline-none pr-8"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 text-ink-muted hover:text-gold p-1 transition-colors cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-crimson hover:bg-crimson-800 text-ivory text-xs uppercase tracking-[0.24em] font-semibold transition-all shadow-md flex items-center justify-center space-x-2"
          >
            <Shield className="w-4 h-4" />
            <span>Sign In to Admin Portal</span>
          </button>
        </form>

        {/* Demo Preset Button */}
        <div className="pt-4 border-t border-ivory-300 space-y-3">
          <button
            type="button"
            onClick={handleOneClickDemo}
            className="w-full py-3 bg-gold hover:bg-gold-dark text-ivory text-xs uppercase tracking-[0.2em] font-semibold transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>1-Click Admin Demo Login</span>
          </button>
          <p className="text-[10px] text-center text-ink-muted">
            Preset: admin@kavvustyle.com / admin123
          </p>
        </div>

        <div className="pt-2 text-center">
          <a
            href="/"
            className="inline-flex items-center text-xs text-ink-muted hover:text-crimson transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            <span>Back to Customer Website</span>
          </a>
        </div>
      </div>
    </div>
  );
}
