import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Add() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    duration: "",
    price: "",
    image: "",
    description: "",
    available: "",
    category: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.destination || !formData.price || !formData.duration) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }

    try {
      setLoading(true);
      const data = {
        ...formData,
        price: parseInt(formData.price) || 0,
        available: parseInt(formData.available) || 0,
      };

      const response = await axios.post("http://localhost:3001/tours", data);

      if (response.status >= 200 && response.status < 300) {
        toast.success("Thêm tour thành công");
        navigate("/list");
      } else {
        throw new Error("Lỗi khi thêm tour");
      }
    } catch (error) {
      toast.error("Lỗi: " + error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">Thêm mới tour</h1>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Tên tour <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="VD: Đà Lạt 4N3D"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block font-medium mb-1">
            Điểm đến <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="VD: Đà Lạt"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
          <label htmlFor="duration" className="block font-medium mb-1">
            Thời gian <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="VD: 4 ngày 3 đêm"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Giá (VND) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="VD: 3200000"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>

       <div>
          <label htmlFor="image" className="block font-medium mb-1">
            URL Ảnh
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="VD: https://picsum.photos/400/300?random=3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Mô tả
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Nhập mô tả tour"
            rows="3"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="available" className="block font-medium mb-1">
            Số chỗ còn
          </label>
          <input
            type="number"
            id="available"
            name="available"
            value={formData.available}
            onChange={handleChange}
            placeholder="VD: 10"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Loại tour
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="tour-noi-dia">Tour nội địa</option>
            <option value="tour-quoc-te">Tour quốc tế</option>
            <option value="tour-theo-yeu-cau">Tour theo yêu cầu</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="active"
            name="active"
            checked={formData.active}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 cursor-pointer"
          />
          <label htmlFor="active" className="font-medium cursor-pointer">
            Kích hoạt tour
          </label>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Đang lưu..." : "Thêm mới"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Add;