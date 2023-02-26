
import React, { Component } from 'react';
import Select from 'react-select';

class SearchByActor extends Component {
    state = {
        all:[],
        id:'1'
    }
    componentDidMount() {
        fetch(`http://localhost:8090/api/peliculas/actor/all`)
      .then(res=> res.json())
      .then(all=>{
        this.setState({all})
       
      })
     }
     handleChange=(e)=>{
        this.setState({id: e.id})
        console.log(this.state.id)
     //   console.log(e.id)
    }
    
     _renderSelect(){
        const {all}= this.state
        console.log({all})
        
        return(<div> 
             <Select
        className="basic-single"
        classNamePrefix="select"
        onChange={this.handleChange}
        
        isSearchable={true}
        name="actores"
        options={all}
        value={all.id}
        getOptionLabel={(all) => all.nombre }
        getOptionValue={(all) => all.id}
      />
           
           </div>)
     }
    
    handleSubmit=(e)=>{
        e.preventDefault()
        const {id}=this.state
        fetch(`http://localhost:8090/api/peliculas/movie/movie/actor/${id}`)
        .then(res=> res.json())
        .then(results=>{
            console.log(results)
         /*  const {Search, totalResult}= results
           console.log({Search, totalResult})*/
           this.props.onResult(results)
        })
    }

    render() {
        return (
            <div>
                <h1> Buscar por Actor </h1> 
                 <form onSubmit={this.handleSubmit}>
            <div className="field has-addons">
                <div className="control" style={{ width: 200 }}>

                {this._renderSelect()}
               
                </div>
                <div className="control">
                    <button className="button is-info">
                    Search
                    </button>
                </div>
            </div>
        </form>

            </div>
           
        );
    }
}

export default SearchByActor;