interface ResumeViewerProps {
  resumeUrl: string;
}

export const ResumeViewer = ({ resumeUrl }: ResumeViewerProps) => {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-action-primary">
          Resume
        </p>

        <h2 className="mt-2 text-4xl font-bold text-text-primary">
          Resume Preview
        </h2>

        <p className="mt-2 text-lg text-text-secondary">
          Verify the AI evaluation against the original resume.
        </p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border-default bg-bg-secondary">
        <iframe src={resumeUrl} title="Resume" className="h-225 w-full" />
      </div>
    </section>
  );
};
