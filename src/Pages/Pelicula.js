import { React,useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import DrawerAppBar from '../components/header';
import { Grid ,Card, Typography} from '@mui/material';
import ListItem from '@mui/material/ListItem';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { format } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';





export const Pelicula = () => {

  let { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [movieReview, setMovieReview] = useState([]);
  const [comentario, setcomentario] = useState("");
  const [puntuacion, setpuntuacion] = useState(0);
  const [open, setopen] = useState(false);
  const [borrar, setborrar] = useState(false);
  const [openSucces, setOpenSucces] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [alert, setAlert] = useState(false);
  const [login, setLogin] = useState(false);
  const [deletevar,setdeletevar] = useState("");
  const [average, setAverage] = useState("");
  const [tituloAler, setTituloAler] = useState("");


  const getData = async () => {
    try{
       fetch(`http://localhost:8090/api/peliculas/movie/movie/${id}`)
      .then(res=> res.json())
      .then(movie=>{
        
        //console.log(movie)
        setMovie(movie)
      })
      axios.get( "http://localhost:8090/api/usuarios/comment/movie/"+id)
      .then(rTeam=>{
        setMovieReview(rTeam.data)
         
      })
      axios.get( "http://localhost:8090/api/usuarios/comment/average/"+id)
      .then(rAverage=>{
       
        setAverage(rAverage.data)
         
      })

      }catch (error) {
      console.log(error);}
  }
  const HandleSubmit= async (e) => {
    e.preventDefault()
    const a= JSON.parse(sessionStorage.getItem("user"))
    
    setLogin(a)
    try{
     
      axios.post( "http://localhost:8002/comment/save",
           { comentario: comentario,
            idPelicula: id,
            user: {id: a.id},
            puntuacion: puntuacion,
            fecha: format(new Date(), 'yyyy-MM-dd')}
            )
       
        //getData();
        setTituloAler("Comentado!")
        setOpenSucces(true)
        setTimeout(() => {
          setOpenSucces(false)
          getData();
        }, 2000);
      }catch (error) {
        setOpenError(true)
      console.log(error);
    }
    setcomentario("")
    setopen(false)
    setAlert(true);
   

  }
  const cborrar= async() => {

    try{
     
      axios.delete( "http://localhost:8002/comment/delete/"+deletevar)
       
        //getData();
        setOpenSucces(true)
        setTituloAler("Eliminado!")
        setTimeout(() => {
          setOpenSucces(false)
          getData();
        }, 2000);
      }catch (error) {
        setOpenError(true)
      console.log(error);
    }
    setdeletevar("")
    setborrar(false)
    setAlert(true);
  
   

  }

  const opendelete= (id) => {
  
    setdeletevar(id)
    setborrar(true)
  }







  useEffect(() => {
    getData();
  }, []);

  const{actor,anno, director,duracion, genero, idPais,imagen,sinopsis,titulo}=movie
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div  className="App">
        
      <Dialog open={open} onClose={()=>{setopen(false)}}>
      <DialogTitle>añadir un comentario</DialogTitle>
        <DialogContent>
          <form onSubmit={(e)=>{HandleSubmit(e)}}>
          <TextField
          required
          autoFocus
          margin="dense"
          id="comentario"
          label="comentario"
          value={comentario}
          type="text"
          onChange={(e)=>{setcomentario(e.target.value)}}
          fullWidth
          variant="standard"
        />
          <TextField
          required
          autoFocus
          margin="dense"
          id="puntuacion"
          label="puntuacion"
          value={puntuacion}
          type="number"
          onChange={(e)=>{setpuntuacion(e.target.value)}}
          fullWidth
          variant="standard"
          InputProps={{ inputProps: { min: 0, max: 10 } }}
        />
          <button>
            Comentar
          </button>
          <button onClick={()=>{setopen(false)}}>
            Cancelar
          </button>


          </form>
        
        </DialogContent>

      </Dialog>

      <Dialog open={borrar} onClose={()=>{setborrar(false)}}>
      <DialogTitle>Eliminar</DialogTitle>
        <DialogContent>
          <Typography>
            Desea elemininar este comentario?
          </Typography>
        
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{setborrar(false)}}>no</Button>
          <Button onClick={()=>{cborrar()}} autoFocus>
            Si
          </Button>
        </DialogActions>

      </Dialog>

      <Grid  container   justifyContent="center"
           spacing={2}>
        
       
        
        <Grid item  xs={3}> 
          <Grid> <h1>{titulo}</h1></Grid>
          <Grid>
            <img src={imagen}/>
          </Grid>
           <Grid>
           <strong>Fecha:</strong> {anno}
          </Grid>
          <Grid container  justifyContent="center"  spacing={2}>
            <Grid item  sx={{ Width: "50%" }}> <strong>Duracion:</strong>{duracion} Horas</Grid>
            <Grid item sx={{ Width: "50%" }}> <strong>Pais:</strong>{idPais?.pais}</Grid>
           
           
          </Grid>
        
          <Grid container  spacing={2}>
              <Grid item sx={{ Width: "25%" }} >
              <strong>genero:</strong>
              {
              genero?.map(function (person) {
                  return (
                    <li key={person.id} >
                          <span>{person.genero}</span>
                      </li>
                      );
              })
              }

              </Grid>
              <Grid item sx={{ Width: "25%" }} >
              <strong>Directores:</strong>
              {
              director?.map(function (person) {
                  return (
                    <li key={person.id}>
                          <span>{person.nombre}</span>
                      </li>
                      );
              })
              }

              </Grid>
              <Grid item sx={{ Width: "25%" }} >
                <strong>Actores:</strong>
                {
                actor?.map(function (person) {
                    return (
                      <li key={person.id} >
                            <span>{person.nombre} {person.apellido}</span>
                        </li>
                        );
                })
                }

              </Grid>
            
          </Grid>

         
        
          
        </Grid>
        <Grid item  xs={4}> 
          {sinopsis}
        </Grid>

        
        

      </Grid>
      <br/>
      

      <Grid container justifyContent={"center"}>
        <Grid item>
          <Collapse in={openSucces}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenSucces(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                 {tituloAler}
                </Alert>
          </Collapse>
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"}>


        <Grid item  xs={4}> 
                  <h1>Score:{average}</h1>
        </Grid>
        
                
        <Grid item  xs={4}> 

                  <Grid container justifyContent={"center"} spacing={2}>
                    <Grid item><h1>Comentarios</h1></Grid>

                    {JSON.parse(sessionStorage.getItem("user")) ? <Grid item><button onClick={()=>{setopen(true)}}>Añadir</button></Grid> : <div></div>}
                    {
                       
                    }
                   
                  
                  

        </Grid>
            
            
            <Stack spacing={2}>
            
            {
                movieReview?.map(function (review) {
                    return (
                      <Item key={review.id}>
                            <span>{review.fecha} <strong>  {review.user.nombre} {review.user.apellido}</strong> :  {review.comentario} 
                              

                            {JSON.parse(sessionStorage.getItem("user"))?.idRol.id==1 ? 
                             <IconButton onClick={()=>opendelete(review.id)}>
                                <DeleteIcon />
                              </IconButton>
                            : <div></div>}
                    
                              
                             
                            </span>
                        </Item>
                        );
                })
                }
            
            </Stack>
        </Grid>

           
      </Grid>
      
     

        
    </div>)
}
