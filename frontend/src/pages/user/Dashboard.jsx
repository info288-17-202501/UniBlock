import React from 'react';

const UserDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Panel de Usuario</h1>
      <p className="mb-8 text-gray-700">
        Bienvenido a tu panel de usuario. Aquí puedes ver el estado de tus votaciones y tu información personal.
      </p>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Votaciones Activas</h2>
        <p className="text-gray-600">No tienes votaciones activas en este momento.</p>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Historial de Votaciones</h2>
        <p className="text-gray-600">No hay historial disponible.</p>
      </div>
    </div>
  );
};

export default UserDashboard;