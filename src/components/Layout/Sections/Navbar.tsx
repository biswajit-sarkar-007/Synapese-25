import { useState } from 'react';
import { Menu, X, ShoppingCart } from 'lucide-react';

interface NavbarProps {
  style: {
    font: string;
    primaryColor: string;
    secondaryColor: string;
  };
  brandType?: 'fashion' | 'food' | 'tech' | 'beauty' | 'fitness';
}

export const Navbar = ({ style, brandType = 'fashion' }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getMenuItems = () => {
    switch (brandType) {
      case 'food':
        return ['Menu', 'Reservations', 'About', 'Contact'];
      case 'tech':
        return ['Products', 'Solutions', 'Support', 'Enterprise'];
      case 'beauty':
        return ['Products', 'Treatments', 'Blog', 'Book Now'];
      case 'fitness':
        return ['Programs', 'Classes', 'Trainers', 'Membership'];
      case 'fashion':
      default:
        return ['Shop', 'Collections', 'Lookbook', 'About'];
    }
  };

  const menuItems = getMenuItems();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/90 shadow-sm"
      style={{ fontFamily: style.font }}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="text-2xl font-bold tracking-tight"
            style={{ 
              background: `linear-gradient(135deg, ${style.primaryColor}, ${style.secondaryColor})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {brandType === 'food' ? 'SAVORIA' :
             brandType === 'tech' ? 'NEXTECH' :
             brandType === 'beauty' ? 'LUMIÈRE' :
             brandType === 'fitness' ? 'VITALITY' :
             'LUXMODE'}
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-600 hover:text-gray-900 transition-colors relative group"
              style={{
                color: style.secondaryColor
              }}
            >
              {item}
              <span 
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: style.primaryColor }}
              />
            </a>
            ))}
          </div>

          {/* Cart Icon */}
          <div className="flex items-center">
            <button 
              className="p-2 hover:bg-gray-100 rounded-full"
              style={{ color: style.primaryColor }}
            >
              <ShoppingCart size={20} />
            </button>

            {/* Mobile Menu Button */}
            <button
              className="ml-4 p-2 hover:bg-gray-100 rounded-full md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ color: style.primaryColor }}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            {menuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors pl-4 border-l-2 hover:border-current"
              style={{
                color: style.secondaryColor,
                borderColor: 'transparent'
              }}
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
