import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaApple,
  FaGooglePlay,
} from "react-icons/fa";
import { FiHome, FiSearch } from "react-icons/fi";

export const site = {
  name: "Nuzul",
  tagline: "Book your place in the best hotels",
  description:
    "Find your home away from home — unique stays and local experiences, wherever you go.",
  email: "ahmedidrisx@gmail.com",
  phone: "+201043104194",
  whatsapp: "https://wa.me/+201043104194",
};

// Navbar Links
export const navLinks = [
  {
    title: "Explore",
    href: "/#explore",
  },
  {
    title: "Hotels",
    href: "/hotels",
  },
  {
    title: "Stories",
    href: "/#stories",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
  {
    title: "Support",
    href: "/#support",
  },
];

// Footer Links
export const explore = [
  { label: "Explore", href: "/" },
  { label: "Stories", href: "/" },
  { label: "FAQ", href: "/" },
  { label: "Blog", href: "/" },
];

export const getTheApp = [
  { label: "App Store", href: "/" },
  { label: "Google Play", href: "/" },
];
export const company = [
  { label: "About Us", href: "/" },
  { label: "Privacy Policy", href: "/" },
  { label: "Terms & Conditions", href: "/" },
  { label: "Support", href: "/" },
];

// Social Media Links
export const socialLinks = [
  { label: "facebook", href: "https://facebook.com", Icon: FaFacebookF },
  {
    label: "linkedin",
    href: "https://linkedin.com",
    Icon: FaLinkedinIn,
  },
  {
    label: "instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
];

export const facilitiesOptions = [
  "Free WiFi",
  "Restaurant",
  "Gym",
  "Room Service",
  "Free Parking",
  "Swimming Pool",
  "24-hour Front Desk",
  "Airport Shuttle",
];

export const amenitiesOptions = [
  "Free WiFi",
  "Free Breakfast",
  "Coffee Maker",
  "Room Service",
  "Mountain View",
  "Pool Access",
];

export const roomTypeOptions = [
  "Single Bed",
  "Double Bed",
  "Twin Bed",
  "Studio Apartment",
  "Luxury Room",
  "Family Suite",
];

export const cities: string[] = [
  "Khartoum",
  "Cairo",
  "Dubai",
  "Aswan",
  "Luxor",
  "Alexandria",
  "Hurghada",
];

// Mood section

export type Tab = "guest" | "host";

export const experiences = {
  guest: {
    label: "I'm a Guest",
    title: "Book your next stay in minutes.",
    description:
      "Search unique homes, compare honest listings, and pay securely — all from one app.",
    icon: FiSearch,
    benefits: [
      "Verified hosts and protected payments",
      "Clear cancellation policies on every listing",
      "24/7 support, whenever you need it",
    ],
    steps: [
      {
        title: "Search",
        description:
          "Explore unique homes and experiences filtered by destination, dates and budget.",
      },
      {
        title: "Book",
        description:
          "Reserve instantly or send a request — pay securely, right in the app.",
      },
      {
        title: "Stay",
        description:
          "Arrive, settle in, and explore like a local — with support just a tap away.",
      },
    ],
  },
  host: {
    label: "I'm a Host",
    title: "Turn your space into your next opportunity.",
    description:
      "List your property, welcome guests, and manage every booking without leaving the app.",
    icon: FiHome,
    benefits: [
      "Reach a global network of travelers",
      "Manage listings and bookings in one place",
      "Secure, on-time payouts",
    ],
    steps: [
      {
        title: "List",
        description:
          "Add your property, set your price, and publish your listing in minutes.",
      },
      {
        title: "Manage",
        description:
          "Track bookings, message guests, and update availability in one place.",
      },
      {
        title: "Earn",
        description:
          "Get paid securely and on time — with support at every step.",
      },
    ],
  },
};

export const tabs: Tab[] = ["guest", "host"];

// testimonials stories
export const testimonials = [
  {
    quote:
      "I've met amazing hosts who go above and beyond to make my trips memorable. It doesn't feel like a booking app — it feels personal.",
    name: "Lilly",
    role: "Guest, Khartoum",
  },
  {
    quote:
      "Easy communication, real variety, and enough flexibility for my whole family to travel together. Nuzul just gets it.",
    name: "Jones",
    role: "Guest, Dubai",
  },
  {
    quote:
      "Listing my place took minutes, payouts are always on time, and support actually responds. Couldn't ask for more as a host.",
    name: "Ahmed",
    role: "Host, Cairo",
  },
];

// FAQ
export const questions = [
  {
    question: "What is Nuzul?",
    answer:
      "Nuzul is a platform that connects guests looking for accommodations with hosts offering their properties. Whether you need a cozy apartment for a weekend getaway or a spacious vacation home, Nuzul helps you find the perfect stay.",
  },
  {
    question: "How do I create a Nuzul account?",
    answer:
      "Creating an account is quick and simple: tap Sign Up, provide your basic details, and verify your information with an OTP message. Once verified, you will have full access to Nuzul's features.",
  },
  {
    question: "What types of accommodations are available on Nuzul?",
    answer:
      "Nuzul hosts offer a variety of accommodations, from private rooms and apartments to entire homes. Each listing includes detailed information on amenities, location, and house rules.",
  },
  {
    question: "How do I book an accommodation?",
    answer:
      "Use the filters to find listings that match your needs, review the photos and description, then send a booking request or use Instant Book if available. Once confirmed, you will receive a booking record in your account.",
  },
  {
    question: "How does payment work, and which methods are accepted?",
    answer:
      "Payments are processed securely through a third-party provider. We typically accept major credit and debit cards, and all fees are shown clearly before you confirm your booking.",
  },
  {
    question: "Is my payment information safe?",
    answer:
      "Absolutely. Nuzul does not store your full payment details on our servers. We use an industry-leading, PCI-compliant payment processor to keep your transactions and information secure.",
  },
  {
    question: "Can I contact the host before booking?",
    answer:
      "Yes. Every listing includes a messaging feature so you can ask the host about the property, check-in process, or neighborhood details before confirming your booking.",
  },
  {
    question: "What is the cancellation policy?",
    answer:
      "Each host sets their own cancellation policy, shown clearly during booking. If you cancel, any refund or penalty depends on that policy.",
  },
  {
    question: "What if I need a refund or have an issue with my stay?",
    answer:
      "First reach out to the host to resolve the issue. If you still need help, contact Nuzul Customer Support and we will review the situation and guide you based on the host's policy and our platform guidelines.",
  },
  {
    question: "Can I become a host on Nuzul? How do I list my property?",
    answer:
      "Once you create an account, go to Nuzul Your Place, fill in your listing details, photos, pricing, availability, and house rules. Your listing will be reviewed and published once approved.",
  },
  {
    question: "Are guests and hosts verified?",
    answer:
      "We encourage everyone to complete ID verification, and verified profiles display a badge. Always review listing details, photos, and guest reviews before making a decision.",
  },
  {
    question: "What if a host cancels my booking?",
    answer:
      "You will receive a notification, and any refund due will be handled according to the host's cancellation policy or our platform guidelines. You can then look for an alternative stay on Nuzul.",
  },
  {
    question: "Are there additional fees besides the booking price?",
    answer:
      "Hosts may charge extra fees, such as cleaning fees, and Nuzul may apply a service fee. All costs are shown clearly before you finalize your booking.",
  },
  {
    question: "What is Nuzul doing to ensure safety and security during stays?",
    answer:
      "We take community safety seriously. Alongside verification steps, we encourage clear house rules and open communication, and recommend hosts follow local regulations and keep properties safe and clean.",
  },
];

// app
export const appStores = [
  {
    name: "App Store",
    caption: "Download on the",
    href: "https://apps.apple.com",
    icon: FaApple,
  },
  {
    name: "Google Play",
    caption: "GET IT ON",
    href: "https://play.google.com",
    icon: FaGooglePlay,
  },
];
