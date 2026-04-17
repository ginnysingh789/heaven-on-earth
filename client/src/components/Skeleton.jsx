export function SkeletonBox({ className = '' }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
  );
}

export function DetailPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#f7f9fb] animate-pulse">
      {/* Header bar */}
      <div className="w-full bg-slate-200 h-16" />

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Eyebrow + title */}
        <div className="mb-8">
          <div className="h-3 w-32 bg-slate-200 rounded mb-3" />
          <div className="h-10 w-2/3 bg-slate-200 rounded" />
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left image */}
          <div className="md:col-span-7 bg-slate-200 rounded-2xl aspect-[16/10]" />

          {/* Right content */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="h-4 w-3/4 bg-slate-200 rounded" />
            <div className="h-4 w-full bg-slate-200 rounded" />
            <div className="h-4 w-5/6 bg-slate-200 rounded" />
            <div className="h-4 w-2/3 bg-slate-200 rounded" />
            <div className="flex gap-2 mt-2">
              {[1,2,3].map(i => (
                <div key={i} className="h-7 w-20 bg-slate-200 rounded-full" />
              ))}
            </div>
            <div className="mt-4 h-24 bg-slate-200 rounded-xl" />
            <div className="mt-2 h-12 bg-slate-200 rounded-xl" />
            <div className="h-12 bg-slate-200 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="animate-pulse bg-white border-2 border-slate-100 rounded-2xl overflow-hidden">
      <div className="h-56 bg-slate-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-3 bg-slate-200 rounded w-1/2" />
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
        <div className="flex gap-2 pt-2">
          {[1,2,3].map(i => <div key={i} className="h-6 w-16 bg-slate-200 rounded-full" />)}
        </div>
        <div className="flex justify-between pt-3 border-t border-slate-100">
          <div className="h-7 w-24 bg-slate-200 rounded" />
          <div className="h-5 w-16 bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}
