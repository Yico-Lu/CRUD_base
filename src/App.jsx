import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import List from "./pages/List";
import Add from "./pages/Add";
import Edit from "./pages/Edit";
import Layout from "./pages/Layout";

function App() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* HEADER - Navbar Tailwind */}
      <nav className="bg-blue-600 text-white shadow">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="text-xl font-semibold">
            <strong>WEB501 App</strong>
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden block focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {open ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Menu desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/layout" className="hover:text-gray-200">
              Trang chủ
            </Link>
            <Link to="/list" className="hover:text-gray-200">
              Danh sách
            </Link>
            <Link to="/add" className="hover:text-gray-200">
              Thêm mới
            </Link>
            <Link to="/edit" className="hover:text-gray-200">
              Sửa
            </Link>
          </div>

          {/* Right menu desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-gray-200">
              Đăng nhập
            </a>
            <a href="#" className="hover:text-gray-200">
              Đăng ký
            </a>
          </div>
        </div>
        
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto mt-10 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Chào mừng đến với WEB501</h1>
        <p className="text-lg text-gray-600">Ứng dụng quản lý dữ liệu</p>
      </div>
        <Routes>
            <Route path="/list" element={<List />} />
            <Route path="/add" element={<Add />} />
            <Route path="/edit" element={<Edit />} />
            <Route path="/layout" element={<Layout />} />
        </Routes>
      <Toaster />
    </>
  );
}

export default App;