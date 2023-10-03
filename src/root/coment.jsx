import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./comentStyle.css";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

export default function Coment() {
  const { id } = useParams();
  const [comentariosDelComentario, setComentariosDelComentario] = useState([]);
  let idNumero = parseInt(id);
  const [comentarios, setComentarios] = useState([]);
  const [comentarioSeleccionado, setComentarioSeleccionado] = useState(null);
  const [nombreComentario, setNombreComentario] = useState("");
  const [mensajeComentario, setMensajeComentario] = useState("");
  const [contadorID, setContadorID] = useState(1);

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
  }, [id, comentarios]);

  const handleAgregarComentario = (e) => {
    e.preventDefault();

    
    const nuevoComentario = {
      nombre: nombreComentario,
      mensaje: mensajeComentario,
      id: contadorID, 
    };

   
    setContadorID(contadorID + 1);

    
    const nuevosComentariosDelComentario = [...comentariosDelComentario, nuevoComentario];
    setComentariosDelComentario(nuevosComentariosDelComentario);

   
    setNombreComentario("");
    setMensajeComentario("");


    localStorage.setItem(`comentariosDelComentario-${id}`, JSON.stringify(nuevosComentariosDelComentario));
  };

  return (
<>
<header className="Head">
    <a href="/app"><img src=".\SRC\root\13007.png" alt="mensaje" className="imagen"  /></a> 
    <a href="/"><img src=".\SRC\root\13009.png" alt="mensaje" className="imagen2" /></a>
      
    </header>
<div>


      {comentarioSeleccionado ? (
        <div >
          <div className="PostComent">
          <p>
            <b> {comentarioSeleccionado.nombre}</b><br />
            <Markdown remarkPlugins={[remarkGfm]}>{comentarioSeleccionado.mensaje}</Markdown> <br />
          
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
            <h2>Comentarios:</h2>
            <ul className="Coment">
              {comentariosDelComentario.map((comentario) => (
                <li key={comentario.id}>
                  <strong>{comentario.nombre}:</strong> {comentario.mensaje}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p >El comentario no se encontró o no existe: {id}</p>
      )}

      <button className="botonsito">
        <a href="/">Inicio</a>
      </button>
    </div>
    </>
  );
}
