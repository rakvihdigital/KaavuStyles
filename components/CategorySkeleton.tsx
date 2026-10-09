export default function CategorySkeleton() {
  return (
    <div className="relative h-[460px] bg-ivory-200/60 rounded-t-[999px] border-2 border-gold/30 p-4 motion-safe:animate-pulse flex flex-col justify-end items-center gap-3 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-t from-ink/20 to-transparent" />
      <div className="h-3 w-20 bg-gold/20 rounded relative" />
      <div className="h-6 w-36 bg-gold/30 rounded relative" />
      <div className="h-5 w-24 bg-gold/20 rounded relative" />
      <div className="h-3 w-28 bg-gold/20 rounded relative mb-3" />
    </div>
  );
}
