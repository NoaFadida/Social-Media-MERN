import React from "react";
import { FC, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import AuthModel, { User } from "../model/AuthModel";
import UserModel from "../model/UserModel";
import * as ImagePicker from "expo-image-picker";

const SignupPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [avatarUri, setAvatrUri] = useState("");
  const [username, onText1Change] = useState<string>("");
  const [password, onText2Change] = useState<string>("");
  const [confirmPassword, onText3Change] = useState<string>("");
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  const [name, onText4Change] = useState<string>("");
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const askPermission = async () => {
    try {
      if (status?.status === ImagePicker.PermissionStatus.UNDETERMINED) {
        const permissionRes = await requestPermission();
        return permissionRes.granted;
      }
      if (status?.status === ImagePicker.PermissionStatus.DENIED) {
        alert("camera permission required");
        return false;
      }
      return true;
    } catch (err) {
      console.log("ask permission failed ");
    }
  };

  const handleChoosePhoto = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatrUri(uri);
      }
    } catch (err) {
      console.log("open camera error" + err);
    }
  };

  const handleTakePhoto = async () => {
    const isPermission = await askPermission();
    if (!isPermission) return;
    try {
      const res = await ImagePicker.launchCameraAsync();
      console.log(res);
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatrUri(uri);
      }
    } catch (err) {
      console.log("open camera error");
    }
  };

  const pressHandlerSignUp = async () => {
    try {
      // alert("Hi " + name + " Please log in");
      if (
        username === "" ||
        password === "" ||
        avatarUri === "" ||
        name === ""
      ) {
        console.log("login failed");
        Alert.alert("Please fill all the fileds", "try again");
        return;
      }
      const url = await UserModel.uploadImage(avatarUri);
      const user: User = {
        email: username,
        name: name,
        password: password,
        avatarUrl: url,
      };
      console.log(user);
      const res = await AuthModel.register(user);
      if (res?.status == 400) {
        Alert.alert("User already exists", "Login or try again");
        return;
      }
      console.log("success signup signuppage");
    } catch (err) {
      console.log("fail signup" + err);
    }
    navigation.goBack();
  };

  const onConfirmPasswordChange = (text: string) => {
    onText3Change(text);
    setPasswordsMatch(text === password);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={styles.imageContainer}>
            {avatarUri && (
              <Image source={{ uri: avatarUri }} style={styles.image} />
            )}
            {!avatarUri && (
              <Text style={styles.choosePhotoText}>Choose Photo</Text>
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleTakePhoto}>
          <Text style={styles.takePhotoText}>Take Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={onText1Change}
          placeholder="email"
          value={username}
        />
        <TextInput
          style={styles.input}
          onChangeText={onText4Change}
          placeholder="name"
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={onText2Change}
          placeholder="password"
          value={password}
          secureTextEntry={true}
        />
        <TextInput
          style={[styles.input, !passwordsMatch ? styles.inputError : null]}
          onChangeText={onConfirmPasswordChange}
          placeholder="confirm password"
          value={confirmPassword}
          secureTextEntry={true}
        />

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={pressHandlerSignUp}>
            <Text style={styles.buttonText}>Sign Up</Text>
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
  userPictureStyle: {
    marginTop: 10,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 20,
  },
  choosePhotoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161a1d",
    textAlign: "center",
  },
  takePhotoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#161a1d",
    marginBottom: 20,
    resizeMode: "contain",
    alignSelf: "center",
  },
  imageContainer: {
    backgroundColor: "#f8f9fa",
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "contain",
    alignSelf: "center",
    margin: 20,
    borderRadius: 100,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  input: {
    height: 40,
    marginHorizontal: 15,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    borderColor: "#d3d3d3",
    backgroundColor: "#f8f9fa",
  },
  inputError: {
    borderColor: "red",
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 20,
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
});

export default SignupPage;
