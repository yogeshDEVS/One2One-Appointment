import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(null);

  const handleChangePassword = async () => {
    const user = firebase.auth().currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    try {
      await user.reauthenticateWithCredential(credential);
      setPasswordMatch(true);
      await user.updatePassword(newPassword);
      Alert.alert('Password changed successfully');
    } catch (error) {
      setPasswordMatch(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.intro}>Here you can change your password. Please enter your current password and your new password.</Text>
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        placeholder='Enter current password'
      />
      {passwordMatch === false && <Text style={styles.error}>Incorrect password</Text>}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        placeholder='Enter new password'
      />
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: windowWidth * 0.05,
  },
  title: {
    fontSize: windowWidth * 0.070,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowHeight * 0.018,
    alignSelf: 'center',
  },
  intro: {
    fontSize: windowWidth * 0.040,
    color: 'gray',
    marginBottom: windowHeight * 0.05,
    alignSelf: 'center',
  },
  label: {
    fontSize: windowWidth * 0.0399,
    color: 'black',
    marginBottom: windowHeight * 0.01,
    fontWeight:'bold'
  },
  input: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#00008B',
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00008B',
    padding: 15,
    borderRadius: 5,
    marginBottom: windowHeight * 0.04,
    borderWidth: 2,
    borderColor: '#00008B',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: windowHeight * 0.002 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#00008B',
    fontSize: windowWidth * 0.045,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
});

export default ChangePasswordScreen;