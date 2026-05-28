export const getAllBlogs = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/blog", {
      method: "GET",
      cache: "no-store",
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
