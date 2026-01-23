import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative w-full max-w-2xl px-4">
        <div className="bg-bg-surface/80 backdrop-blur-xl rounded-xl p-8 border border-border-subtle shadow-lg text-center">
          {/* Header */}
          <h1 className="text-3xl font-semibold text-text-primary mb-4">
            Welcome Home
          </h1>
          <p className="text-lg text-text-muted">
            This is the starting point of your AI-Powered Resume Scanner.
            Explore and get started!
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
