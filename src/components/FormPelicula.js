
import { FormControl } from '@mui/material';
import React, { Component } from 'react';
import Select from 'react-select';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import {Multiselect} from "multiselect-react-dropdown";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";




class FormPelicula extends Component {

  state = {
    actores:[],
    generos:[],
    paises:[],
    directores:[], 
   


      titulo: "",
      duracion: "",
      sinopsis: "",
      imagen: "",
      anno: "1997-01-01",
      idPais: {
      
      },
      director: [
        
      ],
      genero: [
        
      ],
      actor: [
      
      ]

      
}

 

componentDidMount() {
  const {idPelicula}= this.props
 // console.log(idPelicula)
  if(idPelicula!=null){

    axios.get('http://localhost:8090/api/peliculas/movie/movie/'+idPelicula)
    .then(fPelicula=>{
      this.setState({titulo:fPelicula.data.titulo})
      this.setState({duracion:fPelicula.data.duracion})
      this.setState({sinopsis:fPelicula.data.sinopsis})
      this.setState({anno:fPelicula.data.anno})
      this.setState({imagen:fPelicula.data.imagen})
      this.setState({idPais:fPelicula.data.idPais})
      this.setState({director:fPelicula.data.director})
      this.setState({genero:fPelicula.data.genero})
      this.setState({actor:fPelicula.data.actor})
    })
  }


  axios.get('http://localhost:8090/api/peliculas/genero/all')
  .then(rgeneros=>{
 
    this.setState({generos:rgeneros.data})
 
  
   
  })
  axios.get(`http://localhost:8090/api/peliculas/actor/all`)
  .then(ractores=>{
    this.setState({actores:ractores.data})
   
  })
  axios.get(`http://localhost:8090/api/peliculas/director/all`)
  .then(rdirectores=>{
    this.setState({directores:rdirectores.data})
   
  })
  axios.get(`http://localhost:8090/api/peliculas/pais/all`)
  .then(rpaises=>{
    this.setState({paises:rpaises.data})
   
  })

 }





 _renderSelect(){
  const {actores,
    generos,
    paises,
    directores ,director,genero,idPais,actor,imagen}= this.state
  
  
  return(
   
     <Grid container  spacing={2}  sx={{ justifyContent: 'center' }}>

      <Grid item xs={2} >     
         
            
      <Multiselect 
        options={actores}
        displayValue={"nombre" }
        selectedValues={actor} // Preselected value to persist in dropdown
        onSelect={(e)=>{ this.setState({actor:e})}} // Function will trigger on select event
        onRemove={(e)=>{this.setState({actor:e})}} // Function will trigger on remove event
        />
      </Grid>
      <Grid item xs={2}> 

      
      <Multiselect 
        options={generos} 
        displayValue="genero"
        selectedValues={genero} // Preselected value to persist in dropdown
        onSelect={(e)=>{ this.setState({genero:e})}} // Function will trigger on select event
        onRemove={(e)=>{this.setState({genero:e})}} // Function will trigger on remove event
        />
      </Grid>
      <Grid item xs={5}>   
          <Select
          autoWidth
          className="basic-single"
          classNamePrefix="select"
          onChange={this.paisChange}
          isSearchable={true}
          name="idPais"
          options={paises}
          value={idPais}
          getOptionLabel={(paises) => paises.pais}
          getOptionValue={(paises) => paises.id}
          />
      </Grid>
      <Grid item xs={2}> 
      <Multiselect 
        options={directores}
        displayValue="nombre"
        selectedValues={director} // Preselected value to persist in dropdown
        onSelect={(e)=>{ this.setState({director:e})}} // Function will trigger on select event
        onRemove={(e)=>{this.setState({director:e})}} // Function will trigger on remove event
        />

          
      </Grid>
   
     

      
  
    
     </Grid>
    

     
     
     )
  }

paisChange=(e)=>{
  this.setState({idPais:e})
 // console.log(this.state.idPais)
//   console.log(e.id)
}
handleSubmit=(e)=>{
  const {idPelicula}= this.props
  e.preventDefault()
  if(idPelicula!=null){
    axios.put('http://localhost:8001/movie/update',
  {
  id:idPelicula,
  titulo: this.state.titulo,
  duracion: this.state.duracion,
  sinopsis:this.state.sinopsis,
  anno: this.state.anno,
  idPais: this.state.idPais,
  imagen:this.state.imagen,
  genero: this.state.genero,
  actor: this.state.actor,
  director: this.state.director


  })
  .then(
    response=>{
      console.log(response)
      alert("pelicula agregada")
      window.location.href = '/pelicula/list'
     
      
    })
  .catch(error=>{console.log(error)})
  }else{

axios.post('http://localhost:8001/movie/save',
  {

  titulo: this.state.titulo,
  duracion: this.state.duracion,
  sinopsis:this.state.sinopsis,
  anno: this.state.anno,
  idPais: this.state.idPais,
  imagen:this.state.imagen,
  genero: this.state.genero,
  actor: this.state.actor,
  director: this.state.director

  })
  .then(response=>{
    console.log(response)
    alert("Pelicula agregada")
    window.location.href = '/pelicula/list'
   
    
    })
  .catch(error=>{
    console.log(error)
    alert("Error confirma la informacion")})

  }
  
 // const {inputMovie}=this.state
  
   console.log(this.state)
  }
  chageHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value})
   // console.log(e.target.name)
    //console.log(e.target.value)
  
  }
  imageBase64=(e)=>{
  
   
  
   // console.log(this.state.imagen)
   if(e.target.files.length < 1){
    return;
  }
  const file = e.target.files[0];
  if(this.isValidFileUploaded(file)){
    const reader = new FileReader();
    reader.onload=()=>{
     this.setState({imagen: reader.result.toString()})
    }
 
    reader.readAsDataURL(file)
  }else{
   alert("este archivo no es una imagen aceptable(png,jpeg o jpg)")
  }
  
  }
  isValidFileUploaded=(file)=>{
    const validExtensions = ['png','jpeg','jpg']
    const fileExtension = file.type.split('/')[1]
    return validExtensions.includes(fileExtension)
  }
  

  render() {
    const {titulo,duracion,sinopsis,imagen,anno}= this.state
    return (

      <form  onSubmit={this.handleSubmit}>
        
          <Grid container  spacing={2}  xs={8}    sx={{  mx: 'auto', justifyContent: 'center', border: 1 }} >
     
                <Grid item xs={12}>
                <h1> Crear Pelicula</h1>
                </Grid>
          <Grid item xs={2}> 
                    <TextField 
                    value={titulo}
                    onChange={this.chageHandler}
                        required
                        id="titulo"
                        name="titulo" 
                        label="Titulo" 
                        variant="standard"
                        placeholder='Titulo' />
                 
          
               
          </Grid>
   
    <Grid item xs={12}>
      <TextField 
      value={duracion}
                        required
                        inputProps={{min: 0, style: { textAlign: 'center' }}} 
                        onChange={this.chageHandler}
                        id="duracion" 
                        name="duracion" 
                        variant="standard"
                        placeholder='Duracion*' 
                        type={"number"} 
                        InputProps={{
                          startAdornment: <InputAdornment position="start">Horas</InputAdornment>,
                        }}
                          />
                  
    </Grid>
    <Grid item xs={12}>

    </Grid>
             
              {this._renderSelect()}
             


   
          <Grid item xs={8}> 
          <TextField 
          value={sinopsis}
          onChange={this.chageHandler}
                  fullWidth 
                  required
                  id="sinopsis" 
                  name="sinopsis" 
                  label="Sinopsis" 
                  variant="standard"
                  placeholder='Sinopsis*' 
                  rows={12}
                  
                  multiline />
              
      
           
           </Grid>
       
        

               
           
            <Grid item xs={5} sx={{ justifyContent: 'center' }}>
              <Grid>   
                <InputLabel>
                  Fecha de estreno
                </InputLabel>
                <input value={anno} onChange={this.chageHandler} name="anno" id="anno" className='control' type={"date"} placeholder='Titulo'/>
              </Grid>
              <Grid>
                <InputLabel>
                  Portada
                </InputLabel>
               
                  <input onChange={this.imageBase64} name="imagen" id="imagen" className='hidden' type={"file"} placeholder='Photo'/>
              
                   {imagen?(<img src={imagen}/>):(<div></div>)}
              </Grid>
              </Grid>
               <Grid item xs={8}>
                  <div className="control">
                        <button className="button is-info">
                        Guardar
                        </button>
                    </div>
               </Grid>
               <Grid item xs={8}>
              
               </Grid>
       

          </Grid>

      </form>


                
           
               
                
          
         
        
         
    );
  }
}

export default FormPelicula;


