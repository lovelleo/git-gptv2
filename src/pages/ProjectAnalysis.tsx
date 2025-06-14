
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SynthCard, SynthButton, SynthInput, SynthCollapsible } from "@/components/synth";
import { Search, Send, Bot, User, Lightbulb, Code2, FileText } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessage {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface QueryCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  queries: Array<{
    id: string;
    title: string;
    preview: string;
    timestamp: Date;
  }>;
}

const ProjectAnalysis = () => {
  const { id } = useParams<{ id: string }>();
  const [currentQuery, setCurrentQuery] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string | null>(null);

  // Mock data for past queries
  const queryCategories: QueryCategory[] = [
    {
      id: "code-analysis",
      name: "Code Analysis",
      icon: <Code2 className="h-4 w-4" />,
      queries: [
        {
          id: "1",
          title: "Component Dependencies",
          preview: "Analyze the dependencies between React components...",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
        },
        {
          id: "2", 
          title: "Performance Bottlenecks",
          preview: "Identify potential performance issues in the codebase...",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
        }
      ]
    },
    {
      id: "documentation",
      name: "Documentation",
      icon: <FileText className="h-4 w-4" />,
      queries: [
        {
          id: "3",
          title: "API Documentation",
          preview: "Generate comprehensive API documentation...",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
        }
      ]
    }
  ];

  // Mock chat history
  const mockChatHistory: ChatMessage[] = [
    {
      id: "1",
      type: "user",
      content: "Can you analyze the user authentication flow and suggest improvements?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30)
    },
    {
      id: "2",
      type: "ai",
      content: `# Authentication Flow Analysis

I've analyzed your current authentication implementation and found several areas for improvement:

## Current Implementation
\`\`\`typescript
// Current login function
const login = async (email: string, password: string) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response.json();
};
\`\`\`

## Recommendations

1. **Add Input Validation**: Implement client-side validation before sending requests
2. **Error Handling**: Add proper error boundaries and user feedback
3. **Security Headers**: Implement CSRF protection and secure cookie settings
4. **Rate Limiting**: Add protection against brute force attacks

## Implementation Priority
- High: Input validation and error handling
- Medium: Security headers implementation  
- Low: Advanced rate limiting strategies`,
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      suggestions: [
        "Show me how to implement input validation",
        "Generate secure login component",
        "Explain CSRF protection setup"
      ]
    }
  ];

  useEffect(() => {
    setChatHistory(mockChatHistory);
  }, []);

  const handleSendQuery = async () => {
    if (!currentQuery.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: currentQuery,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, userMessage]);
    setCurrentQuery("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: `# Analysis Response

Thank you for your query: "${currentQuery}"

Based on the current project structure, here are my recommendations:

\`\`\`javascript
// Example implementation
const optimizedFunction = () => {
  // Your optimized code here
  return result;
};
\`\`\`

This approach will improve performance and maintainability.`,
        timestamp: new Date(),
        suggestions: [
          "Explain this in more detail",
          "Show alternative approaches",
          "Generate implementation code"
        ]
      };

      setChatHistory(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setCurrentQuery(suggestion);
  };

  return (
    <div className="min-h-screen bg-synth-bg">
      <div className="flex h-screen">
        {/* Left Sidebar - Past Queries */}
        <div className="w-80 border-r border-synth-text/10 bg-synth-surface p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-synth-text">Past Queries</h2>
              <SynthButton variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </SynthButton>
            </div>

            <SynthInput
              placeholder="Search queries..."
              icon={<Search className="h-4 w-4" />}
            />

            <div className="space-y-4">
              {queryCategories.map((category) => (
                <SynthCard key={category.id} variant="inset" padding="sm">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-synth-text">
                      {category.icon}
                      {category.name}
                    </div>
                    <div className="space-y-2">
                      {category.queries.map((query) => (
                        <SynthCard
                          key={query.id}
                          variant={selectedQuery === query.id ? "inset" : "flat"}
                          padding="sm"
                          className={`cursor-pointer transition-all duration-200 ${
                            selectedQuery === query.id 
                              ? "ring-2 ring-synth-primary ring-offset-1 ring-offset-synth-bg" 
                              : "hover:shadow-neumorphic-hover"
                          }`}
                          onClick={() => setSelectedQuery(query.id)}
                        >
                          <div>
                            <h4 className="text-sm font-medium text-synth-text line-clamp-1">
                              {query.title}
                            </h4>
                            <p className="text-xs text-synth-text-muted line-clamp-2 mt-1">
                              {query.preview}
                            </p>
                            <span className="text-xs text-synth-text-muted">
                              {query.timestamp.toLocaleDateString()}
                            </span>
                          </div>
                        </SynthCard>
                      ))}
                    </div>
                  </div>
                </SynthCard>
              ))}
            </div>
          </div>
        </div>

        {/* Main Panel - Chat Interface */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="border-b border-synth-text/10 p-6 bg-synth-surface">
            <h1 className="text-xl font-bold text-synth-text">
              Project Analysis - AI Assistant
            </h1>
            <p className="text-synth-text-muted text-sm mt-1">
              Ask questions about your codebase, architecture, and get intelligent insights
            </p>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {chatHistory.map((message) => (
              <div key={message.id} className="space-y-3">
                {message.type === "user" ? (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-synth-primary text-white">
                      <User className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-synth-text bg-synth-surface p-4 rounded-xl shadow-neumorphic-inset">
                        {message.content}
                      </div>
                      <span className="text-xs text-synth-text-muted mt-1 block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-synth-secondary text-white">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="flex-1 space-y-3">
                      <SynthCollapsible title="AI Analysis Response" defaultOpen>
                        <div className="prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                  <SyntaxHighlighter
                                    style={tomorrow}
                                    language={match[1]}
                                    PreTag="div"
                                    className="rounded-lg"
                                    {...props}
                                  >
                                    {String(children).replace(/\n$/, '')}
                                  </SyntaxHighlighter>
                                ) : (
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                );
                              },
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      </SynthCollapsible>
                      
                      {message.suggestions && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-synth-text-muted">
                            <Lightbulb className="h-4 w-4" />
                            Follow-up suggestions:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.suggestions.map((suggestion, index) => (
                              <SynthButton
                                key={index}
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleSuggestionClick(suggestion)}
                              >
                                {suggestion}
                              </SynthButton>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <span className="text-xs text-synth-text-muted block">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-synth-secondary text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <SynthCard className="p-4">
                    <div className="flex items-center gap-2 text-synth-text-muted">
                      <div className="w-2 h-2 bg-synth-primary rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-synth-primary rounded-full animate-pulse delay-75"></div>
                      <div className="w-2 h-2 bg-synth-primary rounded-full animate-pulse delay-150"></div>
                      <span className="ml-2">AI is analyzing...</span>
                    </div>
                  </SynthCard>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t border-synth-text/10 p-6 bg-synth-surface">
            <div className="flex gap-3">
              <div className="flex-1">
                <SynthInput
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  placeholder="Ask me anything about your project's code, architecture, or best practices..."
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendQuery();
                    }
                  }}
                />
              </div>
              <SynthButton
                variant="primary"
                size="icon"
                onClick={handleSendQuery}
                disabled={!currentQuery.trim() || isLoading}
              >
                <Send className="h-4 w-4" />
              </SynthButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectAnalysis;
