// write a navbar component with just profile image if logged in else login no signup

import React from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";

("rounded-circle");

export const Navbar = () => {
  const { user, signInWithGoogle, signOutWithGoogle } = useAuth();
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOutWithGoogle();
    } catch (error: any) {
      setError(error.message);
    }
  };

  // create a responsive nav bar with profile image if logged in else login button
  // the nav bar must contain home button, faculty button, search bar 
  // the nav bar must be responsive
  
  return (
    <div className="flex flex-row justify-between items-center bg-zinc-950 p-5">
      <div className="flex flex-row gap-4 items-center">
        {/* showing the image  */}
        {user ? (
          <Image
            src={user.photoURL ?? ""}
            alt={user.displayName ?? ""}
            width={50}
            height={50}
            className="rounded-full"
          />
        ) : (
          <></>
        )}
        {/* showing the name */}
        {user ? (
          <p className="text-xl cursor-default">{user.displayName}</p>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row gap-4 items-center">
        {/* showing the login button */}
        {user ? (
          <button
            className="border-red-500 border-2 text-xs hover:bg-red-600/40 text-white font-bold py-2 px-4 rounded"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        ) : (
          <button
            className="border-green-400 border-2 m-2 text-xs transition hover:bg-green-600/40 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );

};
