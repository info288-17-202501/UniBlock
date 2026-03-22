import React, { useState } from "react";
import { Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import { useDarkMode } from "@context/darkModeContext";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Award, Users, Info } from "lucide-react";

// Registra los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const NOTICIAS = [
  {
    id: 1,
    titulo: "Resultados: Centro de Alumnos 2026",
    fecha: "Marzo 15, 2026",
    categoria: "Resultados",
    icon: <Award className="w-5 h-5" />,
    descripcion: "La Facultad de Ingeniería lidera la participación en la elección de la nueva directiva estudiantil.",
    grafico: {
      type: "pie",
      labels: ["Ingeniería", "Ciencias", "Humanidades"],
      datasets: [
        {
          label: "Votos",
          data: [120, 90, 150],
          backgroundColor: ["#EF5218", "#F97316", "#FB923C"],
          borderWidth: 0,
        },
      ],
    },
  },
  {
    id: 2,
    titulo: "Participación en Tiempo Real",
    fecha: "Marzo 12, 2026",
    categoria: "Tendencias",
    icon: <TrendingUp className="w-5 h-5" />,
    descripcion: "Se observa un incremento del 25% en la participación digital respecto al año anterior.",
    grafico: {
      type: "line",
      labels: ["Lun", "Mar", "Mie", "Jue", "Vie"],
      datasets: [
        {
          label: "Votantes",
          data: [250, 310, 420, 380, 510],
          borderColor: "#EF5218",
          backgroundColor: "rgba(239, 82, 24, 0.1)",
          fill: true,
          tension: 0.4,
          pointBackgroundColor: "#EF5218",
        },
      ],
    },
  },
  {
    id: 3,
    titulo: "Aprobación Reforma de Estatutos",
    fecha: "Marzo 10, 2026",
    categoria: "Consulta",
    icon: <Users className="w-5 h-5" />,
    descripcion: "Los estudiantes han aprobado por amplia mayoría las nuevas reglas de gobernanza digital.",
    grafico: {
      type: "bar",
      labels: ["A favor", "En contra", "Nulo"],
      datasets: [
        {
          label: "Votos",
          data: [400, 50, 15],
          backgroundColor: ["#EF5218", "#4b5563", "#9ca3af"],
          borderRadius: 8,
        },
      ],
    },
  },
  {
    id: 4,
    titulo: "Dirección de Escuela: Resultados",
    fecha: "Marzo 05, 2026",
    categoria: "Resultados",
    icon: <Award className="w-5 h-5" />,
    descripcion: "El proceso cerró con una auditoría exitosa en la red blockchain descentralizada.",
    grafico: {
      type: "doughnut",
      labels: ["Lista A", "Lista B", "Lista C"],
      datasets: [
        {
          label: "Votos",
          data: [200, 170, 110],
          backgroundColor: ["#EF5218", "#F97316", "#FB923C"],
          borderWidth: 0,
        },
      ],
    },
  },
];

const Noticias = () => {
  const { darkMode } = useDarkMode();
  const [paginaActual, setPaginaActual] = useState(0);
  const itemsPorPagina = 3;
  const totalPaginas = Math.ceil(NOTICIAS.length / itemsPorPagina);

  const handleNext = () => setPaginaActual((p) => (p + 1) % totalPaginas);
  const handleBack = () => setPaginaActual((p) => (p - 1 + totalPaginas) % totalPaginas);

  const visibles = NOTICIAS.slice(
    paginaActual * itemsPorPagina,
    (paginaActual + 1) * itemsPorPagina
  );

  const chartTextColor = darkMode ? "#e2e8f0" : "#1f2937";
  const gridColor = darkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(31, 41, 55, 0.1)";

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: chartTextColor,
          font: { family: 'inherit', size: 11, weight: 'bold' }
        }
      },
      tooltip: {
        backgroundColor: darkMode ? '#374151' : '#1f2937',
        titleFont: { size: 13 },
        bodyFont: { size: 13 },
        padding: 12,
        cornerRadius: 8,
      }
    },
    scales: {
      x: { 
        grid: { display: false }, 
        ticks: { color: chartTextColor, font: { weight: '600' } } 
      },
      y: { 
        grid: { color: gridColor }, 
        ticks: { color: chartTextColor, font: { weight: '600' } } 
      }
    }
  };

  return (
    <section id="noticias" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2 block">
              Resultados y Prensa
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[var(--color-text)]">
              Noticias del <span className="text-orange-600">Proceso</span>
            </h2>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="p-3 rounded-full border border-[var(--border-color)] hover:bg-orange-500/10 hover:text-orange-600 transition-all text-[var(--color-text)]"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="text-sm font-medium text-[var(--color-text)] opacity-60">
              {paginaActual + 1} / {totalPaginas}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-[var(--border-color)] hover:bg-orange-500/10 hover:text-orange-600 transition-all text-[var(--color-text)]"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout text">
            {visibles.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-[var(--color-background-secondary)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full"
              >
                {/* Header Card */}
                <div className="p-6 pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2 text-orange-600">
                      <div className="p-2 bg-orange-500/10 rounded-lg">
                        {item.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest">{item.categoria}</span>
                    </div>
                    <span className="text-xs text-[var(--color-text)] opacity-50 font-medium">{item.fecha}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-orange-600 transition-colors mb-3 leading-tight">
                    {item.titulo}
                  </h3>
                  <p className="text-sm text-[var(--color-text)] opacity-70 leading-relaxed">
                    {item.descripcion}
                  </p>
                </div>

                {/* Chart Area */}
                <div className="px-6 pb-6 mt-auto">
                  <div className="bg-[var(--color-background)] rounded-2xl p-4 border border-[var(--border-color)] h-56 flex items-center justify-center relative overflow-hidden">
                    <div className="w-full h-full relative z-10">
                      {item.grafico.type === "bar" && <Bar data={item.grafico} options={chartOptions} />}
                      {item.grafico.type === "line" && <Line data={item.grafico} options={chartOptions} />}
                      {item.grafico.type === "pie" && <Pie data={item.grafico} options={chartOptions} />}
                      {item.grafico.type === "doughnut" && <Doughnut data={item.grafico} options={chartOptions} />}
                    </div>
                  </div>
                </div>

                {/* CTA Overlay (Visual Only) */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background-secondary)] via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Info Banner */}
        <div className="mt-16 p-6 bg-orange-600/10 border border-orange-500/20 rounded-2xl flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
          <div className="p-3 bg-orange-600 rounded-xl text-white">
            <Info className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-[var(--color-text)]">Datos auditados por Blockchain</h4>
            <p className="text-sm text-[var(--color-text)] opacity-70">Todos los resultados mostrados son inmutables y pueden ser verificados directamente en la red descentralizada de UniBlock.</p>
          </div>
          <button className="px-6 py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition-colors text-sm shadow-md">
            Ver Explorador
          </button>
        </div>
      </div>
    </section>
  );
};

export default Noticias;
