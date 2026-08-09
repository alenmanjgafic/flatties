import { MotionConfig } from "framer-motion";
import NavbarV4 from "@/components/v4/NavbarV4";
import HeroV4 from "@/components/v4/HeroV4";
import TickerBarV4 from "@/components/v4/TickerBarV4";
import AboutV4 from "@/components/v4/AboutV4";
import MenuV4 from "@/components/v4/MenuV4";
import ReviewsV4 from "@/components/v4/ReviewsV4";
import TikTokV4 from "@/components/v4/TikTokV4";
import LocationV4 from "@/components/v4/LocationV4";
import FooterV4 from "@/components/v4/FooterV4";
import { getGoogleReviews } from "@/lib/google-reviews";
import { getTikTokPosts } from "@/lib/tiktok";

const TICKER_TOP = ["Smashed to Order", "100% Swiss Beef", "St. Gallen", "Grab it and Run"];
const TICKER_BOTTOM = ["Open Daily", "Fresh Buns", "Flatties", "St. Gallen"];

// Seite alle 6h neu bauen, damit frische Google-Rezensionen erscheinen
export const revalidate = 21600;

export default async function Home() {
  const [reviewsData, tiktokPosts] = await Promise.all([
    getGoogleReviews(),
    getTikTokPosts(),
  ]);

  return (
    <MotionConfig reducedMotion="user">
      <main className="bg-asphalt">
        <NavbarV4 />
        <HeroV4 />
        <TickerBarV4 items={TICKER_TOP} className="bg-asphalt text-cream" starClassName="text-flame" />
        <AboutV4 />
        <MenuV4 />
        <TickerBarV4
          items={TICKER_BOTTOM}
          baseVelocity={-2.5}
          className="bg-cream text-asphalt"
          starClassName="text-flame"
        />
        {reviewsData && reviewsData.reviews.length > 0 && (
          <ReviewsV4 data={reviewsData} />
        )}
        {tiktokPosts.length > 0 && <TikTokV4 posts={tiktokPosts} />}
        <LocationV4 />
        <FooterV4 />
      </main>
    </MotionConfig>
  );
}
