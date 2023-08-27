import { LoadingCardComponent } from "@/components/loadingCard";

export default function LoadingFacultyCard() {
  return (
    <div className="p-10 bg-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* create 9 loading component */}
        {[...Array(9)].map((_, index) => (
          <LoadingCardComponent key={index} />
        ))}
      </div>
    </div>
  );
}
