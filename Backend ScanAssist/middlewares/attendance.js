import Student from "../models/Student.js"
import Classroom from "../models/Classroom.js"
import moment from "moment";
import momentT from "moment";
import { sendNotificationEmail } from "./extra.js";
import Teacher from "../models/Teacher.js";
export const checkAttendances = async ()=>{
  const clases = await Classroom.findAll()
  const dayOfWeek = moment().format('dddd');
  const todayInVenezuela = momentT().tz('America/Caracas').format('DD-MM-YYYY');
  for (let i = 0; i < clases.length; i++) {
    const clase = clases[i];
    let teacherId = Number(clase?.dataValues?.teacher)
    console.log(teacherId);
    console.log(typeof teacherId);
    const teacher = await Teacher.findByPk(teacherId)

    const asistencias = clase?.attendance?.find((dia)=>dia?.date === todayInVenezuela)
    let inasistencias = {date:todayInVenezuela,students:[]}
    if(clase.schedule[dayOfWeek.toLowerCase()] ){
      let estudiantes = clase.dataValues.students
      if(estudiantes && estudiantes.length > 0){
        for (let i = 0; i < estudiantes.length; i++) {
          const estudianteId = estudiantes[i];
          if(asistencias?.students?.includes(estudianteId)){
          return
          }else{
            inasistencias?.students?.push(estudianteId)
          }
        }
        
      }}
      if(inasistencias?.students?.length > 0){
        for (let i = 0; i < inasistencias?.students.length; i++) {
          const inasistenteId = inasistencias?.students[i];
          console.log(inasistenteId);
          console.log(typeof inasistenteId);
          
          const alumno = await Student.findByPk(inasistenteId)
          console.log(alumno);
          
          sendNotificationEmail(alumno?.parentEmail,alumno?.name,alumno?.yearAndSection,todayInVenezuela,clase?.name,teacher?.name,teacher?.cellPhone,teacher?.email)
          
        }
      }
      return
    }
    
    
  }

export const addAssistance = async(req,res)=>{
  try {
    
    const {studentId, classId} = req.body
    console.log(req.body);
    
    const todayInVenezuela = momentT().tz('America/Caracas').format('DD-MM-YYYY');
    
    let clase = await Classroom.findByPk(classId)
    console.log("1");
    
    let asistencia = clase?.attendance?.find((dia)=>dia.date === todayInVenezuela)
    console.log("2");
    if(!asistencia){
      clase.attendance = []
      clase.attendance.push({"date":todayInVenezuela,"students":[]})
      asistencia = clase.attendance.find((dia)=>dia.date === todayInVenezuela)
    }
    let alumno = asistencia?.students?.find((alumno)=>alumno === studentId)
    console.log("3");

    if(!alumno){
      let newData = clase?.attendance?.map((el)=>{
        if(el.date === todayInVenezuela){
          
          return {date:todayInVenezuela,students:[...el?.students,studentId ]}
        }
      })
      clase.attendance = newData
      console.log("4");
    console.log(clase);
    
  }
  console.log("5");
  console.log(clase);
  await clase.save()
  console.log("6");
    return res.status(200).send("OK")
  } catch (error) {
    return res.status(500).json({error}) 
  }
}