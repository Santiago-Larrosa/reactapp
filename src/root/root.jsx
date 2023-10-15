import React, { useState, useEffect } from "react";
import './rootstyle.css';
import imagen from './13007.png';
import imagen2 from './13009.png';
import imagen3 from './13006.png';
import axios from "axios";

export default function Root() {
  const [comentarios, setComentarios] = useState([]);
  const [go, setGo] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [hora, setHora] = useState(new Date()); 
  const [horaRenderizada, setHoraRenderizada] = useState(new Date()); 
  const [weatherData, setWeatherData] = useState(null);
console.log(import.meta.env.VITE_API_KEY);  
  const Mostrar = () => {
    setShowDiv(false);
    console.log(showDiv);
  };

  const updateHora = () => {
    const nuevaFecha = new Date();
    setHora(nuevaFecha);
  };


  

  const renderHora = () => {
    return (
      <h1>
        {hora.getHours().toString().padStart(2, '0')}:
        {hora.getMinutes().toString().padStart(2, '0')}
      </h1>
    );
  };

  useEffect(() => {
    const DownAdmin = localStorage.getItem("admin");
    setAdmin(JSON.parse(DownAdmin));

    if (admin) {
      setShowButton(admin);
    } else {
      setShowButton(admin);
    }

    setShowButton(JSON.parse(DownAdmin));
  }, [admin]);

  useEffect(() => {
    const comentariosJson = localStorage.getItem("comentarios");

    if (comentariosJson) {
      const comentariosArray = JSON.parse(comentariosJson);
      setComentarios(comentariosArray);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const idParam = queryParams.get("id");

    if (idParam) {
      setGo(idParam);
    }
  }, []);

  useEffect(() => {
    
    const apiKey = "35d752315cfa8e8598f5b78f57533ae8"; 
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=Buenos%20Aires&appid=${apiKey}`)
      .then((response) => {
        setWeatherData(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos del clima:", error);
      });

 
    const timerId = setInterval(updateHora, 1000);

    
    return () => clearInterval(timerId);
  }, []);
   const HandleClick = (id) => {
  
    const updatedComentarios = comentarios.filter((comentario) => comentario.id !== id);
    setComentarios(updatedComentarios);
    localStorage.setItem("comentarios", JSON.stringify(updatedComentarios));
  };

  return (
    <>
      <header className="Head">
        <a href="/app"><img src={imagen} alt="mensaje" className="imagen" /></a>
        <a href="/"><img src={imagen2} alt="mensaje" className="imagen2" /></a>
        {admin ? <div className="Activado"><h1 className="admin">Modo Admin ACTIVADO</h1></div> : <div></div> }
      </header>

      <div className="sidebar">
        <div>
          <form method="post"></form>
        </div>
        <nav></nav>
        {/*     {showDiv && (
          <div className="Reloj">
            <img onClick={Mostrar} src={imagen3} className="Cruz" alt="Cruz" /><br />
            <h1>Hola de nuevo!</h1>
            <h2>Son Las:</h2>
            {renderHora()}
            {weatherData && (
              <div>
                <h2>Clima en Buenos Aires:</h2>
                <p>Temperatura: {Math.round((weatherData.main.temp)-273.15)} °C</p>
                <p>Descripción: {weatherData.weather[0].description}</p>
              </div>
            )}*/}
          </div>
        )}
        <div className="EsteDiv">
          <ul>
            {comentarios.map((comentario, index) => (
              <div key={index} className="Post">
                <h2 className="">{comentario.nombre}</h2>
                <h1 className="TituloPost">{comentario.Titulo}</h1>
                <p>{comentario.hora}:{comentario.minutos}:{comentario.segundos}</p>
                <button className="Boton">
                  <a className="linkardo" onClick={() => console.log(comentario.id)} href={`/coment/${parseInt(comentario.id)}`}>VER MAS</a>
                </button>
                {showButton && (
                  <button className="Borrar" onClick={() => HandleClick(comentario.id)}>BORRAR</button>
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
      <div id="detail"></div>
    </>
  );
}
