const endpoints = {
  auth: {
    register: "register",
    login: "login",
    logout: "logout",
  },

  courses: {
    list: "courses",
    create: "courses/create",
    details: (slug: string) => `courses/${slug}`,
    update: (slug: string) => `courses/${slug}`,
    delete: (slug: string) => `courses/${slug}`,
    enroll: "courses/enroll",
    enrolled: "my/enrolledcourses",
  },

  categories: {
    list: "categories",
    create: "categories/create",
    delete: (id: string) => `categories/${id}`,
  },

  lessons: {
    create: "lessons/create",
    details: (id: string) => `lessons/${id}`,
    update: (id: string) => `lessons/${id}`,
    delete: (id: string) => `lessons/${id}`,
  },

  history: {
    list: "my/history",
    add: (lessonId: string) => `my/history/${lessonId}`,
  },
};

export default endpoints;
