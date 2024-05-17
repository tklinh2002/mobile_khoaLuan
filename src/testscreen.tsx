import React, { useState } from "react";
import {
  Button,
  Text,
  View,
  StyleSheet,
  Modal,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
export default function TestScreen({ navigation }) {
  // const [modalVisibleProgess, setModalVisibleProgess] = useState(false);
  // const {sendOtp} = useOTP();
  // const token =
  //   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3RpbXZpZWNpdHMuaWQudm4vYXBpL3YxL2xvZ2luIiwiaWF0IjoxNzE1NDk0MTUzLCJleHAiOjM3NzE1NDk0MTUzLCJuYmYiOjE3MTU0OTQxNTMsImp0aSI6Indta1REVUhBNksxbHdmWVEiLCJzdWIiOiIxMCIsInBydiI6IjIyY2MzNDA0YjMyN2JiMDE3M2YxMTk1MDUyZWE2NjU3MmEyOTMxMWMiLCJ1c2VyX3R5cGUiOiJmcmVlbGFuY2VyIiwidXNlcl9pbmZvIjp7ImlkIjoxMCwidXNlcm5hbWUiOiJ0a2xpbmgzMTIwMDIiLCJlbWFpbCI6InRrbGluaDMxMjAwMkBnbWFpbC5jb20iLCJkYXRlX29mX2JpcnRoIjoiMjAwMi0wMi0xMSIsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyNC0wNC0wN1QxMzoxNDo1Mi4wMDAwMDBaIiwiZmlyc3RfbmFtZSI6IlRyYW4iLCJsYXN0X25hbWUiOiJMaW5oIiwicGhvbmVfbnVtIjoiMDk2MTYxMzA4OSIsImFkZHJlc3MiOiJCaW5oIER1b25nIiwicG9zaXRpb24iOm51bGwsInNleCI6IjAiLCJpbnRybyI6IkFiYyBsw6AgY8OhaSBnw6wgw6EsIGvhu7kgbsSDbmcgbmhlLCB0w7RpIGPDsyBuaGnhu4F1IGvhu7kgbsSDbmcgbOG6r20uIiwiYXZhdGFyX3VybCI6Imh0dHBzOi8vdGltdmllY2l0cy5pZC52bi9zdG9yYWdlL2NsaWVudC93Z2dieEsxbnY3cTNTWWtaWVJDeVF5VWZ2WWc5Q0lXZHZuZlhnbjZGLnBuZyIsInN0YXR1cyI6IjEiLCJjaXRpemVuX2lkZW50aWZpY2F0aW9uX3VybCI6bnVsbCwiY2l0aXplbl9pZGVudGlmaWNhdGlvbl9pZCI6bnVsbCwiaXNfY29tcGxldGVkX3Byb2ZpbGUiOiIwIiwiZ29vZ2xlX2lkIjpudWxsLCJjcmVhdGVkX2F0IjoiMjAyNC0wNC0wN1QxMzoxNDoxNC4wMDAwMDBaIiwidXBkYXRlZF9hdCI6IjIwMjQtMDQtMDlUMTU6MzI6MDUuMDAwMDAwWiJ9fQ.LkHdPhLp0mHptptdfQgjLF11FJ27D-nOI_nkdkKrjrA";
  // const handlePress = () => {
  //   sendOtp.mutate();
  //   // const res = http.httpform
  //   //   .post("https://timviecits.id.vn/api/v1/send-otp", null, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   })
  //   //   .then((res) => {
  //   //     Alert.alert("Thông báo", "Gửi mã OTP thành công");
  //   //     console.log(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   // const res = fetch("https://timviecits.id.vn/api/v1/send-otp", {
  //   //   method: "POST",
  //   //   headers: {
  //   //     Authorization: `Bearer ${token}`,
  //   //   },
  //   // })
  //   //   .then((res) => {
  //   //     Alert.alert("Thông báo", "Gửi mã OTP thành công");
  //   //     // console.log(res.data);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(err);
  //   //   });
  //   // const res = axios
  //   //   .post("https://timviecits.id.vn/api/v1/send-otp", null, {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   })
  //   //   .then((response) => {
  //   //     Alert.alert("Thông báo", "Gửi mã OTP thành công");
  //   //     // console.log(response.data);
  //   //   })
  //   //   .catch((error) => {
  //   //     console.log(error);
  //   //   });
  // };
  const [selectedImage, setSelectedImage] = useState(null);
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // Yêu cầu quyền truy cập vào thư viện ảnh
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert(
        "Xin lỗi, chúng tôi cần quyền truy cập vào thư viện ảnh của bạn để chọn hình."
      );
      return;
    }

    // Mở trình chọn ảnh
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].base64);
      setImage(result.assets[0]);
    }
  };
  const handlefetch = async () => {
    try {
      const blob = {
        uri: image.uri,
        type: image.mimeType,
        name: image.fileName,
      } as any;
      console.log(blob);
      const formData = new FormData();
      formData.append("sign", blob);
      const response = await fetch(
        "https://timviecits.id.vn/api/v1/upload-file",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const text = await response.text();
      console.log(text);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <View style={styles.container}>
    //   {/* <Modal animationType="slide" visible={true}>
    //   <ModalReportProgess setmodalvisiable={setModalVisibleProgess} typeUser={'client'}  navigation={navigation}/>
    //   </Modal> */}

    //   {/* <Profile /> */}
    //   {/* <Button title="Press me" onPress={handlePress} /> */}
    // </View>
    <View style={styles.container}>
      {selectedImage ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
          style={styles.image}
        />
      ) : (
        // <Image source={{ uri: selectedImage }} style={styles.image} />
        <Text style={styles.text}>Chưa có hình ảnh nào được chọn.</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Chọn hình</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handlefetch}>
        <Text style={styles.buttonText}>fetch</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "60%",
    resizeMode: "contain",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
