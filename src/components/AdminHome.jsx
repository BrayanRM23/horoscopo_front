import { Navigate, useNavigate } from "react-router-dom";
import './styles/AdminHome.css';
import { useState } from "react";

function AdminHome({ user }) {
    if (user !== 'admin' || !user) {
        return <Navigate to="/" />;
    }
    const home = useNavigate();
    const [textoEditar, setTextoEditar] = useState("");
    const [signoEditar, setSignoEditar] = useState("");
    const [genero, setGenero] = useState("");

    function handleSelectSigno(event) {
        const signo = event.target.value;
        if (signo !== "0") {
            setSignoEditar(signo);
        }
    }

    function handleSelectGenero(event) {
        const generoSeleccionado = event.target.value;
        if (generoSeleccionado !== "0") {
            setGenero(generoSeleccionado);
        }
    }

    function goHome() {
        home("/");
    }

    function handleClick(e) {
        e.preventDefault();

        // Asegurarse de que los campos no estén vacíos
        if (!signoEditar || !genero || !textoEditar) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        fetch(`https://horoscopo-back-coral.vercel.app/v1/signos/update`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ signo: signoEditar, genero, textoEditar })
        })
            .then(res => res.json())
            .then(responseData => {
                alert(responseData.resultado);
                if (responseData.resultado === 'Signo actualizado correctamente') {
                    // Aquí puedes agregar cualquier lógica adicional si es necesario
                }
            })
            .catch(error => {
                console.error("Error al actualizar el signo:", error);
                alert("Hubo un error al actualizar el signo.");
            });
    }

    return (
        <div className="container">
            <h2 id="textoAdmin">Edita un Signo Zodiacal</h2>
            <div className="selectores">

                <select id="editSignos" onChange={handleSelectSigno}>
                    <option value="0">Selecciona un signo</option>
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

                <select id="editSignos" onChange={handleSelectGenero}>
                    <option value="0">Selecciona un género</option>
                    <option value="hombre">Hombre</option>
                    <option value="mujer">Mujer</option>
                    <option value="niño">Niño</option>
                </select>

            </div>

            <textarea
                id="textoEditar"
                cols="50"
                rows="10"
                onChange={(e) => setTextoEditar(e.target.value)}
                placeholder="Texto para el signo..."
            ></textarea>
            <button id="btnEditar" onClick={handleClick}>Editar</button>
            <button id="btnHomeAdmin" onClick={goHome}>Home</button>
        </div>
    );
}

export default AdminHome;

