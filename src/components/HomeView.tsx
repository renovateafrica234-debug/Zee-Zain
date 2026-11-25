import React, { useState } from 'react';
import {
  ALL_PRODUCTS,
  BudgetFilter,
  CategoryTab,
  HERO_IMAGE,
  Product,
  SkinTypeFilter,
  TRYON_DEFAULT_FACE,
} from '../data/skincareData';
import { CartItem } from './CartDrawer';
import { ResilientImage } from './ResilientImage';

interface HomeViewProps {
  cartItems: CartItem[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onStartAssessment: () => void;
  onOpenWelcome: () => void;
  onOpenCheckout: () => void;
  onOpenBagDrawer: () => void;
  onAddToCart: (product: Product) => void;
  onInspectProduct: (product: Product) => void;
}

const CATEGORY_TABS: CategoryTab[] = ['All', 'Face', 'Makeup', 'Body', 'Sun'];

export const HomeView: React.FC<HomeViewProps> = ({
  cartItems,
  wishlistIds,
  onToggleWishlist,
  onStartAssessment,
  onOpenWelcome,
  onOpenCheckout,
  onOpenBagDrawer,
  onAddToCart,
  onInspectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('Face');
  const [activeSkin, setActiveSkin] = useState<SkinTypeFilter>('all');
  const [activeBudget, setActiveBudget] = useState<BudgetFilter>('all');
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const totalBagCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = ALL_PRODUCTS.filter((product) => {
    const matchesCategory =
      showAllProducts || activeCategory === 'All' || product.category === activeCategory;
    const matchesSkin = activeSkin === 'all' || product.skinTypes.includes(activeSkin);
    const matchesBudget = activeBudget === 'all' || product.budgetCategory === activeBudget;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q) ||
      product.skinLabel.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q);
    return matchesCategory && matchesSkin && matchesBudget && matchesSearch;
  });

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAddedId(product.id);
    setTimeout(() => {
      setJustAddedId((curr) => (curr === product.id ? null : curr));
    }, 1200);
  };

  const getProductBagCount = (productId: string) =>
    cartItems.find((item) => item.product.id === productId)?.quantity || 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#EAE0D5] text-[#1F1B18]">
      {/* Top Header Area matching warm sand UI */}
      <header className="sticky top-0 z-20 bg-[#EAE0D5]/95 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-6 px-5 py-3.5">
          {/* Avatar + Welcome Zone */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenWelcome}
              aria-label="Open welcome companion screen"
              className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-xs shrink-0 hover:scale-105 transition-transform cursor-pointer"
            >
              <ResilientImage
                src={TRYON_DEFAULT_FACE}
                alt="Your skin profile"
                className="w-full h-full object-cover"
              />
            </button>
            <div className="flex flex-col">
              <span className="font-title text-[16px] leading-[20px] font-bold tracking-tight text-[#1F1B18]">
                ZEE ZAIN
              </span>
              <span className="font-body text-[12px] leading-[16px] text-[#6B6056]">
                Welcome · Your Skin&apos;s Care
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-[14px] font-label font-bold text-[#6B6056]" aria-label="Primary navigation">
            <a
              href="#catalog-heading"
              onClick={() => setShowAllProducts(false)}
              className="hover:text-[#1F1B18] transition-colors whitespace-nowrap shrink-0"
            >
              Best Sellers
            </a>
            <button
              type="button"
              onClick={onStartAssessment}
              className="hover:text-[#1F1B18] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              AI Skin Scan
            </button>
            <a
              href="#sourcing-heading"
              className="hover:text-[#1F1B18] transition-colors whitespace-nowrap shrink-0"
            >
              Our Sourcing
            </a>
            <button
              type="button"
              onClick={onOpenCheckout}
              className="hover:text-[#1F1B18] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Checkout
            </button>
          </nav>

          {/* Top Right Bag Action */}
          <button
            type="button"
            onClick={onOpenBagDrawer}
            aria-label={`Open bag with ${totalBagCount} items`}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-3.5 rounded-full bg-white text-[#1F1B18] shadow-xs hover:bg-[#FAF6F1] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] text-[#1F1B18]" aria-hidden="true">
              shopping_bag
            </span>
            <span className="font-mono text-[13px] font-medium tabular-nums">{totalBagCount}</span>
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-5 px-5 pt-2 pb-28 md:pb-12">
        {/* Search Bar + Filter Circle Button */}
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <span
              className="material-symbols-outlined text-[20px] text-[#6B6056] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            >
              search
            </span>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Find your skin formula"
              aria-label="Search skincare formulas"
              className="w-full min-h-[48px] pl-11 pr-4 rounded-full bg-white text-[14px] text-[#1F1B18] placeholder:text-[#9A8D80] border border-[#E2D7CB]/60 focus:outline-none focus:border-[#E59A3C]"
            />
          </div>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-label="Toggle skin type and budget filters"
            className="w-12 h-12 rounded-full bg-[#E59A3C] text-[#1F1B18] inline-flex items-center justify-center shrink-0 shadow-sm hover:bg-[#D4882A] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              tune
            </span>
          </button>
        </div>

        {/* Collapsible Skin Type & Budget Filters */}
        {showFilters && (
          <section
            aria-label="Advanced filters"
            className="p-4 rounded-[22px] bg-[#FAF6F1] border border-[#E2D7CB] flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-label text-[12px] font-bold text-[#6B6056]">Skin Type</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { value: 'all', label: 'All Types' },
                    { value: 'dry', label: 'Dry' },
                    { value: 'oily', label: 'Oily' },
                    { value: 'sensitive', label: 'Sensitive' },
                  ] as const
                ).map((item) => {
                  const isActive = activeSkin === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setActiveSkin(item.value)}
                      aria-pressed={isActive}
                      className={`min-h-[38px] px-3.5 rounded-full font-label text-[13px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#C27419] text-white'
                          : 'bg-white text-[#1F1B18] border border-[#E2D7CB] hover:bg-[#F2EAE0]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="font-label text-[12px] font-bold text-[#6B6056]">Budget</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { value: 'all', label: 'All Budgets' },
                    { value: 'under20', label: 'Under $20' },
                    { value: '20to40', label: '$20–$40' },
                    { value: '40plus', label: '$40+' },
                  ] as const
                ).map((item) => {
                  const isActive = activeBudget === item.value;
                  return (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setActiveBudget(item.value)}
                      aria-pressed={isActive}
                      className={`min-h-[38px] px-3.5 rounded-full font-label text-[13px] font-bold transition-colors whitespace-nowrap cursor-pointer ${
                        isActive
                          ? 'bg-[#C27419] text-white'
                          : 'bg-white text-[#1F1B18] border border-[#E2D7CB] hover:bg-[#F2EAE0]'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Curved Cream Surface Body */}
        <div className="rounded-[28px] bg-[#FAF6F1] p-5 md:p-7 flex flex-col gap-6 border border-white/60">
          {/* Promo Hero Collection Banner */}
          <section
            aria-label="Daily beauty collections"
            className="grid grid-cols-12 items-center gap-4 p-4 md:p-6 rounded-[22px] bg-[#EFE5D8] border border-[#E2D7CB]/70"
          >
            <div className="col-span-7 md:col-span-7 flex flex-col gap-2">
              <h1 className="font-headline text-[18px] sm:text-[22px] md:text-[26px] leading-[24px] md:leading-[32px] font-bold text-[#1F1B18] text-balance">
                Beauty collections deals of the day up to 40%
              </h1>
              <p className="hidden sm:block font-body text-[14px] text-[#6B6056]">
                Calm Korean formulas curated for hydration, barrier repair, and daily UV glow.
              </p>
              <div className="pt-1 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={onStartAssessment}
                  className="inline-flex items-center gap-1.5 min-h-[40px] px-4 rounded-full bg-[#C27419] text-white font-label text-[13px] font-bold hover:bg-[#A66010] transition-colors whitespace-nowrap cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[17px]" aria-hidden="true">
                    center_focus_strong
                  </span>
                  <span>AI Skin Scan</span>
                </button>
              </div>
            </div>
            <div className="col-span-5 md:col-span-5 h-32 sm:h-40 md:h-48 rounded-[16px] overflow-hidden bg-white border border-white">
              <ResilientImage
                src={HERO_IMAGE}
                alt="Curated Korean skincare collection"
                className="w-full h-full object-cover"
                fallbackLabel="Curated Skincare"
              />
            </div>
          </section>

          {/* Best Sellers + View More */}
          <section aria-labelledby="catalog-heading" className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-2">
              <h2
                id="catalog-heading"
                className="font-headline text-[20px] md:text-[24px] font-bold text-[#1F1B18]"
              >
                {showAllProducts ? 'All Formulas' : 'Best Sellers'}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowAllProducts((prev) => !prev);
                  if (!showAllProducts) setActiveCategory('All');
                }}
                className="inline-flex items-center gap-0.5 font-label text-[13px] font-bold text-[#6B6056] hover:text-[#1F1B18] transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>{showAllProducts ? 'Show curated' : 'View more'}</span>
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  chevron_right
                </span>
              </button>
            </div>

            {/* Category Filter Pills (Face | Makeup | Body | Sun) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Product categories">
              {CATEGORY_TABS.map((tab) => {
                const isActive = !showAllProducts ? activeCategory === tab : tab === 'All';
                return (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => {
                      setShowAllProducts(false);
                      setActiveCategory(tab);
                    }}
                    className={`min-h-[40px] px-5 rounded-full font-label text-[13px] font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isActive
                        ? 'bg-[#C27419] text-white shadow-xs'
                        : 'bg-white text-[#1F1B18] border border-[#E2D7CB] hover:bg-[#EFE5D8]'
                    }`}
                  >
                    {tab}
                  </button>
                );
              })}
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                {filteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id);
                  const bagQty = getProductBagCount(product.id);
                  const isJustAdded = justAddedId === product.id;

                  return (
                    <article
                      key={product.id}
                      onClick={() => onInspectProduct(product)}
                      className="h-full flex flex-col justify-between gap-3 p-3 rounded-[20px] bg-white border border-[#EAE0D5] cursor-pointer transition-transform duration-150 hover:-translate-y-0.5 shadow-2xs"
                    >
                      <div className="flex flex-col gap-2.5">
                        <div className="relative w-full aspect-square rounded-[14px] overflow-hidden bg-[#F4ECE3]">
                          <ResilientImage
                            src={product.image}
                            alt={product.imageAlt}
                            fallbackLabel={product.name}
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onToggleWishlist(product.id);
                            }}
                            aria-label={
                              isWishlisted
                                ? `Remove ${product.name} from favorites`
                                : `Save ${product.name} to favorites`
                            }
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs inline-flex items-center justify-center text-[#1F1B18] hover:scale-105 transition-transform cursor-pointer"
                          >
                            <span
                              className={`material-symbols-outlined text-[18px] ${
                                isWishlisted ? 'text-[#E59A3C] material-symbols-filled' : 'text-[#6B6056]'
                              }`}
                              aria-hidden="true"
                            >
                              favorite
                            </span>
                          </button>
                        </div>

                        <div className="flex flex-col gap-0.5 px-0.5">
                          <h3 className="font-title text-[14px] sm:text-[15px] leading-[20px] font-bold text-[#1F1B18] truncate">
                            {product.name}
                          </h3>
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-[14px] font-medium text-[#1F1B18] tabular-nums">
                              ${product.price.toFixed(2)}
                            </span>
                            <span className="font-label text-[11px] font-bold text-[#6B6056]">
                              {product.volume}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 pt-0.5 text-[12px]">
                            <span className="text-[#E59A3C] tracking-tight" aria-hidden="true">
                              ★★★★★
                            </span>
                            <span className="font-mono text-[12px] text-[#6B6056] tabular-nums">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => handleQuickAdd(e, product)}
                        className="w-full inline-flex items-center justify-center gap-1 min-h-[38px] px-3 rounded-full bg-[#FAF6F1] text-[#1F1B18] border border-[#E2D7CB] font-label text-[12px] font-bold hover:bg-[#C27419] hover:text-white hover:border-[#C27419] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                          {isJustAdded ? 'check' : 'add'}
                        </span>
                        <span>
                          {isJustAdded ? 'Added' : bagQty > 0 ? `In Bag (${bagQty})` : 'Add to Bag'}
                        </span>
                      </button>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-center text-center gap-3 p-8 rounded-[20px] bg-[#EFE5D8] border border-[#E2D7CB]">
                <span className="material-symbols-outlined text-[28px] text-[#E59A3C]" aria-hidden="true">
                  search_off
                </span>
                <p className="font-body text-[15px] text-[#1F1B18]">
                  No formulas match that exact filter combination yet.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('All');
                    setActiveSkin('all');
                    setActiveBudget('all');
                    setShowAllProducts(true);
                  }}
                  className="min-h-[42px] px-5 rounded-full bg-[#C27419] text-white font-label text-[13px] font-bold hover:bg-[#A66010] transition-colors cursor-pointer"
                >
                  Show All Formulas
                </button>
              </div>
            )}
          </section>

          {/* Sourcing Transparency Section */}
          <section
            aria-labelledby="sourcing-heading"
            className="flex flex-col gap-4 p-5 rounded-[22px] bg-[#EFE5D8] border border-[#E2D7CB]"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[22px] text-[#E59A3C]" aria-hidden="true">
                verified_user
              </span>
              <h2 id="sourcing-heading" className="font-headline text-[18px] font-bold text-[#1F1B18]">
                Our Sourcing Guarantee
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-start gap-3 p-4 rounded-[16px] bg-white border border-[#E2D7CB]">
                <span className="material-symbols-outlined text-[20px] text-[#E59A3C] shrink-0 mt-0.5" aria-hidden="true">
                  factory
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-title text-[15px] font-bold text-[#1F1B18]">
                    Direct Seoul Lab Partnerships
                  </span>
                  <span className="font-body text-[13px] text-[#6B6056]">
                    Shipped directly from verified Korean manufacturers with sealed batch-code tracking.
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-[16px] bg-white border border-[#E2D7CB]">
                <span className="material-symbols-outlined text-[20px] text-[#E59A3C] shrink-0 mt-0.5" aria-hidden="true">
                  verified
                </span>
                <div className="flex flex-col gap-0.5">
                  <span className="font-title text-[15px] font-bold text-[#1F1B18]">
                    Freshness-Dated Inventory
                  </span>
                  <span className="font-body text-[13px] text-[#6B6056]">
                    Climate-controlled storage for potent, gentle daily actives.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Mobile Floating Centered Pill Navigation matching middle screen in UI */}
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-[#E2D7CB]"
      >
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Home"
          className="w-11 h-11 rounded-full inline-flex items-center justify-center text-[#1F1B18] hover:bg-[#FAF6F1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined material-symbols-filled text-[22px]" aria-hidden="true">
            home
          </span>
        </button>
        <button
          type="button"
          onClick={onStartAssessment}
          aria-label="Start AI Skin Scan"
          className="w-12 h-12 rounded-full bg-[#E59A3C] text-[#1F1B18] inline-flex items-center justify-center shadow-md hover:bg-[#D4882A] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
            center_focus_strong
          </span>
        </button>
        <button
          type="button"
          onClick={onOpenCheckout}
          aria-label="Checkout"
          className="w-11 h-11 rounded-full inline-flex items-center justify-center text-[#6B6056] hover:text-[#1F1B18] hover:bg-[#FAF6F1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
            shopping_bag
          </span>
        </button>
      </nav>
    </div>
  );
};
