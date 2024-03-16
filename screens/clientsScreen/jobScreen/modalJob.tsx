import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { useState } from "react";
import DatePicker from "react-native-woodpicker/dist/components/DatePicker";
import Skill from "./skill";
const ModalJob = ({ setModalVisible }) => {
  const handCloseModal = () => {
    setModalVisible(false);
  };
  const [pickedDate, setPickedDate] = useState<Date>();

  const handleText = (): string =>
    pickedDate
      ? pickedDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
      : new Date().toLocaleDateString("en-GB", {day: '2-digit', month: '2-digit', year: 'numeric'});

  return (
    <ScrollView style={{ marginBottom: 10 }}>
      <TouchableWithoutFeedback
        style={styles.container}
        onPress={Keyboard.dismiss}
      >
        <View style={{ marginTop: "10%" }}>
          <View style={styles.header}>
            <IconAntDesign
              name="closecircle"
              size={24}
              color="gray"
              onPress={handCloseModal}
            />
            <Text
              style={{
                fontSize: 25,
                fontWeight: "bold",
                flex: 1,
                textAlign: "center",
              }}
            >
              Tạo job
            </Text>
          </View>

          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Tiêu đề</Text>
            <View style={styles.input}>
              <TextInput style={styles.textInput} placeholder="write title" />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Mô tả</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="write title"
                multiline
                numberOfLines={2}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Chi tiết</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="write title"
                multiline={true}
                numberOfLines={4}
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Lương</Text>
            <View style={styles.input}>
              <TextInput
                style={styles.textInput}
                placeholder="write title"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Thời hạn</Text>
            <View style={styles.input}>
              <DatePicker
                value={pickedDate}
                onDateChange={setPickedDate}
                title="Date Picker"
                text={handleText()}
                isNullable={false}
                iosDisplay="inline"
              />
            </View>
          </View>
          <View>
            <Text style={styles.titleInput}>Tìm kỹ năng</Text>
            <View style={styles.input}>
              <TextInput style={styles.textInput} placeholder="Skill" />
            </View>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.titleInput}>Chọn kỹ năng</Text>
            <View style={styles.containerSkill}>
              
                <Skill/>
              
            </View>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "red" }]}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "green" }]}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Tạo job</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#0866FF" }]}
            >
              <Text style={{ color: "white", fontSize: 20 }}>Đăng job</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    marginHorizontal: 8,
    justifyContent: "center",
    flex: 1,
    padding: 8,
  },
  
  button: {
    borderRadius: 10,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    width: 100,
    padding: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  titleInput: {
    fontSize: 20,
    fontWeight: "400",
    marginLeft: 8,
  },
  textInput: {
    fontSize: 16,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 16,
  },
  containerInput: {
    marginVertical: 16,
  },
  containerSkill: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 8,
  },
});
export default ModalJob;
