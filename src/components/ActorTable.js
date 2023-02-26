import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component-with-filter';
import  { Redirect } from 'react-router-dom'
import { Grid,Box } from '@mui/material';
import React, { Component } from 'react';
import axios from 'axios';

class ActorTable extends Component {
    state= {results:[]}

    componentDidMount() {
      this.dataCharge()
   }
   dataCharge(){
    fetch(`http://localhost:8090/api/peliculas/actor/all`)
    .then(res=> res.json())
    .then(results=>{
      this.setState({results})
      console.log('didmount')
    })
   }


   delete(id){
    axios.delete('http://localhost:8001/actor/delete/'+id)
    .then(
        response=>{
            console.log(response)
            alert("Pais Eliminado")
            this.dataCharge()

        }
       
    ).catch(error=>{console.log(error)})
   

   }

   
  
    _handledResult=(results)=>{
      this.setState({results})
  
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
         {   name:'nombre',
            selector:row => `${ row.nombre } `,
            sortable:true},
           
            {   name:'Pais',
            selector:'idPais.pais',
            sortable:true},
            {   name:'Fecha',
            selector:'fechaNacimiento',
            sortable:true},  
            {
                name:'Accciones',
                cell:(row) => 
                <div>
                    <Link to={`/actor/detail/${row.id}`}>
                        <Button sx={{ color: 'Blue' }}>
                            Info
                        </Button>
                    </Link>  
                    <Link to={`/actor/form/${row.id}`}>
                        <Button sx={{ color: 'green' }}>
                            Editar
                        </Button>
                    </Link>
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
                  <Grid item>
                            <Link to={`/actor/form`}>
                                <button className="button is-info" sx={{ color: 'Blue' }}>
                                    Añadir
                                </button>
                            </Link> 
                        </Grid>
                
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





export default ActorTable;