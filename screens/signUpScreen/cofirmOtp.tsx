import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Button, Dialog, Icon, TextInput } from "react-native-paper";
import { useEffect } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
const ConfirmOtp = ({navigation}) => {
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(120);
  const [visible, setVisible] = useState(false);
  const status = "success";
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown > 0) {
          return prevCountdown - 1;
        } else {
          clearInterval(timer); // Dừng đếm ngược khi countdown = 0
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // Cleanup để tránh memory leak
  }, [countdown]);

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>OTP đã gửi trong mail</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          mode="outlined"
          label="Nhập mã OTP"
          value={otp}
          onChangeText={setOtp}
        />
        <View style={styles.containerfoot}>
          <Text style={[styles.text, { color: "red" }]}>{countdown}s</Text>
          <TouchableOpacity>
            <Text style={styles.text}>Gửi lại mã OTP</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <Button mode="contained" style={styles.button}>
            Xác nhận
          </Button>
        </TouchableOpacity>
      </View>
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <IconAntDesign
          name="checkcircle"
          size={50}
          color="green"
          style={{ alignSelf: "center", marginTop: 20 }}
        />
        <Dialog.Title>Đăng ký tài khoản thành công</Dialog.Title>
        <Dialog.Actions>
          {status === "success" ? (
            <Button onPress={() => {
                setVisible(false);
                navigation.navigate("Start", { screen: "Start", params: { resetStack: true } });
            }}>Quay về đăng nhập</Button>
          ) : (
            <Button onPress={() => setVisible(false)}>Nhập lại OTP</Button>
          )}
        </Dialog.Actions>
      </Dialog>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginVertical: 20,
    color: "#FA9E0F",
  },
  input: {
    marginHorizontal: 20,
    marginVertical: 10,
    textAlign: "justify",
    fontSize: 20,
  },
  containerfoot: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
  button: {
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    marginHorizontal: 20,
    fontSize: 20,
    backgroundColor: "#0866FF",
  },
});
export default ConfirmOtp;
