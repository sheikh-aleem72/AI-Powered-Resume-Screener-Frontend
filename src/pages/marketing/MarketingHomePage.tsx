import { Navigate } from "react-router-dom";
import { BenefitsSection } from "../../features/marketing/components/BenefitsSection";
import { FaqSection } from "../../features/marketing/components/FaqSection";
import { FeaturesSection } from "../../features/marketing/components/FeaturesSection";
import { FinalCtaSection } from "../../features/marketing/components/FinalCtaSection";
import { HeroSection } from "../../features/marketing/components/HeroSection";
import { HowItWorksSection } from "../../features/marketing/components/HowItWorksSection";
import { MarketingFooter } from "../../features/marketing/components/MarketingFooter";
import { MarketingHeader } from "../../features/marketing/components/MarketingHeader";
import { tokenUtils } from "../../features/auth/utils/tokenUtils";

export default function MarketingHomePage() {
  if (tokenUtils.isAuthenticated()) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <MarketingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <BenefitsSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
