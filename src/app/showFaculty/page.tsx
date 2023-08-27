"use client";

import "@/app/globals.css"; // apply the global styles this is required for tailwind to load
import { getFacultyDetails } from "@/firebase/getFacultyDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cacheFacultyDetials, getCachedData } from "./cache";
import {
  getPreviousStateFromLocalStorage,
  savePreviousStateToLocalStorage,
} from "./previousPageState";
import FacultyCard from "@/components/facultyCard";
import { LoadingCardComponent } from "@/components/loadingCard";

export default function RenderFacultyGrid() {
  // const faculty_details_with_ratings = await getFacultyDetails(0);
  const [faculty_details_with_ratings, setFaculty_details_with_ratings] =
    useState<FacultyData[]>([]);

  const [loading, setLoading] = useState(true);
  const [pageIndex, setIndex] = useState(0);

  useEffect(() => {
    const previousState = getPreviousStateFromLocalStorage();
    if (!previousState) return;
    setIndex(previousState.index);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // check if the data is present in the cacheFacultyDetials
      if (cacheFacultyDetials.has(pageIndex)) {
        const cachedData = getCachedData(pageIndex);
        if (cachedData) {
          setFaculty_details_with_ratings(cachedData.facultyData);
          setLoading(false);
          return;
        }
      }

      const data = await getFacultyDetails(pageIndex);
      setFaculty_details_with_ratings(data);
      setLoading(false);
      const epoch_secs: number = Date.now();
      cacheFacultyDetials.set(pageIndex, {
        facultyData: data,
        timestamp: { epoch_seconds: epoch_secs },
      });
    };
    fetchData();
    savePreviousStateToLocalStorage({ index: pageIndex });
  }, [pageIndex]);

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [...Array(9)].map((_, index) => (
              <LoadingCardComponent key={index} />
            ))
          : faculty_details_with_ratings.map((faculty) => (
              <Link
                key={faculty.id}
                href={{
                  pathname: `/faculty/${faculty.id}`,
                  query: {
                    ...faculty,
                    "partition_number": pageIndex,
                  },
                }}
              >
                <FacultyCard
                  key={faculty.id}
                  faculty={{ ...faculty, partition_number: pageIndex }}
                />
              </Link>
            ))}
      </div>
      {/* Create next and previous buttons */}
      <div className="flex flex-row justify-center gap-8 mt-10">
        <button
          onClick={() => {
            if (pageIndex > 0) {
              setIndex(pageIndex - 1);
            }
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Previous
        </button>
        <button
          onClick={() => {
            setIndex(pageIndex + 1);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
