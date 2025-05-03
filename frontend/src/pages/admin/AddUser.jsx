//https://mui.com/material-ui/react-autocomplete/#combo-box

// FORMA DEL JSON UACH
// {
//   "Sedes": {
//     "Patagonia": {
//       "claro": [],
//       "oscuro": []
//     },
//     "Puerto Montt": {
//       "Escuelas": {
//         "claro": [],
//         "oscuro": []
//       },
//       "Institutos": {
//         "claro": [],
//         "oscuro": []
//       }
//     },
//     "Valdivia": {
//       "Facultades": {
//         "claro": [],
//         "oscuro": []
//       },
//       "Institutos": {
//         "claro": [],
//         "oscuro": []
//       },
//       "Escuelas": {
//         "claro": [],
//         "oscuro": []
//       }
//     }
//   }
// }

// import * as React from 'react';
// import TextField from '@mui/material/TextField';
// import Stack from '@mui/material/Stack';
// import Autocomplete from '@mui/material/Autocomplete';

// import data from '../../data/U.json';

// function extraerNombresUnicos(rutaObj) {
//   if (!rutaObj) return [];

//   const claro = rutaObj.claro || [];
//   const oscuro = rutaObj.oscuro || [];

//   const todas = [...claro, ...oscuro];
//   const nombresUnicos = Array.from(
//     new Set(todas.map((ruta) => ruta.split('/').pop()?.replace('.png', '')))
//   );

//   return nombresUnicos;
// }

// export default function FiltrosCarreras() {
//   const [sedeSeleccionada, setSedeSeleccionada] = React.useState(null);
//   const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState(null);
//   const [unidadSeleccionada, setUnidadSeleccionada] = React.useState(null);

//   const sedes = data.Sedes ? Object.keys(data.Sedes) : [];

//   // Extraer las categorías (Facultades, Escuelas, Institutos) disponibles para la sede
//   const categorias = sedeSeleccionada
//     ? Object.keys(data.Sedes[sedeSeleccionada]).filter(
//         (k) => k !== 'Carreras' // ignoramos 'Carreras' como categoría
//       )
//     : [];

//   // Extraer nombres dentro de la categoría seleccionada
//   const unidades = sedeSeleccionada && categoriaSeleccionada
//     ? extraerNombresUnicos(data.Sedes[sedeSeleccionada][categoriaSeleccionada])
//     : [];

//   return (
//     <Stack
//       direction="row"
//       spacing={2}
//       sx={{
//         width: '100%',
//         height: '100vh',
//         justifyContent: 'center',
//         alignItems: 'center',
//       }}
//     >
//       <Autocomplete
//         id="sede-autocomplete"
//         options={sedes}
//         value={sedeSeleccionada}
//         onChange={(event, newValue) => {
//           setSedeSeleccionada(newValue);
//           setCategoriaSeleccionada(null);
//           setUnidadSeleccionada(null);
//         }}
//         renderInput={(params) => <TextField {...params} label="Sede" sx={{ width: 250 }} />}
//       />
//       <Autocomplete
//         id="categoria-autocomplete"
//         options={categorias}
//         value={categoriaSeleccionada}
//         onChange={(event, newValue) => {
//           setCategoriaSeleccionada(newValue);
//           setUnidadSeleccionada(null);
//         }}
//         disabled={!sedeSeleccionada}
//         renderInput={(params) => <TextField {...params} label="Categoría" sx={{ width: 200 }} />}
//       />
//       <Autocomplete
//         id="unidad-autocomplete"
//         options={unidades}
//         value={unidadSeleccionada}
//         onChange={(event, newValue) => {
//           setUnidadSeleccionada(newValue);
//         }}
//         disabled={!categoriaSeleccionada}
//         renderInput={(params) => <TextField {...params} label="Nombre" sx={{ width: 300 }} />}
//       />
//     </Stack>
//   );
// }

import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import data from "../../data/U.json";

function extraerNombresUnicos(rutaObj) {
  if (!rutaObj) return [];

  const claro = rutaObj.claro || [];
  const oscuro = rutaObj.oscuro || [];

  const todas = [...claro, ...oscuro];
  const nombresUnicos = Array.from(
    new Set(todas.map((ruta) => ruta.split("/").pop()?.replace(".png", "")))
  );

  return nombresUnicos;
}

export default function FiltrosCarreras() {
  const [sedeSeleccionada, setSedeSeleccionada] = React.useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    React.useState(null);
  const [unidadSeleccionada, setUnidadSeleccionada] = React.useState(null);

  const sedes = data.Sedes ? Object.keys(data.Sedes) : [];

  const categorias = sedeSeleccionada
    ? Object.keys(data.Sedes[sedeSeleccionada]).filter((k) => k !== "Carreras")
    : [];

  const unidades =
    sedeSeleccionada && categoriaSeleccionada
      ? extraerNombresUnicos(
          data.Sedes[sedeSeleccionada][categoriaSeleccionada]
        )
      : [];

  const handleSubir = async () => {
    if (!sedeSeleccionada || !categoriaSeleccionada || !unidadSeleccionada) {
      alert("Por favor selecciona sede, categoría y nombre.");
      return;
    }

    // Construcción de rutas
    const rutaOscuro = `/Sedes/${sedeSeleccionada}/${categoriaSeleccionada}/oscuro/${unidadSeleccionada}.png`;
    const rutaClaro = `/Sedes/${sedeSeleccionada}/${categoriaSeleccionada}/claro/${unidadSeleccionada}.png`;

    const nuevoObjeto = {
      oscuro: { imagen: rutaOscuro },
      claro: { imagen: rutaClaro },
    };

    console.log("Subiendo objeto:", nuevoObjeto);

    // Aquí deberías hacer un fetch a tu backend para actualizar el archivo Usuarios.json
    /*
    await fetch('/api/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoObjeto),
    });
    */

    alert("Selección enviada correctamente (ver consola).");
  };

  return (
    <Stack
      direction="column"
      spacing={4}
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Autocomplete
          id="sede-autocomplete"
          options={sedes}
          value={sedeSeleccionada}
          onChange={(event, newValue) => {
            setSedeSeleccionada(newValue);
            setCategoriaSeleccionada(null);
            setUnidadSeleccionada(null);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Sede" sx={{ width: 250 }} />
          )}
        />
        <Autocomplete
          id="categoria-autocomplete"
          options={categorias}
          value={categoriaSeleccionada}
          onChange={(event, newValue) => {
            setCategoriaSeleccionada(newValue);
            setUnidadSeleccionada(null);
          }}
          disabled={!sedeSeleccionada}
          renderInput={(params) => (
            <TextField {...params} label="Categoría" sx={{ width: 200 }} />
          )}
        />
        <Autocomplete
          id="unidad-autocomplete"
          options={unidades}
          value={unidadSeleccionada}
          onChange={(event, newValue) => {
            setUnidadSeleccionada(newValue);
          }}
          disabled={!categoriaSeleccionada}
          renderInput={(params) => (
            <TextField {...params} label="Nombre" sx={{ width: 300 }} />
          )}
        />
      </Stack>
      <Button
        variant="contained"
        onClick={handleSubir}
        sx={{
          backgroundColor: "#EF5218",
          "&:hover": { backgroundColor: "#c94010" },
        }}
      >
        Subir
      </Button>
    </Stack>
  );
}
