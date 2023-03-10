import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useState, useEffect } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableHighlight,
  Button,
} from "react-native";
import UserModel, { User } from "../model/UserModel";
import Conversation from "./Conversation/Conversation";

const ListItem: FC<{
  user: User;
  onRowSelected?: (sender: String) => void;
  onClickEvent?: boolean;
  navigation: any;
  senderId: string;
}> = ({ user, onRowSelected, onClickEvent, navigation, senderId }) => {
  const { avatarUrl, name, id } = user || {};
  const [userPic, setPic] = useState<String>("");
  const [userName, setName] = useState<String>("");

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const user_ = await UserModel.getUserById(String(user.id));
        setName(user_?.[0]);
        setPic(user_?.[1]);
      } catch (err) {
        console.log("fail getting user by ID ");
      }
    };
    getUserDetails();
  }, []);

  const onClick = () => {
    if (onRowSelected) {
      onRowSelected(user.name);
    }
    navigation.navigate("Conversation", { user, senderId });
    // if (onClickEvent) {
    //   onClickEvent();
    // }
  };

  return (
    <View>
      <TouchableHighlight
        onPress={!!onClickEvent ? onClick : () => {}}
        underlayColor={"#F5F5F5"}
      >
        <View style={styles.listRowTextContainer}>
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
      </TouchableHighlight>
    </View>
  );
};

const ChatPage: FC<{ navigation: any }> = ({ navigation }) => {
  const [users, setUsers] = useState<Array<User>>();
  const [senderId, setSenderId] = useState<string>("");
  // const [isChatOpened, setIsChatOpened] = useState<boolean>(false);

  // const handleOnClickEvent = () => {
  //   setIsChatOpened(true);
  // };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      let usersFiltered: User[] = [];
      const sender = await AsyncStorage.getItem("id");
      if (sender) setSenderId(sender);
      try {
        let users: User[] = await UserModel.getAllUsers();
        usersFiltered = users?.filter((user) => user.id !== String(sender));
      } catch (err) {
        console.log("fail fetching posts ");
      }
      setUsers(usersFiltered);
    });
    return unsubscribe;
  })

  return (
    // <>
    //   {!isChatOpened ? (
    <FlatList
      style={styles.flatlist}
      data={users}
      keyExtractor={(user) => `${user.name.toString()}  + ${Math.random()}`}
      renderItem={({ item }) => (
        <ListItem
          user={item}
          navigation={navigation}
          onClickEvent
          senderId={senderId}
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
    margin: 4,
    flexDirection: "row",
    height: 200,
    elevation: 1,
    borderRadius: 2,
  },
  listRowImage: {
    margin: 10,
    resizeMode: "contain",
    height: 130,
    width: 130,
    borderRadius: 80,
  },
  listRowTextContainer: {
    flex: 1,
    margin: 5,
    justifyContent: "space-around",
  },
  listRowName: {
    fontSize: 30,
  },
  listRowId: {
    fontSize: 22,
    margin: 10,
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 80,
    marginEnd: 5,
    borderWidth: 2,
    borderColor: "#BFEAF5",
  },
  userDetailsRow: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#ECF9FF",
    height: 80,
    padding: 10,
  },
});

export default ChatPage;
