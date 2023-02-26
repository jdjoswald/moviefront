import { Grid, TextField } from '@mui/material'
import React, { Component } from 'react'
import axios from 'axios';

export default class NewUserForm extends Component {

    state = {
        apellido:"",
        nombre: "",
        correo: "",
        password: ""
    }
    chageHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       // console.log(e.target.name)
        //console.log(e.target.value)
      
      }
      handleSubmit=(e)=>{
        e.preventDefault()
       // const navigate = useNavigate();
        
        axios.post('http://localhost:8002/usuario/save',{
      
        nombre: this.state.nombre,
        apellido:this.state.apellido,
        correo: this.state.correo,
        password: this.state.password,
        idRol: {
            id: 2,
            rol: "User"
        }
        }).then(response=>{
          
            alert("Usuario Creado")
           
          
         
          
         // window.location.href = '/actor/list'
        })
        .catch(error=>{
          console.log(error)
          alert("Error compruebe la informacion")  
        })
      }
  render() {
    const {nombre,apellido,correo,password}= this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

            <Grid  container  spacing={2}  xs={8}    sx={{  mx: 'auto', justifyContent: 'center', border: 1 }}>
            <Grid item xs={12}><h1>SingIn</h1></Grid>
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
                     <TextField 
                    value={password}
                    onChange={this.chageHandler}
                    required
                    id="password"
                    name="password" 
                    label="password" 
                    variant="standard"
                    placeholder='password' 
                    type={"password"}/>
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
