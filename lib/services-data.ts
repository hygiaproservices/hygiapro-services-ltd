export interface Service {
  id: string
  name: string
  shortDescription: string
  description: string
  includes: string[]
  startingPrice: number
  priceUnit: string
  image: string
  category: "residential" | "commercial" | "specialized"
}

export const services: Service[] = [
  {
    id: "residential-cleaning",
    name: "Residential Cleaning",
    shortDescription: "Complete home cleaning for apartments and houses",
    description:
      "Our comprehensive residential cleaning service covers every corner of your home. From dusting and vacuuming to mopping and sanitizing, we ensure your living space is spotless and fresh.",
    includes: [
      "Dusting all surfaces and furniture",
      "Vacuuming carpets and rugs",
      "Mopping hard floors",
      "Bathroom deep cleaning",
      "Kitchen cleaning (appliances, counters, sink)",
      "Making beds and tidying",
      "Trash removal",
    ],
    startingPrice: 25000,
    priceUnit: "per session",
    image: "/services/residential-cleaning.jpg",
    category: "residential",
  },
  {
    id: "office-commercial",
    name: "Office & Commercial Cleaning",
    shortDescription: "Professional cleaning for offices and businesses",
    description:
      "Keep your workspace clean and professional with our commercial cleaning services. We work around your schedule to minimize disruption while maximizing cleanliness.",
    includes: [
      "Workstation and desk cleaning",
      "Floor vacuuming and mopping",
      "Restroom sanitization",
      "Kitchen/break room cleaning",
      "Window and glass cleaning",
      "Trash and recycling removal",
      "Reception and common area cleaning",
    ],
    startingPrice: 50000,
    priceUnit: "per session",
    image: "/services/office-cleaning.jpg",
    category: "commercial",
  },
  {
    id: "post-construction",
    name: "Post-Construction Cleaning",
    shortDescription: "Deep cleaning after renovation or construction",
    description:
      "Construction and renovation leave behind dust, debris, and residue that regular cleaning can't handle. Our post-construction cleaning service restores your space to move-in ready condition.",
    includes: [
      "Removal of construction dust and debris",
      "Window and frame cleaning",
      "Deep cleaning of all surfaces",
      "Floor scrubbing and polishing",
      "Cabinet and fixture cleaning",
      "Air vent and duct cleaning",
      "Final inspection and touch-ups",
    ],
    startingPrice: 75000,
    priceUnit: "per project",
    image: "/services/post-construction.jpg",
    category: "specialized",
  },
  {
    id: "airbnb-shortlet",
    name: "Airbnb & Short-let Cleaning",
    shortDescription: "Quick turnaround cleaning for rental properties",
    description:
      "Impress your guests with a spotless space. Our Airbnb cleaning service provides quick turnaround between guests, ensuring your property is always guest-ready.",
    includes: [
      "Complete property cleaning",
      "Fresh linen and towel setup",
      "Restocking amenities",
      "Kitchen reset and cleaning",
      "Bathroom sanitization",
      "Inspection checklist completion",
      "Photo-ready presentation",
    ],
    startingPrice: 20000,
    priceUnit: "per turnover",
    image: "/services/airbnb-cleaning.jpg",
    category: "residential",
  },
  {
    id: "carpet-upholstery",
    name: "Carpet & Upholstery Cleaning",
    shortDescription: "Specialized deep cleaning for fabrics",
    description:
      "Revive your carpets, rugs, and upholstered furniture with our professional deep cleaning service. We remove stains, odors, and allergens to extend the life of your fabrics.",
    includes: [
      "Pre-treatment of stains",
      "Hot water extraction cleaning",
      "Deodorizing treatment",
      "Fabric protection application",
      "Fast-dry techniques",
      "Furniture moving (as needed)",
      "Final grooming and inspection",
    ],
    startingPrice: 15000,
    priceUnit: "per item",
    image: "/services/carpet-cleaning.jpg",
    category: "specialized",
  },
  {
    id: "event-venue",
    name: "Event Venue Cleaning",
    shortDescription: "Pre and post-event cleaning services",
    description:
      "Whether it's before or after your event, we ensure your venue is in perfect condition. Our team handles everything from setup cleaning to post-event restoration.",
    includes: [
      "Pre-event venue preparation",
      "Floor cleaning and polishing",
      "Restroom setup and maintenance",
      "Post-event cleanup",
      "Trash and waste removal",
      "Equipment and furniture cleaning",
      "Next-day restoration (if needed)",
    ],
    startingPrice: 100000,
    priceUnit: "per event",
    image: "/services/event-cleaning.jpg",
    category: "commercial",
  },
  {
    id: "school-cleaning",
    name: "School Cleaning",
    shortDescription: "Safe and thorough cleaning for educational institutions",
    description:
      "Create a healthy learning environment with our specialized school cleaning services. We use child-safe products and focus on high-touch surfaces to minimize germ spread.",
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
    priceUnit: "per session",
    image: "/services/school-cleaning.jpg",
    category: "commercial",
  },
  {
    id: "hospital-healthcare",
    name: "Hospital & Healthcare Cleaning",
    shortDescription: "Medical-grade cleaning for healthcare facilities",
    description:
      "Our healthcare cleaning services meet stringent medical standards. We use hospital-grade disinfectants and follow strict protocols to ensure patient and staff safety.",
    includes: [
      "Medical-grade disinfection",
      "Patient room cleaning",
      "Waiting area sanitization",
      "Restroom cleaning",
      "Floor care and maintenance",
      "Biohazard handling (certified)",
      "High-touch surface focus",
    ],
    startingPrice: 120000,
    priceUnit: "per session",
    image: "/services/hospital-cleaning.jpg",
    category: "commercial",
  },
  {
    id: "church-worship",
    name: "Church & Worship Center Cleaning",
    shortDescription: "Respectful cleaning for places of worship",
    description:
      "We treat your place of worship with the respect and care it deserves. Our team ensures your sanctuary is clean, welcoming, and ready for your congregation.",
    includes: [
      "Sanctuary/hall cleaning",
      "Pew and seating dusting",
      "Floor vacuuming and mopping",
      "Restroom sanitization",
      "Entrance and lobby cleaning",
      "Office and meeting room cleaning",
      "Post-event cleanup",
    ],
    startingPrice: 60000,
    priceUnit: "per session",
    image: "/services/church-cleaning.jpg",
    category: "commercial",
  },
]

export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id)
}

export function getServicesByCategory(category: Service["category"]): Service[] {
  return services.filter((service) => service.category === category)
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}
