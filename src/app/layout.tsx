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
      </body>
    </html>
    // </AuthContextProvider>
  );
}
