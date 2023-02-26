import React, { Component } from 'react';
import "bulma/css/bulma.css";
import { Grid,Box } from '@mui/material';
import SearchByActor from '../components/SearchByActor';
import SearchByGenero from '../components/SearchByGenero';
import SeacrhForm from '../components/SeacrhForm';
import PeliculaCard from '../components/peliculaCard';

class Home extends Component {

    state= {results:[]}
  

    componentDidMount() {
      fetch(`http://localhost:8090/api/peliculas/movie/all`)
    .then(res=> res.json())
    .then(results=>{
      this.setState({results})
      console.log('didmount')
    })
   }
  
    _handledResult=(results)=>{
      this.setState({results})
  
    }
    _renderResults(){
      const {results}= this.state
      return  results.map(movie=>{
        return (
          <div  key={movie.id} style={{padding:"5px", width: "25%"}} >
                  <Grid  item >
                  <PeliculaCard
                        titulo={movie.titulo}
                        sinopsis={movie.sinopsis}
                        duracion={movie.duracion}
                        id={movie.id}
                        imagen={movie.imagen}
                        />
                  </Grid> 
            </div>
        )
      })
    }
    render() {
        return (
            <div>
                <Grid container
                        justifyContent="center"
                        spacing={5}
                        >
                        <Grid item>  <SeacrhForm onResult= {this._handledResult}/></Grid>
                        <Grid item> <SearchByActor onResult= {this._handledResult}/></Grid>
                        <Grid item> <SearchByGenero onResult= {this._handledResult}/></Grid>
                </Grid>
                <br></br>
                <br></br>
                <br></br>   
                <Box >
                    <Grid container 
                    justifyContent="center"
                    spacing={1}
                    sx={{ flexGrow: 1  }}
                    >
                    {this.state.results.length===0
                        ?<p>sin resultados</p>
                        :this._renderResults()}
                    </Grid>
                </Box>
            </div>
        );
    }
}

export default Home;