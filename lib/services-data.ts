export interface Service {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  includes: string[];
  startingPrice: number;
  priceUnit: string;
  image: string;
  category: "residential" | "commercial" | "specialized";
}

export const services: Service[] = [
  {
    id: "basic-cleaning",
    name: "Basic Cleaning",
    shortDescription: "Sweeping, mopping, dusting, kitchen & toilet cleaning",
    description:
      "A reliable everyday clean for apartments and homes. Pricing guide: Jos 1 bedroom NGN 15,000-20,000; 2-3 bedroom NGN 20,000-30,000. Abuja 1 bedroom NGN 25,000-35,000; 2-3 bedroom NGN 40,000-60,000.",
    includes: [
      "Sweeping and mopping floors",
      "Dusting all surfaces and furniture",
      "Kitchen cleaning (counters, sink, stove)",
      "Toilet and bathroom cleaning",
      "Trash removal",
    ],
    startingPrice: 15000,
    priceUnit: "per visit (pricing varies by city and size)",
    image: "/residential-cleaning.jpg",
    category: "residential",
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    shortDescription: "Tiles, windows, kitchen cabinets, bathrooms",
    description:
      "Intensive cleaning for hard-to-reach areas and stubborn grime. Pricing guide: Jos 2-3 bedroom NGN 30,000-50,000. Abuja 2-3 bedroom NGN 60,000-90,000.",
    includes: [
      "Tile scrubbing and grout refresh",
      "Window and frame cleaning",
      "Kitchen cabinet wipe-down",
      "Bathroom descaling and detailing",
      "Appliance degreasing",
      "High-touch surface disinfection",
    ],
    startingPrice: 30000,
    priceUnit: "per visit (2-3 bedroom)",
    image: "/professional-cleaning-team-in-modern-home--bright-.jpg",
    category: "residential",
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    shortDescription: "Deep cleaning after renovation or construction",
    description:
      "Clear out dust, debris, and residue after renovations. Pricing guide: Jos 2-3 bedroom NGN 80,000-150,000; duplex NGN 150,000-250,000. Abuja 2-3 bedroom NGN 180,000-350,000; duplex NGN 300,000-600,000+. Final price after inspection.",
    includes: [
      "Removal of construction dust and debris",
      "Window and frame cleaning",
      "Deep cleaning of all surfaces",
      "Floor scrubbing and polishing",
      "Cabinet and fixture cleaning",
      "Air vent and duct cleaning",
      "Final inspection and touch-ups",
    ],
    startingPrice: 80000,
    priceUnit: "per project (inspection required)",
    image: "/post-construction.jpg",
    category: "specialized",
  },
  {
    id: "fumigation-pest-control",
    name: "Fumigation & Pest Control",
    shortDescription: "Residential and commercial pest treatment",
    description:
      "Comprehensive fumigation for homes, offices, and schools. Residential pricing: Jos 1-2 bedroom NGN 15,000-25,000; 3 bedroom NGN 25,000-40,000. Abuja 1-2 bedroom NGN 30,000-50,000; 3 bedroom NGN 50,000-80,000. Offices/Schools: Jos NGN 40,000-150,000; Abuja NGN 120,000-400,000+ (depends on size and infestation level).",
    includes: [
      "Inspection and assessment",
      "Targeted treatment plan",
      "Safe chemical application",
      "Crack and entry point treatment",
      "Post-treatment guidance",
      "Follow-up support if needed",
    ],
    startingPrice: 15000,
    priceUnit: "per treatment (pricing varies by size)",
    image: "/eco-friendly-cleaning-products--green-bottles-and.jpg",
    category: "specialized",
  },
  {
    id: "combo-cleaning-fumigation",
    name: "Cleaning + Fumigation Combo",
    shortDescription: "Bundle deal for faster results and savings",
    description:
      "Bundle basic cleaning with fumigation for faster close and better value. Pricing guide: Jos 2-3 bedroom NGN 35,000-55,000. Abuja 2-3 bedroom NGN 70,000-120,000.",
    includes: [
      "Full basic cleaning",
      "Targeted fumigation treatment",
      "Single-visit coordination",
      "Post-service checklist",
    ],
    startingPrice: 35000,
    priceUnit: "per bundle (2-3 bedroom)",
    image: "/cleaning-team-group-photo--professional-uniformed.jpg",
    category: "residential",
  },
  {
    id: "office-monthly-contracts",
    name: "Office Cleaning (Monthly Contracts)",
    shortDescription: "Scheduled cleaning for small and medium offices",
    description:
      "Consistent office care with flexible schedules. Pricing guide: Jos small office NGN 60,000-120,000; medium office NGN 120,000-200,000. Abuja small office NGN 150,000-300,000; medium office NGN 300,000-500,000+.",
    includes: [
      "Workstation and desk cleaning",
      "Floor vacuuming and mopping",
      "Restroom sanitization",
      "Kitchen/break room cleaning",
      "Trash and recycling removal",
      "Reception and common area cleaning",
    ],
    startingPrice: 60000,
    priceUnit: "per month (pricing varies by size/city)",
    image: "/office-cleaning.jpg",
    category: "commercial",
  },
  {
    id: "school-cleaning",
    name: "School Cleaning",
    shortDescription: "Safe and thorough cleaning for educational institutions",
    description:
      "Create a healthy learning environment with child-safe products. Pricing guide: Jos NGN 80,000-200,000 monthly. Abuja pricing available on request.",
    includes: [
      "Classroom cleaning and sanitization",
      "Restroom deep cleaning",
      "Cafeteria cleaning",
      "Hallway and common area cleaning",
      "Office and staff room cleaning",
      "Playground equipment sanitization",
      "Window cleaning",
    ],
    startingPrice: 80000,
    priceUnit: "per month (pricing varies by size/city)",
    image: "/school-cleaning.jpg",
    category: "commercial",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

export function getServicesByCategory(
  category: Service["category"]
): Service[] {
  return services.filter((service) => service.category === category);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
