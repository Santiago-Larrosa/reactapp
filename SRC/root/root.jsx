import React from "react";
import {useState, useEffect} from "react";

export default function Root() {
  const [comentarios, setComentarios] = useState([]);
  const [id, setid] = useState(undefined);


  useEffect(() => {
    // Obtén los comentarios de localStorage
    const comentariosJson = localStorage.getItem('comentarios');

    // Asigna los comentarios al estado
    setComentarios(comentariosJson ? JSON.parse(comentariosJson) : []);

    // Espera a que el componente reciba una solicitud HTTP del navegador
   
  }, []);

  return (
    <>
      <div id="sidebar">
        <h1>Pagina para crear comentario</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            <li>
              <a href={`/App`}>Crear comentario</a>
            </li>
           
             
            </ul>
          </nav>
          <div>
        <h2>Lista de Comentarios:</h2>
        <ul>
        
        
              {comentarios.map((comentario, index) => (
                <p key={index}>
                  {comentario.nombre}: {comentario.mensaje}:
                  {comentario.textoComentario}: {comentario.id + index}
                  <button
                    onClick={setid(comentario.id)}
                    
                  >
                    <a href={`/Coment?id=${id}`}>Comentar</a>
                  </button>
                </p>
              ))}
  
        </ul>
      </div>
        </div>
        <div id="detail"></div>
      </>
  );
}

        </div>
        <div id="detail"></div>
      </>
    );
  }
