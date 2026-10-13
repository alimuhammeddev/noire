"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductGrid } from "@/components/site";
import { products } from "@/lib/products";

const categories = ["All Pieces", "New Arrivals", "Clothing", "Outerwear", "Knitwear", "Accessories"];

export default function CollectionsPage() {
  return (
    <Suspense fallback={null}>
      <Collection />
    </Suspense>
  );
}

function Collection() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [category, setCategory] = useState("All Pieces");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("featured");
  const [search, setSearch] = useState(urlSearch);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const activeCount = [size, color, maxPrice, search].filter(Boolean).length;

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  const filtered = useMemo(() => {
    const result = products.filter((product) => {
      const categoryMatch =
        category === "All Pieces" ||
        (category === "New Arrivals" ? product.isNew : product.category === category);
      const searchMatch = `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(search.toLowerCase());
      return (
        categoryMatch &&
        searchMatch &&
        (!size || product.sizes.includes(size)) &&
        (!color || product.colors.includes(color)) &&
        (!maxPrice || product.price <= Number(maxPrice))
      );
    });
    if (sort === "newest") return result.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    if (sort === "low") return result.sort((a, b) => a.price - b.price);
    if (sort === "high") return result.sort((a, b) => b.price - a.price);
    return result.sort((a, b) => Number(b.featured) - Number(a.featured));
  }, [category, size, color, maxPrice, sort, search]);

  function clearFilters() {
    setCategory("All Pieces");
    setSize("");
    setColor("");
    setMaxPrice("");
    setSort("featured");
    setSearch("");
  }

  return (
    <>
      <section className="page-intro">
        <span className="eyebrow">NOIRÉ / 01</span>
        <h1 className="page-title">The Collection</h1>
        <p>An evolving wardrobe of considered essentials, refined tailoring, and everyday pieces.</p>
      </section>
      <div className="collection-toolbar">
        <nav className="category-nav" aria-label="Collection categories">
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)} aria-pressed={category === item}>{item}</button>)}
        </nav>
        <label className="sort-control"><span className="sort-label">Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option><option value="newest">Newest</option><option value="low">Price: Low to High</option><option value="high">Price: High to Low</option>
          </select>
        </label>
        <button className="filter-toggle" aria-expanded={filtersOpen} aria-controls="filter-panel" onClick={() => setFiltersOpen(!filtersOpen)}>Filters{activeCount > 0 && ` (${activeCount})`}<span aria-hidden="true">{filtersOpen ? "−" : "+"}</span></button>
      </div>
      <section className="collection-body">
        <p className="sr-only" aria-live="polite">{filtered.length} {filtered.length === 1 ? "piece" : "pieces"} shown</p>
        <div id="filter-panel" className={`filter-row${filtersOpen ? " open" : ""}`} aria-label="Product filters">
          <label className="collection-search">Search <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or category" /></label>
          <label>Size <select value={size} onChange={(event) => setSize(event.target.value)}><option value="">All sizes</option>{["XS", "S", "M", "L", "XL", "One size"].map((option) => <option key={option}>{option}</option>)}</select></label>
          <label>Color <select value={color} onChange={(event) => setColor(event.target.value)}><option value="">All colors</option>{Array.from(new Set(products.flatMap((product) => product.colors))).sort().map((option) => <option key={option}>{option}</option>)}</select></label>
          <label>Maximum price <select value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)}><option value="">Any price</option><option value="100">Up to $100</option><option value="150">Up to $150</option><option value="200">Up to $200</option></select></label>
          {(size || color || maxPrice || search || category !== "All Pieces") && <button className="clear-filters" onClick={clearFilters}>Clear filters</button>}
        </div>
        {filtered.length ? <ProductGrid items={filtered} /> : <div className="empty-state"><h2>No pieces found</h2><p>Try adjusting your filters to discover more of the collection.</p><button className="text-link" onClick={clearFilters}>Clear filters <span>→</span></button></div>}
      </section>
    </>
  );
}
