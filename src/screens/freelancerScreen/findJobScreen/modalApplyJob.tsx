import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useContext } from "react";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { Button, TextInput } from "react-native-paper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { applyJobApi } from "../../../apis/job.apiF";
import { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { AuthContext } from "../../../utils/context";
const ModalApplyJob = ({ setModalVisible, job }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [coverLetter, setcoverLetter] = useState("");
  const [document, setDocument] = useState(null);
  const queryClient = useQueryClient();
  const { infoLogin, login, logout } = useContext(AuthContext);
  const token = infoLogin["access_token"];
  // pick document
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      if (!result.canceled) {
        setDocument({
          name: result.assets[0].name,
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
        });
      }
    } catch (error) {}
  };

  const handApply = async () => {
    setIsLoading(true);
    // applyJob.mutate();
    const rs = await applyJobApi(
      job["id"],
      0,
      coverLetter,
      document,
      token
    ).then((res) => {
      setIsLoading(false);
      alert("Ứng tuyển thành công");
      setModalVisible(false);
    }).catch((error) => {
      setIsLoading(false);
      Alert.alert("Lỗi", error["response"].data.message);
    });
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={[styles.title, { fontSize: 30, textAlign: "center" }]}>
            Ứng tuyển công việc
          </Text>
          <IconAntDesign
            name="closecircle"
            size={30}
            color="black"
            style={{ position: "absolute", top: 10, right: 10 }}
            onPress={() => setModalVisible(false)}
          />
        </View>
        <Text style={{ fontSize: 20 }}>{job["title"]}</Text>
        <Text style={styles.text}>Giới thiệu về bản thân</Text>
        <TextInput
          multiline
          label="Giới thiệu"
          mode="outlined"
          style={styles.textInput}
          value={coverLetter}
          onChangeText={(text) => setcoverLetter(text)}
        />
        <TouchableOpacity onPress={pickDocument}>
          <Text style={[styles.text, { fontStyle: "italic", color: "blue" }]}>
            Chọn file CV
          </Text>
        </TouchableOpacity>
        {document && (
          <Text style={[styles.text, { color: "green" }]}>{document.name}</Text>
        )}
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity onPress={handApply}>
            <Button
              mode="contained"
              style={[styles.button, { backgroundColor: "green" }]}
            >
              Ứng tuyển
            </Button>
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: "red" }]}
          >
            Hủy
          </Button>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    marginTop: "10%",
  },
  button: {
    marginVertical: 10,
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
  },
  textInput: {
    backgroundColor: "white",
    marginVertical: 10,
  },
});
export default ModalApplyJob;
