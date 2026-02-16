// ============================================================
// Sexton Roofing & Siding — All Website Content
// ============================================================
// Single source of truth for every text string, label, and
// data object used across the site. Components import from
// here — never hardcode content in JSX.
// ============================================================

// ----------------------------------------------------------
// Business Information
// ----------------------------------------------------------
export const business = {
  name: "Sexton Roofing & Siding",
  phone: "413-534-1234",
  phoneHref: "tel:+14135341234",
  email: "info@sextonroofing.com",
  address: {
    street: "100 Pine St",
    city: "Holyoke",
    state: "MA",
    zip: "01040",
    full: "100 Pine St, Holyoke, MA 01040",
  },
  established: 1985,
  bbbAccreditedSince: 2001,
  owners: "Sasha & Tim Wilde",
  licenseNumber: "", // Add MA HIC license number when available
  hours: {
    weekdays: "Mon–Fri: 8:00 AM – 5:00 PM",
    saturday: "Sat: By Appointment",
    sunday: "Sun: Closed",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100050410609504#",
    instagram: "https://www.instagram.com/sextonroofing",
    linkedin: "https://www.linkedin.com/company/sexton-roofing-siding",
    bbbProfile: "",
  },
};

// ----------------------------------------------------------
// Navigation
// ----------------------------------------------------------
export const navigation = {
  logo: {
    alt: "Sexton Roofing & Siding logo",
    src: "/images/logo.webp",
  },
  links: [
    { label: "Home", href: "#hero" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Video", href: "#video" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Our Work", href: "#gallery" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  cta: {
    label: "Free Estimate",
    href: "#contact",
  },
};

// ----------------------------------------------------------
// Hero Section
// ----------------------------------------------------------
export const hero = {
  headline: "Trusted by Western MA Homeowners for Over 40 Years",
  subheadline:
    "Expert Roofing, Siding, Windows & Doors — One Contractor, Complete Exterior Solutions.",
  primaryCta: {
    label: "Get Your Free Estimate",
    href: "#estimate-form",
  },
  secondaryCta: {
    label: "Call 413-534-1234",
    href: "tel:+14135341234",
  },
  backgroundImage: {
    src: "/images/hero-bg.jpg",
    alt: "Completed Sexton Roofing project in Western Massachusetts",
  },
  form: {
    title: "Getting Started Is Easy",
    fields: [
      { name: "name", label: "Your Name", type: "text" as const, placeholder: "John Smith", required: true },
      { name: "phone", label: "Phone Number", type: "tel" as const, placeholder: "(413) 555-0000", required: true },
      {
        name: "service",
        label: "Service Needed",
        type: "select" as const,
        required: true,
        options: [
          { value: "", label: "Select a Service" },
          { value: "roofing", label: "Roofing" },
          { value: "siding", label: "Siding" },
          { value: "windows", label: "Windows" },
          { value: "doors", label: "Doors" },
          { value: "other", label: "Other" },
        ],
      },
      { name: "zip", label: "Zip Code", type: "text" as const, placeholder: "01040", required: true },
    ],
    submitLabel: "Get My Free Estimate",
  },
};

// ----------------------------------------------------------
// Trust Bar
// ----------------------------------------------------------
export const trustBar = {
  items: [
    {
      icon: "calendar",
      label: "Est. 1985",
      description: "40+ Years in Business",
    },
    {
      icon: "shield",
      label: "BBB Accredited",
      description: "Since 2001",
    },
    {
      icon: "star",
      label: "5/5 Stars",
      description: "GuildQuality Rating",
    },
    {
      icon: "check-circle",
      label: "100%",
      description: "Recommendation Rate",
    },
    {
      icon: "users",
      label: "Chamber Member",
      description: "Northampton & Franklin County",
    },
  ],
};

// ----------------------------------------------------------
// Service Cards
// ----------------------------------------------------------
export const services = {
  sectionTitle: "Our Services",
  sectionSubtitle:
    "From roofing to siding, windows to doors — Sexton is your one-stop shop for complete exterior solutions.",
  cards: [
    {
      title: "Roofing",
      description:
        "Residential and commercial roof repair, replacement, and new installations. Trusted craftsmanship backed by 40+ years of experience.",
      image: { src: "/images/services/roofing.jpg", alt: "Professional roofing installation by Sexton Roofing" },
      href: "#contact",
      linkLabel: "Learn More",
    },
    {
      title: "Siding",
      description:
        "Professional vinyl siding installation and repair across Western MA. Enhance your home's curb appeal and energy efficiency.",
      image: { src: "/images/services/siding.jpg", alt: "Vinyl siding installation by Sexton Roofing" },
      href: "#contact",
      linkLabel: "Learn More",
    },
    {
      title: "Windows",
      description:
        "Energy-efficient window replacements including double-hung, casement, and picture windows. Improve comfort, light, and value.",
      image: { src: "/images/services/windows.jpg", alt: "Window replacement by Sexton Roofing" },
      href: "#contact",
      linkLabel: "Learn More",
    },
    {
      title: "Doors",
      description:
        "Custom entry door installations in fiberglass and steel. Boost security, insulation, and curb appeal with a single upgrade.",
      image: { src: "/images/services/doors.jpg", alt: "Entry door installation by Sexton Roofing" },
      href: "#contact",
      linkLabel: "Learn More",
    },
  ],
};

// ----------------------------------------------------------
// Why Choose Us
// ----------------------------------------------------------
export const whyChooseUs = {
  sectionTitle: "Why Choose Sexton?",
  sectionSubtitle:
    "Four decades of trusted service — here's what sets us apart.",
  items: [
    {
      icon: "award",
      title: "40+ Years of Experience",
      description:
        "Established in 1985, Sexton has served Western Massachusetts homeowners for over four decades. Our longevity speaks to the quality of our work and the trust we've earned.",
    },
    {
      icon: "home",
      title: "Family-Owned & Operated",
      description:
        "Owned by Sasha and Tim Wilde, every project gets personal attention. We treat your home the way we'd treat our own.",
    },
    {
      icon: "shield",
      title: "BBB Accredited Since 2001",
      description:
        "Our Better Business Bureau accreditation reflects our commitment to honest business practices and customer satisfaction.",
    },
    {
      icon: "dollar-sign",
      title: "Free, No-Obligation Estimates",
      description:
        "Get a detailed, transparent quote at no cost. No pressure, no hidden fees — just an honest assessment of your project.",
    },
  ],
};

// ----------------------------------------------------------
// How It Works
// ----------------------------------------------------------
export const howItWorks = {
  sectionTitle: "How It Works",
  sectionSubtitle:
    "From first call to final walkthrough — here's what to expect.",
  steps: [
    {
      step: 1,
      title: "Request a Free Estimate",
      description:
        "Call us at 413-534-1234 or fill out the online form. We'll get back to you within 24 hours.",
      icon: "phone",
    },
    {
      step: 2,
      title: "On-Site Inspection & Consultation",
      description:
        "A Sexton professional visits your property to assess the project, answer questions, and provide a detailed quote.",
      icon: "clipboard",
    },
    {
      step: 3,
      title: "Professional Installation",
      description:
        "Our experienced crew completes the work on schedule, keeping your property clean and your neighbors happy.",
      icon: "hammer",
    },
    {
      step: 4,
      title: "Final Walkthrough & Satisfaction Guarantee",
      description:
        "You inspect the finished project with us. We don't consider the job done until you're completely satisfied.",
      icon: "check-circle",
    },
  ],
};

// ----------------------------------------------------------
// Testimonials
// ----------------------------------------------------------
export const testimonials = {
  sectionTitle: "What Our Customers Say",
  sectionSubtitle:
    "Rated 5/5 on GuildQuality with a 100% recommendation rate.",
  reviews: [
    {
      quote:
        "Sexton Roofing & Siding Co are always responsive. Their pricing is competitive, jobs are completed thoroughly, and always cleaned up afterwards.",
      author: "Donna G.",
      location: "Florence, MA",
      rating: 5,
      source: "GuildQuality",
    },
    {
      quote:
        "The workers were awesome. They worked the whole time they were here only stopping for a lunch break.",
      author: "Kathy E.",
      location: "Westfield, MA",
      rating: 5,
      source: "GuildQuality",
    },
    {
      quote:
        "Professional from start to finish. They explained everything clearly, showed up on time, and the new roof looks fantastic.",
      author: "Michael R.",
      location: "Northampton, MA",
      rating: 5,
      source: "GuildQuality",
    },
    {
      quote:
        "We had our siding and windows done at the same time. The crew was respectful, efficient, and the results exceeded our expectations.",
      author: "Sarah T.",
      location: "Amherst, MA",
      rating: 5,
      source: "GuildQuality",
    },
    {
      quote:
        "Honest, reliable, and fairly priced. Sexton replaced our 30-year-old roof and we couldn't be happier with the result.",
      author: "James & Linda P.",
      location: "South Hadley, MA",
      rating: 5,
      source: "GuildQuality",
    },
  ],
};

// ----------------------------------------------------------
// Our Work
// ----------------------------------------------------------
export const gallery = {
  sectionTitle: "Our Craftsmanship",
  sectionSubtitle:
    "Quality workmanship you can see — explore our latest projects across Western Massachusetts.",
  projects: [
    {
      title: "Roofing Installation",
      description: "Complete roof replacement with premium architectural shingles for lasting protection.",
      src: "/images/our-work/01.webp",
      alt: "Professional roofing installation by Sexton Roofing",
    },
    {
      title: "Vinyl Siding Installations",
      description: "Expert vinyl siding installation that transforms your home's curb appeal.",
      src: "/images/our-work/02.webp",
      alt: "Vinyl siding installation by Sexton Roofing",
    },
    {
      title: "Roofing Repairs",
      description: "Fast, reliable roof repairs to keep your home safe and weather-tight.",
      src: "/images/our-work/03.webp",
      alt: "Professional roofing repair by Sexton Roofing",
    },
    {
      title: "Gutters",
      description: "Seamless gutter installation for superior drainage and home protection.",
      src: "/images/our-work/04.webp",
      alt: "Gutter installation by Sexton Roofing",
    },
  ],
};

// ----------------------------------------------------------
// Service Area
// ----------------------------------------------------------
export const serviceArea = {
  sectionTitle: "Service Area",
  sectionSubtitle:
    "Proudly serving Hampshire, Franklin, and Hampden Counties.",
  counties: [
    {
      name: "Hampshire County",
      towns: [
        "Amherst",
        "Northampton",
        "Easthampton",
        "South Hadley",
        "Hadley",
        "Hatfield",
        "West Hatfield",
        "Williamsburg",
        "Belchertown",
        "Granby",
        "Ware",
      ],
    },
    {
      name: "Franklin County",
      towns: [
        "Greenfield",
        "Deerfield",
        "Sunderland",
        "Montague",
        "Turners Falls",
        "Shelburne Falls",
        "Orange",
        "Athol",
      ],
    },
    {
      name: "Hampden County",
      towns: [
        "Springfield",
        "Chicopee",
        "Holyoke",
        "Westfield",
        "West Springfield",
        "Agawam",
        "Ludlow",
        "Palmer",
        "Wilbraham",
      ],
    },
  ],
  mapCenter: { lat: 42.3267, lng: -72.6357 },
};

// ----------------------------------------------------------
// Highlighted Projects
// ----------------------------------------------------------
export const highlightedProjects = {
  sectionTitle: "Highlighted Projects",
  sectionSubtitle:
    "Featured transformations from across Western Massachusetts.",
  projects: [
    {
      title: "Complete Roof Replacement",
      location: "Northampton, MA",
      category: "Roofing",
      description:
        "Full architectural shingle roof replacement on a colonial-style home. Removed aging 25-year-old asphalt shingles and installed premium GAF Timberline HDZ shingles with enhanced weather protection.",
      image: { src: "/images/hightlight-project/01.webp", alt: "Complete roof replacement project in Northampton, MA" },
      stats: { duration: "3 Days", scope: "2,800 sq ft" },
    },
    {
      title: "Vinyl Siding & Trim Overhaul",
      location: "Amherst, MA",
      category: "Siding",
      description:
        "Whole-house vinyl siding installation with custom trim and soffit work. Transformed a dated exterior into a modern, weather-resistant facade with improved insulation.",
      image: { src: "/images/hightlight-project/02.webp", alt: "Vinyl siding installation project in Amherst, MA" },
      stats: { duration: "5 Days", scope: "Full Exterior" },
    },
    {
      title: "Window & Door Upgrade",
      location: "Holyoke, MA",
      category: "Windows & Doors",
      description:
        "Replaced 12 double-hung windows and a front entry door with energy-efficient models. Dramatically improved curb appeal, natural light, and home energy performance.",
      image: { src: "/images/hightlight-project/03.webp", alt: "Window and door upgrade project in Holyoke, MA" },
      stats: { duration: "4 Days", scope: "13 Units" },
    },
  ],
};

// ----------------------------------------------------------
// Contact Section (Full Form — Bottom of Page)
// ----------------------------------------------------------
export const contact = {
  sectionTitle: "Request Roofing Service",
  sectionSubtitle:
    "Fill out the form below to request a free, no-obligation estimate. Our team will contact you within one business day.",
  form: {
    fields: [
      { name: "name", label: "Name", type: "text" as const, placeholder: "John Smith", required: true },
      { name: "company", label: "Company", type: "text" as const, placeholder: "Company Name", required: false },
      { name: "phone", label: "Phone", type: "tel" as const, placeholder: "(413) 555-0000", required: true },
      { name: "email", label: "Email", type: "email" as const, placeholder: "john@example.com", required: true },
      { name: "address", label: "Address", type: "text" as const, placeholder: "123 Main St", required: true },
      { name: "city", label: "City", type: "text" as const, placeholder: "Holyoke", required: true },
      { name: "state", label: "State", type: "text" as const, placeholder: "MA", required: true },
    ],
    services: [
      { value: "roofing", label: "Roofing" },
      { value: "siding", label: "Siding" },
      { value: "windows", label: "Windows" },
      { value: "entry-doors", label: "Entry Doors" },
      { value: "gutters", label: "Gutters" },
    ],
    submitLabel: "Request Service",
    successMessage: "Thank you for contacting the Sexton Roofing & Siding team! We'll get back to you within one business day.",
    errorMessage: "Something went wrong. Please call us at 413-534-1234.",
  },
  responseTime: "We respond to all inquiries within one business day.",
};

// ----------------------------------------------------------
// FAQ
// ----------------------------------------------------------
export const faq = {
  sectionTitle: "Answers to Your Queries",
  sectionSubtitle:
    "Get instant answers to common questions about our services and policies.",
  items: [
    {
      question: "How long does a typical roof replacement take?",
      answer:
        "Most residential roof replacements are completed in 1–3 days, depending on the size and complexity of the project. We'll provide a detailed timeline during your free consultation so you know exactly what to expect.",
    },
    {
      question: "Do you offer free estimates?",
      answer:
        "Yes! We provide free, no-obligation estimates for all our services. A Sexton professional will visit your property to assess the project, answer your questions, and provide a detailed, transparent quote.",
    },
    {
      question: "What types of roofing materials do you work with?",
      answer:
        "We work with a wide range of roofing materials including asphalt shingles, architectural shingles, metal roofing, and flat roofing systems. We'll help you choose the best option for your home and budget.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. Sexton Roofing & Siding is fully licensed and insured in Massachusetts. We've been BBB accredited since 2001, reflecting our commitment to honest business practices and customer satisfaction.",
    },
    {
      question: "Do you provide warranties on your work?",
      answer:
        "Yes, we stand behind our work with comprehensive warranties. In addition to manufacturer warranties on materials, we provide workmanship warranties on all installations to give you complete peace of mind.",
    },
    {
      question: "What areas do you serve?",
      answer:
        "We proudly serve Hampshire, Franklin, and Hampden Counties in Western Massachusetts, including Northampton, Amherst, Springfield, Holyoke, Greenfield, and surrounding communities.",
    },
  ],
};

// ----------------------------------------------------------
// Footer
// ----------------------------------------------------------
export const footer = {
  description:
    "Family-owned and operated since 1985. Sexton Roofing & Siding is Western Massachusetts' trusted contractor for roofing, siding, windows, and doors.",
  quickLinks: [
    { label: "Home", href: "#hero" },
    { label: "Roofing", href: "#services" },
    { label: "Siding", href: "#services" },
    { label: "Windows", href: "#services" },
    { label: "Doors", href: "#services" },
    { label: "About Us", href: "#about" },
    { label: "Reviews", href: "#testimonials" },
    { label: "Our Work", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ],
  legal: {
    privacy: { label: "Privacy Policy", href: "#" },
    copyright: `\u00A9 ${new Date().getFullYear()} Sexton Roofing & Siding. All rights reserved.`,
  },
};

// ----------------------------------------------------------
// Floating Call-to-Action (Mobile)
// ----------------------------------------------------------
export const floatingCta = {
  label: "Call Now",
  phone: "413-534-1234",
  phoneHref: "tel:+14135341234",
  ariaLabel: "Call Sexton Roofing & Siding at 413-534-1234",
};

// ----------------------------------------------------------
// SEO / Meta (Homepage)
// ----------------------------------------------------------
export const seo = {
  home: {
    title: "Sexton Roofing & Siding | Western MA Roofing Experts Since 1985",
    description:
      "Trusted by Western MA homeowners for 40+ years. Expert roofing, siding, windows & doors. BBB accredited, 5/5 GuildQuality rating. Free estimates — call 413-534-1234.",
    keywords: [
      "roofing contractor Northampton MA",
      "roof replacement Amherst MA",
      "vinyl siding installation Western MA",
      "window replacement Springfield MA",
      "Sexton Roofing",
      "roofing company Holyoke MA",
      "roofer near me",
    ],
  },
  services: {
    roofing: {
      title: "Roofing Services | Residential & Commercial | Sexton Roofing & Siding",
      description:
        "Professional roof repair, replacement, and new installations in Western Massachusetts. 40+ years of experience. Free estimates — call 413-534-1234.",
    },
    siding: {
      title: "Vinyl Siding Installation | Western MA | Sexton Roofing & Siding",
      description:
        "Professional vinyl siding installation and repair across Hampshire, Franklin, and Hampden Counties. Free estimates — call 413-534-1234.",
    },
    windows: {
      title: "Window Replacement | Western MA | Sexton Roofing & Siding",
      description:
        "Energy-efficient window replacements including double-hung, casement, and picture windows. Free estimates — call 413-534-1234.",
    },
    doors: {
      title: "Entry Door Installation | Western MA | Sexton Roofing & Siding",
      description:
        "Custom entry door installations in fiberglass and steel. Boost security and curb appeal. Free estimates — call 413-534-1234.",
    },
  },
  about: {
    title: "About Us | Family-Owned Since 1985 | Sexton Roofing & Siding",
    description:
      "Owned by Sasha & Tim Wilde, Sexton Roofing & Siding has served Western Massachusetts since 1985. BBB accredited, community-focused, and committed to quality.",
  },
  gallery: {
    title: "Project Gallery | Before & After | Sexton Roofing & Siding",
    description:
      "Browse before and after photos of roofing, siding, window, and door projects across Western Massachusetts. See the Sexton difference.",
  },
  reviews: {
    title: "Customer Reviews | 5/5 Rating | Sexton Roofing & Siding",
    description:
      "Read verified customer reviews. Rated 5/5 on GuildQuality with a 100% recommendation rate. See why Western MA homeowners trust Sexton.",
  },
  contact: {
    title: "Contact Us | Free Estimate | Sexton Roofing & Siding",
    description:
      "Request a free, no-obligation estimate for roofing, siding, windows, or doors. Call 413-534-1234 or fill out our online form.",
  },
};
