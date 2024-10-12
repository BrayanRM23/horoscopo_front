import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/cambiarP';
import ChangePasswords from './components/crearusers';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/cambiarP' element={<ChangePassword/>}></Route>
        <Route path='/crearusers' element={<ChangePasswords/>}></Route>
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
      </Routes>
    </BrowserRouter>
  )
  
}
app.get('/v1/signos', async (req, res) => {
  const { signo, genero } = req.query;
  try {
      const signoEncontrado = await Signo.findOne({ signo, genero });
      if (signoEncontrado) {
          res.json({ texto: signoEncontrado.texto });
      } else {
          res.status(404).json({ mensaje: "No se encontró información para este signo y género." });
      }
  } catch (error) {
      console.error("Error al buscar el signo:", error);
      res.status(500).json({ mensaje: "Error interno del servidor." });
  }
});



// function Navigation(){
//   return <nav>
//     <ul>
//       <li>
//         <Link to="/userHome">userHome</Link>
//       </li>
//       <li>
//         <Link to="/adminHome">adminHome</Link>
//       </li>
//     </ul>
//   </nav>
// }

export default App
