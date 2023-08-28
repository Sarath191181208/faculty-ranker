export function LoadingCardComponent() {
  // it's a card with image i.e greay box at the left and the right side is the text
  // the text is of two grey boxes with shimmer effect
  return (
    <div className="flex flex-row rounded-lg bg-slate-800 shadow-lg">
      <div className="w-1/3">
        <div className="h-full w-full animate-pulse rounded-l-lg bg-gray-700"></div>
      </div>
      <div className="flex w-2/3 flex-col p-4 gap-2">
        <h1 className="h-6 animate-pulse rounded-lg bg-gray-700 text-xl font-bold"></h1>
        <p className="h-20 animate-pulse overflow-hidden overflow-ellipsis rounded-lg bg-gray-700 text-sm text-gray-500"></p>
      </div>
    </div>
  );
}
