'use client';

type EventName =
  | 'page_view'
  | 'product_view'
  | 'product_list_view'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'sign_up'
  | 'login'
  | 'contact_form_submit';

interface EventProperties {
  [key: string]: string | number | boolean | string[] | number[] | undefined;
}

const isDev = process.env.NODE_ENV === 'development';

export function track(eventName: EventName, properties?: EventProperties): void {
  if (isDev) {
    console.log(`[Analytics] ${eventName}`, properties);
    return;
  }

  try {
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as unknown as Record<string, unknown>).gtag('event', eventName, properties);
    }
    if (typeof window !== 'undefined' && 'fbq' in window) {
      (window as unknown as Record<string, unknown>).fbq('track', eventName, properties);
    }
  } catch {
    // Silently fail in production
  }
}

export function trackPageView(url: string, title?: string): void {
  track('page_view', { page_path: url, page_title: title });
}

export function trackProductView(productId: string, productName: string, category?: string): void {
  track('product_view', { product_id: productId, product_name: productName, category });
}

export function trackAddToCart(
  productId: string,
  productName: string,
  quantity: number,
  price: number,
): void {
  track('add_to_cart', {
    product_id: productId,
    product_name: productName,
    quantity,
    price,
  });
}

export function trackRemoveFromCart(productId: string, productName: string): void {
  track('remove_from_cart', { product_id: productId, product_name: productName });
}

export function trackBeginCheckout(total: number): void {
  track('begin_checkout', { value: total, currency: 'MAD' });
}

export function trackPurchase(
  transactionId: string,
  total: number,
  productIds: string[],
): void {
  track('purchase', {
    transaction_id: transactionId,
    value: total,
    currency: 'MAD',
    items: productIds,
  });
}

export function trackSearch(query: string): void {
  track('search', { search_term: query });
}
