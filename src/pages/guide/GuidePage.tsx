import { BestPractices } from "../../features/guide/components/BestPractices";
import { GuideCTA } from "../../features/guide/components/GuideCTA";
import { GuideFAQ } from "../../features/guide/components/GuideFAQ";
import { GuideHero } from "../../features/guide/components/GuideHero";
import { GuideSection } from "../../features/guide/components/GuideSection";
import { AnalysisMockup } from "../../features/guide/components/mockups/AnalysisMockup";
import { DecisionMockup } from "../../features/guide/components/mockups/DecisionMockup";
import { JobFormMockup } from "../../features/guide/components/mockups/JobFormMockup";
import { ProcessingMockup } from "../../features/guide/components/mockups/ProcessingMockup";
import { RankingMockup } from "../../features/guide/components/mockups/RankingMockup";
import { UploadMockup } from "../../features/guide/components/mockups/UploadMockup";
import { SectionDivider } from "../../features/guide/components/SectionDivider";

import { WorkflowOverview } from "../../features/guide/components/WorkflowOverview";

export const GuidePage = () => {
  return (
    <main className="relative mx-auto max-w-7xl space-y-20 px-8 py-8 bg-bg-secondary/70">
      <GuideHero />

      <WorkflowOverview />

      <SectionDivider />

      <GuideSection
        id="step-1"
        step={1}
        title="Create Your First Job"
        description="Create a job by providing the title, required skills, experience, and job description. This information helps ClearHire understand exactly what you're looking for."
      >
        <JobFormMockup />
      </GuideSection>

      <SectionDivider />

      <GuideSection
        id="step-2"
        step={2}
        title="Upload Candidate Resumes"
        description="Upload one or multiple resumes using drag and drop. ClearHire securely uploads each file before AI screening begins."
      >
        <UploadMockup />
      </GuideSection>

      <SectionDivider />

      <GuideSection
        id="step-3"
        step={3}
        title="AI Processes Every Resume"
        description="ClearHire extracts resume content, matches it against your requirements, and prepares explainable candidate rankings."
      >
        <ProcessingMockup />
      </GuideSection>

      <SectionDivider />

      <GuideSection
        id="step-4"
        step={4}
        title="Review Candidate Rankings"
        description="Candidates are ranked automatically so you can focus your attention on the strongest matches first."
      >
        <RankingMockup />
      </GuideSection>

      <SectionDivider />

      <GuideSection
        id="step-5"
        step={5}
        title="Understand AI Analysis"
        description="Review strengths, missing skills, and overall match scores to understand why candidates received their rankings."
      >
        <AnalysisMockup />
      </GuideSection>

      <SectionDivider />

      <GuideSection
        id="step-6"
        step={6}
        title="Make Confident Hiring Decisions"
        description="Use AI recommendations as decision support while keeping full control over your hiring process."
      >
        <DecisionMockup />
      </GuideSection>

      <SectionDivider />

      <BestPractices />

      <SectionDivider />

      <GuideFAQ />

      <GuideCTA />
    </main>
  );
};
