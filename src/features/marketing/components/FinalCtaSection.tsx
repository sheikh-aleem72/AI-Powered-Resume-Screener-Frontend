import { MarketingButton } from "./MarketingButton";
import { SectionContainer } from "./SectionContainer";

export function FinalCtaSection() {
  return (
    <SectionContainer ariaLabelledby="final-cta-title">
      <div className="rounded-xl border border-border-subtle bg-bg-surface/80 px-6 py-10 text-center shadow-sm sm:px-10">
        <h2
          id="final-cta-title"
          className="text-3xl font-semibold text-text-primary sm:text-4xl"
        >
          Start every shortlist with better signal.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-text-secondary">
          Create your first screening job and let ClearHire organize candidate
          review around role fit, evidence, and recruiter action.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <MarketingButton to="/auth/signup">Create account</MarketingButton>
          <MarketingButton to="/auth/signin" variant="secondary">
            Sign in
          </MarketingButton>
        </div>
      </div>
    </SectionContainer>
  );
}
