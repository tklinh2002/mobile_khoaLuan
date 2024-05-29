import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HireScreen from "../screens/clientsScreen/hireScreen";
import DetailJob from "../screens/clientsScreen/detailJob";
import InviteScreen from "../screens/clientsScreen/inviteScreen";
import HeaderDetailJob from "../screens/clientsScreen/detailJob/header";
import React from "react";
import JobProgress from "../screens/freelancerScreen/jobScreen/jobProgressScreen";
import JobApply from "../screens/freelancerScreen/jobScreen/jobApplyScreen";
import JobInvite from "../screens/freelancerScreen/jobScreen/jobInviteScreen";

const TabJobFreelancer = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator initialRouteName="JobApply">
      <Tab.Screen
        name="JobApply"
        component={JobApply}
        options={{
          tabBarLabel: "Ứng tuyển",
        }}
      />
      <Tab.Screen
        name="JobInvite"
        component={JobInvite}
        options={{
          tabBarLabel: "Được mời",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabJobFreelancer;
