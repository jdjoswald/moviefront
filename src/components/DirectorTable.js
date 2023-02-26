import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component-with-filter';
import  { Redirect } from 'react-router-dom'
import { Grid,Box } from '@mui/material';
import React, { Component } from 'react';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';

class DirectorTable extends Component {
    state= {results:[],director:""}

    componentDidMount() {
        this.dataCharge()
    
   }
   delete(id){
    axios.delete('http://localhost:8001/director/delete/'+id)
    .then(
        response=>{
            console.log(response)
            alert("Director Eliminado")
            this.dataCharge()

        }
       
    ).catch(error=>{console.log(error)})
   

   }
   dataCharge(){

    
    fetch(`http://localhost:8090/api/peliculas/director/all`)
    .then(res=> res.json())
    .then(results=>{
      this.setState({results})
      console.log(results)
    })
   }
  
    _handledResult=(results)=>{
      this.setState({results})
  
    }

    chageHandler=(e)=>{
        this.setState({[e.target.name]:e.target.value})
       // console.log(e.target.name)
        //console.log(e.target.value)
      
      }
      handleSubmit=(e)=>{
       
        e.preventDefault()
      
        axios.post('http://localhost:8001/director/save',
        {
            nombre:this.state.director
        })
        .then(
          response=>{
            console.log(response)
            alert("Director agregado")
            this.dataCharge()
    
          }
        ).catch(error=>{console.log(error)})
    }
    generoAdd(){
        return(
            <form onSubmit={this.handleSubmit}>
                 <Grid container spacing={2}  justifyContent="center" className="control">
                    <Grid item>
                        <TextField 
                            value={this.state.director}
                            required
                            inputProps={{min: 0, style: { textAlign: 'center' }}} 
                            onChange={this.chageHandler}
                            id="director" 
                            name="director" 
                            variant="standard"
                            placeholder='Nuevo director*' 
                            type={"text"}     
                            />
                    </Grid>
                    <Grid item>
                        <button className="button is-info">
                            Guardar
                        </button>
                    </Grid>
                   
                       
                       
                </Grid>

            </form>
        )
            
        
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
       
            {   name:'director',
            selector:'nombre',
            sortable:true},  
            {
                name:'Accciones',
                cell:(row) => 
                <div>
                
                  
                   
                        <Button 
                        onClick={() => { this.delete(row.id) }}
                        
                        sx={{ color: 'red' }}>
                            Borrar
                        </Button>
                    
                    
                </div>,
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
              },
            
        ]
        return (
            <div>
                <h1>Tabla de directores</h1>
                <div>
                    {this.generoAdd()}
                </div>
                
                <DataTable
                columns={col}
                data={results}
                pagination
                filterServer
                />
            </div>

          
          
        );
    }
}


export default DirectorTable;