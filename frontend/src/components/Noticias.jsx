// import React, { useState } from 'react';
// import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement } from 'chart.js';

// // Registra los componentes de Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement, ArcElement);

// const noticias = [
//   {
//     titulo: 'Resultados de la Votación para Centro de Alumnos',
//     descripcion: 'Los resultados de la última votación para el Centro de Alumnos se han procesado. A continuación, mostramos los resultados por facultad.',
//     grafico: {
//       type: 'pie',
//       labels: ['Ingeniería', 'Ciencias', 'Humanidades'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [120, 90, 150],
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Resultados de la Votación para Rector',
//     descripcion: 'La votación para elegir al nuevo rector también se ha cerrado. Los resultados han sido procesados y aquí los mostramos.',
//     grafico: {
//       type: 'line',
//       labels: ['Candidato A', 'Candidato B', 'Candidato C'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [250, 180, 120],
//           borderColor: '#36A2EB',
//           backgroundColor: 'rgba(255, 255, 255, 0.2)',
//           fill: true,
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Movilización Estudiantil: ¿Qué opina la comunidad?',
//     descripcion: 'En esta noticia se presenta la votación sobre la movilización estudiantil. Los resultados muestran un fuerte apoyo a la movilización.',
//     grafico: {
//       type: 'bar',
//       labels: ['Sí', 'No'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [400, 50],
//           backgroundColor: '#FF9F40',
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Resultados de la Votación para Dirección de Escuela',
//     descripcion: 'Los resultados de la votación para la Dirección de Escuela también han sido procesados. Aquí están los detalles.',
//     grafico: {
//       type: 'doughnut',
//       labels: ['Candidato A', 'Candidato B', 'Candidato C'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [200, 170, 110],
//           backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Resultados de la Votación para Movimiento Social Estudiantil',
//     descripcion: 'Esta noticia presenta los resultados de la votación sobre un importante movimiento social que involucra a estudiantes.',
//     grafico: {
//       type: 'line',
//       labels: ['Sí', 'No'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [350, 90],
//           borderColor: '#4BC0C0',
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           fill: true,
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Análisis de Participación Estudiantil en Votaciones Recientes',
//     descripcion: 'En este artículo se analizan las tendencias y la participación en las votaciones más recientes en la universidad.',
//     grafico: {
//       type: 'bar',
//       labels: ['Ingeniería', 'Ciencias', 'Humanidades', 'Medicina'],
//       datasets: [
//         {
//           label: 'Votos',
//           data: [300, 250, 150, 100],
//           backgroundColor: '#FFCE56',
//         },
//       ],
//     },
//   },
//   {
//     titulo: 'Votación sobre Reglas de Participación',
//     descripcion: 'Los resultados de la votación acerca de las nuevas reglas para las elecciones internas han sido analizados y compartidos.',
//     grafico: {
//       type: 'pie',
//       labels: ['Aprobado', 'Rechazado'],
//       datasets: [
//         {
//           label: 'Resultados',
//           data: [320, 80],
//           backgroundColor: ['#FF6384', '#36A2EB'],
//         },
//       ],
//     },
//   },
// ];

// const Noticias = () => {
//   const [paginaActual, setPaginaActual] = useState(1); // Página actual
//   const noticiasPorPagina = 3; // Número de noticias por página

//   // Función para cambiar la página
//   const cambiarPagina = (numeroPagina) => {
//     if (numeroPagina > 0 && numeroPagina <= totalPaginas) {
//       setPaginaActual(numeroPagina);
//     }
//   };

//   // Total de páginas
//   const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

//   // Noticias a mostrar en la página actual
//   const noticiasVisibles = noticias.slice((paginaActual - 1) * noticiasPorPagina, paginaActual * noticiasPorPagina);

//   return (
//     <section id="noticias" className='mt-24'>
//       <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6">Noticias</h2>
//       {/* Noticias */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//         {noticiasVisibles.map((item, index) => (
//           // <div key={index} className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition">
//           <div key={index} className="p-4 border border-[var(--border-color)] rounded-lg shadow-lg hover:shadow-xl transition">
//             <div className="pb-4">
//               <h3 className="text-xl text-[var(--color-text)] font-semibold">{item.titulo}</h3>
//             </div>
//             <p className="text-[var(--color-text-secondary)]">{item.descripcion}</p>
//             <div className="py-4">
//               {item.grafico.type === 'bar' && <Bar data={item.grafico} options={{ responsive: true }} />}
//               {item.grafico.type === 'line' && <Line data={item.grafico} options={{ responsive: true }} />}
//               {item.grafico.type === 'pie' && <div className="w-full max-w-[300px] h-[300px] mx-auto"><Pie data={item.grafico} options={{ responsive: true, maintainAspectRatio: false }} /></div>}
//               {item.grafico.type === 'doughnut' && <div className="w-full max-w-[300px] h-[300px] mx-auto"><Doughnut data={item.grafico} options={{ responsive: true, maintainAspectRatio: false }} /></div>}
//               {/* {item.grafico.type === 'pie' && <Pie data={item.grafico} options={{ responsive: true }} />}
//               {item.grafico.type === 'doughnut' && <Doughnut data={item.grafico} options={{ responsive: true }} />} */}
//             </div>
//             <hr className="my-2 border-gray-300" />
//           </div>
//         ))}
//       </div>

//       {/* Paginación */}
//       {totalPaginas > 1 && (
//         <div className="flex justify-center mt-6 space-x-4">
//           <button
//             onClick={() => cambiarPagina(paginaActual - 1)}
//             className="btn border-2 border-gray-500 text-gray-500 rounded-full px-6 py-3 hover:bg-gray-500 hover:text-white"
//             disabled={paginaActual === 1}
//           >
//             Anterior
//           </button>
//           <span className="text-lg text-[var(--color-text)] font-semibold">{paginaActual} / {totalPaginas}</span>
//           <button
//             onClick={() => cambiarPagina(paginaActual + 1)}
//             className="btn border-2 border-gray-500 text-gray-500 rounded-full px-6 py-3 hover:bg-gray-500 hover:text-white"
//             disabled={paginaActual === totalPaginas}
//           >
//             Siguiente
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default Noticias;

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
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

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

const noticias = [
  {
    titulo: "Resultados de la Votación para Centro de Alumnos",
    descripcion:
      "Los resultados de la última votación para el Centro de Alumnos se han procesado. A continuación, mostramos los resultados por facultad.",
    grafico: {
      type: "pie",
      labels: ["Ingeniería", "Ciencias", "Humanidades"],
      datasets: [
        {
          label: "Votos",
          data: [120, 90, 150],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  },
  {
    titulo: "Resultados de la Votación para Rector",
    descripcion:
      "La votación para elegir al nuevo rector también se ha cerrado. Los resultados han sido procesados y aquí los mostramos.",
    grafico: {
      type: "line",
      labels: ["Candidato A", "Candidato B", "Candidato C"],
      datasets: [
        {
          label: "Votos",
          data: [250, 180, 120],
          borderColor: "#36A2EB",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          fill: true,
        },
      ],
    },
  },
  {
    titulo: "Movilización Estudiantil: ¿Qué opina la comunidad?",
    descripcion:
      "En esta noticia se presenta la votación sobre la movilización estudiantil. Los resultados muestran un fuerte apoyo a la movilización.",
    grafico: {
      type: "bar",
      labels: ["Sí", "No"],
      datasets: [
        {
          label: "Votos",
          data: [400, 50],
          backgroundColor: "#FF9F40",
        },
      ],
    },
  },
  {
    titulo: "Resultados de la Votación para Dirección de Escuela",
    descripcion:
      "Los resultados de la votación para la Dirección de Escuela también han sido procesados. Aquí están los detalles.",
    grafico: {
      type: "doughnut",
      labels: ["Candidato A", "Candidato B", "Candidato C"],
      datasets: [
        {
          label: "Votos",
          data: [200, 170, 110],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    },
  },
  {
    titulo: "Resultados de la Votación para Movimiento Social Estudiantil",
    descripcion:
      "Esta noticia presenta los resultados de la votación sobre un importante movimiento social que involucra a estudiantes.",
    grafico: {
      type: "line",
      labels: ["Sí", "No"],
      datasets: [
        {
          label: "Votos",
          data: [350, 90],
          borderColor: "#4BC0C0",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    },
  },
  {
    titulo: "Análisis de Participación Estudiantil en Votaciones Recientes",
    descripcion:
      "En este artículo se analizan las tendencias y la participación en las votaciones más recientes en la universidad.",
    grafico: {
      type: "bar",
      labels: ["Ingeniería", "Ciencias", "Humanidades", "Medicina"],
      datasets: [
        {
          label: "Votos",
          data: [300, 250, 150, 100],
          backgroundColor: "#FFCE56",
        },
      ],
    },
  },
  {
    titulo: "Votación sobre Reglas de Participación",
    descripcion:
      "Los resultados de la votación acerca de las nuevas reglas para las elecciones internas han sido analizados y compartidos.",
    grafico: {
      type: "pie",
      labels: ["Aprobado", "Rechazado"],
      datasets: [
        {
          label: "Resultados",
          data: [320, 80],
          backgroundColor: ["#FF6384", "#36A2EB"],
        },
      ],
    },
  },
];

const Noticias = () => {
  const [paginaActual, setPaginaActual] = useState(0); // Cambié el valor a 0 porque MobileStepper empieza desde 0
  const noticiasPorPagina = 3; // Número de noticias por página
  const theme = useTheme();

  // Función para cambiar la página
  const handleNext = () => {
    if (paginaActual < totalPaginas - 1) {
      setPaginaActual((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (paginaActual > 0) {
      setPaginaActual((prev) => prev - 1);
    }
  };

  // Total de páginas
  const totalPaginas = Math.ceil(noticias.length / noticiasPorPagina);

  // Noticias a mostrar en la página actual
  const noticiasVisibles = noticias.slice(
    paginaActual * noticiasPorPagina,
    (paginaActual + 1) * noticiasPorPagina
  );

  return (
    <section id="noticias" className="mt-24">
      <h2 className="text-3xl font-bold text-[var(--color-text)] mb-6">
        Noticias
      </h2>
      {/* Noticias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {noticiasVisibles.map((item, index) => (
          <div
            key={index}
            className="p-4 border flex flex-col h-full border-[var(--border-color)] rounded-lg shadow-lg hover:shadow-xl transition"
          >
            <div className="pb-4">
              <h3 className="text-xl text-[var(--color-text)] font-semibold">
                {item.titulo}
              </h3>
            </div>
            <p className="text-[var(--color-text-secondary)]">
              {item.descripcion}
            </p>
            <div className="py-4 flex-grow">
              {item.grafico.type === "bar" && (
                <Bar data={item.grafico} options={{ responsive: true }} />
              )}
              {item.grafico.type === "line" && (
                <Line data={item.grafico} options={{ responsive: true }} />
              )}
              {item.grafico.type === "pie" && (
                <div className="w-full max-w-[300px] h-[300px] mx-auto">
                  <Pie
                    data={item.grafico}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              )}
              {item.grafico.type === "doughnut" && (
                <div className="w-full max-w-[300px] h-[300px] mx-auto">
                  <Doughnut
                    data={item.grafico}
                    options={{ responsive: true, maintainAspectRatio: false }}
                  />
                </div>
              )}
            </div>
            <hr className="my-2 border-gray-300" />
          </div>
        ))}
      </div>

      {/* Paginación con MobileStepper */}
      {totalPaginas > 1 && (
        <div className="flex justify-center mt-6 space-x-4">
          <MobileStepper
            variant="dots"
            steps={totalPaginas}
            position="static"
            activeStep={paginaActual}
            sx={{
              maxWidth: 400,
              flexGrow: 1,
              backgroundColor: "transparent",
              ".MuiMobileStepper-dot": {
                backgroundColor: "#ccc", // color de los dots inactivos
              },
              ".MuiMobileStepper-dotActive": {
                backgroundColor: "#EF5218", // dot activo
              },
              ".MuiButton-root": {
                color: "#EF5218", // botones activos
                display: "flex",
                alignItems: "end",   // centra verticalmente
                "&.Mui-disabled": {
                  color: "#63230b", // color cuando el botón está deshabilitado
                },
                // íconos dentro del botón deshabilitado
                "&.Mui-disabled .MuiSvgIcon-root": {
                  color: "#63230b", // flecha deshabilitada
                },
              },
              ".MuiSvgIcon-root": {
                color: "#EF5218", // flechas activas
              },
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={paginaActual === totalPaginas - 1}
              >
                Siguiente
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={paginaActual === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Anterior
              </Button>
            }
          />
        </div>
      )}
    </section>
  );
};

export default Noticias;
