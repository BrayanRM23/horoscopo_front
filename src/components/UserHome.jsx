import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [textoSigno, setTextoSigno] = useState('');
    const [signo, setSigno] = useState('');
    const [genero, setGenero] = useState('');

    function goHome() {
        home("/");
    }

    async function handleFetch() {
        if (!signo || !genero) {
            alert("Selecciona un signo y un género.");
            return;
        }

        try {
            const response = await fetch(
                `https://horoscopo-back-coral.vercel.app/v1/signos?signo=${signo}&genero=${genero}`
            );
            
            if (response.ok) {
                const data = await response.json();
                setTextoSigno(data.texto);  // Mostrar el texto obtenido en el cuadro
            } else {
                setTextoSigno("No se encontró información para esta combinación.");
            }
        } catch (error) {
            console.error("Error al obtener el signo:", error);
            setTextoSigno("Error al conectar con el servidor.");
        }
    }

    return (
        <div className="container">
            <h3 id="txtSeleccionPage">Selecciona tu signo zodiacal</h3>

            <div>
                <select id="selectSigno" onChange={(e) => setSigno(e.target.value)}>
                    <option value="">Seleccionar signo</option>
                    <option value="Aries">Aries</option>
                    <option value="Géminis">Géminis</option>
                    <option value="Cáncer">Cáncer</option>
                    <option value="Leo">Leo</option>
                    <option value="Virgo">Virgo</option>
                    <option value="Libra">Libra</option>
                    <option value="Escorpio">Escorpio</option>
                    <option value="Sagitario">Sagitario</option>
                    <option value="Capricornio">Capricornio</option>
                    <option value="Acuario">Acuario</option>
                    <option value="Piscis">Piscis</option>
                </select>

                <select id="selectSigno" onChange={(e) => setGenero(e.target.value)}>
                    <option value="">Seleccionar género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="niño">Niño</option>
                </select>
            </div>

            <button id="btnBuscar" onClick={handleFetch}>Buscar</button>

            <TextSigno texto={textoSigno} />

            <button id="btnHome" onClick={handleFetch}>Buscar</button>
        </div>
    );
}

export default UserHome;
