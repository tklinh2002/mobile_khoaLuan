import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Touchable,
    TouchableNativeFeedback,
    Keyboard,
    ScrollView,
    TextInput,
    TouchableWithoutFeedback,
  } from "react-native";
  
  import { useState } from "react";
  import IconAntDesign from "react-native-vector-icons/AntDesign";
  import Job from "../clientsScreen/contractScreen/job";
import { Checkbox } from "react-native-paper";
  
  const ModalReportProgess = ({ setmodalvisiable, typeUser }) => {
    return (
      <ScrollView>
        <TouchableNativeFeedback
          style={styles.container}
          onPress={Keyboard.dismiss}
        >
          <View style={styles.content}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={[
                  styles.text,
                  { flex: 1, textAlign: "center", paddingLeft: 30 },
                ]}
              >
                Báo cáo tiến độ
              </Text>
              <IconAntDesign
                name="close"
                size={30}
                color="black"
                onPress={() => setmodalvisiable(false)}
              />
            </View>
            <View style={styles.containerTask}>
              {/* danh sách task */}
              <View style={styles.task}>
                <Text>Task {1}:</Text>
                <Text style={styles.inputTask}>Tạo giao diện</Text>
                <View style={styles.containerCheckBox}>  
                <Checkbox status="checked" />
                </View>
              </View>
              <View style={styles.task}>
                <Text>Task {1}:</Text>
                <Text style={styles.inputTask}>Tạo giao diện</Text>
                <View style={styles.containerCheckBox}>  
                <Checkbox status="unchecked" />
                </View>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </ScrollView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    content: {
      marginTop: 40,
      marginHorizontal: 10,
      marginVertical: 10,
    },
    text: {
      fontSize: 30,
      marginHorizontal: 10,
      marginVertical: 5,
      alignSelf: "center",
      fontWeight: "bold",
    },
    button: {
      borderColor: "green",
      borderWidth: 1,
      borderRadius: 30,
      padding: 10,
    },
    containerTask: {
      marginHorizontal: 10,
      marginVertical: 10,
      flex: 1,
    },
    task: {
      marginVertical: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputTask: {
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 7,
      marginHorizontal: 10,
      marginVertical: 10,
      flex: 1,
      paddingVertical: 10,
      fontSize: 14,
      alignSelf: "center",
    },
    textInfo: {
      fontSize: 16,
      marginHorizontal: 10,
      marginVertical: 5,
    },
    info: {
      marginVertical: 10,
      borderColor: "black",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
    },
    containerButton: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginHorizontal: 10,
      marginVertical: 10,
    },
    containerCheckBox: {
        borderColor: "black",
        borderWidth: 1,
    }
  });
  export default ModalReportProgess;
  