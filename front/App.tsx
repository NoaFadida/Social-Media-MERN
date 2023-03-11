import { FC } from "react";
import { StyleSheet } from "react-native";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import UserDetailsPage from "./components/UserDetailsPage";
import EditPost from "./components/EditPost";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conversation from "./components/Conversation/Conversation";
import React from "react";

const Stack = createNativeStackNavigator();

const App: FC = () => {
  const clickHandler = () => {
    alert("Clicked");
  };
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ title: "Apply to all" }}>
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{ title: "Login" }}
        ></Stack.Screen>
        <Stack.Screen
          name="SignupPage"
          component={SignupPage}
          options={{ title: "Signup" }}
        ></Stack.Screen>
        <Stack.Screen
          name="UserDetailsPage"
          component={UserDetailsPage}
          options={{ headerShown: false }}
        ></Stack.Screen>
        <Stack.Screen
          name="EditPost"
          component={EditPost}
          options={{ title: "Edit your Post" }}
        ></Stack.Screen>
        <Stack.Screen
          name="Conversation"
          component={Conversation}
          options={({ route }) => ({
            title: route.params?.user.name,
          })}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textStyle: {
    color: "green",
    fontWeight: "bold",
    fontSize: 50,
  },
});

export default App;
