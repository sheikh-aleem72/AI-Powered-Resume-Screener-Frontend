import UploadItem from "./UploadItem";
import type { UploadFileItem } from "./types";

interface Props {
  items: UploadFileItem[];
  onRetry: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function UploadQueue({ items, onRetry, onRemove }: Props) {
  if (!items.length) return null;

  return (
    <div className="space-y-2">
      {items.map((item) => (
        <UploadItem
          key={item.id}
          item={item}
          onRetry={onRetry}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}
