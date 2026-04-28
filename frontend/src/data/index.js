export const ROOMS = [
  {
    id: 1,
    slug: "single-ensuite",
    type: "Single Ensuite",
    tagline: "Your own private sanctuary",
    price: 30000,
    priceLabel: "KSh 30,000 / month",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=85",
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=1200&q=85",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=85",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=85",
    ],
    available: true,
    occupancy: 1,
    size: "18 m²",
    badge: "Most Popular",
    badgeColor: "bg-sage-600",
    description:
      "A fully furnished private room with a dedicated en-suite bathroom. Perfect for students who value privacy and a quiet study environment. All utilities included.",
    amenities: [
      "En-suite bathroom",
      "Study desk & chair",
      "Wardrobe & storage",
      "Free high-speed WiFi",
      "Smart TV",
      "Air conditioning",
      "Daily housekeeping",
    ],
  },
  {
    id: 2,
    slug: "shared-single",
    type: "Shared Single",
    tagline: "Bond with a fellow student",
    price: 6500,
    priceLabel: "KSh 6,500 / month",
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?w=1200&q=85",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=85",
      "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=1200&q=85",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=85",
    ],
    available: true,
    occupancy: 2,
    size: "22 m²",
    badge: "Best Value",
    badgeColor: "bg-amber-600",
    description:
      "A spacious twin room shared between two students. Each occupant has dedicated study space, personal wardrobe, and separate bed. Shared bathroom on the same floor.",
    amenities: [
      "Study desks",
      "Personal wardrobes",
      "Shared floor bathroom",
      "Free high-speed WiFi",
      "Common area access",
    ],
  },
  {
    id: 3,
    slug: "bedsitter",
    type: "Bedsitter Studio",
    tagline: "Live & relax — all in one",
    price: 30000,
    priceLabel: "KSh 30,000 / month",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=85",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1200&q=85",
      "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=1200&q=85",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=85",
    ],
    available: false,
    occupancy: 1,
    size: "32 m²",
    badge: "Premium",
    badgeColor: "bg-charcoal",
    description:
      "A self-contained studio apartment combining sleeping, living, and kitchenette spaces. Ideal for postgraduate students or those who prefer complete independence.",
    amenities: [
      "Private kitchenette",
      "En-suite bathroom",
      "Full-size wardrobe",
      "Free high-speed WiFi",
    ],
  },
];

export const FEATURES = [
  {
    icon: "🔒",
    title: "24/7 Security",
    desc: "Electric fence and trained security personnel around the clock.",
  },
  {
    icon: "📶",
    title: "Free High-Speed WiFi",
    desc: "No throttling, no data caps. Stay connected always.",
  },
  {
    icon: "🛋️",
    title: "Fully Furnished",
    desc: "Move in with just your bags. Every room comes fully furnished and equipped.",
  },
  {
    icon: "📚",
    title: "Dedicated Study Areas",
    desc: "Quiet study areas with chairs and good lighting.",
  },
  {
    icon: "🍳",
    title: "Communal Kitchen",
    desc: "Fully equipped shared kitchen with appliances and storage space.",
  },
  {
    icon: "🌿",
    title: "Serene Environment",
    desc: "Landscaped outdoor courtyard — a calm space to unwind after long study sessions.",
  },
];

export const TESTIMONIALS = [
  {
    name: "David K",
    course: "BSc. Computer Science",
    avatar: "DK",
    color: "bg-sage-600",
    text: "Living at Consolata has genuinely improved my academics. The WiFi is blazing fast, the study room is quiet, and security gives me real peace of mind. Worth every shilling.",
    rating: 5,
  },
  {
    name: "Fatuma H",
    course: "LLB — CUEA",
    avatar: "FH",
    color: "bg-rose-600",
    text: "The bedsitter gave me the independence I needed during my final year. I could cook my own meals, study late, and actually feel at home. Highly recommend!",
    rating: 5,
  },
  {
    name: "Kevin Mwangi",
    course: "BEng — JKUAT",
    avatar: "KM",
    color: "bg-sky-600",
    text: "Great value for money on the shared rooms. My roommate and I became close friends. Management is professional and maintenance requests are handled quickly.",
    rating: 4,
  },
];

export const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Rooms", path: "/rooms" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];