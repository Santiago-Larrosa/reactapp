import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./comentStyle.css";
//import Markdown from 'react-markdown';
//import remarkGfm from 'remark-gfm'; 
import imagen from"./13009.png";
import imagen2 from"./13007.png";

export default function Coment() {
  const { id } = useParams();
  const [comentariosDelComentario, setComentariosDelComentario] = useState([]);
  let idNumero = parseInt(id);
  const [comentarios, setComentarios] = useState([]);
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
  const [nombreComentario, setNombreComentario] = useState("");
  const [mensajeComentario, setMensajeComentario] = useState("");
  const [contadorID, setContadorID] = useState(1);
  const [admin, setAdmin] = useState(false);
  const [showButton, setShowButton] = useState(false);
  useEffect (()=> {
    const DownAdmin = localStorage.getItem("admin");
    setAdmin(JSON.parse(DownAdmin));
    setShowButton(JSON.parse(DownAdmin));
    console.log(admin);
  })

  if (isNaN(idNumero)) {
    console.error("ID proporcionado no es un número válido:", id);
  }

  useEffect(() => {
    const comentariosJson = localStorage.getItem("comentarios");
    if (comentariosJson) {
      const comentariosArray = JSON.parse(comentariosJson);
      setComentarios(comentariosArray);
    }

    if (id) {
      const comentario = comentarios.find((comentario) => comentario.id === parseInt(id));
      setComentarioSeleccionado(comentario);
    }
  }, [id, comentarios]);

  useEffect(() => {
    const comentariosDelComentarioJson = localStorage.getItem(`comentariosDelComentario-${id}`);
    if (comentariosDelComentarioJson) {
      const comentariosDelComentarioArray = JSON.parse(comentariosDelComentarioJson);
      setComentariosDelComentario(comentariosDelComentarioArray);
    }
  }, [id]);

  const handleAgregarComentario = (e) => {
    e.preventDefault();

    const nuevoComentario = {
      nombre: nombreComentario,
      mensaje: mensajeComentario,
      id: `${id}-${contadorID}`, 
    };

    setContadorID(contadorID + 1);

    const nuevosComentariosDelComentario = [...comentariosDelComentario, nuevoComentario];
    setComentariosDelComentario(nuevosComentariosDelComentario);
    setNombreComentario("");
    setMensajeComentario("");

    localStorage.setItem(`comentariosDelComentario-${id}`, JSON.stringify(nuevosComentariosDelComentario));
  };

  const handleBorrarComentario = (comentarioId) => {
   
    const comentariosActualizados = comentariosDelComentario.filter((comentario) => comentario.id !== comentarioId);
    setComentariosDelComentario(comentariosActualizados);

    localStorage.setItem(`comentariosDelComentario-${id}`, JSON.stringify(comentariosActualizados));
  };

  return (
    <>
      <header className="Head">
        <a href="/app"><img src={imagen2} alt="mensaje1" className="imagen1"/></a> 
        <a href="/"><img src={imagen} alt="mensaje2" className="imagen2"/></a>
      </header>
      <div>
        {comentarioSeleccionado ? (
          <div className="ElSuperDiv">
            <div className="PostComent">
              <p>
                <b className="negro"> {comentarioSeleccionado.nombre}</b><br />
                {/*<Markdown remarkPlugins={[remarkGfm]}>{comentarioSeleccionado.mensaje}</Markdown>*/ }<br />{comentarioSeleccionado.mensaje}
              </p>
            </div>

            <form onSubmit={handleAgregarComentario}>
              <div>
                <label htmlFor="nombre"></label>
                <input
                  className="InNom"
                  placeholder="Nombre"
                  type="text"
                  id="nombre"
                  value={nombreComentario}
                  onChange={(e) => setNombreComentario(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="mensaje"></label>
                <textarea
                  placeholder="Mensaje"
                  className="InMens"
                  id="mensaje"
                  value={mensajeComentario}
                  onChange={(e) => setMensajeComentario(e.target.value)}
                />
              </div>
              <button className="Botonation">Enviar Comentario</button>
            </form>

            <div>
              <h2 className="EsUnComentario">Comentarios:</h2>
              <div className="AAA">
                {comentariosDelComentario.map((comentario) => (
                  <li key={comentario.id} className="Coment">
                    <strong >{comentario.nombre}</strong> <br></br>{comentario.mensaje}<br></br>
                    {showButton && (
                      <button onClick={() => handleBorrarComentario(comentario.id)} className="Borrarr">Borrar</button>
                    )}
                  </li>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <p >El comentario no se encontró o no existe: {id}</p>
        )}
      </div>
    </>
  );
}
