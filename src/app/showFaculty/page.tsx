"use client";

import Link from "next/link";
import Image from "next/image";

import { getFacultyDetails } from "@/firebase/getFacultyDetails";
import { ChangeEvent, useEffect, useState } from "react";
import { cacheFacultyDetials, getCachedData } from "./cache";
import {
  getPreviousStateFromLocalStorage,
  savePreviousStateToLocalStorage,
} from "./previousPageState";
import FacultyCard from "@/components/facultyCard";
import { LoadingCardComponent } from "@/components/loadingCard";
import { SearchBar } from "./searchbar";
import { queryFacultyData } from "./query_faculty";

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
      {/* create a section full of text telling thath this is a All Faculty Page */}
      <div className="max-w-md">
        <h1 className="text-4xl font-bold">All Faculty</h1>
        <p className="mt-3 text-gray-400">
          {" "}
          A faculty rating website for the University of VIT-AP. Students can
          rate their faculty and view the ratings of other faculty. This website
          mainly has three ratings for each faculty{" "}
        </p>
      </div>

      <FacultyFilterSearchBar className="mt-3 xl:mt-0" />
      {/* Faculty display grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading
          ? [...Array(9)].map((_, index) => <LoadingCardComponent
            key={index}
          />)
          : faculty_details_with_ratings.map((faculty) => (
            <Link
              key={faculty.id}
              href={{
                pathname: `/faculty/${faculty.id}`,
                query: {
                  ...faculty,
                  partition_number: pageIndex,
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
      {/* Next and previous buttons */}
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

function FacultyFilterSearchBar({ className = "" }) {
  const facultySearchData = queryFacultyData;
  const [filteredData, setFilteredData] = useState<FacultyQueryData[]>([]);

  const filterSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (text.length < 2) {
      setFilteredData([]);
      return;
    }
    const _filteredData = facultySearchData.filter((faculty) => {
      return faculty.name.toLowerCase().includes(text.toLowerCase());
    });
    setFilteredData(_filteredData);
  };

  return (
    <div className={"relative " + className}>
      <SearchBar
        className="mb-5 mx-auto lg:mr-0 lg:ml-auto"
        onChange={filterSearchData}
      />
      <div
        className={"absolute w-full top-[100%] mt-1 " +
          (filteredData.length > 0 ? " " : "collapse")}
      >
        <div className="max-w-md mx-auto lg:mr-0 lg:ml-auto z-10 h-40 rounded-lg overflow-y-scroll overflow-x-hidden bg-slate-600">
          {filteredData.map((faculty) => (
            <Link
              key={faculty.id}
              href={{
                pathname: `/faculty/${faculty.id}`,
                query: {
                  ...faculty,
                },
              }}
            >
              {/* show image and faculty name the image is super small */}
              <div className="flex flex-row items-center gap-2 p-2 hover:bg-slate-700 cursor-pointer">
                <Image
                  src={faculty.image_url}
                  width={30}
                  height={30}
                  style={{ borderRadius: "6px" }}
                  alt={faculty.name}
                />
                <p className="text-sm text-gray-300">{faculty.name}</p>
              </div>
            </Link>
          ))}
          <div className="p-3"></div>
        </div>
      </div>
    </div>
  );
}
