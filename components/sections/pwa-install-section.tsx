"use client";

import { useState, useEffect } from "react";
import { Download, Wifi, Zap, Shield, Smartphone, CheckCircle } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const features = [
  { icon: Wifi, title: "Works Offline", desc: "All calculators work without internet" },
  { icon: Zap, title: "Instant Load", desc: "Native app-like speed, zero lag" },
  { icon: Shield, title: "100% Private", desc: "Calculations stay on your device" },
  { icon: Smartphone, title: "Home Screen", desc: "One tap access from home screen" },
];

const platforms = [
  { name: "Android (Chrome)", instructions: "Tap menu in top-right corner, then Add to Home Screen" },
  { name: "iPhone (Safari)", instructions: "Tap the Share icon at the bottom, then Add to Home Screen" },
  { name: "Windows / Mac", instructions: "Click the install icon in the browser address bar" },
];

export default function PWAInstallSection() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setInstallSuccess(true);
    });
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstallSuccess(true);
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#060c18" }}>
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(245,158,11,0.07) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(5,150,105,0.08) 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">

          {/* Left — content */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-500 mb-6">
              Available on All Platforms
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight tracking-tight mb-6">
              Install the App.<br />
              <span style={{ color: "#60a5fa" }}>Calculate Anywhere.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-12 leading-relaxed">
              Get instant access to all 30+ financial calculators from your home screen.
              Works fully offline — no internet required after first load.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm mb-0.5">{f.title}</p>
                      <p className="text-slate-500 text-xs leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            {isInstalled || installSuccess ? (
              <div
                className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl mb-6"
                style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-emerald-400 font-bold text-sm">App Installed</p>
                  <p className="text-emerald-500/70 text-xs">Open from your home screen</p>
                </div>
              </div>
            ) : deferredPrompt ? (
              <button
                onClick={handleInstall}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all duration-200 hover:-translate-y-0.5 mb-6"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  boxShadow: "0 0 40px rgba(245,158,11,0.3)",
                }}
              >
                <Download className="w-5 h-5" />
                Install Free App
              </button>
            ) : null}

            {/* Manual install steps — always visible */}
            {!isInstalled && !installSuccess && (
              <div className="space-y-2.5">
                <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">
                  How to Install
                </p>
                {platforms.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-start gap-3 p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-white text-sm font-semibold">{p.name}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{p.instructions}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone shell */}
              <div
                className="w-64 h-[500px] rounded-[3rem] overflow-hidden relative"
                style={{
                  background: "#0f172a",
                  border: "1.5px solid rgba(255,255,255,0.1)",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05) inset",
                }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10" />

                {/* Status bar */}
                <div className="px-6 pt-8 pb-3 flex justify-between items-center">
                  <span className="text-white/70 text-[10px] font-medium">9:41</span>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-1.5 bg-white/40 rounded-sm" />
                    <div className="w-1 h-2 bg-emerald-400 rounded-sm" />
                  </div>
                </div>

                {/* App content */}
                <div className="px-4 pb-4">
                  <div className="flex items-center gap-2 mb-5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #2563eb, #059669)" }}
                    >
                      <span className="text-white text-[10px] font-black">CF</span>
                    </div>
                    <span className="text-white text-xs font-bold">Calculate Future</span>
                  </div>

                  <p className="text-slate-500 text-[10px] font-semibold uppercase tracking-wider mb-3">Quick Access</p>

                  <div className="space-y-2">
                    {[
                      { label: "SIP Calculator", color: "#3b82f6" },
                      { label: "FD Calculator", color: "#10b981" },
                      { label: "EMI Calculator", color: "#8b5cf6" },
                      { label: "Income Tax", color: "#f59e0b" },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center gap-3 p-3 rounded-xl"
                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div
                          className="w-6 h-6 rounded-lg flex-shrink-0"
                          style={{ background: `${item.color}22`, border: `1px solid ${item.color}33` }}
                        />
                        <span className="text-white text-xs font-medium">{item.label}</span>
                        <div className="ml-auto w-1 h-3 bg-white/20 rounded-full" />
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-4 p-3 rounded-xl"
                    style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.15)" }}
                  >
                    <p className="text-emerald-400 text-[10px] font-bold mb-0.5">Offline Mode Active</p>
                    <p className="text-slate-500 text-[9px]">All calculators available without internet</p>
                  </div>
                </div>
              </div>

              {/* Floating stat cards */}
              <div
                className="absolute -right-10 top-20 rounded-2xl p-3.5"
                style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-emerald-400 font-black text-sm">+₹2.4 Cr</p>
                <p className="text-slate-500 text-xs">SIP in 20 yrs</p>
              </div>
              <div
                className="absolute -left-10 bottom-28 rounded-2xl p-3.5"
                style={{ background: "rgba(15,23,42,0.9)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(12px)" }}
              >
                <p className="text-blue-400 font-black text-sm">₹0 Tax</p>
                <p className="text-slate-500 text-xs">under ₹12L income</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
