import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView
} from "react-native";

import { StyleSheet } from "react-native";


const COURSES = [
  {
    id: "45k6-j54k-4jth",
    title: "HTML",
  },
  {
    id: "4116-jfk5-43rh",
    title: "JavaScript",
  },
  {
    id: "4d16-5tt5-4j55",
    title: "React",
  },
  {
    id: "LG16-ant5-0J25",
    title: "React Native",
  },
];

export const PostsScreen = ({ navigation, route }) => {
const [courses, setCourses] = useState(COURSES);
  

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
        data={courses}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        keyExtractor={(item) => item.id}
      ></FlatList>
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