

// data/categories.ts
export interface Subcategory {
    name: string
    slug: string
    description: string
  }
  
  export interface Category {
    name: string
    slug: string
    description: string
    icon: string
    subcategories: Subcategory[]
  }
  
  export const counties = [
    "Antrim",
    "Armagh",
    "Carlow",
    "Cavan",
    "Clare",
    "Cork",
    "Donegal",
    "Down",
    "Dublin",
    "Fermanagh",
    "Galway",
    "Kerry",
    "Kildare",
    "Kilkenny",
    "Laois",
    "Leitrim",
    "Limerick",
    "Londonderry",
    "Longford",
    "Louth",
    "Mayo",
    "Meath",
    "Monaghan",
    "Offaly",
    "Roscommon",
    "Sligo",
    "Tipperary",
    "Tyrone",
    "Waterford",
    "Westmeath",
    "Wexford",
    "Wicklow"
  ] as const
  
  export const categories: Category[] = [
    {
      name: "Energy Assessment",
      slug: "energy-assessment",
      description: "Professional energy assessment and efficiency services",
      icon: "/icons/energy-assessment.svg",
      subcategories: [
        {
          name: "BER Assessors",
          slug: "ber-assessors",
          description: "Building Energy Rating assessment services"
        },
        {
          name: "Home Energy Advisors",
          slug: "home-energy-advisors",
          description: "Expert guidance on home energy efficiency"
        },
        {
          name: "Retrofit Coordinators",
          slug: "retrofit-coordinators",
          description: "Professional retrofit planning and coordination"
        },
        {
          name: "Technical Surveyors",
          slug: "technical-surveyors",
          description: "Detailed technical surveys and assessments"
        }
      ]
    },
    {
      name: "Solar",
      slug: "solar",
      description: "Solar energy solutions and installations",
      icon: "/icons/solar.svg",
      subcategories: [
        {
          name: "Solar PV Installation",
          slug: "solar-pv-installation",
          description: "Professional solar panel installation services"
        },
        {
          name: "Solar Battery Storage",
          slug: "solar-battery-storage",
          description: "Energy storage solutions for solar systems"
        },
        {
          name: "Solar Hot Water Systems",
          slug: "solar-hot-water-systems",
          description: "Solar water heating installation services"
        }
      ]
    },
    {
      name: "Heating",
      slug: "heating",
      description: "Modern heating solutions and installations",
      icon: "/icons/heating.svg",
      subcategories: [
        {
          name: "Heat Pump Installation",
          slug: "heat-pump-installation",
          description: "Professional heat pump installation services"
        },
        {
          name: "Combi Boiler Replacement",
          slug: "combi-boiler-replacement",
          description: "Expert boiler replacement services"
        },
        {
          name: "Underfloor Heating Systems",
          slug: "underfloor-heating-systems",
          description: "Underfloor heating installation and maintenance"
        }
      ]
    },
    {
      name: "Energy Efficiency",
      slug: "energy-efficiency",
      description: "Energy efficiency improvements and services",
      icon: "/icons/energy-efficiency.svg",
      subcategories: [
        {
          name: "BER Assessment Services",
          slug: "ber-assessment-services",
          description: "Professional BER assessment and certification"
        },
        {
          name: "Attic Insulation",
          slug: "attic-insulation",
          description: "Expert attic insulation services"
        },
        {
          name: "Cavity Wall Insulation",
          slug: "cavity-wall-insulation",
          description: "Professional wall insulation solutions"
        }
      ]
    },
    {
      name: "Smart Home",
      slug: "smart-home",
      description: "Smart home automation and technology",
      icon: "/icons/smart-home.svg",
      subcategories: [
        {
          name: "Home Automation Systems",
          slug: "home-automation-systems",
          description: "Complete home automation solutions"
        },
        {
          name: "Smart Heating Controls",
          slug: "smart-heating-controls",
          description: "Intelligent heating control systems"
        },
        {
          name: "Smart Meter Installation",
          slug: "smart-meter-installation",
          description: "Professional smart meter fitting"
        }
      ]
    },
    {
      name: "Electric",
      slug: "electric",
      description: "Electrical installations and services",
      icon: "/icons/electric.svg",
      subcategories: [
        {
          name: "EV Home Charger Installation",
          slug: "ev-home-charger-installation",
          description: "Electric vehicle charging solutions"
        },
        {
          name: "Fuse Board Upgrades",
          slug: "fuse-board-upgrades",
          description: "Professional electrical panel upgrades"
        },
        {
          name: "Emergency Backup Systems",
          slug: "emergency-backup-systems",
          description: "Backup power system installation"
        }
      ]
    },
    {
      name: "Network",
      slug: "network",
      description: "Network and connectivity solutions",
      icon: "/icons/network.svg",
      subcategories: [
        {
          name: "Fiber Broadband Setup",
          slug: "fiber-broadband-setup",
          description: "High-speed internet installation"
        },
        {
          name: "Mesh WiFi Installation",
          slug: "mesh-wifi-installation",
          description: "Whole-home WiFi coverage solutions"
        },
        {
          name: "Smart TV & Sound Systems",
          slug: "smart-tv-sound-systems",
          description: "Entertainment system installation"
        }
      ]
    },
    {
      name: "Plumbing",
      slug: "plumbing",
      description: "Professional plumbing services",
      icon: "/icons/plumbing.svg",
      subcategories: [
        {
          name: "Combi Boiler Installation",
          slug: "combi-boiler-installation",
          description: "Expert boiler installation services"
        },
        {
          name: "Smart Leak Detection",
          slug: "smart-leak-detection",
          description: "Advanced leak detection systems"
        },
        {
          name: "Water Tank Replacement",
          slug: "water-tank-replacement",
          description: "Professional water tank services"
        }
      ]
    },
    {
      name: "Roofing",
      slug: "roofing",
      description: "Professional roofing services",
      icon: "/icons/roofing.svg",
      subcategories: [
        {
          name: "Slate Roof Repairs",
          slug: "slate-roof-repairs",
          description: "Expert slate roof repair services"
        },
        {
          name: "Roof Insulation",
          slug: "roof-insulation",
          description: "Professional roof insulation solutions"
        },
        {
          name: "Solar Panel Integration",
          slug: "solar-panel-integration",
          description: "Roof-integrated solar solutions"
        }
      ]
    },
    {
      name: "Windows",
      slug: "windows",
      description: "Window installation and services",
      icon: "/icons/windows.svg",
      subcategories: [
        {
          name: "Triple Glazing Installation",
          slug: "triple-glazing-installation",
          description: "Energy-efficient window solutions"
        },
        {
          name: "Window Replacement",
          slug: "window-replacement",
          description: "Professional window replacement services"
        },
        {
          name: "Draught Proofing",
          slug: "draught-proofing",
          description: "Window draught-proofing solutions"
        }
      ]
    },
    {
      name: "Ventilation",
      slug: "ventilation",
      description: "Ventilation and air quality solutions",
      icon: "/icons/ventilation.svg",
      subcategories: [
        {
          name: "Heat Recovery Systems",
          slug: "heat-recovery-systems",
          description: "Heat recovery ventilation installation"
        },
        {
          name: "Humidity Control Systems",
          slug: "humidity-control-systems",
          description: "Professional humidity management"
        },
        {
          name: "Attic Ventilation",
          slug: "attic-ventilation",
          description: "Attic ventilation solutions"
        }
      ]
    },
    {
      name: "Grant Services",
      slug: "grant-services",
      description: "Energy grant application services",
      icon: "/icons/grant-services.svg",
      subcategories: [
        {
          name: "SEAI Grant Applications",
          slug: "seai-grant-applications",
          description: "SEAI grant application assistance"
        },
        {
          name: "Home Energy Grants",
          slug: "home-energy-grants",
          description: "Energy grant consultation services"
        },
        {
          name: "Better Energy Homes",
          slug: "better-energy-homes",
          description: "Better Energy Homes scheme support"
        }
      ]
    },
    {
      name: "Energy Consultation",
      slug: "energy-consultation",
      description: "Professional energy consultation services",
      icon: "/icons/energy-consultation.svg",
      subcategories: [
        {
          name: "One-Stop-Shop Services",
          slug: "one-stop-shop-services",
          description: "Comprehensive energy upgrade services"
        },
        {
          name: "Retrofit Design Services",
          slug: "retrofit-design-services",
          description: "Professional retrofit planning"
        },
        {
          name: "Energy Upgrade Planning",
          slug: "energy-upgrade-planning",
          description: "Energy improvement consultation"
        }
      ]
    }
  ]
  
  export type County = typeof counties[number]
  export type CategorySlug = typeof categories[number]['slug']
  export type SubcategorySlug = typeof categories[number]['subcategories'][number]['slug']