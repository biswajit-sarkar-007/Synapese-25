interface FooterProps {
  colorTheme: {
    primary: string;
    secondary: string;
    background: string;
  };
  fontStyle: {
    family: string;
    heading: string;
    body: string;
  };
  content: {
    promptText?: string;
  };
}

export const Footer = ({ colorTheme, fontStyle }: FooterProps) => {
  return (
    <footer 
      className="text-white py-12"
      style={{ 
        backgroundColor: colorTheme.secondary,
        fontFamily: fontStyle.body 
      }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colorTheme.primary }}
            >
              About Us
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Our Story</a></li>
              <li><a href="#" className="hover:text-gray-300">Careers</a></li>
              <li><a href="#" className="hover:text-gray-300">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colorTheme.primary }}
            >
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-300">Shipping</a></li>
              <li><a href="#" className="hover:text-gray-300">Returns</a></li>
            </ul>
          </div>
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colorTheme.primary }}
            >
              Legal
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              <li><a href="#" className="hover:text-gray-300">Cookie Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 
              className="text-xl font-bold mb-4"
              style={{ color: colorTheme.primary }}
            >
              Follow Us
            </h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-gray-300">Instagram</a></li>
              <li><a href="#" className="hover:text-gray-300">Twitter</a></li>
              <li><a href="#" className="hover:text-gray-300">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 Your Brand. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
