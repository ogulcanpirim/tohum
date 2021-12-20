import { StyleSheet, Dimensions, Platform } from "react-native";

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


export default StyleSheet.create({

   welcomeRegisterButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#39be37',
      width: screenWidth / 2.3
   },

   welcomeSignInButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#4a4b4a',
      width: screenWidth / 2.3
   },

   welcomeScreenView: {
      height: screenHeight * (Platform.OS == "ios" ? 0.83 : 0.90),
      backgroundColor: '#c2edda',
      marginBottom: screenHeight / 100,
      justifyContent: 'center',
   },

   welcomeLogoTitle: {
      fontSize: 48,
      fontFamily: 'Comfortaa-Regular',
      fontWeight: '400',
      textAlign: 'center',
      justifyContent: 'center',
   },

   screenHeader: {
      fontSize: 36,
      marginLeft: screenWidth / 20,
      marginTop: screenHeight / 100,
      fontFamily: 'Comfortaa-Regular',
   },

   screenHeaderWithLogo: {
      fontFamily: 'Comfortaa-Regular',
      fontSize: 36,
      padding: screenWidth / 20,
   },

   logoTitle: {
      fontFamily: 'Comfortaa-Regular',
   },


   searchBar: {
      marginTop: screenHeight / 100,
      marginRight: screenWidth / 20,
      marginLeft: screenWidth / 20,
      height: screenHeight / 18,
      borderColor: '#cad1d7',
      borderWidth: 2,
      borderRadius: 8,
   },

   textStyle: {
      fontSize: 36,
      marginTop: 107,
      marginLeft: 15,
      marginBottom: 33,
      fontFamily: 'Comfortaa-Regular',
   },

   accountInfoText: {
      padding: screenWidth / 20,
      fontSize: 14,
   },

   inputFirst: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 15,
      borderColor: '#000000',
      borderWidth: 2,
   },
   inputs: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 15,
      borderColor: '#000000',
      borderWidth: 2,
      marginTop: screenHeight / 50
   },
   registerButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#39be37',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,

   },
   signinButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#4a4b4a',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      marginTop: 16,
   },
   exitButton: {
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#FF0000',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 16,
   },
   buttonText: {
      textAlign: 'center',
      color: 'white',
      fontWeight: 'bold',
   },

   returnButton: {
      marginLeft: screenWidth / 20,
      marginTop: screenHeight / 100,
   },
   passwordButton: {
      height: 52,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#4a4b4a',
      marginLeft: 15,
      marginRight: 15,
      marginTop: 16,
   },
   createFormButton: {
      height: screenHeight / 15,
      justifyContent: 'center',
      borderRadius: 8,
      backgroundColor: '#39be37',
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      marginTop: 16,
   },
   createFormInput: {
      marginRight: screenWidth / 25,
      marginLeft: screenWidth / 25,
      height: screenHeight / 5,
      borderColor: '#000000',
      borderWidth: 2,
      marginTop: screenHeight / 50,
      paddingTop: screenHeight / 50,
      textAlignVertical: 'top',
   },
   addFormButton: {
      marginRight: screenWidth / 20,
      marginTop: screenHeight / 75,
   },
   signOutButton: {
      marginRight: screenWidth / 25,
      marginTop: screenHeight / 100,
   },
   inboxButton: {
      marginTop: screenHeight / 100,
      marginLeft: screenWidth / 3,
   },
   shoppingButton: {
      marginRight: screenWidth / 20,
      marginTop: screenHeight / 75,
   },
   badge: {
      position: 'absolute',
      top: -5,
      right: -10,
      backgroundColor: '#ff2222',
      borderRadius: 16,
      paddingHorizontal: 6,
      paddingVertical: 2,
      zIndex: 2,
   },
   badgeText:{
      color: 'white',
      fontSize: 12,
      fontWeight: '600',
   }
})