import { Brain, LoaderCircle } from "lucide-react";

import { PageBackButton } from "../../shared/components/PageBackButton";
import { ResumeHero } from "./ResumeHero";
import { ResumeViewer } from "./ResumeViewer";

interface ResumeProcessingProps {
  resumeUrl: string;

  externalResumeId: string;

  createdAt: string;

  updatedAt: string;

  status: string;

  passFail: string;

  rank: number | null;

  finalScore: number | null;
}

export const ResumeProcessing = ({
  resumeUrl,
  externalResumeId,
  createdAt,
  updatedAt,
  status,
  passFail,
  rank,
  finalScore,
}: ResumeProcessingProps) => {
  return (
    <div className="space-y-10">
      <PageBackButton />

      <ResumeHero
        externalResumeId={externalResumeId}
        createdAt={createdAt}
        updatedAt={updatedAt}
        status={status}
        passFail={passFail}
        rank={rank}
        finalScore={finalScore}
        processing
      />

      <section className="rounded-3xl border border-border-default bg-bg-secondary p-10">
        <div className="flex items-start gap-5">
          <div className="rounded-2xl bg-action-primary/10 p-4">
            <LoaderCircle className="h-8 w-8 animate-spin text-action-primary" />
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-bold text-text-primary">
              Resume is being processed
            </h2>

            <p className="mt-3 max-w-2xl leading-8 text-text-secondary">
              ClearHire is currently parsing the resume, extracting candidate
              information, calculating the ranking score, and preparing the AI
              evaluation.
            </p>

            {/* Progress */}

            <div className="mt-8 h-3 overflow-hidden rounded-full bg-bg-primary">
              <div
                className="
                  h-full
                  w-1/2
                  animate-pulse
                  rounded-full
                  bg-action-primary
                "
              />
            </div>

            <div className="mt-5 flex items-center gap-3 text-sm text-text-secondary">
              <Brain className="h-4 w-4 text-action-primary" />
              This page updates automatically every 5 seconds.
            </div>
          </div>
        </div>
      </section>

      <ResumeViewer resumeUrl={resumeUrl} />
    </div>
  );
};
