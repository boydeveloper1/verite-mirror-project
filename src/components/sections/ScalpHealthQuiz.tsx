import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, RotateCcw, Sparkles, AlertTriangle, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Question {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: "How often do you experience scalp itching?",
    options: [
      { label: "Rarely or never", score: 0 },
      { label: "Occasionally (1-2 times a week)", score: 1 },
      { label: "Frequently (almost daily)", score: 2 },
      { label: "Constantly (all day)", score: 3 },
    ],
  },
  {
    id: 2,
    question: "Do you wear protective styles (wigs, braids, weaves)?",
    options: [
      { label: "Never", score: 0 },
      { label: "Occasionally", score: 1 },
      { label: "Most of the time", score: 2 },
      { label: "Always", score: 3 },
    ],
  },
  {
    id: 3,
    question: "How would you describe your edges?",
    options: [
      { label: "Full and healthy", score: 0 },
      { label: "Slightly thinning", score: 1 },
      { label: "Noticeably receding", score: 2 },
      { label: "Severely damaged/missing", score: 3 },
    ],
  },
  {
    id: 4,
    question: "How much hair do you lose when washing/brushing?",
    options: [
      { label: "Very little (normal shedding)", score: 0 },
      { label: "A moderate amount", score: 1 },
      { label: "A lot (clumps)", score: 2 },
      { label: "Excessive (scary amounts)", score: 3 },
    ],
  },
  {
    id: 5,
    question: "Do you experience scalp tenderness or pain?",
    options: [
      { label: "Never", score: 0 },
      { label: "Rarely", score: 1 },
      { label: "Sometimes", score: 2 },
      { label: "Often", score: 3 },
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

const getResult = (score: number): ResultData => {
  if (score <= 3) {
    return {
      title: "Healthy Scalp",
      description:
        "Great news! Your scalp appears to be in good condition. However, prevention is key to maintaining hair health.",
      recommendation: "Consider our products for maintenance and prevention of future issues.",
      icon: ThumbsUp,
      color: "text-green-600",
      urgency: "Low Priority",
    };
  } else if (score <= 7) {
    return {
      title: "Early Warning Signs",
      description:
        "Your scalp is showing early signs of stress. Now is the perfect time to take action before problems worsen.",
      recommendation: "Our Scalp Soothing Mist can help calm inflammation and prevent further damage.",
      icon: AlertTriangle,
      color: "text-yellow-600",
      urgency: "Moderate Priority",
    };
  } else if (score <= 11) {
    return {
      title: "Scalp Needs Attention",
      description:
        "Your scalp is experiencing significant inflammation. This is likely affecting your hair growth and causing shedding.",
      recommendation:
        "We strongly recommend starting with our Scalp Soothing Mist immediately. You can pair with our shower head that filter chemicals that cause inflammation",
      icon: AlertTriangle,
      color: "text-orange-600",
      urgency: "High Priority",
    };
  } else {
    return {
      title: "Urgent Scalp Care Needed",
      description:
        "Your scalp is severely inflamed and needs immediate attention. Don't wait—untreated inflammation can cause permanent follicle damage.",
      recommendation:
        "Begin a targeted scalp recovery routine using our complete scalp care system to calm inflammation and restore balance. For best results, pair it with our filtered shower head to reduce mineral and chemical exposure that can aggravate the scalp",
      icon: AlertTriangle,
      color: "text-red-600",
      urgency: "Critical",
    };
  }
};

export const ScalpHealthQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

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
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const result = getResult(totalScore);
  const progress = ((currentQuestion + (showResult ? 1 : 0)) / questions.length) * 100;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4 md:px-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 text-accent font-bold uppercase tracking-wider text-xs mb-4">
              <Sparkles className="w-4 h-4" />
              Free Assessment
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">Scalp Health Quiz</h2>
            <p className="text-muted-foreground text-lg">
              Take our quick 5-question quiz to discover your scalp's health status
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
