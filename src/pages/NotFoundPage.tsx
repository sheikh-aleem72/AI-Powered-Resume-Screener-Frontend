export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex items-center justify-center">
      <div className="bg-bg-surface border border-border-default rounded-md p-4">
        <h1 className="text-lg mb-2">404 — Page not found</h1>
        <p className="text-text-muted text-sm">
          The page you’re looking for does not exist.
        </p>
      </div>
    </div>
  );
}
