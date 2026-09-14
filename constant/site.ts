import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";

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
    href: "#explore",
  },
  {
    title: "Hotels",
    href: "/hotels",
  },
  {
    title: "Stories",
    href: "#stories",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
  {
    title: "Blog",
    href: "#blog",
  },
  {
    title: "Support",
    href: "#support",
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
