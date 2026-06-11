import ClientRoutes from "@/app/ClientRoutes";

export const navItems = [
  {
    name: "Home",
    link: ClientRoutes.HOMEPAGE,
  },
  {
    name: "Blogs",
    link: ClientRoutes.BLOGS,
  },
];

export const authRoutes = [
  {
    name: "Login",
    link: ClientRoutes.LOGINPAGE,
  },
  {
    name: "Register",
    link: ClientRoutes.REGISTERPAGE,
  },
];
