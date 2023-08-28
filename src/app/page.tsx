"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import "./homePage.css"
import Image from "next/image";

// <Link href="/showFaculty/">
//   <p>Faculty</p>
// </Link>;

export default function Home() {
  return (
    <>
      <BackgroundCometComponent />

      {/* create a responsive grid with two items */}
      <div className="grid grid-cols-1 md:grid-cols-3 h-full min-h-[80vh] items-center">
        <HomePageHeaderTextAndButtons className="col-span-2" />
        <CardAnimationComponent className="collapse hidden md:grid md:visible" />
      </div>
    </>
  );
}

function BackgroundCometComponent() {
  return (
    <div className="fixed overflow-x-hidden overflow-y-hidden top-0 left-0 h-full w-full pointer-events-none">
      <div className="absolute comet-shape w-[400px] h-[70px] top-[2%] left-[11%]"></div>
      <div className="absolute comet-shape w-[200px] h-[15px] top-[14%] left-[18%]"></div>
      <div className="absolute comet-shape w-[300px] h-[60px] top-[80%] left-[4%]"></div>
      <div className="absolute comet-shape w-[100px] h-[10px] top-[85%] left-[15%]"></div>
      <div className="absolute comet-shape w-[300px] h-[25px] top-[5%] left-[50%] transform translate-x-[-50%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[4%] left-[52%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[80%] left-[70%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[55%] left-[95%]"></div>
      <div className="absolute comet-shape w-[300px] h-[50px] top-[50%] left-[90%]"></div>
      <div className="absolute comet-shape w-[500px] h-[55px] top-[30%] left-[60%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[60%] left-[60%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[35%] left-[75%]"></div>
      <div className="absolute comet-shape w-[300px] h-[45px] top-[90%] left-[40%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[54%] left-[75%]"></div>
      <div className="absolute comet-shape w-[200px] h-[5px] top-[50%] left-[90%]"></div>
      <div className="absolute comet-shape w-[100px] h-[5px] top-[50%] left-[81%]"></div>
    </div>
  );
}

function CardAnimationComponent({ className = "" }) {
  return (
    <div className={"grid place-items-center h-72" + className}>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[10%] translate-y-[3%] rotate-[5deg]"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[6%] rotate-3"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 rotate-2"></div>
      <div className="absolute opacity-20 border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[10%]  rotate-1"></div>
      {/* <div className="absolute p-8 card-animation-replace-card grid grid-cols-5 items-center border-white w-44 rounded-md aspect-[5/7] bg-slate-500 ">
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
        <span className="text-center change-color-animation"> ★ </span>
      </div> */}
      <div className="absolute grid p-5 grid-cols-5 items-end border-white w-44 rounded-md aspect-[5/7] bg-slate-500 translate-x-[10%] -rotate-1">
        <span className="text-center z-10 change-color-animation mb-5">
          {" "}
          ★{" "}
        </span>
        <span className="text-center z-10 change-color-animation mb-5">
          {" "}
          ★{" "}
        </span>
        <span className="text-center z-10 change-color-animation mb-5">
          {" "}
          ★{" "}
        </span>
        <span className="text-center z-10 change-color-animation mb-5">
          {" "}
          ★{" "}
        </span>
        <span className="text-center z-10 change-color-animation mb-5">
          {" "}
          ★{" "}
        </span>

        <div className="absolute top-0 left-0 z-0 w-full h-full rounded-md aspect-[5/7]">
          <div className="relative w-full h-full img-overlay-gradient rounded-md aspect-[5/7]">
            <Image
              src="/teach.jpg"
              style={{ borderRadius: "inherit" }}
              alt="Picture of the author"
              fill={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function HomePageHeaderTextAndButtons({ className = "" }) {
  const { user, signInWithGoogle } = useAuth();
  return (
    <div className={"flex flex-col items-center md:items-end " + className}>
      <h1 className="text-6xl font-bold">
        Welcome to <br /> Faculty Rating System
      </h1>

      <div className="mt-10 flex flex-row gap-5 ">
        <Link href="/showFaculty/">
          <button className="border-slate-500 border-2 transition-colors hover:bg-slate-500/20 text-white font-bold py-2 px-4 rounded">
            Faculty
          </button>
        </Link>
        {user ? (
          <div></div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className="bg-slate-500 border-slate-500 border-2 hover:bg-slate-700 hover:border-slate-700 transition-colors text-white font-bold py-2 px-4 rounded"
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
}
