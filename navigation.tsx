import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddNoteScreen from "./screens/AddNoteScreen";
import DayDetailScreen from "./screens/DayDetailScreen";
import FillWeeksScreen from "./screens/FillWeeksScreen";

export type RootStackParamList = {
  Home: undefined;
  AddNote: { day: string };
  DayDetail: { day: string };
  FillWeeks: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "modal",
          }}
          name="AddNote"
          component={AddNoteScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "containedModal",
          }}
          name="DayDetail"
          component={DayDetailScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            presentation: "modal",
          }}
          name="FillWeeks"
          component={FillWeeksScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
