"use client";

import { useState, useEffect } from "react";
import { Download, Wifi, Smartphone, Zap, Shield, Bell } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const features = [
  { icon: Wifi, title: "Works Offline", desc: "Use calculators without internet" },
  { icon: Zap, title: "Lightning Fast", desc: "Native app-like performance" },
  { icon: Shield, title: "100% Private", desc: "All calculations stay on device" },
  { icon: Bell, title: "Instant Access", desc: "Open from home screen in 1 tap" },
];

const platforms = [
  { name: "Android", icon: "🤖", instructions: "Tap menu (⋮) → Add to Home Screen" },
  { name: "iPhone", icon: "🍎", instructions: "Tap Share (⬆️) → Add to Home Screen" },
  { name: "Windows", icon: "🪟", instructions: "Click install icon in address bar" },
  { name: "Mac", icon: "💻", instructions: "Click install icon in Chrome/Edge" },
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
    <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(5,150,105,0.4) 0%, transparent 50%)"
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium mb-6">
              📱 Install App
            </div>
            <h2 className="text-4xl font-extrabold text-white mb-4">
              Install Calculate Future App
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Get instant access to all financial calculators directly from your home screen. Works offline, loads instantly, feels native.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white font-semibold text-sm">{f.title}</div>
                      <div className="text-slate-400 text-xs">{f.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Install button */}
            {isInstalled || installSuccess ? (
              <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/20 border border-emerald-500/30 rounded-2xl text-emerald-400">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="font-bold">App Installed!</div>
                  <div className="text-sm text-emerald-300">Open from your home screen</div>
                </div>
              </div>
            ) : deferredPrompt ? (
              <button
                onClick={handleInstall}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all hover:-translate-y-1"
              >
                <Download className="w-6 h-6" />
                Install App — Free
              </button>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-400 text-sm font-medium">Manual installation:</p>
                {platforms.map((p) => (
                  <div key={p.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10">
                    <span className="text-xl">{p.icon}</span>
                    <div>
                      <span className="text-white text-sm font-semibold">{p.name}:</span>
                      <span className="text-slate-400 text-sm ml-2">{p.instructions}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right - App mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="w-64 h-[500px] bg-slate-800 rounded-[3rem] border-4 border-slate-700 shadow-2xl shadow-blue-500/20 overflow-hidden relative">
                {/* Status bar */}
                <div className="bg-slate-900 px-6 py-3 flex justify-between items-center">
                  <span className="text-white text-xs">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-2 bg-white/60 rounded-sm" />
                    <div className="w-1 h-2 bg-emerald-400 rounded-sm" />
                  </div>
                </div>
                {/* App content preview */}
                <div className="p-4 bg-gradient-to-b from-blue-950 to-slate-900 h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl" />
                    <span className="text-white text-sm font-bold">Calculate Future</span>
                  </div>
                  <div className="space-y-3">
                    {["SIP Calculator", "FD Calculator", "EMI Calculator", "Income Tax"].map((item, i) => (
                      <div
                        key={item}
                        className="bg-white/10 rounded-xl p-3 flex items-center gap-3"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg opacity-80" />
                        <div>
                          <div className="text-white text-xs font-semibold">{item}</div>
                          <div className="text-slate-400 text-xs">Tap to calculate</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/30">
                    <div className="text-emerald-400 text-xs font-semibold mb-1">✅ Works Offline</div>
                    <div className="text-slate-400 text-xs">All calculators available without internet</div>
                  </div>
                </div>
              </div>
              {/* Floating badges */}
              <div className="absolute -right-8 top-16 bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="text-emerald-600 font-bold text-sm">+₹2.4 Cr</div>
                <div className="text-slate-500 text-xs">in 20 years</div>
              </div>
              <div className="absolute -left-8 bottom-24 bg-white dark:bg-slate-800 rounded-2xl p-3 shadow-xl border border-slate-200 dark:border-slate-700">
                <div className="text-blue-600 font-bold text-sm">₹15,000 EMI</div>
                <div className="text-slate-500 text-xs">Home Loan</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
