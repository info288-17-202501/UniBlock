import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function VotationForm() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    candidates: [],
    isPublic: true,
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  const navigate = useNavigate();

  useEffect(() => {
      fetch("http://localhost/api/checks/isadmin", {
        method: "GET",
        credentials: "include", 
      })
        .then((res) => {
          if (!res.ok) throw new Error("No autorizado");
          return res.json();
        })
        .then(() => {
          setAuthorized(true);
          setLoading(false);
        })
        .catch(() => {
          setAuthorized(false);
          setLoading(false);
          navigate("/"); // o muestra mensaje si prefieres
        });
    }, []);
  
    if (loading) return <div>Cargando...</div>;


  return (
    <div className="min-h-screen lg:pt-30 bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <ProgressBar currentStep={currentStep} />

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mt-8">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Formulario de elección - PASO {currentStep}/4
          </h2>

          {currentStep === 1 && (
            <Step1
              nextStep={nextStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 2 && (
            <Step2
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 3 && (
            <Step3
              nextStep={nextStep}
              prevStep={prevStep}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {currentStep === 4 && (
            <Step4 prevStep={prevStep} formData={formData} />
          )}
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ currentStep }) {
  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex flex-col items-center z-10">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full ${currentStep >= step
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
                } font-medium`}
            >
              {step}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-4 left-0 right-0 flex px-8">
        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
        <div className="flex-1 h-0.5 bg-gray-200 mx-2"></div>
      </div>
      <div className="absolute top-4 left-0 right-0 flex px-8">
        <div
          className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${currentStep >= 2 ? "bg-blue-600" : "bg-transparent"
            }`}
        ></div>
        <div
          className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${currentStep >= 3 ? "bg-blue-600" : "bg-transparent"
            }`}
        ></div>
        <div
          className={`flex-1 h-0.5 mx-2 transition-all duration-300 ${currentStep >= 4 ? "bg-blue-600" : "bg-transparent"
            }`}
        ></div>
      </div>
    </div>
  );
}

function Step1({ nextStep, formData, setFormData }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Campos de título y descripción (se mantienen igual) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Título
        </label>
        <input
          className="input"
          placeholder="Ingrese el título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descripción
        </label>
        <input
          className="input"
          placeholder="Ingrese la descripción"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
      </div>

      {/* Sección de Fechas y Horas */}
      <div className="grid grid-cols-2 gap-4">
        {/* Fecha y Hora de Inicio */}
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de inicio
            </label>
            <input
              type="date"
              className="input w-full"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de inicio
            </label>
            <input
              type="time"
              className="input w-full"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
            />
          </div>
        </div>

        {/* Fecha y Hora de Fin */}
        <div className="space-y-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fecha de fin
            </label>
            <input
              type="date"
              className="input w-full"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hora de fin
            </label>
            <input
              type="time"
              className="input w-full"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Validación básica de fechas */}
      {formData.startDate && formData.endDate && 
        new Date(formData.endDate) < new Date(formData.startDate) && (
          <p className="text-red-500 text-sm">
            La fecha de fin no puede ser anterior a la fecha de inicio
          </p>
      )}

      <button 
        className="btn-primary mt-4" 
        onClick={nextStep}
        disabled={
          !formData.title || 
          !formData.startDate || 
          !formData.endDate ||
          (new Date(formData.endDate) < new Date(formData.startDate))
        }
      >
        Siguiente
      </button>
    </div>
  );
}

function Step2({ nextStep, prevStep, formData, setFormData }) {
  const addCandidate = () => {
    const name = prompt("Nombre del candidato:");
    if (name) {
      const email = prompt("Email del candidato:");
      if (email) {
        setFormData((prev) => ({
          ...prev,
          candidates: [...prev.candidates, { name, email }],
        }));
      }
    }
  };

  const removeCandidate = (index) => {
    setFormData((prev) => ({
      ...prev,
      candidates: prev.candidates.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="flex flex-col gap-4">
      <button className="btn-secondary" onClick={addCandidate} type="button">
        + Agregar candidato
      </button>

      {formData.candidates.length > 0 ? (
        <ul className="border rounded-lg divide-y">
          {formData.candidates.map((c, i) => (
            <li key={i} className="p-3 flex justify-between items-center">
              <span>
                {c.name} ({c.email})
              </span>
              <button
                onClick={() => removeCandidate(i)}
                className="text-red-500 hover:text-red-700"
                type="button"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-sm">No hay candidatos agregados</p>
      )}

      <div className="flex justify-between mt-6">
        <button className="btn-outline" onClick={prevStep} type="button">
          Volver
        </button>
        <button className="btn-primary" onClick={nextStep} type="button">
          Siguiente
        </button>
      </div>
    </div>
  );
}

function Step3({ nextStep, prevStep, formData, setFormData }) {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-3">
          ¿Quién puede votar?
        </h3>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="usuarios"
              className="h-4 w-4 text-blue-600"
              checked={formData.isPublic === true}
              onChange={() => setFormData({ ...formData, isPublic: true })}
            />
            <div>
              <span className="block text-sm font-medium">
                Todos los usuarios
              </span>
              <span className="block text-xs text-gray-500">
                Cualquier persona con acceso al sistema podrá votar
              </span>
            </div>
          </label>
          <label className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
            <input
              type="radio"
              name="usuarios"
              className="h-4 w-4 text-blue-600"
              checked={formData.isPublic === false}
              onChange={() => setFormData({ ...formData, isPublic: false })}
            />
            <div>
              <span className="block text-sm font-medium">
                Usuarios restringidos
              </span>
              <span className="block text-xs text-gray-500">
                Solo usuarios seleccionados podrán votar
              </span>
            </div>
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button className="btn-outline" onClick={prevStep} type="button">
          Volver
        </button>
        <button className="btn-primary" onClick={nextStep} type="button">
          Siguiente
        </button>
      </div>
    </div>
  );
}

function Step4({ prevStep, formData }) {
   const navigate = useNavigate();

  const handleCreateElection = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/votations/create-votation", {
        method: "POST",
        credentials: "include", // importante para enviar cookies (token de sesión)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      

      if (response.ok) {
        alert("Elección creada con éxito");
        console.log("Respuesta del backend:", data);
        // puedes redirigir a otra página o limpiar el formulario
        navigate("/user/dashboard"); // redirigir al listado de votaciones
        
      } else {
        console.error("Error al crear la elección:", data.message);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Resumen de la elección
      </h3>

      <div className="space-y-4">
        <div className="border-b pb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Información básica
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Título</p>
              <p className="text-sm font-medium">{formData.title || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Descripción</p>
              <p className="text-sm font-medium">
                {formData.description || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Fechas</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Inicio</p>
              <p className="text-sm font-medium">{formData.startDate || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Fin</p>
              <p className="text-sm font-medium">{formData.endDate || "-"}</p>
            </div>
          </div>
        </div>

        <div className="border-b pb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Candidatos</h4>
          <div className="space-y-2">
            {formData.candidates && formData.candidates.length > 0 ? (
              formData.candidates.map((c, i) => (
                <p key={i} className="text-sm font-medium">
                  {/* Mostrar el nombre si es un objeto, o el string directamente */}
                  {typeof c === 'object' ? c.name : c}
                </p>
              ))
            ) : (
              <p className="text-sm text-gray-500">No hay candidatos</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            Participantes
          </h4>
          <p className="text-sm font-medium capitalize">
            {formData.isPublic ? "Todos los usuarios" : "Usuarios restringidos"}
          </p>
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button className="btn-outline" onClick={prevStep} type="button">
          Volver
        </button>
        <button className="btn-success" type="button" onClick={handleCreateElection}>
          Confirmar y crear elección
        </button>
      </div>
    </div>
  );
}

// Estilos con Tailwind
const styles = `
.input {
  @apply w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm;
}
.btn-primary {
  @apply w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}
.btn-secondary {
  @apply w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 border border-gray-300;
}
.btn-outline {
  @apply bg-white hover:bg-gray-50 text-gray-700 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500;
}
.btn-success {
  @apply w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500;
}
`;

export default VotationForm;
