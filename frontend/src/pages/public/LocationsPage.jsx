// front-end/src/pages/public/LocationsPage.jsx
import {useState} from 'react';
import {Link} from 'react-router-dom';

const LocationsPage = () => {
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const locations = [
  {
    id: 1,
    name: 'GlowBeauty Flagship Store',
    address: '123 Glamour Avenue, Downtown',
    city: 'New York, NY 10001',
    phone: '(555) 123-4567',
    hours: {
      weekday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 6:00 PM'
    },
    features: ['Skin Consultation', 'Makeup Trials', 'Loyalty Desk', 'Lounge Area'],
    image: 'https://th.bing.com/th/id/R.e1c4654f3a2f1ec6e2cfcf47b3d7f1f7?rik=%2b8NBqfVQfD5m5g&pid=ImgRaw&r=0'
  },
  {
    id: 2,
    name: 'GlowBeauty Midtown',
    address: '456 Park Avenue, Midtown',
    city: 'New York, NY 10022',
    phone: '(555) 234-5678',
    hours: {
      weekday: '10:00 AM - 7:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '11:00 AM - 6:00 PM'
    },
    features: ['Beauty Bar', 'Makeup Artists', 'Loyalty Program'],
    image: 'https://c8.alamy.com/comp/ERRBWY/the-illuminated-facade-of-the-chanel-flagship-store-in-the-tokyo-ginza-ERRBWY.jpg'
  },
  {
    id: 3,
    name: 'GlowBeauty Brooklyn',
    address: '789 Atlantic Avenue',
    city: 'Brooklyn, NY 11217',
    phone: '(555) 345-6789',
    hours: {
      weekday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 6:00 PM'
    },
    features: ['Fragrance Testers', 'Hair Styling Corner', 'Pet Friendly'],
    image: 'https://media.timeout.com/images/105814478/1372/772/image.jpg'
  },
  {
    id: 4,
    name: 'GlowBeauty Queens',
    address: '321 Queens Boulevard',
    city: 'Queens, NY 11375',
    phone: '(555) 456-7890',
    hours: {
      weekday: '10:00 AM - 7:00 PM',
      saturday: '10:00 AM - 8:00 PM',
      sunday: '11:00 AM - 5:00 PM'
    },
    features: ['Free Samples', 'Parking', 'Gift Wrapping'],
    image: 'https://tse2.mm.bing.net/th/id/OIP.uiq7ayVdGNODOcQi2_MVkQHaFj?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 5,
    name: 'GlowBeauty Upper West',
    address: '555 Columbus Avenue',
    city: 'New York, NY 10024',
    phone: '(555) 567-8901',
    hours: {
      weekday: '10:00 AM - 8:00 PM',
      saturday: '10:00 AM - 9:00 PM',
      sunday: '11:00 AM - 6:00 PM'
    },
    features: ['Exclusive Products', 'Personal Stylists', 'Virtual Try-On Booth'],
    image: 'https://c8.alamy.com/comp/C177WP/ginza-tokyo-japan-C177WP.jpg'
  }
];


    const filteredLocations = locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const featureIcons = {
        'WiFi': '📶',
        'Meeting Room': '👥',
        'Drive-Thru': '🚗',
        'Outdoor Seating': '☀️',
        'Study Area': '📚',
        'Live Music': '🎵',
        'Pet Friendly': '🐕',
        'Parking': '🅿️'
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0fb8a1] to-brown-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Visit a Store Near You for Personalized Beauty Care</h1>
                    <p className="text-xl max-w-2xl mx-auto mb-8">
                        Experience luxury skincare and makeup at any of our locations
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search by location, address, or city..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 pl-12 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                            />
                            <svg className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Locations Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Locations List */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold mb-4">
                                {filteredLocations.length} Location{filteredLocations.length !== 1 ? 's' : ''} Found
                            </h2>

                            {filteredLocations.length === 0 ? (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 text-lg">No locations found matching your search.</p>
                                </div>
                            ) : (
                                filteredLocations.map((location) => (
                                    <div
                                        key={location.id}
                                        className={`bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                                            selectedLocation?.id === location.id ? 'ring-2 ring-green-600' : ''
                                        }`}
                                        onClick={() => setSelectedLocation(location)}
                                    >
                                        <div className="flex flex-col md:flex-row">
                                            <div className="md:w-1/3 h-48 md:h-auto">
                                                <img
                                                    src={location.image}
                                                    alt={location.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="p-6 md:w-2/3">
                                                <h3 className="text-xl font-semibold mb-2">{location.name}</h3>
                                                <p className="text-gray-600 mb-1">{location.address}</p>
                                                <p className="text-gray-600 mb-3">{location.city}</p>
                                                <p className="text-green-600 font-medium mb-3">{location.phone}</p>

                                                {/* Features */}
                                                <div className="flex flex-wrap gap-2 mb-4">
                                                    {location.features.map((feature, index) => (
                                                        <span
                                                            key={index}
                                                            className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                                                        >
                                                            <span className="mr-1">{featureIcons[feature]}</span>
                                                            {feature}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Hours */}
                                                <div className="text-sm text-gray-600">
                                                    <p><span
                                                        className="font-medium">Mon-Fri:</span> {location.hours.weekday}
                                                    </p>
                                                    <p><span
                                                        className="font-medium">Saturday:</span> {location.hours.saturday}
                                                    </p>
                                                    <p><span
                                                        className="font-medium">Sunday:</span> {location.hours.sunday}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Map Section */}
                        <div className="lg:sticky lg:top-24 h-[500px]">
                            <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center">
                                {selectedLocation ? (
                                    <div className="text-center p-8">
                                        <svg className="w-16 h-16 text-[#0fb8a1] mx-auto mb-4" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <h3 className="text-xl font-semibold mb-2">{selectedLocation.name}</h3>
                                        <p className="text-gray-600 mb-1">{selectedLocation.address}</p>
                                        <p className="text-gray-600 mb-4">{selectedLocation.city}</p>
                                        <div className="space-x-4">
                                            <button
                                                className="px-4 py-2 bg-[#0fb8a1] text-white rounded-md hover:bg-green-700 transition-colors">
                                                Get Directions
                                            </button>
                                            <button
                                                className="px-4 py-2 border border-[#0fb8a1] text-[#0fb8a1] rounded-md hover:bg-brown-50 transition-colors">
                                                Call Us
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none"
                                             stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                                        </svg>
                                        <p className="text-gray-600">Select a location to view on map</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Too far from flawless? Shop online for all your beauty needs.</h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            We’re growing beautiful, one city at a time! ✨ Join our mailing list to be the first to know when we glam up your neighborhood.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                            />
                            <button
                                className="px-6 py-3 bg-[#0fb8a1] text-white font-semibold rounded-md hover:bg-green-700 transition-colors">
                                Notify Me
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mobile App Download */}
            <section className="py-16 bg-[#0fb8a1] text-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">Glow Up Faster — Order Ahead with Our App!</h2>
                        <p className="text-xl mb-8">
                           Skip the line and have your order ready the moment you arrive.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <a href="#" className="inline-block">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/200px-Download_on_the_App_Store_Badge.svg.png"
                                    alt="Download on App Store" className="h-12"/>
                            </a>
                            <a href="#" className="inline-block">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/200px-Google_Play_Store_badge_EN.svg.png"
                                    alt="Get it on Google Play" className="h-12"/>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LocationsPage;