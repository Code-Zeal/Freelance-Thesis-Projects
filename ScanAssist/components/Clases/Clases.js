import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { DataTable, Modal } from 'react-native-paper'; 
import { DeleteClass, GetAllClassrooms, NewClass } from '../../api/classrooms';
import NuevaClase from './NuevaClase';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import EditarClase from './EditarClase';
import EditarClaseAlumnos from './EditarClaseAlumnos';
import storage from '../../storage/user';
import Toast from 'react-native-toast-message';
import Horario from './Horario';
import AsistenciaHoy from './AsistenciaHoy';
import moment from 'moment-timezone';
import { useFocusEffect } from '@react-navigation/native';

function Clases() {
  const [clases, setClases] = useState(undefined)
  const [visible, setVisible] = React.useState(false);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [visibleAlumnos, setVisibleAlumnos] = useState(false);
  const [trigger, setTrigger] = useState(false)
  const [userData, setUserData] = useState(undefined)
  const [name, setName] = useState({value:"",errors:[]})
  const [yearAndSection, setYearAndSection] = useState({value:"",errors:[]})
  const [schedule, setSchedule] = useState({"friday": false, "monday": false, "tuesday": false, "thursday": false, "wednesday": false})
  const [horario, setHorario] = useState(false)
  const [clasesHoy, setClasesHoy] = useState(false)
  const [loading, setLoading] = useState(false)
  storage
  .load({
    key: 'user',
    autoSync: true,
    syncInBackground: true,
  })
  .then(ret => {
    setUserData(ret)
  })
  .catch(err => {
    console.warn(err.message);
    switch (err.name) {
      case 'NotFoundError':
        break;
    }
  });
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const hideModalHorario = () => setHorario(false);
  const hideModalAsistenciaHoy = () => setClasesHoy(false);
  const showModalHorario = (clase) => setHorario(clase);
  const showModalAsistenciaHoy = (clase) => setClasesHoy(clase);
  const showModalEdit = (clase) => setVisibleEditor(clase);
  const hideModalEdit = () => setVisibleEditor(false);
  const showModalAlumnos = (clase) => setVisibleAlumnos(clase);
  const hideModalAlumnos = () => setVisibleAlumnos(false);
  const getClases = async()=>{
    console.log(userData.id);
    
    const {data,status} = await GetAllClassrooms(userData?.id)
    if(status === 200){
      console.log(data);
      setClases(data)
    }else{
      setClases([])
    }
  } 
  useFocusEffect(
    React.useCallback(() => {
      if(visible === false && userData)getClases()

    }, [visible,trigger,userData])
  );

  const onCreate = async () => {
    setLoading(true);
    
    if (name?.value?.length === 0) {
      setName({ ...name, errors: ["Se necesita un nombre para la clase"] });
      setLoading(false);
      return;
    } else {
      setName({ ...name, errors: [] });
    }
  
    if (yearAndSection?.value?.length === 0) {
      setYearAndSection({ ...yearAndSection, errors: ["Se necesita colocar el año y la sección para la clase"] });
      setLoading(false);
      return;
    } else {
      setYearAndSection({ ...yearAndSection, errors: [] });
    }
  
    if (name?.errors?.length > 0 || yearAndSection?.errors?.length > 0) {
      setLoading(false);
      return;
    }
  
    try {
      const { status } = await NewClass(name.value, yearAndSection.value, userData?.id, schedule);
      if (status !== 200) {
        Toast.show({ type: "error", text1: "Error", text2: "Ha ocurrido un error al crear la clase" });
      } else {
        Toast.show({ type: "success", text1: "Correcto", text2: "Clase creada correctamente" });
        setName({value:"",errors:[]})
        setYearAndSection({value:"",errors:[]})
        setSchedule({"friday": false, "monday": false, "tuesday": false, "thursday": false, "wednesday": false})
        hideModal();
      }
    } catch (error) {
      console.error(error);
      Toast.show({ type: "error", text1: "Error", text2: "Ha ocurrido un error inesperado" });
    } finally {
      setLoading(false);
    }
  };  
  return (
    <View>
      {loading ? (
        <MaterialCommunityIcons name="loading" size={32} />
      ) : (
        visible && (
          <NuevaClase
            id={userData.id}
            hideModal={hideModal}
            name={name}
            setName={setName}
            setYearAndSection={setYearAndSection}
            yearAndSection={yearAndSection}
            setSchedule={setSchedule}
            schedule={schedule}
            onCreate={onCreate}
          />
        )
      )}

      {horario && <Horario clase={horario} hideModal={hideModalHorario} />}

      {clasesHoy && <AsistenciaHoy clase={clasesHoy} hideModal={hideModalAsistenciaHoy} />}

      {visibleEditor && (
          <EditarClase
            setTrigger={setTrigger}
            hideModal={hideModalEdit}
            clase={visibleEditor}
          />
         
      )}
      {visibleAlumnos && (
          <EditarClaseAlumnos
            setTrigger={setTrigger}
            hideModal={hideModalAlumnos}
            clase={visibleAlumnos}
          />
      )}
      <TouchableOpacity
        onPress={showModal}
        style={{
          position: "absolute",
          bottom: heightPercentageToDP(11),
          borderRadius: 100,
          right: 20,
          zIndex: 1,
          backgroundColor: "#171717",
        }}
      >
        <MaterialCommunityIcons name="plus" color={"#fff"} size={62} />
      </TouchableOpacity>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>Nombre de la clase</DataTable.Title>
        </DataTable.Header>
        {clases && clases.length > 0 ? (
          clases?.map((clase, index) => {
          const timeZone = 'America/Caracas';

            const dayOfWeek = moment().tz(timeZone).format('dddd').toLowerCase()
            
            return (
              <View key={`Clase Item` + index}>
                <DataTable.Row>
                  <DataTable.Cell>{clase.name}</DataTable.Cell>
                  <Menu >
                    <MenuTrigger
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 20,
                        height: 50,
                      }}
                    >
                      <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="black"
                      />
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption
                        onSelect={() => showModalAlumnos(clase)}
                        text="Alumnos de la clase"
                      />
                      <MenuOption
                        onSelect={() => showModalHorario(clase)}
                        text="Horario de la clase"
                      />
                      {clase.schedule[dayOfWeek] ? (
                        <MenuOption
                          onSelect={() => showModalAsistenciaHoy(clase)}
                          text="Asistencia de hoy"
                        />
                      ) : (
                        <MenuOption
                          disabled
                          disableTouchable
                          text="Asistencia de hoy"
                        />
                      )}
                      <MenuOption
                        onSelect={() => showModalEdit(clase)}
                        text="Editar clase"
                      />
                      <MenuOption
                        onSelect={async () => {
                          let { status, data, error } = await DeleteClass(
                            clase?.id
                          );
                          if (status === 200) {
                            setTrigger(!trigger);
                            return Alert.alert("Borrado correctamente");
                          } else {
                            return Alert.alert("Error al borrar", error);
                          }
                        }}
                      >
                        <Text style={{ color: "red" }}>Borrar clase</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                </DataTable.Row>
              </View>
            );
          })
        ) : clases && clases.length < 1 ? (
          <Text
            style={{
              width: widthPercentageToDP(100),
              textAlign: "center",
              marginTop: heightPercentageToDP(20),
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
            }}
          >
            No hay clases creadas
          </Text>
        ) : (
          <Text
            style={{
              width: widthPercentageToDP(100),
              textAlign: "center",
              marginTop: heightPercentageToDP(20),
              fontSize: widthPercentageToDP(5),
              fontWeight: "700",
            }}
          >
            Cargando...
          </Text>
        )}
      </DataTable>
    </View>
  );
}
const styles = StyleSheet.create({ 
  container: { 
    height:heightPercentageToDP(100),
    position:"relative",
    paddingTop: 0, 
  }, 
  tableHeader: { 
    backgroundColor: '#b59af7', 
  }, 
});
export default Clases