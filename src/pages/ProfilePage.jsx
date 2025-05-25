import { User, MapPin, CreditCard, Bell, HelpCircle, LogOut } from 'lucide-react'
import Card from "../components/Card"

export default function ProfilePage() {
  const menuItems = [
    { icon: User, label: "Personal Information", href: "/profile/personal" },
    { icon: MapPin, label: "Delivery Addresses", href: "/profile/addresses" },
    { icon: CreditCard, label: "Payment Methods", href: "/profile/payment" },
    { icon: Bell, label: "Notifications", href: "/profile/notifications" },
    { icon: HelpCircle, label: "Help & Support", href: "/profile/help" },
    { icon: LogOut, label: "Logout", href: "/logout", danger: true },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <h1 className="text-2xl font-bold">Profile</h1>
      </div>

      {/* User Info */}
      <div className="p-4">
        <Card className="p-6 text-center">
          <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">JD</span>
          </div>
          <h2 className="text-xl font-semibold">Purnima</h2>

          <p className="text-gray-600">purnima@example.com</p>
          <p className="text-sm text-gray-500 mt-2">Member since Jan 2024</p>
        </Card>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <item.icon size={20} className={item.danger ? "text-red-500" : "text-gray-600"} />
                <span className={`font-medium ${item.danger ? "text-red-500" : "text-gray-800"}`}>{item.label}</span>
              </div>
              <span className="text-gray-400">{">"}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
