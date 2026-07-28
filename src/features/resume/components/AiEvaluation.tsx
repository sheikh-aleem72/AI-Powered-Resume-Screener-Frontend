import { DecisionCard } from "./DecisionCard";
import { ExperienceCard } from "./ExperienceCard";
import { SkillsCard } from "./SkillsCard";

interface AiEvaluationProps {
  processing: boolean;

  explanation: any;
}

export const AiEvaluation = ({
  processing,
  explanation,
}: AiEvaluationProps) => {
  return (
    <section className="space-y-8">
      {/* Heading */}

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          AI Evaluation
        </p>

        <h2 className="mt-2 text-4xl font-bold text-text-primary">
          Candidate Assessment
        </h2>

        <p className="mt-2 text-lg text-text-secondary">
          Understand why ClearHire accepted or rejected this candidate.
        </p>
      </div>

      {/* Decision */}

      <DecisionCard
        processing={processing}
        passed={explanation?.decision?.status === "passed"}
        reasons={explanation?.decision?.reasons ?? []}
      />

      {/* Skills + Experience */}

      {!processing && (
        <div className="grid gap-8 xl:grid-cols-2">
          <SkillsCard
            matched={explanation?.skills?.matched}
            missing={explanation?.skills?.missing}
          />

          <ExperienceCard
            requiredYears={explanation?.experience?.requiredYears}
            candidateYears={explanation?.experience?.candidateYears}
            meetsRequirement={explanation?.experience?.meetsRequirement}
          />
        </div>
      )}
    </section>
  );
};
