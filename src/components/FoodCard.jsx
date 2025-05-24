import { Plus } from 'lucide-react'
import Card from "./Card"
import Button from "./Button"
import { useCart } from "../context/CartContext"

export default function FoodCard({ item }) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart(item)
  }

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <div className="relative h-48">
        <img 
          src={item.image || "/placeholder.svg"} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCart} className="rounded-full w-8 h-8 p-0">
            <Plus size={16} />
          </Button>
        </div>
      </div>
    </Card>
  )
}
