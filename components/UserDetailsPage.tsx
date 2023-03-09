import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import AuthModel, { Token } from "../model/AuthModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, NavigationContainer } from "@react-navigation/native";
import UserModel, { UserUpdate } from "../model/UserModel";
import * as ImagePicker from "expo-image-picker";
import { Colors } from "react-native/Libraries/NewAppScreen";
import yargsParser from "yargs-parser";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllPostsPage from "./AllPostsPage";
import CreatePostPage from "./CreatePostPage";
import MyPostsPage from "./MyPostsPage";
import ChatPage from "./ChatPage";

const UserDetailsPage: FC<{ route: any; navigation: any }> = ({
  navigation,
  route,
}) => {
  const [fullName, setFullName] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>(
    "../assets/images/profile-user.png"
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempFullName, setTempFullName] = useState(fullName);

  const isNewPost = route.params?.isNewPost;
  var UriAfretChange = "";

  const loadUser = async () => {
    const id = await AsyncStorage.getItem("id");
    const res = await UserModel.getUserById(String(id));

    setFullName(res?.[0]);
    setProfilePicture(res?.[1]);
  };

  useEffect(() => {
    try {
      loadUser();
    } catch (err) {
      console.log("fail signup" + err);
    }
  }, []);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleTakePhoto = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        UriAfretChange = uri;
        setProfilePicture(uri);
      }
    } catch (err) {
      console.log("open libary error" + err);
    }
  };

  const pressHandlerLogOut = async () => {
    console.log("Logging out...");
    await AuthModel.logout();
    console.log("Resetting navigation stack...");
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "LoginPage" }],
      })
    );
  };

  const handleSaveName = async () => {
    setFullName(tempFullName);
    const id_ = await AsyncStorage.getItem("id");
    const up: UserUpdate = {
      id: String(id_),
      name: tempFullName,
      avatarUrl: profilePicture,
    };
    try {
      const res = await UserModel.upadteUser(up);
      console.log("update user success");
    } catch (err) {
      console.log("update user failed " + err);
    }
    setIsEditingName(false);
  };

  const handleCancelEditName = () => {
    setTempFullName(fullName);
    setIsEditingName(false);
  };

  const handleEditPicture = async () => {
    await handleTakePhoto();
    const id_ = await AsyncStorage.getItem("id");
    const up: UserUpdate = {
      id: String(id_),
      name: fullName,
      avatarUrl: UriAfretChange,
    };
    try {
      const res = await UserModel.upadteUser(up);
      console.log("update user success");
    } catch (err) {
      console.log("update user failed " + err);
    }
  };

  const renderName = () => {
    if (isEditingName) {
      return (
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.fullNameInput}
            placeholderTextColor={"lightslategrey"}
            value={tempFullName}
            onChangeText={(text) => setTempFullName(text)}
          />
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handleSaveName}
          >
            <FontAwesome name="save" size={24} color="lightslategrey" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handleCancelEditName}
          >
            <AntDesign name="close" size={24} color="lightslategrey" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.nameContainerEdit}>
          <Text style={{ color: "#343434", fontSize: 16 }}>Edit your Name</Text>
          <Text style={styles.fullName}>
            {fullName}
            <TouchableOpacity onPress={handleEditName}>
              <FontAwesome name="edit" size={24} color="#0096FF" />
            </TouchableOpacity>
          </Text>
        </View>
      );
    }
  };

  const HomePage: FC<{ route: any; navigation: any }> = ({
    route,
    navigation,
  }) => {
    return <AllPostsPage navigation={navigation} />;
  };

  const AddNewPost: FC<{ route: any; navigation: any }> = ({
    route,
    navigation,
  }) => {
    return <CreatePostPage navigation={navigation} />;
  };

  const MyPosts: FC<{ route: any; navigation: any }> = ({
    route,
    navigation,
  }) => {
    return <MyPostsPage navigation={navigation} />;
  };

  const Chat: FC<{ rout: any; navigation: any }> = ({ rout, navigation }) => {
    return <ChatPage navigation={navigation} />;
  };

  const MyProfile: FC<{ route: any; navigation: any }> = ({
    route,
    navigation,
  }) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: 0,
          backgroundColor: "#E6E7E5",
        }}
      >
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => pressHandlerLogOut()}
        >
          <FontAwesome name="sign-out" size={22} color="#343434" />
          <Text style={styles.logoutButtonText}> LogOut </Text>
        </TouchableOpacity>
        <View style={styles.profilePictureContainer}>
          {profilePicture && (
            <Image
              style={styles.profilePicture}
              source={{ uri: profilePicture }}
            />
          )}
          <View style={styles.editButtonContainer}>
            <TouchableOpacity onPress={handleEditPicture}>
              <FontAwesome
                name="file-photo-o"
                size={24}
                color="#FFA3FD"
                selectionColor={"grey"}
              />
            </TouchableOpacity>
          </View>
        </View>
        {renderName()}
      </View>
    );
  };

  const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = "";
            if (route.name === "HomePage") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "MyProfile") {
              iconName = focused ? "person-circle" : "person-circle-outline";
            } else if (route.name === "AddNewPost") {
              iconName = focused ? "ios-add-circle" : "ios-add-circle-outline";
            } else if (route.name === "MyPosts") {
              iconName = focused ? "md-grid" : "md-grid-outline";
            } else if (route.name === "Chat") {
              iconName = focused ? "md-chatbubble-ellipses": "md-chatbubble-ellipses-outline";
            }
            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#0096FF",
          tabBarInactiveTintColor: "grey",
        })}
      >
        <Tab.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ title: "My Profile" }}
        />
        <Tab.Screen
          name="AddNewPost"
          component={AddNewPost}
          options={{ title: "Create Post" }}
        />
        <Tab.Screen
          name="MyPosts"
          component={MyPosts}
          options={{ title: "MY Posts" }}
        />
        <Tab.Screen
          name="HomePage"
          component={HomePage}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatPage}
          options={{ title: "Chat" }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    flexDirection: "row",
    backgroundColor: "#EEEEEE",
    padding: 7,
    borderRadius: 10,
    marginTop: 50,
  },
  logoutButtonText: {
    color: "#343434",
    fontSize: 16,
    textAlign: "center",
  },
  profilePictureContainer: {
    marginVertical: 25,
  },
  editButtonContainer: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 200,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    top: 2, // new position for the editButtonContainer
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  profilePicture: {
    width: 230,
    height: 230,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: "#FFA3FD",
  },
  cancelText: {
    fontSize: 18,
    color: "red",
    padding: 5,
    fontWeight: "bold",
    backgroundColor: "#DDDDDD",
    borderRadius: 6,
    margin: 20,
  },
  saveText: {
    fontSize: 20,
    color: "blue",
    padding: 20,
    fontWeight: "bold",
    backgroundColor: "#DDDDDD",
    borderRadius: 6,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  nameContainerEdit: {
    flexDirection: "column",
    alignItems: "center",
    margin: 10,
  },
  fullName: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 0,
    margin: 7,
    color: "#343434",
  },
  fullNameInput: {
    fontSize: 26,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: "lightslategrey ",
    color: "#0096FF",
  },
  editText: {
    fontSize: 18,
    color: "pink",
    padding: 20,
    fontWeight: "bold",
    backgroundColor: "red",
    borderRadius: 6,
    margin: 10,
  },
  buttonsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    borderRadius: 10,
  },
  buttonLogOut: {
    margin: 12,
    padding: 12,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 5,
  },
  editProfilePictureButton: {
    position: "absolute",
    bottom: 0,
    right: 75,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  editProfilePictureIcon: {
    fontSize: 20,
    color: "blue",
  },
  TouchableOpacity: {
    margin: 5,
    padding: 5,
  },
});

export default UserDetailsPage;
