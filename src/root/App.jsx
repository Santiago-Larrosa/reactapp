import React, { useState, useEffect } from 'react';
import './Appstyle.css';

function TuComponente() {
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [comentarios, setComentarios] = useState([]);
  const fechaInicial = new Date();
  const [hora, sethora] = useState(fechaInicial);
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevahora = new Date();
        sethora(nuevahora);
      const nuevahoras=(nuevahora.getHours().toString().padStart(2,0));  
      const nuevaminuto=(nuevahora.getMinutes().toString().padStart(2,0));  
      const nuevasegundos=(nuevahora.getSeconds().toString().padStart(2,0));  
    const nuevoId = comentarios.length + 1;
    
    const nuevoComentario = {
      nombre,
      mensaje,
      id: nuevoId,
      hora:(nuevahoras),
      minutos:(nuevaminuto),
      segundos:(nuevasegundos)

    };

    setComentarios([...comentarios, nuevoComentario]);
    setNombre('');
    setMensaje('');
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
      <h1 className="titulo"> <i>CREAR POST </i></h1>
      <h1 className="titulo1"> <i>CREAR POST </i></h1>
      <h1 className="titulo2"> <i>CREAR POST </i></h1>
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
          <label className="Posting" htmlFor="mensaje"></label>
          <textarea
          className='InPost'
            id="mensaje"
            placeholder='Post'
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
        <button className='botonazo'>Crear Post</button>
     
      </form>
      <button className='botonazo2'><a  href="/"> Inicio</a></button>
    </div>
  );
}

export default TuComponente;

