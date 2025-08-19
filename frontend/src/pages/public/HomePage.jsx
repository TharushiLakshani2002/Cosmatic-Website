// front-end/src/pages/public/HomePage.jsx
import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';

const HomePage = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [imagesLoaded, setImagesLoaded] = useState({});

   const heroSlides = [
    {
        image: 'https://tse3.mm.bing.net/th/id/OIP.EOmUUkvLvIUZBwPBv_CsKAHaFS?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        title: 'Glow Up Your Skin',
        subtitle: 'Discover premium skincare products for radiant beauty'
    },
    {
        image: 'https://assets-global.website-files.com/6334a8d89862a1cc15eae9e1/6463f67aa08a03c16777491c_AdobeStock_268035814.jpg',
        title: 'Luxury Makeup',
        subtitle: 'Enhance your look with our exclusive makeup collection'
    },
    {
        image: 'https://tse4.mm.bing.net/th/id/OIP.f4R7aInLOdvC44B3DzU0TgHaFB?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        title: 'Natural & Organic',
        subtitle: 'Safe, eco-friendly cosmetics made from natural ingredients'
    }
];


    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Preload images
    useEffect(() => {
        heroSlides.forEach((slide, index) => {
            const img = new Image();
            img.onload = () => {
                setImagesLoaded(prev => ({...prev, [index]: true}));
            };
            img.src = slide.image;
        });
    }, []);

    const features = [
    {
        icon: '💄',
        title: 'High-Quality Products',
        description: 'Only the best cosmetics made with premium ingredients'
    },
    {
        icon: '🌿',
        title: 'Natural Ingredients',
        description: 'Eco-friendly and skin-safe formulations for all skin types'
    },
    {
        icon: '📦',
        title: 'Fast Shipping',
        description: 'Quick and reliable delivery straight to your doorstep'
    },
    {
        icon: '🎁',
        title: 'Exclusive Offers',
        description: 'Special discounts and loyalty rewards for our customers'
    }
];


    const popularItems = [
    {
        name: 'Hydrating Facial Mist',
        price: '$18.99',
        image: 'https://tse3.mm.bing.net/th/id/OIP.fBBbQiEbBZAVV1SMXC6DcAHaE8?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        description: 'Refresh and hydrate your skin anytime, anywhere.'
    },
    {
        name: 'Matte Liquid Lipstick',
        price: '$15.50',
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/6022ab151107941.63061d7c10baf.png',
        description: 'Long-lasting color with a soft matte finish.'
    },
    {
        name: 'Nourishing Hand Cream',
        price: '$12.00',
        image: 'https://tse4.mm.bing.net/th/id/OIP.d44Pq-uC1q197G2SU6WIgQHaEO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        description: 'Keeps your hands soft and smooth all day long.'
    },
    {
        name: 'Organic Facial Cleanser',
        price: '$22.75',
        image: 'https://tse4.mm.bing.net/th/id/OIP.uqkMUTiKCFqI1b-KDDPv1QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        description: 'Gentle cleanse with natural ingredients.'
    }
];


    return (
        <div className="min-h-screen">
            {/* Hero Section with Slider */}
            <section className="relative h-[600px] overflow-hidden bg-gray-800">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                            backgroundImage: `url("${slide.image}")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat',
                            width: '100%',
                            height: '100%'
                        }}
                    >
                        {/* Overlay */}
                        <div
                            className="absolute inset-0 bg-black"
                            style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
                        ></div>
                        {/* Content */}
                        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
                            <div className="relative z-10">
                                <h1 className="text-5xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                                <div className="space-x-4">
                                    <Link
                                        to="/menu"
                                        className="inline-block px-8 py-3 bg-[#0fb8a1] text-white rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        Order Now
                                    </Link>
                                    <Link
                                        to="/locations"
                                        className="inline-block px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-gray-900 transition-colors"
                                    >
                                        Find a Shop
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Slider Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2"
                     style={{zIndex: 30}}>
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose FashionHunt?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Items Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Customer Favorites</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {popularItems.map((item, index) => (
                            <div key={index}
                                 className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-brown-600">{item.price}</span>
                                        <Link
                                            to="/menu"
                                            className="text-sm text-green-600 hover:text-green-700 font-medium"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12">
                        <Link
                            to="/menu"
                            className="inline-block px-8 py-3 bg-[#0fb8a1] text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            View Full items
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#0fb8a1] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Shopping With Us..</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Earn points with every purchase and enjoy exclusive rewards,
                        free gifts, and special member-only offers.
                    </p>
                    <Link
                        to="/register"
                        className="inline-block px-8 py-3 bg-white text-green-600 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                    >
                        Join Us Now
                    </Link>
                </div>
            </section>

            {/* Store Hours Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-8">Visit Us Now</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Open Hours</h3>
                                <div className="space-y-2 text-gray-600">
                                    <p>Monday - Friday: 9:00 AM - 9:00 PM</p>
                                    <p>Saturday: 8:00 AM - 10:00 PM</p>
                                    <p>Sunday: 8:00 AM - 8:00 PM</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                                <div className="space-y-2 text-gray-600">
                                    <p>📍 Many Locations</p>
                                    <p>📞 (011) 123-4567</p>
                                    <p>✉️ fashionh@.com</p>
                                </div>
                            </div>
                        </div>
                        <Link
                            to="/locations"
                            className="inline-block px-8 py-3 bg-[#0fb8a1] text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                            Find Your Nearest Shop
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;