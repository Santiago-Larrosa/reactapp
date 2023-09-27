// TuComponente.js
import React, { useState, useEffect } from 'react';
//import { useHistory } from "react-router-dom";


 
function TuComponente() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [id, setid] = useState(0);
  const [comentarios, setComentarios] = useState([]);
  const [textoComentario, setTextoComentario] = useState('');
  //const history = useHistory()
    const handleSubmit = (e) => {
     // setid(id++);
      e.preventDefault();
      const nuevoComentario = {
        nombre,
        mensaje,
        textoComentario,
        id,
      }
     // history.push('/comentarios');;
      setComentarios([...comentarios, nuevoComentario]);
      setNombre('');
      setMensaje('');
      setTextoComentario('');
    };
  const saveComentarios = () => {
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
  };
  useEffect(() => {
    if (comentarios.length) {
      saveComentarios();
    }
  }, [comentarios]);
  useEffect(() => {
    const storedComentarios = JSON.parse(localStorage.getItem('comentarios'));
    if (storedComentarios) {
      setComentarios(storedComentarios);
    }
  }, []);



  return (
    <div>
      <h1>Comentarios</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="mensaje">Mensaje:</label>
          <textarea
            id="mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
       {/* <div> 
          <label htmlFor="textoComentario">Texto del comentario:</label>
          <input
            type="text"
            id="textoComentario"
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
          />
       </div>*/}
        <button >Crear comentario</button>
        <button>
                <a href={`/comentarios`}>Ver comentarios</a>
              </button>
      </form>

     {/* {comentarios.map((comentario, index) => (
        <p key={index}>{comentario.nombre}: {comentario.mensaje}: {comentario.textoComentario}</p>
     ))}*/}
    </div>
  );
}

export default TuComponente;





