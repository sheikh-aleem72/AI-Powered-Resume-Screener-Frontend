import {
  Brain,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface DeepAnalysisProps {
  analysis: any | null;
  analysisStatus: string;
  analysisCompletedAt?: string;
  onRunAnalysis: () => void;
  isRunning: boolean;
}

const AnalysisList = ({
  title,
  icon: Icon,
  items = [],
  variant,
}: {
  title: string;
  icon: React.ElementType;
  items?: string[];
  variant: "success" | "warning";
}) => {
  if (!items.length) return null;

  const colors =
    variant === "success"
      ? {
          icon: "text-emerald-400",
          badge: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
        }
      : {
          icon: "text-amber-400",
          badge: "border-amber-500/20 bg-amber-500/10 text-amber-400",
        };

  return (
    <div className="rounded-3xl border border-border-default bg-bg-primary p-6">
      <div className="flex items-center gap-3">
        <Icon className={`h-5 w-5 ${colors.icon}`} />

        <h4 className="font-semibold text-text-primary">{title}</h4>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {items.map((item) => (
          <span
            key={item}
            className={`
              rounded-full
              border
              px-4
              py-2
              text-sm
              font-medium
              ${colors.badge}
            `}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export const DeepAnalysis = ({
  analysis,
  analysisStatus,
  analysisCompletedAt,
  onRunAnalysis,
  isRunning,
}: DeepAnalysisProps) => {
  if (analysisStatus !== "completed" || !analysis) {
    return (
      <section className="space-y-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
            AI Insights
          </p>

          <h2 className="mt-2 text-4xl font-bold text-text-primary">
            Deep Analysis
          </h2>

          <p className="mt-2 text-lg text-text-secondary">
            Generate a comprehensive LLM-powered assessment for this candidate.
          </p>
        </div>

        <div className="rounded-3xl border border-border-default bg-bg-secondary p-10 text-center">
          <Brain className="mx-auto h-14 w-14 text-action-primary" />

          <h3 className="mt-6 text-2xl font-semibold text-text-primary">
            No Deep Analysis Yet
          </h3>

          <p className="mx-auto mt-4 max-w-xl leading-7 text-text-secondary">
            Run a detailed AI analysis to receive strengths, concerns, hiring
            recommendation and overall fit.
          </p>

          <button
            onClick={onRunAnalysis}
            disabled={isRunning}
            className="
              mt-8
              inline-flex
              h-12
              items-center
              justify-center
              rounded-xl
              bg-action-primary
              px-6
              font-semibold
              text-white
              transition
              hover:bg-action-primary-hover
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {isRunning ? "Starting Analysis..." : "Run Deep Analysis"}
          </button>
        </div>
      </section>
    );
  }

  const data = analysis.analysis;

  return (
    <section className="space-y-8">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          AI Insights
        </p>

        <h2 className="mt-2 text-4xl font-bold text-text-primary">
          Deep Analysis
        </h2>

        <p className="mt-2 text-lg text-text-secondary">
          Large language model assessment of this candidate.
        </p>

        {analysisCompletedAt && (
          <p className="mt-3 text-sm text-text-secondary">
            Generated on {new Date(analysisCompletedAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Overall Fit */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-action-primary" />

          <h3 className="text-2xl font-semibold text-text-primary">
            Overall Fit
          </h3>
        </div>

        <p className="mt-6 text-5xl font-bold text-action-primary">
          {data.overallFit}
        </p>

        <p className="mt-6 leading-8 text-text-secondary">{data.summary}</p>
      </div>

      {/* Grid */}

      <div className="grid gap-8 xl:grid-cols-2">
        <AnalysisList
          title="Matched Skills"
          icon={CheckCircle2}
          items={data.matchedSkills}
          variant="success"
        />

        <AnalysisList
          title="Missing Skills"
          icon={CircleAlert}
          items={data.missingSkills}
          variant="warning"
        />

        <AnalysisList
          title="Strengths"
          icon={Sparkles}
          items={data.strengths}
          variant="success"
        />

        <AnalysisList
          title="Concerns"
          icon={CircleAlert}
          items={data.concerns}
          variant="warning"
        />
      </div>

      {/* Experience */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <h3 className="text-xl font-semibold text-text-primary">
          Experience Assessment
        </h3>

        <p className="mt-5 leading-8 text-text-secondary">
          {data.experienceAssessment}
        </p>
      </div>

      {/* Recommendation */}

      <div className="rounded-3xl border border-border-default bg-bg-secondary p-8">
        <div className="flex items-center gap-3">
          <Lightbulb className="h-6 w-6 text-action-primary" />

          <h3 className="text-xl font-semibold text-text-primary">
            Recommendation
          </h3>
        </div>

        <p className="mt-5 leading-8 text-text-secondary">
          {data.recommendation}
        </p>
      </div>
    </section>
  );
};
