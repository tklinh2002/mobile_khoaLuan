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
  ScrollView,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
const SignUpScreen = ({ navigation }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handUserName = (username) => {
    setUserName(username);
  };
  const handPassword = (password) => {
    setPassword(password);
  };
  const handLastName = (lastName) => {
    setLastName(lastName);
  };
  const handFirstName = (firstName) => {
    setFirstName(firstName);
  };
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ width: "95%", height: "12%", justifyContent: "center" }}>
          <IconAntDesign
            name="left"
            size={25}
            color="#0866FF"
            onPress={() => navigation.goBack()}
          />
        </View>
        <ScrollView style={{ flex: 1, width: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>FreelanceVN</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
              Đăng ký tài khoản
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { flexDirection: "row", backgroundColor: "#0866FF" },
            ]}
          >
            <Image
              source={require("../../assets/google.png")}
              style={{ width: 20, height: 20, padding: 10 }}
            />
            <Text style={{ fontSize: 20, color: "white" }}>
              Đăng nhập với Google
            </Text>
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.input, { width: "50%" }]}>
              <TextInput
                style={{ fontSize: 16, flex: 1, marginLeft: 5 }}
                placeholder="họ và tên đệm"
                value={lastName}
                onChangeText={handLastName}
              />
            </View>
            <View style={[styles.input, { width: "30%" }]}>
              <TextInput
                style={{ fontSize: 16, flex: 1, marginLeft: 5 }}
                placeholder="tên"
                value={firstName}
                onChangeText={handFirstName}
              />
            </View>
          </View>

          <View style={styles.input}>
            <IconAntDesign name="user" size={16} color="black" />
            <TextInput
              style={{ fontSize: 16, flex: 1, marginLeft: 5 }}
              placeholder="email"
              value={username}
              onChangeText={handUserName}
            />
          </View>
          <View style={styles.input}>
            <IconAntDesign name="key" size={16} color="black" />
            <TextInput
              style={{ fontSize: 16, flex: 1, marginLeft: 5 }}
              placeholder="password"
              secureTextEntry={true}
              value={password}
              onChangeText={handPassword}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.button,
              { flexDirection: "row", backgroundColor: "green" },
            ]}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              Đăng ký tài khoản
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 20}}>
            <Text style={{ fontSize: 16 }}>
              Bằng việc đăng ký, bạn đã đồng ý với
            </Text>
            <Text style={{ fontSize: 16 }}>
              Điều khoản dịch vụ và Chính sách bảo mật
            </Text>
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text style={{ fontSize: 16, marginTop: 20, marginLeft: 20 }}>
              Bạn đã có tài khoản?
              </Text>
              <TouchableOpacity onPress={()=>{ navigation.navigate("Login");}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: "green",
                    fontWeight: "bold",
                  }}
                >
                  Đăng nhập
              </Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
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
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "#0866FF",
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    marginHorizontal: 20,
  },
});
export default SignUpScreen;
