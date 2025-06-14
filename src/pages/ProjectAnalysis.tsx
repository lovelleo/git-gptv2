
import { useState } from "react";
import { SynthCard, SynthButton, SynthInput, SynthCollapsible } from "@/components/synth";
import { Search, Send, MessageSquare, BarChart3, FileText, Code } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

const ProjectAnalysis = () => {
  const [query, setQuery] = useState("");
  const [selectedQuery, setSelectedQuery] = useState<number | null>(1);

  // Mock data for past queries
  const pastQueries = [
    {
      id: 1,
      title: "Code Quality Analysis",
      category: "Quality",
      timestamp: "2024-01-15 10:30",
      query: "Analyze the code quality of our user authentication module"
    },
    {
      id: 2,
      title: "Performance Bottlenecks",
      category: "Performance", 
      timestamp: "2024-01-14 15:45",
      query: "What are the main performance bottlenecks in our application?"
    },
    {
      id: 3,
      title: "Security Vulnerabilities",
      category: "Security",
      timestamp: "2024-01-13 09:15",
      query: "Check for potential security vulnerabilities in the payment module"
    }
  ];

  // Mock chat history
  const chatHistory = [
    {
      id: 1,
      type: "user" as const,
      content: "Analyze the code quality of our user authentication module",
      timestamp: "10:30"
    },
    {
      id: 2,
      type: "ai" as const,
      content: `# Code Quality Analysis Report

## Overall Assessment
The user authentication module shows **good** code quality with some areas for improvement.

## Key Findings

### Strengths
- Proper error handling implementation
- Consistent naming conventions
- Good separation of concerns

### Areas for Improvement
- Missing unit tests for edge cases
- Some functions exceed recommended length
- Documentation could be more comprehensive

## Code Example
Here's an example of well-structured authentication logic:

\`\`\`typescript
interface AuthService {
  login(credentials: LoginCredentials): Promise<AuthResult>;
  logout(): Promise<void>;
  validateToken(token: string): boolean;
}

class AuthServiceImpl implements AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResult> {
    try {
      const response = await this.api.post('/auth/login', credentials);
      return { success: true, token: response.data.token };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
\`\`\`

## Recommendations
1. Add comprehensive unit tests
2. Implement integration tests
3. Add JSDoc documentation
4. Consider using a state machine for auth flows`,
      timestamp: "10:31",
      followUps: [
        "Show me the specific functions that are too long",
        "Generate unit tests for the auth module",
        "What security best practices should we implement?"
      ]
    }
  ];

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      "Quality": BarChart3,
      "Performance": FileText,
      "Security": Code
    };
    const Icon = icons[category] || MessageSquare;
    return <Icon className="h-4 w-4" />;
  };

  const selectedQueryData = pastQueries.find(q => q.id === selectedQuery);

  return (
    <div className="min-h-screen bg-synth-bg">
      <div className="flex h-screen">
        {/* Left Sidebar */}
        <div className="w-1/4 border-r border-synth-text/10 bg-synth-surface p-6 overflow-y-auto">
          <div className="space-y-6">
            <h1 className="text-xl font-bold text-synth-text">Analysis History</h1>
            
            {/* Search */}
            <SynthInput
              placeholder="Search queries..."
              icon={<Search className="h-4 w-4" />}
            />

            {/* Past Queries */}
            <div className="space-y-3">
              {pastQueries.map((pastQuery) => (
                <SynthCard
                  key={pastQuery.id}
                  variant={selectedQuery === pastQuery.id ? "inset" : "elevated"}
                  padding="sm"
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedQuery === pastQuery.id 
                      ? "ring-2 ring-synth-primary ring-offset-2 ring-offset-synth-bg" 
                      : "hover:shadow-neumorphic-hover"
                  }`}
                  onClick={() => setSelectedQuery(pastQuery.id)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(pastQuery.category)}
                      <span className="text-xs text-synth-text-muted">{pastQuery.category}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-synth-text line-clamp-2">
                      {pastQuery.title}
                    </h3>
                    <p className="text-xs text-synth-text-muted">
                      {pastQuery.timestamp}
                    </p>
                  </div>
                </SynthCard>
              ))}
            </div>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1 flex flex-col">
          {/* Query Input */}
          <div className="p-6 border-b border-synth-text/10">
            <div className="flex gap-3">
              <SynthInput
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask me anything about your project..."
                className="flex-1"
              />
              <SynthButton variant="primary">
                <Send className="h-4 w-4" />
                Ask
              </SynthButton>
            </div>
          </div>

          {/* Chat History */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {chatHistory.map((message) => (
              <div key={message.id} className="space-y-3">
                {message.type === "user" ? (
                  <div className="flex justify-end">
                    <div className="bg-synth-primary text-white px-4 py-2 rounded-lg max-w-2xl">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <SynthCollapsible
                      title="AI Analysis Response"
                      defaultOpen={true}
                    >
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown
                          components={{
                            code: ({ children, className, ...props }) => {
                              const match = /language-(\w+)/.exec(className || '');
                              const language = match ? match[1] : '';
                              
                              if (language && typeof children === 'string') {
                                return (
                                  <SyntaxHighlighter
                                    style={tomorrow}
                                    language={language}
                                    PreTag="div"
                                    {...props}
                                  >
                                    {children}
                                  </SyntaxHighlighter>
                                );
                              }
                              
                              return (
                                <code className={className} {...props}>
                                  {children}
                                </code>
                              );
                            }
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    </SynthCollapsible>
                    
                    {/* Follow-up suggestions */}
                    {message.followUps && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.followUps.map((followUp, index) => (
                          <SynthButton
                            key={index}
                            variant="ghost"
                            size="sm"
                            onClick={() => setQuery(followUp)}
                          >
                            {followUp}
                          </SynthButton>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalysis;
