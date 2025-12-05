import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function RegisterPage(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:3000/register", {
                email,
                password
            });
            toast.success("Đăng kí thành công");
            navigate("/login");
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
    <div className="mx-auto mt-20 w-200 p-6">
      <h1 className="text-4xl font-semibold mb-6 text-center">Đăng ký</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Text input */}
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Email
          </label>
          <input
            value={email}
            onChange={event => setEmail(event.target.value)}
            type="email"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="text" className="block font-medium mb-1">
            Password
          </label>
          <input
            value={password}
            onChange={event => setPassword(event.target.value)}
            type="password"
            id="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Đăng kí
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;