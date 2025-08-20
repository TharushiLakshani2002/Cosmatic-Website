// front-end/src/pages/public/MenuPage.jsx
import {useState} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {Link} from 'react-router-dom';

const MenuPage = () => {
    const {user} = useAuth();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const categories = [
        { id: 'all', name: 'All Products', icon: '🛍️' },
    { id: 'skincare', name: 'Skincare', icon: '🧴' },
    { id: 'makeup', name: 'Makeup', icon: '💄' },
    { id: 'haircare', name: 'Haircare', icon: '💇‍♀️' },
    { id: 'fragrance', name: 'Fragrances', icon: '🌸' },
    { id: 'tools', name: 'Beauty Tools', icon: '🪞' }
    ];

    const menuItems = [
     
  {
    id: 1,
    name: 'Hydrating Face Cream',
    category: 'skincare',
    price: 24.99,
    description: 'Lightweight moisturizer for all-day hydration.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.bHKkgxkn8gAP2XNr4haB2AHaJ4?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    popular: true
  },
  {
    id: 2,
    name: 'Vitamin C Serum',
    category: 'skincare',
    price: 29.99,
    description: 'Brightens and evens skin tone.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.Dt9raS07la3d6Ntcwa4t9wHaE7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 3,
    name: 'Soothing Aloe Gel',
    category: 'skincare',
    price: 15.00,
    description: 'Calms irritated or sun-exposed skin.',
    image: 'https://cosmetics.infojashore.com/assets/uploads/dbdf38e96e173b62b8e4b8eb602b410b.jpg'
  },

  // Makeup
  {
    id: 4,
    name: 'Liquid Foundation',
    category: 'makeup',
    price: 19.99,
    description: 'Buildable coverage with a natural finish.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.LQWqf0ry_HOjeKkwINW0DQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 5,
    name: 'Matte Lipstick',
    category: 'makeup',
    price: 12.50,
    description: 'Long-lasting color with a bold matte finish.',
    image: 'https://tse3.mm.bing.net/th/id/OIP.vAWRyys6igSghgfXuPWIAQHaKY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    popular: true
  },
  {
    id: 6,
    name: 'Eyeshadow Palette',
    category: 'makeup',
    price: 22.00,
    description: '12 rich shades in shimmer and matte.',
    image: 'https://tse4.mm.bing.net/th/id/OIP.sflMWZmIWSRntPNFbFwetwHaLH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },

  // Haircare
  {
    id: 7,
    name: 'Argan Oil Shampoo',
    category: 'haircare',
    price: 14.99,
    description: 'Gently cleanses and restores shine.',
    image: 'https://studio.femaledaily.com/_next/image?url=https:%2F%2Fmagento.femaledaily.com%2Fmedia%2Fcatalog%2Fproduct%2Fa%2Fr%2Fargavell_-_argan_oil_shampoo_-_240ml.jpg&w=1200&q=80'
  },
  {
    id: 8,
    name: 'Leave-In Conditioner',
    category: 'haircare',
    price: 16.75,
    description: 'Moisturizes and detangles all hair types.',
    image: 'https://th.bing.com/th/id/R.604f4b0dbea51cfe50ccbeeea9259325?rik=PC3m3Ie1ucl5kA&riu=http%3a%2f%2fbarcodeprofessional.in%2fcdn%2fshop%2farticles%2fArtboard_1_copy_9394a9ef-4c73-4087-9955-85a8a1bea699.jpg%3fv%3d1704710035&ehk=HfZn6ovIx%2bNznfWnkl3n%2bqqS88y4BTIu0K%2bF82sDhuM%3d&risl=&pid=ImgRaw&r=0',
    popular: true
  },

  // Fragrances
  {
    id: 9,
    name: 'Rose Eau de Parfum',
    category: 'fragrance',
    price: 45.00,
    description: 'Romantic floral fragrance with rose and vanilla.',
    image: 'https://th.bing.com/th/id/R.2c1e1a10e00b1f326d8abdc93ddac87a?rik=1NFCYCqDeWf5MA&pid=ImgRaw&r=0'
  },
  {
    id: 10,
    name: 'Citrus Blossom Mist',
    category: 'fragrance',
    price: 18.50,
    description: 'Light and refreshing with lemon and orange zest.',
    image: 'https://tse2.mm.bing.net/th/id/OIP.KqZYBzWeNzcTSPIoTxXnIQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },

  // Tools
  {
    id: 11,
    name: 'Facial Cleansing Brush',
    category: 'tools',
    price: 22.99,
    description: 'Gently exfoliates and deep cleans skin.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.EWUd1liAGjR8rfrlXnYOBAAAAA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 12,
    name: 'Makeup Brush Set',
    category: 'tools',
    price: 28.00,
    description: '10-piece professional brush collection.',
    image: 'https://tse1.mm.bing.net/th/id/OIP.dZz4hlIghUx3IlaL_NR2XgHaFY?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    popular: true
  }
];


    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleAddToCart = (item) => {
        if (!user) {
            // Redirect to login if not authenticated
            window.location.href = '/login';
            return;
        }
        // Add to cart logic here
        console.log('Adding to cart:', item);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-4">Our Products</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        ✨ Discover our carefully curated collection of skincare, makeup, haircare, and more — crafted with premium ingredients for radiant beauty every day.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Product Catalog..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brown-500"
                        />
                        <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                        </svg>
                    </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-full font-medium transition-colors ${
                                selectedCategory === category.id
                                    ? 'bg-green-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Menu Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {filteredItems.map(item => (
                        <div key={item.id}
                             className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {item.popular && (
                                <div
                                    className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold z-10">
                                    Popular
                                </div>
                            )}
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-semibold">{item.name}</h3>
                                    <span className="text-xl font-bold text-[#0fb8a1]">${item.price.toFixed(2)}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{item.description}</p>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-brown-700 transition-colors"
                                >
                                    {user ? 'Add to CartPage' : 'Login to Order'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredItems.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No items found matching your search.</p>
                    </div>
                )}

                {/* CTA Section */}
                {!user && (
                    <div className="bg-brown-100 rounded-lg p-8 text-center">
                        <h2 className="text-2xl font-bold mb-4">Ready to Shopping</h2>
                        <p className="text-gray-700 mb-6">
                            Sign up or log in to start ordering and earn loyalty points with every purchase!
                        </p>
                        <div className="space-x-4">
                            <Link
                                to="/login"
                                className="inline-block px-6 py-3 bg-[#0fb8a1] text-white rounded-md hover:bg-green-700 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="inline-block px-6 py-3 border-2 border-brown-600 text-brown-600 rounded-md hover:bg-[#0fb8a1] hover:text-white transition-colors"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MenuPage;