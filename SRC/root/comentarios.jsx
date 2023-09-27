import React from "react";


export default function Comentarios() {
  const [comentarios, setComentarios] = useState([]);
  useEffect(() => {
    // Obtén los comentarios de localStorage
    const comentariosJson = localStorage.getItem('comentarios');

    // Asigna los comentarios al estado
    setComentarios(comentariosJson ? JSON.parse(comentariosJson) : []);
  }, []);
  return (
    <>
      <div>
        <h2>Lista de Comentarios:</h2>
        <ul>
          {comentarios.map((comentario, index) => (
            <p key={index}>{comentario.nombre}: {comentario.mensaje}: {comentario.textoComentario}</p>
          ))}
        </ul>
      </div>
    </>
  );
}
