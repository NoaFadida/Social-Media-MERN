import React, { FC, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import UserModel, { Post } from "../model/UserModel";
import { ListItem } from "./MyPostsPage";

const EditPost: FC<{ route: any; navigation: any }> = ({
  route,
  navigation,
}) => {
  const post: Post = {
    id: route.params.id,
    avatarUrl: route.params.avatarUrl,
    message: route.params.message,
    sender: route.params.sender,
  };

  const [msg, setMsg] = useState<string>("");
  const [isEditingMsg, setIsEditingMsg] = useState(false);

  const [tempMsg, setTempMsg] = useState(msg);
  const [currentPost, setCurrentPost] = useState(post);

  useEffect(() => {
    const loadPost = () => {
      try {
        setMsg(String(currentPost.message));
        console.log("post msg");
      } catch (err) {
        console.log("fail signup");
      }
    };
    loadPost();
  }, [currentPost]);

  const handleDeletePost = async () => {
    try {
      await UserModel.deletePost(post);
      console.log("delete post success");
    } catch (err) {
      console.log("delete post failed ");
    }
    navigation.goBack();
  };
  const handleSavePost = async () => {
    try {
      const updatedPost = { ...currentPost, message: tempMsg };
      setMsg(tempMsg);
      await UserModel.updatePost(updatedPost);
      setCurrentPost(updatedPost);
      console.log("update post msg success");
    } catch (err) {
      console.log("update post msg failed ");
    }
    setIsEditingMsg(false);
  };

  const handleCancelEditMsg = () => {
    setTempMsg(msg);
    setIsEditingMsg(false);
  };

  const renderPost = () => {
    if (isEditingMsg) {
      return (
        <View style={styles.nameContainer}>
          <TextInput
            style={styles.fullNameInput}
            placeholderTextColor={"lightslategrey"}
            value={tempMsg}
            onChangeText={(text) => setTempMsg(text)}
          />
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handleSavePost}
          >
            <FontAwesome name="save" size={24} color="lightslategrey" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.TouchableOpacity}
            onPress={handleCancelEditMsg}
          >
            <AntDesign name="close" size={24} color="lightslategrey" />
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View style={styles.nameContainerEdit}>
          <Text style={styles.editInfoTitle}>
            {currentPost.message}
            <TouchableOpacity onPress={() => setIsEditingMsg(true)}>
              <FontAwesome name="edit" size={24} color="#0096FF" />
            </TouchableOpacity>
          </Text>
        </View>
      );
    }
  };
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#F0EEED" }}>
      
      <>
        {currentPost && <ListItem post={currentPost} navigation={navigation} />}
          </>
          {renderPost()}
          <Button title="Tup here to delete your post" onPress={handleDeletePost} />
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  nameContainerEdit: {
    flexDirection: "column",
    alignItems: "center",
    margin: 70,
  },
  fullName: {
    fontSize: 24,
    fontWeight: "bold",
    paddingTop: 0,
    margin: 10,
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
  TouchableOpacity: {
    margin: 5,
    padding: 5,
  },
  editInfoTitle: {
      fontSize: 18,
      color: "black",
      fontWeight: "bold",
      
  },
});

export default EditPost;
