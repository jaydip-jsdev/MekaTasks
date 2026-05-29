import Hero from "@/components/Hero/Hero";
import PostsContainer from "@/components/Posts/PostsContainer";
import FeaturedWork from "@/components/Featured/FeaturedWork";

// taks one

export default function Home() {
  return (
    <main>
      <Hero />
      <PostsContainer />
      <FeaturedWork />
    </main>
  );
}
