import React, { useEffect, useState } from "react";
import { FC } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import UserModel, { Post } from "../model/UserModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "@expo/vector-icons/Ionicons"

const CreatePostPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [avatarUri, setAvatrUri] = useState("");

  useEffect(() => {
    const askPermission = async () => {
      try {
        const res = await ImagePicker.getCameraPermissionsAsync();
        if (!res.granted) {
          // alert("camera permission required");
        }
      } catch (err) {
        console.log("ask permission failed ");
      }
    };
    askPermission();
  }, []);

  const handleChoosePhoto = async () => {
    try {
      const res = await ImagePicker.launchImageLibraryAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatrUri(uri);
      }
    } catch (err) {
      console.log("open camera error");
    }
  };

  const handleTakePhoto = async () => {
    try {
      const res = await ImagePicker.launchCameraAsync();
      if (!res.canceled && res.assets.length > 0) {
        const uri = res.assets[0].uri;
        setAvatrUri(uri);
      }
    } catch (err) {
      console.log("open camera error")
    }
  };

  const handlePost = async () => {
    if (avatarUri) {
      const url = await UserModel.uploadImage(avatarUri);
      const sender = await AsyncStorage.getItem("id");
      const post: Post = {
        message: description,
        sender: String(sender),
        avatarUrl: url,
      };
      try {
        const res: any = await UserModel.addNewPost(post);
        if (!res) {
          return;
        }
        Alert.alert("Great Post\n", `Description: ${description}`);
      } catch (err) {
        console.log("cant create post ");
      }
    } else {
      Alert.alert("Cant creat post\n", `Photo is required`);
    }
    navigation.goBack();
  };

  return (
    <ScrollView style={{ }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <Ionicons name={"image"} style={styles.galleryButton} size={50} />
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
          <Ionicons name={"camera"} style={styles.cameraButton} size={50} />
          <Text style={styles.takePhotoText}>Take Photo</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.descriptionInput}
          placeholder="Describe the picture"
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>POST</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  imageContainer: {
    margin: 10,
    width: "50%",
    aspectRatio: 1,
    borderWidth: 2,
    borderColor: "#EBEBEB",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
    alignContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cameraButton: {
    position: "absolute",
    right: -40,
    width: 50,
    height: 50,
    color: "#D8D8D8",
  },
  galleryButton: {
    position: "absolute",
    flexDirection: "row",
    margin: 70,
    width: 50,
    height: 50,
    color: "#D8D8D8",
  },
  choosePhotoText: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 30,
    color: "#FFA3FD",
  },
  takePhotoText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA3FD",
    margin: 20,
  },
  descriptionInput: {
    
    borderWidth: 2,
    borderColor: "#EBEBEB",
    borderRadius: 10,
    padding: 10,
    width: "95%",
    minHeight: 100,
    marginBottom: 20,
    textAlignVertical: "top",
    color: "black",
  },
  postButton: {
    backgroundColor: "#FFA3FD",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 15,
  },
  postButtonText: {
    color: "#F7F7F7",
    fontWeight: "bold",
    fontSize: 16,
  },
  TextInput: {
    color: "white",
  },
});

export default CreatePostPage;
