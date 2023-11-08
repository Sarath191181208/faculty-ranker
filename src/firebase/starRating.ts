import {
  doc,
  increment,
  runTransaction,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface FacultyRatingWithoutId extends Omit<FacultyRating, "id"> {}
// make all the fields in FacultyRatingCount not optional  using required

function getFacultyUpdatedRatingDetialCounters(
  facultyId: string,
  updatedFacultyRating: FacultyRatingWithoutId,
  countUsers: FacultyRatingCount
) {
  facultyId += ".";
  return {
    [facultyId + "teaching_rating"]: increment(
      updatedFacultyRating.teaching_rating!
    ),
    [facultyId + "attendance_rating"]: increment(
      updatedFacultyRating.attendance_rating!
    ),
    [facultyId + "correction_rating"]: increment(
      updatedFacultyRating.correction_rating!
    ),
    [facultyId + "num_teaching_ratings"]: increment(
      countUsers.num_teaching_ratings!
    ),
    [facultyId + "num_attendance_ratings"]: increment(
      countUsers.num_attendance_ratings!
    ),
    [facultyId + "num_correction_ratings"]: increment(
      countUsers.num_correction_ratings!
    ),
  };
}

function getNumCount(
  key: string,
  previousRating: FacultyRatingWithoutId,
  newRating: FacultyRatingWithoutId
): number {
  if (
    previousRating[key as keyof FacultyRatingWithoutId] === null &&
    newRating[key as keyof FacultyRatingWithoutId] !== null
  )
    return 1;
  if (
    previousRating[key as keyof FacultyRatingWithoutId] !== null &&
    newRating[key as keyof FacultyRatingWithoutId] === null
  )
    return -1;
  return 0;
}

export async function writeFacultyRating(
  facultyPartition: number,
  facultyId: string,
  ratingDocId: string,
  previousRating: FacultyRatingWithoutId,
  newRating: FacultyRatingWithoutId
) {
  // count if a user had been added or removed from the rating
  const countUsers: FacultyRatingCount = {
    num_teaching_ratings: getNumCount(
      "teaching_rating",
      previousRating,
      newRating
    ),
    num_attendance_ratings: getNumCount(
      "attendance_rating",
      previousRating,
      newRating
    ),
    num_correction_ratings: getNumCount(
      "correction_rating",
      previousRating,
      newRating
    ),
  };

  // subtract the previous rating from the new Rating
  const updatedFacultyRating: FacultyRatingWithoutId = {
    teaching_rating: 0,
    attendance_rating: 0,
    correction_rating: 0,
  };

  for (const key in previousRating) {
    const previousValue =
      previousRating[key as keyof FacultyRatingWithoutId] ?? 0;
    const newValue = newRating[key as keyof FacultyRatingWithoutId] ?? 0;
    const incValue = newValue - previousValue;
    updatedFacultyRating[key as keyof FacultyRatingWithoutId] = incValue;
  }

  for (const key in previousRating) {
    if (newRating[key as keyof FacultyRatingWithoutId] === null)
      newRating[key as keyof FacultyRatingWithoutId] = 0;
  }

  const facultyDocRef = doc(
    db,
    "partitioned_faculty",
    facultyPartition.toString()
  );
  const ratingsDocRef = doc(db, "ratings", ratingDocId);

  await runTransaction(db, async (transaction) => {
    transaction.update(
      facultyDocRef,
      getFacultyUpdatedRatingDetialCounters(
        facultyId,
        updatedFacultyRating,
        countUsers
      )
    );
    transaction.set(ratingsDocRef, newRating);
  });
}
