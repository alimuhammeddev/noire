export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  category: "Clothing" | "Outerwear" | "Knitwear" | "Accessories";
  description: string;
  images: string[];
  sizes: string[];
  colors: string[];
  details: string[];
  material: string;
  featured: boolean;
  isNew: boolean;
};

const image = (id: string, width = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

export const products: Product[] = [
  {
    id: "essential-overshirt",
    slug: "essential-overshirt",
    name: "The Essential Overshirt",
    price: 145,
    category: "Outerwear",
    description:
      "A versatile layer designed with clean lines, considered proportions, and an easy everyday fit. Wear it open over a simple tee or buttoned for a more structured look.",
    images: [
      image("photo-1591047139829-d91aecb6caea"),
      image("photo-1523398002811-999ca8dec234"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Stone", "Black"],
    details: [
      "Relaxed contemporary fit",
      "Clean button-front construction",
      "Versatile styling",
    ],
    material: "Illustrative sample: 100% cotton twill.",
    featured: true,
    isNew: true,
  },
  {
    id: "wide-leg-trouser",
    slug: "tailored-wide-leg-trouser",
    name: "Tailored Wide-Leg Trouser",
    price: 120,
    category: "Clothing",
    description:
      "A fluid, high-rise trouser with a quiet drape and a softly structured finish.",
    images: [
      image("photo-1594633312681-425c7b97ccd1"),
      image("photo-1509631179647-0177331693ae"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Charcoal"],
    details: [
      "High-rise waist",
      "Relaxed wide leg",
      "Concealed hook fastening",
    ],
    material:
      "Illustrative sample: 65% recycled polyester, 32% viscose, 3% elastane.",
    featured: true,
    isNew: true,
  },
  {
    id: "wool-blazer",
    slug: "structured-wool-blazer",
    name: "Structured Wool Blazer",
    price: 280,
    category: "Outerwear",
    description:
      "Precise tailoring, a clean shoulder, and a considered silhouette for every day.",
    images: [
      image("photo-1592878904946-b3cd8ae243d0"),
      image("photo-1591369822096-ffd140ec948f"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Charcoal", "Black"],
    details: [
      "Single-breasted profile",
      "Notched lapel",
      "Two front welt pockets",
    ],
    material: "Illustrative sample: 70% wool, 30% recycled polyester.",
    featured: true,
    isNew: false,
  },
  {
    id: "knit-polo",
    slug: "everyday-knit-polo",
    name: "Everyday Knit Polo",
    price: 110,
    category: "Knitwear",
    description:
      "A soft, fine-gauge knit with a relaxed collar and a considered everyday shape.",
    images: [
      image("photo-1618354691373-d851c5c3a990"),
      image("photo-1576566588028-4147f3842f27"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Ecru", "Black", "Olive"],
    details: ["Relaxed fit", "Ribbed collar and cuffs", "Fine-gauge finish"],
    material: "Illustrative sample: 100% cotton knit.",
    featured: true,
    isNew: false,
  },
  {
    id: "cotton-shirt",
    slug: "relaxed-cotton-shirt",
    name: "Relaxed Cotton Shirt",
    price: 95,
    category: "Clothing",
    description:
      "An easy, softly structured shirt made for layering and wearing on repeat.",
    images: [
      image("photo-1598033129183-c4f50c736f10"),
      image("photo-1603252109303-2751441dd157"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Pale Blue"],
    details: ["Relaxed silhouette", "Button-through front", "Curved hem"],
    material: "Illustrative sample: 100% cotton poplin.",
    featured: false,
    isNew: true,
  },
  {
    id: "leather-belt",
    slug: "minimal-leather-belt",
    name: "Minimal Leather Belt",
    price: 75,
    category: "Accessories",
    description:
      "A clean leather essential finished with a discreet brushed-metal buckle.",
    images: [
      image("photo-1614252369475-531eba835eb1"),
      image("photo-1553062407-98eeb64c6a62"),
    ],
    sizes: ["S", "M", "L"],
    colors: ["Black", "Dark Brown"],
    details: ["Slim profile", "Brushed-metal buckle", "Five-hole adjustment"],
    material: "Illustrative sample: full-grain leather.",
    featured: false,
    isNew: false,
  },
  {
    id: "boxy-tee",
    slug: "the-boxy-tee",
    name: "The Boxy Tee",
    price: 55,
    category: "Clothing",
    description:
      "A substantial cotton jersey tee with a cropped, easy-fitting shape.",
    images: [
      image("photo-1521572163474-6864f9cf17ab"),
      image("photo-1503342217505-b0a15ec3261c"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Black", "Ecru"],
    details: ["Boxy fit", "Slightly dropped shoulder", "Ribbed crew neckline"],
    material: "Illustrative sample: 100% organic cotton jersey.",
    featured: false,
    isNew: true,
  },
  {
    id: "utility-jacket",
    slug: "cropped-utility-jacket",
    name: "Cropped Utility Jacket",
    price: 185,
    category: "Outerwear",
    description:
      "A modern utility layer with clean lines, considered pockets, and a cropped hem.",
    images: [
      image("photo-1548126032-079a0fb0099d"),
      image("photo-1543076447-215ad9ba6923"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Olive", "Stone"],
    details: [
      "Cropped relaxed fit",
      "Four functional pockets",
      "Adjustable cuffs",
    ],
    material: "Illustrative sample: 100% cotton canvas.",
    featured: false,
    isNew: true,
  },
  {
    id: "fine-knit",
    slug: "fine-gauge-knit",
    name: "Fine Gauge Knit",
    price: 135,
    category: "Knitwear",
    description:
      "A light, refined knit with a smooth hand and enough ease for everyday layering.",
    images: [
      image("photo-1578587018452-892bacefd3f2"),
      image("photo-1578681994506-b8f463449011"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Oatmeal", "Charcoal"],
    details: ["Regular fit", "Clean crew neckline", "Ribbed trim"],
    material: "Illustrative sample: 70% merino wool, 30% cotton.",
    featured: false,
    isNew: false,
  },
  {
    id: "straight-denim",
    slug: "straight-leg-denim",
    name: "Straight-Leg Denim",
    price: 115,
    category: "Clothing",
    description:
      "An everyday straight-leg jean with a balanced rise and a softly worn finish.",
    images: [
      image("photo-1542272604-787c3835535d"),
      image("photo-1541099649105-f69ad21f3246"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Indigo", "Washed Black"],
    details: [
      "Mid-rise waist",
      "Straight leg",
      "Classic five-pocket construction",
    ],
    material: "Illustrative sample: 100% cotton denim.",
    featured: false,
    isNew: false,
  },
  {
    id: "everyday-tote",
    slug: "everyday-tote",
    name: "Everyday Tote",
    price: 90,
    category: "Accessories",
    description:
      "A generously proportioned carryall with simple lines and useful interior space.",
    images: [
      image("photo-1590874103328-eac38a683ce7"),
      image("photo-1548036328-c9fa89d128fa"),
    ],
    sizes: ["One size"],
    colors: ["Natural", "Black"],
    details: [
      "Roomy main compartment",
      "Interior slip pocket",
      "Comfortable shoulder straps",
    ],
    material: "Illustrative sample: cotton canvas with leather trim.",
    featured: false,
    isNew: false,
  },
  {
    id: "zip-jacket",
    slug: "textured-zip-jacket",
    name: "Textured Zip Jacket",
    price: 210,
    category: "Outerwear",
    description:
      "A tactile outer layer with a minimal zip front and an easy, modern profile.",
    images: [
      image("photo-1551028719-00167b16eac5"),
      image("photo-1529139574466-a303027c1d8b"),
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Espresso", "Black"],
    details: ["Relaxed fit", "Two-way front zip", "Side welt pockets"],
    material: "Illustrative sample: 100% recycled polyester.",
    featured: false,
    isNew: true,
  },
];

export const getProduct = (slug: string) =>
  products.find((product) => product.slug === slug);
export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
