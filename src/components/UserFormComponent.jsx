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


export default class UserFormComponent extends Component {
    state = {
        apellido:"",
        nombre: "",
        correo: "",
        rol: "",
        roles:[]
    }
    componentDidMount(){
      const {idUser}= this.props

      axios.get(`http://localhost:8090/api/usuarios/usuario/id/`+idUser)
      .then(ruser=>{
        console.log(ruser.data)
        this.setState({nombre:ruser.data.nombre})
        this.setState({apellido:ruser.data.apellido})
        this.setState({correo:ruser.data.correo})
        this.setState({rol:ruser.data.idRol})
      })

      
  axios.get(`http://localhost:8090/api/usuarios/rol/all`)
  .then(rpaises=>{
    this.setState({roles:rpaises.data})
  })


    }
    chageHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       // console.log(e.target.name)
        //console.log(e.target.value)
      
      }
      handleSubmit=(e)=>{
        e.preventDefault()
       // const navigate = useNavigate();
        
        axios.put('http://localhost:8002/usuario/update',{
        id: this.props.idUser,
        nombre: this.state.nombre,
        apellido:this.state.apellido,
        correo: this.state.correo,
        idRol: this.state.rol,
        }).then(response=>{
          
            alert("Usuario editado")
           
          
         
          
         // window.location.href = '/actor/list'
        })
        .catch(error=>{
          console.log(error)
          alert("Error compruebe la informacion")  
        })
      }
      rolChange=(e)=>{
        this.setState({rol:e})
      }
  render() {
    const {nombre,apellido,correo,rol,roles}= this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

            <Grid  container  spacing={2}  xs={8}    sx={{  mx: 'auto', justifyContent: 'center', border: 1 }}>
            <Grid item xs={12}><h1>Edit User</h1></Grid>
                <Grid item xs={5}>
                <TextField 
                    value={nombre}
                    onChange={this.chageHandler}
                    required
                    id="nombre"
                    name="nombre" 
                    label="Nombre" 
                    variant="standard"
                    placeholder='nombre' 
                    type={"text"}/>
                </Grid>
                <Grid item xs={5}>
                    <TextField 
                    value={apellido}
                    onChange={this.chageHandler}
                    required
                    id="apellido"
                    name="apellido" 
                    label="apellido" 
                    variant="standard"
                    placeholder='apellido' 
                    type={"text"}/>
                    
                </Grid>
                <Grid item xs={5}>
                    <TextField 
                    value={correo}
                    onChange={this.chageHandler}
                    required
                    id="correo"
                    name="correo" 
                    label="correo" 
                    variant="standard"
                    placeholder='correo'
                    type={"mail"} />
                </Grid>

                <Grid item xs={5}>   
                <Select
                autoWidth
                className="basic-single"
                classNamePrefix="select"
                onChange={this.rolChange}
                isSearchable={true}
                name="rol"
                options={roles}
                value={rol}
                getOptionLabel={(roles) => roles.rol}
                getOptionValue={(roles) => roles}
                />
                <FormHelperText>Required</FormHelperText>
                </Grid>
               
                <Grid item xs={8} padding={1} >
                    <div className="control">
                        <button className="button is-info">
                            Guardar
                        </button>
                    </div>
                </Grid>

            </Grid>

                

                
                
               

          
        </form>
      </div>
    )
  }
}
