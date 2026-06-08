// src/components/Footer.jsx
import { Zap, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 py-6 border-t border-gray-200/60 dark:border-gray-800/60">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center">
            <Zap size={10} className="text-white" fill="white" />
          </div>
          <span className="font-semibold text-gray-600 dark:text-gray-400">NutriIQ</span>
          <span>·</span>
          <span>Nutrition Intelligence Platform</span>
        </div>

        <div className="flex items-center gap-1">
          <span>Formulas: Mifflin-St Jeor · MET · BMI</span>
          <span className="mx-1">·</span>
          <span className="flex items-center gap-1">
            Built with <Heart size={10} className="text-rose-400 fill-rose-400" /> for health
          </span>
        </div>

        <div>
          <span>Data stored locally · No account required</span>
        </div>
      </div>
    </footer>
  );
}
