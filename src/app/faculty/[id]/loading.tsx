export default function LodingFacultyPage() {
  return (
    // return a rotating spinner at ceenter
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-b-8 border-neutral-900"></div>
    </div>
  );
}
