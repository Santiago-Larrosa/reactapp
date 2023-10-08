import React, { useState, useEffect } from "react";
import './rootstyle.css';

export default function Root() {
  const [comentarios, setComentarios] = useState([]);
  const [go, setGo] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [showButton, setShowButton] = useState(false);
  
 
const [hora, setHora] = useState(new Date()); // Inicializa con la hora actual
  const [borrar, setBorrar] = useState('');

  // Función para actualizar la hora cada segundo
  function tick() {
    const nuevaFecha = new Date();
    setHora(nuevaFecha);
  }

  useEffect(() => {
    const timerId = setInterval(tick, 1000);

    // Limpieza del intervalo al desmontar el componente
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    const DownAdmin = localStorage.getItem("admin");
    setAdmin(JSON.parse(DownAdmin));

    if (admin) {
      setShowButton(admin);
    } else {
      setShowButton(admin);
    }

    setShowButton(JSON.parse(DownAdmin));
    console.log(showButton);
    console.log(admin);
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

  const onButtom = () => {
    const idBorrar = JSON.getItem(comentarios);
    setBorrar(comentarios.id);
    console.log(borrar);
  }

  const HandleClick = (id) => {
    // Filtra el comentario principal y todos los comentarios vinculados
    const updatedComentarios = comentarios.filter((comentario) => comentario.id !== id);
    setComentarios(updatedComentarios);
    localStorage.setItem("comentarios", JSON.stringify(updatedComentarios));
  };

  return (
    <>
      <header className="Head">
        <a href="/app"><img src=".\SRC\root\13007.png" alt="mensaje" className="imagen" /></a>
        <a href="/"><img src=".\SRC\root\13009.png" alt="mensaje" className="imagen2" /></a>
      </header>

      <div className="sidebar">
        <div>
          <form method="post"></form>
        </div>
        <nav></nav>
        <div className="Reloj">
          <h1>
            {hora.getHours().toString().padStart(2,0)}:
            {hora.getMinutes().toString().padStart(2,0)}:
            {hora.getSeconds().toString().padStart(2,0)}
          </h1>
        </div>
        <div className="EsteDiv">
          <ul>
            {comentarios.map((comentario, index) => (
              <div key={index} className="Post">
                <h2 className="">{comentario.nombre}</h2>
                <h1 className="TituloPost">{comentario.Titulo}</h1>
                <p>{comentario.hora}:{comentario.minutos}:{comentario.segundos}</p>
                <button className="Boton">
                  <a onClick={() => console.log(comentario.id)} href={`/coment/${parseInt(comentario.id)}`}>COMENTAR</a>
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
