const ClientRoutes = {
  LOGINPAGE: "/login",
  REGISTERPAGE: "/register",
  HOMEPAGE: "/",
  PROFILE: "/profile",
  BLOGS: "/blogs",
  BLOGDETAILS: (id: string) => `/blogs/${id}`,
  ADD: "/add",
};

export default ClientRoutes;
