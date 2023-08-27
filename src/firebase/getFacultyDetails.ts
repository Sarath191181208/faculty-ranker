import {
  doc,
  getDoc
} from "firebase/firestore";  
import { db } from "@/firebase/firebase";

export const getFacultyDetails = async (
  start: number
): Promise<FacultyData[]> => {
  const docRef = doc(db, "partitioned_faculty", start.toString());
  const docSnap = (await getDoc(docRef));
  if (!docSnap.exists()) {
    console.log("No such document!");
    return [];
  }

  const data = docSnap.data();
  if (!data) {
    console.log("No data in document!");
    return [];
  }

  // convert data to FacultyData[]
  const facultyData = Object.entries(data).map(([key, value]) => {
    return {
      id: key,
      ...value,
    } as FacultyData;
  });

  // sort these faculty data based on name
  facultyData.sort((a, b) => {
    // remove Dr., dr. Dr dr DR dR prefixes and spaces from name
    const nameA = a.name.replace(/Dr\.?/gi, "").replace(/\s/g, "");
    const nameB = b.name.replace(/Dr\.?/gi, "").replace(/\s/g, "");

    if (nameA < nameB) return -1;
    else if (nameA > nameB) return 1;
    else return 0;
  });

  // fix the average rating count for each faculty
  facultyData.forEach((faculty) => {
    const numRatings = [
      "num_teaching_ratings",
      "num_attendance_ratings",
      "num_correction_ratings",
    ] as const;

    const numRatingsTotalRatings = [
      "teaching_rating",
      "attendance_rating",
      "correction_rating",
    ] as const;

    numRatings.forEach((numRating, index) => {
      const totalRating = numRatingsTotalRatings[index];
      if (faculty[numRating] != null && faculty[totalRating] != null) {
        faculty[totalRating] = parseFloat((faculty[totalRating]! / faculty[numRating]!).toFixed(2));
      }
    });
  });
  return facultyData;
};
