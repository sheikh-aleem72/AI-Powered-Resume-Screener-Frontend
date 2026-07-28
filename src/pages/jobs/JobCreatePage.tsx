import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { JobForm } from "../../features/jobs/components/JobForm";
import { JobCreateHero } from "../../features/jobs/components/job-create/JobCreateHero";

const JobCreatePage = () => {
  return (
    <div className="mx-auto max-w-6xl px-8 py-8">
      {/* Back */}

      <Link
        to="/jobs"
        className="
          inline-flex
          items-center
          gap-2
          text-sm
          text-text-secondary
          transition-colors
          hover:text-text-primary
        "
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Jobs
      </Link>

      {/* Hero */}

      <div className="mt-6">
        <JobCreateHero />
      </div>

      {/* Form */}

      <div className="mt-10">
        <JobForm />
      </div>
    </div>
  );
};

export default JobCreatePage;
