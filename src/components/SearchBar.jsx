"use client"

import { useState, useEffect, useRef } from "react"
import { Search, X, Clock } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { foodItems } from "../data/mockData"

export default function SearchBar({ onSearch, placeholder = "Search for food..." }) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [recentSearches, setRecentSearches] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef(null)
  const navigate = useNavigate()

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches")
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  // Generate suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true)

      // Simulate API delay
      const timer = setTimeout(() => {
        const filtered = foodItems
          .filter(
            (item) =>
              item.name.toLowerCase().includes(query.toLowerCase()) ||
              item.description.toLowerCase().includes(query.toLowerCase()) ||
              item.category.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 5)

        setSuggestions(filtered)
        setIsLoading(false)
      }, 300)

      return () => clearTimeout(timer)
    } else {
      setSuggestions([])
      setIsLoading(false)
    }
  }, [query])

  // Handle search submission
  const handleSearch = (searchQuery = query) => {
    if (searchQuery.trim()) {
      // Save to recent searches
      const newRecentSearches = [searchQuery, ...recentSearches.filter((item) => item !== searchQuery)].slice(0, 5)

      setRecentSearches(newRecentSearches)
      localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches))

      // Perform search
      if (onSearch) {
        onSearch(searchQuery)
      } else {
        // Navigate to menu with search query
        navigate(`/menu?search=${encodeURIComponent(searchQuery)}`)
      }

      setShowSuggestions(false)
      setQuery(searchQuery)
    }
  }

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setShowSuggestions(true)
  }

  // Handle suggestion click
  const handleSuggestionClick = (item) => {
    handleSearch(item.name)
  }

  // Handle recent search click
  const handleRecentSearchClick = (search) => {
    handleSearch(search)
  }

  // Clear search
  const clearSearch = () => {
    setQuery("")
    setSuggestions([])
    setShowSuggestions(false)
    if (onSearch) {
      onSearch("")
    }
  }

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-full" ref={searchRef}>
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          placeholder={placeholder}
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-96 overflow-y-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="p-4 text-center">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-sm text-gray-500 mt-2">Searching...</p>
            </div>
          )}

          {/* Recent Searches */}
          {!isLoading && query === "" && recentSearches.length > 0 && (
            <div className="p-2">
              <p className="text-sm font-medium text-gray-700 px-3 py-2">Recent Searches</p>
              {recentSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => handleRecentSearchClick(search)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-2"
                >
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-700">{search}</span>
                </button>
              ))}
            </div>
          )}

          {/* Search Suggestions */}
          {!isLoading && suggestions.length > 0 && (
            <div className="p-2">
              {query && <p className="text-sm font-medium text-gray-700 px-3 py-2">Suggestions for "{query}"</p>}
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSuggestionClick(item)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded flex items-center space-x-3"
                >
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500 truncate">{item.description}</p>
                    <p className="text-sm font-bold text-orange-500">${item.price.toFixed(2)}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && query && suggestions.length === 0 && (
            <div className="p-4 text-center">
              <p className="text-gray-500">No results found for "{query}"</p>
              <button onClick={() => handleSearch()} className="text-orange-500 text-sm mt-2 hover:underline">
                Search anyway
              </button>
            </div>
          )}

          {/* Quick Search Button */}
          {query && (
            <div className="border-t border-gray-200 p-2">
              <button
                onClick={() => handleSearch()}
                className="w-full px-3 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 flex items-center justify-center space-x-2"
              >
                <Search size={16} />
                <span>Search for "{query}"</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
