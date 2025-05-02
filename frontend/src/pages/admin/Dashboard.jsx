// https://mui.com/material-ui/react-image-list/
import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Crear Votación',
    path: '/admin/create-votation',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Agregar Usuario',
    path: '/admin/add-user',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Ver Estadísticas',
    path: '/admin/stats',
  },
  
  // Puedes agregar más con distintas rutas
];

function Dashboard() {
  const isXs = useMediaQuery('(max-width:600px)');
  const isSm = useMediaQuery('(max-width:900px)');

  const cols = isXs ? 1 : isSm ? 2 : 3;
  return (
    <div className="xl:pt-20" style={{ overflow: 'hidden' }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: 'center',
          marginTop: '30px', // o lo que mida tu header
          marginBottom: 4,
        }}
      >
        Dashboard - UniBlock
      </Typography>

      <ImageList
          sx={{
            width: '100%',
            maxWidth: 1000,
            margin: 'auto',
            gap: 20,
          }}
          cols={cols}
      >
        {itemData.map((item) => (
          <ImageListItem key={item.img} sx={{ cursor: 'pointer', position: 'relative' }}>
            <Link to={item.path} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={`${item.img}?w=248&h=164&fit=crop&auto=format`}
                srcSet={`${item.img}?w=248&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
                style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
              />
              <Typography
                variant="subtitle1"
                sx={{
                  position: 'absolute',
                  bottom: 8,
                  left: 8,
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  padding: '4px 8px',
                  borderRadius: '4px',
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
