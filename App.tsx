import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Pressable } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import CalendarHeader from "./components/CalendarHeader";
import { useState, useMemo } from "react";
import CalendarArrow from "./components/CalendarArrow";
import moment from "moment";

export default function App() {
  // locales
  moment.locale("sk", {
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
  });

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
    dayNamesShort: ["Pon", "Ut", "Str", "Štv", "Pia", "So", "Ne"],
    today: "Dnes",
  };
  LocaleConfig.defaultLocale = "sk";

  const today = new Date().toDateString();
  const [selected, setSelected] = useState(today);
  const marked = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: "#222222",
        selectedTextColor: "yellow",
      },
    }),
    [selected]
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <Text style={styles.headerText}>Pracovný kalendár</Text>
        <Pressable style={styles.editButton}>
          <Text style={{ fontWeight: "bold", color: "#fff" }}>Upraviť</Text>
        </Pressable>
      </View>

      <Calendar
        onDayPress={(day) => {
          console.log("DAY", day);
          setSelected(day.dateString);
        }}
        onDayLongPress={(day) => console.log("onDayLongPress", day)}
        onMonthChange={(date) => console.log("onMonthChange", date)}
        onPressArrowLeft={(goToPreviousMonth) => {
          console.log("onPressArrowLeft");
          goToPreviousMonth();
        }}
        onPressArrowRight={(goToNextMonth) => {
          console.log("onPressArrowRight");
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
        }}

        // {...props}
      />
      <CalendarHeader headerText="Mesiac" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
  header: {
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
    backgroundColor: "#1960EA",
    borderRadius: 10,
  },
});
