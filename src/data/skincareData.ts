export type SkinTypeFilter = 'all' | 'dry' | 'oily' | 'sensitive';
export type BudgetFilter = 'all' | 'under20' | '20to40' | '40plus';
export type CategoryTab = 'All' | 'Face' | 'Makeup' | 'Body' | 'Sun';

export interface Product {
  id: string;
  name: string;
  price: number;
  volume: string;
  rating: number;
  category: Exclude<CategoryTab, 'All'>;
  description: string;
  image: string;
  imageAlt: string;
  bgTone: 'mint' | 'blush' | 'oat';
  skinTypes: ('dry' | 'oily' | 'sensitive')[];
  skinLabel: string;
  budgetCategory: 'under20' | '20to40' | '40plus';
  budgetLabel: string;
  certifiedAuthentic: boolean;
  isBestSeller?: boolean;
  keyIngredients: string[];
  origin: string;
  howToUse: string;
}

export interface SkinTextureOption {
  id: string;
  title: string;
  description: string;
  mappedSkinType: 'dry' | 'oily' | 'sensitive';
}

export interface ConcernOption {
  id: string;
  title: string;
  description: string;
}

export interface ToneSwatch {
  name: string;
  hex: string;
}

export interface GoalOption {
  id: string;
  title: string;
  description: string;
}

export interface TryOnProduct {
  id: string;
  productId: string;
  name: string;
  effectLabel: string;
  cssFilter: string;
}

export interface SkinScanMetrics {
  skinAge: number;
  acne: number;
  dryness: number;
  moisture: number;
}

export type PaymentGatewayId = 'Paystack' | 'Debit / Credit Card' | 'Apple Pay';

export interface PaymentGatewayOption {
  id: PaymentGatewayId;
  title: string;
  subtitle: string;
  verificationNote: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_skincare_1795620932739.jpg';
export const TRYON_DEFAULT_FACE = '/src/assets/images/tryon_sample_face_1795620938826.jpg';

export const ALL_PRODUCTS: Product[] = [
  {
    id: 'mucin-repair-essence',
    name: 'Mucin Repair Essence',
    price: 24,
    volume: '100 ml',
    rating: 4.8,
    category: 'Face',
    description: 'Plumps fine lines and calms redness with soothing snail mucin and panthenol.',
    image: '/src/assets/images/kbeauty_snail_essence_1795620934194.jpg',
    imageAlt: 'Mucin Repair Essence frosted glass bottle on travertine stone',
    bgTone: 'mint',
    skinTypes: ['dry', 'sensitive', 'oily'],
    skinLabel: 'All Skin Types',
    budgetCategory: '20to40',
    budgetLabel: '$20–$40',
    certifiedAuthentic: true,
    isBestSeller: true,
    keyIngredients: ['96% Snail Secretion Filtrate', 'Panthenol (Vitamin B5)', 'Sodium Hyaluronate'],
    origin: 'Seoul, South Korea · Batch Verified',
    howToUse: 'After cleansing, pat 2 pumps gently onto damp skin morning and evening before moisturizer.',
  },
  {
    id: 'rice-sun-relief',
    name: 'Rice Sun Relief SPF 50',
    price: 18,
    volume: '50 ml',
    rating: 4.9,
    category: 'Sun',
    description: 'Weightless daily UV protection with rice extract and zero white cast.',
    image: '/src/assets/images/kbeauty_sun_relief_1795620934622.jpg',
    imageAlt: 'Rice Sun Relief SPF 50 cream tube on pale blush stone',
    bgTone: 'blush',
    skinTypes: ['dry', 'oily', 'sensitive'],
    skinLabel: 'All Skin Types',
    budgetCategory: 'under20',
    budgetLabel: 'Under $20',
    certifiedAuthentic: true,
    isBestSeller: true,
    keyIngredients: ['30% Oryza Sativa Rice Extract', 'Grain Ferment Filtrate', 'Niacinamide 2%'],
    origin: 'Seoul, South Korea · Batch Verified',
    howToUse: 'Apply generously as the final step of your morning routine 15 minutes before sun exposure.',
  },
  {
    id: 'centella-barrier-cream',
    name: 'Centella Barrier Cream',
    price: 26,
    volume: '50 ml',
    rating: 4.7,
    category: 'Face',
    description: 'Locks in gentle hydration and strengthens sensitive skin barriers overnight.',
    image: '/src/assets/images/product_hydrating_cream_1795620934569.jpg',
    imageAlt: 'Centella Barrier Gel Cream frosted jar on travertine surface',
    bgTone: 'oat',
    skinTypes: ['dry', 'sensitive'],
    skinLabel: 'Dry & Sensitive',
    budgetCategory: '20to40',
    budgetLabel: '$20–$40',
    certifiedAuthentic: true,
    isBestSeller: true,
    keyIngredients: ['Centella Asiatica Extract', 'Madecassoside', 'Ceramide NP'],
    origin: 'Seoul, South Korea · Batch Verified',
    howToUse: 'Smooth a pea-sized amount across face and neck as your final evening hydration layer.',
  },
  {
    id: 'oat-cleanser',
    name: 'Oat Milk Cleanser',
    price: 16,
    volume: '200 ml',
    rating: 4.6,
    category: 'Face',
    description: 'pH-balanced colloidal oat milk wash that removes daily buildup without stripping.',
    image: '/src/assets/images/product_oat_cleanser_1795620935593.jpg',
    imageAlt: 'Soothing Oat Milk Cleanser pump bottle',
    bgTone: 'oat',
    skinTypes: ['dry', 'sensitive'],
    skinLabel: 'Dry & Sensitive',
    budgetCategory: 'under20',
    budgetLabel: 'Under $20',
    certifiedAuthentic: true,
    isBestSeller: false,
    keyIngredients: ['Colloidal Oatmeal', 'Chamomile Flower Water', 'Squalane'],
    origin: 'Direct Seoul Lab Partner',
    howToUse: 'Massage 1–2 pumps onto lukewarm wet skin for 30 seconds, then rinse gently.',
  },
  {
    id: 'glow-serum',
    name: 'Vitamin C Glow Serum',
    price: 28,
    volume: '30 ml',
    rating: 4.8,
    category: 'Face',
    description: 'Stabilized botanical vitamin C complex that brightens uneven patches gently.',
    image: '/src/assets/images/product_vitamin_c_serum_1795620935323.jpg',
    imageAlt: 'Gentle Vitamin C Glow Serum amber dropper bottle',
    bgTone: 'blush',
    skinTypes: ['oily', 'sensitive'],
    skinLabel: 'Oily & Sensitive',
    budgetCategory: '20to40',
    budgetLabel: '$20–$40',
    certifiedAuthentic: true,
    isBestSeller: true,
    keyIngredients: ['10% Ascorbyl Glucoside', 'Licorice Root Extract', 'Hyaluronic Acid'],
    origin: 'Direct Seoul Lab Partner',
    howToUse: 'Apply 3 drops to clean skin every morning before moisturizer and SPF 50.',
  },
  {
    id: 'cloud-cream',
    name: 'Ceramide Cloud Cream',
    price: 34,
    volume: '50 ml',
    rating: 4.9,
    category: 'Makeup',
    description: 'Velvety ceramide primer-cream that preps skin for seamless, dewy makeup wear.',
    image: '/src/assets/images/product_hydrating_cream_1795620934569.jpg',
    imageAlt: 'Ceramide Cloud Moisture Cream jar',
    bgTone: 'mint',
    skinTypes: ['dry'],
    skinLabel: 'Dry Skin',
    budgetCategory: '20to40',
    budgetLabel: '$20–$40',
    certifiedAuthentic: true,
    isBestSeller: false,
    keyIngredients: ['5-Ceramide Complex', 'Shea Butter Ester', 'Beta-Glucan'],
    origin: 'Direct Seoul Lab Partner',
    howToUse: 'Warm a small scoop between fingertips and press evenly onto skin before tint or sunscreen.',
  },
  {
    id: 'body-balm',
    name: 'Botanical Body Balm',
    price: 44,
    volume: '100 ml',
    rating: 4.7,
    category: 'Body',
    description: 'Targeted botanical balm formulated for dark knuckles, elbows, knees, and stretch marks.',
    image: '/src/assets/images/product_body_balm_1795620935673.jpg',
    imageAlt: 'Even-Tone Botanical Body Balm tube on oat linen',
    bgTone: 'oat',
    skinTypes: ['dry', 'sensitive', 'oily'],
    skinLabel: 'All Skin Types',
    budgetCategory: '40plus',
    budgetLabel: '$40+',
    certifiedAuthentic: true,
    isBestSeller: false,
    keyIngredients: ['5% Niacinamide', '2% Alpha Arbutin', 'Centella & Rosehip Oil'],
    origin: 'Authorized Clinical Partner',
    howToUse: 'Massage directly onto knuckles, underarms, elbows, or stretch marks twice daily.',
  },
];

export const TRENDING_PRODUCTS: Product[] = ALL_PRODUCTS.filter((p) => p.isBestSeller);

export const SKIN_TEXTURE_OPTIONS: SkinTextureOption[] = [
  {
    id: 'dry-flaky',
    title: 'Dry or Flaky Texture',
    description: 'Feels tight after washing or shows rough patches',
    mappedSkinType: 'dry',
  },
  {
    id: 'oily-bumpy',
    title: 'Oily or Bumpy Texture',
    description: 'Visible shine, enlarged pores, or congested areas',
    mappedSkinType: 'oily',
  },
  {
    id: 'sensitive-reactive',
    title: 'Sensitive & Reactive',
    description: 'Reddens easily or stings with strong actives',
    mappedSkinType: 'sensitive',
  },
  {
    id: 'combination-balanced',
    title: 'Combination & Balanced',
    description: 'Oily T-zone with comfortable or dry cheeks',
    mappedSkinType: 'sensitive',
  },
];

export const TARGETED_CONCERN_OPTIONS: ConcernOption[] = [
  {
    id: 'dark-knuckles',
    title: 'Dark Patches on Knuckles',
    description: 'Gentle brightening & barrier care for hands',
  },
  {
    id: 'dark-underarms',
    title: 'Dark Underarms',
    description: 'Fragrance-free soothing tone support',
  },
  {
    id: 'dark-elbows-feet',
    title: 'Dark Elbows & Feet',
    description: 'Softening exfoliation for thicker, darker skin',
  },
  {
    id: 'stretch-marks',
    title: 'Stretch Marks',
    description: 'Nourish elasticity and smooth uneven bands',
  },
  {
    id: 'under-eye-circles',
    title: 'Under-Eye Circles',
    description: 'Brighten dark hollows and soothe delicate eye skin',
  },
  {
    id: 'sun-damage-melasma',
    title: 'Sun Damage & Melasma',
    description: 'Calm UV-triggered pigment patches and sun spots',
  },
  {
    id: 'hooded-eyes',
    title: 'Hooded Eyes',
    description: 'Firming peptides and gentle lid-area hydration',
  },
];

export const TONE_SWATCHES: ToneSwatch[] = [
  { name: 'Porcelain', hex: '#F6DFD2' },
  { name: 'Warm Sand', hex: '#E6C3A8' },
  { name: 'Golden Tan', hex: '#C99872' },
  { name: 'Caramel', hex: '#A6724D' },
  { name: 'Chestnut', hex: '#764A31' },
  { name: 'Espresso', hex: '#4A2D1E' },
];

export const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'brightening',
    title: 'Skin Brightening',
    description: 'Boost natural radiance and fade dullness',
  },
  {
    id: 'lightening',
    title: 'Skin Lightening',
    description: 'Gently target dark spots for a lighter, even tone',
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    description: 'Preserve your current clarity and daily balance',
  },
  {
    id: 'repair',
    title: 'Skin Repair & Recovery',
    description: 'Restore dark knuckles, scars, and uneven tone from prior products',
  },
  {
    id: 'anti-aging',
    title: 'Anti-Aging & Rejuvenation',
    description: 'Smooth fine lines, restore elasticity, and support firming',
  },
];

export const TRYON_PRODUCTS: TryOnProduct[] = [
  {
    id: 'tryon-mucin',
    productId: 'mucin-repair-essence',
    name: 'Mucin Repair Essence',
    effectLabel: 'Dewy Hydration + Glow',
    cssFilter: 'brightness(1.06) contrast(1.03) saturate(1.06)',
  },
  {
    id: 'tryon-spf',
    productId: 'rice-sun-relief',
    name: 'Rice Sun Relief SPF 50',
    effectLabel: 'Even Tone + UV Shield',
    cssFilter: 'brightness(1.08) contrast(1.01) saturate(1.02)',
  },
  {
    id: 'tryon-centella',
    productId: 'centella-barrier-cream',
    name: 'Centella Barrier Cream',
    effectLabel: 'Calm Barrier + Smoothness',
    cssFilter: 'brightness(1.04) contrast(0.99) saturate(1.04)',
  },
];

export const PAYMENT_GATEWAYS: PaymentGatewayOption[] = [
  {
    id: 'Paystack',
    title: 'Paystack',
    subtitle: 'Card, Bank Transfer, or USSD with instant verification',
    verificationNote: 'Paystack verifies your payment in seconds via bank OTP or card PIN with zero extra fees.',
  },
  {
    id: 'Debit / Credit Card',
    title: 'Debit / Credit Card',
    subtitle: 'Visa, Mastercard, or Verve via 3D Secure',
    verificationNote: 'Protected by 3D Secure verification. Enter your card details on the next step.',
  },
  {
    id: 'Apple Pay',
    title: 'Apple Pay',
    subtitle: 'One-tap biometric verification',
    verificationNote: 'Confirm your order instantly with Face ID or Touch ID.',
  },
];

export function computeScanMetrics(textureId: string, concernIds: string[], goalId: string): SkinScanMetrics {
  let acne = 22;
  let dryness = 48;
  let moisture = 44;
  let skinAge = 24;

  if (textureId === 'dry-flaky') {
    acne = 18;
    dryness = 72;
    moisture = 21;
    skinAge = 25;
  } else if (textureId === 'oily-bumpy') {
    acne = 46;
    dryness = 24;
    moisture = 58;
    skinAge = 23;
  } else if (textureId === 'sensitive-reactive') {
    acne = 36;
    dryness = 64;
    moisture = 29;
    skinAge = 24;
  } else {
    acne = 28;
    dryness = 42;
    moisture = 52;
    skinAge = 24;
  }

  if (concernIds.includes('sun-damage-melasma') || goalId === 'anti-aging') {
    skinAge += 2;
  }
  if (concernIds.includes('under-eye-circles')) {
    moisture = Math.max(18, moisture - 4);
  }

  return { skinAge, acne, dryness, moisture };
}

export function recommendRoutine(params: {
  textureId: string;
  concernIds: string[];
  goalId: string;
  tryOnId: string;
}): Product[] {
  const picks: Product[] = [];
  const addUnique = (id: string) => {
    const found = ALL_PRODUCTS.find((p) => p.id === id);
    if (found && !picks.some((p) => p.id === found.id)) {
      picks.push(found);
    }
  };

  if (params.textureId === 'dry-flaky' || params.textureId === 'sensitive-reactive') {
    addUnique('oat-cleanser');
  }

  const tryOnMatch = TRYON_PRODUCTS.find((t) => t.id === params.tryOnId);
  if (tryOnMatch) {
    addUnique(tryOnMatch.productId);
  }

  if (params.goalId === 'brightening' || params.goalId === 'lightening') {
    addUnique('glow-serum');
  } else if (params.goalId === 'anti-aging') {
    addUnique('mucin-repair-essence');
  }

  if (
    params.concernIds.includes('dark-knuckles') ||
    params.concernIds.includes('dark-underarms') ||
    params.concernIds.includes('dark-elbows-feet') ||
    params.concernIds.includes('stretch-marks')
  ) {
    addUnique('body-balm');
  }

  if (params.textureId === 'dry-flaky') {
    addUnique('cloud-cream');
  } else {
    addUnique('centella-barrier-cream');
  }

  addUnique('rice-sun-relief');

  return picks.slice(0, 4);
}
