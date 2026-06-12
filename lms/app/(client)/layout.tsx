import Footer from "@/app/components/Footer";
import Navbar from "@/app/components/Navbar";
import { ReactNode } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
