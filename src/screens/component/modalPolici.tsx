import React from "react";
import {
  Modal,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";

const ModalPolicy = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Điều khoản hợp đồng</Text>
          <ScrollView style={styles.scrollView}>
            <Text style={styles.policyText}>
              1. Điều khoản chung{"\n"}
              Hợp đồng chỉ được tạo thành công khi bên A (Client) chấp nhận hợp
              đồng, tiền công dự án được chuyển vào ví của bên thứ ba giữ trước
              (địa chỉ ví của smart contract). Hợp đồng sau khi được bên A
              (Client) ký sẽ gửi đến cho bên B (Freelancer), bên B ký và xác
              nhận thì hợp đồng mới có hiệu lực.
              {"\n"} Trường hợp nếu bên B hủy không ký hợp đồng bên A đã gửi thì
              hợp đồng sẽ không có hiệu lực.
              {"\n"}Nếu như hợp đồng bị bên A hoặc bên B hủy trong quá trình làm
              việc thì tiền sẽ được trả cho bên còn lại.
              {"\n"}Chúng tôi còn xét theo các báo cáo, nếu như ai đó có những
              hành vi sai phạm sẽ bị xem xét theo mức, lúc đó chúng tôi sẽ phải
              khóa tài khoản đó, nếu như bạn đang làm trong một công việc nào đó
              nhưng vì mức độ sai phạm quá lớn, hệ thống sẽ buộc bạn đơn phương
              hủy hợp đồng đang làm. Lúc đó tiền sẽ được hoàn trả cho bên còn
              lại.
              {"\n"}Người dùng khi giao dịch hợp đồng trên hệ thống của chúng
              tôi chỉ được thông qua một tài khoản ví, tài khoản này chính là
              key để chúng tôi quản lý các giao dịch.
            </Text>
            <Text style={styles.policyText}>
              2. Điều khoản của bên cho thuê (Bên A - Client){"\n"}
              {"\n"} Đọc kỹ các điều khoản chung và cân nhắc kỹ trước khi ký vào
              hợp đồng.
              {"\n"}Quá trình tạo hợp đồng chỉ được chấp nhận khi có khai báo
              đầy đủ thông tin.
              {"\n"}Tiền trong tài khoản ví phải lớn hơn tiền công của công việc
              cần thuê.
              {"\n"}Tiền sẽ được chuyển vào tài khoản hợp đồng trung gian trước
              khi hợp đồng được ký dù cho công việc chưa được làm xong, vì chúng
              tôi đã có chính sách hoàn tiền nếu như Freelancer không chấp nhận
              hoặc hủy hợp đồng khi đang trong quá trình làm việc.
              {"\n"}Phải tương tác với Freelancer xác nhận các task Freelancer
              tạo để cập nhật tình hình công việc cũng như thời điểm báo cáo
              công việc hoàn thành, và xác nhận hợp đồng thành công
            </Text>
            <Text style={styles.policyText}>
              3. Điều khoản của bên thuê (Bên B - Freelancer){"\n"}
              {"\n"}Bạn có thể xác định rõ thời gian cụ thể mà Freelancer phải
              hoàn thành công việc. Điều này có thể bao gồm cả các hạn chót cho
              các pha công việc cụ thể, nếu có .{"\n"}Bảo mật thông tin:
              Freelancer phải cam kết bảo mật thông tin của Client và không tiết
              lộ cho bất kỳ bên thứ ba nào.
              {"\n"}Chất lượng công việc: Freelancer phải đảm bảo rằng công việc
              được thực hiện đạt chất lượng như đã thỏa thuận trong hợp đồng.
              {"\n"}Tiền sẽ được chuyển đầy đủ cho Freelancer sau khi Client xác
              nhận công việc thành công và hoàn thành hợp đồng.
              {"\n"}Nếu như trong quá trình làm việc, Freelancer sai vi phạm hợp
              đồng công việc thì sẽ bị báo cáo, dựa trên mức độ vi phạm, phía
              admin sẽ trực tiếp xử lý và buộc dừng các công việc đang làm, bằng
              cách Freelancer phải tự bấm nút hủy hợp đồng nếu như đang trong
              hợp đồng nào đó.
            </Text>
          </ScrollView>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  scrollView: {
    maxHeight: 200,
  },
  policyText: {
    textAlign: "justify",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ModalPolicy;
