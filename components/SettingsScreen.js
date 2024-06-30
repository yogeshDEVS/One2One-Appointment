import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Modal, Alert } from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SettingsScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePasswordChange = () => {
    // Navigate to the Change Password screen
    navigation.navigate('ChangePassword');
  };

  const handleAccountDeletion = async () => {
    const user = firebase.auth().currentUser;
    try {
      await user.delete();
      console.log('User account deleted!');
      navigation.navigate('SIGN IN');
    } catch (error) {
      console.error('Error deleting user account: ', error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.intro}>Manage your account settings</Text>
      <Text style={styles.description}>Here you can change your password or delete your account. Please note that deleting your account is irreversible and will result in the loss of all your data.</Text>
      <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure you want to delete your account? This action cannot be undone.</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleAccountDeletion}>
                <Text style={styles.textStyle}>Yes, Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={closeModal}>
                <Text style={styles.textStyle}>No, Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: windowWidth * 0.087,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: windowHeight * 0.018,
    alignSelf: 'center',
  },
  intro: {
    fontSize: windowWidth * 0.048,
    color: 'black',
    marginBottom: windowHeight * 0.05,
    alignSelf: 'center',
  },
  description: {
    fontSize: windowWidth * 0.0375,
    color: 'gray',
    marginBottom: windowHeight * 0.05,
    alignSelf: 'center',
  },
  button: {
    padding: windowHeight * 0.015,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color:'black',
    fontSize: 17,
    fontWeight:'bold'
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  buttonClose: {
    backgroundColor: "white",
    width: '45%',
  },
  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default SettingsScreen;