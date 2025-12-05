import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

// Zod validation schema
const tourSchema = z.object({
  name: z
    .string()
    .min(1, 'Tên tour là bắt buộc')
    .min(3, 'Tên tour phải có ít nhất 3 ký tự')
    .max(100, 'Tên tour không được vượt quá 100 ký tự'),
  destination: z
    .string()
    .min(1, 'Địa điểm là bắt buộc')
    .min(2, 'Địa điểm phải có ít nhất 2 ký tự')
    .max(50, 'Địa điểm không được vượt quá 50 ký tự'),
  duration: z
    .string()
    .min(1, 'Thời gian là bắt buộc')
    .regex(/^\d+\s*(ngày|đêm|giờ)/i, 'Định dạng không hợp lệ (VD: 2 ngày 1 đêm)'),
  price: z
    .string()
    .min(1, 'Giá tour là bắt buộc')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Giá phải là số dương',
    })
    .refine((val) => Number(val) >= 100000, {
      message: 'Giá tối thiểu là 100,000 VND',
    })
    .refine((val) => Number(val) <= 100000000, {
      message: 'Giá tối đa là 100,000,000 VND',
    }),
  image: z
    .string()
    .min(1, 'URL ảnh là bắt buộc')
    .url('URL ảnh không hợp lệ'),
  description: z
    .string()
    .min(1, 'Mô tả là bắt buộc')
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(500, 'Mô tả không được vượt quá 500 ký tự'),
  available: z
    .string()
    .min(1, 'Số lượng là bắt buộc')
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Số lượng phải là số nguyên dương',
    })
    .refine((val) => Number.isInteger(Number(val)), {
      message: 'Số lượng phải là số nguyên',
    })
    .refine((val) => Number(val) <= 1000, {
      message: 'Số lượng tối đa là 1000',
    }),
});

function AddPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(tourSchema),
    defaultValues: {
      name: '',
      destination: '',
      duration: '',
      price: '',
      image: '',
      description: '',
      available: '',
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await axios.post('http://localhost:3000/tours', {
        name: data.name.trim(),
        destination: data.destination.trim(),
        duration: data.duration.trim(),
        price: Number(data.price),
        image: data.image.trim(),
        description: data.description.trim(),
        available: Number(data.available),
      });

      toast.success('Thêm tour thành công!');
      reset();
      
      // Redirect to list after 1 second
      setTimeout(() => {
        navigate('/list');
      }, 1000);
    } catch (error) {
      console.error('Add tour error:', error);
      toast.error(error.response?.data?.message || 'Thêm tour thất bại. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Thêm Tour Mới</h1>
              <p className="text-gray-600 mt-1">Điền thông tin để tạo tour du lịch mới</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Tên Tour <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <input
                  {...register('name')}
                  type="text"
                  id="name"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.name
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                  }`}
                  placeholder="VD: Hạ Long - Cát Bà 2N1D"
                />
              </div>
              {errors.name && (
                <div className="flex items-center mt-2 text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{errors.name.message}</p>
                </div>
              )}
            </div>

            {/* Destination Field */}
            <div>
              <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
                Địa Điểm <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <input
                  {...register('destination')}
                  type="text"
                  id="destination"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.destination
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                  }`}
                  placeholder="VD: Hạ Long, Đà Lạt, Nha Trang"
                />
              </div>
              {errors.destination && (
                <div className="flex items-center mt-2 text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{errors.destination.message}</p>
                </div>
              )}
            </div>

            {/* Duration and Price Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Duration Field */}
              <div>
                <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                  Thời Gian <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    {...register('duration')}
                    type="text"
                    id="duration"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.duration
                        ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                        : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                    }`}
                    placeholder="VD: 2 ngày 1 đêm"
                  />
                </div>
                {errors.duration && (
                  <div className="flex items-center mt-2 text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{errors.duration.message}</p>
                  </div>
                )}
              </div>

              {/* Price Field */}
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Giá Tour (VND) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <input
                    {...register('price')}
                    type="number"
                    id="price"
                    min="100000"
                    max="100000000"
                    step="1000"
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                      errors.price
                        ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                        : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                    }`}
                    placeholder="VD: 1800000"
                  />
                </div>
                {errors.price && (
                  <div className="flex items-center mt-2 text-red-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm font-medium">{errors.price.message}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-2">
                URL Ảnh Tour <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <input
                  {...register('image')}
                  type="url"
                  id="image"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.image
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                  }`}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              {errors.image && (
                <div className="flex items-center mt-2 text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{errors.image.message}</p>
                </div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Mô Tả Tour <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  {...register('description')}
                  id="description"
                  rows="4"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                    errors.description
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                  }`}
                  placeholder="Mô tả chi tiết về tour du lịch..."
                />
              </div>
              {errors.description && (
                <div className="flex items-center mt-2 text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{errors.description.message}</p>
                </div>
              )}
            </div>

            {/* Available Field */}
            <div>
              <label htmlFor="available" className="block text-sm font-semibold text-gray-700 mb-2">
                Số Lượng Có Sẵn <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <input
                  {...register('available')}
                  type="number"
                  id="available"
                  min="1"
                  max="1000"
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-200 ${
                    errors.available
                      ? 'border-red-300 focus:ring-red-200 focus:border-red-400 bg-red-50'
                      : 'border-gray-200 focus:ring-emerald-200 focus:border-emerald-400 hover:border-gray-300'
                  }`}
                  placeholder="VD: 20"
                />
              </div>
              {errors.available && (
                <div className="flex items-center mt-2 text-red-600">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium">{errors.available.message}</p>
                </div>
              )}
            </div>

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 flex items-center justify-center space-x-2 px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Đang thêm...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Thêm Tour</span>
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate('/list')}
                className="flex items-center justify-center space-x-2 px-6 py-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Hủy</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPage;