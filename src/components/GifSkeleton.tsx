const GifSkeleton = () => (
  <div className="bg-slate-800 rounded-xl overflow-hidden animate-pulse">
    <div className="w-full h-48 bg-slate-700" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-700 rounded w-3/4" />
      <div className="h-3 bg-slate-700 rounded w-1/2" />
      <div className="flex gap-2 mt-4">
        <div className="h-8 bg-slate-700 rounded flex-1" />
        <div className="h-8 bg-slate-700 rounded flex-1" />
      </div>
    </div>
  </div>
);

export default GifSkeleton;