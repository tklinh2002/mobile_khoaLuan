import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HireScreen from "../screens/clientsScreen/hireScreen";
import DetailJob from "../screens/clientsScreen/detailJob";
import InviteScreen from "../screens/clientsScreen/inviteScreen";
import HeaderDetailJob from "../screens/clientsScreen/detailJob/header";
import React from "react";

const TabDetailJob = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator initialRouteName="DetailJob">
      <Tab.Screen
        name="DetailJob"
        component={DetailJob}
        options={{
          tabBarLabel: "Chi tiết",
        }}
      />
      <Tab.Screen
        name="Hire"
        component={HireScreen}
        options={{
          tabBarLabel: "Ứng viên",
        }}
      />

      <Tab.Screen
        name="Invite"
        component={InviteScreen}
        options={{
          tabBarLabel: "Danh sách mời",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabDetailJob;
