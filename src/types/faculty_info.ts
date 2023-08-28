// create a faculty type

interface Faculty {
  id: string;
  name: string;
  image_url: string;
  specialization: string;
}

interface FacultyRating{
    id: string;
    teaching_rating:   number | null;
    attendance_rating: number | null;
    correction_rating: number | null;
}

interface FacultyRatingWithoutId extends Omit<FacultyRating, "id"> { }

interface FacultyRatingCount{
  num_teaching_ratings:   number | undefined;
  num_attendance_ratings: number | undefined;
  num_correction_ratings: number | undefined;
}

type FacultyData = Faculty & FacultyRating & FacultyRatingCount;
type FacultyQueryData = Faculty & { partition_number: number };

