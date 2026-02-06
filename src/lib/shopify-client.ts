import Client from 'shopify-buy';

// Using the shopify-specific domain is often more reliable for API calls
const domain = '92542c-b5.myshopify.com';

// Public Storefront Access Token found on live site
const storefrontAccessToken = (import.meta as any).env?.VITE_SHOPIFY_STOREFRONT_TOKEN || '04c58a7586c413051625b8a9aedd0416';

if (!storefrontAccessToken) {
  console.warn('⚠️ Shopify Storefront Access Token is missing.');
}

export const shopifyClient = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion: '2024-01'
});

/**
 * Validates a product to ensure it has necessary assets (Data Hygiene).
 * - Must have at least 1 image.
 * - Must have variants.
 */
function validateProduct(product: any) {
  if (!product) return false;
  const hasImages = product.images && product.images.length > 0;
  const hasVariants = product.variants && product.variants.length > 0;
  return hasImages && hasVariants;
}

/**
 * Fetches products that match ALL provided tags (Intersection).
 * This enables Granular SEO Collections (e.g. "Recovery" + "Stage 2").
 */
/**
 * Fetches products that match ALL provided tags (Intersection).
 * This enables Granular SEO Collections (e.g. "Recovery" + "Stage 2").
 */
export async function fetchProductsByTags(tags: string[], lang: 'es' | 'en' = 'es') {
  // Construct Query: tag:A AND tag:B
  const queryTags = tags.map(t => `tag:${t}`).join(' AND ');

  // Safety check
  if (!queryTags) return [];

  const languageCode = lang.toUpperCase(); // 'ES' or 'EN'

  const query = `
    query getProductsByTags($query: String!, $language: LanguageCode!) @inContext(language: $language) {
      products(first: 50, sortKey: BEST_SELLING, query: $query) {
        edges {
          node {
            id
            title
            handle
            productType
            descriptionHtml
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                  }
                  image {
                    url
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { query: queryTags, language: languageCode }
      })
    });

    const json = await response.json();

    if (!json.data || !json.data.products) {
      console.error("Invalid Shopify Response for Tags:", json);
      return [];
    }

    const rawProducts = json.data.products.edges.map((edge: any) => edge.node);

    // Normalize
    const normalized = rawProducts.map((p: any) => ({
      ...p,
      images: p.images?.edges ? p.images.edges.map((e: any) => e.node) : (p.images || []),
      variants: p.variants?.edges ? p.variants.edges.map((e: any) => e.node) : (p.variants || [])
    }));

    return normalized.filter(validateProduct);
  } catch (error) {
    console.error("Error fetching granular products:", error);
    return [];
  }
}

/**
 * Fetches products using a raw Shopify Search Query.
 * Useful for Title searches when tags are missing (e.g. "title:Postparto")
 */
export async function fetchProductsByQuery(queryString: string, lang: 'es' | 'en' = 'es') {
  if (!queryString) return [];

  const languageCode = lang.toUpperCase();

  const query = `
    query getProductsByQuery($query: String!, $language: LanguageCode!) @inContext(language: $language) {
      products(first: 50, sortKey: BEST_SELLING, query: $query) {
        edges {
          node {
            id
            title
            handle
            productType
            descriptionHtml
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                  altText
                }
              }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price {
                    amount
                  }
                  image {
                    url
                  }
                  selectedOptions {
                    name
                    value
                  }
                }
              }
            }
            options {
              name
              values
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { query: queryString, language: languageCode }
      })
    });
    // ... rest of function logic remains same logic but updated fetch body
    const json = await response.json();

    if (!json.data || !json.data.products) {
      console.error("Invalid Shopify Response for Query:", json);
      return [];
    }

    const rawProducts = json.data.products.edges.map((edge: any) => edge.node);

    // Normalize
    const normalized = rawProducts.map((p: any) => ({
      ...p,
      images: p.images?.edges ? p.images.edges.map((e: any) => e.node) : (p.images || []),
      variants: p.variants?.edges ? p.variants.edges.map((e: any) => e.node) : (p.variants || [])
    }));

    return normalized.filter(validateProduct);
  } catch (error) {
    console.error("Error fetching query products:", error);
    return [];
  }
}

/**
 * Fetches all products (up to 250) for the 'View All' page.
 * Applies strict data hygiene.
 */
/**
 * Fetches all products (up to 250) for the 'View All' page.
 * Applies strict data hygiene.
 */
export async function fetchAllProducts(lang: 'es' | 'en' = 'es') {
  try {
    const languageCode = lang.toUpperCase();
    const query = `
          query getAllProducts($language: LanguageCode!) @inContext(language: $language) {
            products(first: 250, sortKey: BEST_SELLING) {
              edges {
                node {
                  id
                  title
                  handle
                  productType
                  descriptionHtml
                  tags
                  availableForSale
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 5) {
                    edges {
                      node {
                        url
                        altText
                      }
                    }
                  }
                  variants(first: 10) {
                    edges {
                      node {
                        id
                        title
                        availableForSale
                        price {
                          amount
                        }
                        image {
                          url
                        }
                        selectedOptions {
                          name
                          value
                        }
                      }
                    }
                  }
                  options {
                    name
                    values
                  }
                }
              }
            }
          }
        `;

    // USE RAW FETCH - SDK is being problematic with custom fields
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { language: languageCode }
      })
    });

    const json = await response.json();

    if (!json.data || !json.data.products) {
      console.error("Invalid Shopify Response:", json);
      return [];
    }

    const rawProducts = json.data.products.edges.map((edge: any) => edge.node);

    // Normalize for Mapper (flatten edges if needed, though raw fetch usually gives clean extractions)
    const normalized = rawProducts.map((p: any) => ({
      ...p,
      // Ensure images/variants are arrays of nodes if they came back as edges
      images: p.images?.edges ? p.images.edges.map((e: any) => e.node) : (p.images || []),
      variants: p.variants?.edges ? p.variants.edges.map((e: any) => e.node) : (p.variants || [])
    }));

    return normalized.filter(validateProduct);

  } catch (error) {
    console.error("Error fetching all products (Raw Fetch):", error);
    return [];
  }
}

/**
 * Fetches products for a specific collection handle.
 * Applies data hygiene (validates images/variants).
 */
export async function fetchCollectionByHandle(handle: string, strict = true, lang: 'es' | 'en' = 'es') {
  if (!handle) return [];

  const languageCode = lang.toUpperCase();

  const query = `
    query getCollection($handle: String!, $language: LanguageCode!) @inContext(language: $language) {
      collectionByHandle(handle: $handle) {
        products(first: 250, sortKey: BEST_SELLING) {
          edges {
            node {
              id
              title
              handle
              productType
              descriptionHtml
              tags
              availableForSale
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
              }
              images(first: 5) {
                edges {
                  node {
                    url
                    altText
                  }
                }
              }
              variants(first: 10) {
                edges {
                  node {
                    id
                    title
                    availableForSale
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
              options {
                name
                values
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { handle, language: languageCode }
      })
    });

    const json = await response.json();

    if (!json.data || !json.data.collectionByHandle || !json.data.collectionByHandle.products) {
      console.error(`Invalid Shopify Response for Collection ${handle}:`, json);
      return [];
    }

    const rawProducts = json.data.collectionByHandle.products.edges.map((edge: any) => edge.node);

    // Normalize
    const normalized = rawProducts.map((p: any) => ({
      ...p,
      // Ensure images/variants are arrays of nodes if they came back as edges
      images: p.images?.edges ? p.images.edges.map((e: any) => e.node) : (p.images || []),
      variants: p.variants?.edges ? p.variants.edges.map((e: any) => e.node) : (p.variants || [])
    }));

    return strict ? normalized.filter(validateProduct) : normalized;

  } catch (error) {
    console.error(`Error fetching collection ${handle}:`, error);
    return [];
  }
}

/**
 * --- CART API HELPERS ---
 * Replacing deprecated checkout API with new Cart API
 */

// Helper to fix checkout URL (headless domain -> myshopify domain)
function normalizeCart(cart: any) {
  if (!cart) return null;
  if (cart.checkoutUrl && cart.checkoutUrl.includes('fajasguitarcurves.com')) {
    cart.checkoutUrl = cart.checkoutUrl.replace('fajasguitarcurves.com', domain);
  }
  return cart;
}

export async function createCart() {
  const query = `
    mutation cartCreate {
      cartCreate(input: {}) {
        cart {
          id
          checkoutUrl
          lines(first: 10) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      id
                      title
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({ query })
    });

    const json = await response.json();
    if (json.data?.cartCreate?.cart) {
      return normalizeCart(json.data.cartCreate.cart);
    }
    throw new Error(JSON.stringify(json.errors || json));
  } catch (e) {
    console.error('Error creating cart:', e);
    throw e;
  }
}

export async function fetchCart(cartId: string) {
  const query = `
    query getCart($cartId: ID!) {
      cart(id: $cartId) {
        id
        checkoutUrl
        lines(first: 50) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                  }
                  image {
                    url
                  }
                  product {
                    id
                    title
                  }
                  selectedOptions {
                      name
                      value
                  }
                }
              }
              attributes {
                key
                value
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { cartId }
      })
    });

    const json = await response.json();
    return normalizeCart(json.data?.cart);
  } catch (e) {
    console.error('Error fetching cart:', e);
    return null;
  }
}

export async function addToCart(cartId: string, lines: { merchandiseId: string, quantity: number, attributes?: { key: string, value: string }[] }[]) {
  const query = `
    mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      id
                      title
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
                attributes {
                  key
                  value
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { cartId, lines }
      })
    });

    const json = await response.json();
    if (json.data?.cartLinesAdd?.cart) {
      return normalizeCart(json.data.cartLinesAdd.cart);
    }
    throw new Error(JSON.stringify(json.data?.cartLinesAdd?.userErrors || json.errors));
  } catch (e) {
    console.error('Error adding to cart:', e);
    throw e;
  }
}

export async function removeFromCart(cartId: string, lineIds: string[]) {
  const query = `
    mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
        cart {
          id
          checkoutUrl
          lines(first: 50) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    price {
                      amount
                    }
                    image {
                      url
                    }
                    product {
                      id
                      title
                    }
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { cartId, lineIds }
      })
    });

    const json = await response.json();
    if (json.data?.cartLinesRemove?.cart) {
      return normalizeCart(json.data.cartLinesRemove.cart);
    }
    throw new Error(JSON.stringify(json.data?.cartLinesRemove?.userErrors || json.errors));
  } catch (e) {
    console.error('Error removing from cart:', e);
    throw e;
  }
}

export async function updateCartLines(cartId: string, lines: { id: string, quantity: number }[]) {
  const query = `
    mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
            id
            checkoutUrl
            lines(first: 50) {
                edges {
                node {
                    id
                    quantity
                    merchandise {
                    ... on ProductVariant {
                        id
                        title
                        price {
                        amount
                        }
                        image {
                        url
                        }
                        product {
                        id
                        title
                        }
                        selectedOptions {
                        name
                        value
                        }
                    }
                    }
                }
                }
            }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  try {
    const response = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken
      },
      body: JSON.stringify({
        query,
        variables: { cartId, lines }
      })
    });

    const json = await response.json();
    if (json.data?.cartLinesUpdate?.cart) {
      return normalizeCart(json.data.cartLinesUpdate.cart);
    }
    throw new Error(JSON.stringify(json.data?.cartLinesUpdate?.userErrors || json.errors));
  } catch (e) {
    console.error('Error updating cart lines:', e);
    throw e;
  }
}
