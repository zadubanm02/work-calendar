import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import SelectedDateView from "../components/SelectedDateView";
import TopNavigation from "../components/TopNavigation";
import { useCalendar } from "../hooks/useCalendar";

export default function DayDetailScreen() {
  const { selectedDate } = useCalendar();
  return (
    <ScrollView>
      <SelectedDateView />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
