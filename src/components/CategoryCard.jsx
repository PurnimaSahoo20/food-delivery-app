import { Link } from "react-router-dom";
import Card from "./Card";

export default function CategoryCard({ category }) {
  return (
    <Link to={`/menu?category=${category.slug}`}>
      <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer rounded-t-xl">
        <div className="relative aspect-[3/2] overflow-hidden rounded-t-lg">

          <img
            src={category.image || "/placeholder.svg"}
            alt={category.name}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
          />
        </div>

        <div className="p-3 text-center">
          <h3 className="font-medium text-sm">{category.name}</h3>
        </div>
      </Card>
    </Link>
  );
}
