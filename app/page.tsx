import type { Product } from "@/lib/types"
import ProductList from "./components/ProductList"

async function getProducts(): Promise<Product[]> {
  // Alterado de 'http://localhost:3000/api/products' para '/api/products'
  const res = await fetch("/api/products", { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
  return res.json()
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      <ProductList products={products} />
    </main>
  )
}
