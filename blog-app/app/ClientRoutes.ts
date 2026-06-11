const ClientRoutes = {
  LOGINPAGE: "/login",
  REGISTERPAGE: "/register",
  HOMEPAGE: "/",
  CATEGORIES: "/categories",
  PROFILE: "/profile",
  BLOGS: "/blogs",
  BLOGDETAILS: (id: string) => `/blogs/${id}`,
  ADD: "/add",
};

export default ClientRoutes;
