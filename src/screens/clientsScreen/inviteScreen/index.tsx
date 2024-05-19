import { View, Text, ScrollView } from "react-native";
import Invite from "./invite";
import { useRoute } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";

const InviteScreen = () => {
    const route = useRoute();
    const id = route.params["id"];
    const queryClient = useQueryClient();
    const job = queryClient.getQueryData(["job", id]) as any;
    const list_invite = [...(job?.list_invite as any)] || [];
    return (
        <>
      {list_invite?.length > 0 ? (
        <ScrollView>
          {list_invite?.map((item) => (
            <Invite key={item.client_id} item={item} />
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
export default InviteScreen;