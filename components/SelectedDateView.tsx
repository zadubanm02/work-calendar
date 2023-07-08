import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import TimeButton from "./TimeButton";
import { AntDesign } from "@expo/vector-icons";
import { useCalendar } from "../hooks/useCalendar";
import moment from "moment";
import "moment/min/moment-with-locales";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import TopNavigation from "./TopNavigation";
import { RootStackParamList } from "../navigation";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDay } from "../hooks/useDay";
import NoteRow from "./NoteRow";
import { mapDayString } from "../lib/utils";

type DayDetailScreenRouteProp = RouteProp<RootStackParamList, "DayDetail">;
type StackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DayDetail"
>;

type Props = {
  date?: string;
};

export default function SelectedDateView({ date }: Props) {
  const { selectedDayData } = useDay();

  const navigation = useNavigation();
  const route = useRoute<DayDetailScreenRouteProp>();
  const isWorkDay = true;
  const params = route.params;

  const handleDelete = (note: string) => {};

  useEffect(() => {
    console.log("Some Date", selectedDayData);
  }, [date]);

  // if (date == undefined) {
  //   return (
  //     <View>
  //       <Text>Something is undefined</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView style={styles.container}>
      {params ? (
        <TopNavigation headerDay={params.day ?? undefined} />
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>
            {mapDayString(date)}
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate<StackNavigationProp>("DayDetail", {
                screen: "DayDetail",
                day: date,
              })
            }
          >
            <Ionicons name="open-outline" size={24} color="black" />
          </Pressable>
        </View>
      )}
      {isWorkDay && (
        <View style={styles.times}>
          <TimeButton time="7:30" active={selectedDayData?.time === "7:30"} />
          <TimeButton time="8:00" active={selectedDayData?.time === "8:00"} />
          <TimeButton time="8:30" active={selectedDayData?.time === "8:30"} />
        </View>
      )}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Poznámky</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("AddNote");
          }}
          style={styles.newNote}
        >
          <AntDesign name="plus" size={18} color="white" />
          <Text style={{ color: "#fff", marginLeft: 2, fontWeight: "bold" }}>
            Nová poznámka
          </Text>
        </Pressable>
      </View>
      {/* Container for notes */}
      <View>
        {selectedDayData?.notes?.map((note, index) => {
          return (
            <NoteRow
              key={index}
              onDelete={() => console.log(note)}
              note={note}
            />
          );
        })}
        {/* <NoteRow onDelete={() => console.log("Hello")} note="Zubar 8:00" />
        <NoteRow
          onDelete={() => console.log("Hello")}
          note="Chcecm oe nsdjfalsdn laskndlasd lkasjdadjnsasfk alksdlansd klnasf nlkaslkfn asdasi asidj dj asijdadspa"
        />
        <NoteRow
          onDelete={() => console.log("Hello")}
          note="Chcecm oe nsdjfalsdn laskndlasd lkasjdadjnsasfk alksdlansd klnasf nlkaslkfn asdasi asidj dj asijdadspa"
        />
        <NoteRow
          onDelete={() => console.log("Hello")}
          note="Chcecm oe nsdjfalsdn laskndlasd lkasjdadjnsasfk alksdlansd klnasf nlkaslkfn asdasi asidj dj asijdadspa"
        />
        <NoteRow onDelete={() => console.log("HH")} note="Zubar 8:00" /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: "rgb(226 232 240)",
    paddingTop: 10,
  },
  times: {
    flexDirection: "row",
    marginVertical: 10,
  },
  newNote: {
    backgroundColor: "#000",
    borderRadius: 10,
    padding: 5,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
