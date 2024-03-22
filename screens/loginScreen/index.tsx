import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
const LoginScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handUserName = (username) => {
    setUserName(username);
  };
  const handPassword = (password) => {
    setPassword(password);
  };
  const handPressLogin = async() => {
    // Thực hiện quá trình đăng nhập ở đây và kiểm tra thành công
    // Nếu đăng nhập thành công
    navigation.navigate("HomeClient");
    // const url = 'https://restcountries.com/v3.1/name/aruba?fullText=true'
    // const response = await fetch(url,{
    //   method: 'GET',
    // }).then(response => response.json()).then(data => console.log(data)).catch(err => console.log(err))
    
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>FreelanceVN</Text>
          </View>
          <KeyboardAvoidingView style={{ width: "100%", flex: 1 }}>
            <View style={styles.input}>
              <IconAntDesign name="user" size={16} color="black" />
              <TextInput
                style={{ fontSize: 16, flex: 1, marginLeft: 5}}
                placeholder="username or email"
                value={username}
                onChangeText={handUserName}
              />
            </View>
            <View style={styles.input}>
              <IconAntDesign name="key" size={16} color="black" />
              <TextInput
                style={{ fontSize: 16, flex: 1, marginLeft: 5}}
                placeholder="password"
                secureTextEntry={true}
                value={password}
                onChangeText={handPassword}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handPressLogin}>
              <Text style={{ fontSize: 20, color: "white" }}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {flexDirection:"row", backgroundColor:"green"}]}>
              <Image
                source={require("../../assets/google.png")}
                style={{ width: 20, height: 20, padding:10}}
              />
              <Text style={{ fontSize: 20, color: "white" }}>
                Đăng nhập với Google
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  text: {
    fontSize: 35,
    color: "#0866FF",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: 40,
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    marginTop: 20,
  },
  button: {
    backgroundColor: "#0866FF",
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
  },
});
export default LoginScreen;
