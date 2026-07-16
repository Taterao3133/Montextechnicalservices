export const serviceGroups = [
  {
    title: "Air Conditioning",
    icon: "ac",
    items: [
      { title: "AC Installation", slug: "ac-installation" },
      { title: "AC Repair", slug: "ac-repair" },
      { title: "AC Maintenance", slug: "ac-maintenance" }
    ]
  },
  {
    title: "Electrical",
    icon: "electric",
    items: [
      { title: "Electrical Installation", slug: "electrical-installation" },
      { title: "Electrical Maintenance", slug: "electrical-maintenance" }
    ]
  },
  {
    title: "Plumbing",
    icon: "plumbing",
    items: [{ title: "Plumbing Services", slug: "plumbing-services" }]
  },
  {
    title: "Interior Works",
    icon: "ceiling",
    items: [
      { title: "False Ceiling & Gypsum", slug: "false-ceiling-gypsum" },
      { title: "Carpentry Works", slug: "carpentry-works" },
      { title: "Wood Flooring", slug: "wood-flooring" }
    ]
  },
  {
    title: "Maintenance",
    icon: "cleaning",
    items: [
      { title: "Building Cleaning", slug: "building-cleaning" },
      { title: "Annual Maintenance Contract (AMC)", slug: "annual-maintenance-contract-amc" },
      { title: "Emergency Technical Services", slug: "emergency-technical-services" }
    ]
  }
];

const imageByCategory = {
  "Air Conditioning": "quality-ac.jpg",
  Electrical: "quality-electrical.jpg",
  Plumbing: "quality-plumbing.jpg",
  "Interior Works": "project-ceiling-work.jpg",
  Maintenance: "project-house.jpg"
};

const descriptions = {
  "AC Installation": "precision air conditioning installation for villas, apartments, offices and commercial spaces in Dubai.",
  "AC Repair": "fast fault diagnosis and professional repair for cooling issues, leaks, noise, airflow problems and system breakdowns.",
  "AC Maintenance": "scheduled servicing that keeps AC systems efficient, clean and dependable through demanding UAE conditions.",
  "Electrical Installation": "safe electrical installation for lighting, wiring, distribution boards, fixtures and power points.",
  "Electrical Maintenance": "preventive and corrective electrical maintenance for residential and commercial properties.",
  "Plumbing Services": "reliable plumbing support for leaks, drainage, sanitary fixtures, water lines and pump related works.",
  "False Ceiling & Gypsum": "clean gypsum partition and false ceiling works with accurate finishing for modern interiors.",
  "Carpentry Works": "custom carpentry, repairs and fit-out support for practical, durable and polished interiors.",
  "Wood Flooring": "wood flooring installation and finishing solutions for homes, offices and hospitality spaces.",
  "Building Cleaning": "professional building cleaning for move-in, post-project, common areas and routine upkeep.",
  "Annual Maintenance Contract (AMC)": "structured annual maintenance plans that protect properties with regular inspections and priority response.",
  "Emergency Technical Services": "urgent technical support for AC, electrical, plumbing and maintenance issues when response time matters."
};

const premiumServiceContent = {
  "AC Installation": {
    overview:
      "Montex delivers professional AC installation for Dubai villas, apartments, offices, retail units and commercial facilities. We assess room size, airflow, outdoor unit placement, drainage, electrical load and finish requirements before installation, so the system cools efficiently and looks neatly integrated with the property.",
    highlights: ["Load and placement assessment", "Indoor and outdoor unit installation", "Drainage and copper line planning", "Clean testing and cooling handover"],
    features: ["Split, ducted and package AC installation support", "Neat piping, insulation and drain routing", "Electrical readiness coordination", "Cooling performance testing after installation"]
  },
  "AC Repair": {
    overview:
      "Our AC repair service is built for fast diagnosis and dependable restoration of cooling performance. Montex technicians inspect airflow, refrigerant symptoms, wiring, drainage, noise, thermostat response and unit condition to identify the fault and complete the right repair with minimal disruption.",
    highlights: ["Cooling fault diagnosis", "Water leakage and drainage repair", "Noise and airflow troubleshooting", "Emergency breakdown support"],
    features: ["Compressor, fan and electrical fault checks", "Thermostat and control inspection", "Drain line clearing", "Post-repair cooling verification"]
  },
  "AC Maintenance": {
    overview:
      "Montex AC maintenance helps keep systems clean, efficient and reliable through Dubai's demanding climate. We service indoor and outdoor units, inspect critical components, clean filters and coils where required, and help reduce avoidable breakdowns with scheduled preventive care.",
    highlights: ["Preventive AC servicing", "Filter and coil cleaning support", "Drainage inspection", "Performance and safety checks"],
    features: ["Seasonal maintenance programs", "Indoor and outdoor unit inspection", "Cooling efficiency improvement", "Maintenance reports and recommendations"]
  },
  "Electrical Installation": {
    overview:
      "Montex provides safe electrical installation for new fit-outs, renovations and property upgrades. From lighting points and sockets to distribution support and fixture installation, our work is planned around safety, load requirements, accessibility and a clean professional finish.",
    highlights: ["Lighting and power point installation", "DB and circuit support", "Fixture installation", "Villa, office and shop fit-out support"],
    features: ["Careful cable routing", "Load-aware installation planning", "Switches, sockets and lighting fixtures", "Final testing before handover"]
  },
  "Electrical Maintenance": {
    overview:
      "Our electrical maintenance service helps property owners prevent failures, improve safety and resolve day-to-day electrical issues. Montex checks fittings, circuits, loose connections, tripping concerns, lighting faults and power reliability with a practical repair-first approach.",
    highlights: ["Fault finding and repair", "Lighting maintenance", "Tripping and power issue support", "Preventive inspections"],
    features: ["Residential and commercial electrical care", "Emergency issue response", "Safety-focused troubleshooting", "Clear technical recommendations"]
  },
  "Plumbing Services": {
    overview:
      "Montex plumbing services cover leak repairs, sanitary installation, drainage problems, fixture replacement and water line support. We focus on clean work, accurate fault detection and reliable repairs that protect walls, floors, fixtures and daily property use.",
    highlights: ["Leak detection and repair", "Sanitary fixture installation", "Drainage and blockage support", "Water line maintenance"],
    features: ["Kitchen and bathroom plumbing", "Pump and pressure issue checks", "Clean repair methods", "Testing after completion"]
  },
  "False Ceiling & Gypsum": {
    overview:
      "Montex creates false ceiling and gypsum solutions for elegant, functional interiors. We support ceiling layouts, light coves, partitions and finishing details with careful measurement, framing, board fixing and surface preparation for a refined final look.",
    highlights: ["False ceiling installation", "Gypsum partitions", "Light cove and access panel support", "Smooth finishing preparation"],
    features: ["Modern ceiling designs", "Clean framing and board fixing", "Lighting coordination", "Residential and commercial interiors"]
  },
  "Carpentry Works": {
    overview:
      "Our carpentry works support practical and premium interior needs, from repairs and adjustments to custom woodwork support. Montex focuses on durable fitting, clean alignment, usable storage and finishes that suit villas, apartments, offices and retail spaces.",
    highlights: ["Door and cabinet repair", "Custom woodwork support", "Shelving and fit-out assistance", "Hardware replacement"],
    features: ["Neat measurements and fitting", "Repair and upgrade options", "Interior finishing support", "Residential and commercial carpentry"]
  },
  "Wood Flooring": {
    overview:
      "Montex wood flooring services help create warm, durable and professional interiors. We support installation, replacement and finishing coordination with attention to surface preparation, alignment, edging and the clean details that make flooring feel premium.",
    highlights: ["Wood flooring installation", "Skirting and edge finishing", "Surface preparation", "Repair and replacement support"],
    features: ["Villa, office and hospitality flooring", "Clean layout planning", "Durable finish guidance", "Careful handover inspection"]
  },
  "Building Cleaning": {
    overview:
      "Montex building cleaning keeps properties presentable, hygienic and ready for daily use. We support residential, commercial, post-maintenance and move-in cleaning needs with organized teams, suitable materials and attention to visible details.",
    highlights: ["General building cleaning", "Post-work cleaning", "Move-in and move-out support", "Common area cleaning"],
    features: ["Scheduled cleaning support", "Professional workforce", "Interior and exterior touchpoints", "Clean handover for occupied spaces"]
  },
  "Annual Maintenance Contract (AMC)": {
    overview:
      "Montex AMC plans give property owners predictable maintenance support across AC, electrical, plumbing and general technical needs. The service is designed for regular inspections, faster response, preventive care and better control over maintenance costs throughout the year.",
    highlights: ["Scheduled preventive visits", "Priority response", "Multi-service property care", "Maintenance reporting"],
    features: ["Custom AMC scope for each property", "AC, electrical and plumbing coverage", "Residential and commercial plans", "Reduced downtime through preventive checks"]
  },
  "Emergency Technical Services": {
    overview:
      "When urgent technical issues interrupt comfort or operations, Montex provides responsive emergency support across key property systems. Our team helps stabilize AC, electrical, plumbing and maintenance problems quickly, then recommends the right permanent solution.",
    highlights: ["Urgent AC support", "Electrical fault response", "Plumbing emergency assistance", "Rapid site coordination"],
    features: ["Fast assessment", "Practical temporary and permanent fixes", "Clear communication during urgent work", "Support for homes, offices and shops"]
  }
};

export const services = serviceGroups.flatMap((group) =>
  group.items.map((item, index) => ({
    ...item,
    group: group.title,
    icon: group.icon,
    image: imageByCategory[group.title],
    excerpt: descriptions[item.title],
    overview:
      premiumServiceContent[item.title]?.overview ??
      `Montex Technical Services L.L.C provides ${descriptions[item.title]} Our team plans each job carefully, uses suitable materials and follows Dubai property standards from inspection to handover.`,
    highlights: premiumServiceContent[item.title]?.highlights ?? [],
    whyChoose: [
      "Dubai based licensed technical service team",
      "Clear inspection, scope and execution process",
      "Experienced technicians for residential and commercial sites",
      "Neat workmanship with dependable after-service support"
    ],
    benefits: [
      "Improved safety, reliability and long-term performance",
      "Reduced downtime and fewer unexpected repair costs",
      "Professional finish that supports property value",
      "Responsive communication from enquiry to completion"
    ],
    process: ["Site visit", "Requirement assessment", "Quotation", "Technical execution", "Quality check", "Handover"],
    features: premiumServiceContent[item.title]?.features ?? [
      `${item.title} for homes, offices and commercial facilities`,
      "Material guidance and practical technical recommendations",
      "Skilled workforce with clean site discipline",
      "Flexible scheduling for occupied properties"
    ],
    industries: ["Residential villas", "Apartments", "Offices", "Retail units", "Hospitality spaces", "Commercial buildings"],
    faqs: [
      {
        q: `Do you provide ${item.title.toLowerCase()} for both homes and businesses?`,
        a: "Yes. Montex handles residential and commercial requirements across Dubai with site-specific planning."
      },
      {
        q: "Can I request a site inspection before approval?",
        a: "Yes. Our team can review the requirement, explain the scope and share a suitable quotation."
      },
      {
        q: "Do you provide urgent scheduling?",
        a: "Subject to team availability, we prioritize urgent technical issues and time-sensitive maintenance needs."
      }
    ],
    related: serviceGroups
      .flatMap((relatedGroup) => relatedGroup.items)
      .filter((related) => related.slug !== item.slug)
      .slice(index, index + 3)
  }))
);

export function getService(slug) {
  return services.find((service) => service.slug === slug);
}

export const projects = [
  {
    slug: "villa-technical-maintenance",
    title: "Villa - Technical Maintenance",
    category: "Maintenance",
    location: "Dubai, UAE",
    image: "project-house.jpg",
    date: "May 2026",
    description: "Complete technical maintenance support for a private villa, covering inspection, minor repairs and service coordination.",
    challenges: "The client required multiple maintenance tasks to be completed without disrupting daily family routines.",
    solution: "Montex scheduled phased work, assigned skilled technicians and completed checks across AC, plumbing and electrical touchpoints."
  },
  {
    slug: "villa-air-conditioning",
    title: "Villa - Air Conditioning",
    category: "Air Conditioning",
    location: "Dubai, UAE",
    image: "quality-ac.jpg",
    date: "April 2026",
    description: "Air conditioning service and cooling performance improvement for a villa interior.",
    challenges: "Uneven cooling and reduced airflow affected comfort in key living areas.",
    solution: "The team inspected the system, serviced indoor and outdoor units and restored balanced airflow."
  },
  {
    slug: "commercial-electrical-works",
    title: "Commercial - Electrical Works",
    category: "Electrical",
    location: "Bur Dubai, UAE",
    image: "quality-electrical.jpg",
    date: "March 2026",
    description: "Electrical maintenance and fixture support for a commercial space.",
    challenges: "The site needed safe completion around business operating hours.",
    solution: "Montex planned work windows, checked circuits and completed fixture maintenance with minimal interruption."
  },
  {
    slug: "residential-plumbing-works",
    title: "Residential - Plumbing Works",
    category: "Plumbing",
    location: "Dubai, UAE",
    image: "quality-plumbing.jpg",
    date: "February 2026",
    description: "Plumbing repair and sanitary support for a residential unit.",
    challenges: "The issue required quick repair while protecting existing finishes.",
    solution: "Technicians isolated the fault, completed clean repair work and tested the system before handover."
  },
  {
    slug: "villa-painting-project",
    title: "Villa - Painting Project",
    category: "Painting",
    location: "Dubai, UAE",
    image: "project-paint-work.jpg",
    date: "January 2026",
    description: "Interior and exterior painting support for a villa refresh.",
    challenges: "The project required consistent finishing across different surfaces.",
    solution: "Montex prepared surfaces, selected suitable coating methods and delivered a clean, uniform finish."
  }
];

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export const galleryItems = [
  ...projects.map((project) => ({
    title: project.title,
    category: project.category,
    image: project.image
  })),
  { title: "Gypsum Ceiling Work", category: "Gypsum", image: "project-ceiling-work.jpg" },
  { title: "Building Cleaning Support", category: "Cleaning", image: "project-house.jpg" },
  { title: "AMC Property Visit", category: "AMC", image: "quality-electrical.jpg" }
];

export const company = {
  name: "Montex Technical Services L.L.C",
  phone: "+97143595835",
  whatsapp: "+971524269939",
  email: "montextechnicals9@gmail.com",
  address: "101, BMI building, near Sharaf DG Metro Station Bur Dubai.",
  hours: "Mon - Sat 8:00 AM - 6:00 PM"
};
