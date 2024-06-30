import React, {useState, useEffect} from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';
import SplashScreen from 'react-native-splash-screen'
import { View, Text, TouchableOpacity, Image , SafeAreaView, ActivityIndicator} from 'react-native';
import LoginScreen from './components/LoginScreen';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import HomeScreen from './components/HomeScreen';
import CalendarScreen from './components/CalendarScreen';
import InstructionScreen from './components/InstructionScreen';
import UserDetailsScreen from './components/UserDetailsScreen';
import WriteNoteScreen from './components/WriteNoteScreen';
import CollectionScreen from './components/CollectionScreen';
import NotesScreen from './components/NotesScreen';
import CreateMeetingScreen from './components/CreateMeetingScreen';
import FormListScreen2 from './components/FormListScreen2';
import GpayScreen from './components/GpayScreen';
import SettingsScreen from './components/SettingsScreen';
import DrivingTestScreen from './components/DrivingTestScreen';
import DrivingTestFormSection from './components/DrivingTestForm';
import DriveForm2 from './components/DriveForm2';
import DriveForm3 from './components/DriveForm3';
import AddClientScreen from './components/AddClientScreen';
import NewClientScreen from './components/NewClientScreen';
import FormListScreen from './components/FormListScreen';
import FormListScreen3 from './components/FormListScreen3';
import ChangePasswordScreen from './components/ChangePasswordScreen';
import SignupScreen from './components/SignupScreen';
import GetStartedScreen from './components/GetStartedScreen';
import PaymentScreen from './components/PaymentScreen';
import MeetingDetails from './components/MeetingDetails';
import HelpScreen from './components12/HelpScreen';



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

GoogleSignin.configure({
  webClientId: '866393106718-7bf82dgt3ggg6v22tbsv1ad04agchu1g.apps.googleusercontent.com', // your webClientId
});



const Drawer = createDrawerNavigator();
const drawerItems = [
  { name: 'Schedule Meetings', icon: require('./assets/drawercad.png'), target: 'Calendar' },
  { name: 'Notes', icon: require('./assets/notes.png'), target: 'WriteNote' },
  { name: 'Instruction Diagram', icon: require('./assets/unity.png'), target: 'Instruction' },
  { name: 'Driving Test Forms', icon: require('./assets/subscribe.png'), target: 'UserDetailsScreen' },
  { name: 'Help & Support', icon: require('./assets/notes.png'), target: 'HelpScreen' },
  { name: 'Settings', icon: require('./assets/settingsdrawer.png'), target: 'SettingsScreen' },

];

const CustomDrawerContent = (props) => {

  const [userDetails, setUserDetails] = useState({});
  const [userImage, setUserImage] = useState(require('./assets/defaultimg.png'));


  // useEffect(() => {
  //   const user = auth().currentUser;
  //   if (user) {
  //     firestore()
  //       .collection('users')
  //       .doc(user.uid)
  //       .onSnapshot(documentSnapshot => {
  //         if (documentSnapshot.exists) {
  //           const userData = documentSnapshot.data();
  //           setUserDetails(userData);
  //           if (userData.imageUri) {
  //             setUserImage({ uri: userData.imageUri });
  //           }
  //         }
  //       });
  //   }
  // }, []);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        firestore()
          .collection('users')
          .doc(user.uid)
          .onSnapshot(documentSnapshot => {
            if (documentSnapshot.exists) {
              const userData = documentSnapshot.data();
              setUserDetails(userData);
              if (userData.imageUri) {
                setUserImage({ uri: userData.imageUri });
              }
            }
          });
      }
    });
  
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);
  

  const handleLogout = () => {
    auth()
      .signOut()
      .then(async () => {
        console.log('User signed out!');
        await AsyncStorage.setItem('userLoggedIn', 'false');
        props.navigation.navigate('SIGN IN');
      });
  };

  // const handleLogout = async () => {
  //   const user = auth().currentUser;
  //   if (user) {
  //     auth()
  //       .signOut()
  //       .then(async () => {
  //         console.log('User signed out!');
  //         await AsyncStorage.setItem('userLoggedIn', 'false');
  //         props.navigation.navigate('SIGN IN');
  //       });
  //   } else {
  //     console.log('No user is currently signed in');
  //   }
  // };
  

  // const handleLogout = async () => {
  //   auth()
  //     .signOut()
  //     .then(async () => {
  //       console.log('User signed out!');
  //       await AsyncStorage.setItem('userLoggedIn', 'false');
  //       props.navigation.navigate('SIGN IN');
  //     });
  // };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* User Details */}
      {/* <TouchableOpacity onPress={() => props.navigation.navigate('UserScreen')}> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}>
        {/* <Image source={userImage} style={{ width: 50, height: 50, borderRadius: 40 }} /> */}
          <View style={{ marginLeft: 10 }}>
          <Text style={{ fontSize: 19, color: '#0C0B32' }}>{userDetails.firstName} {userDetails.lastName}</Text>
  <Text style={{ fontSize: 11, color: 'gray' }}>{auth().currentUser ? auth().currentUser.email : ''}</Text>
          </View>
        </View>
      {/* </TouchableOpacity> */}
      {/* Drawer Items */}
      <View style={{ marginVertical: 20 }}>
        {drawerItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 25, marginTop:10 }}
            onPress={() => props.navigation.navigate(item.target)}
          >
            <Image source={item.icon} style={{ width: 21, height: 21, marginRight: 15, marginLeft: 12 }} />
            <Text style={{ fontSize: 15, color: '#434343' }}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={{ position: 'absolute', bottom: '15%', left: 0, right: 150, height: 50, justifyContent: 'center', alignItems: 'center', borderRadius: 5, flexDirection: 'row'  }} onPress={handleLogout}>
        <Image source={require('./assets/logout.png')} style={{ width: 20, height: 18, marginRight: 10 }} />
        <Text style={{ fontSize: 15, color: '#434343'  }}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const HomeNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="HomeDrawer" drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="HomeDrawer" component={HomeScreen} options={{ headerShown: false }}  />
    </Drawer.Navigator>
  );
};


const Stack = createStackNavigator();

const API_URL = 'https://04kz46j0-4002.inc1.devtunnels.ms'


const App = () => {


  const [initialRoute, setInitialRoute] = useState('SIGN IN'); // Set initial state to null
  const [isLoading, setIsLoading] = useState(true);
  
  const [isTrialPeriodOver, setIsTrialPeriodOver] = useState(false);


  SplashScreen.hide();

  const [storageLoading, setStorageLoading] = useState(true);

  // const fetchSubscriptionStatus = async (userId) => {
  //   const userRef = firestore().collection('users').doc(userId);
  //   const doc = await userRef.get();
  //   if (!doc.exists) {
  //     console.log('No such document!');
  //   } else {
  //     console.log('Document data:', doc.data());
  //     return doc.data().subscriptionStatus;
  //   }
  // };
  
  // useEffect(() => {
  //   const checkIfLoggedIn = async () => {
  //     try {
  //       setStorageLoading(true);
  //       const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
  //       if (userLoggedIn === 'true') {
  //         const userId = auth().currentUser.uid; // get the current user's id
  //         const userRef = firestore().collection('users').doc(userId);
  //         const doc = await userRef.get();
  //         if (!doc.exists) {
  //           console.log('No such document!');
  //           setInitialRoute('SIGN IN');
  //         } else {
  //           console.log('Document data:', doc.data());
  //           const subscriptionStatus = doc.data().subscriptionStatus;
  //           if (subscriptionStatus === 'active') {
  //             setInitialRoute('Home'); // Change to home screen if user is logged in and subscription is active
  //           } else {
  //             setInitialRoute('GpayScreen'); // If subscription is not active, navigate to payment screen
  //           }
  //         }
  //       } else {
  //         setInitialRoute('SIGN IN');
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setStorageLoading(false);
  //     }
  //   };
  //   checkIfLoggedIn();
  // }, []);
  
  
  
  
  // if (storageLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="darkblue" />
  //     </View>
  //   );
  // }

  const checkSubscriptionStatus = async () => {
   
    setIsLoading(true);
    const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');
    if (userLoggedIn === 'true') {
      const userId = auth().currentUser.uid;
      const userRef = firestore().collection('users').doc(userId);
      const doc = await userRef.get();
      if (doc.exists) {
        const subscriptionId = doc.data().subscriptionId;
        // Fetch subscription status from Stripe using subscriptionId
        const response = await fetch(`${API_URL}/get-subscription-status`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscriptionId: subscriptionId,
          }),
        });
        const { subscriptionStatus } = await response.json();
        if (subscriptionStatus === 'active' || subscriptionStatus === 'trialing') {
          setInitialRoute('Home');
        } else {
          setInitialRoute('Home');
        }
      } else {
        setInitialRoute('SIGN IN');
      }
    } else {
      setInitialRoute('SIGN IN');
    }
    setIsLoading(false);
  };
  


  useEffect(() => {
    checkSubscriptionStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="darkblue" />
      </View>
    );
  }



  
  
  return (
    <StripeProvider 
    publishableKey='pk_test_51P9pziDS51rv9vSETIN8B4jYyFlwGYUGygNrdFQPpq4PGkfn4wAQNVcQodzeymQbiEEGFGKaZTU1ivVLym3d8cZg00NTZl9KAu'
    merchantIdentifier="merchant.com.One2one"
    >
       
    <NavigationContainer>
    
    <Stack.Navigator initialRouteName={initialRoute}>
    <Stack.Screen name="SIGN IN" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="SIGN UP" component={SignupScreen} options={{ headerShown: false }} />
    <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ headerShown: false }} />
    <Stack.Screen name="HelpScreen" component={HelpScreen} options={{ headerShown: false }} />
    <Stack.Screen name="PaymentScreen" component={PaymentScreen} options={{ headerShown: false }} />
    <Stack.Screen name="WriteNote" component={WriteNoteScreen} options={{ headerShown: false }} />
    <Stack.Screen name="MeetingDetails" component={MeetingDetails} options={{ headerShown: false }} />
    <Stack.Screen name="UserDetailsScreen" component={UserDetailsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Instruction" component={InstructionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Calendar" component={CalendarScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CollectionScreen" component={CollectionScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Notes" component={NotesScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="NewClient" component={NewClientScreen} options={{ headerShown: false }} />
    <Stack.Screen name="AddClient" component={AddClientScreen} options={{ headerShown: false }} />
    <Stack.Screen name="DriveForm2" component={DriveForm2} options={{ headerShown: false }} />
    <Stack.Screen name="DriveForm3" component={DriveForm3} options={{ headerShown: false }} />
    <Stack.Screen name="DrivingTestForm" component={DrivingTestFormSection} options={{ headerShown: false }} />
    <Stack.Screen name="DrivingTest" component={DrivingTestScreen} options={{ headerShown: false }} />
    <Stack.Screen name="GpayScreen" component={GpayScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FormList2" component={FormListScreen2} options={{ headerShown: false }} />
    <Stack.Screen name="FormList" component={FormListScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FormList3" component={FormListScreen3} options={{ headerShown: false }} />
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CreateMeetings" component={CreateMeetingScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

    </StripeProvider>
  );
};
// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// export default function App() {
//   return (
//     <View style={{flex:1, marginTop:20}}>
//       <Text>App</Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({})
export default App;