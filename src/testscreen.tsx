import { useQuery, useQueryClient } from "@tanstack/react-query";
import { View } from "react-native";
import { Text } from "react-native";
import { getListPostApi } from "./apis/job.api";
const TestScreen = () => {
  const queryClient = useQueryClient();
  
  const listPost = useQuery({
    queryKey: ["listpost"],
    queryFn: async (_) => getListPostApi(1,10,1).then((res) => res.data),
  })
  
console.log(listPost.data.data)
  return (
    <View>
      <Text>{listPost.isLoading}</Text>
    </View>
  );
};
export default TestScreen;
