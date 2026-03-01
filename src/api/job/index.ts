/**
 * Centralized Job API client
 *
 * Responsibilities:
 * - Provide abstraction over job-related backend calls
 * - Attach access + refresh tokens automatically
 * - Handle access-token refresh via response headers
 * - Throw errors for non-2xx responses
 *
 * IMPORTANT:
 * - UI layers must handle errors via React Query
 * - This client contains ZERO UI logic
 */

import { tokenUtils } from "../../utils/tokenUtils";

/* -------------------------------------------------------------------------- */
/*                                  Config                                    */
/* -------------------------------------------------------------------------- */

const API_BASE = import.meta.env.VITE_BACKEND_API_URL;

/* -------------------------------------------------------------------------- */
/*                                 Types                                      */
/* -------------------------------------------------------------------------- */

export interface Job {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  totalResumes: number;
  completedResumes: number;
  failedResumes: number;
}

export interface JobDetail {
  title: string;
  description: string;
  required_skills: string[];
  experience_level: string;
  min_experience_years: number;
  totalResumes: number;
  completedResumes: number;
  failedResumes: number;
  createdAt: string;
  updatedAt: string;
}

export interface ResumeProcessing {
  _id: string;
  resumeObjectId: string;
  externalResumeId: string;
  resumeUrl: string;
  rank: number | null;
  finalScore: number | null;
  status: "queued" | "processing" | "completed" | "failed";
  embeddingStatus: "pending" | "completed" | "failed";
  rankingStatus: "pending" | "completed" | "skipped";
  passFail: string;
  analysis: any;
  analysisStatus: string;
  analysisCompletedAt: Date;
  analysisError: string;
  explanation: any | null;
  createdAt: string;
  updatedAt: string;
}

export interface JobResumesResponse {
  page: number;
  limit: number;
  total: number;
  resumes: ResumeProcessing[];
}

export interface JobUpdatesResponse {
  jobId: string;
  serverTime: string;
  updates: {
    resumeId: string;
    status: string;
    analysisStatus: string;
    passFail: string;
    rank: number | null;
    finalScore: number | null;
    explanation: string | null;
    updatedAt: string;
  }[];
}

/* -------------------------------------------------------------------------- */
/*                             Low-level Client                               */
/* -------------------------------------------------------------------------- */

const apiClient = {
  get: async <T = any>(endpoint: string): Promise<T> => {
    const accessToken = tokenUtils.getAccessToken();
    const refreshToken = tokenUtils.getRefreshToken();

    if (!accessToken || !refreshToken) {
      throw new Error("Authentication required. Please login again.");
    }

    const response = await fetch(`${API_BASE}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": refreshToken,
      },
    });

    /**
     * Handle refreshed access token
     * Backend sends new token in `x-access-token`
     */
    const newAccessToken = response.headers.get("x-access-token");
    if (newAccessToken) {
      tokenUtils.setTokens(newAccessToken, refreshToken);
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data.data ? data.data : data;
  },
};

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

export const jobsApi = {
  /**
   * Fetch all jobs created by recruiter.
   */
  fetchJobs: () => {
    return apiClient.get<Job[]>("/job/");
  },

  fetchJobById: (jobId: string) => {
    return apiClient.get<JobDetail>(`/job/${jobId}`);
  },

  fetchJobResumes: (
    jobId: string,
    page: number,
    limit: number,
    passFail?: string | undefined
  ) => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (passFail !== undefined) {
      query.append("passFail", passFail);
    }

    return apiClient.get<JobResumesResponse>(
      `/job/${jobId}/resumes?${query.toString()}`
    );
  },

  fetchJobUpdates: (jobId: string) => {
    return apiClient.get<JobUpdatesResponse>(`/job/${jobId}/updates`);
  },
};
