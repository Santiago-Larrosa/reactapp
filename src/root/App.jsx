import React, { useState, useEffect } from 'react';
import './Appstyle.css';

function TuComponente() {
  const [nombre, setNombre] = useState('');
  const [Titulo, setTitulo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const fechaInicial = new Date();
  const [hora, sethora] = useState(fechaInicial);
const [contador, setContador] = useState(() => {
  // Intenta obtener el contador almacenado en localStorage
  const storedContador = localStorage.getItem('contador');
  
  // Si no hay un contador en localStorage, inicializa con 1
  return storedContador ? parseInt(storedContador) : 1;
});
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevahora = new Date();
    sethora(nuevahora);
    const nuevahoras = nuevahora.getHours().toString().padStart(2, '0');
    const nuevaminuto = nuevahora.getMinutes().toString().padStart(2, '0');
    const nuevasegundos = nuevahora.getSeconds().toString().padStart(2, '0');

    const nuevoComentario = {
      nombre,
      mensaje,
      Titulo,
      id: contador, // Asigna el ID del comentario usando el contador
      hora: nuevahoras,
      minutos: nuevaminuto,
      segundos: nuevasegundos,
    };
    setContador((prevContador) => prevContador + 1);

    // Actualiza el contador en localStorage
    localStorage.setItem('contador', contador + 1);
    setComentarios([...comentarios, nuevoComentario]);
    setContador(contador + 1); // Incrementa el contador para el próximo comentario
    setNombre('');
    setMensaje('');
    setTitulo('');
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
    <>
     <header className="Head">
    <a href="/app"><img src=".\SRC\root\13007.png" alt="mensaje" className="imagen"  /></a> 
    <a href="/"><img src=".\SRC\root\13009.png" alt="mensaje" className="imagen2" /></a>
      
    </header>
    <div>
      
 
      <form onSubmit={handleSubmit}>
        <div>
          <label className="Nombre" htmlFor="nombre"></label>
          <input
          className='InNombre'
            type="text"
            id="nombre"
            placeholder='Nombre'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div>
          <label className="Titulor" htmlFor="Titulo"></label>
          <input
          className='InTitulo'
            type="text"
            id="titulo"
            placeholder='Titulo'
            value={Titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>
        <div>
          <label className="Posting" htmlFor="mensaje"></label>
          <textarea
          className='InPost'
            id="mensaje"
            placeholder='Post'
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
        <button className='botonazo'>Crear <br></br>Post</button>
     
      </form>
      
    </div>
    </>
  );
}

export default TuComponente;






