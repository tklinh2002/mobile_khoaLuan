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
  Alert,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useEffect, useState } from "react";
import { TextInput } from "react-native-paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { registerAuth } from "../../apis/auth.api";
import { User } from "../../types/user";
import ModalLoading from "../component/modalLoading";
const SignUpScreen = ({ navigation }) => {
  const queryClient = useQueryClient();
  const user_register: User = queryClient.getQueryData(["user_register"]);
  const typeUser = user_register["typeUser"];
  const [data, setData] = useState<User>(user_register);

  const register = useMutation({
    mutationFn: (_) => registerAuth(data),
    onSuccess: (data) => {
      Alert.alert(
        "Đăng ký thành công",
        "Vui lòng kiểm tra email để xác nhận tài khoản",
        [
          {
            text: "OK",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "Start" }],
              }),
          },
        ]
      );
    },
    onError: (error) => {
      Alert.alert("Đăng ký thất bại", error["response"].data.message);
    },
    
  });
  const handPressRegister = () => {
    register.mutate();
  };

  return (
    <KeyboardAvoidingView>
      <ScrollView>
        <View>
          <View
            style={{ paddingTop: 40, justifyContent: "center", marginLeft: 10 }}
          >
            <IconAntDesign
              name="left"
              size={25}
              color="#0866FF"
              onPress={() => navigation.goBack()}
            />
          </View>

          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>ITWork</Text>
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
              value={data.email}
              onChangeText={(email) => setData({ ...data, email })}
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
                value={data.lastName}
                onChangeText={(lastName) => setData({ ...data, lastName })}
              />
              <TextInput
                style={[styles.input, { width: "30%" }]}
                mode="outlined"
                label="Tên"
                value={data.firstName}
                onChangeText={(firstName) => setData({ ...data, firstName })}
              />
            </View>
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Username"
              value={data.userName}
              onChangeText={(userName) => setData({ ...data, userName })}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Password"
              secureTextEntry={true}
              value={data.password}
              onChangeText={(password) => setData({ ...data, password })}
            />
            {/* <TextInput
              keyboardType="numeric"
              style={styles.input}
              mode="outlined"
              label="Số điện thoại"
              value={data.phoneNum}
              onChangeText={(phoneNum) => setData({ ...data, phoneNum })}
            />
            <TextInput
              style={styles.input}
              mode="outlined"
              label="Địa chỉ"
              value={data.address}
              onChangeText={(address) => setData({ ...data, address })}
            />
            {typeUser === "client" ? (
              <TextInput
                style={styles.input}
                mode="outlined"
                label="Công ty"
                value={data.company}
                onChangeText={(company) => setData({ ...data, company })}
              />
            ) : null} */}
          </View>

          {/* button dang ky */}
          <TouchableOpacity
            style={[
              styles.button,
              { flexDirection: "row", backgroundColor: "green" },
            ]}
            onPress={handPressRegister}
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
      <ModalLoading visible={register.isPending} />
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
