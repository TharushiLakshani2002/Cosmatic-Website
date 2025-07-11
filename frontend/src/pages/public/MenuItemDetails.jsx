// front-end/src/pages/public/MenuItemDetails.jsx
import {useState, useEffect} from 'react';
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useCart} from '../../contexts/CartContext';
import menuService from '../../services/menuService';
import toast from 'react-hot-toast';
import {
    ShoppingCart,
    ArrowLeft,
    Clock,
    Users,
    AlertCircle,
    Plus,
    Minus,
    Check
} from 'lucide-react';

const MenuItemDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {user} = useAuth();
    const {addToCart, isInCart, getItemQuantity} = useCart();

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedCustomizations, setSelectedCustomizations] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        fetchItemDetails();
    }, [id]);

    useEffect(() => {
        if (item) {
            calculateTotalPrice();
        }
    }, [quantity, selectedCustomizations, item]);

    const fetchItemDetails = async () => {
        try {
            const response = await menuService.getItem(id);
            setItem(response.data);

            // Initialize required customizations
            const initialCustomizations = {};
            response.data.customizations?.forEach(custom => {
                if (custom.required && custom.options.length > 0) {
                    initialCustomizations[custom.name] = custom.options[0];
                }
            });
            setSelectedCustomizations(initialCustomizations);
        } catch (error) {
            toast.error('Failed to load item details');
            console.error(error);
            navigate('/menu');
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalPrice = () => {
        if (!item) return;

        let price = item.price;

        // Add customization price modifiers
        Object.values(selectedCustomizations).forEach(option => {
            if (option?.priceModifier) {
                price += option.priceModifier;
            }
        });

        setTotalPrice(price * quantity);
    };

    const handleCustomizationChange = (customName, option) => {
        setSelectedCustomizations(prev => ({
            ...prev,
            [customName]: option
        }));
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        if (!item.isAvailable) {
            toast.error('This item is currently unavailable');
            return;
        }

        // Check if all required customizations are selected
        const missingRequired = item.customizations?.find(
            custom => custom.required && !selectedCustomizations[custom.name]
        );

        if (missingRequired) {
            toast.error(`Please select ${missingRequired.name}`);
            return;
        }

        setAddingToCart(true);

        try {
            // Format customizations for cart
            const customizations = Object.entries(selectedCustomizations).map(([name, option]) => ({
                name,
                option
            }));

            addToCart(item, quantity, customizations);

            // Show success animation
            setTimeout(() => {
                setAddingToCart(false);
            }, 1000);
        } catch (error) {
            toast.error('Failed to add item to cart');
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brown-600"></div>
            </div>
        );
    }

    if (!item) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Item not found</p>
            </div>
        );
    }

    const itemInCartQuantity = getItemQuantity(item._id);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {/* Back button */}
                <button
                    onClick={() => navigate('/menu')}
                    className="flex items-center gap-2 text-gray-600 hover:text-brown-600 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5"/>
                    Back to Menu
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image Section */}
                        <div className="relative h-96 lg:h-full">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                                {item.isPopular && (
                                    <span
                                        className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Popular
                                    </span>
                                )}
                                {item.isSeasonal && (
                                    <span
                                        className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Seasonal
                                    </span>
                                )}
                                {!item.isAvailable && (
                                    <span
                                        className="bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Unavailable
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 lg:p-12">
                            <div className="mb-6">
                                <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
                                <p className="text-gray-600 mb-4">{item.description}</p>

                                {item.longDescription && (
                                    <p className="text-gray-700 mb-6">{item.longDescription}</p>
                                )}

                                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                                    {item.preparationTime && (
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4"/>
                                            <span>{item.preparationTime} min</span>
                                        </div>
                                    )}
                                    {item.servingSize && (
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4"/>
                                            <span>{item.servingSize}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Price */}
                                <div className="text-3xl font-bold text-brown-600 mb-6">
                                    ${item.price.toFixed(2)}
                                </div>
                            </div>

                            {/* Allergens */}
                            {item.allergens && item.allergens.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-yellow-600"/>
                                        Allergen Information
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {item.allergens.map((allergen, index) => (
                                            <span
                                                key={index}
                                                className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm capitalize"
                                            >
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Ingredients */}
                            {item.ingredients && item.ingredients.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Ingredients</h3>
                                    <p className="text-gray-600">
                                        {item.ingredients.join(', ')}
                                    </p>
                                </div>
                            )}

                            {/* Nutritional Info */}
                            {item.nutritionalInfo && Object.values(item.nutritionalInfo).some(v => v !== null) && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-3">Nutritional Information</h3>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        {Object.entries(item.nutritionalInfo).map(([key, value]) => (
                                            value !== null && value !== undefined && (
                                                <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                                                    <p className="font-medium capitalize">{key}</p>
                                                    <p className="text-gray-600 text-lg mt-1">
                                                        {value}{key === 'calories' ? '' : key === 'sodium' ? 'mg' : 'g'}
                                                    </p>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Customizations */}
                            {item.customizations && item.customizations.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold mb-4">Customize Your Order</h3>
                                    {item.customizations.map((custom, index) => (
                                        <div key={index} className="mb-4">
                                            <label className="block text-sm font-medium mb-2">
                                                {custom.name}
                                                {custom.required && <span className="text-red-500 ml-1">*</span>}
                                            </label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {custom.options.map((option, optIndex) => (
                                                    <button
                                                        key={optIndex}
                                                        onClick={() => handleCustomizationChange(custom.name, option)}
                                                        className={`p-3 rounded-lg border-2 transition-all ${
                                                            selectedCustomizations[custom.name]?.name === option.name
                                                                ? 'border-brown-600 bg-brown-50 text-brown-600'
                                                                : 'border-gray-300 hover:border-gray-400'
                                                        }`}
                                                    >
                                                        <span className="font-medium">{option.name}</span>
                                                        {option.priceModifier > 0 && (
                                                            <span className="text-sm text-gray-500 ml-1">
                                                                (+${option.priceModifier.toFixed(2)})
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Quantity and Add to Cart */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Minus className="w-4 h-4"/>
                                    </button>
                                    <span className="px-6 py-2 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-gray-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4"/>
                                    </button>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={!item.isAvailable || addingToCart}
                                    className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                                        item.isAvailable
                                            ? addingToCart
                                                ? 'bg-green-600 text-white'
                                                : 'bg-brown-600 text-white hover:bg-brown-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {addingToCart ? (
                                        <>
                                            <Check className="w-5 h-5"/>
                                            Added to Cart!
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingCart className="w-5 h-5"/>
                                            {item.isAvailable ? (
                                                <span>Add to Cart - ${totalPrice.toFixed(2)}</span>
                                            ) : (
                                                <span>Currently Unavailable</span>
                                            )}
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Cart Info */}
                            {itemInCartQuantity > 0 && !addingToCart && (
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        You have {itemInCartQuantity} of this item in your cart.{' '}
                                        <Link to="/cart" className="font-medium underline">View Cart</Link>
                                    </p>
                                </div>
                            )}

                            {/* Tags */}
                            {item.tags && item.tags.length > 0 && (
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        {item.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Items Section (Optional) */}
                <div className="mt-12">
                    <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
                    {/* Implement related items component here */}
                </div>
            </div>
        </div>
    );
};

export default MenuItemDetails;