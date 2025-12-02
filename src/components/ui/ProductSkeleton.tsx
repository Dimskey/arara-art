export default function ProductSkeleton() {
  return (
    <div className="border overflow-hidden shadow-sm animate-pulse">
      <div className="aspect-square bg-[var(--color-border)]"></div>
      <div className="p-5 space-y-3">
        <div className="h-4 bg-[var(--color-border)] w-3/4"></div>
        <div className="h-4 bg-[var(--color-border)] w-1/2"></div>
      </div>
    </div>
  );
}
