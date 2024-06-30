import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions ,TextInput, Animated, Easing, KeyboardAvoidingView, Platform, ScrollView, SafeAreaView} from 'react-native';
import { RichEditor, RichToolbar } from 'react-native-pell-rich-editor';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const WriteNoteScreen = () => {
  const richText = useRef(); // Reference to the RichEditor
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const navigation = useNavigation();

  const handleSaveNote = async () => {
    try {
      const text = await richText.current.getContentHtml(); // Get the rich text content
      const userId = auth().currentUser.uid;
      const noteRef = await firestore()
        .collection('users')
        .doc(userId)
        .collection('notes')
        .add({
          title: title,
          subtitle: subtitle,
          text: text,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });

      console.log('Note added!');
      setTimeout(async () => {
        try {
          const noteSnapshot = await noteRef.get();
          const noteData = noteSnapshot.data();
          if (noteData && noteData.createdAt) {
            navigation.replace('CollectionScreen', { title, subtitle, text, noteId: noteRef.id, createdAt: noteData.createdAt });
          } else {
            console.log('Timestamp not yet available');
          }
        } catch (error) {
          console.error('Error fetching note data:', error);
        }
      }, 1000); // Delay for 1 second
    } catch (error) {
      console.error('Error saving note:', error);
      // Handle error appropriately here
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -500} // adjust as needed
    >
      <SafeAreaView>
        <ScrollView keyboardShouldPersistTaps='always'>
          <Text style={styles.header}>Write Note</Text>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} placeholder="Enter title" value={title} onChangeText={setTitle} />
          <Text style={styles.label}>Subtitle</Text>
          <TextInput style={styles.input} placeholder="Enter subtitle" value={subtitle} onChangeText={setSubtitle} />
          <Text style={styles.label}>Text</Text>
          <View style={styles.richInputContainer}>
            <RichEditor
              style={{ color: 'black' }}
              ref={richText}
              placeholder="Type here..."
              useContainer={false}
            />
          </View>
          <RichToolbar editor={richText} />
          <TouchableOpacity style={styles.saveButton} onPress={handleSaveNote}>
            <Text style={styles.saveButtonText}>SAVE NOTE</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: width * 0.05, // 5% of screen width
    backgroundColor: '#fff',
  },
 
  header: {
    fontSize: width * 0.049, // 4.25% of screen width
    alignSelf: 'center',
    color: '#434343',
    marginBottom: height * 0.02, // 26% of screen height
  },
  label: {
    fontSize: width * 0.045, // 4.5% of screen width
    marginBottom: height * 0.01, // 1% of screen height
    color: '#434343',
  },
  input: {
    // height: height * 0.05, // 5% of screen height
    borderBottomWidth: 2, // Increased border width
    borderColor: 'darkblue', // Changed border color to dark blue
    // marginBottom: height * 0.02, // 2% of screen height
    // paddingLeft: width * 0.025, // 2.5% of screen width
    flex: 1,
    paddingLeft: width * 0.075,
    zIndex: 0,
    color:'black', 
    marginBottom: 15,

    
  },
  saveButton: {
    height: height * 0.05, // 5% of screen height
    width: width * 0.85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'darkblue', // Changed to dark blue
    alignSelf:'center',
    marginTop: height * 0.02,
    shadowColor: '#000', // Added shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
  },
  saveButtonText: {
    color: '#fff',
    fontSize: width * 0.04, // 4% of screen width
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: width * 0.043, 
    alignSelf:'center',
    color:'#434343',
    marginRight: width * 0.305,
  },
  richInputContainer: {
    height: height * 0.32, // 80% of screen height
    borderBottomWidth: 2, // Increased border width
    borderColor: 'darkblue', // Changed border color to dark blue
    // marginBottom: height * 0.02, // 2% of screen height
    // paddingLeft: width * 0.025, // 2.5% of screen width
    flex: 1,
    paddingLeft: width * 0.075,
    zIndex: 0,
    color:'black'
  },
  promptContainer: {
    position: 'absolute',
    top: height * 0.85,
     // 15% from the bottom
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  promptText: {
    fontSize: width * 0.04, // 3% of screen width
    color: 'black',
  },
  
});

export default WriteNoteScreen;