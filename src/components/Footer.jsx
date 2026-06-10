// src/components/Footer.jsx
import { Zap, Shield, Database } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200/60 dark:border-gray-800/60">
      <div className="py-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-400 to-emerald-600 flex items-center justify-center">
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="font-semibold text-gray-800 dark:text-gray-200">
              NutriIQ
            </span>
          </div>

          <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">
            Nutrition Intelligence Platform
          </p>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            Features
          </h4>

          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <p>• BMI Analysis</p>
            <p>• BMR & TDEE Calculator</p>
            <p>• Macro Planning</p>
            <p>• Hydration Tracking</p>
          </div>
        </div>

        {/* Privacy */}
        <div>
          <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
            Privacy & Accuracy
          </h4>

          <div className="space-y-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Database size={14} />
              <span>Data stored locally</span>
            </div>

            <div className="flex items-center gap-2">
              <Shield size={14} />
              <span>No account required</span>
            </div>

            <p className="pt-1">
              Powered by Mifflin-St Jeor, BMI and MET formulas.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200/60 dark:border-gray-800/60 py-4 text-center text-xs text-gray-500">
        © 2026 NutriIQ • Built by Arshan Ansari
      </div>
    </footer>
  );
}