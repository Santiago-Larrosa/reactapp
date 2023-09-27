import React from "react";
import { useState, useEffect } from "react";

export default function Coment() {
  const [comentarios, setComentarios] = useState([]);
  const [id, setid] = useState(0);

  useEffect(() => {
    const comentariosJson = localStorage.getItem("comentarios");
    setComentarios(comentariosJson ? JSON.parse(comentariosJson) : []);

    // Obtén el id del comentario del parámetro
    const id = window.location.href.split("?")[1].split("=")[1];
    setid(id);

    // Si el objeto comentarios está vacío, muestra un mensaje de error
    if (comentarios.length === 0) {
      console.error("No hay comentarios");
    }
  }, []);

  return (
    <>
      <div>
        <h2>Detalle del comentario</h2>

        {comentarios.filter((comentario) => {
          return comentario.id === id;
        }).map((comentario, index) => (
          <p key={index}>{comentario.nombre}: {comentario.mensaje}: {comentario.textoComentario} :{comentario.id+index}</p>
        ))}

        <button>
                <a href={`/`}>Inicio</a>
              </button>
      </div>
    </>
  );
}
