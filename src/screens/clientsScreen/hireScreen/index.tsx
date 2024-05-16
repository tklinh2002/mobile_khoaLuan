import { View, Text, ScrollView } from "react-native";
import Candidate from "./candidate";
import { useQueryClient } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";

const HireScreen = ({ navigation }) => {
  const route = useRoute();
  const id = route.params["id"];
  const queryClient = useQueryClient();
  const job = queryClient.getQueryData(["job", id]);
  const applied = (job["applied"] as any) || [];
  return (
    <>
      {job["applied_count"] > 0 ? (
        <ScrollView>
          {applied?.map((candidate) => (
            <Candidate key={candidate.id} navigation={navigation} candidate={candidate} />
          ))}
        </ScrollView>
      ) : (
        <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
            <Text style={{fontSize:20}}>Không có ứng viên nào</Text>
        </View>
      )}
    </>
  );
};
export default HireScreen;
