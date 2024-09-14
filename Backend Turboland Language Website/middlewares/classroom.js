import Classroom from "../models/Classroom.js";
import User from "../models/User.js";
import {sendNotificationEmail} from "./extra.js"
export const NewClass = async (req, res) => {
  try {
    const { nombre, logo,id,code} = req.body;
    if ( nombre && logo && id && code) {
      const createdClass = await Classroom.create({
        nombre,
        logo,
        profesor:id,
        code,
        temas:[{
          "lapso": "Primer Lapso",
          "data": [
          ]
        },
        {
          "lapso": "Segundo Lapso",
          "data": [
          ]
        },
        {
          "lapso": "Tercer Lapso",
          "data": [
          ]
        }
        ],
        notasYAsistencias:{
          "Notas": [],
          "Asistencias": []
        }
      });
        if (createdClass) {
          return res.status(200).json(createdClass.dataValues);
        } else {
          throw new Error("Error al crear una clase");
        }
    } else {
      throw new Error("Error en algunos campos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};


export const UpdateClass = async (req, res) => {
  try {
    let {
      id,
      nombre,
      logo,
      email,
      temas,
      evaluaciones,
      tareasYPracticas,
      videos,
      juegos,
      librosPDF,
      traductor,
      audios,
      notasYAsistencias,
      alumnos,
    } = req.body;
    if (id) {
      const classroom = await Classroom.findOne({ where: { id } });
      console.log(req.body);
    if (req.body.librosPDF) {
      librosPDF = JSON.parse(req.body.librosPDF); // Parsear JSON string a objeto
      notasYAsistencias = JSON.parse(req.body.notasYAsistencias); // Parsear JSON string a objeto
    }
    if (req.body.audios) {
      audios = JSON.parse(req.body.audios); // Parsear JSON string a objeto
      notasYAsistencias = JSON.parse(req.body.notasYAsistencias); // Parsear JSON string a objeto
    }

    const file = req.file;
    const updateFields = {};
    if (nombre) {
      updateFields.nombre = nombre;
    }
    if (logo) {
      updateFields.logo = logo;
    }
    if (email) {
      updateFields.email = email?.toLowerCase();
    }

    if (temas) {
      let oldData = temas?.old;
      let finalData = [...oldData];
      updateFields.temas = finalData;
      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Asistencias;
        let newData = {
          id: temas?.new.id,
          evaluation: "Tema: " + temas?.new.title,
          asistencia: [],
        };
        let finalData = {
          ...notasYAsistencias,
          Asistencias: [...oldData, newData],
        };
        updateFields.notasYAsistencias = finalData;
      }
    }

    if (videos) {
      console.log(videos);
      let oldData = videos?.old;
      let newData = videos?.new;
      let finalData = [...oldData, newData];
      updateFields.videos = finalData;
      if (notasYAsistencias) {
        console.log(notasYAsistencias);
        let oldData = notasYAsistencias?.Asistencias;
        let newData = {
          id: videos?.new.id,
          evaluation: "Video: " + videos?.new.title,
          asistencia: [],
        };
        let finalData = {
          ...notasYAsistencias,
          Asistencias: [...oldData, newData],
        };
        updateFields.notasYAsistencias = finalData;
      }
    }

    if (juegos) {
      let oldData = juegos?.old;
      let newData = juegos?.new;
      let finalData = [...oldData, newData];
      updateFields.juegos = finalData;
      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Asistencias;
        let newData = {
          id: juegos?.new.id,
          evaluation: "Juego: " + juegos?.new.title,
          asistencia: [],
        };
        let finalData = {
          ...notasYAsistencias,
          Asistencias: [...oldData, newData],
        };
        updateFields.notasYAsistencias = finalData;
      }
    }
    if (evaluaciones) {
      let oldData = evaluaciones?.old;
      let newData = evaluaciones?.new;
      let finalData = [...oldData, newData];
      updateFields.evaluaciones = finalData;
      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Notas;
        let newData = {
          id: evaluaciones?.new.id,
          evaluation: evaluaciones?.new.title,
          alumnos: [],
        };
        let finalData = { ...notasYAsistencias, Notas: [...oldData, newData] };
        updateFields.notasYAsistencias = finalData;
      }
    }
    if (tareasYPracticas) {
      console.log(tareasYPracticas);
      let oldData = tareasYPracticas?.old;
      let newData = tareasYPracticas?.new;
      let finalData = [...oldData, newData];
      updateFields.tareasYPracticas = finalData;
      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Asistencias;
        let newData = {
          id: tareasYPracticas?.new.id,
          evaluation: tareasYPracticas?.new.title,
          asistencia: [],
        };
        let finalData = { ...notasYAsistencias, Asistencias: [...oldData, newData] };
        updateFields.notasYAsistencias = finalData;
      }
    }
    if (librosPDF && file) {
      let oldData = librosPDF?.old;
      let newData = librosPDF?.new;
      newData.url = file?.path;
      let finalData = [...oldData, newData];
      updateFields.librosPDF = finalData;
      console.log("notasYAsistencias",notasYAsistencias?.Asistencias);
      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Asistencias;
        console.log(oldData);
        let newData = {
          id: librosPDF?.new.id,
          evaluation: "PDF: " + librosPDF?.new.title,
          asistencia: [],
        };
        console.log(newData);
        let finalData = {
          ...notasYAsistencias,
          Asistencias: [...oldData, newData],
        };
        console.log(finalData);
        updateFields.notasYAsistencias = finalData;
      }
    }
    if (traductor) {
      updateFields.traductor = traductor;
    }
    if (audios && file) {
      let oldData = audios?.old;
      let newData = audios?.new;
      newData.url = file?.path;
      let finalData = [...oldData, newData];
      updateFields.audios = finalData;

      if (notasYAsistencias) {
        let oldData = notasYAsistencias?.Asistencias;
        let newData = {
          id: audios?.new.id,
          evaluation: "Audio: " + audios?.new.title,
          asistencia: [],
        };
        let finalData = {
          ...notasYAsistencias,
          Asistencias: [...oldData, newData],
        };
        updateFields.notasYAsistencias = finalData;
      }
    }
    if (alumnos) {
      updateFields.alumnos = alumnos;
    }
    if (notasYAsistencias && !(temas ||
      evaluaciones || 
      tareasYPracticas ||
      videos ||
      juegos ||
      librosPDF ||
      traductor ||
      audios)) {
      let found = classroom?.notasYAsistencias?.Notas?.find((el)=>{
        return el?.id?.toString() === notasYAsistencias.Notas?.evaluation?.id?.toString()
      })
      let arrayF = {...found,alumnos:[...found.alumnos.filter((alumno)=>alumno?.id !== notasYAsistencias?.Notas?.user?.id),{id:notasYAsistencias?.Notas?.user?.id,nota:notasYAsistencias?.Notas?.nota}]}
      
      let finalData = {
        ...classroom.notasYAsistencias,
        Notas: [...classroom.notasYAsistencias.Notas.filter((el)=> el?.id !== arrayF?.id), arrayF],
      };
      let nota = notasYAsistencias?.Notas?.nota
      if(finalData && nota !== ""){
        let alumno = await  User.findOne({ where: { email:notasYAsistencias?.Notas?.user?.email?.toLowerCase() } })
        console.log("notificación:",alumno.dataValues.notify);
        
        if (alumno.dataValues.notify){
          await sendNotificationEmail(notasYAsistencias?.Notas?.user?.email?.toLowerCase(),classroom.nombre,notasYAsistencias?.Notas?.title,nota === ""?"Eliminada":nota)
        }
      }
       updateFields.notasYAsistencias = finalData;
    }
      const updatedClass = await classroom.update(updateFields)
      if (updatedClass) {
        return res.status(200).json(updatedClass.dataValues);
      } else {
        throw new Error("Error al modificar la publicación");
      }
    } else {
      throw new Error("id de la publicación requerida");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};

export const DeleteDataClass = async (req, res) => {
  try {
    let {
      id,
      temas,
      evaluaciones,
      tareasYPracticas,
      videos,
      juegos,
      librosPDF,
      audios,
      notasYAsistencias,
      alumnos,
    } = req.body;
    
    if (id) {

    // Filtrar el contenido a eliminar según el tipo y el id
    const filterContent = (contentArray, deleteId) => {
      return contentArray.filter(item => item.id !== deleteId);
      };
      let updateFields = {}
      const classroom = await Classroom.findOne({ where: { id } });
      
    if (classroom) {
      if (librosPDF) {
        librosPDF = filterContent(classroom?.librosPDF, librosPDF?.id);
        updateFields.librosPDF = librosPDF; 
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>el?.id !== librosPDF?.id),]}
        console.log(updateFields);
        
      }
      
      if (audios) {
        audios = filterContent(classroom?.audios, audios?.id);
        updateFields.audios = audios;
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>el?.id !== audios?.id),]}
      }
      
      if (temas) {
        console.log("Tem",classroom?.temas);
        let lapsoS = ""
        let found = classroom?.temas?.filter((lapso)=>{
          if(lapso?.data?.some((data)=>data?.id === temas?.id)){
            lapsoS = lapso?.lapso
            return true
          }
        })

        if(found?.length > 0){
          let copyId = temas?.id
          temas = filterContent(found[0]?.data, temas?.id);
          let finalData = [...classroom?.temas?.filter((el)=>el?.lapso !== lapsoS),{"lapso":lapsoS,"data":temas}]
          
          
          updateFields.temas = finalData;
          updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>el?.id !== copyId),]}
          console.log("updateFields",updateFields);

        }
      }
      
      if (evaluaciones) {
        let copyId = evaluaciones?.id
        evaluaciones = filterContent(classroom?.evaluaciones, evaluaciones?.id);
        updateFields.evaluaciones = evaluaciones;
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Notas:[...classroom.notasYAsistencias.Notas.filter((el)=>el?.id !== copyId),]}
      }
      
      if (tareasYPracticas) {
        tareasYPracticas = filterContent(classroom?.tareasYPracticas, tareasYPracticas?.id);
        updateFields.tareasYPracticas = tareasYPracticas;
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>el?.id !== tareasYPracticas?.id),]}
      }
      
      if (videos) {
        videos = filterContent(classroom?.videos, videos?.id);
        updateFields.videos = videos;
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>{
          console.log(el);
          console.log(videos);
          console.log(el?.id !== videos?.id);
          return el?.id !== videos?.id}),]}
      }
      
      if (juegos) {
        juegos = filterContent(classroom?.juegos, juegos?.id);
        updateFields.juegos = juegos;
        updateFields.notasYAsistencias = {...classroom.notasYAsistencias,Asistencias:[...classroom.notasYAsistencias.Asistencias.filter((el)=>el?.id !== juegos?.id),]}
      }
      
      if (notasYAsistencias) {
        let array = "";
        if (notasYAsistencias?.Notas) {
          array = "Notas";
        } else {
          array = "Asistencias";
          }
          console.log("array",array);
          let found = classroom?.notasYAsistencias[array]?.find((el)=>{
           return el?.id == notasYAsistencias[array]?.id})
           console.log(found);
          if(found){
            found = {...found,alumnos:[...found?.alumnos?.filter((alumno)=>alumno?.id !== notasYAsistencias[array]?.user?.id),{id:notasYAsistencias[array]?.user?.id,nota:notasYAsistencias[array]?.nota}]}
            console.log("found2",found);
            let finalData = classroom?.notasYAsistencias
            console.log("finalData1",found);
            if(found){
              finalData = {...classroom.notasYAsistencias, [array]:[...classroom.notasYAsistencias[array].filter((el)=>el?.id !== found?.id),found]}
              console.log("finalData2",finalData);
            }
          console.log("notasYAsistencias",classroom?.notasYAsistencias);
          console.log("finalData3",finalData);
          updateFields.notasYAsistencias = finalData;
        }
      }
    
    if (alumnos) {
        alumnos = classroom.alumnos.filter(item => item === alumnos);
        updateFields.alumnos = alumnos;
      }
      
      if (!(
        librosPDF || audios || temas || evaluaciones || tareasYPracticas || videos || juegos || notasYAsistencias || alumnos
      )) {
        throw new Error("Tipo de contenido para eliminar no soportado");
      }
    }


      const updatedClass = await classroom.update(updateFields);
      if (updatedClass) {
        return res.status(200).json(updatedClass.dataValues);
      } else {
        throw new Error("Error al modificar la publicación");
      }
    } else {
      throw new Error("id de la publicación requerida");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};
//MARK: AssistantChecker
export const AssistantChecker = async (req, res) => {
  try {
    let {
      student,
      classId,
      temas,
      tareasYPracticas,
      videos,
      juegos,
      librosPDF,
      audios,
    } = req.body;
    console.log(req.body);
    if (student && classId) {
      if (!(librosPDF || audios || temas || tareasYPracticas || videos || juegos)) {
        throw new Error("Tipo de contenido para eliminar no soportado");
      } else {
        const classroom = await Classroom.findOne({ where: { id: classId } });
        if (!classroom) {
          throw new Error("Clase no encontrada");
        }

        let asistencias = classroom.notasYAsistencias.Asistencias;

        if (temas) {
          let actividad = asistencias.find((activity) => activity?.id === temas);

          if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
            return res.status(200).send("Ya tiene asistencia");
          } else {
            let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
            let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

            let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
            let updatedAsistencias = [...oldAsistencias, newActividad];

            // Actualiza el campo completo de notasYAsistencias
            classroom.notasYAsistencias = {
              ...classroom.notasYAsistencias,
              Asistencias: updatedAsistencias
            };

            // Guarda los cambios en la base de datos
            await classroom.save();
            return res.status(200).send("Asistencia actualizada");
        }
        
      }else if(tareasYPracticas){
        let actividad = asistencias.find((activity) => activity?.id === tareasYPracticas);

          if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
            return res.status(200).send("Ya tiene asistencia");
          } else {
            let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
            let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

            let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
            let updatedAsistencias = [...oldAsistencias, newActividad];

            // Actualiza el campo completo de notasYAsistencias
            classroom.notasYAsistencias = {
              ...classroom.notasYAsistencias,
              Asistencias: updatedAsistencias
            };

            // Guarda los cambios en la base de datos
            await classroom.save();
            return res.status(200).send("Asistencia actualizada");
        }

      }
      else if(videos){
        
        let actividad = asistencias.find((activity) => activity?.id === videos);

          if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
            return res.status(200).send("Ya tiene asistencia");
          } else {
            let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
            let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

            let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
            let updatedAsistencias = [...oldAsistencias, newActividad];

            // Actualiza el campo completo de notasYAsistencias
            classroom.notasYAsistencias = {
              ...classroom.notasYAsistencias,
              Asistencias: updatedAsistencias
            };

            // Guarda los cambios en la base de datos
            await classroom.save();
            return res.status(200).send("Asistencia actualizada");
        }

      }
      else if(juegos){
        
        let actividad = asistencias.find((activity) => activity?.id === juegos);

        if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
          return res.status(200).send("Ya tiene asistencia");
        } else {
          let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
          let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

          let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
          let updatedAsistencias = [...oldAsistencias, newActividad];

          // Actualiza el campo completo de notasYAsistencias
          classroom.notasYAsistencias = {
            ...classroom.notasYAsistencias,
            Asistencias: updatedAsistencias
          };

          // Guarda los cambios en la base de datos
          await classroom.save();
          return res.status(200).send("Asistencia actualizada");
      }

      }
      else if(librosPDF){
        
        let actividad = asistencias.find((activity) => activity?.id === librosPDF);

          if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
            return res.status(200).send("Ya tiene asistencia");
          } else {
            let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
            let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

            let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
            let updatedAsistencias = [...oldAsistencias, newActividad];

            // Actualiza el campo completo de notasYAsistencias
            classroom.notasYAsistencias = {
              ...classroom.notasYAsistencias,
              Asistencias: updatedAsistencias
            };

            // Guarda los cambios en la base de datos
            await classroom.save();
            return res.status(200).send("Asistencia actualizada");
        }

      }
      else if(audios){
        
        let actividad = asistencias.find((activity) => activity?.id === audios);

        if (actividad?.asistencia.some((alumno) => alumno?.id == student.id)) {
          return res.status(200).send("Ya tiene asistencia");
        } else {
          let oldStudents = actividad?.asistencia?.filter((alumno) => alumno?.id != student?.id);
          let newActividad = { ...actividad, asistencia: [...oldStudents, student] };

          let oldAsistencias = asistencias.filter((asistencia) => asistencia?.id != newActividad?.id);
          let updatedAsistencias = [...oldAsistencias, newActividad];

          // Actualiza el campo completo de notasYAsistencias
          classroom.notasYAsistencias = {
            ...classroom.notasYAsistencias,
            Asistencias: updatedAsistencias
          };

          // Guarda los cambios en la base de datos
          await classroom.save();
          return res.status(200).send("Asistencia actualizada");
      }

      }

        
      }
    }
    else {
      throw new Error("id del/la estudiante y de la clase son requeridos");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};




export const JoinClass = async (req, res) => {
  try {
    const { id, code } = req.body;
    console.log(req.body);
    if (!id || !code) {
      return res.status(400).json({ error: 'id del usuario y código de la clase son requeridos.' });
    }
    
    const classroom = await Classroom.findOne({ where: { code } });
    if (!classroom) {
      console.log("clase no encontrada");
      return res.status(404).json({ error: 'Clase no encontrada.' });
    }

    const alumnos = classroom.alumnos || [];

    if (alumnos.includes(id)) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
    }

    alumnos.push(id);
    classroom.alumnos = alumnos;


    const updatedClassroom = await Classroom.update(
      { alumnos: classroom.alumnos },
      { where: { code }, returning: true, plain: true }
    );


    return res.status(200).json(updatedClassroom[1].dataValues);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error del servidor", error });
  }
};



export const RemoveClass = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const classDeleted = await Classroom.destroy({ where: { id } });
      if (classDeleted) {
          return res.status(200).json(classDeleted);
      } else {
        throw new Error("Error al eliminar post");
      }
    } else {
      throw new Error("se requiere id del post e id del emprendimiento");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};
