export const JobFormMockup = () => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      <div className="space-y-5">
        <div>
          <p className="mb-2 text-sm text-text-secondary">Job Title</p>

          <div className="rounded-xl border border-border-default bg-bg-primary px-4 py-3 text-text-primary">
            Senior React Developer
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-text-secondary">Required Skills</p>

          <div className="flex flex-wrap gap-2">
            {["React", "Node.js", "MongoDB", "TypeScript"].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-action-primary/10 px-3 py-1 text-sm text-action-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm text-text-secondary">Experience</p>

          <div className="rounded-xl border border-border-default bg-bg-primary px-4 py-3 text-text-primary">
            3+ Years
          </div>
        </div>

        <button className="mt-4 w-full rounded-xl bg-action-primary py-3 font-semibold text-white">
          Create Job
        </button>
      </div>
    </div>
  );
};
