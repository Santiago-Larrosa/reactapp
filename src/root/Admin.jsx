import {useState} from 'react';
function Admin () {
    const [contraseña, setContraseña]= useState('');
    const Con='123';
    if (contraseña===Con){ 
        return(
          <h1>Permiso Concedido <button><a href="/">Ir a Inicio</a></button></h1>
          
        );
    }
    const HandleSubmit = (e) => {
      e.preventDefault();
  
    }
   
return (
<>
<form onSubmit={HandleSubmit}>
    <div>
        <label className="contraseña" htmlFor="contaseña"></label>
        <input
          className='InContraseña'
            type="text"
            id="contraseña"
            placeholder='Contraseña'
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </div>

</form>
</>
);


}
export default Admin;