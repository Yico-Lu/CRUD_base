import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation({ isAuthenticated, user, logout }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <>
      {/* Premium Tour Navigation */}
      <nav className="bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-2xl relative overflow-hidden border-b border-white border-opacity-20">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-cyan-400/20 animate-pulse"></div>
        
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 0c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-24-24c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z' fill='%23ffffff' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }}></div>

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo & Brand - Enhanced */}
            <Link to="/" className="flex items-center space-x-4 group relative">
              <div className="relative">
                <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                <div className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm rounded-2xl group-hover:from-white/40 group-hover:to-white/20 transition-all duration-500 shadow-2xl border border-white/20 group-hover:scale-110 group-hover:rotate-3">
                  <svg className="w-8 h-8 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div className="flex flex-col group-hover:translate-x-1 transition-transform duration-300">
                <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white to-cyan-100 bg-clip-text text-transparent drop-shadow-lg">
                  Vietnam
                </span>
                <span className="text-xs font-bold text-cyan-50 -mt-1 tracking-[0.2em] uppercase opacity-90">
                  Tours & Travel
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Menu - Enhanced */}
            <div className="hidden lg:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/list"
                    className="relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-semibold text-[15px] relative z-10 group-hover:tracking-wide transition-all duration-300">Danh sách Tour</span>
                  </Link>
                  <Link
                    to="/add"
                    className="relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-semibold text-[15px] relative z-10 group-hover:tracking-wide transition-all duration-300">Thêm Tour</span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/"
                  className="relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <svg className="w-5 h-5 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span className="font-semibold text-[15px] relative z-10 group-hover:tracking-wide transition-all duration-300">Trang chủ</span>
                </Link>
              )}
            </div>

            {/* Right Menu - Auth Section - Premium */}
            <div className="hidden lg:flex items-center space-x-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-2.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg hover:bg-white/15 transition-all duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative w-8 h-8 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border border-white/30">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    </div>
                    <span className="text-sm font-semibold max-w-[150px] truncate">{user?.email || "User"}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="relative flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-semibold relative z-10">Đăng xuất</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="relative flex items-center space-x-2.5 px-5 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-semibold text-[15px] relative z-10 group-hover:tracking-wide transition-all duration-300">Đăng ký</span>
                  </Link>
                  <Link
                    to="/login"
                    className="relative flex items-center space-x-2.5 px-6 py-2.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden group border border-white/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-bold text-[15px] relative z-10 group-hover:tracking-wide transition-all duration-300">Đăng nhập</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Toggle - Enhanced */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden relative z-10 p-3 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-110"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${open ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
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
          </div>
        </div>

        {/* Mobile Menu - Premium with Animation */}
        <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="bg-gradient-to-br from-teal-600/95 via-emerald-600/95 to-cyan-600/95 backdrop-blur-xl border-t border-white/30 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 py-6 space-y-3">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/list"
                    onClick={() => setOpen(false)}
                    className="relative flex items-center space-x-3 px-5 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden backdrop-blur-sm border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="font-semibold text-base relative z-10">Danh sách Tour</span>
                  </Link>
                  <Link
                    to="/add"
                    onClick={() => setOpen(false)}
                    className="relative flex items-center space-x-3 px-5 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden backdrop-blur-sm border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:rotate-90 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-semibold text-base relative z-10">Thêm Tour</span>
                  </Link>
                  <div className="pt-3 mt-3 border-t border-white/30">
                    <div className="flex items-center space-x-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 mb-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-white/30 to-white/10 rounded-full flex items-center justify-center border border-white/30">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span className="text-sm font-semibold flex-1 truncate">{user?.email || "User"}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full relative flex items-center justify-center space-x-2 px-5 py-3.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 shadow-xl overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                      <svg className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="font-semibold relative z-10">Đăng xuất</span>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="relative flex items-center space-x-3 px-5 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden backdrop-blur-sm border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-semibold text-base relative z-10">Trang chủ</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="relative flex items-center space-x-3 px-5 py-3.5 rounded-xl hover:bg-white/20 transition-all duration-300 group overflow-hidden backdrop-blur-sm border border-white/10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-6 h-6 relative z-10 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="font-semibold text-base relative z-10">Đăng ký</span>
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="relative flex items-center justify-center space-x-2 px-5 py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all duration-300 shadow-xl border border-white/20 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <svg className="w-5 h-5 relative z-10 group-hover:scale-125 group-hover:-rotate-12 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-bold text-base relative z-10">Đăng nhập</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;
