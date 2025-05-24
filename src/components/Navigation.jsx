import { Link, useLocation } from "react-router-dom"
import { Home, Menu, ShoppingCart, User } from 'lucide-react'
import { useCart } from "../context/CartContext"

export default function Navigation() {
  const location = useLocation()
  const { getTotalItems } = useCart()

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/menu", icon: Menu, label: "Menu" },
    { href: "/cart", icon: ShoppingCart, label: "Cart" },
    { href: "/profile", icon: User, label: "Profile" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = location.pathname === href
          const isCart = label === "Cart"
          const cartCount = getTotalItems()

          return (
            <Link
              key={href}
              to={href}
              className={`flex flex-col items-center py-2 px-3 relative ${
                isActive ? "text-orange-500" : "text-gray-500"
              }`}
            >
              <div className="relative">
                <Icon size={24} />
                {isCart && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-xs mt-1">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
