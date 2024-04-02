import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useCalendar } from "../hooks/useCalendar";
import { WorkWeek } from "../lib/asyncStorage";

export default function FillWeeksScreen() {
  const { saveWorkWeeks, deleteAll } = useCalendar();
  const navigation = useNavigation();

  const handleWorkWeek = (workWeek: WorkWeek) => {
    saveWorkWeeks(workWeek)
      .then(() => {
        return navigation.goBack();
      })
      .catch((error) => console.log("Error", error));
  };

  const handleDeleteAll = () => {
    deleteAll().then(() => {
      return navigation.goBack();
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle-outline" size={32} color="black" />
        </Pressable>
        <Text style={styles.text}>Upraviť kalendár</Text>
      </View>

      <View style={[styles.row, { marginVertical: 15 }]}>
        <Text style={[styles.text, { marginVertical: 10 }]}>
          Tento týždeň je:
        </Text>
        <Pressable
          onPress={() => handleWorkWeek(WorkWeek.Short)}
          style={[styles.button, { backgroundColor: "#000" }]}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Krátky</Text>
        </Pressable>
        <Pressable
          onPress={() => handleWorkWeek(WorkWeek.Long)}
          style={[styles.button, { backgroundColor: "#000" }]}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Dlhý</Text>
        </Pressable>
      </View>
      <View style={[styles.row, { marginVertical: 15 }]}>
        <Text style={[styles.text, { marginVertical: 10 }]}>Alebo</Text>
        <Pressable
          onPress={() => handleDeleteAll()}
          style={[
            styles.button,
            { backgroundColor: "rgb(248 113 113)", marginHorizontal: 30 },
          ]}
        >
          <Text
            style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          >
            Vymazať kalendár
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 20,
    marginTop: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    padding: 10,
    borderRadius: 10,
  },
});
