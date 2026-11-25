import React, { useEffect } from 'react';
import { Product } from '../data/skincareData';
import { ResilientImage } from './ResilientImage';

interface ProductDetailModalProps {
  product: Product | null;
  cartQuantity: number;
  onClose: () => void;
  onAddToBag: (product: Product) => void;
  onOpenCheckout: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  cartQuantity,
  onClose,
  onAddToBag,
  onOpenCheckout,
}) => {
  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  const bgClass =
    product.bgTone === 'mint'
      ? 'bg-pastel-mint'
      : product.bgTone === 'blush'
        ? 'bg-pastel-blush'
        : 'bg-pastel-oat';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/45 backdrop-blur-xs p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-light-surface border border-light-outline-variant rounded-t-[24px] sm:rounded-[24px] overflow-hidden shadow-xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-outline-variant bg-light-surface">
          <div className="flex items-center gap-2 text-[13px] font-label font-bold text-light-on-surface-variant">
            <span>{product.skinLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.volume}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product details"
            className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              close
            </span>
          </button>
        </div>

        <div className="overflow-y-auto p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className={`w-full sm:w-40 aspect-square shrink-0 rounded-[16px] overflow-hidden border border-light-outline-variant ${bgClass}`}>
              <ResilientImage src={product.image} alt={product.imageAlt} fallbackLabel={product.name} />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              {product.certifiedAuthentic && (
                <div className="inline-flex items-center gap-1 text-[12px] font-label font-bold text-light-primary">
                  <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                    verified
                  </span>
                  <span>Certified Authentic</span>
                </div>
              )}
              <h2
                id="product-modal-title"
                className="font-headline text-[24px] leading-[30px] font-bold text-light-on-surface"
              >
                {product.name}
              </h2>
              <p className="font-mono text-[18px] font-medium text-light-on-surface tabular-nums">
                ${product.price.toFixed(2)}
              </p>
              <p className="font-body text-[15px] leading-[22px] text-light-on-surface-variant">
                {product.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-light-outline-variant">
            <div>
              <h3 className="font-label text-[13px] font-bold text-light-on-surface mb-1">
                Key Botanical &amp; Barrier Ingredients
              </h3>
              <p className="font-body text-[14px] text-light-on-surface-variant">
                {product.keyIngredients.join(' · ')}
              </p>
            </div>
            <div>
              <h3 className="font-label text-[13px] font-bold text-light-on-surface mb-1">
                How to Apply
              </h3>
              <p className="font-body text-[14px] text-light-on-surface-variant">
                {product.howToUse}
              </p>
            </div>
            <div className="flex items-center gap-2 text-[13px] font-label font-bold text-light-primary pt-1">
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                verified_user
              </span>
              <span>{product.origin}</span>
            </div>
          </div>
        </div>

        <div className="p-6 pt-4 border-t border-light-outline-variant bg-light-surface-container-low flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => onAddToBag(product)}
            className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-full bg-light-primary text-light-on-primary font-label text-[15px] font-bold hover:bg-light-primary-container transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
          >
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              add_shopping_cart
            </span>
            <span>{cartQuantity > 0 ? `Add Another (${cartQuantity} in Bag)` : 'Add to Bag'}</span>
          </button>
          {cartQuantity > 0 && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-5 py-2.5 rounded-full bg-light-surface-container-lowest border border-light-outline-variant text-light-on-surface font-label text-[15px] font-bold hover:bg-light-surface-container transition-colors whitespace-nowrap"
            >
              <span>Checkout</span>
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                arrow_forward
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
