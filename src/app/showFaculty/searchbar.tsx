export function SearchBar({
  className = "",
  onChange,
}: {
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className={"max-w-md " + className}>
      <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-slate-700 overflow-hidden">
        <div className="grid place-items-center h-full w-12 text-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          className="peer h-full w-full outline-none bg-slate-800 text-sm text-gray-700 px-2"
          type="text"
          id="search"
          onChange={onChange}
          placeholder="Search Faculty"
        />
      </div>
    </div>
  );
}
