import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HireScreen from "../screens/clientsScreen/hireScreen";
import DetailJob from "../screens/clientsScreen/detailJob";
import InviteScreen from "../screens/clientsScreen/inviteScreen";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJobApi } from "../apis/job.api";
import { View, Text } from "react-native";

const TabDetailJob = () => {
  const route = useRoute();
  const id = route.params["data"]["jobid"];
  const queryClient = useQueryClient();
  const infoLogin = queryClient.getQueryData(["infoLogin"]);
  const token = infoLogin["access_token"];
  const detailJob = useQuery({
    queryKey: ["job", id],
    queryFn: async () => {
      return await getJobApi(id, token).then((res) => {
        queryClient.setQueryData(["job", id], res.data.data.data);
        console.log(res.data.data);
        return res.data.data;
      });
    },
  });
  const Tab = createMaterialTopTabNavigator();
  if (detailJob.isLoading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  return (
    <Tab.Navigator initialRouteName="DetailJob">
      <Tab.Screen
        name="DetailJob"
        component={DetailJob}
        initialParams={{ id: id }}
        options={{
          tabBarLabel: "Chi tiết",
        }}
      />
      <Tab.Screen
        name="Hire"
        component={HireScreen}
        initialParams={{ id: id }}
        options={{
          tabBarLabel: "Ứng viên",
        }}
      />

      <Tab.Screen
        name="Invite"
        component={InviteScreen}
        initialParams={{ id: id }}
        options={{
          tabBarLabel: "Danh sách mời",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabDetailJob;
