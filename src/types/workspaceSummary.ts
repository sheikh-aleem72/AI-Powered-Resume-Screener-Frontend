export interface WorkspaceSummary {
  totalJobs: number;
  completedJobs: number;
  processingJobs: number;
  candidatesScreened: number;
}

export interface RecentJobCardProps {
  id: string;
  title: string;
  status: "active" | "processing" | "completed" | "failed";
  createdAt: string;
  candidateCount: number;
  completedCount: number;
}
