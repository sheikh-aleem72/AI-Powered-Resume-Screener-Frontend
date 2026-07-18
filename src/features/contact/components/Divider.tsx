export const Divider = () => {
  return (
    <>
      <div className="flex items-center gap-6 ">
        <div className="h-px flex-1 bg-border-default/60" />
        <div className="h-2 w-2 rounded-full bg-action-primary/50" />
        <div className="h-px flex-1 bg-border-default/60" />
      </div>
    </>
  );
};
