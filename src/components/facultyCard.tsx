import Link from "next/link";
import Image from "next/image";

const maxWidthRatingLine = 50;

export default function FacultyCard(props: {
  faculty: FacultyData & { partition_number: number };
}) {
  const faculty = props.faculty;

  return (
    <>
      {/* <div className="flex flex-row rounded-lg shadow-lg bg-white"> */}
      <div className="flex flex-row rounded-lg shadow-lg bg-neutral-900">
        <div className="w-1/3">
          <Image
            src={faculty.image_url}
            alt={faculty.name}
            width={200}
            height={200}
            className="rounded-l-lg"
          />
        </div>
        <div className="w-2/3 p-4 flex flex-col">
          <FacultyDetials faculty={faculty} />
        </div>
      </div>
    </>
  );
}

function FacultyDetials(props: { faculty: Faculty & FacultyRating }) {
  const faculty = props.faculty;

  const getLineWidth = (rating: number | undefined | null) => {
    const maxRating = 5;
    if (rating) {
      return (rating / maxRating) * maxWidthRatingLine;
    }
    return 0;
  };

  const teachingLineWidth = getLineWidth(faculty.teaching_rating);
  const attendanceLineWidth = getLineWidth(faculty.attendance_rating);
  const correctionLineWidth = getLineWidth(faculty.correction_rating);

  return (
    <>
      <div className="flex-grow">
        <h1 className="text-xl font-bold">{faculty.name}</h1>
        <p className="text-gray-500 text-sm overflow-ellipsis overflow-hidden h-10">
          {faculty.specialization}
        </p>
      </div>
      <div className="flex flex-row rounded-lg">
        <RatingLine
          color="red"
          width={teachingLineWidth}
          borderRadiusTWStyle={
            "rounded-tl-lg rounded-bl-lg" +
            (correctionLineWidth === 0 && attendanceLineWidth == 0
              ? "rounded-tr-lg rounded-br-lg"
              : "")
          }
        />
        <RatingLine
          color="blue"
          width={attendanceLineWidth}
          borderRadiusTWStyle={
            (teachingLineWidth === 0 ? "rounded-tl-lg rounded-bl-lg" : " ") +
            (correctionLineWidth === 0 ? "rounded-tr-lg rounded-br-lg" : "")
          }
        />
        <RatingLine
          color="green"
          width={getLineWidth(faculty.correction_rating)}
          borderRadiusTWStyle={
            "rounded-tr-lg rounded-br-lg" +
            (teachingLineWidth === 0 && attendanceLineWidth == 0
              ? "rounded-tl-lg rounded-bl-lg"
              : "")
          }
        />
      </div>
    </>
  );
}

// create a component for the line with three colors
function RatingLine(props: {
  color: string;
  width: number;
  borderRadiusTWStyle?: string;
}) {
  return (
    <div
      className={`bg-${props.color}-500 h-2 ${props.borderRadiusTWStyle}`}
      style={{ width: `${props.width}px` }}
    ></div>
  );
}
