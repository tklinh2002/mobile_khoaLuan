import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const Skill = ({name}) => {
  return (
    <View style={styles.skill}>
      <Text style={{ color: "white", fontSize: 18, marginRight: 5 }}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  skill: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    backgroundColor: "green",
    padding: 5,
    marginVertical: 3,
    width: "auto",
    alignSelf: "flex-start",
  },
});
export default Skill;
