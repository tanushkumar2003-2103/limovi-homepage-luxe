import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/limovi/AnnouncementBar";
import { Header } from "@/components/limovi/Header";
import { Hero } from "@/components/limovi/Hero";
import { Categories } from "@/components/limovi/Categories";
import { FeaturedCollections } from "@/components/limovi/FeaturedCollections";
import { BestSellers } from "@/components/limovi/BestSellers";
import { NewArrivals } from "@/components/limovi/NewArrivals";
import { WhyChooseUs } from "@/components/limovi/WhyChooseUs";
import { Testimonials } from "@/components/limovi/Testimonials";
import { Newsletter } from "@/components/limovi/Newsletter";
import { Footer } from "@/components/limovi/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Limovi — Heirloom Jewellery for the Modern Woman" },
      {
        name: "description",
        content:
          "Discover Limovi — hand-finished gold and ethically sourced diamond jewellery, crafted by master artisans into heirlooms for generations.",
      },
      { property: "og:title", content: "Limovi — Heirloom Jewellery" },
      {
        property: "og:description",
        content: "Premium bridal, diamond and everyday jewellery. Hallmarked, certified, lifetime exchange.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedCollections />
        <BestSellers />
        <NewArrivals />
        <WhyChooseUs />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
