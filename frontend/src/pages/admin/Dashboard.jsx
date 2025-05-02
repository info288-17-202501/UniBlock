import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Dashboard - UniBlock</h2>
      <nav>
        <ul>
          <li><Link to="/admin/create-votation">Crear Votación</Link></li>
          <li><Link to="/admin/add-user">Agregar Usuario</Link></li>
          {/* Agrega más opciones según lo que necesites */}
        </ul>
      </nav>
    </div>
  );
}

export default Dashboard;
