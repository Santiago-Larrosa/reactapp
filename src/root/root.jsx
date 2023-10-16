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
