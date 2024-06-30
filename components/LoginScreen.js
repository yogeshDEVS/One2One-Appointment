import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,ScrollView, TouchableOpacity, StyleSheet, Image, Dimensions, Alert, ActivityIndicator, KeyboardAvoidingView, Platform  } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import auth from '@react-native-firebase/auth';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AppleButton, appleAuth } from '@invertase/react-native-apple-authentication';


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const firebaseConfig = {
  apiKey: "AIzaSyCom1ZXGJmMqBvQdZSAyeu9kUQaWKT6MwU",
  authDomain: "diarylatest-88632.firebaseapp.com",
  databaseURL: "https://diarylatest-88632.firebaseio.com",
  projectId: "diarylatest-88632",
  storageBucket: "diarylatest-88632.appspot.com",
  messagingSenderId: "866393106718",
  appId: "1:866393106718:android:c01dccdc7a4bc0782ec10f"
};


const { width, height } = Dimensions.get('window');

const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms'

const LoginScreen = () => {
  const navigation = useNavigation(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);


  async function onAppleButtonPress() {
    try {
      // Performs login request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
  
      // Get current authentication state for user
      const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
  
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // Create a Firebase credential with the token
        const { identityToken, nonce } = appleAuthRequestResponse;
        const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
  
        // Sign in with the credential
        const firebaseUserCredential = await auth().signInWithCredential(appleCredential);
        const { user } = firebaseUserCredential;
  
        // Check if the user already exists in Firestore using the email
        const userDoc = await firestore().collection('users').where('email', '==', user.email).get();
  
        if (!userDoc.empty) {
          const userData = userDoc.docs[0].data();
          const customerId = userData.customerId;
  
          if (customerId) {
            // User exists and has a customerId, so navigate to Home
            await AsyncStorage.setItem('userLoggedIn', 'true');
            navigation.navigate('Home');
            return;
          } else {
            // User exists but does not have a customerId, clean up Firestore
            await firestore().collection('users').doc(userDoc.docs[0].id).delete();
          }
        }
  
        // If user does not exist, proceed with signup
        const response = await fetch(`${API_URL}/create-customer`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email }),
        });
  
        if (!response.ok) {
          console.error('Response:', response);
          throw new Error('Network response was not ok');
        }
  
        const data = await response.text();
        let customerId;
        try {
          const json = JSON.parse(data);
          customerId = json.customerId;
        } catch (err) {
          console.error('Failed to parse JSON:', err);
          return;
        }
  
        if (!customerId) {
          console.error('No customer ID returned');
          return;
        }
  
        await AsyncStorage.setItem('customerId', customerId);
        await firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
          firstName: appleAuthRequestResponse.fullName?.givenName || '',
          lastName: appleAuthRequestResponse.fullName?.familyName || '',
          email: user.email,
          profile_picture: '',
          customerId: customerId,
        }).then(async () => {
          console.log('User added to Firestore');
          await AsyncStorage.setItem('userLoggedIn', 'true');
          navigation.navigate('PaymentScreen');
        });
      } else {
        console.log('User is not authenticated');
      }
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  }
  
  

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '866393106718-d6jnu20phmnl13re37mldai1f1oin3mf.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const { idToken, user } = await GoogleSignin.signIn();
  
      // Check if the user already exists in Firestore using the email
      const userDoc = await firestore().collection('users').where('email', '==', user.email).get();
  
      if (!userDoc.empty) {
        const firebaseUserCredential = await auth().signInWithCredential(
          auth.GoogleAuthProvider.credential(idToken)
        );
  
        const userData = userDoc.docs[0].data();
        const customerId = userData.customerId;
  
        if (customerId) {
          // User exists and has a customerId, so navigate to Home
          await AsyncStorage.setItem('userLoggedIn', 'true');
          navigation.navigate('Home');
          return;
        } else {
          // User exists but does not have a customerId, clean up Firestore
          await firestore().collection('users').doc(userDoc.docs[0].id).delete();
        }
      }
  
      // If user does not exist, proceed with signup
      const firebaseUserCredential = await auth().signInWithCredential(
        auth.GoogleAuthProvider.credential(idToken)
      );
  
      const response = await fetch(`${API_URL}/create-customer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
  
      if (!response.ok) {
        console.error('Response:', response);
        throw new Error('Network response was not ok');
      }
  
      const data = await response.text();
      let customerId;
      try {
        const json = JSON.parse(data);
        customerId = json.customerId;
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        return;
      }
  
      if (!customerId) {
        console.error('No customer ID returned');
        return;
      }
  
      await AsyncStorage.setItem('customerId', customerId);
      await firestore().collection('users').doc(firebaseUserCredential.user.uid).set({
        firstName: user.givenName,
        lastName: '',
        email: user.email,
        profile_picture: user.photo,
        customerId: customerId,
      }).then(async () => {
        console.log('User added to Firestore');
        await AsyncStorage.setItem('userLoggedIn', 'true');
        navigation.navigate('PaymentScreen');
      });
    } catch (error) {
      console.log('Error during sign-in:', error);
    }
  };
  

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert(
        'Fields Empty',
        'Please fill in the email and password fields',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false}
      );
    } else {
      setLoading(true);
      auth()
      .signInWithEmailAndPassword(email, password)
      .then(async () => {
        console.log('User signed in!');
        setLoading(false); 
        await AsyncStorage.setItem('userLoggedIn', 'true'); 
        navigation.navigate('Home');
      }).catch(error => {
          setLoading(false);
          let errorMessage = '';
          if (error.code === 'auth/user-not-found') {
            errorMessage = 'No user found with this email address!';
          } else if (error.code === 'auth/wrong-password') {
            errorMessage = 'Wrong password!';
          } else {
            errorMessage = error.message;
          }
          Alert.alert(
            'Login Error',
            errorMessage,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')}
            ],
            {cancelable: false}
          );
        });
    }
  };


  const handleForgotPassword = () => {
    if (email === '') {
      Alert.alert(
        'Field Empty',
        'Please fill in the email field',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')}
        ],
        {cancelable: false}
      );
    } else {
      auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Email Sent',
          'Check your email for a link to reset your password.',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ],
          {cancelable: false}
        );
      })
      .catch(error => {
        Alert.alert(
          'Error',
          error.message,
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')}
          ],
          {cancelable: false}
        );
      });
    }
  };
  
  
  return (
   
        <KeyboardAvoidingView

      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView >
        <SafeAreaView>
       <View style={styles.header}>
        <Text style={styles.headerTitle}></Text>
      </View>
          <View style={styles.contentContainer}>
          <View style={styles.IntialContainer}>
      <Text style={styles.greeting}>Welcome to One2One App</Text>
      <Text style={styles.subheading}>Please sign in with your account</Text>
      </View>
      <Text style={styles.fieldTitle}>Email</Text>
      <View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    value={email}
    onChangeText={setEmail}
    placeholder="Enter your email"
    placeholderTextColor='gray'
  />
  <Image source={require('../assets/sms-tracking.png')} style={styles.icon} />
</View>
<Text style={styles.fieldTitle}>Password</Text>
<View style={styles.inputContainer}>
  <TextInput
    style={styles.input}
    value={password}
    onChangeText={setPassword}
    placeholder="Enter your password"
    secureTextEntry={hidePassword}
    placeholderTextColor='gray'
  />
  <Image source={require('../assets/lock.png')} style={styles.icon} />
  <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIcon}>
    <Image source={require('../assets/eye-slash.png')} />
  </TouchableOpacity>
</View>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      </View>
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#fff" /> // Show loader when loading
        ) : (
          <Text style={styles.signInText}>Sign In</Text>
        )}
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text style={styles.createAccount}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SIGN UP')}>
          <Text style={styles.createAccountLink}> Create Account</Text>
        </TouchableOpacity>

       
      </View>
           </SafeAreaView>
      </ScrollView>
      <Text style={styles.or}>Or </Text>
{/* 
  <View  style={styles.googleButton}>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45, // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
      </View> */}

      {/* <TouchableOpacity onPress={handleGoogleSignup} style={styles.googleButton}>
          <Image source={require('../assets/google.png')} style={styles.googleIcon} />
          <Text style={styles.googleText}>Continue with Google</Text>
        </TouchableOpacity> */}
  
      </KeyboardAvoidingView>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: width * 0.05,
    paddingTop:width * 0.055,
    backgroundColor: 'white',
  },
  greeting: {
    fontSize: width * 0.06,
    marginBottom: height * 0.015,
    fontWeight: 'bold',
    color:'#434343'
  },
  or: {
    fontSize: width * 0.045,
    color: '#000',
    textAlign: 'center',
 
   
    fontWeight:'bold'
  },
  headerTitle: {
    fontSize: width * 0.042,
    alignSelf:'center',
    color:'#434343',
    marginBottom: height * 0.055,
  },  
  subheading: {
    fontSize: width * 0.0375,
    marginBottom: height * 0.02,
    color: '#727272'
  },
  googleButton: {
    flexDirection: 'row', // to align icon and text horizontally
    alignItems: 'center', // to center them vertically
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // transparent background
    borderRadius: 4, // minimalistic border
    borderColor: '#ddd', // border color
    borderWidth: 0, // border width
    elevation: 2.5, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: {width: 0, height: 2}, // for shadow on iOS
    shadowOpacity: 0.25, // for shadow on iOS
    shadowRadius: 3.84, // for shadow on iOS
    padding: 10, // inner spacing
    marginBottom: height * 0.055,
    alignSelf:'center'
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10, // spacing between icon and text
    alignSelf:"center",
    marginLeft: 56, 
  },
  googleText: {
    color: '#000', // white text
    fontWeight: 'bold', // bold text
    fontSize: width * 0.049,
  },
  fieldTitle: {
    fontSize: width * 0.04,
    marginBottom: height * 0.015,
    fontWeight: 'bold',
    color: '#434343'
  },
  inputContainer: {
    flexDirection: 'row',
    minHeight: '10%',
    paddingLeft: width * 0.025,
    marginBottom: height * 0.01,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
  icon: {
    position: 'absolute',
    left: width * 0.025,
    width: width * 0.05,
    height: height * 0.025,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: width * 0.025,
    zIndex: 1,
  },
  // input: {
  //   flex: 1,
  //   height: height * 0.05,
  //   paddingLeft: width * 0.075,
  //   marginTop: 10,
  //   marginBottom: 10,
  //   zIndex: 0,
  //   color:'black'
  // },
  input: {
    flex: 1,
    paddingLeft: width * 0.075,
    zIndex: 0,
    color:'black'
  },
  
  forgotPassword: {
    textAlign: 'right',
    marginBottom: height * 0.15,
    marginTop:height * 0.01,
    color:'#434343',
    fontSize: width * 0.0375,
  },
  signInButton: {
    backgroundColor: 'darkblue',
    padding: height * 0.0125,
    alignItems: 'center',
    marginBottom: height * 0.01,
    marginTop: height * 0.51,
    borderRadius: 23,
    position: 'absolute',
    bottom: height * 0.17,
    left: width * 0.04,
    right: width * 0.07,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width:"90%",
    alignSelf:'center'
  },
  signInText: {
    color: 'white',
    fontSize: width * 0.045,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: height * 0.13600,
    left: width * 0.04,
    right: width * 0.04,
  },
  createAccount: {
    textAlign: 'center',
    color:'#7a7776'
  },
  createAccountLink: {
    color: 'darkblue',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: height * 0.230,
  },
  IntialContainer: {
    marginBottom: height * 0.03375,
  }
});

export default LoginScreen;