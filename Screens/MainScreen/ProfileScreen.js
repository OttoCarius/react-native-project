import { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  ImageBackground,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import { Feather, EvilIcons } from "@expo/vector-icons";


 export const ProfileScreen = ({ navigation }) => {
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../image/img-bg.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
          >
            <View style={styles.box}>
              <View style={styles.logoutBtn}>
                <Feather
                  name="log-out"
                  color="#BDBDBD"
                  size={24}
                  onPress={() => {
                    console.log("logout");
                  }}
                />
              </View>
              <Text style={styles.userName}>Andrew Reich</Text>
              <View style={styles.avatar}>
              <Image style={styles.userPhoto} source={require('../../image/ava.jpg')} />
                <TouchableOpacity
                  style={styles.avatarBtn}
                  activeOpacity={0.7}
                  accessibilityLabel="add avatar"
                  onPress={() => console.log("add avatar")}
                >
                  <Image source={require("./../../image/add.png")} />
                </TouchableOpacity>
              </View>

              <View>
                <Image
                  source={require("../../image/post1.jpg")}
                  style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
                />
                <Text style={styles.photoText}>Лес</Text>
                <View style={styles.linksContainer}>
                  <View style={styles.wrap}>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("CommentsScreen");
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={{ ...styles.count, marginLeft: 6 }}>8</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ ...styles.link, marginLeft: 24 }}
                      activeOpacity={0.8}
                      onPress={() => {
                        console.log("like");
                      }}
                    >
                      <EvilIcons name="like" size={35} color="#BDBDBD" />
                      <Text style={styles.count}>280</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("MapScreen");
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>Ukraine</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
              <View>
                <Image
                  source={require("../../image/post2.jpg")}
                  style={{ ...styles.photo, width: windowWidth - 16 * 2 }}
                />
                <Text style={styles.photoText}>Лес</Text>
                <View style={styles.linksContainer}>
                  <View style={styles.wrap}>
                    <TouchableOpacity
                      style={styles.link}
                      activeOpacity={0.8}
                      onPress={() => {
                        navigation.navigate("CommentsScreen");
                      }}
                    >
                      <Feather
                        name="message-circle"
                        size={24}
                        color="#BDBDBD"
                      />
                      <Text style={{ ...styles.count, marginLeft: 6 }}>17</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ ...styles.link, marginLeft: 24 }}
                      activeOpacity={0.8}
                      onPress={() => {
                        console.log("like");
                      }}
                    >
                      <EvilIcons name="like" size={35} color="#BDBDBD" />
                      <Text style={styles.count}>370</Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.link}
                    activeOpacity={0.8}
                    onPress={() => {
                      navigation.navigate("MapScreen");
                    }}
                  >
                    <Feather name="map-pin" size={24} color="#BDBDBD" />
                    <Text style={styles.locationText}>Ukraine</Text>
                  </TouchableOpacity>
                </View>
                
              </View>
              
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  avatar: {
    position: "absolute",
    right: "50%",
    top: 0,
    transform: [{ translateX: 60 }, { translateY: -60 }],
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  avatarBtn: {
    position: "absolute",
    bottom: 19,
    left: 105,
    width: 25,
    height: 25,
  },
  box: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 75,
    alignItems: "center",
  },
  userName: {
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    marginBottom: 32,
    color: "#212121",
  },
  logoutBtn: {
    position: "absolute",
    top: 20,
    right: 16,
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
  wrap: {
    flexDirection: "row",
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
  userPhoto:{
    borderRadius: 16,
      width: 120,
      height: 120,
  },
});


