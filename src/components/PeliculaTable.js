import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import DataTable from 'react-data-table-component-with-filter';
import SearchByActor from './SearchByActor';
import SearchByGenero from './SearchByGenero';
import SeacrhForm from './SeacrhForm';
import { Grid,Box } from '@mui/material';
import axios from 'axios';



import React, { Component } from 'react';

class PeliculaTable extends Component {
    state= {results:[]}

    componentDidMount() {
    this.dataCharge()
   }
   dataCharge(){
    fetch(`http://localhost:8090/api/peliculas/movie/all`)
    .then(res=> res.json())
    .then(results=>{
      this.setState({results})
      console.log('didmount')
    })

   }
   delete(id){
    axios.delete('http://localhost:8001/movie/delete/'+id)
    .then(
        response=>{
            console.log(response)
            alert("Genero Eliminado")
            this.dataCharge()

        }
       
    ).catch(error=>{console.log(error)})
  
    }
    _handledResult=(results)=>{
        this.setState({results})
    
      }
    

    _renderResults(){
        const {results}= this.state
        return  results.map(movie=>{
            console.log(movie)
          return (
            
                <tr key={movie.id}>
                    <td>
                        {movie.titulo}
                    </td>
                    <td>
                    {movie.duracion} Horas
                    </td>
                    <td>
                    {movie.idPais.pais}
                    </td>
                    <td>
                    {movie.anno}
                    </td>
                    <td>
                        <Link to={`/pelicula/form/${movie.id}`}>
                            <Button sx={{ color: 'green' }}>
                                Editar
                            </Button>
                        </Link>
                        
                        <Link to={`/pelicula/del/${movie.id}`}>
                            <Button sx={{ color: 'red' }}>
                                Borrar
                            </Button>
                        </Link>
                        <Link to={`/pelicula/${movie.id}`}>
                            <Button sx={{ color: 'blue' }}>
                                Info
                            </Button>
                        </Link>
                    </td>
                </tr>
          )
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
         {   name:'Titulo',
            selector:'titulo',
            sortable:true},
            {   name:'Duracion',
            selector:'duracion',
            sortable:true},
            {   name:'Pais',
            selector:'idPais.pais',
            sortable:true},
            {   name:'Fecha',
            selector:'anno',
            sortable:true},  
            {
                name:'Accciones',
                cell:(row) => 
                <div>
                    <Link to={`/pelicula/detail/${row.id}`}>
                        <Button sx={{ color: 'Blue' }}>
                            Info
                        </Button>
                    </Link>  
                    <Link to={`/pelicula/form/${row.id}`}>
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
                 <Grid container
                        justifyContent="center"
                        spacing={5}
                        >
                        <Grid item>  <SeacrhForm onResult= {this._handledResult}/></Grid>
                        <Grid item> <SearchByActor onResult= {this._handledResult}/></Grid>
                        <Grid item> <SearchByGenero onResult= {this._handledResult}/></Grid>
                        <Grid item>
                            <br/>
                            <Link to={`/pelicula/form`}>
                                <button className="button is-info" sx={{ color: 'Blue' }}>
                                    Añadir
                                </button>
                            </Link> 
                        </Grid>
               
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

export default PeliculaTable;

