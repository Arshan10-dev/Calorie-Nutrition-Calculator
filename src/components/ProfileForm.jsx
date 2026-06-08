// src/components/ProfileForm.jsx
import { motion } from 'framer-motion';
import { User, Ruler, Weight, Target, Calendar, RotateCcw } from 'lucide-react';
import { useUser } from '../context/UserContext';

function Field({ label, icon: Icon, children, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300">
        <Icon size={14} className="text-brand-500" />
        {label}
      </label>
      {children}
      {hint && <p className="text-xs text-gray-400 dark:text-gray-500">{hint}</p>}
    </div>
  );
}

function TextInput({ value, onChange, placeholder, type = 'text', min, max, step }) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      step={step}
      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700
        bg-gray-50 dark:bg-gray-800/60 text-gray-900 dark:text-white text-sm
        placeholder:text-gray-400 dark:placeholder:text-gray-500
        focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-400
        transition-all duration-200"
    />
  );
}

export default function ProfileForm() {
  const { profile, updateProfile, resetProfile } = useUser();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.4 } },
  };

  return (
    <div className="space-y-6">
      {/* Card header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-display font-bold text-gray-900 dark:text-white">
            Your Profile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
            All calculations update in real-time
          </p>
        </div>
        <button
          onClick={resetProfile}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400
            border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800
            transition-colors"
        >
          <RotateCcw size={12} />
          Reset
        </button>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        {/* Name */}
        <motion.div variants={itemVariants} className="sm:col-span-2">
          <Field label="Full Name" icon={User}>
            <TextInput
              value={profile.name}
              onChange={(v) => updateProfile({ name: v })}
              placeholder="Your name (optional)"
            />
          </Field>
        </motion.div>

        {/* Age */}
        <motion.div variants={itemVariants}>
          <Field label="Age" icon={Calendar} hint="Years (15–100)">
            <TextInput
              type="number"
              value={profile.age}
              onChange={(v) => updateProfile({ age: v })}
              placeholder="e.g. 28"
              min={15}
              max={100}
            />
          </Field>
        </motion.div>

        {/* Gender */}
        <motion.div variants={itemVariants}>
          <Field label="Biological Sex" icon={User} hint="Used for BMR formula">
            <div className="grid grid-cols-2 gap-2">
              {['male', 'female'].map((g) => (
                <button
                  key={g}
                  onClick={() => updateProfile({ gender: g })}
                  className={`py-2.5 rounded-xl text-sm font-semibold capitalize border transition-all duration-200
                    ${profile.gender === g
                      ? 'bg-brand-500 border-brand-500 text-white shadow-neon-green'
                      : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-brand-300 dark:hover:border-brand-700'
                    }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </Field>
        </motion.div>

        {/* Height */}
        <motion.div variants={itemVariants}>
          <Field label="Height" icon={Ruler} hint="In centimeters">
            <TextInput
              type="number"
              value={profile.heightCm}
              onChange={(v) => updateProfile({ heightCm: v })}
              placeholder="e.g. 172"
              min={100}
              max={250}
            />
          </Field>
        </motion.div>

        {/* Current Weight */}
        <motion.div variants={itemVariants}>
          <Field label="Current Weight" icon={Weight} hint="In kilograms">
            <TextInput
              type="number"
              value={profile.weightKg}
              onChange={(v) => updateProfile({ weightKg: v })}
              placeholder="e.g. 70"
              min={30}
              max={300}
              step={0.1}
            />
          </Field>
        </motion.div>

        {/* Goal Weight */}
        <motion.div variants={itemVariants} className="sm:col-span-2">
          <Field label="Goal Weight" icon={Target} hint="Your target weight in kilograms">
            <TextInput
              type="number"
              value={profile.goalWeightKg}
              onChange={(v) => updateProfile({ goalWeightKg: v })}
              placeholder="e.g. 65"
              min={30}
              max={300}
              step={0.1}
            />
          </Field>
        </motion.div>
      </motion.div>
    </div>
  );
}
