import React, { useState, useEffect } from "react";
import './rootstyle.css';
export default function Root() {
  const [comentarios, setComentarios] = useState([]);
  const [go, setGo] = useState(null); 
 


  const HandleClick = (id) => {
    setGo(id);
    
  };

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
    
 

  return (
    <>
    <header className="Head">
    <img src=".\SRC\root\520648.png" alt="mensaje" className="imagen" />
      <h1 className="AlgunTitulo">Comentar</h1>
    </header>
      <div id="sidebar">
        <h1 className="titulos">COMENTAR</h1>
        <div>
         
          <form method="post">
            
          </form>
        </div>
        <nav>
         
              <a href={`/App`} className="Create"><i>CREAR POST</i></a>
           
          </nav>
          <div>
          <h2 className="subtitulo1">LISTA DE POST</h2>
          <h2 className="subtitulo2">LISTA DE POST</h2>
        <h2 className="subtitulo">LISTA DE POST</h2>
        <ul>
        
        
        {comentarios.map((comentario, index) => (
  <div key={index} className="Post">
    <h2 className="tituloPost">{comentario.nombre} </h2><p>{comentario.mensaje}</p>  <p>{comentario.hora}:{comentario.minutos}:{comentario.segundos}</p>
    <button onClick={() => HandleClick(comentario.id)} className="Boton">
  <a onClick={()=>console.log(comentario.id)} href={`/coment/${parseInt(comentario.id)}`}>COMENTAR</a>
</button>

  </div>
))}
  
        </ul>
      </div>
        </div>
        <div id="detail"></div>
      </>
  );
}
