import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MapPin, Phone, User, CreditCard, Clock } from 'lucide-react'
import { useCart } from "../context/CartContext"
import Button from "../components/Button"
import Card from "../components/Card"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, getTotalPrice, clearCart } = useCart()
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    paymentMethod: "card",
    deliveryTime: "asap",
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handlePlaceOrder = async (e) => {
    e.preventDefault()
    setIsPlacingOrder(true)

    // Simulate order placement
    setTimeout(() => {
      clearCart()
      setIsPlacingOrder(false)
      navigate("/order-success")
    }, 2000)
  }

  const totalAmount = getTotalPrice() + 2.99 + getTotalPrice() * 0.08

  if (cart.items.length === 0) {
    navigate("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-gray-600">Complete your order</p>
      </div>

      <form onSubmit={handlePlaceOrder} className="p-4 space-y-6">
        {/* Delivery Information */}
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <MapPin className="mr-2" size={20} />
            Delivery Information
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter your complete address"
                rows="3"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="City"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="ZIP"
                  required
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Delivery Time */}
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <Clock className="mr-2" size={20} />
            Delivery Time
          </h2>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryTime"
                value="asap"
                checked={formData.deliveryTime === "asap"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>As soon as possible (30-45 mins)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="deliveryTime"
                value="scheduled"
                checked={formData.deliveryTime === "scheduled"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>Schedule for later</span>
            </label>
          </div>
        </Card>

        {/* Payment Method */}
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-4 flex items-center">
            <CreditCard className="mr-2" size={20} />
            Payment Method
          </h2>

          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={formData.paymentMethod === "card"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>Credit/Debit Card</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={formData.paymentMethod === "cash"}
                onChange={handleInputChange}
                className="mr-3"
              />
              <span>Cash on Delivery</span>
            </label>
          </div>
        </Card>

        {/* Order Summary */}
        <Card className="p-4">
          <h2 className="font-bold text-lg mb-4">Order Summary</h2>

          <div className="space-y-2 mb-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <hr className="my-2" />

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
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={isPlacingOrder}>
            {isPlacingOrder ? "Placing Order..." : `Place Order - $${totalAmount.toFixed(2)}`}
          </Button>
        </Card>
      </form>
    </div>
  )
}
