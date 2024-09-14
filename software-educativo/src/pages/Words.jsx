// src/Words.js
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

// Array de sonidos (asegúrate de que las rutas sean correctas)
const sonidos = [
  { texto: "Dulce", src: 'https://audio.jukehost.co.uk/KyIQAS79k657mWabml7M1tGSIWeuM9YA' },
  { texto: "Amigo", src: 'https://audio.jukehost.co.uk/g9zEsJcuTxjIMSgvQN6qViXDZu54xBU6' },
  { texto: "Cuento", src: 'https://audio.jukehost.co.uk/fh8jwrcYyKGR3pWqeNZAMOaQRCdmuzjJ' },
  { texto: "Color", src: 'https://audio.jukehost.co.uk/tTjQ9HSzgGAoa5vOvuogc6GG9IXHlJcj' },
  { texto: "Estrella", src: 'https://audio.jukehost.co.uk/lD5ldKLzUpRFWsj11S6mh9WOXdQaikdO' },
  { texto: "Risa", src: 'https://audio.jukehost.co.uk/Hh6ytnNvdwqV8u8gwD3beyCsBU1HUF3y' },
  { texto: "Fiesta", src: 'https://audio.jukehost.co.uk/hnUaEH04fxbruFyiX67z9oh1IS91fHEx' },
  { texto: "Gato", src: 'https://audio.jukehost.co.uk/w2QoWoFgKl5djx3rPXBT94E9Ulz6CsE1' },
  { texto: "Perrito", src: 'https://audio.jukehost.co.uk/3a0EwC1lkLvSXdZfmAvidmeocmNHY8kv' },
  { texto: "Caramelo", src: 'https://audio.jukehost.co.uk/W1pONIv6HmJpHpEtZR6y4hK8N0AkmOXt' },
];

const Words = () => {
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
    setRespuestaCorrecta(sonidoActual.texto);
    const opciones = generarOpciones(sonidoActual.texto);
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

  const palabras = ['Juguete', 'Nube', 'Saltar', 'Juego', 'Magia', 'Héroe', 'Sorpresa', 'Tarta', 'Abrazo', 'Sonrisa','Fresa','Naranja'];

  const generarOpciones = (correcta) => {
      const opcionesGeneradas = new Set([correcta]);
      
      while (opcionesGeneradas.size < 3) { // 1 correcta + 3 incorrectas
          const indiceAleatorio = Math.floor(Math.random() * palabras.length);
          const opcion = palabras[indiceAleatorio];
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
    <div className='bg-words bg-cover w-[100vw] flex justify-center items-center h-[100vh]'>
      {nivel >= sonidos.length ? <></> : <Link className='absolute top-[5vh] left-[5vw] bg-[#171717] text-white px-[1em] text-[2em] rounded-lg font-semibold' to={"/menu"}>Volver</Link>}
    {nivel >= sonidos.length ? 
        <div className='w-[60vw] h-[60vh] mx-auto border-2 flex flex-col justify-evenly items-center brightness-100 px-10 bg-green-700 border-black'>
          <h2 className='text-[#000] font-bold text-[4rem] text-center'>¡Felicidades! Has completado todos los niveles</h2>
          <Link className='bg-[#000] text-white px-[1em] text-[2em] rounded-lg font-semibold' to={"/menu"}>Volver</Link>

        </div>
    :
    
      <div className='w-[60vw] h-[60vh] mx-auto border-2 flex flex-col justify-evenly items-center brightness-100 border-black relative'>
         
      <h1 className='text-[#000] font-bold text-[3rem]'>Nivel {nivel + 1}</h1>
      <button onClick={()=>{
        audio.volume = 1
        audio.play()
      }}>
     <img className='w-[15vw] bg-[#50f9ff] rounded-full p-5' src='https://www.svgrepo.com/show/521855/sound.svg'/>
      </button>
      <h2 className='text-[#000] font-bold text-s text-[3rem] '>¿Qué palabra escuchaste?</h2>
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

export default Words;