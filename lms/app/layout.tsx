import { ToastContainer } from "react-toastify";
import "./globals.css";
import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
  title: {
    default: "MekaLearn",
    template: "%s | MekaLearn",
  },
  description:
    "MekaLearn is an online learning platform that helps students access courses, lessons, and track their learning progress.",
  keywords: [
    "MekaLearn",
    "LMS",
    "Learning Management System",
    "Online Learning",
    "E-Learning",
    "Courses",
    "Education Platform",
    "Learning Platform",
  ],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "MekaLearn",
    description:
      "Learn new skills with MekaLearn's online courses and learning resources.",
    type: "website",
    siteName: "MekaLearn",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="eng">
      <body>
        <ToastContainer />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
