import React, { Component } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import "bulma/css/bulma.css";

import DrawerAppBar from './components/header';
import Grid from '@mui/material/Grid';
import Home from './Pages/Home';

import { PeliculaForm } from './Pages/PeliculaForm';
import { PeliculaList } from './Pages/PeliculaList';
import {Pelicula} from './Pages/Pelicula';

import { Actor } from './Pages/Actor';
import { ActorForm } from './Pages/ActorForm';
import { ActorList } from './Pages/ActorList';

import {LogIn} from './Pages/LogIn';
import {Singin} from './Pages/Singin';
import ActorTable from './components/ActorTable';
import Settings from '@mui/icons-material/Settings';
import { Setting } from './Pages/Setting';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UserForm } from './Pages/UserForm';
import { UserAdmin } from './Pages/UserAdmin';


class App extends Component {
 
  
  render() {  
    const user = JSON.parse(sessionStorage.getItem("user"))

    return (
      <div className="App">
        <DrawerAppBar/> 
        <Routes>

          <Route exact path="/" element={<Home />}></Route>
          <Route exact path='/pelicula/detail/:id' element={<Pelicula/>}></Route>

          <Route
            element={
              <ProtectedRoute
                isAllowed={!user}
                redirectTo="/"
              />
            }
          >   


          <Route exact path='/login' element={<LogIn/>}></Route>
          <Route exact path='/signin' element={<Singin/>}></Route>
          
          
          
          </Route>

         

        <Route
            element={
              <ProtectedRoute
                isAllowed={user && user?.idRol.id==1}
                redirectTo="/"
              />
            }
          >
          <Route exact path="/pelicula/list" element={<PeliculaList />}></Route>
          <Route exact path='/pelicula/form' element={<PeliculaForm/>}></Route>
          <Route exact path='/pelicula/form/:id' element={<PeliculaForm/>}></Route>

          <Route exact path='/user/form/:id' element={<UserForm/>}></Route>
          <Route exact path='/user/list' element={<UserAdmin/>}></Route>
          <Route exact path='/actor/detail/:id' element={<Actor/>}></Route>
          <Route exact path="/actor/list" element={<ActorList/>}></Route>
          <Route exact path='/actor/form' element={<ActorForm/>}></Route>
          <Route exact path='/actor/form/:id' element={<ActorForm/>}></Route>
          <Route exact path='/settings' element={<Setting/>}></Route>

          
          </Route>
    
          
          

          
         
         
        </Routes>
      </div>
    );
  }
}

export default App;