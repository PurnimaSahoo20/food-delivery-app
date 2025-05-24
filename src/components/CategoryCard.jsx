import { Link } from "react-router-dom"
import Card from "./Card"

export default function CategoryCard({ category }) {
  return (
    <Link to={`/menu?category=${category.slug}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer">
        <div className="relative h-24">
          <img 
            src={category.image || "/placeholder.svg"} 
            alt={category.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-3 text-center">
          <h3 className="font-medium text-sm">{category.name}</h3>
        </div>
      </Card>
    </Link>
  )
}
