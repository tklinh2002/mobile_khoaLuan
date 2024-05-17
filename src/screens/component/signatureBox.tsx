import React, { useEffect, useState } from "react";
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
interface IPath {
  segments: String[];
  color?: string;
}
export default function SignatureBox({ setmodalvisiable, setSignature }) {
  const queryClient = useQueryClient();
  const [paths, setPaths] = useState<IPath[]>([]);
  const ref = useCanvasRef();
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
        // const formData = new FormData();
        // formData.append("sign", blob);
        const res = await getImage(blob.uri, blob.type, blob.name).then((res) => {
          console.log(res.data);
          setSignature(res.data);
          setmodalvisiable(false);
          return res.data;
        });
        const data = await res.data;
        // const response = await fetch(
        //   "https://timviecits.id.vn/api/v1/upload-file",
        //   {
        //     method: "POST",
        //     body: formData,
        //     headers: {
        //       "Content-Type": "multipart/form-data",
        //     },

        //   }
        // );
        // const text = await response.text();
        // console.log(text);
      } catch (error) {
        console.log(error);
      }
    }
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
                  onPress={saveSignature}
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
  
});
