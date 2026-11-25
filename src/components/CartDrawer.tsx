import React, { useEffect } from 'react';
import { Product } from '../data/skincareData';
import { ResilientImage } from './ResilientImage';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onProceedToCheckout,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bag-drawer-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-light-surface border-l border-light-outline-variant flex flex-col shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-center justify-between px-6 py-4 border-b border-light-outline-variant">
          <div className="flex items-baseline gap-2">
            <h2 id="bag-drawer-title" className="font-title text-[18px] font-bold text-light-on-surface">
              Your Skincare Bag
            </h2>
            <span className="font-label text-[13px] font-bold text-light-on-surface-variant tabular-nums">
              {totalCount} {totalCount === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close bag"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="my-auto flex flex-col items-center text-center gap-3 p-6 rounded-[20px] bg-pastel-oat border border-light-outline-variant">
              <span className="material-symbols-outlined text-[32px] text-light-primary" aria-hidden="true">
                shopping_bag
              </span>
              <p className="font-body text-[15px] text-light-on-surface">
                Your bag is currently empty.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="min-h-[44px] px-5 rounded-full bg-light-primary text-light-on-primary font-label text-[14px] font-bold hover:bg-light-primary-container transition-colors"
              >
                Explore Formulas
              </button>
            </div>
          ) : (
            items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-[16px] bg-light-surface-container-lowest border border-light-outline-variant"
              >
                <div className="w-16 h-16 shrink-0 rounded-[12px] overflow-hidden bg-pastel-mint border border-light-outline-variant">
                  <ResilientImage src={product.image} alt={product.imageAlt} fallbackLabel={product.name} />
                </div>
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                  <span className="font-title text-[15px] font-bold text-light-on-surface truncate">
                    {product.name}
                  </span>
                  <span className="font-body text-[13px] text-light-on-surface-variant">
                    {product.volume} · <span className="font-mono tabular-nums">${product.price.toFixed(2)}</span>
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, -1)}
                    aria-label={`Decrease quantity of ${product.name}`}
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      remove
                    </span>
                  </button>
                  <span className="w-6 text-center font-mono text-[14px] font-medium tabular-nums">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateQty(product.id, 1)}
                    aria-label={`Increase quantity of ${product.name}`}
                    className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      add
                    </span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <footer className="p-6 border-t border-light-outline-variant bg-light-surface-container-low flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-light-on-surface-variant">Shipping</span>
                <span className="font-label font-bold text-light-primary">Free</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-title text-[16px] font-bold text-light-on-surface">Subtotal</span>
                <span className="font-mono text-[18px] font-medium text-light-on-surface tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-full bg-light-primary text-light-on-primary font-label text-[15px] font-bold hover:bg-light-primary-container transition-colors"
            >
              <span>Proceed to Checkout</span>
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
