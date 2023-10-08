import React, { useState, useEffect } from "react";
import './rootstyle.css';
import imagen3 from './13006.png'
export default function Root() {
  const [comentarios, setComentarios] = useState([]);
  const [go, setGo] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDiv, setShowDiv] = useState(true);
  const [hora, setHora] = useState(new Date()); 
  const [horaRenderizada, setHoraRenderizada] = useState(new Date()); 
  const Mostrar = () => {
    setShowDiv(false);
    console.log(showDiv);
  };


  const updateHora = () => {
    const nuevaFecha = new Date();
    setHora(nuevaFecha);
  };

  useEffect(() => {
    // Llama a updateHora inmediatamente para obtener la hora inicial
    updateHora();
    
    // Configura un temporizador para actualizar la hora cada segundo
    const timerId = setInterval(updateHora, 1000);

    // Limpia el temporizador cuando el componente se desmonta
    return () => clearInterval(timerId);
  }, []); // El segundo argumento del useEffect ([]) indica que se ejecuta solo una vez al montar el componente

  const renderHora = () => {
    return (
      <h1>
        {hora.getHours().toString().padStart(2, '0')}:
        {hora.getMinutes().toString().padStart(2, '0')}:
        {hora.getSeconds().toString().padStart(2, '0')}
      </h1>
    );
  };

  const [borrar, setBorrar] = useState('');


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

  const onButtom = () => {
    const idBorrar = JSON.getItem(comentarios);
    setBorrar(comentarios.id);
    
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
      {showDiv && (  <div className="Reloj">
            <img onClick={Mostrar} src={imagen3} className="Cruz" alt="Cruz"></img>
            {renderHora()}
          </div>)}
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
