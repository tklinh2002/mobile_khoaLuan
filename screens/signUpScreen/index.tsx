import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import DatePicker from "react-native-date-picker";
import { TextInput } from "react-native-paper";
const SignUpScreen = ({ navigation }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [introduce, setIntroduce] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date()); // Initial date
  const typeUser = "client";
  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <View style={{ paddingTop: 40, justifyContent: "center", marginLeft:10 }}>
            <IconAntDesign
              name="left"
              size={25}
              color="#0866FF"
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>FreelanceVN</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 25, fontWeight: "bold", marginTop: 20 }}>
              Nhập thông tin tài khoản
            </Text>
          </View>

          {/* input info */}
          <View style={{ marginVertical: 20 }}>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              mode="outlined"
              label="Email"
              value={username}
              onChangeText={(email) => setEmail(email)}
            />
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
              }}
            >
              <TextInput
                style={[styles.input, { width: "50%" }]}
                mode="outlined"
                label="Họ và tên đệm"
                value={lastName}
                onChangeText={(lastName) => setLastName(lastName)}
              />
              <TextInput
                style={[styles.input, { width: "30%" }]}
                mode="outlined"
                label="Tên"
                value={firstName}
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Username"
              value={username}
              onChangeText={(username) => setUserName(username)}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(password) => setPassword(password)}
            />
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              label="Số điện thoại"
              value={phone}
              onChangeText={(phone) => setPhone(phone)}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Địa chỉ"
              value={address}
              onChangeText={(address) => setAddress(address)}
            />
            {typeUser === "client" ? (
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Công ty"
                value={company}
                onChangeText={(company) => setCompany(company)}
              />
            ) : null}
          </View>

          {/* button dang ky */}
          <TouchableOpacity
            style={[
              styles.button,
              { flexDirection: "row", backgroundColor: "green" },
            ]}
            onPress={() => {
              navigation.navigate("ConfirmOtp");
            }}
          >
            <Text style={{ fontSize: 20, color: "white" }}>
              Đăng ký tài khoản
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 16 }}>
              Bằng việc đăng ký, bạn đã đồng ý với
            </Text>
            <Text style={{ fontSize: 16 }}>
              Điều khoản dịch vụ và Chính sách bảo mật
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 16, marginTop: 20, marginLeft: 20 }}>
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginHorizontal: 20,
    marginVertical: 5,
  },
  button: {
    backgroundColor: "#0866FF",
    borderRadius: 30,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    marginHorizontal: 20,
  },
});
export default SignUpScreen;
