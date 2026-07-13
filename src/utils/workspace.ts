import type { Job } from "../api/job";

import type {
  RecentJobCardProps,
  WorkspaceSummary,
} from "../types/workspaceSummary";

export const calculateWorkspaceSummary = (jobs: Job[]): WorkspaceSummary => {
  const totalJobs = jobs.length;

  const completedJobs = jobs.filter(
    (job) => job.completedResumes === job.totalResumes
  ).length;

  const processingJobs = jobs.filter(
    (job) => job.completedResumes !== job.totalResumes
  ).length;

  const candidatesScreened = jobs.reduce(
    (total, job) => total + job.totalResumes,
    0
  );

  return {
    totalJobs,
    completedJobs,
    processingJobs,
    candidatesScreened,
  };
};

export const getRecentJobs = (jobs: Job[], limit = 4): RecentJobCardProps[] => {
  return [...jobs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, limit)
    .map((job) => ({
      id: job._id,
      title: job.title,
      status: job.status as RecentJobCardProps["status"],
      createdAt: job.createdAt,
      candidateCount: job.totalResumes,
      completedCount: job.completedResumes,
    }));
};
