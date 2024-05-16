import React, { useState } from "react";
import {
  View,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  Text,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { PickerItem } from "react-native-woodpicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { CreateJobTaskRequest } from "../../apis/type.task.api";
const AddTaskModal = ({ visible, onClose, onAddTask }) => {
  const [task, setTask] = useState<CreateJobTaskRequest>({
    name: "",
    desc: "",
    priority: "1",
    deadline: new Date().toISOString().split("T")[0],
  });
  const [date, setDate] = useState(new Date());
  const [pickedData, setPickedData] = useState<PickerItem>({
    label: "Quan trọng",
    value: "1",
  });
  const data: PickerItem[] = [
    { label: "Quan trọng", value: "1" },
    { label: "Trung bình", value: "2" },
    { label: "Thấp", value: "3" },
  ];
  const handleAddTask = () => {
    task.priority = pickedData?.value;
    onAddTask(task);
    setTask({
      name: "",
      desc: "",
      priority: "1",
      deadline: new Date().toISOString().split("T")[0],
    });
    onClose();
  };
  const adjustDateToTimezone = (date) => {
    const offset = new Date().getTimezoneOffset(); // Get the timezone offset in minutes
    const adjustedDate = new Date(date);

    if (Platform.OS === "ios") {
      adjustedDate.setMinutes(adjustedDate.getMinutes() - offset); // Adjust for iOS
    } else {
      adjustedDate.setMinutes(adjustedDate.getMinutes() + offset); // Adjust for Android
    }

    return adjustedDate;
  };
  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      const adjustedDate = adjustDateToTimezone(selectedDate); // Adjust the selected date
      const deadline = adjustedDate.toISOString().split("T")[0];
      setTask({ ...task, deadline: deadline });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Nhập tên công việc"
            value={task.name}
            multiline={true}
            onChangeText={(text) => setTask({ ...task, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả công việc"
            value={task.desc}
            multiline={true}
            onChangeText={(text) => setTask({ ...task, desc: text })}
          />
          {/* priority */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text>Độ ưu tiên: </Text>
            <Dropdown
              style={styles.dropdown}
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={pickedData}
              onChange={(item) => {
                setPickedData(item);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
            }}
          >
            <Text>Deadline:</Text>
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          </View>
          <View style={styles.buttonsContainer}>
            <Button title="Hủy" onPress={onClose} />
            <Button title="Thêm" onPress={handleAddTask} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
    width: "80%",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dropdown: {
    borderColor: "black",
    borderWidth: 1,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
  },
});

export default AddTaskModal;
