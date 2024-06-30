import React, { useState, useEffect, PermissionsAndroid } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Button, Image, BackHandler, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';


  
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const FormListScreen = ({ navigation }) => {

  const [forms, setForms] = useState([]);
  const route = useRoute();
  const [selectedForm, setSelectedForm] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('Form List 2');
  const formListOptions = ['Form List 1', 'Form List 2', 'Form List 3'];

  

  const convertCamelCaseToReadable = (str) => {
    // Insert a space before all caps
    str = str.replace(/([A-Z])/g, ' $1');

    // Uppercase the first character
    return str.replace(/^./, str[0].toUpperCase());
  };


  // const createPDF = async (formData) => {
  //   let options = {
  //     html: `
  //       <html>
  //         <head>
  //           <style>
  //             body { 
  //               font-family: Arial, sans-serif; 
  //               background-color: #ffedf9; /* light pink background */
  //               color: #424242; /* dark grey text */
  //               font-size: 28px; /* larger font size */
  //               text-align: left; /* left alignment */
  //               display: flex;
  //               justify-content: center;
  //               flex-direction: column;
  //               align-items: flex-start;
  //               align-self: center,
                
  //             }
  //             h1 { 
  //               color: #000000; /* dark black */
  //               margin-bottom: 50px; /* space below the title */

  //             }
  //             p { 
  //               color: #424242; /* dark grey */
  //               margin: 20px 0; /* vertical spacing between paragraphs */
  //             }
  //             .label { 
  //               font-weight: bold; 
  //               color: #000000; /* dark black */
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>Driving Test Form-2 Submission</h1>
  //           ${Object.entries(formData).map(([key, value]) => {
  //             if (typeof value === 'object' && value !== null) {
  //               return `<p class="label">${convertCamelCaseToReadable(key)}:</p><p>${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
  //             } else {
  //               return `<p><strong class="label">${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
  //             }
  //           }).join('')}
  //         </body>
  //       </html>`,
  //     fileName: 'Driving Test Form-2 Submission',
  //     directory: 'Documents',
  //   };
  
  //   try {
  //     const file = await RNHTMLtoPDF.convert(options);
  //     console.log(file.filePath);
  
  //     await FileViewer.open(file.filePath);
  //     console.log('PDF opened successfully');
  //   } catch (error) {
  //     console.error('Error occurred while creating or opening the PDF: ', error);
  //   }
  // };
  
  const createPDF = async (formData) => {
    let options = {
      html: `
        <html>
          <head>
            <style>
              body { 
                font-family: Arial, sans-serif; 
                background-color: #ffedf9; /* light pink background */
                color: #424242; /* dark grey text */
                font-size: 28px; /* larger font size */
                text-align: left; /* left alignment */
                display: flex;
                justify-content: center;
                flex-direction: column;
                align-items: flex-start;
                align-self: center,
              }
              h1 { 
                color: #000000; /* dark black */
                margin-bottom: 50px; /* space below the title */
              }
              p { 
                color: #424242; /* dark grey */
                margin: 20px 0; /* vertical spacing between paragraphs */
              }
              .label { 
                font-weight: bold; 
                color: #000000; /* dark black */
              }
            </style>
          </head>
          <body>
            <h1>Driving Test Form-2 Submission</h1>
            ${formData.map(([key, value]) => {
              if (typeof value === 'object' && value !== null) {
                return `<p class="label">${convertCamelCaseToReadable(key)}:</p><p>${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
              } else {
                return `<p><strong class="label">${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
              }
            }).join('')}
          </body>
        </html>`,
      fileName: 'Driving Test Form-2 Submission',
      directory: 'Documents',
    };
  
    try {
      const file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath);
  
      await FileViewer.open(file.filePath);
      console.log('PDF opened successfully');
    } catch (error) {
      console.error('Error occurred while creating or opening the PDF: ', error);
    }
  };
  

  // const createPDF = async (formData) => {
  //   let options = {
  //     html: '<h1>Form Data</h1>' + Object.entries(formData).map(([key, value]) => `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`).join(''),
  //     fileName: 'FormData',
  //     directory: 'Documents',
  //   };

  //   try {
  //     const file = await RNHTMLtoPDF.convert(options);
  //     console.log(file.filePath);

  //     await FileViewer.open(file.filePath);
  //     console.log('PDF opened successfully');
  //   } catch (error) {
  //     console.error('Error occurred while creating or opening the PDF: ', error);
  //   }
  // };

  // const createPDF = async (formData) => {
  //   let options = {
  //     html: `
  //       <html>
  //         <head>
  //           <style>
  //             body { font-family: Arial, sans-serif; }
  //             h1 { color: #333; }
  //             p { color: #666; }
  //             .header { background-color: #f8f8f8; padding: 10px; text-align: center; }
  //             .label { font-weight: bold; }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>Form Data</h1>
  //           ${Object.entries(formData).map(([key, value]) => {
  //             if (typeof value === 'object' && value !== null) {
  //               return `<p class="label">${convertCamelCaseToReadable(key)}:</p><p>${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
  //             } else {
  //               return `<p><strong class="label">${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
  //             }
  //           }).join('')}
  //         </body>
  //       </html>`,
  //     fileName: 'FormData',
  //     directory: 'Documents',
  //   };
  
  //   try {
  //     const file = await RNHTMLtoPDF.convert(options);
  //     console.log(file.filePath);
  
  //     await FileViewer.open(file.filePath);
  //     console.log('PDF opened successfully');
  //   } catch (error) {
  //     console.error('Error occurred while creating or opening the PDF: ', error);
  //   }
  // };
  
  // const createPDF = async (formData) => {
  //   let options = {
  //     html: `
  //       <html>
  //         <head>
  //           <style>
  //             body { 
  //               font-family: Arial, sans-serif; 
  //               background-color: #FFEBEE; /* light pink background */
  //               color: #424242; /* dark grey text */
  //               font-size: 18px; /* larger font size */
  //               text-align: center; /* center alignment */
  //             }
  //             h1 { 
  //               color: #880E4F; /* deep pink */
  //               margin-bottom: 50px; /* space below the title */
  //             }
  //             p { 
  //               color: #424242; /* dark grey */
  //               margin: 20px 0; /* vertical spacing between paragraphs */
  //             }
  //             .label { 
  //               font-weight: bold; 
  //               color: #311B92; /* indigo */
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <h1>Form Data</h1>
  //           ${Object.entries(formData).map(([key, value]) => {
  //             if (typeof value === 'object' && value !== null) {
  //               return `<p class="label">${convertCamelCaseToReadable(key)}:</p><p>${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
  //             } else {
  //               return `<p><strong class="label">${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
  //             }
  //           }).join('')}
  //         </body>
  //       </html>`,
  //     fileName: 'FormData',
  //     directory: 'Documents',
  //   };
  
  //   try {
  //     const file = await RNHTMLtoPDF.convert(options);
  //     console.log(file.filePath);
  
  //     await FileViewer.open(file.filePath);
  //     console.log('PDF opened successfully');
  //   } catch (error) {
  //     console.error('Error occurred while creating or opening the PDF: ', error);
  //   }
  // };
  

  // const createPDF = async (formData) => {
  //   let options = {
  //     html: '<h1>Form Data</h1>' + Object.entries(formData).map(([key, value]) => {
  //       if (typeof value === 'object' && value !== null) {
  //         // If the value is an object, convert its properties to strings
  //         return `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${Object.entries(value).map(([subKey, subValue]) => `${convertCamelCaseToReadable(subKey)}: ${subValue}`).join(', ')}</p>`;
  //       } else {
  //         return `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`;
  //       }
  //     }).join(''),
  //     fileName: 'FormData',
  //     directory: 'Documents',
  //   };
  
  //   try {
  //     const file = await RNHTMLtoPDF.convert(options);
  //     console.log(file.filePath);
  
  //     await FileViewer.open(file.filePath);
  //     console.log('PDF opened successfully');
  //   } catch (error) {
  //     console.error('Error occurred while creating or opening the PDF: ', error);
  //   }
  // };
  

  // useEffect(() => {
  //   const unsubscribe = firestore()
  //     .collection('driveForm2')
  //     .onSnapshot(querySnapshot => {
  //       const forms = querySnapshot.docs.map(doc => {
  //         const data = doc.data();
  //         return { id: doc.id, name: data.userName, formData: data };
  //       });
  //       setForms(forms);
  //     });

  //   return () => unsubscribe();
  // }, [route.params?.forceRefresh]); // Add this line
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('driveForm2')
      .onSnapshot(querySnapshot => {
        const forms = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return { id: doc.id, name: data.name, formData: data.formData, fieldOrder: data.fieldOrder };
        });
        setForms(forms);
      });
  
    return () => unsubscribe();
  }, [route.params?.forceRefresh]); // Add this line

  // const handleFormDownload = (form) => {
  //   createPDF(form.formData);
  // };

  const handleFormDownload = (item) => {
    const { formData, fieldOrder } = item;
    const formDataArray = fieldOrder.map(key => [key, formData[key]]);
    createPDF(formDataArray);
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate('Home'); // Navigate to 'Home' screen if back button is pressed
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  const requestStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: "Storage Permission",
          message: "This app needs access to your storage to download PDFs.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can save files");
      } else {
        console.log("Storage permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}> Driving Test Form Submissions</Text>
      <View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList2')}>
    <Text style={styles.selectionText}>Form-1 List</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList')}>
    <Text style={styles.selectionText}>Form-2 List</Text>
  </TouchableOpacity>
  <TouchableOpacity style={styles.selectionBtn} onPress={() => navigation.navigate('FormList3')}>
    <Text style={styles.selectionText}>Form-3 List</Text>
  </TouchableOpacity>
</View>

      <View style={styles.tableHeader}>
        
        <Text style={styles.headerCellMain}>Driving Test Form-2 Submissions</Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell1}>S. No.</Text>
        <Text style={styles.headerCell2}>Client Name</Text>
        <Text style={styles.headerCell}>Download</Text>
      </View>
      <FlatList
        data={forms}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            <Text style={styles.cell}>{index + 1}</Text>
            <Text style={styles.cell}>{item.name}</Text>
            <TouchableOpacity style={styles.downloadButton} onPress={() => handleFormDownload(item)}>
              <Image source={require('../assets/downloadicon.png')} style={styles.downloadIcon} />
            </TouchableOpacity>

          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.04, // 16/400
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: windowWidth * 0.055, // 22/400
    fontWeight: 'bold',
    marginBottom: windowHeight * 0.018, // 16/900
    textAlign: 'center',
    color: '#000080',
  },
  tableHeader: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.009, // 8/900
    paddingBottom: windowHeight * 0.009, // 8/900
    borderBottomWidth: windowHeight * 0.001, // 1/900
    borderBottomColor: '#ddd',
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black'
  },
  headerCell1: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    marginRight: windowWidth * 0.125, // 50/400
  },
  headerCell2: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color:'black',
    marginRight: windowWidth * 0.1125, // 45/400
  },
  row: {
    flexDirection: 'row',
    marginBottom: windowHeight * 0.018, // 16/900
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: windowHeight * 0.0055, // 5/900
    padding: windowHeight * 0.011, // 10/900
    borderBottomWidth: windowHeight * 0.001, // 1/900
    borderBottomColor: '#ddd',
  },
  headerCellMain:{
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontSize: windowWidth * 0.0425, // 17/400
    marginBottom: windowHeight * 0.0044, // 4/900
  },
  cell: {
    flex: 1,
    textAlign: 'left',
    color:'black'
  },
  downloadButton: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  downloadIcon: {
    width: windowWidth * 0.06, // 24/400
    height: windowHeight * 0.0266, // 24/900
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowHeight * 0.0244, // 22/900
  },
  modalView: {
    margin: windowHeight * 0.0222, // 20/900
    width: windowWidth * 0.9, // 90% of window width
    backgroundColor: 'white',
    borderRadius: windowHeight * 0.0222, // 20/900
    padding: windowHeight * 0.0388, // 35/900
    alignItems: 'center',
    shadowColor: 'gray',
    shadowOffset: {
      width: 0,
      height: windowHeight * 0.0011, // 1/900
    },
    shadowOpacity: 0.25,
    shadowRadius: windowHeight * 0.0044, // 4/900
    elevation: windowHeight * 0.0055, // 5/900
  },
  modalText: {
    marginBottom: windowHeight * 0.0166, // 15/900
    textAlign: 'center',
    fontSize: windowWidth * 0.05, // 20/400
    fontWeight: 'bold',
  },
  downloadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: windowHeight * 0.011, // 10/900
    borderBottomWidth: windowHeight * 0.0011, // 1/900
    borderBottomColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowHeight * 0.0177, // 16/900
  },
  downloadOptionText: {
    marginLeft: windowWidth * 0.025, // 10/400
    color:'black',
  },
  centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: windowHeight * 0.0244, // 22/900
  },
  modalView: {
      margin: windowHeight * 0.0222, // 20/900
      backgroundColor: "white",
      borderRadius: windowHeight * 0.0222, // 20/900
      padding: windowHeight * 0.0388, // 35/900
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: windowHeight * 0.0022, // 2/900
      },
      shadowOpacity: 0.25,
      shadowRadius: windowHeight * 0.0044, // 4/900
      elevation: windowHeight * 0.0055, // 5/900
      opacity: 0.95
  },
  modalText: {
      marginBottom: windowHeight * 0.0166, // 15/900
      textAlign: "center",
      fontSize: windowWidth * 0.0375, // 15/400
      color:'black'
  },
  selectionBtn: {
    padding: windowHeight * 0.0077, // 7/900
    borderRadius: windowHeight * 0.0222, // 20/900
    borderWidth:0.4,
    alignItems: 'center',
    marginTop: windowHeight * 0.0055, // 5/900
    width: windowWidth * 0.3, // 30% of window width
  
},
  selectionText: {
      color: '#000000', // White text
      fontSize: windowWidth * 0.035, // 14/400
      fontWeight:'bold'
  },
});

export default FormListScreen;