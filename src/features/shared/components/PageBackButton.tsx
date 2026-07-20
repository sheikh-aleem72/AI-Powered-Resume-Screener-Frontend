import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PageBackButtonProps {
  to?: string;
  label?: string;
}

export const PageBackButton = ({ to, label = "Back" }: PageBackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
      return;
    }

    navigate(-1);
  };

  return (
    <button
      onClick={handleClick}
      className="
        group
        inline-flex
        items-center
        gap-2
        rounded-xl
        px-3
        
        text-sm
        font-medium
        text-text-secondary
        transition-all
        duration-200
        hover:bg-bg-secondary
        hover:text-text-primary
      "
    >
      <ArrowLeft
        className="
          h-4
          w-4
          transition-transform
          duration-200
          group-hover:-translate-x-1
        "
      />

      {label}
    </button>
  );
};
