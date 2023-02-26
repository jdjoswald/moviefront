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
import { Link, Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default class LogInComponent extends Component {

  state = {
    email:"",
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
  
  axios.post('http://localhost:8002/usuario/login',{

  correo: this.state.email,
  password: this.state.password
  }).then(response=>{
    console.log(response.data)
    if(response.data.id!== undefined){ 
     
      if(response.data.definitivo==true){
        sessionStorage.setItem('user', JSON.stringify(response.data))
       
      }else{
        alert("usuario no autorisado")
      }
      window.location = '/';
    
     
    }
   
    
   // window.location.href = '/actor/list'
  })
  .catch(error=>{
    console.log(error)
    alert("Error compruebe la informacion")  
  })
}

  render() {
    const {email,password}= this.state
    return (
       <Grid container    spacing={2}  xs={8}    sx={{  mx: 'auto', justifyContent: 'center', border: 1 }}>
      <form onSubmit={this.handleSubmit}>
     
        <Grid item xs={12}><h1>Login</h1></Grid>
        <Grid item xs={12}>
           <TextField 
              value={email}
              onChange={this.chageHandler}
              required
              id="email"
              name="email" 
              label="email" 
              variant="standard"
              placeholder='email' />
        </Grid>
        <Grid item xs={12}>
            <TextField 
              value={password}
              onChange={this.chageHandler}
              required
              id="password"
              name="password" 
              label="password" 
              type={"password"}
              variant="standard"
              placeholder='password' />
        </Grid>
        <Grid item padding={1} xs={12}>
          <button>Login</button> 
          <Link to={"/singin"}>
            crear nuevo usuario
          </Link>
        </Grid>
      
      </form>
    </Grid>
    )
  }
}
