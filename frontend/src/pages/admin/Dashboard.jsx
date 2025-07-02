import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const itemData = [
  {
    img: "../crear_voto.png",
    title: "Crear Votación",
    path: "/admin/create-votation",
  },
  {
    img: "../agregar_institucion.png",
    title: "Agregar Usuario",
    path: "/admin/add-user",
  },
  {
    img: "../ver_estadisticas.png",
    title: "Panel de Votaciones",
    path: "/admin/votations",
  },
];

function Dashboard() {
  const isXs = useMediaQuery("(max-width:600px)");
  const isSm = useMediaQuery("(max-width:900px)");
  const cols = isXs ? 1 : isSm ? 2 : 3;

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
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
    <div className="xl:pt-20" style={{ overflow: "hidden" }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          marginTop: "30px",
          marginBottom: 4,
        }}
      >
        Dashboard - UniBlock
      </Typography>

      <ImageList
        sx={{
          width: "100%",
          maxWidth: 1000,
          margin: "auto",
          gap: 20,
        }}
        cols={cols}
      >
        {itemData.map((item) => (
          <ImageListItem
            key={item.img}
            sx={{ cursor: "pointer", position: "relative" }}
          >
            <Link
              to={item.path}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <img
                src={`${item.img}?w=248&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{
                  borderRadius: "8px",
                  width: "100%",
                  height: "auto",
                }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  position: "absolute",
                  bottom: 8,
                  left: 8,
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  padding: "4px 8px",
                  borderRadius: "4px",
                }}
              >
                {item.title}
              </Typography>
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

export default Dashboard;
