// front-end/src/services/shoppingService.js
import api from './api';

const shoppingService = {
    // Get all  items with filters
    getAllItems: async (params = {}) => {
        const response = await api.get('/shopping', {params});
        return response.data;
    },

    // Get single menu item
    getItem: async (id) => {
        const response = await api.get(`/shopping/${id}`);
        return response.data;
    },

    // Create new item (Admin only)
    createItem: async (itemData) => {
        const response = await api.post('/shopping', itemData);
        return response.data;
    },

    // Update  item (Admin only)
    updateItem: async (id, itemData) => {
        const response = await api.put(`/shopping/${id}`, itemData);
        return response.data;
    },

    // Delete  item (Admin only)
    deleteItem: async (id) => {
        const response = await api.delete(`/shopping/${id}`);
        return response.data;
    },

    // Toggle item availability (Staff and above)
    toggleAvailability: async (id) => {
        const response = await api.patch(`/shopping/${id}/availability`);
        return response.data;
    },

    // Get categories with counts
    getCategories: async () => {
        const response = await api.get('/shopping/categories');
        return response.data;
    },

    // Upload image (if using local storage)
    uploadImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        const response = await api.post('/upload/shopping-image', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    }
};

export default shoppingService;