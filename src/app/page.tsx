import { HeroCarousel } from "@/components/HeroCarousel";
import { HomeSections } from "@/components/HomeSections";
import { getHomeSlides } from "@/lib/home-slides";

export default function HomePage() {
  const slides = getHomeSlides();

  return (
    <div className="home-deck">
      <HeroCarousel slides={slides} />
      <HomeSections />
    </div>
  );
}
