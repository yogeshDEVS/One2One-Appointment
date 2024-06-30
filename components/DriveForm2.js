import React,{useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Image, TouchableOpacity, PermissionsAndroid,} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { SafeAreaView } from 'react-native-safe-area-context';

const DriveForm2 = ({ navigation, route }) => {
  const [formData, setFormData] = useState({});
  const [candidateName, setCandidateName] = useState('');
  const [PRN, setPRN] = useState('');
  const [scoreForLessonPlanning, setScoreForLessonPlanning] = useState('');
  const [scoreForRiskManagement,setScoreForRiskManagement] = useState('');
  const [scoreForTeachingStrategies,setScoreForTeachingStrategies] = useState('');
  const [InsuranceDeclaration, setInsuranceDeclaration] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [outcome, setOutcome] = useState('');
  const [RegNo, setRegNo] = useState('');
  const [trainerPRN, setTrainerPRN] = useState('');
  const [isSelected, setSelection] = React.useState(false);
  const [competence, setCompetence] = React.useState(null);
  const [isOrditSelected, setOrditSelected] = useState(false);
  const [isDualControlsSelected, setDualControlsSelection] = useState(false);
  const [isLogBookSelected, setLogBookSelection] = useState(false);
  const [DualControl, setDualControl] = useState(null);
  const [isTraineeLicenceSelected, setTraineeLicenceSelection] = useState(false);
  // const [accompaniment, setAccompaniment] = useState({
  //   QA: false,
  //   Trainer: false,
  //   Other: false,
  // });
  const [logBook, setLogBook] = useState(null);
  const [traineeLicence, setTraineeLicence] = useState(null);
  const [ordit, setOrdit] = useState(null);
  const [accompaniment, setAccompaniment] = useState(null);
  const [didCandidateScoredSevenOrLessOnRiskManagement, setdidCandidateScoredSevenOrLessOnRiskManagement] = useState(null);
  const [immediateDangerCondition, setImmediateDangerCondition] = useState(null);
  const [wasAdviceGiven, setWasAdviceGiven] = useState(null);
  
  const { name, email , formNumber } = route.params;

  const convertCamelCaseToReadable = (str) => {
    // Insert a space before all caps
    str = str.replace(/([A-Z])/g, ' $1');
    
    // Uppercase the first character
    return str.replace(/^./, str[0].toUpperCase());
  };

  // const handleSubmit = async () => {
  //   console.log('driveForm2: ', name); // Add this line
  //    // Get the selected lesson option
  //  const selectedLessonOption = Object.keys(studentSelections).find(key => studentSelections[key] === true);

  //    // Get the selected lesson themes
  // const selectedLessonThemes = Object.keys(lessonThemeSelections).filter(key => lessonThemeSelections[key] === true);


  //   const formData = {
  //     userName: name,
  //     userEmail: email,
  //     formNumber: formNumber,
  //     candidateName,
  //     ...accompaniment, // spread the accompaniment object here
  //     PRN,
  //     InsuranceDeclaration,
  //     location,
  //     date,
  //     outcome,
  //     isDualControlsSelected,
  //     RegNo,
  //     isLogBookSelected,
  //     trainerPRN,
  //     isTraineeLicenceSelected,
  //     isOrditSelected,
  //     isRiskManagementScoreLow,
  //     isImmediateDanger,
  //     isSelected,
  //     competence,
  //     isDualControlsSelected,
  //     isLogBookSelected,
  //     isTraineeLicenceSelected,
    
  //     lessonOptionSelected: selectedLessonOption, // store the selected lesson option here
  //     lessonThemesSelected: selectedLessonThemes, // store the selected lesson themes here
  //     isAdviceGiven,
  //     didTheTrainerIdentifyThePupilLearningGoalsAndNeeds,
  //     wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility,
  //     practiceAreasCompetence,
  //     lessonPlanCompetence,
  //     lessonPlanningScore,
  //     isLessonPlanningScoreChecked,
  //     responsibilityForRiskScore,
  //     directionsAndInstructionsCompetence,
  //     awarenessOfSurroundingsCompetence,
  //     interventionCompetence,
  //     feedbackCompetence,
  //     riskManagementScoreCheckbox,
  //     riskManagementScoreForLesson,
  //     teachingStyleCompetence,
  //     problemAnalysisCompetence,
  //     clarifyLearningOutcomesCompetence,
  //     technicalInformationCompetence,
  //     feedbackDuringSessionCompetence,
  //     pupilQueriesCompetence,
  //     pupilReflectionCompetence,
  //     teachingStrategiesScoreCheckbox,
  //     teachingStrategiesScore,
  //     isAdviceGiven,
  //     feedbackToCandidate,
  //     examinerName,
  //     signature,
  //   };
  //   const fieldOrder = Object.keys(formData); // This gets the order of the fields
  //   try {
  //     await firebase.firestore().collection('driveForm2').add({ name, formData, fieldOrder });
  //     console.log('Form data successfully written!');
  //     navigation.navigate('FormList', { forceRefresh: true }); // Navigate to FormListScreen
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // };
  const handleSubmit = async () => {
    console.log('driveForm2: ', name); // Add this line
    // // Get the selected lesson option
    // const selectedLessonOption = Object.keys(studentSelections).find(key => studentSelections[key] === true);
  
    // // Get the selected lesson themes
    // const selectedLessonThemes = Object.keys(lessonThemeSelections).filter(key => lessonThemeSelections[key] === true);

      // Get the selected lesson option
  const selectedLessonOption = Object.keys(studentSelections).filter(key => studentSelections[key] === true);
  
  // Get the selected lesson themes
  const selectedLessonThemes = Object.keys(lessonThemeSelections).filter(key => lessonThemeSelections[key] === true);
  
    const formData = {
      userName: name,
      userEmail: email,
      candidateName: candidateName,
      PRN: PRN,
      InsuranceDeclaration: InsuranceDeclaration,
      location: location,
      date: date,
      outcome: outcome,
      DualControl: DualControl,
      RegNo: RegNo,
      LogBook: logBook,
      trainerPRN: trainerPRN,
      TraineeLicence: traineeLicence,
      Ordit: ordit,
      Accompanied: accompaniment,
      lessonOptionSelected: selectedLessonOption, // store the selected lesson option here
     lessonThemesSelected: selectedLessonThemes, // store the selected lesson themes here
      
      didTheTrainerIdentifyThePupilLearningGoalsAndNeeds: didTheTrainerIdentifyThePupilLearningGoalsAndNeeds,
      wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility: wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility,
      practiceAreasCompetence: practiceAreasCompetence,
      lessonPlanAdaptabilityCompetence:lessonPlanAdaptabilityCompetence,
      scoreForLessonPlanning:scoreForLessonPlanning,
      lessonPlanCompetence: lessonPlanCompetence,
      responsibilityForRiskScore: responsibilityForRiskScore,
      directionsAndInstructionsCompetence: directionsAndInstructionsCompetence,
      awarenessOfSurroundingsCompetence: awarenessOfSurroundingsCompetence,
      interventionCompetence: interventionCompetence,
      feedbackCompetence: feedbackCompetence,
      scoreForRiskManagement:scoreForRiskManagement,
      riskManagementCompetence:riskManagementCompetence,
      teachingStyleCompetence: teachingStyleCompetence,
      problemAnalysisCompetence: problemAnalysisCompetence,
      clarifyLearningOutcomesCompetence: clarifyLearningOutcomesCompetence,
      technicalInformationCompetence: technicalInformationCompetence,
      feedbackDuringSessionCompetence: feedbackDuringSessionCompetence,
      pupilQueriesCompetence: pupilQueriesCompetence,
      pupilReflectionCompetence: pupilReflectionCompetence,
      scoreForTeachingStrategies:scoreForTeachingStrategies,
      teachingStrategiesScore: teachingStrategiesScore,
      teachingStrategiesCompetence:teachingStrategiesCompetence,
      overallScore:overallScore,
      overallCompetence:overallCompetence,
      didCandidateScoredSevenOrLessOnRiskManagement: didCandidateScoredSevenOrLessOnRiskManagement,
      immediateDangerCondition: immediateDangerCondition,
      wasAdviceGiven: wasAdviceGiven,
      feedbackToCandidate: feedbackToCandidate,
      examinerName: examinerName,
      signature: signature,
      
    };
    const fieldOrder = Object.keys(formData); // This gets the order of the fields
    try {
      await firebase.firestore().collection('driveForm2').add({ name, formData, fieldOrder });
      console.log('Form data successfully written!');
      navigation.navigate('FormList', { forceRefresh: true }); // Navigate to FormListScreen
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };
  
  //   try {
  //     await firebase.firestore().collection('driveForm2').add(formData);
  //     console.log('Form data successfully written!');
  //     navigation.navigate('FormList', { forceRefresh: true }); // Navigate to FormListScreen
  //   } catch (error) {
  //     console.error('Error writing document: ', error);
  //   }
  // };

  const createPDF = async (formData) => {
    let options = {
      html: '<h1>Form Data</h1>' + Object.entries(formData).map(([key, value]) => `<p><strong>${convertCamelCaseToReadable(key)}:</strong> ${value}</p>`).join(''),
      fileName: 'FormData',
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
   
  const [studentSelections, setStudentSelections] = useState({
    Beginner: false,
    'Partly trained': false,
    Trained: false,
    'FLH New': false,
    'FLH Experienced': false,
  });

  

  const [lessonThemeSelections, setLessonThemeSelections] = useState({
    Junctions: false,
    'Town & city driving': false,
    'Interaction with other road users': false,
    'Dual carriageway / faster moving roads': false,
    'Defensive Driving': false,
    'Effective use of Mirrors': false,
    'Independent driving': false,
    'Rural roads': false,
    'Motorways': false,
    'Eco-safe driving': false,
    'Recap a manoeuvre': false,
    'Commentary': false,
    'Recap Emergency stop': false,
    'Other': false,
  });

  const [isRiskManagementScoreLow, setRiskManagementScore] = useState(false);
  const [isImmediateDanger, setImmediateDanger] = useState(false);
  const [isAdviceGiven, setAdviceGiven] = useState(false);

  const [didTheTrainerIdentifyThePupilLearningGoalsAndNeeds, setDidTheTrainerIdentifyThePupilLearningGoalsAndNeeds] = useState('0');
  const [wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility, setWasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility] = useState('0');

  const [practiceAreasCompetence, setPracticeAreasCompetence] = useState('0');
  const [lessonPlanCompetence, setLessonPlanCompetence] = useState('0');
  const [lessonPlanAdaptabilityCompetence, setLessonPlanAdaptabilityCompetence ] = useState('0');


  const [lessonPlanningCompetence, setLessonPlanningCompetence] = useState('0');
  const [riskManagementCompetence,setRiskManagementCompetence] = useState('0');
  const [teachingStrategiesCompetence,setTeachingStrategiesCompetence] = useState('0');
  const [overallCompetence, setOverallCompetence] = useState('0');

  const [isLessonPlanningScoreChecked, setLessonPlanningScoreChecked] = useState(false);
 

  const [responsibilityForRiskScore, setResponsibilityForRiskScore] = useState('0');
  const [directionsAndInstructionsCompetence, setDirectionsAndInstructionsCompetence] = useState('0');
  const [awarenessOfSurroundingsCompetence, setAwarenessOfSurroundingsCompetence] = useState('0');
  const [interventionCompetence, setInterventionCompetence] = useState('0');
  
  const [feedbackCompetence, setFeedbackCompetence] = useState('0');
  const [riskManagementScoreCheckbox, setRiskManagementScoreCheckbox] = useState(false);
  const [riskManagementScoreForLesson, setRiskManagementScoreForLesson] = useState('0');

  const [teachingStyleCompetence, setTeachingStyleCompetence] = useState('0');
  const [problemAnalysisCompetence, setProblemAnalysisCompetence] = useState('0');

  const [clarifyLearningOutcomesCompetence, setClarifyLearningOutcomesCompetence] = useState('0');
  const [technicalInformationCompetence, setTechnicalInformationCompetence] = useState('0');

  const [feedbackDuringSessionCompetence, setFeedbackDuringSessionCompetence] = useState('0');
  const [pupilQueriesCompetence, setPupilQueriesCompetence] = useState('0');

  const [pupilReflectionCompetence, setPupilReflectionCompetence] = useState('0');
  const [teachingStrategiesScoreCheckbox, setTeachingStrategiesScoreCheckbox] = useState(false);
  const [teachingStrategiesScore, setTeachingStrategiesScore] = useState('0');

  const [overallScoreCheckbox, setOverallScoreCheckbox] = useState(false);
  

  const [feedbackToCandidate, setFeedbackToCandidate] = useState('');
  const [examinerName, setExaminerName] = useState('');
  const [signature, setSignature] = useState('');
  const [overallScore,setOverallScore] = useState('');

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
  
    <View style={styles.titleContainer}>
  <Image source={require('../assets/logoform.png')} style={styles.logo} />
  <Text style={styles.title}>ADI Part 3 (SC)</Text>
</View>

      <View style={styles.headerContainer}>
        <Text style={styles.header}>INFORMATION</Text>
      </View>
      <TextInput style={styles.input} placeholder="Candidate’s name" onChangeText={text => setCandidateName(text)} />
      <TextInput style={styles.input} placeholder="PRN" onChangeText={setPRN} />
      <Text style={styles.text}>I declare that my use of the test vehicle for the purposes of the test is covered by a valid policy of insurance which satisfies the requirements of relevant legislation.</Text>
      
      <TextInput style={styles.emptyBox} onChangeText={setInsuranceDeclaration} />
      <TextInput style={styles.input} placeholder="Location"  onChangeText={setLocation}  />
      <TextInput style={styles.input} placeholder="Date"   onChangeText={setDate}/>
      <TextInput style={styles.input} placeholder="Outcome"   onChangeText={setOutcome} />
      <View style={styles.row}>
  <Text style={styles.text}>Dual Controls: </Text>
  <Text style={styles.text}>Yes</Text>
  <CheckBox
    value={DualControl === 'Yes'}
    onValueChange={() => setDualControl('Yes')}
    style={styles.checkbox}
  />
   <Text style={styles.text}>No</Text>
  <CheckBox
    value={DualControl === 'No'}
    onValueChange={() => setDualControl('No')}
    style={styles.checkbox}
  />
 
</View>
      <TextInput style={styles.input} placeholder="Reg No" onChangeText={setRegNo}/>
      <View style={styles.row}>
  <Text style={styles.text}>Log book: </Text>
  <Text style={styles.text}>Yes</Text>
  <CheckBox
    value={logBook === 'Yes'}
    onValueChange={() => setLogBook('Yes')}
    style={styles.checkbox}
  />
   <Text style={styles.text}>No</Text>
  <CheckBox
    value={logBook === 'No'}
    onValueChange={() => setLogBook('No')}
    style={styles.checkbox}
  />
 
</View>
      <TextInput style={styles.input} placeholder="Trainer PRN" onChangeText={setTrainerPRN}  />
      <View style={styles.row}>
  <Text style={styles.text}>Trainee Licence: </Text>
  <Text style={styles.text}>Yes</Text>
  <CheckBox
    value={traineeLicence === 'Yes'}
    onValueChange={() => setTraineeLicence('Yes')}
    style={styles.checkbox}
  />
  <Text style={styles.text}>No</Text>
  <CheckBox
    value={traineeLicence === 'No'}
    onValueChange={() => setTraineeLicence('No')}
    style={styles.checkbox}
  />
  
</View>
<View style={styles.row}>
  <Text style={styles.text}>ORDIT:</Text>
  <Text style={styles.text}>Yes</Text>
  <CheckBox
    value={ordit === 'Yes'}
    onValueChange={() => setOrdit('Yes')}
    style={styles.checkbox}
  />
  <Text style={styles.text}>No</Text>
  <CheckBox
    value={ordit === 'No'}
    onValueChange={() => setOrdit('No')}
    style={styles.checkbox}
  />
  
</View>
<Text style={styles.text}>Accompanied:</Text>
 
<View style={styles.row}>
  <Text style={styles.text}>QA</Text>
  <CheckBox
    value={accompaniment === 'QA'}
    onValueChange={() => setAccompaniment('QA')}
    style={styles.checkbox}
  />
  <Text style={styles.text}>Trainer</Text>
  <CheckBox
    value={accompaniment === 'Trainer'}
    onValueChange={() => setAccompaniment('Trainer')}
    style={styles.checkbox}
  />
  <Text style={styles.text}>Other</Text>
  <CheckBox
    value={accompaniment === 'Other'}
    onValueChange={() => setAccompaniment('Other')}
    style={styles.checkbox}
  />
  
</View>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>ASSESSMENT</Text>
      </View>
      <Text style={styles.label}>Lesson:</Text>
      {Object.keys(studentSelections).map((label) => (
        <View style={styles.row}>
         
          <CheckBox
            value={studentSelections[label]}
            onValueChange={(newValue) => setStudentSelections({ ...studentSelections, [label]: newValue })}
            style={styles.checkbox}
          />
           <Text style={styles.label}>{label}</Text>
        </View>
      ))}
       
      <Text style={styles.label}>Lesson theme:</Text>
      {Object.keys(lessonThemeSelections).map((label) => (
        <View style={styles.row}>
          <CheckBox
            value={lessonThemeSelections[label]}
            onValueChange={(newValue) => setLessonThemeSelections({ ...lessonThemeSelections, [label]: newValue })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
      ))}

      <View style={styles.headerContainer}>
        <Text style={styles.header}>LESSON PLANNING</Text>
      </View>
      <Text style={styles.label}>Did the trainer identify the pupil’s learning goals and needs?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={didTheTrainerIdentifyThePupilLearningGoalsAndNeeds === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setDidTheTrainerIdentifyThePupilLearningGoalsAndNeeds(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      {/* <Text style={styles.label}>Did the trainer identify the pupil’s learning goals and needs?</Text>
      {['0', '1', '2', '3'].map((value) => (
        <View style={styles.row}>
          <RadioButton
            value={value}
            status={didTheTrainerIdentifyThePupilLearningGoalsAndNeeds === value ? 'checked' : 'unchecked'}
            onPress={() => setDidTheTrainerIdentifyThePupilLearningGoalsAndNeeds(value)}
          />
          <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
        </View>
      ))} */}
     <Text style={styles.label}>Was the agreed lesson structure appropriate for the pupil's experience and ability?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setWasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={styles.label}>Were the practice areas suitable?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={practiceAreasCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setPracticeAreasCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
    <Text style={styles.label}>Was the lesson plan adapted, when appropriate, to help the pupil work towards their learning goals?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={lessonPlanAdaptabilityCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setLessonPlanAdaptabilityCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
     <Text style={[styles.label, {fontWeight: 'bold', fontSize:16}]}>Score for lesson planning:</Text>
<View style={styles.row}>
  <TextInput style={styles.input} placeholder="Lesson Planning Score"  onChangeText={setScoreForLessonPlanning}  />
</View>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={lessonPlanCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setLessonPlanCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>RISK MANAGEMENT</Text>
      </View>
      <Text style={styles.label}>Did the trainer ensure that the pupil fully understood how the responsibility for risk would be shared?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={responsibilityForRiskScore === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setResponsibilityForRiskScore(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
     <Text style={styles.label}>Were directions and instructions given to the pupil clear and given in good time?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={directionsAndInstructionsCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setDirectionsAndInstructionsCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
     <Text style={styles.label}>Was the trainer aware of the surroundings and the pupil's actions?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={awarenessOfSurroundingsCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setAwarenessOfSurroundingsCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
    <Text style={styles.label}>Was any verbal or physical intervention by the trainer timely and appropriate?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={interventionCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setInterventionCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={styles.label}>Was sufficient feedback given to help the pupil understand any potential safety critical incidents?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={feedbackCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setFeedbackCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
<Text style={[styles.label, {fontWeight: 'bold', fontSize:16}]}>Score for Risk Management:</Text>
<View style={styles.row}>
  <TextInput style={styles.input} placeholder="Risk Management Score"  onChangeText={setScoreForRiskManagement}  />
</View>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={riskManagementCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setRiskManagementCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TECHNICAL AND LEARNING STRATEGIES</Text>
      </View>
      <Text style={styles.label}>Was the teaching style suited to the pupil's learning style and current ability?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={teachingStyleCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setTeachingStyleCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={styles.label}>Was the pupil encouraged to analyse problems and take responsibility for their learning?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={problemAnalysisCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setProblemAnalysisCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
    
<Text style={styles.label}>Were opportunities and examples used to clarify learning outcomes?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={clarifyLearningOutcomesCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setClarifyLearningOutcomesCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={styles.label}>Was the technical information given comprehensive, appropriate and accurate?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={technicalInformationCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setTechnicalInformationCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      <Text style={styles.label}>Was the pupil given appropriate and timely feedback during the session?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={feedbackDuringSessionCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setFeedbackDuringSessionCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={styles.label}>Were the pupils queries followed up and answered?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={pupilQueriesCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setPupilQueriesCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
   <Text style={styles.label}>At the end of the session - was the pupil encouraged to reflect on their own performance?</Text>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={pupilReflectionCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setPupilReflectionCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      {/* <Text style={styles.label}>Score for teaching and learning strategies?</Text>
      <View style={styles.row}>
        <CheckBox
          value={teachingStrategiesScoreCheckbox}
          onValueChange={setTeachingStrategiesScoreCheckbox}
          style={styles.checkbox}
        />
      </View> */}
 <Text style={[styles.label, {fontWeight: 'bold', fontSize:16}]}>Score for teaching and learning strategies:</Text>
<View style={styles.row}>
  <TextInput style={styles.input} placeholder="Teaching Strategies Score"  onChangeText={setScoreForTeachingStrategies}  />
</View>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={teachingStrategiesScore === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setTeachingStrategiesCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}

<Text style={[styles.label, {fontWeight: 'bold', fontSize:16}]}>Overall score:</Text>
<View style={styles.row}>
  <TextInput style={styles.input} placeholder="Overall score"  onChangeText={setOverallScore}  />
</View>
{['0', '1', '2', '3'].map((value) => (
  <View style={styles.row}>
    <CheckBox
      value={overallCompetence === value}
      onValueChange={(newValue) => {
        if (newValue) {
          setOverallCompetence(value);
        }
      }}
    />
    <Text style={styles.label}>{value}: {value === '0' ? 'No evidence' : value === '1' ? 'Demonstrated in few elements' : value === '2' ? 'Demonstrated in most elements' : 'Demonstrated in all elements'}</Text>
  </View>
))}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>REVIEW</Text>
      </View>
      <Text style={styles.label}>Did the candidate score 7 or less on Risk Management?</Text>
      <View style={styles.row}>
      <Text style={styles.label}>Yes</Text>
 
  <CheckBox
    value={didCandidateScoredSevenOrLessOnRiskManagement === 'Yes'}
    onValueChange={() => setdidCandidateScoredSevenOrLessOnRiskManagement('Yes')}
    style={styles.checkbox}
  />
    <Text style={styles.label}>No</Text>
  <CheckBox
    value={didCandidateScoredSevenOrLessOnRiskManagement === 'No'}
    onValueChange={() => setdidCandidateScoredSevenOrLessOnRiskManagement('No')}
    style={styles.checkbox}
  />

</View>
      {/* <Text style={styles.label}>Did the candidate score 7 or less on Risk Management?</Text>
      <View style={styles.row}>
        <CheckBox
          value={isRiskManagementScoreLow}
          onValueChange={setRiskManagementScore}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Yes</Text>
        <CheckBox
          value={!isRiskManagementScoreLow}
          onValueChange={() => setRiskManagementScore(!isRiskManagementScoreLow)}
          style={styles.checkbox}
        />
        <Text style={styles.label}>No</Text>
      </View> */}
  <Text style={styles.label}>At any point in the lesson, did the candidate behave in a way which put you, the pupil or any third party in immediate danger, so that you had to stop the lesson (A 'Yes' response to this question will result in automatic Fail)</Text>
<View style={styles.row}>
<Text style={styles.label}>Yes</Text>
  <CheckBox
    value={immediateDangerCondition === 'Yes'}
    onValueChange={() => setImmediateDangerCondition('Yes')}
    style={styles.checkbox}
  />
  <Text style={styles.label}>No</Text>
  <CheckBox
    value={immediateDangerCondition === 'No'}
    onValueChange={() => setImmediateDangerCondition('No')}
    style={styles.checkbox}
  />
 
</View>
<Text style={[styles.label, style={fontWeight:'600'}]}>Was Advice given to seek further development?</Text>
<View style={styles.row}>
<Text style={styles.label}>Yes</Text>
  <CheckBox
    value={wasAdviceGiven === 'Yes'}
    onValueChange={() => setWasAdviceGiven('Yes')}
    style={styles.checkbox}
  />
  <Text style={styles.label}>No</Text>
  <CheckBox
    value={wasAdviceGiven === 'No'}
    onValueChange={() => setWasAdviceGiven('No')}
    style={styles.checkbox}
  />
  
</View>
     
      <TextInput style={styles.input} placeholder="Feedback offered to Candidate" onChangeText={setFeedbackToCandidate} />
      <TextInput style={styles.input} placeholder="Examiner Name" onChangeText={setExaminerName} />
      <TextInput style={styles.input} placeholder="Signature" onChangeText={setSignature} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.submitButton} onPress={() => createPDF({
   userName: name,
   userEmail: email,
   formNumber: formNumber,
   candidateName,
   prn,
   insuranceDeclaration,
   location,
   date,
   outcome,
   isDualControlsSelected,
   regNo,
   isLogBookSelected,
   trainerPrn,
   isTraineeLicenceSelected,
   isOrditSelected,
   isRiskManagementScoreLow,
   isImmediateDanger,
   isSelected,
   competence,
   isDualControlsSelected,
   isLogBookSelected,
   isTraineeLicenceSelected,
   accompaniment,
   studentSelections,
   lessonThemeSelections,
   isAdviceGiven,
   didTheTrainerIdentifyThePupilLearningGoalsAndNeeds,
   wasTheAgreedLessonStructureAppropriateForThePupilExperienceAndAbility,
   practiceAreasCompetence,
   lessonPlanCompetence,
   lessonPlanningScore,
   isLessonPlanningScoreChecked,
   responsibilityForRiskScore,
   directionsAndInstructionsCompetence,
   awarenessOfSurroundingsCompetence,
   interventionCompetence,
   feedbackCompetence,
   riskManagementScoreCheckbox,
   riskManagementScoreForLesson,
   teachingStyleCompetence,
   problemAnalysisCompetence,
   clarifyLearningOutcomesCompetence,
   technicalInformationCompetence,
   feedbackDuringSessionCompetence,
   pupilQueriesCompetence,
   pupilReflectionCompetence,
   teachingStrategiesScoreCheckbox,
   teachingStrategiesScore,
   isAdviceGiven,
   feedbackToCandidate,
   examinerName,
   signature,
})}>
  <Text style={styles.submitButtonText}>Download PDF</Text>
</TouchableOpacity> */}
    

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#faeeee',
   
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 150, // Or whatever size you want
    height: 100, // Or whatever size you want
    marginRight: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    position: 'absolute',
    top: 10,
    right: 10,
  },
  headerContainer: {
    backgroundColor: '#eeb0ab',
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    alignItems:"center"
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: 'white',
    color:'black'
  },
  text: {
    fontSize: 14,
    color: 'black',
    margin: 10
  },
  emptyBox: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 10,
    backgroundColor: 'white'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginLeft:8,
    marginBottom:5,
    marginRight:5
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#eeb0ab',
    padding: 10,
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight:'700'
  },
  
});

export default DriveForm2;



 // try {
    //   await firebase.firestore().collection('driveForm2').add(formData);
    //   console.log('Form data successfully written!');
    //   navigation.navigate('FormList'); // Navigate to FormListScreen
    // } catch (error) {
    //   console.error('Error writing document: ', error);
    // }