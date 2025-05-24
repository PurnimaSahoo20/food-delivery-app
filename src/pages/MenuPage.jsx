import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { Filter, Grid, List } from 'lucide-react'
import FoodCard from "../components/FoodCard"
import Button from "../components/Button"
import { useCart } from "../context/CartContext"
import { categories, foodItems } from "../data/mockData"

export default function MenuPage() {
  const [searchParams] = useSearchParams()
  const [filteredItems, setFilteredItems] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "all")
  const [viewMode, setViewMode] = useState("grid")
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      if (selectedCategory === "all") {
        setFilteredItems(foodItems)
      } else {
        setFilteredItems(foodItems.filter((item) => item.category === selectedCategory))
      }
      setLoading(false)
    }, 500)
  }, [selectedCategory])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    setLoading(true)
  }

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-12 bg-gray-300 rounded mb-4"></div>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold mb-4">Menu</h1>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Button
              variant={viewMode === "grid" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid size={16} />
            </Button>
            <Button
              variant={viewMode === "list" ? "primary" : "secondary"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List size={16} />
            </Button>
          </div>
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="p-4 bg-white border-b">
        <div className="flex space-x-2 overflow-x-auto">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === "all" ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.slug)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category.slug ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Food Items */}
      <div className="p-4">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items found in this category</p>
          </div>
        ) : (
          <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}>
            {filteredItems.map((item) =>
              viewMode === "grid" ? (
                <FoodCard key={item.id} item={item} />
              ) : (
                <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
                  <div className="relative w-20 h-20">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
                      <Button size="sm" onClick={() => addToCart(item)}>Add to Cart</Button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  )
}
