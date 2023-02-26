import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component-with-filter';
import SearchByActor from './SearchByActor';
import SearchByGenero from './SearchByGenero';
import SeacrhForm from './SeacrhForm';
import { Grid,Box } from '@mui/material';
import axios from 'axios';

import React, { Component } from 'react';


export default class UsertableComponent extends Component {
  state= {results:[],inputUser:""}

  componentDidMount() {
    this.dataCharge()
  }
  dataCharge(){

     axios.get(`http://localhost:8090/api/usuarios/usuario/all`)
      .then(ruser=>{
        console.log(ruser.data)
        this.setState({results:ruser.data})
      })
  }
  delete(id){
    axios.delete('http://localhost:8002/usuario/delete/'+id)
    .then(
        response=>{
            console.log(response)
            alert("Usuario Eliminado")
            this.dataCharge()

        }
      
    ).catch(error=>{console.log(error)})

  }
  handleChange=(e)=>{
    // if(e.target.value!==""){
        this.setState({inputUser: e.target.value})
    //}

    console.log(this.state.inputUser)
  }
  aceptar(id){
    axios.get('http://localhost:8090/api/usuarios/usuario/aceptar/'+id)
    .then(
        response=>{
            console.log(response)
            this.dataCharge()
  
        }
       
    ).catch(error=>{console.log(error)})
  
  }
  _handledResult=(results)=>{
      this.setState({results})
  
  }
  handleSubmit=(e)=>{
    e.preventDefault()
    const {inputUser}=this.state

    axios.get(`http://localhost:8090/api/usuarios/usuario/listamail/${inputUser}`)
    .then(ruser=>{
      console.log(ruser.data)
      this.setState({results:ruser.data})
    })


  
}
  render() {
    const {results}= this.state
    console.log(results);
    const col=[
        {
            name: 'ID',
            selector: 'id',
            sortable: true,
            
          },
     {   name:'Nombre',
        selector:'nombre',
        sortable:true},
        {   name:'Apellido',
        selector:'apellido',
        sortable:true},
        {   name:'Mail',
        selector:'correo',
        sortable:true},
        {   name:'Rol',
        selector:'idRol.rol',
        sortable:true},
        {
            name:'Accciones',
            cell:(row) => 
            <div>
                {row.definitivo ? <div></div> : 
                
                <Button 
                onClick={() => { this.aceptar(row.id) }}
                sx={{ color: 'blue' }}>
                    Aceptar
                </Button>
    }
             
                <Link to={`/user/form/${row.id}`}>
                    <Button sx={{ color: 'green' }}>
                        Editar
                    </Button>
                </Link>

                {row.id===JSON.parse(sessionStorage.getItem("user")).id ? <div></div> : 
                <Button 
                onClick={() => { this.delete(row.id) }}
                
                sx={{ color: 'red' }}>
                    Borrar
                </Button>
              }
              
                       
                
               
            </div>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        
    ]
    return (
      <div>
          <Grid container
                        justifyContent="center"
                        spacing={5}
                        >
                        <Grid item>  
                        <form  onSubmit={this.handleSubmit}>
                          <h1>Buscar por correo</h1>
                          <br/>
                          <div className="control">
                        <input  onChange={this.handleChange}
                                required="required"
                                className="input" 
                                value={this.inputUser}
                                type="text" 
                                placeholder="Buscar por nombre"
                                style={{width: "200px"}}/>
                         <button className="button is-info">
                        Search
                        </button>
                    </div>
                   
                        </form>
                        </Grid>
                       
               
                </Grid>
                
            <DataTable
            columns={col}
            data={results}
            pagination
            filterServer
            />

      </div>
    )
  }
}
