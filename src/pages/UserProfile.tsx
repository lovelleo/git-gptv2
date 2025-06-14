
import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Globe } from "lucide-react";
import { SynthCard, SynthButton, SynthInput, SynthToggle, SynthSelect } from "@/components/synth";
import { useTheme } from "@/hooks/useTheme";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
  { value: "fr", label: "Français" },
  { value: "de", label: "Deutsch" },
  { value: "it", label: "Italiano" },
  { value: "pt", label: "Português" }
];

const UserProfile = () => {
  const { theme, toggleTheme } = useTheme();
  const [language, setLanguage] = useState("en");
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@company.com",
    title: "Senior Developer",
    department: "Engineering"
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving user profile...", userInfo);
  };

  return (
    <div className="min-h-screen bg-synth-bg flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <SynthCard className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <motion.div
              className="relative inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="w-24 h-24 bg-synth-primary rounded-full shadow-neumorphic flex items-center justify-center text-white text-2xl font-bold mx-auto">
                {userInfo.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-synth-surface rounded-full shadow-neumorphic flex items-center justify-center cursor-pointer">
                <User className="h-4 w-4 text-synth-text" />
              </div>
            </motion.div>
            
            <div>
              <h1 className="text-2xl font-bold text-synth-text">{userInfo.name}</h1>
              <p className="text-synth-text-muted">{userInfo.title}</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-synth-text">Profile Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <SynthInput
                label="Full Name"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                icon={<User className="h-4 w-4" />}
              />
              <SynthInput
                label="Email Address"
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                icon={<Mail className="h-4 w-4" />}
              />
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <SynthInput
                label="Job Title"
                value={userInfo.title}
                onChange={(e) => setUserInfo({...userInfo, title: e.target.value})}
              />
              <SynthInput
                label="Department"
                value={userInfo.department}
                onChange={(e) => setUserInfo({...userInfo, department: e.target.value})}
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-synth-text">Preferences</h2>
            
            <div className="space-y-4">
              <SynthToggle
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                label="Dark Mode"
                description="Toggle between light and dark theme"
              />
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                  <label className="text-sm font-medium leading-none text-synth-text">
                    Language
                  </label>
                  <p className="text-xs text-synth-text-muted">
                    Choose your preferred language
                  </p>
                </div>
                <div className="w-48">
                  <SynthSelect
                    options={languageOptions}
                    value={language}
                    onValueChange={setLanguage}
                    placeholder="Select language"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-synth-text">Notifications</h2>
            
            <div className="space-y-4">
              <SynthToggle
                label="Email Notifications"
                description="Receive updates via email"
                checked={true}
              />
              <SynthToggle
                label="Push Notifications"
                description="Receive browser notifications"
                checked={false}
              />
              <SynthToggle
                label="Project Updates"
                description="Get notified about project changes"
                checked={true}
              />
            </div>
          </div>

          {/* Security */}
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-synth-text">Security</h2>
            
            <div className="space-y-4">
              <SynthButton variant="ghost" className="w-full justify-start">
                Change Password
              </SynthButton>
              <SynthButton variant="ghost" className="w-full justify-start">
                Two-Factor Authentication
              </SynthButton>
              <SynthButton variant="ghost" className="w-full justify-start text-red-500">
                Delete Account
              </SynthButton>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-synth-text/10">
            <SynthButton variant="primary" onClick={handleSave} className="flex-1">
              Save Changes
            </SynthButton>
            <SynthButton variant="ghost" className="flex-1">
              Cancel
            </SynthButton>
          </div>
        </SynthCard>
      </motion.div>
    </div>
  );
};

export default UserProfile;
