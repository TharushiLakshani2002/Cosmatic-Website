// front-end/src/pages/public/ContactPage.jsx
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import toast from 'react-hot-toast';

const ContactPage = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm();

    const contactInfo = [
  {
    icon: '📍',
    title: 'Visit Us',
    content: 'Multiple store locations for your convenience',
    link: '/locations'
  },
  {
    icon: '📞',
    title: 'Call Us',
    content: '(555) 123-4567',
    subContent: 'Mon-Fri 9AM-6PM'
  },
  {
    icon: '✉️',
    title: 'Email Us',
    content: 'support@beautyhub.com',
    subContent: 'We reply within 24 hours'
  },
  {
    icon: '💬',
    title: 'Live Chat',
    content: 'Chat with our beauty experts',
    subContent: 'Available during business hours'
  }
];

const faqs = [
  {
    question: 'What are your store hours?',
    answer: 'Our hours vary by location. Most stores are open Monday-Friday 9AM-8PM, Saturday 10AM-8PM, and Sunday 11AM-6PM.'
  },
  {
    question: 'Do you offer product consultations?',
    answer: 'Yes! Our experts are happy to help you find the perfect products. Book a consultation online or visit us in-store.'
  },
  {
    question: 'Can I return or exchange products?',
    answer: 'Absolutely! We offer hassle-free returns within 30 days with a receipt.'
  },
  {
    question: 'Do you have cruelty-free and vegan products?',
    answer: 'Yes, we carry a wide selection of cruelty-free and vegan beauty products.'
  }
];


    const onSubmit = async (data) => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log('Contact form data:', data);
            toast.success('Message sent successfully! We\'ll get back to you soon.');
            reset();
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-brown-600 to-brown-700 text-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                       We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out.
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                        {contactInfo.map((info, index) => (
                            <div key={index}
                                 className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                                <div className="text-4xl mb-4">{info.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{info.title}</h3>
                                <p className="text-gray-700 font-medium">{info.content}</p>
                                {info.subContent && (
                                    <p className="text-gray-500 text-sm mt-1">{info.subContent}</p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Contact Form and Map */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Contact Form */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            {...register('firstName', {required: 'First name is required'})}
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                                        />
                                        {errors.firstName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            {...register('lastName', {required: 'Last name is required'})}
                                            type="text"
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                                        />
                                        {errors.lastName && (
                                            <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email
                                    </label>
                                    <input
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'Invalid email address'
                                            }
                                        })}
                                        type="email"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <select
                                        {...register('subject', {required: 'Please select a subject'})}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                                    >
                                        <option value="">Select a subject</option>
                                        <option value="general">General Inquiry</option>
                                        <option value="feedback">Feedback</option>
                                        <option value="catering">Catering Services</option>
                                        <option value="partnership">Partnership Opportunities</option>
                                        <option value="careers">Careers</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.subject && (
                                        <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        {...register('message', {
                                            required: 'Message is required',
                                            minLength: {
                                                value: 10,
                                                message: 'Message must be at least 10 characters'
                                            }
                                        })}
                                        rows={6}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-brown-500 focus:border-transparent"
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full px-6 py-3 bg-[#0fb8a1] text-white font-semibold rounded-md hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        </div>

                        {/* Map Placeholder */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6">Find Us</h2>
                            <div className="bg-gray-200 rounded-lg h-[400px] flex items-center justify-center">
                                <div className="text-center">
                                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none"
                                         stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                    <p className="text-gray-600">Interactive map would go here</p>
                                    <p className="text-sm text-gray-500 mt-2">View all our locations</p>
                                </div>
                            </div>

                            {/* Business Hours */}
                            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-xl font-semibold mb-4">General Business Hours</h3>
                                <div className="space-y-2 text-gray-700">
                                    <div className="flex justify-between">
                                        <span>Monday - Friday</span>
                                        <span className="font-medium">6:00 AM - 9:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday</span>
                                        <span className="font-medium">7:00 AM - 10:00 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Sunday</span>
                                        <span className="font-medium">7:00 AM - 8:00 PM</span>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-500 mt-4">
                                    * Hours may vary by location
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="max-w-3xl mx-auto space-y-6">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                                <p className="text-gray-700">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Have more questions? Don’t hesitate to reach out to our friendly team anytime!{' '}
                            <a href="#contact-form" className="text-[#0fb8a1] font-medium hover:text-[#0fb8a1]">
                                contact us
                            </a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;