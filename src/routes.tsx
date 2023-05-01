import  React from 'react';
import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Landing from './pages/Landing';
import CoachList from './pages/CoachList';
import CoachForm from './pages/CoachForm';

function Rotas(){
    return(
<BrowserRouter>
<Routes>
<Route path="/" Component={Landing}/>
<Route path="/study" Component={CoachList}/>
<Route path="/give-classes" Component={CoachForm}/>
</Routes>
</BrowserRouter>
    );
    
}
export default Rotas;