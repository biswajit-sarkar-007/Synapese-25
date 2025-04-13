import { motion } from 'framer-motion';

interface ProductGridProps {
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
    productImages: string[];
    promptText: string;
  };
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

const generateMockProducts = (images: string[]): Product[] => {
  // If no images provided, use a single placeholder
  if (!images || images.length === 0) {
    return [
      { id: 1, name: 'Sample Product', price: '$99.99', image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjNjY2Ij5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=' }
    ];
  }

  // Use uploaded images
  return images.map((image, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: `$${(Math.random() * 100 + 20).toFixed(2)}`,
    image: image
  }));
};

export const ProductGrid = ({ colorTheme, fontStyle, content }: ProductGridProps) => {
  const products = generateMockProducts(content.productImages);
  console.log('Rendering ProductGrid with images:', content.productImages);
  return (
    <section 
      className="py-8 sm:py-12 lg:py-16"
      style={{ 
        backgroundColor: colorTheme.background,
        fontFamily: fontStyle.body
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product: Product, index: number) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4 aspect-[3/4] bg-gray-100">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105 transform-gpu"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY2YjZiIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjZmZmIj5FcnJvcjwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                )}
              </div>
              <h3 
                className="text-sm sm:text-base lg:text-lg font-medium mb-1 sm:mb-2 line-clamp-1"
                style={{ fontFamily: fontStyle.heading }}
              >
                {product.name}
              </h3>
              <p 
                className="text-sm sm:text-base font-semibold"
                style={{ color: colorTheme.primary }}
              >
                {product.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
