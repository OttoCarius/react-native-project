import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { StyleSheet } from "react-native";


export const PostsScreen = ({ navigation, route }) => {
  const [posts, setPosts] = useState([]);
  

  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setWindowWidth(width);
    };
    const dimensionsHandler = Dimensions.addEventListener("change", onChange);

    return () => dimensionsHandler.remove();
  }, []);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);



  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image 
          style={{ marginRight: 8, borderRadius: 16,  width: 60,
            height: 60, }}
          source={require('../../image/ava.jpg')}
        />
        <View>
          <Text style={{ fontFamily: "Roboto-Medium", fontSize: 13 }}>
            Andrew Reich
          </Text>
          <Text style={{ fontFamily: "Roboto-Regular", fontSize: 11 }}>
            email@example.com
          </Text>
        </View>
      </View>
      <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
    <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginTop: 32 }}>
            <Image
              source={{ uri: item.post.photo }}
              style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
            />
            <Text style={styles.photoText}>{item.post.title}</Text>
            <View style={styles.linksContainer}>
              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    uri: item.post.photo,
                  });
                }}
              >
                <Feather name="message-circle" size={24} color="#BDBDBD" />
                <Text style={{ ...styles.count, marginLeft: 6 }}>13</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.link}
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    location: item.post.location,
                  });
                }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
                <Text style={styles.locationText}>
                  {item.post.location.place}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
    </View>
  );
};


 const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#FFFFFF",
  },
  userInfo: {
    paddingLeft: 16,
    paddingTop: 32,
    flexDirection: "row",
    alignItems: "center",
  },
  photo: {
    height: 240,
    marginBottom: 8,
    borderRadius: 8,
  },
  photoText: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 8,
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  link: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
  },
  locationText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    textDecorationLine: "underline",
    marginLeft: 3,
  },
});