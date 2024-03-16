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
        
      />
      <Tab.Screen name="Hire" component={HireScreen} />
      
      <Tab.Screen name="Invite" component={InviteScreen} />
    </Tab.Navigator>
  );
};

export default TabDetailJob;
