import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import CalendarArrow from "../components/CalendarArrow";
import CalendarHeader from "../components/CalendarHeader";
import SelectedDateView from "../components/SelectedDateView";
import { useCalendar } from "../hooks/useCalendar";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  // locales
  moment.updateLocale("sk", {
    months: [
      "Január",
      "Február",
      "Marec",
      "Apríl",
      "Máj",
      "Jún",
      "Júl",
      "August",
      "September",
      "Október",
      "November",
      "December",
    ],
    days: [
      "Pondelok",
      "Utorok",
      "Streda",
      "Štrvtok",
      "Piatok",
      "Sobota",
      "Nedeľa",
    ],
  });
  moment.locale("sk");

  LocaleConfig.locales.sk = {
    monthNames: [
      "január",
      "február",
      "marec",
      "apríl",
      "máj",
      "jún",
      "júl",
      "august",
      "september",
      "október",
      "november",
      "december",
    ],
    monthNamesShort: [
      "jan",
      "feb",
      "mar",
      "apr",
      "maj",
      "jun",
      "jul",
      "aug",
      "sep",
      "okt",
      "nov",
      "dec",
    ],
    dayNames: [
      "nedela",
      "pondelok",
      "utorok",
      "streda",
      "štvrtok",
      "piatok",
      "sobota",
    ],
    dayNamesShort: ["Ne", "Pon", "Ut", "Str", "Štv", "Pia", "So"],
    today: "Dnes",
  };
  LocaleConfig.defaultLocale = "sk";

  // hooks

  const navigation = useNavigation();

  const {
    selectedDate,
    setSelectedDate,
    isSelected,
    workDays,
    saveWorkWeeks,
    deleteAll,
    handleDaySelect,
  } = useCalendar();

  // TODO adjust this function here to make it selected and marked
  const marked = useMemo(() => {
    const dates = {
      ...workDays,
    };
    dates[selectedDate] = {
      ...dates[selectedDate],
      selected: true,
      color: "#000",
      textColor: "#fff",
    };
    return dates;
  }, [selectedDate, workDays]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Pracovný kalendár</Text>
        <Pressable
          onPress={() => navigation.navigate("FillWeeks")}
          style={styles.editButton}
        >
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Upraviť</Text>
        </Pressable>
      </View>

      <Calendar
        onDayPress={(day) => {
          console.log("Selecting day", day);
          handleDaySelect(day.dateString);
        }}
        onDayLongPress={(day) => console.log("onDayLongPress", day)}
        onMonthChange={(date) => console.log("onMonthChange", date)}
        onPressArrowLeft={(goToPreviousMonth) => {
          goToPreviousMonth();
        }}
        onPressArrowRight={(goToNextMonth) => {
          goToNextMonth();
        }}
        // custom rendered components
        renderArrow={(direction) => <CalendarArrow direction={direction} />}
        renderHeader={(date) => {
          const dateStr = date.toISOString();
          const endIndex = dateStr.indexOf("T");
          const title = moment(dateStr.slice(0, endIndex)).format("MMMM YYYY");

          return <CalendarHeader headerText={title} />;
        }}
        theme={{
          textDayFontSize: 20,
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          selectedDayBackgroundColor: "#000",
          selectedDayTextColor: "#fff",
          todayTextColor: "rgb(153 27 27)",
        }}
        // marked days are work days
        markingType={"period"}
        markedDates={marked}
        firstDay={1}

        // {...props}
      />
      <SelectedDateView date={selectedDate as string} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: 30,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
    marginTop: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  editButton: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 10,
  },
});
