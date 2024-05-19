import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const StartScreen = ({ navigation }) => {
  const handLogin = () => {
    navigation.navigate("Login");
  };
const handSignup = () => {
    navigation.navigate("ChoiceRole");
}
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ITWork</Text>
      <TouchableOpacity style={styles.button} onPress={handLogin}>
        <Text style={{ fontSize: 20, color: "white" }}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "green" }]}
        onPress={handSignup}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Đăng ký</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 30,
    color: "#0866FF",
  },
  button: {
    backgroundColor: "#0866FF",
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 60,
  },
});

export default StartScreen;
