interface StatusBadgeProps {
  status: "processing" | "completed" | "deleting";
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles = {
    processing: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    completed:
      "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    deleting: "bg-red-500/10 text-red-400 border border-red-500/20",
  };

  const labels = {
    processing: "Processing",
    completed: "Completed",
    deleting: "Deleting",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        rounded-full
        px-3
        py-1
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
};
