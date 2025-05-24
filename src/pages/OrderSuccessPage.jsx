import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, Home, Receipt } from 'lucide-react'
import Button from "../components/Button"

export default function OrderSuccessPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Auto redirect after 10 seconds
    const timer = setTimeout(() => {
      navigate("/")
    }, 10000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <CheckCircle size={80} className="mx-auto text-green-500 mb-6" />

        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Placed Successfully!</h1>

        <p className="text-gray-600 mb-2">Thank you for your order.</p>
        <p className="text-gray-600 mb-6">Your food will be delivered in 30-45 minutes.</p>

        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <p className="text-sm text-gray-600">Order ID</p>
          <p className="font-bold text-lg">#FE{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>

        <div className="space-y-3">
          <Button className="w-full" onClick={() => navigate("/")}>
            <Home className="mr-2" size={16} />
            Back to Home
          </Button>

          <Button variant="outline" className="w-full" onClick={() => navigate("/orders")}>
            <Receipt className="mr-2" size={16} />
            Track Order
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-6">Redirecting to home in 10 seconds...</p>
      </div>
    </div>
  )
}
