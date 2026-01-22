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
export async function fetchProductsByTags(tags: string[]) {
  // Construct Query: tag:A AND tag:B
  const queryTags = tags.map(t => `tag:${t}`).join(' AND ');

  // Safety check
  if (!queryTags) return [];

  const query = `
    {
      products(first: 50, sortKey: BEST_SELLING, query: "${queryTags}") {
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
      body: JSON.stringify({ query })
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
export async function fetchProductsByQuery(queryString: string) {
  if (!queryString) return [];

  const query = `
    {
      products(first: 50, sortKey: BEST_SELLING, query: "${queryString}") {
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
      body: JSON.stringify({ query })
    });

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
export async function fetchAllProducts() {
  try {
    const query = `
          {
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
      body: JSON.stringify({ query })
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
export async function fetchCollectionByHandle(handle: string, strict = true) {
  if (!handle) return [];

  const query = `
    query getCollection($handle: String!) {
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
        variables: { handle }
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
