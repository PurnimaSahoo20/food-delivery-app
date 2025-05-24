import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from "../context/CartContext"
import Button from "../components/Button"
import Card from "../components/Card"

export default function CartPage() {
  const navigate = useNavigate()
  const { cart, updateQuantity, removeFromCart, getTotalPrice, clearCart } = useCart()
  const [isClearing, setIsClearing] = useState(false)

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleClearCart = () => {
    setIsClearing(true)
    setTimeout(() => {
      clearCart()
      setIsClearing(false)
    }, 500)
  }

  const handleCheckout = () => {
    navigate("/checkout")
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some delicious items to get started!</p>
          <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <Button variant="outline" size="sm" onClick={handleClearCart} disabled={isClearing}>
            <Trash2 size={16} className="mr-2" />
            {isClearing ? "Clearing..." : "Clear All"}
          </Button>
        </div>
        <p className="text-gray-600 mt-1">{cart.items.length} items in your cart</p>
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4">
        {cart.items.map((item) => (
          <Card key={item.id} className="p-4">
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                <p className="text-orange-500 font-bold">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-8 text-center font-semibold">{item.quantity}</span>

                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="p-4">
        <Card className="p-4">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$2.99</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${(getTotalPrice() + 2.99 + getTotalPrice() * 0.08).toFixed(2)}</span>
            </div>
          </div>

          <Button className="w-full" size="lg" onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Card>
      </div>
    </div>
  )
}
