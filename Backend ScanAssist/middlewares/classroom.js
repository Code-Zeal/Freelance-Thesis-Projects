import Classroom from "../models/Classroom.js";
import Student from "../models/Student.js";

export const NewClass = async (req, res) => {
  try {
    const { name, yearAndSection,id,schedule} = req.body;
    if ( name && yearAndSection && id &&schedule) {
      const createdClass = await Classroom.create({
        name,
        yearAndSection,
        teacher:id,
        schedule
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

export const GetAllClassrooms = async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const classrooms = await Classroom.findAll({ where: { teacher: id } });

      if (classrooms) {
        const classroomsWithStudents = await Promise.all(
          classrooms.map(async (classroom) => {
            const studentData = await Student.findAll({
              where: { id: classroom.students }, // Asumiendo que `students` es un array de IDs
            });
            return {
              ...classroom.toJSON(),
              students: studentData,
            };
          })
        );

        return res.status(200).json(classroomsWithStudents);
      } else {
        return res.status(200).json([]);
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const GetClassroom = async (req, res) => {
  const {id} = req.body
  try {
    if(id){
      const classrooms = await Classroom.findOne({where:{id}});

      if (classrooms) {
        return res.status(200).json(classrooms.dataValues);
      } else {
        return res.status(200).json({});
      }
    } else {
      throw new Error("Campos inválidos");
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: error.message });
  }
};

export const UpdateClass = async (req, res) => {
  try {
    const {id, name, yearAndSection,teacher, students, schedule, attendance,absences} = req.body;
    console.log(req.body);
    
    const updateFields = {};
    if (name) {
      updateFields.name = name;
    }
    if (yearAndSection) {
      updateFields.yearAndSection = yearAndSection;
    }
    if (teacher) {
      updateFields.teacher = teacher;
    }
    if (students) {
      updateFields.students = students;
    }
    if (schedule) {
      updateFields.schedule = schedule;
    }
    if (attendance) {
      updateFields.attendance = attendance;
    }
    if (absences) {
      updateFields.absences = absences;
    }
    if (id) {
      const classroom = await Classroom.findOne({ where: { id } });
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
    return res.status(500).json({ message: "Error del servidor", error });
  }
};



export const RemoveClass = async (req, res) => {
  try {
    const { id } = req.body;
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
