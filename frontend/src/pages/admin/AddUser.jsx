// https://mui.com/material-ui/react-autocomplete/#combo-box
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

import data from '../../data/UACh.json';

export default function FiltrosCarreras() {
  const [sedeSeleccionada, setSedeSeleccionada] = React.useState(null);
  const [facultadSeleccionada, setFacultadSeleccionada] = React.useState(null);
  const [carreraSeleccionada, setCarreraSeleccionada] = React.useState(null);


  const sedes = data.universidad.sedes.map((sede) => sede.nombre);

  const facultades = sedeSeleccionada
    ? data.universidad.sedes.find((s) => s.nombre === sedeSeleccionada)?.facultades.map((f) => f.nombre) || []
    : [];

  const carreras = facultadSeleccionada
    ? (
        data.universidad.sedes.find((s) => s.nombre === sedeSeleccionada)
          ?.facultades.find((f) => f.nombre === facultadSeleccionada)
          ?.carreras || []
      )
    : [];
  

  return (
    <Stack className="xl:pt-25" direction="row" spacing={2} sx={{ width: '100%' }}>
      <Autocomplete
        id="sede-autocomplete"
        options={sedes}
        value={sedeSeleccionada}
        onChange={(event, newValue) => {
          setSedeSeleccionada(newValue);
          setFacultadSeleccionada(null); // Reset facultad al cambiar sede
        }}
        renderInput={(params) => <TextField {...params} label="Sede" sx={{ width: 250 }} />}
      />
      <Autocomplete
        id="facultad-autocomplete"
        options={facultades}
        value={facultadSeleccionada}
        onChange={(event, newValue) => {
          setFacultadSeleccionada(newValue);
          setCarreraSeleccionada(null); // reset
        }}
        disabled={!sedeSeleccionada}
        renderInput={(params) => <TextField {...params} label="Facultad" sx={{ width: 300 }} />}
      />

      <Autocomplete
        id="carrera-autocomplete"
        options={carreras}
        value={carreras.includes(carreraSeleccionada) ? carreraSeleccionada : null}
        onChange={(event, newValue) => setCarreraSeleccionada(newValue)}
        disabled={!facultadSeleccionada}
        renderInput={(params) => <TextField {...params} label="Carrera" sx={{ width: 300 }} />}
      />
    </Stack>
  );
}
