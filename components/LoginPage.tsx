import React, { useEffect } from "react";
import { FC, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  ScrollView,
} from "react-native"
import AuthModel, { User } from "../model/AuthModel";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { AntDesign } from "@expo/vector-icons";

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [password, onText2Change] = useState<string>("");
  const [username, onText1Change] = useState<string>("");
  //Stay Log In
  useEffect(() => {
    AsyncStorage.getItem("refreshToken").then(async (token) => {
      if (token) {
        navigation.replace("UserDetailsPage");
      }
    });
  }, [navigation]);

  const pressHandlerLogin = async () => {
    if (username === "" || password === "") {
      console.log("login failed");
      Alert.alert(" Login Failed ", "please try again");
      return;
    }
    try {
      const user: User = {
        email: username,
        password: password,
      };

      const data = (await AuthModel.login(user)) || {};
      if (!data) {
        console.log("login failed");
        Alert.alert(" Login Failed ", "please try again");
        return;
      }
      console.log("login successful");
      await AsyncStorage.setItem("accessToken", data?.[0]);
      await AsyncStorage.setItem("id", data?.[1]);
      await AsyncStorage.setItem("refreshToken", data?.[2]);
      navigation.replace("UserDetailsPage");
    } catch (error) {
      console.log("login failed");
    }
  };

  const pressHandlerSignUp = () => {
    navigation.navigate("SignupPage");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <TextInput
          style={styles.input}
          onChangeText={onText1Change}
          placeholder="Email"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={onText2Change}
          placeholder="Password"
          secureTextEntry={true}
          value={password}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity  style={styles.buttonText} onPress={pressHandlerLogin}>
            <AntDesign name="login" size={30} color="#161a1d" />
            <Text>LogIn</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.buttonText} onPress={pressHandlerSignUp}>
            <FontAwesome name="user-plus" size={30} color="#161a1d" />
            <Text>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>or</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    marginVertical:150
  },
  input: {
    height: 45,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "#d3d3d3",
    backgroundColor:"#f8f9fa"
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  button: {
    backgroundColor: "#161a1d",
    padding: 3,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    padding: 10,
    color:"white"
  },
  text: {
    alignSelf: "center",
  },
});

export default LoginPage;
