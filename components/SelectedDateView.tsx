import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
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

type DayDetailScreenRouteProp = RouteProp<RootStackParamList, "DayDetail">;
type StackNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "DayDetail"
>;

export default function SelectedDateView() {
  moment.locale("sk");

  const { selectedDate } = useCalendar();
  const navigation = useNavigation();
  const route = useRoute<DayDetailScreenRouteProp>();
  const isWorkDay = true;
  const params = route.params;
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
            {selectedDate}
          </Text>
          <Pressable
            onPress={() =>
              navigation.navigate<StackNavigationProp>("DayDetail", {
                screen: "DayDetail",
                day: selectedDate,
              })
            }
          >
            <Ionicons name="open-outline" size={24} color="black" />
          </Pressable>
        </View>
      )}
      {isWorkDay && (
        <View style={styles.times}>
          <TimeButton time="7:30" active={false} />
          <TimeButton time="8:00" active={true} />
          <TimeButton time="8:30" active={false} />
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
        <Pressable style={styles.newNote}>
          <AntDesign name="plus" size={18} color="white" />
          <Text style={{ color: "#fff", marginLeft: 2 }}>Nová poznámka</Text>
        </Pressable>
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
