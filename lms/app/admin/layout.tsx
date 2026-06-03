import Sidebar from "./adminComponents/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="admin-layout">
          <Sidebar />
          <main className="admin-content">{children}</main>
        </div>
      </body>
    </html>
  );
}
