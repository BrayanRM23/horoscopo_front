import { Navigate, useNavigate } from "react-router-dom";
import './styles/UserHome.css';
import TextSigno from "./TextSigno.jsx";
import { useState } from "react";

function UserHome({ user }) {
    if (user !== "user" || !user) {
        return <Navigate to="/" />;
    }

    const home = useNavigate();
    const [signoSeleccionado, setSignoSeleccionado] = useState("");
    const [generoSeleccionado, setGeneroSeleccionado] = useState("");
    const [textoSigno, setTextoSigno] = useState("");

    function goHome() {
        home("/");
    }

    async function handleFetch() {
        if (signoSeleccionado && generoSeleccionado) {
            try {
                const response = await fetch(`https://horoscopo-back-coral.vercel.app/v1/signos?signo=${signoSeleccionado}&genero=${generoSeleccionado}`);
                const data = await response.json();
                setTextoSigno(data.texto || "No hay información disponible.");
            } catch (error) {
                console.error("Error al obtener el signo:", error);
                setTextoSigno("Error al obtener la información.");
            }
        }
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage">
                <h3>Selecciona tu signo zodiacal</h3>
            </div>
            <div className="selectores">
                <select 
                    id="selectSignos" 
                    onChange={(e) => setSignoSeleccionado(e.target.value)} 
                    value={signoSeleccionado}
                >
                    <option value="">Selecciona un signo</option>
                    <option value="Aries">Aries</option>
                    <option value="Geminis">Géminis</option>
                    <option value="Cancer">Cáncer</option>
                    <option value="Leo">Leo</option>
                    <option value="Virgo">Virgo</option>
                    <option value="Libra">Libra</option>
                    <option value="Escorpio">Escorpio</option>
                    <option value="Sagitario">Sagitario</option>
                    <option value="Capricornio">Capricornio</option>
                    <option value="Acuario">Acuario</option>
                    <option value="Piscis">Piscis</option>
                </select>

                <select 
                    id="selectGenero" 
                    onChange={(e) => setGeneroSeleccionado(e.target.value)} 
                    value={generoSeleccionado}
                >
                    <option value="">Selecciona un género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="niño">Niño</option>
                </select>

                <button id="btnBuscar" onClick={handleFetch}>
                    Buscar
                </button>
            </div>

            <TextSigno texto={textoSigno} />
            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;
