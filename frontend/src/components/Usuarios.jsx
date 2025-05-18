import usuariosData from "../data/Usuarios.json";
import { useDarkMode } from "@context/darkModeContext"; 

const Usuarios = () => {
  const { darkMode } = useDarkMode();
  const modo = darkMode ? "claro" : "oscuro";
  const usuariosFiltrados = usuariosData[modo];

  return (
    <section id="usuarios" className="py-8 px-6 text-center mt-12">
      <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">
        Ellos confían en UniBlock
      </h2>
      <div className="grid  grid-cols-1 md:grid-cols-4 gap-10">
        {usuariosFiltrados.map((item) => (
          <div key={item.id}>
            <div
              key={item.id}
              className="flex items-center justify-center border-[var(--border-color)] p-4 rounded-lg shadow-lg hover:shadow-xl transition border"
            >
              <img
                src={item.imagen}
                alt="Logo"
                className="max-h-24 w-auto object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Usuarios;
