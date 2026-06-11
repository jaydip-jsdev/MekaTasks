import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import ToastProvider from "./components/global/ToastProvider/ToastProvider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MekaBlogs - Share Your Ideas With The World",
  description:
    "Read, write and share blogs on technology, programming, and more with MekaBlogs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
