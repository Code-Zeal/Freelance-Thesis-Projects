import React from 'react'
import ItemContent from './ItemContent'
import Themes from "../../assets/Themes.jpeg"
import Tests from "../../assets/Tests.jpeg"
import Homework from "../../assets/Homework.jpeg"
import Videos from "../../assets/Videos.jpeg"
import Games from "../../assets/Games.jpeg"
import PDF from "../../assets/PDF.jpeg"
import Translator from "../../assets/Translator.jpeg"
import Audios from "../../assets/Audios.jpeg"
import Assistance from "../../assets/Assistance.jpeg"
function ContentContainer({classSelected}) {

  const ItemsByClass = [
    {name:"Temas",image:Themes,path:"Themes",data:{temas:classSelected?.temas ? classSelected?.temas:[],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Evaluaciones",image:Tests,path:"Tests",data:{tests:classSelected?.evaluaciones ?classSelected?.evaluaciones:[],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Tareas y Practicas",image:Homework,path:"Homework",data:{homeworks:classSelected?.tareasYPracticas ? classSelected?.tareasYPracticas: [],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Videos",image:Videos,path:"Videos",data:{videos:classSelected?.videos ? classSelected?.videos:[],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Juegos",image:Games,path:"Games",data:{games:classSelected?.juegos ? classSelected?.juegos: [],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Libros PDF",image:PDF,path:"PDF",data:{pdf:classSelected?.librosPDF ?classSelected?.librosPDF:[],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Traductor",image:Translator,path:"Translator",data:{}},
    {name:"Audios",image:Audios,path:"Audios",data:{audios:classSelected?.audios ?classSelected?.audios:[],id:classSelected?.id,notasYAsistencias:classSelected?.notasYAsistencias?classSelected?.notasYAsistencias:[]}},
    {name:"Notas y Asistencia",image:Assistance,path:"Assistance",data:{notasYAsistencias:classSelected ?classSelected :[],id:classSelected?.id}}
  ]
  return (
    <div className='flex justify-evenly items-center flex-wrap'>{ItemsByClass?.map((item)=>{
      return <ItemContent image={item.image} name={item.name} path={item.path} data={item.data}/>
    })}</div>
  )
}

export default ContentContainer