import React, { Component } from 'react';



class SeacrhForm extends Component {
    state = {
        inputMovie:''
    }
   
    handleChange=(e)=>{
        if(e.target.value!=""){
            this.setState({inputMovie: e.target.value})
        }
      
        console.log(this.state.inputMovie)
    }
    handleSubmit=(e)=>{
        e.preventDefault()
        const {inputMovie}=this.state
        fetch(`http://localhost:8090/api/peliculas/movie/movie/title/${inputMovie}`)
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
                <h1> Buscar por Titulo</h1>
                <form onSubmit={this.handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <input  onChange={this.handleChange}
                                required="required"
                                className="input" 
                                type="text" 
                                placeholder="Find a repository"
                                style={{width: "200px"}}/>
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

export default SeacrhForm;