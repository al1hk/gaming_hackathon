import type { Metadata } from "next";
import { Orbitron, Poppins } from "next/font/google";
import "./globals.css";
import { SearchProvider } from "./context/SearchContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/Header";
import { client } from "@/sanity/lib/client";
import Footer from "./components/Footer";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Gaming Hackathon",
  description: "Gaming Hackathon Project",
};

async function getProducts() {
  const query = `*[_type == "product"] {
    _id,
    name,
    price,
    discountPercentage,
    "imageUrl": image.asset->url,
    "slug": slug.current,
  }`;
  return client.fetch(query);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const products = await getProducts();

  return (
    <html lang="en">
      <body
        className={`${orbitron.variable} ${poppins.variable} font-poppins antialiased`}
      >
        <SearchProvider>
          <CartProvider>
            <WishlistProvider>
              
              {children}
            </WishlistProvider>
          </CartProvider>
        </SearchProvider>
        <Footer />
      </body>
    </html>
  );
}
