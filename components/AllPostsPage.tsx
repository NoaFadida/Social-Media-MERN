import React from "react";
import { FC, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
} from "react-native";
import UserModel, { Post } from "../model/UserModel";

const ListItem: FC<{
  message: String;
  sender: String;
  avatarUrl: String;
  onRowSelected?: (sender: String) => void;
}> = ({ message, sender, avatarUrl, onRowSelected }) => {
  const [userPic, setPic] = useState<String>("");
  const [userName, setName] = useState<String>("");

  const getUserDetails = async () => {
    try {
      const user = await UserModel.getUserById(sender.toString());
      setName(user?.[0]);
      setPic(user?.[1]);
    } catch (err) {
      console.log("fail getting user by ID ");
    }
  };
  const onClick = () => {
    if (onRowSelected) {
      onRowSelected(sender);
    }
  };

  useEffect(() => {
    getUserDetails();
  });

  return (
    <View style={{ backgroundColor: "#F0EEED" }}>
      <TouchableHighlight onPress={onClick} underlayColor={"gainsboro"}>
        <View style={styles.listRow}>
          {avatarUrl == "" && (
            <Image
              style={styles.listRowImage}
              source={require("../assets/images/profile-user.png")}
            />
          )}
          {avatarUrl && (
            <Image
              style={styles.listRowImage}
              source={{ uri: String(avatarUrl) }}
            />
          )}

          <View style={styles.listRowTextContainer}>
            <Text style={styles.listRowName}>{message}</Text>
            <View style={styles.userDetailsRow}>
              {userPic && (
                <Image
                  style={styles.profilePicture}
                  source={{ uri: String(userPic) }}
                />
              )}
              <Text style={styles.listRowId}>{userName}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const AllPostsPage: FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [posts, setPosts] = useState<Array<Post>>();

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let posts: Post[] = [];
      try {
        posts = await UserModel.getAllPosts();
      } catch (err) {
        console.log("fail fetching posts");
      }
      setPosts(posts);
    });
    return unsubscribe;
  });

  return (
    <FlatList
      style={styles.flatlist}
      data={posts}
      keyExtractor={(post) => `${post.sender.toString()} + ${Math.random()}`}
      renderItem={({ item }) => (
        <ListItem
          message={item.message}
          sender={item.sender}
          avatarUrl={item.avatarUrl}
        />
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: "grey",
  },
  flatlist: {
    flex: 1,
  },
  listRow: {
    margin: 7,
    alignItems: "center",
    backgroundColor: "#F0EEED",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  userDetailsRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F0EEED",
    width: 400,
    margin: 0,
  },
  listRowImage: {
    height: 300,
    width: 400,
    backgroundColor: "#F0EEED",
    alignContent: "center",
    marginTop: 10,
  },
  listRowTextContainer: {
    marginTop: 9,
    marginBottom: 10,
    backgroundColor: "#F0EEED",
  },
  listRowName: {
    margin: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  listRowId: {
    fontSize: 18,
    color: "#8f8f8f",
  },
  profilePicture: {
    width: 45,
    height: 45,
    borderRadius: 80,
    marginEnd: 5,
  },
  pinkBackground: {
    backgroundColor: "#ff69b4",
  },
  greyText: {
    color: "#8f8f8f",
  },
});

export default AllPostsPage;
