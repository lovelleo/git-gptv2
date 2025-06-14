
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Settings, Palette, Edit, Trash2, Eye, EyeOff } from "lucide-react";
import { SynthCard, SynthButton, SynthInput, SynthToggle, SynthFileDropzone, SynthSelect } from "@/components/synth";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "inactive";
  lastLogin: string;
}

interface Integration {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  apiKey?: string;
  icon: string;
}

const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@company.com",
    role: "Developer",
    status: "active",
    lastLogin: "2 hours ago"
  },
  {
    id: "2",
    name: "Jane Smith", 
    email: "jane@company.com",
    role: "Business Analyst",
    status: "active",
    lastLogin: "1 day ago"
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@company.com", 
    role: "Manager",
    status: "inactive",
    lastLogin: "1 week ago"
  }
];

const mockIntegrations: Integration[] = [
  {
    id: "1",
    name: "OpenAI",
    description: "AI-powered code generation and analysis",
    enabled: true,
    apiKey: "sk-***************************",
    icon: "🤖"
  },
  {
    id: "2",
    name: "JIRA",
    description: "Project management and issue tracking",
    enabled: false,
    icon: "📋"
  },
  {
    id: "3",
    name: "GitHub",
    description: "Source code management and version control",
    enabled: true,
    apiKey: "ghp_***************************",
    icon: "📦"
  }
];

const roleOptions = [
  { value: "developer", label: "Developer" },
  { value: "analyst", label: "Business Analyst" },
  { value: "manager", label: "Manager" },
  { value: "admin", label: "Administrator" }
];

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(mockUsers);
  const [integrations, setIntegrations] = useState(mockIntegrations);
  const [showApiKeys, setShowApiKeys] = useState<{ [key: string]: boolean }>({});
  const [companyName, setCompanyName] = useState("Acme Corporation");
  const [companyWebsite, setCompanyWebsite] = useState("https://acme.com");

  const tabs = [
    { id: "users", label: "User Management", icon: Users },
    { id: "integrations", label: "API Integrations", icon: Settings },
    { id: "branding", label: "Company Branding", icon: Palette }
  ];

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "inactive" : "active" }
        : user
    ));
  };

  const toggleIntegration = (integrationId: string) => {
    setIntegrations(integrations.map(integration =>
      integration.id === integrationId
        ? { ...integration, enabled: !integration.enabled }
        : integration
    ));
  };

  const toggleApiKeyVisibility = (integrationId: string) => {
    setShowApiKeys(prev => ({
      ...prev,
      [integrationId]: !prev[integrationId]
    }));
  };

  return (
    <div className="min-h-screen bg-synth-bg">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-synth-surface shadow-neumorphic min-h-screen p-6">
          <h1 className="text-2xl font-bold text-synth-text mb-8">Admin Settings</h1>
          
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <motion.button
                  key={tab.id}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                    isActive 
                      ? "bg-synth-primary text-white shadow-neumorphic-inset" 
                      : "text-synth-text hover:bg-synth-text/5"
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  {tab.label}
                </motion.button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-synth-text">User Management</h2>
                <SynthButton variant="primary">
                  Add New User
                </SynthButton>
              </div>

              <SynthCard>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-synth-text/10">
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Last Login</th>
                        <th className="text-left py-3 px-4 font-medium text-synth-text">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b border-synth-text/5">
                          <td className="py-3 px-4 text-synth-text">{user.name}</td>
                          <td className="py-3 px-4 text-synth-text-muted">{user.email}</td>
                          <td className="py-3 px-4 text-synth-text">{user.role}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              user.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-synth-text-muted">{user.lastLogin}</td>
                          <td className="py-3 px-4">
                            <div className="flex gap-2">
                              <SynthButton variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                                Edit Role
                              </SynthButton>
                              <SynthButton 
                                variant="ghost" 
                                size="sm"
                                onClick={() => toggleUserStatus(user.id)}
                              >
                                {user.status === "active" ? "Deactivate" : "Activate"}
                              </SynthButton>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </SynthCard>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-synth-text">API Integrations</h2>

              <div className="grid gap-6">
                {integrations.map((integration) => (
                  <SynthCard key={integration.id}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <span className="text-3xl">{integration.icon}</span>
                        <div>
                          <h3 className="text-lg font-semibold text-synth-text">
                            {integration.name}
                          </h3>
                          <p className="text-synth-text-muted mb-4">
                            {integration.description}
                          </p>
                          
                          {integration.enabled && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <SynthInput
                                  label="API Key"
                                  type={showApiKeys[integration.id] ? "text" : "password"}
                                  value={integration.apiKey || ""}
                                  placeholder="Enter API key..."
                                  className="flex-1"
                                />
                                <SynthButton
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => toggleApiKeyVisibility(integration.id)}
                                  className="mt-6"
                                >
                                  {showApiKeys[integration.id] ? 
                                    <EyeOff className="h-4 w-4" /> : 
                                    <Eye className="h-4 w-4" />
                                  }
                                </SynthButton>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <SynthToggle
                        checked={integration.enabled}
                        onCheckedChange={() => toggleIntegration(integration.id)}
                        label="Enable"
                      />
                    </div>
                  </SynthCard>
                ))}
              </div>
            </div>
          )}

          {activeTab === "branding" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-synth-text">Company Branding</h2>

              <SynthCard>
                <div className="space-y-6">
                  <SynthFileDropzone
                    label="Company Logo"
                    accept="image/*"
                    maxFiles={1}
                  />
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <SynthInput
                      label="Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                    <SynthInput
                      label="Website URL"
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </div>
                  
                  <SynthInput
                    label="Company Description"
                    placeholder="Enter a brief description of your company..."
                  />
                  
                  <div className="flex gap-3 pt-4">
                    <SynthButton variant="primary">
                      Save Changes
                    </SynthButton>
                    <SynthButton variant="ghost">
                      Reset to Default
                    </SynthButton>
                  </div>
                </div>
              </SynthCard>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
