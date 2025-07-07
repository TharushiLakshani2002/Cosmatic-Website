// front-end/src/pages/public/AboutPage.jsx
import {Link} from 'react-router-dom';

const AboutPage = () => {
    const teamMembers = [
  {
    name: 'Sophia Lee',
    role: 'Founder & CEO',
    image: 'https://img.freepik.com/free-photo/young-pretty-girl-with-crossed-hands-isolated-white-wall_231208-1336.jpg',
    bio: 'Beauty industry visionary with over 10 years of experience creating clean, cruelty-free products.'
  },
  {
    name: 'Daniel Chen',
    role: 'Chief Product Developer',
    image: 'https://tse4.mm.bing.net/th/id/OIP.8aLm3t3PCGA16XSmxCTjiwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    bio: 'Leads innovation in skincare and makeup formulations using natural ingredients.'
  },
  {
    name: 'Isabella Martinez',
    role: 'Head of Marketing',
    image: 'https://img.freepik.com/premium-photo/young-photographer-caucasian-woman-isolated-yellow-background-presenting-idea-while-looking-smiling-towards_1368-346833.jpg',
    bio: 'Crafting campaigns that empower beauty lovers worldwide.'
  },
  {
    name: 'Liam Patel',
    role: 'Creative Director',
    image: 'https://tse3.mm.bing.net/th/id/OIF.h6Y8sqQ4PKAXfXm6nvpWuA?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    bio: 'Designs stunning brand visuals and packaging that speak to modern beauty.'
  }
];


    const values = [
  {
    icon: '🌿',
    title: 'Clean Beauty',
    description: 'We use only safe, non-toxic, and cruelty-free ingredients.'
  },
  {
    icon: '🤝',
    title: 'Inclusivity',
    description: 'Our products are designed for all skin tones, types, and identities.'
  },
  {
    icon: '🧪',
    title: 'Innovation',
    description: 'Combining science and nature to deliver real results.'
  },
  {
    icon: '💖',
    title: 'Empowerment',
    description: 'Helping individuals express their unique beauty with confidence.'
  }
];
    const milestones = [
  { year: '2018', event: 'Launched our first skincare line focused on sensitive skin' },
  { year: '2021', event: 'Reached 100,000 happy customers globally' },
  { year: '2022', event: 'Opened flagship store and studio in New York City' },
  { year: '2023', event: 'Won “Best Indie Beauty Brand” at Global Beauty Awards' },
  { year: '2025', event: 'Launched eco-friendly packaging and refill program' }
];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[400px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{backgroundImage: 'url(https://tse1.mm.bing.net/th/id/OIP._OQbbY0p75teCcogASeOzgHaEJ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3)'}}
                >
                    <div className="absolute inset-0  bg-opacity-50"></div>
                </div>
                <div className="relative h-full flex items-center justify-center text-center text-black px-6">
                    <div>
                        <h1 className="text-5xl md:text-8xl font-bold mb-4">Our Journey</h1>
                        <p className="text-xl md:text-2xl max-w-3xl mx-auto font-bold">
                            From a small beauty brand to your everyday self-care essential.
                        </p>
                    </div>
                </div>
            </section>

            {/* About Content */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg mx-auto text-gray-700">
                            <p className="text-xl leading-relaxed mb-6">
                               Fashion Hunt was born from a simple idea: to blend quality with self-care.
Founded in 2018, we set out to offer more than just beauty products — we aimed to create experiences, build confidence, and empower a community
 that values clean, effective, and feel-good skincare and cosmetics.
                            </p>
                            <p className="text-lg leading-relaxed mb-6">
                                Every product we craft is a reflection of our commitment to excellence.
We source our ingredients from the world’s most trusted and sustainable suppliers, working closely with partners who share our passion 
for clean beauty, ethical sourcing, and skin-loving formulations.</p>
                            <p className="text-lg leading-relaxed">
                                But Fashion Hunt is more than just beauty products.
                                It’s a space where confidence grows, self-care begins, and individuality shines. Whether you’re starting your skincare routine, exploring bold makeup looks, or simply treating yourself, we’re here to make every moment of your beauty journey feel special.


                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="text-center">
                                <div className="text-5xl mb-4">{value.icon}</div>
                                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Journey</h2>
                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            {/* Timeline line */}
                            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#0fb8a1]"></div>

                            {/* Timeline items */}
                            {milestones.map((milestone, index) => (
                                <div key={index} className="relative flex items-center mb-8">
                                    <div
                                        className="absolute left-8 w-4 h-4 bg-[#0fb8a1] rounded-full -translate-x-1/2"></div>
                                    <div className="ml-20">
                                        <h3 className="text-xl font-bold text-[#0fb8a1] mb-1">{milestone.year}</h3>
                                        <p className="text-gray-700">{milestone.event}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Meet Our Executives</h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Passionate individuals dedicated to bringing you the best in beauty and self-care.
Our team is committed to curating high-quality products and empowering your unique glow—because you deserve nothing less.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6 text-center">
                                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                                    <p className="text-[#0fb8a1] font-medium mb-2">{member.role}</p>
                                    <p className="text-gray-600 text-sm">{member.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-[#0fb8a1] text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Team</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        Join the BeautyGlow family and unlock exclusive perks.
From member-only discounts to early access on new arrivals, enjoy rewards crafted just for you.
                    </p>
                    <div className="space-x-4">
                        <Link
                            to="/register"
                            className="inline-block px-8 py-3 bg-white text-green-600 rounded-md hover:bg-gray-100 transition-colors font-semibold"
                        >
                            Become a Member
                        </Link>
                        <Link
                            to="/locations"
                            className="inline-block px-8 py-3 border-2 border-white text-white rounded-md hover:bg-white hover:text-brown-600 transition-colors font-semibold"
                        >
                            Visit Us at Our Stores
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;