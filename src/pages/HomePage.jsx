import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Star } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import FoodCard from "../components/FoodCard";
import Button from "../components/Button";
import { categories, foodItems } from "../data/mockData";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleShopNow = () => {
    navigate("/menu");
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFeaturedItems(foodItems.filter((item) => item.featured));
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <div className="animate-pulse">
          <div className="h-48 bg-gray-300 rounded-lg mb-6"></div>
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Foodie Express
            </h1>
            <p className="text-gray-600">Deliver to your doorstep</p>
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold">F</span>
          </div>
        </div>

        {/* Search Bar */}
        <SearchBar placeholder="Search for food..." />
      </div>

      {/* Banner Section */}
      <div
        className="relative object-cover w-full h-[60vh] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('/images/banner/img2.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
          <h1 className="text-4xl font-bold mb-4">
            Delicious Food Delivered Fast
          </h1>
          <p className="text-lg mb-6 max-w-xl">
            Get your favorite meals delivered to your door in minutes. Fresh,
            hot, and tasty!
          </p>
          <button
            onClick={handleShopNow}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
          Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* Featured Items */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
            Featured Items
          </h2>
          <Link to="/menu" className="text-orange-500 font-medium">
            See All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {featuredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Popular Near You */}
      <div className="p-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-4 tracking-tight">
          Popular Near You
        </h2>
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-3">
          {featuredItems.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
            >
              <div className="relative w-16 h-16">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">
                    4.5 (120 reviews)
                  </span>
                </div>
                <p className="text-orange-500 font-bold">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
