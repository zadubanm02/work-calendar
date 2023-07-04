import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectedDateView from "../components/SelectedDateView";
import { useDay } from "../hooks/useDay";

export default function DayDetailScreen() {
  // const { selectedDate, selectedDayData } = useDay();
  return (
    <ScrollView>
      <SelectedDateView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
