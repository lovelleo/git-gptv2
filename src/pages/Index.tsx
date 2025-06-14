
import { SynthButton, SynthCard } from "@/components/synth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BarChart3, FileText, Settings, User, FolderOpen } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const navigationCards = [
    {
      title: "Manager Dashboard",
      description: "View project overviews and team performance",
      icon: BarChart3,
      path: "/dashboard/manager",
      color: "bg-synth-primary"
    },
    {
      title: "Project Stories",
      description: "Manage user stories and development tasks",
      icon: FileText,
      path: "/project/1/stories",
      color: "bg-synth-secondary"
    },
    {
      title: "Project Analysis",
      description: "AI-powered project insights and analysis",
      icon: BarChart3,
      path: "/project/1/analysis",
      color: "bg-synth-accent"
    },
    {
      title: "Artifacts",
      description: "Manage project documents and files",
      icon: FolderOpen,
      path: "/artifacts",
      color: "bg-green-500"
    },
    {
      title: "Admin Settings",
      description: "Configure system settings and integrations",
      icon: Settings,
      path: "/admin/settings",
      color: "bg-red-500"
    },
    {
      title: "User Profile",
      description: "Manage your personal settings and preferences",
      icon: User,
      path: "/profile",
      color: "bg-purple-500"
    }
  ];

  return (
    <div className="min-h-screen bg-synth-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-synth-text mb-4"
          >
            Synth Project Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-synth-text-muted"
          >
            Neumorphic design meets AI-powered development
          </motion.p>
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {navigationCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <SynthCard className="h-full hover:shadow-neumorphic-hover transition-shadow cursor-pointer">
                  <div 
                    className="h-full flex flex-col"
                    onClick={() => navigate(card.path)}
                  >
                    <div className={`w-12 h-12 ${card.color} rounded-xl shadow-neumorphic flex items-center justify-center mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-synth-text mb-2">
                      {card.title}
                    </h3>
                    
                    <p className="text-synth-text-muted mb-4 flex-grow">
                      {card.description}
                    </p>
                    
                    <SynthButton 
                      variant="primary" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(card.path);
                      }}
                    >
                      Open
                    </SynthButton>
                  </div>
                </SynthCard>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-synth-text/10"
        >
          <p className="text-synth-text-muted">
            Built with ❤️ using React, TypeScript, and Neumorphic Design
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
