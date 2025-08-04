// src/components/Login.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

// Iconos
import { MdEmail } from "react-icons/md";
import { FaKey, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // 🔥 Guardar en Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
      });

      // ✅ Guardar en localStorage (para el dashboard)
      localStorage.setItem("user", JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
      }));

      // 🚀 Redirigir al dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
      alert("Error al iniciar sesión. Revisa la consola.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg w-full max-w-sm shadow-md">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold uppercase text-gray-700">Iniciar sesión</h1>
        </div>

        <form className="flex flex-col gap-4">
          <div className="relative">
            <MdEmail className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="email"
              className="bg-gray-50 w-full py-2 px-10 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Correo electrónico"
              required
            />
          </div>

          <div className="relative">
            <FaKey className="absolute left-3 top-3 text-gray-400 text-xl" />
            <input
              type="password"
              className="bg-gray-50 w-full py-2 px-10 rounded-md border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Contraseña"
              required
            />
            <FaEye className="absolute right-3 top-3 text-gray-400 text-xl cursor-pointer" />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold mt-4 w-full py-2 px-4 rounded-md transition duration-300"
          >
            Ingresar
          </button>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 w-full py-2 rounded-md hover:bg-gray-100 transition-colors mt-4 shadow-sm"
          >
            <FcGoogle className="text-2xl" />
            <span className="text-gray-700 font-medium">Iniciar sesión con Google</span>
          </button>
        </form>
      </div>
    </div>
  );
}