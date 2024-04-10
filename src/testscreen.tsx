import { useState } from "react";
import { Button, Image, View, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import * as DocumentPicker from "expo-document-picker";
import { useQuery } from "@tanstack/react-query";
import { jobAplliedAPI } from "./apis/job.apiF";
export default function TestScreen() {

  // const jobApplied = useQuery({
  //   queryKey: ["jobApplied", 1],
  //   queryFn: async () =>
  //     jobAplliedAPI(token,1).then((res) => {
  //       console.log(res.data.data);
  //       return res.data.data;
  //     }).catch((err) => console.log(err)),
  // });
  // if(jobApplied.isLoading){
  //   return <Text>Loading...</Text>
  // }else{
  //   console.log(jobApplied.data);
  // }
  const [document, setDocument] = useState(null);
  const pickDocument = async () => {
    try {
      let result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: false,
      });
      console.log(result);
      if (!result.canceled) {
        try {
          const base64 = await FileSystem.readAsStringAsync(
            result.assets[0].uri,
            {
              encoding: FileSystem.EncodingType.Base64,
            }
          );

          // Call API function to send base64 image
          const nameFile = `file_${new Date().getTime()}`;
        } catch (error) {
          console.error("Error converting image to base64:", error);
        }
      }
    } catch (error) {}
  };
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setImage({
        base64: result.assets[0].base64,
        width: result.assets[0].width,
        height: result.assets[0].height,
      });
    }
    console.log(image.base64);
  };
  const skills = [{ name: "React Native", id: 1 }, { name: "NodeJS", id: 2}];
  const handFormData = async () => {
    const formData = new FormData();
    formData.append("skill", JSON.stringify(skills));
    formData.append("title", "abc");
    console.log(formData);
  };
  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: `data:image/jpeg;base64,${image.base64}` }} />
      )}
      <Button
        title="Pick document image from camera roll"
        onPress={pickDocument}
      />
      <Button title="Form data" onPress={handFormData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
  },
});
