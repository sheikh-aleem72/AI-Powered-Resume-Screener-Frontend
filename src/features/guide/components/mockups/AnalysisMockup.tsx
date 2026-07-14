import { BadgeCheck, CircleAlert, Sparkles } from "lucide-react";

export const AnalysisMockup = () => {
  return (
    <div className="rounded-3xl border border-border-default bg-bg-secondary p-8 shadow-xl">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-text-primary">
            AI Resume Analysis
          </h3>

          <p className="mt-1 text-sm text-text-secondary">
            Explainable candidate insights
          </p>
        </div>

        <div className="rounded-xl bg-action-primary/10 p-3">
          <Sparkles className="h-6 w-6 text-action-primary" />
        </div>
      </div>

      <div className="mt-5 space-y-5">
        <div className="rounded-2xl border border-state-success/20 bg-state-success/10 p-5">
          <div className="flex items-center gap-3">
            <BadgeCheck className="h-5 w-5 text-state-success" />

            <h4 className="font-semibold text-state-success">Strengths</h4>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>• Strong React & TypeScript experience</li>
            <li>• Backend development with Node.js</li>
            <li>• Experience with REST APIs</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-state-warning/20 bg-state-warning/10 p-5">
          <div className="flex items-center gap-3">
            <CircleAlert className="h-5 w-5 text-state-warning" />

            <h4 className="font-semibold text-state-warning">Missing Skills</h4>
          </div>

          <ul className="mt-3 space-y-2 text-sm text-text-secondary">
            <li>• Docker</li>
            <li>• AWS</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-border-default bg-bg-primary p-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-text-primary">
              Overall Match Score
            </span>

            <span className="text-2xl font-bold text-action-primary">91%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
