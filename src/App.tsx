import { useState } from 'react';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { HomeView } from './components/HomeView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SkinAssessmentView } from './components/SkinAssessmentView';
import { WelcomeView } from './components/WelcomeView';
import { Product, TRENDING_PRODUCTS } from './data/skincareData';

type AppScreen = 'welcome' | 'home' | 'assessment' | 'checkout';

const INITIAL_CART: CartItem[] = [
  { product: TRENDING_PRODUCTS[0], quantity: 1 },
  { product: TRENDING_PRODUCTS[1], quantity: 1 },
];

export default function App() {
  const [activeScreen, setActiveScreen] = useState<AppScreen>('welcome');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['mucin-repair-essence']);
  const [inspectedProduct, setInspectedProduct] = useState<Product | null>(null);
  const [isBagOpen, setIsBagOpen] = useState(false);

  const navigateTo = (screen: AppScreen) => {
    setActiveScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleAddRoutineAndCheckout = (products: Product[]) => {
    setCartItems(products.map((product) => ({ product, quantity: 1 })));
    navigateTo('checkout');
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const inspectedQty = inspectedProduct
    ? cartItems.find((item) => item.product.id === inspectedProduct.id)?.quantity || 0
    : 0;

  return (
    <>
      {activeScreen === 'welcome' && (
        <WelcomeView
          onStartJourney={() => navigateTo('home')}
          onStartSkinScan={() => navigateTo('assessment')}
        />
      )}

      {activeScreen === 'home' && (
        <HomeView
          cartItems={cartItems}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onStartAssessment={() => navigateTo('assessment')}
          onOpenWelcome={() => navigateTo('welcome')}
          onOpenCheckout={() => navigateTo('checkout')}
          onOpenBagDrawer={() => setIsBagOpen(true)}
          onAddToCart={handleAddToCart}
          onInspectProduct={(product) => setInspectedProduct(product)}
        />
      )}

      {activeScreen === 'assessment' && (
        <SkinAssessmentView
          onBackToHome={() => navigateTo('home')}
          onAddRoutineToCartAndCheckout={handleAddRoutineAndCheckout}
        />
      )}

      {activeScreen === 'checkout' && (
        <CheckoutView
          items={cartItems}
          onBack={() => navigateTo('home')}
          onUpdateQty={handleUpdateQty}
          onOrderComplete={handleOrderComplete}
        />
      )}

      <ProductDetailModal
        product={inspectedProduct}
        cartQuantity={inspectedQty}
        onClose={() => setInspectedProduct(null)}
        onAddToBag={handleAddToCart}
        onOpenCheckout={() => navigateTo('checkout')}
      />

      <CartDrawer
        isOpen={isBagOpen}
        items={cartItems}
        onClose={() => setIsBagOpen(false)}
        onUpdateQty={handleUpdateQty}
        onProceedToCheckout={() => navigateTo('checkout')}
      />
    </>
  );
}
