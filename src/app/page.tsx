"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import "./cardAnimation.css";

// <Link href="/showFaculty/">
//   <p>Faculty</p>
// </Link>;

export default function Home() {
  return (
      <div className="flex flex-row justify-center flex-wrap items-center">
          <HomePageHeaderTextAndButtons />
          <CardAnimationComponent/>
        </div>
  );
}

function CardAnimationComponent({className = ""} ) {
    return (<div className={"grid place-items-center h-72" + className}>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[10%] translate-y-[3%] rotate-[5deg]"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[6%] rotate-3"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 rotate-2"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[10%]  rotate-1"></div>
      <div className="absolute p-8 card-animation-replace-card grid grid-cols-5 items-center border-white w-44 rounded-md aspect-[5/7] bg-slate-500 ">
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
      </div>
      <div className="absolute p-8 card-animation  grid grid-cols-5 items-center border-white w-44 rounded-md aspect-[5/7] bg-slate-500">
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
      </div>
    </div>);
}

function HomePageHeaderTextAndButtons() {
  const { user, signInWithGoogle } = useAuth();
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold">Welcome to <br/> Faculty Rating System</h1>
      </div>
      <div className="flex flex-col mt-10">
        {user ? (
          <Link href="/showFaculty/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Faculty
            </button>
          </Link>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
