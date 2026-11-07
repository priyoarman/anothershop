import products from "./products.js";

const productsById = new Map(products.map((product) => [product.id, product]));

export function getCheckoutProduct(productId) {
  return productsById.get(Number(productId));
}

export function getPriceCents(price) {
  return Math.round(Number(price) * 100);
}
