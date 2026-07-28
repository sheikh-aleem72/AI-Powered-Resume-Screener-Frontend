interface RankBadgeProps {
  rank: number | null;
  processing: boolean;
}

export const RankBadge = ({ rank, processing }: RankBadgeProps) => {
  if (processing) {
    return (
      <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-bg-primary" />
    );
  }

  if (rank === null || rank === undefined) {
    return (
      <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-400">
        Skipped
      </span>
    );
  }

  let badgeClass = "bg-action-primary/10 text-action-primary";

  if (rank === 1) badgeClass = "bg-yellow-500/10 text-yellow-400";

  if (rank === 2) badgeClass = "bg-slate-400/10 text-slate-300";

  if (rank === 3) badgeClass = "bg-orange-500/10 text-orange-400";

  return (
    <span
      className={`
        inline-flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        font-bold
        ${badgeClass}
      `}
    >
      {rank}
    </span>
  );
};
