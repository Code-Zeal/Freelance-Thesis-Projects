import React, { useCallback, useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Agenda, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import { getCalendar } from "../api/ASCalendar";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "en.",
    "febr.",
    "mzo",
    "abr",
    "my",
    "jun",
    "jul.",
    "agt",
    "sept.",
    "oct.",
    "nov.",
    "dic.",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom.", "Lun.", "Mar.", "Mie.", "Jue.", "Vie.", "Sab."],
  today: "Hoy",
};

// const { mealPlan } = useMealPlan();
LocaleConfig.defaultLocale = "es";
// import useMealPlan from "../hooks/MealHook";

// Función para añadir un cero si el mes o día es menor a 10
function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}

// Dar formato a la fecha como 'YYYY-MM-DD'
const fechaActual = new Date(); // Obtener fecha actual
const fechaFormateada = [
  fechaActual.getFullYear(),
  padTo2Digits(fechaActual.getMonth() + 1), // Los meses en JavaScript comienzan desde 0
  padTo2Digits(fechaActual.getDate()),
].join("-");

function Calendar() {
  const [items, setItems] = useState({});

  const loadItems = async () => {
    const StorageItems = await getCalendar();
    setItems(StorageItems);
  };
  const navigation = useNavigation();
  useEffect(() => {
    loadItems();
  }, []);

  const renderItem = (reservation) => {
    const fontSize = reservation?.first ? 16 : 14;
    const color = reservation?.first ? "black" : "#43515c";

    const hora = {
      Desayuno: "8:00am",
      Almuerzo: "12:00pm",
      Merienda: "04:00pm",
      Cena: "08:00pm",
    };

    return (
      <TouchableOpacity
        style={[styles.item, { height: reservation.height }]}
        onPress={() =>
          navigation.navigate("PlanDetail", {
            extra: reservation.extra,
            date: reservation.date,
          })
        }
      >
        <Text style={{ fontSize, color }}>{reservation.name}</Text>
        <Text style={{ fontSize, color }}>{hora[reservation.name]}</Text>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>This is an empty date!</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };
  return (
    <Agenda
      items={items}
      displayLoadingIndicator={false}
      loadItemsForMonth={loadItems}
      selected={fechaFormateada}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      rowHasChanged={rowHasChanged}
      showClosingKnob={true}
      theme={{
        agendaDayTextColor: "#756BB7",
        agendaDayNumColor: "#756BB7",
        agendaTodayColor: "#756BB7",
        agendaKnobColor: "#756BB7",
        selectedDayBackgroundColor: "#756BB7",
        dotColor: "#756BB7",
        todayTextColor: "#756BB7",
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "white",
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});

export default Calendar;
