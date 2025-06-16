
import { useState } from "react";
import { Link } from "react-router-dom";
import { SynthCard, SynthButton, SynthInput, SynthToggle } from "@/components/synth";
import { useTheme } from "@/hooks/useTheme";
import { Github, Mail, Lock, Sun, Moon, BarChart3, FileText } from "lucide-react";

const Index = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="min-h-screen bg-synth-bg p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-synth-text">
            Synth Design System
          </h1>
          <p className="text-synth-text-muted">
            Neumorphic components with smooth animations
          </p>
          
          {/* Theme Toggle */}
          <SynthButton
            variant="circular"
            size="circular"
            onClick={toggleTheme}
            className="mx-auto"
          >
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </SynthButton>
        </div>

        {/* Navigation Demo */}
        <SynthCard className="text-center space-y-4">
          <h2 className="text-2xl font-semibold text-synth-text">Demo Pages</h2>
          <div className="flex gap-4 justify-center">
            <Link to="/dashboard/manager">
              <SynthButton variant="primary">
                <BarChart3 className="h-4 w-4" />
                Manager Dashboard
              </SynthButton>
            </Link>
            <Link to="/project/1/stories">
              <SynthButton variant="secondary">
                <FileText className="h-4 w-4" />
                Project Stories
              </SynthButton>
            </Link>
          </div>
        </SynthCard>

        {/* Component Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Login Card Demo */}
          <SynthCard className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-synth-text">Login</h2>
              <p className="text-synth-text-muted">Sign in to your account</p>
            </div>

            {/* OAuth Buttons */}
            <div className="flex gap-4 justify-center">
              <SynthButton variant="circular" size="circular">
                <Github className="h-5 w-5" />
              </SynthButton>
              <SynthButton variant="circular" size="circular">
                <Mail className="h-5 w-5" />
              </SynthButton>
            </div>

            <div className="text-center text-synth-text-muted">
              <span>or</span>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              <SynthInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="h-4 w-4" />}
              />
              <SynthInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-4 w-4" />}
              />
            </div>

            <SynthButton variant="primary" className="w-full">
              Sign In
            </SynthButton>
          </SynthCard>

          {/* Components Demo */}
          <SynthCard className="space-y-6">
            <h2 className="text-2xl font-semibold text-synth-text">Components</h2>
            
            {/* Button Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-synth-text">Buttons</h3>
              <div className="flex flex-wrap gap-2">
                <SynthButton variant="default">Default</SynthButton>
                <SynthButton variant="primary">Primary</SynthButton>
                <SynthButton variant="secondary">Secondary</SynthButton>
                <SynthButton variant="ghost">Ghost</SynthButton>
                <SynthButton variant="flat">Flat</SynthButton>
              </div>
            </div>

            {/* Card Variants */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-synth-text">Cards</h3>
              <div className="grid grid-cols-1 gap-4">
                <SynthCard variant="elevated" padding="sm">
                  <p className="text-sm text-synth-text">Elevated Card</p>
                </SynthCard>
                <SynthCard variant="inset" padding="sm">
                  <p className="text-sm text-synth-text">Inset Card</p>
                </SynthCard>
                <SynthCard variant="flat" padding="sm">
                  <p className="text-sm text-synth-text">Flat Card</p>
                </SynthCard>
              </div>
            </div>

            {/* Toggle */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-synth-text">Toggle</h3>
              <SynthToggle
                label="Dark Mode"
                description="Toggle between light and dark themes"
                checked={isToggled}
                onCheckedChange={setIsToggled}
              />
            </div>
          </SynthCard>
        </div>
      </div>
    </div>
  );
};

export default Index;
