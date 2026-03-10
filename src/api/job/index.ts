/**
 * Job API Module
 *
 * Purpose
 * -------
 * This module provides a thin abstraction layer over all job-related
 * backend endpoints used by the recruiter dashboard.
 *
 * Design Principles
 * -----------------
 * - This layer ONLY performs HTTP requests.
 * - Authentication, token refresh, and 401 handling are centralized
 *   inside `httpClient`.
 * - No UI logic, state management, or React code exists here.
 * - All functions return typed promises for React Query consumption.
 */

import { httpClient } from "../../lib/httpClient";

/* -------------------------------------------------------------------------- */
/*                                   Types                                    */
/* -------------------------------------------------------------------------- */

/**
 * Lightweight job representation used in job list view.
 */
export interface Job {
  _id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  totalResumes: number;
  completedResumes: number;
  failedResumes: number;
}

/**
 * Detailed job information used on Job Detail page.
 */
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

/**
 * ResumeProcessing represents the processing state of a resume
 * for a specific job.
 *
 * This mirrors the backend `ResumeProcessing` document.
 */
export interface ResumeProcessing {
  _id: string;

  /** MongoDB ID of the resume */
  resumeObjectId: string;

  /** External resume identifier used inside batches */
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

/**
 * Paginated response for resumes belonging to a job.
 */
export interface JobResumesResponse {
  page: number;
  limit: number;
  total: number;
  resumes: ResumeProcessing[];
}

/**
 * Incremental updates endpoint response.
 *
 * This endpoint supports polling so the frontend can update
 * resume status without refetching the entire resume list.
 */
export interface JobUpdatesResponse {
  jobId: string;

  /** Server timestamp when updates were generated */
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

export interface createJobPayload {
  title: string;
  company: string;
  location?: string;
  description: string;
  required_skills: string[];
  prefered_skills?: string[];
  experience_level: string;
  min_experience_years: number;
}

export interface CreateJobResponse {
  success: boolean;
  data: {
    _id: string;
    title: string;
  };
}

/* -------------------------------------------------------------------------- */
/*                                Public API                                  */
/* -------------------------------------------------------------------------- */

/**
 * Job API functions.
 *
 * These functions are consumed by React Query hooks.
 */
export const jobsApi = {
  /**
   * Fetch all jobs created by the authenticated recruiter.
   *
   * Used by:
   * - Jobs dashboard page
   */
  fetchJobs: () => {
    return httpClient.get<Job[]>("/job/");
  },

  /**
   * Fetch detailed information about a specific job.
   *
   * Used by:
   * - Job detail page
   */
  fetchJobById: (jobId: string) => {
    return httpClient.get<JobDetail>(`/job/${jobId}`);
  },

  /**
   * Fetch paginated resume processing results for a job.
   *
   * Optional filtering by pass/fail status is supported.
   *
   * Used by:
   * - Resume table on job detail page
   */
  fetchJobResumes: (
    jobId: string,
    page: number,
    limit: number,
    passFail?: string
  ) => {
    const query = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (passFail !== undefined) {
      query.append("passFail", passFail);
    }

    return httpClient.get<JobResumesResponse>(
      `/job/${jobId}/resumes?${query.toString()}`
    );
  },

  /**
   * Fetch incremental processing updates for resumes.
   *
   * This endpoint supports polling and allows the UI to
   * update resume status without refetching the entire list.
   *
   * Used by:
   * - useJobUpdates hook
   */
  fetchJobUpdates: (jobId: string) => {
    return httpClient.get<JobUpdatesResponse>(`/job/${jobId}/updates`);
  },

  createJob: (payload: createJobPayload) => {
    return httpClient.post(`/job/`, payload);
  },
};
