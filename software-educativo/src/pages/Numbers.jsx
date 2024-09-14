// src/Numbers.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Array de sonidos (asegúrate de que las rutas sean correctas)
const sonidos = [
  { numero: 15, src: 'https://audio.jukehost.co.uk/EjW2yaLShQ8D2ASZn91HSfFSEtok3Mc0' },
  { numero: 2, src: 'https://audio.jukehost.co.uk/aSKmBmoWThqWl5w70w6rvmyi46XiG8ZS' },
  { numero: 10, src: 'https://audio.jukehost.co.uk/fok9GOKgJO7QyXyOwbpQPJHSy6AMjXth' },
  { numero: 12, src: 'https://audio.jukehost.co.uk/i89ZxKSX5SmHFPPPFN921a7JYkItOPLm' },
  { numero: 20, src: 'https://audio.jukehost.co.uk/HMDcP8rkUwSiKCe6w30uvxMW8exsGK0a' },
  { numero: 11, src: 'https://audio.jukehost.co.uk/DSXioyuiHWdJEXUNwge4PRS2SJG5hi0h' },
  { numero: 7, src: 'https://audio.jukehost.co.uk/1FnpJ4EIcRq20LfuDHvVhOJNwYKd3dUk' },
  { numero: 23, src: 'https://audio.jukehost.co.uk/q4t612OhpdNBrm7azclYr1z82IZlqGTm' },
  { numero: 19, src: 'https://audio.jukehost.co.uk/k7EFElYE4PKGj8AmcHK5BL94lfts1lnW' },
  { numero: 30, src: 'https://audio.jukehost.co.uk/NNnDhLszMuIzf0J5pmMQHbxcJ3npI5ew' },
];

const Numbers = () => {
  const [nivel, setNivel] = useState(0);
  const [opciones, setOpciones] = useState([]);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);
  const [resultado, setResultado] = useState('');
  const [audio, setAudio] = useState(new Audio());

  useEffect(() => {
    if (nivel < sonidos.length) {
      iniciarNivel();
    }
  }, [nivel]);

  const iniciarNivel = () => {
    const sonidoActual = sonidos[nivel];
    setRespuestaCorrecta(sonidoActual.numero);
    const opciones = generarOpciones(sonidoActual.numero);
    setOpciones(opciones);
    const aud = new Audio(sonidoActual.src)
    setAudio(aud);
  };

  useEffect(() => {
    // Reproducir audio cuando cambia el nivel
    if (audio.src) {
      audio.play().catch(error => console.error("Error reproduciendo el audio:", error));
    }
  }, [audio]);

  const generarOpciones = (correcta) => {
    const opcionesGeneradas = new Set([correcta]);
    while (opcionesGeneradas.size < 3) {
      const opcion = Math.floor(Math.random() * 10) + 1;
      opcionesGeneradas.add(opcion);
    }
    return Array.from(opcionesGeneradas).sort(() => Math.random() - 0.5);
  };

  const manejarRespuesta = (respuesta) => {
    if (respuesta === respuestaCorrecta) {
      toast.success('¡Correcto! Avanzas al siguiente nivel.')
      // setResultado('¡Correcto! Avanzas al siguiente nivel.');
      setNivel(nivel + 1);
    } else {
      toast.error('Incorrecto, intenta de nuevo.')
      // setResultado('Incorrecto, intenta de nuevo.');
    }
  };

  return (
    <div className='bg-words w-[100vw] flex justify-center items-center h-[100vh]'>
       {nivel >= sonidos.length ? <></> : <Link className='absolute top-[5vh] left-[5vw] bg-[#171717] text-white px-[1em] text-[2em] rounded-lg font-semibold' to={"/menu"}>Volver</Link>}
    {nivel >= sonidos.length ? 
        <div className='w-[60vw] h-[60vh] mx-auto border-2 flex flex-col justify-evenly items-center brightness-100 px-10 bg-green-700 border-[#000]'>
          <h2 className='text-[#fff] font-bold text-[4rem] text-center'>¡Felicidades! Has completado todos los niveles</h2>
          <Link className='bg-white px-[1em] text-[2em] rounded-lg font-semibold' to={"/menu"}>Volver</Link>

        </div>
    :
    
      <div className='w-[60vw] h-[60vh] mx-auto border-2 flex flex-col justify-evenly items-center brightness-100 border-[#000]'>
      <h1 className='text-[#000] font-bold text-[3rem]'>Nivel {nivel + 1}</h1>
      <button onClick={()=>{
        audio.volume = 1
        audio.play()
      }}>
     <img className='w-[15vw] bg-[#50f9ff] rounded-full p-5' src='https://www.svgrepo.com/show/521855/sound.svg'/>
      </button>
      <h2 className='text-[#000] font-bold text-s text-[3rem] '>¿Qué número escuchaste?</h2>
      {/* {resultado && <p>{resultado}</p>} */}
      <div>
        {opciones.map((opcion) => (
          <button className='px-[2rem] mx-[2vw] bg-[#171717] text-[#fff] border-[1px] border-[#fff] rounded-lg text-[2rem] hover:scale-105' key={opcion} onClick={() => manejarRespuesta(opcion)}>
            {opcion}
          </button>
        ))}
      </div>
      </div>
    }
    </div>
  );
};

export default Numbers;