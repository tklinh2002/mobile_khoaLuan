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
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { decode } from "base64-arraybuffer";
import Profile from "../Profile";
import RenderHtml, { RenderHTML } from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import RenderHTMLWrapper from "./utils/RenderHTMLWrapper";

export default function TestScreen({ navigation }) {
  const { width: windowWidth } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>
        {
          <RenderHTML
            contentWidth={windowWidth}
            source={{ html: "<h1>Hello World</h1>" }}
          />
        }
      </Text>
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
