"use client";

import { FiveStarRating } from "@/components/five_star_tray";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { writeFacultyRating } from "@/firebase/starRating";
import Image from "next/image";
import BsChevronLeft from "../leftIcon";
import AiOutlineQuestionCircle from "../questionIcon";
import { getFacultyDetails } from "@/firebase/getFacultyDetails";
import { RatingSquare } from "@/components/RatingSquare";


export default function SingleFacultyPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const [facultyData, setFacultyData] =
    useState<FacultyDataWithPartitionNumber>(parseSearchParams(searchParams));
  const {
    partitionNumber,
    image_url,
    specialization,
    attendance_rating,
    correction_rating,
    teaching_rating,
    name,
  }: FacultyDataWithPartitionNumber = facultyData;

  const {
    user,
    signInWithGoogle,
  }: { user: User; signInWithGoogle: () => Promise<void> } = useAuth();

  const [givenRatings, setGivenRatings] = useState<FacultyRatingWithoutId>({
    attendance_rating: null,
    correction_rating: null,
    teaching_rating: null,
  });

  const [previousRatings, setPreviousRatings] =
    useState<FacultyRatingWithoutId>({
      attendance_rating: null,
      correction_rating: null,
      teaching_rating: null,
    });

  const [isWritingData, setIsWritingData] = useState(false);
  const isDataAlreadyWritten =
    previousRatings.attendance_rating != null ||
    previousRatings.correction_rating != null ||
    previousRatings.teaching_rating != null;

  useEffect(() => {
    if (user == null) return;
    if (
      previousRatings.attendance_rating != null ||
      previousRatings.correction_rating != null ||
      previousRatings.teaching_rating != null
    )
      return;
    const queryString = getUserRatingDBKey(user, facultyData.partitionNumber, params.id);
    const ratingRef = doc(db, "ratings", queryString);
    const getRating = async () => {
      const ratingDoc = await getDoc(ratingRef);
      if (ratingDoc.exists()) {
        const ratingData = ratingDoc.data() as FacultyRatingWithoutId;
        setGivenRatings(ratingData);
        setPreviousRatings(ratingData);
      }
    };
    getRating();
  }, [user]);

  useEffect(() => {
    const fetchFacultyDetails = async () => {
      // if (user == null) return;
      if (
        attendance_rating == null ||
        correction_rating == null ||
        teaching_rating == null
      ) {
        const doc = await getFacultyDetails(partitionNumber);
        // update all the search params
        const faculty = doc.find((faculty) => faculty.id === params.id);
        if (faculty == null) return;
        setFacultyData((prev) => ({
          ...prev,
          image_url: faculty.image_url,
          specialization: faculty.specialization,
          name: faculty.name,
          attendance_rating: faculty.attendance_rating,
          correction_rating: faculty.correction_rating,
          teaching_rating: faculty.teaching_rating,
        }));
      }
    };
    if (
      attendance_rating == null &&
      correction_rating == null &&
      teaching_rating == null
    )
      fetchFacultyDetails();
  }, [user]);

  const attdRatingTxt = <div className="flex flex-col">
    <div className="flex flex-row items-center">
      <label htmlFor="attendance_rating">Attendance Rating </label>
      <div
        className="ml-1"
        title="How lenient the professor is when considering attendance, i.e more stars correspond to more leniency"
      >
        <AiOutlineQuestionCircle />
      </div>
    </div>

    <div className="text-xs text-gray-500">
      {givenRatings.attendance_rating
        ? ratingLables.attendance_rating[
        givenRatings.attendance_rating - 1
        ]
        : "Amount of lieniency in taking attendance"}
    </div>
  </div>;

  const correctionRatingTxt = <div className="flex flex-col">
    <div className="flex flex-row items-center">
      <label htmlFor="correction_rating">Correction Rating </label>
      <div
        className="ml-1"
        title="How lenient the professor is when correcting, i.e more stars correspond to more leniency"
      >
        <AiOutlineQuestionCircle />
      </div>
    </div>
    <div className="text-xs text-gray-500">
      {givenRatings.correction_rating
        ? ratingLables.correction_rating[
        givenRatings.correction_rating - 1
        ]
        : "Amount of lieniency in correction"}
    </div>
  </div>;

  const teachingRatingTxt = <div className="flex flex-col">
    <div className="flex flex-row items-center">
      <label htmlFor="teaching_rating">Teaching Rating </label>
      <div
        className="ml-1"
        title="How good the professor is at teaching, i.e more stars correspond to better teaching"
      >
        <AiOutlineQuestionCircle />
      </div>
    </div>
    <div className="text-xs text-gray-500">
      {givenRatings.teaching_rating
        ? ratingLables.teaching_rating[
        givenRatings.teaching_rating - 1
        ]
        : "Experience in teaching"}
    </div>
  </div>;


  return (
    <div className="p-1">
      <div className="flex">
        <button
          className=""
          onClick={() => {
            window.history.back();
          }}
        >
          <BsChevronLeft />
        </button>
        <h1 className="text-3xl cursor-default ml-5">
          {/* create a back button  */}
          {name}
        </h1>
      </div>

      <div className="mt-5 gap-5">
        <div className="flex flex-col items-center gap-5 lg:flex-row lg:flex-wrap">
          <Image src={image_url} alt={name} width={150} height={150} className="rounded-lg" />
          <div className="flex flex-col items-center gap-5">
            <p className="text-gray-500 text-sm overflow-ellipsis max-w-xs">
              {specialization}
            </p>
            {/* show the stars and label beside them */}
            <div className="flex flex-row gap-8 flex-wrap justify-around">
              <RatingSquare rating={attendance_rating ?? 0} label="Attendance" style="text-rose-500" />
              <RatingSquare rating={correction_rating ?? 0} label="Correction" style="text-sky-500" />
              <RatingSquare rating={teaching_rating ?? 0} label="Teaching" style="text-teal-500" />
            </div>
          </div>
        </div>

        <div className="max-w-md mt-5">
          <h2 className="text-xl mb-2">Rate the faculty: </h2>
          <div className="pl-5">
            <div className="flex flex-col mb-4 md:flex-row md:mb-0 md:gap-8">
              {attdRatingTxt}
              <FiveStarRating
                rating={givenRatings.attendance_rating ?? 0}
                className="md:ml-auto"
                starColor="text-rose-500"
                handleStarClick={(clickedStar) => {
                  setGivenRatings((prev) => ({
                    ...prev,
                    attendance_rating: clickedStar,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col mb-4 md:flex-row md:mb-0 md:gap-8">
              {correctionRatingTxt}
              <FiveStarRating
                className="md:ml-auto"
                starColor="text-sky-500"
                rating={givenRatings.correction_rating ?? 0}
                handleStarClick={(clickedStar) => {
                  setGivenRatings((prev) => ({
                    ...prev,
                    correction_rating: clickedStar,
                  }));
                }}
              />
            </div>

            <div className="flex flex-col mb-4 md:flex-row md:mb-0 md:gap-8">
              {teachingRatingTxt}
              <FiveStarRating
                starColor="text-teal-500"
                className="md:ml-auto"
                rating={givenRatings.teaching_rating ?? 0}
                handleStarClick={(clickedStar) => {
                  setGivenRatings((prev) => ({
                    ...prev,
                    teaching_rating: clickedStar,
                  }));
                }}
              />
            </div>

            <button
              disabled={isWritingData}
              className="btn btn-primary bg-slate-50 hover:bg-slate-100 text-black p-2 rounded-md mt-4 mb-8"
              onClick={async () => {
                setIsWritingData(true);

                if (user == null) {
                  try {
                    await signInWithGoogle();
                  } catch (error) {
                    const err: Error = error as Error;
                    console.error(err);
                    alert("You must sign in to rate");
                    return;
                  }
                }
                const queryString = getUserRatingDBKey(user, partitionNumber, params.id);
                try {
                  await writeFacultyRating(
                    partitionNumber,
                    params.id,
                    queryString,
                    previousRatings,
                    givenRatings
                  );
                  setPreviousRatings({ ...givenRatings });
                } catch (error) {
                  const err = error as Error & { code: string };
                  if (err.code === "permission-denied") {
                    const alertString =
                      user == null
                        ? "You need to sign in to rate"
                        : "You must sign in through your college email to rate";
                    alert(alertString);
                  }
                } finally {
                  setIsWritingData(false);
                }
              }}
            >
              {isWritingData ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
              ) : (
                isDataAlreadyWritten ? "Update" : "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type FacultyDataWithPartitionNumber = FacultyData & { partitionNumber: number };

function parseSearchParams(
  searchParams: ReadonlyURLSearchParams
): FacultyDataWithPartitionNumber {
  const partitionNumber: number = (searchParams.get("partition_number") ??
    "0") as unknown as number;

  const attendance_rating: number | null = searchParams.get(
    "attendance_rating"
  ) as unknown as number | null;
  const correction_rating: number | null = searchParams.get(
    "correction_rating"
  ) as unknown as number | null;
  const teaching_rating: number | null = searchParams.get(
    "teaching_rating"
  ) as unknown as number | null;

  const id = searchParams.get("id");
  const name = searchParams.get("name") ?? "unknown";
  const image_url = searchParams.get("image_url") ?? "unknown";
  const specialization = searchParams.get("specialization") ?? "unknown";

  if (id == null) throw new Error("id is null");

  const num_teaching_ratings: number = (searchParams.get(
    "num_teaching_ratings"
  ) ?? "0") as unknown as number;
  const num_attendance_ratings: number = (searchParams.get(
    "num_attendance_ratings"
  ) ?? "0") as unknown as number;
  const num_correction_ratings: number = (searchParams.get(
    "num_correction_ratings"
  ) ?? "0") as unknown as number;

  return {
    partitionNumber,
    attendance_rating,
    correction_rating,
    teaching_rating,
    id,
    name,
    image_url,
    specialization,
    num_teaching_ratings,
    num_attendance_ratings,
    num_correction_ratings,
  };
}

const ratingLables = {
  attendance_rating: [
    "Strict",
    "Somewhat strict",
    "Moderate",
    "Somewhat lenient",
    "Lenient",
  ],
  correction_rating: [
    "Strict",
    "Somewhat strict",
    "Moderate",
    "Somewhat lenient",
    "Lenient",
  ],

  teaching_rating: ["Very bad", "Bad", "Average", "Good", "Very good"],
};
