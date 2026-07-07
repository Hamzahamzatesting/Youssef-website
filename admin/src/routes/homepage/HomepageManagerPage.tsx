import { motion } from "motion/react";
import { HeroForm } from "@/routes/homepage/HeroForm";
import { HeroStatsEditor } from "@/routes/homepage/HeroStatsEditor";
import { MosaicImagesEditor } from "@/routes/homepage/MosaicImagesEditor";
import { FeaturedProjectsPanel } from "@/routes/homepage/FeaturedProjectsPanel";

const sections = [
  { title: "Hero", content: <HeroForm /> },
  { title: null, content: <HeroStatsEditor /> },
  { title: null, content: <MosaicImagesEditor /> },
  { title: null, content: <FeaturedProjectsPanel /> },
];

export function HomepageManagerPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {sections.map((s, i) => (
        <motion.section
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl border border-line/70 bg-white p-6 shadow-[var(--shadow-soft)]"
        >
          {s.title && <h2 className="mb-5 font-display text-xl text-ink">{s.title}</h2>}
          {s.content}
        </motion.section>
      ))}
    </div>
  );
}
