interface CandidateStatusBadgeProps {
  status: "processing" | "matched" | "failed";
}

export const CandidateStatusBadge = ({ status }: CandidateStatusBadgeProps) => {
  const variants = {
    processing:
      "border border-action-primary/20 bg-action-primary/10 text-action-primary",
    matched: "border border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    failed: "border border-red-500/20 bg-red-500/10 text-red-400",
  };

  const labels = {
    processing: "Processing",
    matched: "Matched",
    failed: "Not Matched",
  };

  return (
    <span
      className={`
        inline-flex
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${variants[status]}
      `}
    >
      {labels[status]}
    </span>
  );
};
