export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isFeatured?: boolean;
  isNew?: boolean;
  discount?: number;
  brand?: string;
  model?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  options?: {
    colors?: string[];
    sizes?: string[];
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

// Define the Banner interface
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image: string;
  position: 'home_top' | 'home_middle' | 'category_top' | 'product_page' | 'cart_page' | 'site_wide';
  status: 'active' | 'inactive';
  priority: number;
  backgroundColor?: string;
  textColor?: string;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
  animation?: 'fade' | 'slide' | 'bounce' | 'pulse' | 'none';
  size?: 'small' | 'medium' | 'large';
}

// Sample banners data
export const BANNERS: Banner[] = [
  {
    id: 'banner-1',
    title: 'Summer Sale',
    subtitle: 'Up to 50% Off',
    description: 'Limited time offer on summer collections',
    ctaText: 'Shop Now',
    ctaLink: '/sale',
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    position: 'home_top',
    status: 'active',
    priority: 1,
    backgroundColor: '#ff6b6b',
    textColor: '#ffffff',
    startDate: '2023-06-01T00:00:00Z',
    endDate: '2023-08-31T23:59:59Z',
    createdAt: '2023-05-15T12:00:00Z',
    updatedAt: '2023-05-15T12:00:00Z',
    animation: 'fade',
    size: 'small'
  },
  {
    id: 'banner-2',
    title: 'New Arrivals',
    subtitle: 'Premium Collections',
    description: 'Discover our latest products',
    ctaText: 'Explore',
    ctaLink: '/products?new=true',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    position: 'home_middle',
    status: 'active',
    priority: 2,
    backgroundColor: '#4dabf7',
    textColor: '#ffffff',
    createdAt: '2023-05-20T12:00:00Z',
    updatedAt: '2023-05-20T12:00:00Z',
    animation: 'slide',
    size: 'medium'
  },
  {
    id: 'banner-3',
    title: 'Free Shipping',
    subtitle: 'On Orders Over KSh 5,000',
    ctaText: 'Learn More',
    ctaLink: '/shipping',
    image: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    position: 'site_wide',
    status: 'active',
    priority: 3,
    backgroundColor: '#20c997',
    textColor: '#ffffff',
    createdAt: '2023-05-25T12:00:00Z',
    updatedAt: '2023-05-25T12:00:00Z',
    animation: 'pulse',
    size: 'small'
  }
];

// Mock data
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Gold Diamond Watch",
    price: 249999,
    currency: "KSH",
    description: "Exquisite 18k gold watch with diamond embellishments. A statement piece for the discerning collector.",
    images: [
      "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1539874754764-5a96559165b0?q=80&w=1942&auto=format&fit=crop"
    ],
    category: "watches",
    tags: ["luxury", "gold", "diamond"],
    rating: 4.9,
    reviews: 52,
    inStock: true,
    isFeatured: true,
    isNew: true,
    brand: "Audemars Piguet",
    model: "Royal Oak",
    material: "18k Gold, Diamond",
    dimensions: "41mm x 10.5mm",
    weight: "210g",
    options: {
      colors: ["gold", "rose-gold", "white-gold"]
    }
  },
  {
    id: "2",
    name: "Premium Leather Bag",
    price: 68999,
    currency: "KSH",
    description: "Handcrafted from the finest Italian leather. Elegant, spacious, and built to last a lifetime.",
    images: [
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611010344445-5f28fb815dd8?q=80&w=1964&auto=format&fit=crop"
    ],
    category: "bags",
    tags: ["leather", "handcrafted", "designer"],
    rating: 4.7,
    reviews: 36,
    inStock: true,
    isFeatured: true,
    brand: "Hermès",
    model: "Birkin",
    material: "Premium Italian Leather",
    dimensions: "40cm x 30cm x 20cm",
    weight: "1.2kg",
    options: {
      colors: ["black", "brown", "tan"]
    }
  },
  {
    id: "3",
    name: "Designer Sunglasses",
    price: 36500,
    currency: "KSH",
    description: "Ultra-lightweight titanium frame with polarized lenses. Protection meets high fashion.",
    images: [
      "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1625591342274-013866180476?q=80&w=2070&auto=format&fit=crop"
    ],
    category: "accessories",
    tags: ["designer", "polarized", "titanium"],
    rating: 4.8,
    reviews: 24,
    inStock: true,
    isFeatured: true,
    discount: 10,
    brand: "Ray-Ban",
    model: "Aviator Premium",
    material: "Titanium, Polarized Glass",
    dimensions: "Standard Size",
    weight: "30g",
    options: {
      colors: ["black", "gold", "silver"]
    }
  },
  {
    id: "4",
    name: "Silk Evening Dress",
    price: 98900,
    currency: "KSH",
    description: "The epitome of elegance. This flowing silk gown features hand-embroidered details.",
    images: [
      "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?q=80&w=1770&auto=format&fit=crop"
    ],
    category: "clothing",
    tags: ["silk", "evening", "gown"],
    rating: 4.9,
    reviews: 19,
    inStock: true,
    isFeatured: false,
    isNew: true,
    brand: "Versace",
    model: "Moonlight Collection",
    material: "100% Silk, Hand-embroidered",
    dimensions: "Made to measure",
    options: {
      sizes: ["XS", "S", "M", "L", "XL"]
    }
  },
  {
    id: "5",
    name: "Marble Fountain Pen",
    price: 24500,
    currency: "KSH",
    description: "Each piece uniquely crafted from Italian marble. Writes with exceptional smoothness and precision.",
    images: [
      "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?q=80&w=1925&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528111029373-08f86825e103?q=80&w=1287&auto=format&fit=crop"
    ],
    category: "stationery",
    tags: ["pen", "marble", "luxury"],
    rating: 4.6,
    reviews: 14,
    inStock: true,
    isFeatured: true,
    brand: "Mont Blanc",
    model: "Meisterstück",
    material: "Italian Marble, Gold-plated nib",
    dimensions: "14.5cm length, 1.2cm diameter",
    weight: "45g"
  },
  {
    id: "6",
    name: "Crystal Whiskey Set",
    price: 45999,
    currency: "KSH",
    description: "Hand-cut crystal decanter and matching glasses. The ultimate gift for whiskey connoisseurs.",
    images: [
      "https://images.unsplash.com/photo-1557666316-c0fc53ff7ddf?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621472124503-a760c1146f60?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "home",
    tags: ["crystal", "whiskey", "barware"],
    rating: 4.8,
    reviews: 28,
    inStock: true,
    isFeatured: false,
    brand: "Waterford",
    model: "Lismore Collection",
    material: "Hand-cut Crystal",
    dimensions: "Decanter: 27cm height, Glasses: 9.5cm height",
    weight: "Set: 3.2kg"
  },
  // Adding more affordable, everyday products
  {
    id: "7",
    name: "Wireless Bluetooth Earbuds",
    price: 3499,
    currency: "KSH",
    description: "High-quality sound with noise cancellation. Ergonomic design with long battery life.",
    images: [
      "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608156639585-b3a032e88587?q=80&w=2067&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["wireless", "bluetooth", "audio"],
    rating: 4.5,
    reviews: 312,
    inStock: true,
    isFeatured: true,
    discount: 15,
    brand: "Sony",
    model: "WF-1000XM4",
    material: "Premium Plastic, Silicone tips",
    dimensions: "Case: 6.5cm x 4.5cm x 2.8cm",
    weight: "7.3g per earbud, 41g case"
  },
  {
    id: "8",
    name: "Cotton T-Shirt",
    price: 999,
    currency: "KSH",
    description: "Premium soft cotton t-shirt with comfortable fit. Available in multiple colors.",
    images: [
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=1854&auto=format&fit=crop"
    ],
    category: "clothing",
    tags: ["cotton", "casual", "t-shirt"],
    rating: 4.3,
    reviews: 185,
    inStock: true,
    isFeatured: false,
    discount: 5,
    brand: "EnzoBay Essentials",
    model: "Comfort Fit",
    material: "100% Egyptian Cotton",
    options: {
      colors: ["white", "black", "navy", "gray", "red"],
      sizes: ["S", "M", "L", "XL", "XXL"]
    }
  },
  {
    id: "9",
    name: "Running Shoes",
    price: 4999,
    currency: "KSH",
    description: "Lightweight shoes with superior cushioning for maximum comfort during your run.",
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop"
    ],
    category: "footwear",
    tags: ["sports", "running", "shoes"],
    rating: 4.7,
    reviews: 253,
    inStock: true,
    isFeatured: true,
    isNew: true,
    brand: "Nike",
    model: "Air Zoom Pegasus",
    material: "Mesh, Synthetic leather, Rubber sole",
    weight: "285g per shoe",
    options: {
      colors: ["black/white", "blue/orange", "gray/green"],
      sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"]
    }
  },
  {
    id: "10",
    name: "Smart LED TV - 43 inch",
    price: 29999,
    currency: "KSH",
    description: "Full HD display with smart features. Connect to your favorite streaming services.",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1601944177325-f8867652837f?q=80&w=1974&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["tv", "smart", "led"],
    rating: 4.6,
    reviews: 128,
    inStock: true,
    isFeatured: true,
    discount: 8,
    brand: "Samsung",
    model: "Crystal UHD",
    material: "Metal, Plastic, Glass",
    dimensions: "96.39cm x 55.89cm x 6.05cm",
    weight: "8.7kg"
  },
  {
    id: "11",
    name: "Kitchen Blender",
    price: 4299,
    currency: "KSH",
    description: "Powerful motor with multiple speed settings. Perfect for smoothies and food preparation.",
    images: [
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1578677972412-ffb5a35a4537?q=80&w=2069&auto=format&fit=crop"
    ],
    category: "kitchen",
    tags: ["appliance", "blender", "home"],
    rating: 4.2,
    reviews: 96,
    inStock: true,
    isFeatured: false,
    isNew: true,
    brand: "Vitamix",
    model: "Pro Series 750",
    material: "Stainless Steel, BPA-free plastic",
    dimensions: "19.6cm x 19.6cm x 44.2cm",
    weight: "5.7kg"
  },
  {
    id: "12",
    name: "Smartphone Case",
    price: 899,
    currency: "KSH",
    description: "Durable protection with slim design. Compatible with latest phone models.",
    images: [
      "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584435405303-fa1e9172a7b8?q=80&w=1824&auto=format&fit=crop"
    ],
    category: "mobile-accessories",
    tags: ["case", "protection", "smartphone"],
    rating: 4.4,
    reviews: 210,
    inStock: true,
    isFeatured: false,
    discount: 20,
    brand: "Spigen",
    model: "Tough Armor",
    material: "TPU, Polycarbonate",
    dimensions: "Varies by phone model",
    weight: "42g",
    options: {
      colors: ["black", "navy blue", "red"]
    }
  },
  {
    id: "13",
    name: "Office Desk Chair",
    price: 11999,
    currency: "KSH",
    description: "Ergonomic design with adjustable height and lumbar support for all-day comfort.",
    images: [
      "https://images.unsplash.com/photo-1505843490701-5be5d76b3f09?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1589364222378-4dc75a6dc0a7?q=80&w=1954&auto=format&fit=crop"
    ],
    category: "furniture",
    tags: ["office", "chair", "ergonomic"],
    rating: 4.5,
    reviews: 75,
    inStock: true,
    isFeatured: true,
    brand: "Herman Miller",
    model: "Aeron",
    material: "Mesh, Aluminum frame",
    dimensions: "Height: 104cm, Width: 68cm, Depth: 66cm",
    weight: "18kg",
    options: {
      colors: ["black", "graphite", "mineral"]
    }
  },
  {
    id: "14",
    name: "Fitness Tracker",
    price: 3499,
    currency: "KSH",
    description: "Track your steps, heart rate, and sleep patterns. Waterproof with long battery life.",
    images: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1614043599674-dafd63410d34?q=80&w=1770&auto=format&fit=crop"
    ],
    category: "electronics",
    tags: ["fitness", "tracker", "wearable"],
    rating: 4.3,
    reviews: 123,
    inStock: true,
    isFeatured: false,
    discount: 12,
    brand: "Fitbit",
    model: "Charge 5",
    material: "Silicone, aluminum housing",
    dimensions: "36.78mm x 22.79mm x 11.2mm",
    weight: "29g",
    options: {
      colors: ["black", "lunar white", "steel blue"]
    }
  },
  {
    id: "15",
    name: "Baby Stroller",
    price: 12599,
    currency: "KSH",
    description: "Lightweight and foldable design. Multiple position settings with ample storage space.",
    images: [
      "https://images.unsplash.com/photo-1586982643126-83f544ed6ed3?q=80&w=1889&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1590895178913-ce1e241ec8ac?q=80&w=1965&auto=format&fit=crop"
    ],
    category: "baby",
    tags: ["stroller", "baby", "travel"],
    rating: 4.7,
    reviews: 89,
    inStock: true,
    isFeatured: false,
    isNew: true,
    brand: "Uppababy",
    model: "Vista V2",
    material: "Aluminum frame, premium fabrics",
    dimensions: "Unfolded: 91.4cm x 65.3cm x 101.6cm",
    weight: "12.4kg"
  },
  {
    id: "16",
    name: "Laptop Backpack",
    price: 2999,
    currency: "KSH",
    description: "Waterproof with padded laptop compartment. Multiple pockets for organization.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1887&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581605405669-fcdf81165afa?q=80&w=1587&auto=format&fit=crop"
    ],
    category: "bags",
    tags: ["backpack", "laptop", "travel"],
    rating: 4.5,
    reviews: 142,
    inStock: true,
    isFeatured: true,
    discount: 10,
    brand: "North Face",
    model: "Surge",
    material: "Nylon, polyester",
    dimensions: "50cm x 33cm x 18cm",
    weight: "1.4kg",
    options: {
      colors: ["black", "navy", "gray"]
    }
  }
];

export const CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Watches",
    description: "Luxury timepieces crafted with precision",
    image: "https://images.unsplash.com/photo-1633934542430-0905ccb5f050?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Bags",
    description: "Handcrafted leather and designer bags",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=2036&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Accessories",
    description: "Statement pieces to complete your look",
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?q=80&w=1740&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "Clothing",
    description: "Premium fabrics and exclusive designs",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop"
  },
  {
    id: "5",
    name: "Electronics",
    description: "Latest gadgets and smart devices",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?q=80&w=1964&auto=format&fit=crop"
  },
  {
    id: "6",
    name: "Footwear",
    description: "Comfortable and stylish shoes for all occasions",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "7",
    name: "Home & Kitchen",
    description: "Essentials for your living space",
    image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "8",
    name: "Furniture",
    description: "Quality furniture for home and office",
    image: "https://images.unsplash.com/photo-1505843490701-5be5d76b3f09?q=80&w=1887&auto=format&fit=crop"
  },
  {
    id: "9",
    name: "Beauty & Personal Care",
    description: "Skincare, makeup and personal grooming",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=2080&auto=format&fit=crop"
  },
  {
    id: "10",
    name: "Baby Products",
    description: "Everything you need for your little ones",
    image: "https://images.unsplash.com/photo-1586982643126-83f544ed6ed3?q=80&w=1889&auto=format&fit=crop"
  },
  {
    id: "11",
    name: "Mobile Accessories",
    description: "Enhance your smartphone experience",
    image: "https://images.unsplash.com/photo-1592890288564-76628a30a657?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "12",
    name: "Sports & Fitness",
    description: "Equipment and gear for active lifestyles",
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop"
  }
];
