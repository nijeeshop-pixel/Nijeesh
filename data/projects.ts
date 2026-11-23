// Placeholder gallery. Replace `src` with your own images (e.g. "/images/work/01.jpg")
// and keep width/height equal to the real image size for correct layout.
export type Category = "Interior" | "Exterior" | "Product" | "AI";
export const categories: Category[] = ["Interior", "Exterior", "Product", "AI"];

export type Project = {
  id: string;
  title: string;
  category: Category;
  src: string;
  width: number;
  height: number;
  year: number;
};

const titles = [
  "Coastal Residence", "Nordic Living Room", "Urban Tower", "Lounge Chair Study",
  "Courtyard House", "Minimal Bedroom", "Glass Pavilion", "Oak Dresser Set",
  "Desert Villa", "Kitchen Atelier", "Hillside Retreat", "AI Lifestyle Series",
  "Concrete Loft", "Boutique Hotel Lobby", "Riverside Office", "Sofa Collection",
];
const sizes: [number, number][] = [
  [1200, 900], [900, 1200], [1200, 800], [1000, 1000], [960, 1280],
];

export const projects: Project[] = Array.from({ length: 60 }, (_, i) => {
  const [width, height] = sizes[i % sizes.length];
  return {
    id: `p-${i + 1}`,
    title: titles[i % titles.length],
    category: categories[i % categories.length],
    src: `https://picsum.photos/seed/archviz-${i + 1}/${width}/${height}`,
    width,
    height,
    year: 2026 - (i % 8),
  };
});

/** First 20 shown on the home page */
export const featured = projects.slice(0, 20);
