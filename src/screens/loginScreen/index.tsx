import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loginAuth } from "../../apis/auth.api";
import { TextInput } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../utils/context";
import ModalLoading from "../component/modalLoading";
const LoginScreen = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const { infoLogin, login } = useContext(AuthContext);
  // button login
  const loginMutation = useMutation({
    mutationFn: () => loginAuth(username, password),
    onSuccess: (data) => {
      console.log("Login success:", data.data.data.access_token);
      const infoLogin = data.data.data;
      login(infoLogin);
      queryClient.setDefaultOptions({
        queries: {
          staleTime: infoLogin.expires_in,
        },
      });
      queryClient.setQueryData(["infoLogin"], infoLogin);
      if (infoLogin.user_type === "client") {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeClient" }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeFreelancer" }],
        });
      }
    },
    onError: (error) => {
      Alert.alert("Đăng nhập thất bại", error["response"].data.message);
    },
  });
  const handPressLogin = async () => {
    loginMutation.mutate();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Text style={styles.text}>FreelanceVN</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="username or email"
          value={username}
          onChangeText={(text) => setUserName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="password"
          value={password}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={{ textAlign: "right", marginRight: 20 }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handPressLogin}>
          <Text style={{ fontSize: 20, color: "white" }}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            { flexDirection: "row", backgroundColor: "green" },
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
        {/* <ModalLoading visible={loginMutation.isPending} /> */}
        <Modal visible={loginMutation.isPending} animationType="slide" transparent={true}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignContent: "center",
              backgroundColor: "rgba(0,0,0,0.3)",
            }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 35,
    color: "#0866FF",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "black",
    borderWidth: 1,
    margin: 15,
  },
  button: {
    backgroundColor: "#0866FF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
});
export default LoginScreen;
