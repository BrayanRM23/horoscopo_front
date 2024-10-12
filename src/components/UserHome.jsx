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

    async function fetchSigno() {
        if (signo && genero) {
            try {
                const response = await fetch(
                    `https://horoscopo-back-coral.vercel.app/v1/signos?signo=${signo}&genero=${genero}`
                );
                const data = await response.json();

                if (response.ok) {
                    setTextoSigno(data.texto);
                } else {
                    setTextoSigno("Información no encontrada para este signo y género.");
                }
            } catch (error) {
                console.error("Error al obtener el signo:", error);
                setTextoSigno("Error al conectar con el servidor.");
            }
        }
    }

    function handleSignoChange(event) {
        setSigno(event.target.value);
    }

    function handleGeneroChange(event) {
        setGenero(event.target.value);
    }

    return (
        <div className="container">
            <div id="txtSeleccionPage">
                <h3>Selecciona tu signo zodiacal</h3>
            </div>

            <div className="selectores">
                <select id="selectSignos" onChange={handleSignoChange}>
                    <option value="">Seleccione un signo</option>
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

                <select id="selectSignos" onChange={handleGeneroChange}>
                    <option value="">Seleccione un género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="niño">Niño</option>
                </select>
            </div>

            <button id="btnHome" onClick={fetchSigno}>Buscar</button>

            <TextSigno texto={textoSigno} />

            <button id="btnHome" onClick={goHome}>Home</button>
        </div>
    );
}

export default UserHome;

