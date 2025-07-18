// front-end/src/pages/admin/AdminOverview.jsx
import {
    DollarSign,
    ShoppingCart,
    Users,
    TrendingUp,
  
} from 'lucide-react';

const AdminOverview = () => {
    // Mock data for overview
    const overviewStats = [
        {
            title: 'Total Revenue',
            value: '$45,231',
            change: '+12.5%',
            icon: DollarSign,
            color: 'bg-green-500'
        },
        {
            title: 'Total Orders',
            value: '1,234',
            change: '+8.2%',
            icon: ShoppingCart,
            color: 'bg-blue-500'
        },
        {
            title: 'Active Customers',
            value: '3,456',
            change: '+15.3%',
            icon: Users,
            color: 'bg-purple-500'
        },
        {
            title: 'Avg Order Value',
            value: '$36.70',
            change: '+4.1%',
            icon: TrendingUp,
            color: 'bg-orange-500'
        }
    ];

    const recentOrders = [
        {id: '#12345', customer: 'John Doe', amount: '$24.50', status: 'completed', time: '5 min ago'},
        {id: '#12346', customer: 'Jane Smith', amount: '$18.75', status: 'preparing', time: '12 min ago'},
        {id: '#12347', customer: 'Mike Johnson', amount: '$32.00', status: 'pending', time: '15 min ago'},
        {id: '#12348', customer: 'Sarah Williams', amount: '$45.25', status: 'completed', time: '22 min ago'},
        {id: '#12349', customer: 'Tom Brown', amount: '$15.50', status: 'preparing', time: '28 min ago'}
    ];

    const topProducts = [
    { name: 'Vitamin C Serum', orders: 312, revenue: '$3,120', trend: '+18%' },
    { name: 'Hydrating Face Cream', orders: 275, revenue: '$6,872.25', trend: '+12%' },
    { name: 'Matte Lipstick', orders: 248, revenue: '$3,100', trend: '+14%' },
    { name: 'Eyeshadow Palette', orders: 210, revenue: '$4,620', trend: '+9%' },
    { name: 'Argan Oil Shampoo', orders: 194, revenue: '$2,904.06', trend: '+11%' }
];


    const getStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800';
            case 'preparing':
                return 'bg-yellow-100 text-yellow-800';
            case 'pending':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {overviewStats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white"/>
                            </div>
                            <span className="text-sm font-medium text-green-600">{stat.change}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                        <p className="text-sm text-gray-600 mt-1">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Recent Orders and Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Recent Orders</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{order.id}</p>
                                        <p className="text-sm text-gray-600">{order.customer}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{order.amount}</p>
                                        <span
                                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            className="mt-4 w-full text-center text-sm text-[#0fb8a1] hover:text-green-700 font-medium">
                            View All Orders →
                        </button>
                    </div>
                </div>

                {/* Top Products */}
                <div className="bg-white rounded-lg shadow">
                    <div className="p-6 border-b border-gray-200">
                        <h3 className="text-lg font-semibold">Top Products</h3>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {topProducts.map((product, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-900">{product.name}</p>
                                        <p className="text-sm text-gray-600">{product.orders} orders</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium text-gray-900">{product.revenue}</p>
                                        <p className="text-sm text-green-600">{product.trend}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#0fb8a1] hover:bg-green-50 transition-colors">
                        <Coffee className="w-8 h-8 text-[#0fb8a1] mx-auto mb-2"/>
                        <span className="text-sm font-medium">Add Menu Item</span>
                    </button>
                    <button
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#0fb8a1] hover:bg-green-50 transition-colors">
                        <Users className="w-8 h-8 text-brown-600 mx-auto mb-2"/>
                        <span className="text-sm font-medium">Add Staff</span>
                    </button>
                    <button
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#0fb8a1] hover:bg-green-50 transition-colors">
                        <TrendingUp className="w-8 h-8 text-brown-600 mx-auto mb-2"/>
                        <span className="text-sm font-medium">View Reports</span>
                    </button>
                    <button
                        className="p-4 border border-gray-200 rounded-lg hover:border-[#0fb8a1] hover:bg-green-50 transition-colors">
                        <ShoppingCart className="w-8 h-8 text-[#0fb8a1] mx-auto mb-2"/>
                        <span className="text-sm font-medium">Process Orders</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;