import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function List() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3000/tours");
        setTours(response.data);
      } catch (error) {
        toast.error("Lỗi khi lấy danh sách tours");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  
  if (loading) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">Đang tải dữ liệu...</p>
      </div>
    );
  }

  // Xóa tour (DELETE)
    const deleteTour = async (id) => {
        if (!confirm("Bạn chắc chắn muốn xóa Tour này chứ?")) return;
        setLoading(true);
        try {
            await axios.delete(`http://localhost:3000/tours/${id}`);
            setTours(tours.filter((t) => t.id !== id));
            toast.success("Xóa tour thành công");
        } catch (error) {
            toast.error("Lỗi khi xoá tours");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Danh sách tours</h1>
          <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Thêm mới
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg text-center">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border border-gray-300">STT</th>
                <th className="px-4 py-2 border border-gray-300">Tên tour</th>
                <th className="px-4 py-2 border border-gray-300">Ảnh tour</th>
                <th className="px-4 py-2 border border-gray-300">Địa điểm</th>
                <th className="px-4 py-2 border border-gray-300">Giá</th>
                <th className="px-4 py-2 border border-gray-300">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour, index) => (
                <tr key={tour.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300 font-semibold">
                    {tour.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <img className="w-30" src={tour.image} alt={tour.name} />
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tour.destination}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {tour.price?.toLocaleString()} VND
                  </td>
                  <td className="px-4 py-2 border border-gray-300 text-center">
                    <div className="flex gap-2 justify-center">
                      <Link to={`/edit/${tour.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 text-sm">
                         Sửa
                      </Link>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                      onClick={() => deleteTour(tour.id)}>
                         Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default List;