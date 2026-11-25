import React, { useState } from 'react';
import { PAYMENT_GATEWAYS, PaymentGatewayId } from '../data/skincareData';
import { CartItem } from './CartDrawer';
import { ResilientImage } from './ResilientImage';

interface CheckoutViewProps {
  items: CartItem[];
  onBack: () => void;
  onUpdateQty: (productId: string, delta: number) => void;
  onOrderComplete: () => void;
}

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  items,
  onBack,
  onUpdateQty,
  onOrderComplete,
}) => {
  const [fullName, setFullName] = useState('Amara Okafor');
  const [address, setAddress] = useState('14 Admiralty Way, Lekki Phase 1');
  const [email, setEmail] = useState('amara@zeezain.co');
  const [selectedGateway, setSelectedGateway] = useState<PaymentGatewayId>('Paystack');
  const [formError, setFormError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<{
    orderNumber: string;
    total: number;
    gateway: PaymentGatewayId;
    name: string;
    address: string;
    email: string;
    snapshot: CartItem[];
  } | null>(null);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const activeGatewayOption =
    PAYMENT_GATEWAYS.find((g) => g.id === selectedGateway) || PAYMENT_GATEWAYS[0];

  const handlePayNow = () => {
    if (items.length === 0) {
      setFormError('Please add at least one product to your bag before checking out.');
      return;
    }
    if (!fullName.trim() || !address.trim() || !email.trim() || !email.includes('@')) {
      setFormError('Please complete your full name, delivery address, and a valid receipt email.');
      return;
    }

    setFormError(null);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setConfirmedOrder({
        orderNumber: 'ZZ-1042',
        total: subtotal,
        gateway: selectedGateway,
        name: fullName.trim(),
        address: address.trim(),
        email: email.trim(),
        snapshot: items.map((i) => ({ ...i })),
      });
      onOrderComplete();
    }, 650);
  };

  return (
    <div className="min-h-screen flex flex-col bg-light-surface">
      {/* Sticky Task Flow Header */}
      <header className="sticky top-0 z-20 bg-light-surface border-b border-light-outline-variant">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-2 px-6 py-4">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to Home"
            className="inline-flex items-center justify-center w-[44px] h-[44px] rounded-full bg-light-surface-container-lowest text-light-on-surface border border-light-outline-variant transition-colors duration-150 hover:bg-light-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
          >
            <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
              arrow_back
            </span>
          </button>
          <h1 className="font-title text-[18px] leading-[24px] font-bold text-light-on-surface whitespace-nowrap">
            Zee Zain Checkout
          </h1>
          <span className="inline-flex items-center gap-1 text-light-primary font-label text-[12px] font-bold whitespace-nowrap">
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              lock
            </span>
            <span>Secure</span>
          </span>
        </div>
      </header>

      {confirmedOrder ? (
        <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-8 flex flex-col gap-6">
          <section className="flex flex-col gap-4 p-6 rounded-[20px] bg-pastel-mint border border-light-outline-variant">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined material-symbols-filled text-[32px] text-light-primary" aria-hidden="true">
                check_circle
              </span>
              <div className="flex flex-col">
                <span className="font-label text-[13px] font-bold text-light-primary">
                  Order #{confirmedOrder.orderNumber} Confirmed
                </span>
                <h2 className="font-headline text-[24px] leading-[30px] font-bold text-on-pastel">
                  Thank you, {confirmedOrder.name}
                </h2>
              </div>
            </div>
            <p className="font-body text-[15px] leading-[22px] text-light-on-surface-variant">
              Your authentic Korean skincare order from Zee Zain is confirmed via {confirmedOrder.gateway} and preparing for shipment to{' '}
              <strong className="font-bold text-light-on-surface">{confirmedOrder.address}</strong>. A receipt has been sent to{' '}
              <span className="text-light-on-surface">{confirmedOrder.email}</span>.
            </p>
          </section>

          <section className="flex flex-col gap-4 p-6 rounded-[20px] bg-light-surface-container-lowest border border-light-outline-variant">
            <div className="flex items-baseline justify-between">
              <h3 className="font-title text-[18px] font-bold text-light-on-surface">
                Order Receipt
              </h3>
              <span className="font-mono text-[14px] font-medium text-light-on-surface-variant tabular-nums">
                #{confirmedOrder.orderNumber}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {confirmedOrder.snapshot.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 shrink-0 rounded-[12px] overflow-hidden bg-pastel-mint border border-light-outline-variant">
                    <ResilientImage src={product.image} alt={product.imageAlt} fallbackLabel={product.name} />
                  </div>
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className="font-title text-[15px] font-bold text-light-on-surface">
                      {product.name}
                    </span>
                    <span className="font-body text-[13px] text-light-on-surface-variant">
                      {product.volume} · Qty {quantity}
                    </span>
                  </div>
                  <span className="font-mono text-[14px] font-medium text-light-on-surface tabular-nums">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-light-outline-variant">
              <span className="font-title text-[16px] font-bold text-light-on-surface">
                Paid Total ({confirmedOrder.gateway})
              </span>
              <span className="font-mono text-[18px] font-medium text-light-on-surface tabular-nums">
                ${confirmedOrder.total.toFixed(2)}
              </span>
            </div>
          </section>

          <button
            type="button"
            onClick={onBack}
            className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-full bg-light-primary text-light-on-primary font-label text-[15px] font-bold hover:bg-light-primary-container transition-colors"
          >
            <span>Continue Exploring Zee Zain</span>
            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
              arrow_forward
            </span>
          </button>
        </main>
      ) : (
        <main className="flex-1 w-full max-w-3xl mx-auto flex flex-col gap-6 px-6 py-6">
          {/* Order Summary */}
          <section
            aria-labelledby="summary-heading"
            className="flex flex-col gap-4 p-5 rounded-[20px] bg-light-surface-container-lowest border border-light-outline-variant"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h2 id="summary-heading" className="font-title text-[18px] leading-[24px] font-bold text-light-on-surface">
                Order Summary
              </h2>
              <span className="font-label text-[13px] font-bold text-light-on-surface-variant tabular-nums">
                {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </span>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-col items-center text-center gap-3 p-6 rounded-[16px] bg-pastel-oat border border-light-outline-variant">
                <p className="font-body text-[15px] text-light-on-surface">
                  Your bag is currently empty.
                </p>
                <button
                  type="button"
                  onClick={onBack}
                  className="min-h-[44px] px-5 rounded-full bg-light-primary text-light-on-primary font-label text-[14px] font-bold hover:bg-light-primary-container transition-colors"
                >
                  Browse Skincare Catalog
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {items.map(({ product, quantity }) => {
                  const thumbBg =
                    product.bgTone === 'mint'
                      ? 'bg-pastel-mint'
                      : product.bgTone === 'blush'
                        ? 'bg-pastel-blush'
                        : 'bg-pastel-oat';

                  return (
                    <div key={product.id} className="flex items-center gap-4">
                      <div className={`w-16 h-16 shrink-0 rounded-[12px] overflow-hidden ${thumbBg} border border-light-outline-variant`}>
                        <ResilientImage src={product.image} alt={product.imageAlt} fallbackLabel={product.name} />
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <span className="font-title text-[16px] leading-[22px] font-bold text-light-on-surface truncate">
                          {product.name}
                        </span>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-body text-[14px] text-light-on-surface-variant">
                            {product.volume} · Qty {quantity}
                          </span>
                          <div className="inline-flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, -1)}
                              aria-label={`Decrease quantity of ${product.name}`}
                              className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors"
                            >
                              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                remove
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => onUpdateQty(product.id, 1)}
                              aria-label={`Increase quantity of ${product.name}`}
                              className="w-7 h-7 inline-flex items-center justify-center rounded-full border border-light-outline-variant text-light-on-surface hover:bg-light-surface-container transition-colors"
                            >
                              <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[14px] font-medium text-light-on-surface tabular-nums">
                        ${(product.price * quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="flex flex-col gap-1.5 pt-3 border-t border-light-outline-variant">
              <div className="flex items-center justify-between">
                <span className="font-body text-[14px] text-light-on-surface-variant">Subtotal</span>
                <span className="font-mono text-[14px] font-medium text-light-on-surface tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-body text-[14px] text-light-on-surface-variant">Shipping</span>
                <span className="font-label text-[13px] font-bold text-light-primary">Free</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="font-title text-[16px] font-bold text-light-on-surface">Total</span>
                <span className="font-title text-[18px] font-bold text-light-on-surface tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Delivery Details */}
            <section aria-labelledby="shipping-heading" className="flex flex-col gap-3">
              <h2 id="shipping-heading" className="font-headline text-[22px] leading-[28px] font-bold text-light-on-surface">
                Delivery Details
              </h2>
              <div className="flex flex-col gap-3 p-5 rounded-[20px] bg-light-surface-container-lowest border border-light-outline-variant">
                <div className="flex flex-col gap-1">
                  <label htmlFor="checkout-name" className="font-label text-[13px] font-bold text-light-on-surface">
                    Full Name
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full min-h-[44px] px-4 rounded-[8px] bg-light-surface border border-light-outline-variant font-body text-[14px] text-light-on-surface focus:outline-none focus:border-light-primary focus:ring-1 focus:ring-light-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="checkout-address" className="font-label text-[13px] font-bold text-light-on-surface">
                    Delivery Address
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full min-h-[44px] px-4 rounded-[8px] bg-light-surface border border-light-outline-variant font-body text-[14px] text-light-on-surface focus:outline-none focus:border-light-primary focus:ring-1 focus:ring-light-primary"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="checkout-email" className="font-label text-[13px] font-bold text-light-on-surface">
                    Receipt Email
                  </label>
                  <input
                    id="checkout-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full min-h-[44px] px-4 rounded-[8px] bg-light-surface border border-light-outline-variant font-body text-[14px] text-light-on-surface focus:outline-none focus:border-light-primary focus:ring-1 focus:ring-light-primary"
                  />
                </div>
              </div>
            </section>

            {/* Payment Gateway Selection */}
            <section aria-labelledby="payment-heading" className="flex flex-col gap-3">
              <h2 id="payment-heading" className="font-headline text-[22px] leading-[28px] font-bold text-light-on-surface">
                Payment Method
              </h2>

              <div className="flex flex-col gap-2.5" role="radiogroup" aria-label="Payment gateway">
                {PAYMENT_GATEWAYS.map((gateway) => {
                  const isSelected = gateway.id === selectedGateway;
                  return (
                    <button
                      key={gateway.id}
                      type="button"
                      onClick={() => setSelectedGateway(gateway.id)}
                      aria-pressed={isSelected}
                      className={`w-full text-left flex items-center justify-between gap-4 min-h-[68px] p-4 rounded-[16px] border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary ${
                        isSelected
                          ? 'bg-pastel-mint border-light-primary'
                          : 'bg-light-surface-container-lowest border-light-outline-variant hover:bg-light-surface-container'
                      }`}
                    >
                      <div className="flex flex-col gap-0.5">
                        <span
                          className={`font-title text-[16px] leading-[22px] font-bold ${
                            isSelected ? 'text-on-pastel' : 'text-light-on-surface'
                          }`}
                        >
                          {gateway.title}
                        </span>
                        <span className="font-body text-[14px] leading-[20px] text-light-on-surface-variant">
                          {gateway.subtitle}
                        </span>
                      </div>
                      <span
                        className={`material-symbols-outlined text-[24px] shrink-0 ${
                          isSelected
                            ? 'text-light-primary material-symbols-filled'
                            : 'text-light-outline'
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected ? 'check_circle' : 'radio_button_unchecked'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Instant Verification Note */}
              <div className="flex items-start gap-2.5 p-4 rounded-[16px] bg-pastel-oat border border-light-outline-variant">
                <span className="material-symbols-outlined text-[20px] text-light-primary shrink-0" aria-hidden="true">
                  verified_user
                </span>
                <p className="font-body text-[14px] leading-[21px] text-on-pastel text-pretty">
                  {activeGatewayOption.verificationNote}
                </p>
              </div>
            </section>
          </div>

          {formError && (
            <div
              role="alert"
              className="flex items-center gap-2 p-4 rounded-[16px] bg-[#FFDAD6] border border-[#BA1A1A] text-[#93000A] font-body text-[14px]"
            >
              <span className="material-symbols-outlined text-[20px] shrink-0" aria-hidden="true">
                error
              </span>
              <span>{formError}</span>
            </div>
          )}

          {/* Primary Pay Action */}
          <footer className="flex flex-col gap-2 pt-2 pb-6">
            <button
              type="button"
              disabled={isProcessing || items.length === 0}
              onClick={handlePayNow}
              className="w-full inline-flex items-center justify-center gap-2 min-h-[52px] px-6 py-3 rounded-full bg-light-primary text-light-on-primary font-label text-[15px] font-bold transition-colors duration-150 hover:bg-light-primary-container disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                lock
              </span>
              <span className="tabular-nums">
                {isProcessing
                  ? `Verifying with ${selectedGateway}...`
                  : `Pay $${subtotal.toFixed(2)} with ${selectedGateway}`}
              </span>
            </button>
            <p className="text-center font-label text-[12px] font-bold text-light-on-surface-variant">
              Encrypted checkout · 30-day gentle skin guarantee
            </p>
          </footer>
        </main>
      )}
    </div>
  );
};
