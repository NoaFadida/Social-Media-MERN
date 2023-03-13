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
  Image,
} from "react-native";
import AuthModel, { User } from "../model/AuthModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

//web: 616359255354-9548lr7mhkfdnl9hjdj0mgmk7csb2g3b.apps.googleusercontent.com
//IOS: 616359255354-p775225005q9eppnheomo9h3nb5v2gh1.apps.googleusercontent.com
// Android:

WebBrowser.maybeCompleteAuthSession();

const LoginPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [password, onText2Change] = useState<string>("");
  const [username, onText1Change] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const [user, setUser] = useState<any>(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "616359255354-9548lr7mhkfdnl9hjdj0mgmk7csb2g3b.apps.googleusercontent.com",
    iosClientId:
      "616359255354-p775225005q9eppnheomo9h3nb5v2gh1.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication?.accessToken || "");
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const useInfo = await response.json();
    setUser(useInfo);
  }

  const ShowUserInfo = () => {
    if (user) {
      return (
        <View>
          <Text>hello</Text>
          <Text>{user.name}</Text>
        </View>
      );
    }
  };
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
          <TouchableOpacity
            style={styles.buttonText}
            onPress={pressHandlerLogin}
          >
            <AntDesign name="login" size={30} color="#161a1d" />
            <Text>LogIn</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.buttonText}
            onPress={pressHandlerSignUp}
          >
            <FontAwesome name="user-plus" size={30} color="#161a1d" />
            <Text>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.text}>or</Text>
          <TouchableOpacity
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Text>SignIn with google</Text>
          </TouchableOpacity>
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
    marginVertical: 150,
  },
  input: {
    height: 45,
    marginHorizontal: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    borderColor: "#d3d3d3",
    backgroundColor: "#f8f9fa",
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
    color: "white",
  },
  text: {
    alignSelf: "center",
  },
});

export default LoginPage;
