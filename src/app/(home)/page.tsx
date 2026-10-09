import { HeroCarousel } from "@/components/HeroCarousel";
import { HomeSections } from "@/components/HomeSections";
import { getHomeSlides } from "@/lib/home-slides";

export default async function HomePage() {
  const slides = await getHomeSlides();

  return (
    <div className="home-deck">
      <HeroCarousel slides={slides} />
      <HomeSections />
    </div>
  );
}
