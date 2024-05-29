import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Touchable,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path, Skia, useCanvasRef } from "@shopify/react-native-skia";
import { Button, TextInput } from "react-native-paper";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useOTP } from "../../hook/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import * as FileSystem from "expo-file-system";
import { getImage } from "../../apis/auth.api";
import { AuthContext } from "../../utils/context";
import ModalLoading from "./modalLoading";
import { formatTime } from "../../utils/format";
interface IPath {
  segments: String[];
  color?: string;
}
export default function SignatureBox({ setmodalvisiable, setSignature }) {
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  const [modalOtp, setModalOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const TIME_OUT = 180; //second
  const [countdown, setCountdown] = useState(TIME_OUT); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const { sendOtp, verifyOtp } = useOTP();
  const [paths, setPaths] = useState<IPath[]>([]);
  const ref = useCanvasRef();
  const [signatureTemp, setSignatureTemp] = useState("");

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setCountdown((countdown) => {
          if (countdown > 0) {
            return countdown - 1;
          } else {
            setIsTimerRunning(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "black",
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
    })
    .onTouchesUp((g) => {
      const newPaths = [...paths];
      setPaths(newPaths);
    })
    .minDistance(1);

  const clearCanvas = () => {
    setPaths([]);
  };
  const saveSignature = async () => {
    const image = ref.current?.makeImageSnapshot();
    if (paths.length === 0) return alert("Vui lòng ký tên");
    if (image) {
      try {
        const fileUri = `${FileSystem.documentDirectory}signature.png`;
        await FileSystem.writeAsStringAsync(fileUri, image.encodeToBase64(), {
          encoding: FileSystem.EncodingType.Base64,
        });

        const blob = {
          uri: fileUri,
          type: "image/png",
          name: "signature.png",
        } as any;
        await getImage(token, blob.uri, blob.type, blob.name).then((res) => {
          console.log(res.data);
          setSignatureTemp(res.data);
          handleSendOtp();
          return res.data;
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const resendOTP = () => {
    sendOtp
      .mutateAsync()
      .then((res) => {
        setCountdown(TIME_OUT);
        setIsTimerRunning(true);
      })
      .catch((err) => {
        Alert.alert("Gửi mã OTP thất bại");
      });
  };
  const handleSendOtp = async () => {
    const res = await sendOtp
      .mutateAsync()
      .then((res) => {
        console.log("send otp success");
        setModalOtp(true);
        setCountdown(TIME_OUT);
        setIsTimerRunning(true);
      })
      .catch((err) => {
        Alert.alert("Gửi mã OTP thất bại");
        console.log(err);
      });
  };
  const handleVerifyOtp = async () => {
    verifyOtp
      .mutateAsync(otp)
      .then((res) => {
        setSignature(signatureTemp);
        setModalOtp(false);
        setmodalvisiable(false);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Xác nhận OTP thất bại");
      });
  };
  const saveSignatureWithOTP = async () => {
    saveSignature();
  };
  return (
    <>
      {/* // This is the main view of the app */}
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ margin: 10 }}>
          <IconAntDesign
            name="close"
            size={30}
            color="black"
            onPress={() => setmodalvisiable(false)}
          />
          <Text style={{ fontSize: 30, textAlign: "center" }}> Ký tên</Text>
        </View>
        <View style={{ flex: 1 }}>
          {/* this is paint of app */}
          <GestureDetector gesture={pan}>
            <Canvas style={{ flex: 8 }} ref={ref}>
              {paths.map((p, index) => (
                <Path
                  key={index}
                  path={p.segments.join(" ")}
                  strokeWidth={5}
                  style="stroke"
                  color={p.color}
                />
              ))}
            </Canvas>
          </GestureDetector>

          <View
            style={{
              flex: 1,
              backgroundColor: "#edede9",
              margin: 5,
              borderRadius: 20,
              padding: 10,
            }}
          >
            <View style={styles.swatchContainer}>
              <View>
                <Button
                  style={{ backgroundColor: "green" }}
                  mode="contained"
                  onPress={saveSignatureWithOTP}
                >
                  Lưu
                </Button>
              </View>
              <Button
                style={{ backgroundColor: "red" }}
                mode="contained"
                onPress={clearCanvas}
              >
                Xóa chữ ký
              </Button>
            </View>
          </View>
          {/* modal otp */}
          <Modal visible={modalOtp} transparent={true}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={{ margin: 5, fontSize: 15 }}>
                  Vui lòng nhập mã OTP ở mail để xác nhận chữ ký
                </Text>
                <TextInput
                  mode="outlined"
                  keyboardType="number-pad"
                  maxLength={6}
                  label={"Nhập OTP"}
                  style={{ width: 200, textAlign: "center", margin: 10 }}
                  onChangeText={setOtp}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    width: 200,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 15,
                      color: isTimerRunning ? "black" : "red",
                    }}
                  >
                    {formatTime(countdown)}
                  </Text>
                  <TouchableOpacity onPress={resendOTP}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: "600",
                        color: "blue",
                        fontStyle: "italic",
                      }}
                    >
                      Gửi lại
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    style={{ backgroundColor: "green", marginRight: 10 }}
                    mode="contained"
                    onPress={handleVerifyOtp}
                  >
                    Xác nhận otp
                  </Button>
                  <Button
                    style={{ backgroundColor: "red", marginRight: 10 }}
                    mode="contained"
                    onPress={() => setModalOtp(false)}
                  >
                    Hủy
                  </Button>
                </View>
                <ModalLoading visible={verifyOtp.isPending} />
              </View>
            </View>
          </Modal>
          {/* modal loading */}
          <ModalLoading visible={sendOtp.isPending} />
        </View>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 40,
    textAlign: "center",
  },
  paletteColor: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 5,
    zIndex: 2,
  },
  swatch: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: "black",
    marginVertical: 5,
    zIndex: 1,
  },
  swatchContainer: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
});
