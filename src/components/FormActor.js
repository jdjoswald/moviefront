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
import FormHelperText from '@mui/material/FormHelperText';
import { Link } from 'react-router-dom';


class FormActor extends Component {
    state = {
        paises:[],
        nombre: "",
        fechaNacimiento: "1997-01-01",
        idPais: ""
    }
componentDidMount() {
  const {idActor}= this.props

  axios.get(`http://localhost:8090/api/peliculas/pais/all`)
  .then(rpaises=>{
    this.setState({paises:rpaises.data})
  })

  if(idActor!=null){
    axios.get('http://localhost:8090/api/peliculas/actor/actor/'+idActor)
    .then(fActor=>{
      this.setState({nombre:fActor.data.nombre})
      this.setState({fechaNacimiento:fActor.data.fechaNacimiento})
      this.setState({idPais:fActor.data.idPais})

    })
  }
 

}


handleSubmit=(e)=>{
  const {idActor}= this.props
  e.preventDefault()
  if(idActor!=null){
    axios.put('http://localhost:8001/actor/update',
  {
    id:idActor,
    nombre: this.state.nombre, 
    fechaNacimiento: this.state.fechaNacimiento,
    idPais: this.state.idPais,


  })
  .then(response=>{
    console.log(response)
    alert("Actor Editado")
    window.location.href = '/actor/list'
  })
  .catch(error=>{
    console.log(error)
    alert("Error compruebe la informacion")  
  })
  }else{

axios.post('http://localhost:8001/actor/save',
  {
    nombre: this.state.nombre, 
    fechaNacimiento:  this.state.fechaNacimiento,
    idPais:  this.state.idPais,

  })
  .then(response=>{
    console.log(response)
    alert("Actor agregado")
    window.location.href = '/actor/list'
  })
  .catch(error=>{
    console.log(error)
    alert("Error compruebe la informacion")  
  })

  }
   
   console.log(this.state)
  }

 
  _renderSelect(){
    const {idPais,paises}= this.state
    
    
    return(
     
       <Grid container  spacing={2}  sx={{ justifyContent: 'center' }}>
            <Grid item xs={2}>   
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
                <FormHelperText>Required</FormHelperText>
            </Grid>
       </Grid>
      
  
       
       
       )
    }
    chageHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       // console.log(e.target.name)
        //console.log(e.target.value)
      
      }
      paisChange=(e)=>{
        this.setState({idPais:e})
      }
  render() {
    const {nombre,fechaNacimiento}= this.state
    return (

      <form  onSubmit={this.handleSubmit}>
          <Grid container  spacing={2}  xs={8}    sx={{  mx: 'auto', justifyContent: 'center', border: 1 }} >
                <Grid item xs={12}>
                    <h1> Crear Actor</h1>
                </Grid>
                <Grid item xs={2}> 
                    <TextField 
                        value={nombre}
                        onChange={this.chageHandler}
                        required
                        id="nombre"
                        name="nombre" 
                        label="Nombre" 
                        variant="standard"
                        placeholder='nombre' />
                </Grid>
   
                <Grid item xs={12}></Grid>
                {this._renderSelect()}

                <Grid item xs={5} sx={{ justifyContent: 'center' }}>
                    <Grid>   
                        <InputLabel>
                        Fecha de Nacimiento
                        </InputLabel>
                        <input value={fechaNacimiento} onChange={this.chageHandler} name="fechaNacimiento" id="fechaNacimiento" className='control' type={"date"} placeholder='Titulo'/>
                    </Grid>  
                </Grid>
                <Grid item xs={8}>
                        <div className="control">
                            <button className="button is-info">
                              Guardar
                            </button>
                        </div>
                </Grid>
                <Grid item xs={8}> </Grid>
          </Grid>

      </form>

    );
  }
}

export default FormActor;


