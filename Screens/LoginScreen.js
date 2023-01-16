import React, {useState} from 'react';
import { StyleSheet, TextInput, ImageBackground, Text, View, TouchableOpacity, Keyboard,KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';

const initialState = {
  email: "",
  password: "",
}

function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);
  
  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };
  
  const submitForm = () => {
    keyboardHide();
    setState(initialState);
    console.log(state);
  };
  


  return (
    <>
    <TouchableWithoutFeedback onPress={() => {keyboardHide()}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
    <ImageBackground style={styles.image} source={require('./../image/img-bg.jpg')}>
    <View style={styles.form}>
     <Text style={styles.titleText}>Войти</Text>
   <TextInput style={styles.input} placeholder="Адрес электронной почты" onFocus={()=> {setIsShowKeyboard(true)}} value={state.email}
   onChangeText={(value) => setState((prevState)=> ({...prevState, email: value}))}/>
   <TextInput style={styles.input} placeholder="Пароль" secureTextEntry={true} onFocus={()=> {setIsShowKeyboard(true)}} value={state.password}
   onChangeText={(value) => setState((prevState)=> ({...prevState, password: value}))}/>
   <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={()=> {submitForm()}}>
        <Text style={styles.btnText}>Войти</Text>
      </TouchableOpacity>
      <Text style={styles.acountText}>Нет аккаунта? Зарегистрироваться</Text>
   </View>
   </ImageBackground>
   </KeyboardAvoidingView>
   </TouchableWithoutFeedback>
   </>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
    form:{
         backgroundColor: "#FFFFFF",
         width: "100%",
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
    },
    titleText:{
      fontFamily: "Roboto-Medium",
        fontSize: 30,
        lineHeight: 35,
        letterSpacing: 0.01,
        alignItems: "center",
        color: "#212121",
        textAlign: "center",
        marginBottom: 33,
        marginTop: 92,
    },
    input: {
      fontFamily: "Roboto-Regular",
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      marginHorizontal: 16,
      borderRadius: 8,
      marginBottom: 16,
      paddingHorizontal: 16,
      colorText: "#BDBDBD",
    },
    button:{
        backgroundColor: "#FF6C00",
        padding: 10,
        marginTop: 43,
        paddingVertical: 16,
        alignItems: "center",
        borderRadius: 100,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    btnText:{
      fontFamily: "Roboto-Regular",
        color:"#FFFFFF",
        textAlign: "center",
        paddingVertical: 6,
        fontSize: 16,
        lineHeight: 19,
    },
    acountText:{
      fontFamily: "Roboto-Regular",
        color: "#1B4371",
        marginBottom: 78,
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
    },
  });

  

export default LoginScreen
