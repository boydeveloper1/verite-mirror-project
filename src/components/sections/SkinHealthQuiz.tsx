import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, ArrowRight, RotateCcw, Sparkles, AlertTriangle, ThumbsUp, Mail, Loader2, Gift } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How does your skin feel after showering?",
    options: [
      { label: "Normal and comfortable", score: 0 },
      { label: "Slightly tight or dry", score: 1 },
      { label: "Itchy or irritated", score: 2 },
      { label: "Burning, red, or painful", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Do you experience any skin conditions?",
    options: [
      { label: "None", score: 0 },
      { label: "Occasional dryness or sensitivity", score: 1 },
      { label: "Eczema, psoriasis, or rosacea (mild)", score: 2 },
      { label: "Severe eczema, psoriasis, or chronic skin issues", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How would you describe your water quality?",
    options: [
      { label: "Soft, filtered water", score: 0 },
      { label: "Average city water", score: 1 },
      { label: "Hard water (mineral deposits visible)", score: 2 },
      { label: "Very hard water or well water", score: 3 },
    ],
  },
  {
    id: 4,
    question: "How often do you experience skin flare-ups?",
    options: [
      { label: "Rarely or never", score: 0 },
      { label: "Occasionally (once a month)", score: 1 },
      { label: "Frequently (weekly)", score: 2 },
      { label: "Constantly (daily)", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Do you notice skin issues worsening in winter or after travel?",
    options: [
      { label: "No change", score: 0 },
      { label: "Slightly worse", score: 1 },
      { label: "Noticeably worse", score: 2 },
      { label: "Significantly worse", score: 3 },
    ],
  },
];

interface ResultData {
  title: string;
  description: string;
  recommendation: string;
  icon: typeof CheckCircle;
  color: string;
  urgency: string;
}

const getResultType = (score: number): string => {
  if (score <= 3) return "healthy";
  if (score <= 7) return "early_warning";
  if (score <= 11) return "needs_attention";
  return "priority";
};

const getResult = (score: number): ResultData => {
  if (score <= 3) {
    return {
      title: "Healthy Skin",
      description:
        "Great news! Your skin appears to be in good condition. Maintaining healthy skin now helps prevent future issues.",
      recommendation: "Our filtered shower head can help you maintain this healthy foundation and protect against hard water damage.",
      icon: ThumbsUp,
      color: "text-green-600",
      urgency: "Prevention",
    };
  } else if (score <= 7) {
    return {
      title: "Early Warning Signs",
      description:
        "Your skin is showing early signs of stress from water quality. Taking action now can prevent these issues from progressing.",
      recommendation: "Our 15-stage filtered shower head removes chlorine and minerals that may be irritating your skin.",
      icon: AlertTriangle,
      color: "text-yellow-600",
      urgency: "Early Intervention",
    };
  } else if (score <= 11) {
    return {
      title: "Skin Needs Attention",
      description:
        "Your skin is experiencing noticeable irritation, which is often triggered or worsened by unfiltered shower water.",
      recommendation:
        "Our shower filter removes 99% of chlorine and hard water minerals that trigger eczema, psoriasis, and rosacea flare-ups.",
      icon: AlertTriangle,
      color: "text-orange-600",
      urgency: "Recommended Action",
    };
  } else {
    return {
      title: "Skin Care Priority",
      description:
        "Your responses indicate significant skin irritation. The chlorine and minerals in your water may be a major contributor.",
      recommendation:
        "Our purifying shower head is specifically designed for sensitive skin. Most customers with similar conditions report relief within 2 weeks.",
      icon: AlertTriangle,
      color: "text-red-600",
      urgency: "Priority Care",
    };
  }
};

export const SkinHealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [email, setEmail] = useState("");
  const [emailCaptured, setEmailCaptured] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResult(false);
    setEmail("");
    setEmailCaptured(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const resultType = getResultType(totalScore);
      
      const { error } = await supabase.functions.invoke("send-quiz-results-email", {
        body: {
          email,
          score: totalScore,
          resultType,
          answers,
        },
      });

      if (error) throw error;

      toast.success("Check your inbox!", {
        description: "Your personalized skin care plan is on the way.",
      });
      setEmailCaptured(true);
    } catch (error) {
      console.error("Quiz email error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkipEmail = () => {
    setEmailCaptured(true);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/50 via-background to-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-10 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 bg-accent/10 text-accent font-bold uppercase tracking-wider text-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              Free Assessment
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">Skin Health Quiz</h2>
            <p className="text-muted-foreground text-lg">
              Take our quick 5-question quiz to discover if your water is affecting your skin
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          <div className="bg-card rounded-2xl border border-border shadow-medium p-6 md:p-8 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {!showResult ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex flex-col"
                >
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <span className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                      {currentQuestion + 1}
                    </span>
                    <span>of {questions.length} questions</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-6">
                    {questions[currentQuestion].question}
                  </h3>

                  <div className="space-y-3 flex-1">
                    {questions[currentQuestion].options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswer(option.score)}
                        className="w-full text-left p-4 rounded-xl border border-border bg-background hover:border-accent hover:bg-accent/5 transition-all duration-200 group"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-full border-2 border-muted-foreground/30 group-hover:border-accent flex items-center justify-center text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="text-foreground group-hover:text-accent transition-colors">
                            {option.label}
                          </span>
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : !emailCaptured ? (
                <motion.div
                  key="email-capture"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-20 h-20 rounded-full bg-${result.color.replace("text-", "")}/10 flex items-center justify-center mb-6`}
                  >
                    <result.icon className={`w-10 h-10 ${result.color}`} />
                  </div>

                  <span className={`text-xs font-bold uppercase tracking-wider ${result.color} mb-2`}>
                    {result.urgency}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{result.title}</h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{result.description}</p>

                  {/* Email Capture Form */}
                  <div className="w-full p-6 rounded-xl bg-gradient-to-br from-accent/10 to-primary/5 border border-accent/20 mb-6">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Gift className="w-5 h-5 text-accent" />
                      <span className="text-sm font-bold uppercase tracking-wider text-accent">
                        Exclusive Offer
                      </span>
                    </div>
                    
                    <h4 className="text-lg font-bold text-foreground mb-2">
                      Get Your Personalized Skin Care Plan
                    </h4>
                    
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your email to receive detailed steps tailored to your results.
                    </p>

                    <form onSubmit={handleEmailSubmit} className="space-y-3">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-11 h-12"
                          disabled={isSubmitting}
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="cta"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send My Skin Care Plan
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>

                    <button
                      onClick={handleSkipEmail}
                      className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Skip for now
                    </button>
                    
                    <p className="text-xs text-muted-foreground mt-3">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex-1 flex flex-col items-center text-center"
                >
                  <div
                    className={`w-20 h-20 rounded-full bg-${result.color.replace("text-", "")}/10 flex items-center justify-center mb-6`}
                  >
                    <result.icon className={`w-10 h-10 ${result.color}`} />
                  </div>

                  <span className={`text-xs font-bold uppercase tracking-wider ${result.color} mb-2`}>
                    {result.urgency}
                  </span>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{result.title}</h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed">{result.description}</p>

                  <p className="text-foreground font-medium mb-8 p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <CheckCircle className="w-5 h-5 text-accent inline mr-2 -mt-0.5" />
                    {result.recommendation}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Button asChild variant="cta" size="lg" className="flex-1">
                      <Link to="/store">
                        Shop Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                    <Button onClick={resetQuiz} variant="outline" size="lg" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Retake Quiz
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
