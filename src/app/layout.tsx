"use client";

import "./globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import { Navbar } from "../components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthContextProvider>
    <html lang="en">
      <body>
        <AuthContextProvider>
          <Navbar />
          {children}
        </AuthContextProvider>
        <footer className="bg-gray-800 py-6">
          <div className="container mx-auto text-center text-white">
            <div className="mb-4 flex justify-center">
              <a
                href="https://github.com/Sarath191181208/faculty-ranker"
                target="_blank"
                className="text-blue-500 hover:text-blue-300 mr-10"
              >
                GitHub
              </a>
              <div>
                <a
                  href="https://mail.google.com/mail/?view=cm&to=vssarathc04@gmail.com"
                  className="text-blue-500 hover:text-blue-300"
                >
                  Contact us
                </a>
              </div>
            </div>
            <div className="mb-4">
              &copy; 2023 Faculty Ranker. All rights reserved.
            </div>
          </div>
        </footer>
      </body>
    </html>
    // </AuthContextProvider>
  );
}
