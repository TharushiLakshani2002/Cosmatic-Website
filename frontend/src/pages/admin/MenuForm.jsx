// Cosmetic Product Form - Admin Panel
// Path: front-end/src/pages/admin/MenuForm.jsx

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, X, Save } from 'lucide-react';
import menuService from '../../services/menuService';

const MenuForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState('');

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: '',
            category: 'skincare',
            price: '',
            description: '',
            longDescription: '',
            image: '',
            keyIngredients: [],
            skinType: '',
            usageDirections: '',
            benefits: [],
            isAvailable: true,
            isPopular: false,
            tags: [],
            size: '',
            expiryDate: '',
            brand: ''
        }
    });

    const { fields: ingredientFields, append: appendIngredient, remove: removeIngredient } = useFieldArray({
        control,
        name: 'keyIngredients'
    });

    const { fields: benefitFields, append: appendBenefit, remove: removeBenefit } = useFieldArray({
        control,
        name: 'benefits'
    });

    const { fields: tagFields, append: appendTag, remove: removeTag } = useFieldArray({
        control,
        name: 'tags'
    });

    const watchedImage = watch('image');

    useEffect(() => {
        if (isEdit) fetchMenuItem();
    }, [id]);

    useEffect(() => {
        setImagePreview(watchedImage);
    }, [watchedImage]);

    const fetchMenuItem = async () => {
        try {
            const { data } = await menuService.getItem(id);
            Object.keys(data).forEach((key) => setValue(key, data[key]));
            setImagePreview(data.image);
        } catch (error) {
            toast.error('Failed to load product');
            navigate('/admin/menu');
        }
    };

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const formData = {
                ...data,
                price: parseFloat(data.price),
                keyIngredients: data.keyIngredients.map(i => i.value).filter(Boolean),
                benefits: data.benefits.map(b => b.value).filter(Boolean),
                tags: data.tags.map(t => t.value).filter(Boolean)
            };

            if (isEdit) {
                await menuService.updateItem(id, formData);
                toast.success('Product updated successfully');
            } else {
                await menuService.createItem(formData);
                toast.success('Product created successfully');
            }
            navigate('/admin/menu');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to save product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <button onClick={() => navigate('/admin/menu')} className="flex items-center gap-2 text-gray-600 hover:text-brown-600 mb-6">
                <ArrowLeft className="w-5 h-5" /> Back
            </button>

            <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <label>Name *</label>
                        <input {...register('name', { required: 'Name is required' })} className="input" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

                        <label>Category *</label>
                        <select {...register('category', { required: 'Category is required' })} className="input">
                            <option value="skincare">Skincare</option>
                            <option value="makeup">Makeup</option>
                            <option value="haircare">Haircare</option>
                            <option value="fragrance">Fragrance</option>
                            <option value="bodycare">Body Care</option>
                        </select>

                        <label>Price *</label>
                        <input type="number" step="0.01" {...register('price', { required: 'Price is required' })} className="input" />

                        <label>Short Description *</label>
                        <textarea {...register('description', { required: true })} rows={3} className="input" />

                        <label>Long Description</label>
                        <textarea {...register('longDescription')} rows={5} className="input" />

                        <label>Brand</label>
                        <input {...register('brand')} className="input" />

                        <label>Skin Type</label>
                        <select {...register('skinType')} className="input">
                            <option value="">All</option>
                            <option value="oily">Oily</option>
                            <option value="dry">Dry</option>
                            <option value="combination">Combination</option>
                            <option value="sensitive">Sensitive</option>
                        </select>

                        <label>Usage Directions</label>
                        <textarea {...register('usageDirections')} rows={3} className="input" />

                        <label>Size</label>
                        <input {...register('size')} className="input" />

                        <label>Expiry Date</label>
                        <input type="date" {...register('expiryDate')} className="input" />
                    </div>

                    <div className="space-y-4">
                        <label>Image URL *</label>
                        <input {...register('image', { required: true })} className="input" />
                        {imagePreview && <img src={imagePreview} className="w-full h-48 object-cover rounded" alt="Preview" />}

                        <div className="flex flex-col gap-2">
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" {...register('isAvailable')} /> Available
                            </label>
                            <label className="flex gap-2 items-center">
                                <input type="checkbox" {...register('isPopular')} /> Popular Product
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold">Key Ingredients</h2>
                    {ingredientFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mt-2">
                            <input {...register(`keyIngredients.${index}.value`)} className="input" placeholder="e.g. Hyaluronic Acid" />
                            <button type="button" onClick={() => removeIngredient(index)} className="text-red-500"><X /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendIngredient({ value: '' })} className="mt-2 text-brown-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Ingredient</button>
                </div>

                <div>
                    <h2 className="font-semibold">Benefits</h2>
                    {benefitFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mt-2">
                            <input {...register(`benefits.${index}.value`)} className="input" placeholder="e.g. Hydrates skin" />
                            <button type="button" onClick={() => removeBenefit(index)} className="text-red-500"><X /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendBenefit({ value: '' })} className="mt-2 text-brown-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Benefit</button>
                </div>

                <div>
                    <h2 className="font-semibold">Tags</h2>
                    {tagFields.map((field, index) => (
                        <div key={field.id} className="flex gap-2 mt-2">
                            <input {...register(`tags.${index}.value`)} className="input" placeholder="e.g. Vegan" />
                            <button type="button" onClick={() => removeTag(index)} className="text-red-500"><X /></button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendTag({ value: '' })} className="mt-2 text-brown-600 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Tag</button>
                </div>

                <div className="flex justify-end pt-6">
                    <button type="submit" disabled={loading} className="bg-brown-600 text-white px-6 py-2 rounded-md flex items-center gap-2 hover:bg-brown-700 disabled:opacity-50">
                        <Save className="w-4 h-4" /> {loading ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default MenuForm;