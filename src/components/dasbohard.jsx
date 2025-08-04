// src/components/ModernDashboard.jsx
import { useEffect, useState } from 'react';
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { BsFillHouseDoorFill } from "react-icons/bs";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Si no hay usuario, redirigir al login
      window.location.href = "/";
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-8">
          <img
            src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}&background=random`}
            alt="Foto de perfil"
            className="w-12 h-12 rounded-full border-2 border-blue-500"
          />
          <div>
            <h2 className="font-bold text-gray-800">Bienvenido</h2>
            <p className="text-sm text-gray-600 truncate w-32">{user.displayName}</p>
          </div>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <a href="#inicio" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                <BsFillHouseDoorFill className="text-lg" />
                <span>Inicio</span>
              </a>
            </li>
            <li>
              <a href="#perfil" className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded">
                <FaUser className="text-lg" />
                <span>Perfil</span>
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 text-red-600 hover:bg-gray-100 rounded w-full text-left"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Cerrar sesión</span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Panel de Control</h1>
          <p className="text-gray-600 mt-2">Gestiona tu información de forma segura.</p>
        </header>

        {/* User Info */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Tu información</h2>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={user.photoURL || `https://ui-avatars.com/api/?name=${user.displayName}`}
              alt="Perfil"
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p><strong>Nombre:</strong> {user.displayName}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>
          </div>
        </div>

        {/* Placeholder para próximos pasos */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800">Próximamente: agregar comidas y ver estadísticas 🚀</p>
        </div>
      </main>
    </div>
  );
}