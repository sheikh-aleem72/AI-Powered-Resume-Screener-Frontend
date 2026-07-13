import { useMemo } from "react";

import type { Job } from "../../api/job";

import {
  calculateWorkspaceSummary,
  getRecentJobs,
} from "../../utils/workspace";

export const useWorkspaceSummary = (jobs: Job[] = []) => {
  return useMemo(() => {
    const summary = calculateWorkspaceSummary(jobs);

    const recentJobs = getRecentJobs(jobs);

    return {
      summary,
      recentJobs,
      hasJobs: jobs.length > 0,
    };
  }, [jobs]);
};
