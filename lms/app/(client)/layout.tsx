import { ReactNode } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="eng">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
