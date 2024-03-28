import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HireScreen from "../screens/clientsScreen/hireScreen";
import DetailJob from "../screens/clientsScreen/detailJob";
import InviteScreen from "../screens/clientsScreen/inviteScreen";
import HeaderDetailJob from "../screens/clientsScreen/detailJob/header";
import React from "react";
import ContractProgessScreen from "../screens/freelancerScreen/contractScreen/contractProgessScreen";
import ContractSignScreen from "../screens/freelancerScreen/contractScreen/contractSignScreen";
import ContractCompleteScreen from "../screens/freelancerScreen/contractScreen/contractCompleteScreen";

const TabContractFreelancer = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator initialRouteName="">
      <Tab.Screen
        name="Progress"
        component={ContractProgessScreen}
        options={{
          tabBarLabel: "Thực hiện",
        }}
      />
      <Tab.Screen
        name="Sign"
        component={ContractSignScreen}
        options={{
          tabBarLabel: "Chờ ký",
        }}
      />

      <Tab.Screen
        name="complete"
        component={ContractCompleteScreen}
        options={{
          tabBarLabel: "Hoàn thành",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabContractFreelancer;
