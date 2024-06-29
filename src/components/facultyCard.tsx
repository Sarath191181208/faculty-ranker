import FallbackImage from "./FallbackImage";
import { CiUser } from "react-icons/ci";
import { getRakingColor } from "./getRakingColor";

export default function FacultyCard(props: {
  faculty: FacultyData & { partition_number: number };
}) {
  const faculty = props.faculty;
  return (
    <div className="rounded-lg shadow-lg bg-slate-800 h-full">
      {/* <div className="flex flex-row rounded-lg shadow-lg bg-white"> */}
      <div className="flex flex-row p-1 ">
        <div className="w-1/3">
          <FallbackImage
            src={faculty.image_url}
            alt={faculty.name}
            width={150}
            height={150}
            className="rounded-lg h-[150px] w-[150px] bg-slate-900"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col">
          <FacultyDetials faculty={faculty} />
        </div>
      </div>

      <div className="grid grid-cols-2 p-2">
        <div>
          <div>
            Attendance
          </div>
          <div>
            Correction
          </div>
          <div>
            Teaching
          </div>
        </div>
        <div>
          {createRatingStarTray(
            faculty.attendance_rating,
            faculty.num_attendance_ratings,
            getRakingColor(faculty.attendance_rating ?? 0),
          )}
          {createRatingStarTray(
            faculty.correction_rating,
            faculty.num_correction_ratings,
            getRakingColor(faculty.correction_rating ?? 0),
          )}
          {createRatingStarTray(
            faculty.teaching_rating,
            faculty.num_teaching_ratings,
            getRakingColor(faculty.teaching_rating ?? 0),
          )}
        </div>
      </div>
    </div>
  );
}

const createRatingStarTray = (
  rating: number | undefined | null,
  num_rated: number | undefined | null,
  color: string,
) => {
  if (rating) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <FiveStarRating rating={rating} starColor={color} />
        <p className="text-gray-400 text-sm">{num_rated}</p>
      </div>
    );
  }
};

function FacultyDetials(props: { faculty: FacultyData }) {
  const faculty = props.faculty;

  return (
    <>
      <div className="">
        <h1 className="text-xl font-bold">{faculty.name}</h1>
        <p className="text-gray-500 text-sm h-[80px] overflow-ellipsis overflow-hidden">
          {faculty.specialization}
        </p>
      </div>
    </>
  );
}
