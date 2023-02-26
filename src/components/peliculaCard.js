import React, { Component } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { height } from '@mui/system';
import {Link} from 'react-router-dom'


export default class PeliculaCard extends Component {
  static propTypes = {
    titulo:  PropTypes.string,
    sinopsis: PropTypes.string,
    duracion: PropTypes.string,
    id: PropTypes.number,
    imagen: PropTypes.string
  }
  render() {
    const {titulo,sinopsis,duracion,id,imagen}= this.props
    return (
      <div>
       
            
            <Card sx={{ Width: "25%", height:"840px" }}>
            <CardMedia sx={{  height:"500px" }}
              component="img"
              height="10"
             
              src={imagen}
              alt="new"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
              {titulo}
              </Typography>
              <div style={{height: "200px",  overflow: "hidden",border: "1px solid black"}}>
                <Typography  variant="body2" color="text.secondary">
                  {sinopsis}
                </Typography>
              </div>
              
              <Typography variant="body2" color="text.secondary">
                Duracion:{duracion} Horas
              </Typography>
            </CardContent>
            <CardActions>
              <Link to={`/pelicula/detail/${id}`} size="small">
                <Button size="small">Info</Button>
              </Link>
             
             
            </CardActions>
          </Card>
      
        
      </div>
    )
  }
}
