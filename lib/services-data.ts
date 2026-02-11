export interface PricingTier {
  label: string;
  min: number;
  max: number;
}

export interface CityPricing {
  city: "Jos" | "Abuja";
  unit: string;
  tiers: PricingTier[];
  note?: string;
}

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
  pricing: CityPricing[];
}

export const services: Service[] = [
  {
    id: "basic-cleaning",
    name: "Basic Cleaning",
    shortDescription: "Sweeping, mopping, dusting, kitchen & toilet cleaning",
    description:
      "A reliable everyday clean for apartments and homes with a focus on the essentials.",
    includes: [
      "Sweeping and mopping floors",
      "Dusting all surfaces and furniture",
      "Kitchen cleaning (counters, sink, stove)",
      "Toilet and bathroom cleaning",
      "Trash removal",
    ],
    startingPrice: 25000,
    priceUnit: "per visit",
    image: "/residential-cleaning.jpg",
    category: "residential",
    pricing: [
      {
        city: "Jos",
        unit: "per visit",
        tiers: [
          { label: "2-3 bedroom", min: 25000, max: 35000 },
        ],
        note: "Prices vary by size, severity, and location.",
      },
      {
        city: "Abuja",
        unit: "per visit",
        tiers: [
          { label: "2-3 bedroom", min: 25000, max: 35000 },
        ],
        note: "Prices vary by size, severity, and location.",
      },
    ],
  },
  {
    id: "deep-cleaning",
    name: "Deep Cleaning",
    shortDescription: "Tiles, windows, kitchen cabinets, bathrooms",
    description:
      "Intensive cleaning for hard-to-reach areas and stubborn grime.",
    includes: [
      "Tile scrubbing and grout refresh",
      "Window and frame cleaning",
      "Kitchen cabinet wipe-down",
      "Bathroom descaling and detailing",
      "Appliance degreasing",
      "High-touch surface disinfection",
    ],
    startingPrice: 40000,
    priceUnit: "per visit",
    image: "/professional-cleaning-team-in-modern-home--bright-.jpg",
    category: "residential",
    pricing: [
      {
        city: "Jos",
        unit: "per visit",
        tiers: [{ label: "2-3 bedroom", min: 40000, max: 55000 }],
        note: "Prices vary by size, severity, and location.",
      },
      {
        city: "Abuja",
        unit: "per visit",
        tiers: [{ label: "2-3 bedroom", min: 40000, max: 55000 }],
        note: "Prices vary by size, severity, and location.",
      },
    ],
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    shortDescription: "Deep cleaning after renovation or construction",
    description:
      "Clear out dust, debris, and residue after renovations to make the space move-in ready.",
    includes: [
      "Removal of construction dust and debris",
      "Window and frame cleaning",
      "Deep cleaning of all surfaces",
      "Floor scrubbing and polishing",
      "Cabinet and fixture cleaning",
      "Air vent and duct cleaning",
      "Final inspection and touch-ups",
    ],
    startingPrice: 0,
    priceUnit: "per project",
    image: "/post-construction.jpg",
    category: "specialized",
    pricing: [
      {
        city: "Jos",
        unit: "per project",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection, size, and city.",
      },
      {
        city: "Abuja",
        unit: "per project",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection, size, and city.",
      },
    ],
  },
  {
    id: "fumigation-pest-control",
    name: "Fumigation & Pest Control",
    shortDescription: "Residential and commercial pest treatment",
    description:
      "Comprehensive fumigation for homes, offices, and schools to keep spaces pest-free.",
    includes: [
      "Inspection and assessment",
      "Targeted treatment plan",
      "Safe chemical application",
      "Crack and entry point treatment",
      "Post-treatment guidance",
      "Follow-up support if needed",
    ],
    startingPrice: 30000,
    priceUnit: "per treatment",
    image: "/eco-friendly-cleaning-products--green-bottles-and.jpg",
    category: "specialized",
    pricing: [
      {
        city: "Jos",
        unit: "per treatment",
        tiers: [{ label: "Standard", min: 30000, max: 30000 }],
        note: "Price varies by size, location, and severity.",
      },
      {
        city: "Abuja",
        unit: "per treatment",
        tiers: [{ label: "Standard", min: 30000, max: 30000 }],
        note: "Price varies by size, location, and severity.",
      },
    ],
  },
  {
    id: "combo-cleaning-fumigation",
    name: "Cleaning + Fumigation Combo",
    shortDescription: "Bundle deal for faster results and savings",
    description:
      "Bundle basic cleaning with fumigation for faster close and better value.",
    includes: [
      "Full basic cleaning",
      "Targeted fumigation treatment",
      "Single-visit coordination",
      "Post-service checklist",
    ],
    startingPrice: 45000,
    priceUnit: "per bundle",
    image: "/cleaning-team-group-photo--professional-uniformed.jpg",
    category: "residential",
    pricing: [
      {
        city: "Jos",
        unit: "per bundle",
        tiers: [{ label: "2-3 bedroom", min: 45000, max: 45000 }],
        note: "Prices vary by size, severity, and location.",
      },
      {
        city: "Abuja",
        unit: "per bundle",
        tiers: [{ label: "2-3 bedroom", min: 45000, max: 45000 }],
        note: "Prices vary by size, severity, and location.",
      },
    ],
  },
  {
    id: "office-monthly-contracts",
    name: "Office Cleaning (Monthly Contracts)",
    shortDescription: "Scheduled cleaning for small and medium offices",
    description:
      "Consistent office care with flexible schedules and reliable routines.",
    includes: [
      "Workstation and desk cleaning",
      "Floor vacuuming and mopping",
      "Restroom sanitization",
      "Kitchen/break room cleaning",
      "Trash and recycling removal",
      "Reception and common area cleaning",
    ],
    startingPrice: 0,
    priceUnit: "per month",
    image: "/office-cleaning.jpg",
    category: "commercial",
    pricing: [
      {
        city: "Jos",
        unit: "per month",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection.",
      },
      {
        city: "Abuja",
        unit: "per month",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection.",
      },
    ],
  },
  {
    id: "school-cleaning",
    name: "School Cleaning",
    shortDescription: "Safe and thorough cleaning for educational institutions",
    description:
      "Create a healthy learning environment with child-safe products and high-touch disinfection.",
    includes: [
      "Classroom cleaning and sanitization",
      "Restroom deep cleaning",
      "Cafeteria cleaning",
      "Hallway and common area cleaning",
      "Office and staff room cleaning",
      "Playground equipment sanitization",
      "Window cleaning",
    ],
    startingPrice: 0,
    priceUnit: "per month",
    image: "/school-cleaning.jpg",
    category: "commercial",
    pricing: [
      {
        city: "Jos",
        unit: "per month",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection.",
      },
      {
        city: "Abuja",
        unit: "per month",
        tiers: [{ label: "Inspection required", min: 0, max: 0 }],
        note: "Price determined after inspection.",
      },
    ],
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
