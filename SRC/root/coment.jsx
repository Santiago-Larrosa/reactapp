import React from "react";
import { useState, useEffect } from "react";

export default function Coment() {
  const [comentarios, setComentarios] = useState([]);
  const [id, setid] = useState(0);
  const [go, setgo] = useState(0);

  useEffect(() => {
    const comentariosJson = localStorage.getItem("comentarios");
  setComentarios(comentariosJson ? JSON.parse(comentariosJson) : []);

    // Obtén el id del comentario del parámetro
    const queryParams = new URLSearchParams(window.location.search);
  const idParam = queryParams.get("id");
  setgo(idParam);

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
          return comentario.id === go;
        }).map((comentario, index) => {
          // Agrega un if para comprobar si el comentario coincide con go
          if (comentario.id === go) {
            return (
              <p key={index}>{comentario.nombre}: {comentario.mensaje}: {comentario.textoComentario}: {comentario.id+index} </p>
            );
          }
        })}

        <button>
                <a href={`/`}>Inicio</a>
              </button>
      </div>
    </>
  );
}
