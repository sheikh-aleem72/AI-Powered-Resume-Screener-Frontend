import { useParams } from "react-router-dom";
import { useResumeProcessing } from "../../features/resume/hooks/useResumeProcessing";
import { useRunDeepAnalysis } from "../../features/resume/hooks/useRunDeepAnalysis";
import { ResumeLoading } from "../../features/resume/components/ResumeLoading";
import { ResumeError } from "../../features/resume/components/ResumeError";
import { ResumeProcessing } from "../../features/resume/components/ResumeProcessing";
import { PageBackButton } from "../../features/shared/components/PageBackButton";
import { ResumeHero } from "../../features/resume/components/ResumeHero";
import { CandidateOverview } from "../../features/resume/components/CandidateOverview";
import { AiEvaluation } from "../../features/resume/components/AiEvaluation";
import { DeepAnalysis } from "../../features/resume/components/DeepAnalysis";
import { ResumeViewer } from "../../features/resume/components/ResumeViewer";

export const ResumeDetailPage = () => {
  const { resumeId } = useParams();

  const { data, isLoading, isError, error, refetch } = useResumeProcessing(
    resumeId!
  );

  const deepAnalysisMutation = useRunDeepAnalysis(resumeId!);

  /* ---------------- Loading ---------------- */

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeLoading />
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (isError || !data) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeError
          message={(error as Error)?.message ?? "Unable to load resume."}
          onRetry={refetch}
        />
      </div>
    );
  }

  /* ---------------- Processing ---------------- */

  const processing =
    data.status !== "completed" ||
    data.analysisStatus === "queued" ||
    data.analysisStatus === "processing";

  if (processing) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <ResumeProcessing
          resumeUrl={data.resumeUrl}
          externalResumeId={data.externalResumeId}
          createdAt={data.createdAt}
          updatedAt={data.updatedAt}
          status={data.status}
          passFail={data.passFail}
          rank={data.rank}
          finalScore={data.finalScore}
        />
      </div>
    );
  }

  /* ---------------- Completed ---------------- */

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-6 py-8">
      <PageBackButton />

      <ResumeHero
        externalResumeId={data.externalResumeId}
        finalScore={data.finalScore}
        rank={data.rank}
        passFail={data.passFail}
        status={data.status}
        createdAt={data.createdAt}
        updatedAt={data.updatedAt}
        processing={false}
        location={data.location}
      />

      <CandidateOverview
        status={data.status}
        analysisStatus={data.analysisStatus}
        rank={data.rank}
        passFail={data.passFail}
      />

      <AiEvaluation processing={false} explanation={data.explanation} />

      <DeepAnalysis
        analysis={data.analysis}
        analysisStatus={data.analysisStatus}
        analysisCompletedAt={data.updatedAt}
        onRunAnalysis={() => deepAnalysisMutation.mutate()}
        isRunning={deepAnalysisMutation.isPending}
      />

      <ResumeViewer resumeUrl={data.resumeUrl} />
    </div>
  );
};
