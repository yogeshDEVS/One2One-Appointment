import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet,  Image, TouchableOpacity, PermissionsAndroid,Dimensions } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import { SafeAreaView } from 'react-native-safe-area-context';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DriveForm3 = ({ navigation, route }) => {
  const [candidateName, setCandidateName] = useState('');
  const [applicationRef, setApplicationRef] = useState(''); 
  const [date, setDate] = useState('');
  const [catType, setCatType] = useState('');
  const [adiOrReg, setAdiOrReg] = useState('');
  const [time, setTime] = useState('');
  const [drNo, setDrNo] = useState('');
  const [dtcCodeOrAuthority, setDtcCodeOrAuthority] = useState('');
  const [regNo, setRegNo] = useState('');
  const [staffOrRefNo, setStaffOrRefNo] = useState('');
  const [examinerName, setExaminerName] = useState('');
  const [sChecked, setSChecked] = useState(false);
  const [dcChecked, setDCChecked] = useState(false);
  const [declarationYes, setDeclarationYes] = useState(false);
  const [declarationNo, setDeclarationNo] = useState(false);
  const [declaration, setDeclaration] = useState(null);

  const { name, email , formNumber } = route.params;


const [isAutoChecked, setIsAutoChecked] = useState(false);
const [isExtChecked,  setIsExtChecked] = useState(false);
const [hOrCodeOrSafetyTotal, setHOrCodeOrSafetyTotal] = useState('');

const [marks, setMarks] = useState(null);


const [buttonValues, setButtonValues] = useState(Array(5).fill(false));
const [adiCertNo, setAdiCertNo] = useState('');
const [bottomRowValues, setBottomRowValues] = useState(Array(5).fill(false));

const [sup, setSup] = useState(false);
const [adi, setAdi] = useState(false);
const [int, setInt] = useState(false);
const [other, setOther] = useState(false);

const [eyeSight, setEyeSight] = useState(null);
const [eyeSightTotal, setEyeSightTotal] = useState('');



const [endresult, setEndresult] = useState(null);
const [ETA, setETA] = useState(null);
const [survey, setSurvey] = useState(null);

const [controlStopPromptness, setControlStopPromptness] = useState(null);
const [controlStopControl, setControlStopControl] = useState(null);
const [totalForControlStopPromptness, setTotalForControlStopPromptness] = useState('');
const [totalForControlStopControl, setTotalForControlStopControl] = useState('');


const [taxiManoeuvreControl, setTaxiManoeuvreControl] = useState(null);
const [taxiManoeuvreObservation, setTaxiManoeuvreObservation] = useState(null);
const [totalForTaxiManoeuvreControl, setTotalForTaxiManoeuvreControl] = useState('');
const [totalForTaxiManoeuvreObservation, setTotalForTaxiManoeuvreObservation] = useState('');







const [buttonValues2, setButtonValues2] = useState(Array(5).fill(false));
const [vChecked, setVChecked] = useState(false);
const [cChecked, setCChecked] = useState(false);

//  state variables for the EyeSight section
const [sCheckedEyeSight, setSCheckedEyeSight] = useState(false);
const [dCheckedEyeSight, setDCheckedEyeSight] = useState(false);
const [totalCheckedEyeSight, setTotalCheckedEyeSight] = useState(false);


const [hOrCodeOrSafety, setHOrCodeOrSafety] = useState(null);
const [hCodeInputText, setHCodeInputText] = useState('');


// state variables for the H Code Safety section
const [sCheckedHCodeSafety, setSCheckedHCodeSafety] = useState(false);
const [dCheckedHCodeSafety, setDCheckedHCodeSafety] = useState(false);
const [totalCheckedHCodeSafety, setTotalCheckedHCodeSafety] = useState(false);


const [controlStop, setControlStop] = useState({ promptness: null, control: null });
const [reverseOrLeftReverseWithTrailer, setReverseOrLeftReverseWithTrailer] = useState({ control: null, observation: null });

const [reverseOrRight, setReverseOrRight] = useState({ control: null, observation: null });

const [reversePark, setReversePark] = useState({ control: null, observation: null });

const [isRChecked, setIsRChecked] = useState(false);
const [isCChecked, setIsCChecked] = useState(false);
const [turnInRoad, setTurnInRoad] = useState({ control: null, observation: null });
const [taxiManoeuvre, setTaxiManoeuvre] = useState({ control: null, observation: null });
const [moveOff, setMoveOff] = useState({ safety: null, control: null });
const [progress, setProgress] = useState({ appropriateSpeed: null, undueHesitation: null });
const [positioning, setPositioning] = useState({ normalDriving: null, laneDiscipline: null });
const [useOfMirrors, setUseOfMirrors] = useState({ signalling: null, changeDirections: null, changeSpeed: null });
const [signals, setSignals] = useState({ necessary: null, correctly: null, timed: null });
const [resposeToSignsOrSignals, setResposeToSignsOrSignals] = useState({ trafficSignals: null, roadMarkings: null, trafficLights: null, trafficControllers: null, otherRoadUsers: null });
const [junctions, setJunctions] = useState({ approachSpeed: null, observation: null, turningRight: null, turningLeft: null, cuttingCorners: null });
const [judgement, setJudgement] = useState({ overtaking: null, meeting: null, crossing: null });




const [promptnessChecked, setPromptnessChecked] = useState(false);
const [totalChecked1, setTotalChecked1] = useState(false);
const [sChecked1, setSChecked1] = useState(false); 
const [dChecked1, setDChecked1] = useState(false);

const [controlChecked, setControlChecked] = useState(false);
const [totalChecked2, setTotalChecked2] = useState(false);
const [sChecked2, setSChecked2] = useState(false);
const [dChecked2, setDChecked2] = useState(false);

const [wheelchairPassChecked, setWheelchairPassChecked] = useState(false);
const [wheelchairFailChecked, setWheelchairFailChecked] = useState(false);

const [passChecked, setPassChecked] = useState(false);
const [failChecked, setFailChecked] = useState(false);
const [noneChecked, setNoneChecked] = useState(false);
const [totalFaults, setTotalFaults] = useState('');
const [routeNumber, setRouteNumber] = useState('');

const [newVChecked, setNewVChecked] = useState(false);
const [pChecked, setPChecked] = useState(false);
const [snChecked, setSNChecked] = useState(false);

const [aChecked, setAChecked] = useState(false);
const [bChecked, setBChecked] = useState(false);
const [newCChecked, setNewCChecked] = useState(false);
const [dChecked, setDChecked] = useState(false);
const [eChecked, setEChecked] = useState(false);
const [fChecked, setFChecked] = useState(false);
const [gChecked, setGChecked] = useState(false);
const [hChecked, setHChecked] = useState(false);

const [debrief, setDebrief] = useState('');
const [activityCode, setActivityCode] = useState('');

const [passCertificateNumber, setPassCertificateNumber] = useState('');
const [wheelchairCertNo, setWheelchairCertNo] = useState('');
const [healthStatusOrConfirmation,setHealthStatusOrConfirmation ] = useState('');

const [reverseOrLeftReverseWithTrailerControl, setReverseOrLeftReverseWithTrailerControl] = useState(null);
const [reverseOrLeftReverseWithTrailerObservation, setReverseOrLeftReverseWithTrailerObservation] = useState(null);
const [totalForReverseOrLeftReverseWithTrailerControl, setTotalForReverseOrLeftReverseWithTrailerControl] = useState('');
const [totalForReverseOrLeftReverseWithTrailerObservation, setTotalForReverseOrLeftReverseWithTrailerObservation] = useState('');

const [reverseOrRightControl, setReverseOrRightControl] = useState(null);
const [reverseOrRightObservation, setReverseOrRightObservation] = useState(null);
const [totalForReverseOrRightControl, setTotalForReverseOrRightControl] = useState('');
const [totalForReverseOrRightObservation, setTotalForReverseOrRightObservation] = useState('');

const [reverseParkControl, setReverseParkControl] = useState(null);
const [reverseParkObservation, setReverseParkObservation] = useState(null);
const [totalForReverseParkControl, setTotalForReverseParkControl] = useState('');
const [totalForReverseParkObservation, setTotalForReverseParkObservation] = useState('');

const [turnInRoadControl, setTurnInRoadControl] = useState(null);
const [turnInRoadObservation, setTurnInRoadObservation] = useState(null);
const [totalForTurnInRoadControl, setTotalForTurnInRoadControl] = useState('');
const [totalForTurnInRoadObservation, setTotalForTurnInRoadObservation] = useState('');


const [vehicleCheck, setVehicleCheck] = useState(null);
const [totalForVehicleCheck, setTotalForVehicleCheck] = useState('');

const [uncoupleOrRecouple, setUncoupleOrRecouple] = useState(null);
const [totalForUncoupleOrRecouple, setTotalForUncoupleOrRecouple] = useState('');

const [precautions, setPrecautions] = useState(null);
const [totalForPrecautions, setTotalForPrecautions] = useState('');



const [signallingForUseOfMirrors, setSignallingForUseOfMirrors] = useState(null);
const [changeDirectionForUseOfMirrors, setChangeDirectionForUseOfMirrors] = useState(null);
const [changeSpeedForUseOfMirrors, setChangeSpeedForUseOfMirrors] = useState(null);
const [totalForSignallingForUseOfMirrors, setTotalForSignallingForUseOfMirrors] = useState('');
const [totalForChangeDirectionForUseOfMirrors, setTotalForChangeDirectionForUseOfMirrors] = useState('');
const [totalForChangeSpeedForUseOfMirrors, setTotalForChangeSpeedForUseOfMirrors] = useState('');

const [trafficSignalsForResponseToSignsOrSignals, setTrafficSignalsForResponseToSignsOrSignals] = useState(null);
const [roadMarkingsForResponseToSignsOrSignals, setRoadMarkingsForResponseToSignsOrSignals] = useState(null);
const [trafficLightsForResponseToSignsOrSignals, setTrafficLightsForResponseToSignsOrSignals] = useState(null);
const [trafficControllersForResponseToSignsOrSignals, setTrafficControllersForResponseToSignsOrSignals] = useState(null);
const [otherRoadUsersForResponseToSignsOrSignals, setOtherRoadUsersForResponseToSignsOrSignals] = useState(null);
const [totalForTrafficSignalsForResponseToSignsOrSignals, setTotalForTrafficSignalsForResponseToSignsOrSignals] = useState('');
const [totalForRoadMarkingsForResponseToSignsOrSignals, setTotalForRoadMarkingsForResponseToSignsOrSignals] = useState('');
const [totalForTrafficLightsForResponseToSignsOrSignals, setTotalForTrafficLightsForResponseToSignsOrSignals] = useState('');
const [totalForTrafficControllersForResponseToSignsOrSignals, setTotalForTrafficControllersForResponseToSignsOrSignals] = useState('');
const [totalForOtherRoadUsersForResponseToSignsOrSignals, setTotalForOtherRoadUsersForResponseToSignsOrSignals] = useState('');


const [approachSpeedForJunctions, setApproachSpeedForJunctions] = useState(null);
const [observationForJunctions, setObservationForJunctions] = useState(null);
const [turningRightForJunctions, setTurningRightForJunctions] = useState(null);
const [turningLeftForJunctions, setTurningLeftForJunctions] = useState(null);
const [totalForApproachSpeedForJunctions, setTotalForApproachSpeedForJunctions] = useState('');
const [totalForObservationForJunctions, setTotalForObservationForJunctions] = useState('');
const [totalForTurningRightForJunctions, setTotalForTurningRightForJunctions] = useState('');
const [totalForTurningLeftForJunctions, setTotalForTurningLeftForJunctions] = useState('');
const [cuttingCornersForJunctions, setCuttingCornersForJunctions] = useState(null);
const [totalForCuttingCornersForJunctions, setTotalForCuttingCornersForJunctions] = useState('');

const [overtakingForJudgement, setOvertakingForJudgement] = useState(null);
const [meetingForJudgement, setMeetingForJudgement] = useState(null);
const [crossingForJudgement, setCrossingForJudgement] = useState(null);
const [totalForOvertakingForJudgement, setTotalForOvertakingForJudgement] = useState('');
const [totalForMeetingForJudgement, setTotalForMeetingForJudgement] = useState('');
const [totalForCrossingForJudgement, setTotalForCrossingForJudgement] = useState('');


const [normalDrivingForPositioning, setNormalDrivingForPositioning] = useState(null);
const [laneDisciplineForPositioning, setLaneDisciplineForPositioning] = useState(null);
const [totalForNormalDrivingForPositioning, setTotalForNormalDrivingForPositioning] = useState('');
const [totalForLaneDisciplineForPositioning, setTotalForLaneDisciplineForPositioning] = useState('');

const [appropriateSpeedForProgress, setAppropriateSpeedForProgress] = useState(null);
const [undueHesitationForProgress, setUndueHesitationForProgress] = useState(null);
const [totalForAppropriateSpeedForProgress, setTotalForAppropriateSpeedForProgress] = useState('');
const [totalForUndueHesitationForProgress, setTotalForUndueHesitationForProgress] = useState('');

const [accelerator, setAccelerator] = useState(null);
const [totalForAccelerator, setTotalForAccelerator] = useState('');

const [clutch, setClutch] = useState(null);
const [totalForClutch, setTotalForClutch] = useState('');

const [gears, setGears] = useState(null);
const [totalForGears, setTotalForGears] = useState('');

const [footbrake, setFootbrake] = useState(null);
const [totalForFootbrake, setTotalForFootbrake] = useState('');

const [parkingBrakeOrMCFrontBrake, setParkingBrakeOrMCFrontBrake] = useState(null);
const [totalForParkingBrakeOrMCFrontBrake, setTotalForParkingBrakeOrMCFrontBrake] = useState('');

const [steering, setSteering] = useState(null);
const [totalForSteering, setTotalForSteering] = useState('');

const [balanceMOrC, setBalanceMOrC] = useState(null);
const [totalForBalanceMOrC, setTotalForBalanceMOrC] = useState('');

const [lgvOrPcvGearExercise, setLgvOrPcvGearExercise] = useState(null);
const [totalForLgvOrPcvGearExercise, setTotalForLgvOrPcvGearExercise] = useState('');

const [pcvDoorExercise, setPcvDoorExercise] = useState(null);
const [totalForPcvDoorExercise, setTotalForPcvDoorExercise] = useState('');

const [safety, setSafety] = useState(null);
const [totalForSafety, setTotalForSafety] = useState('');

const [control, setControl] = useState(null);
const [totalForControl, setTotalForControl] = useState('');

const [necessaryForSignals, setNecessaryForSignals] = useState(null);
const [totalsOfNecessaryForSignals, setTotalsOfNecessaryForSignals] = useState('');
const [correctlyForSignals, setCorrectlyForSignals] = useState(null);
const [totalOfCorrectlyForSignals, setTotalOfCorrectlyForSignals] = useState('');
const [timedForSignals, setTimedForSignals] = useState(null);
const [totalOfTimedForSignals, setTotalOfTimedForSignals] = useState('');

const [clearanceOrObstruction, setClearanceOrObstruction] = useState(null);
const [totalForClearanceOrObstruction, setTotalForClearanceOrObstruction] = useState('');

const [useOfSpeed, setUseOfSpeed] = useState(null);
const [totalForUseOfSpeed, setTotalForUseOfSpeed] = useState('');
const [followingDistance, setFollowingDistance] = useState(null);
const [totalForFollowingDistance, setTotalForFollowingDistance] = useState('');

const [pedestrianCrossing, setPedestrianCrossing] = useState(null);
const [totalForPedestrianCrossing, setTotalForPedestrianCrossing] = useState('');

const [positionOrNormalStops, setPositionOrNormalStops] = useState(null);
const [totalForPositionOrNormalStops, setTotalForPositionOrNormalStops] = useState('');

const [awarenessOrPlanning, setAwarenessOrPlanning] = useState(null);
const [totalForAwarenessOrPlanning, setTotalForAwarenessOrPlanning] = useState('');

const [ancillaryControls, setAncillaryControls] = useState(null);
const [totalForAncillaryControls, setTotalForAncillaryControls] = useState('');

const [ecoSafeDriving, setEcoSafeDriving] = useState(null);
const [totalForEcoSafeDriving, setTotalForEcoSafeDriving] = useState('');

const [spare1, setSpare1] = useState(null);
const [totalForSpare1, setTotalForSpare1] = useState('');

const [spare2, setSpare2] = useState(null);
const [totalForSpare2, setTotalForSpare2] = useState('');

const [spare3, setSpare3] = useState(null);
const [totalForSpare3, setTotalForSpare3] = useState('');

const [spare4, setSpare4] = useState(null);
const [totalForSpare4, setTotalForSpare4] = useState('');


const convertCamelCaseToReadable = (str) => {
  // Insert a space before all caps
  str = str.replace(/([A-Z])/g, ' $1');
  
  // Uppercase the first character
  return str.replace(/^./, str[0].toUpperCase());
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
const handleSubmit = async () => {
  const formData = {
    userName: name,
    userEmail: email,
    candidateName: candidateName,
    applicationRef: applicationRef,
    date: date,
    time: time,
    drNo: drNo,
    marks: marks,
    dtcCodeOrAuthority: dtcCodeOrAuthority,
    regNo: regNo,
    staffOrRefNo: staffOrRefNo,
    examinerName: examinerName,
    catType: catType,
    adiOrReg: adiOrReg,
    isAutoChecked: isAutoChecked,
    isExtChecked: isExtChecked,
    adiCertNo: adiCertNo,
    sup: sup,
    adi: adi,
    int: int,
    other: other,
    eyeSight: eyeSight,
    eyeSightTotal:eyeSightTotal,
    vChecked: vChecked,
    cChecked: cChecked,
    hOrCodeOrSafety: hOrCodeOrSafety,
    hOrCodeOrSafetyTotal:hOrCodeOrSafetyTotal,
    
    controlStopPromptness:controlStopPromptness,
    totalForControlStopPromptness: totalForControlStopPromptness,
    controlStopControl:controlStopControl,
    totalForControlStopControl:totalForControlStopControl,
   
    reverseOrLeftReverseWithTrailerControl:reverseOrLeftReverseWithTrailerControl,
    totalForReverseOrLeftReverseWithTrailerControl:totalForReverseOrLeftReverseWithTrailerControl,
    reverseOrLeftReverseWithTrailerObservation:reverseOrLeftReverseWithTrailerObservation,
    totalForReverseOrLeftReverseWithTrailerObservation:totalForReverseOrLeftReverseWithTrailerObservation,


    reverseOrRightControl:reverseOrRightControl,
    totalForReverseOrRightControl:totalForReverseOrRightControl,
    reverseOrRightObservation:reverseOrRightObservation,
    totalForReverseOrRightObservation:totalForReverseOrRightObservation, 

    reverseParkControl:reverseParkControl,
    totalForReverseParkControl:totalForReverseParkControl,
    reverseParkObservation:reverseParkObservation,
    totalForReverseParkObservation:totalForReverseParkObservation,

    turnInRoadControl:turnInRoadControl,
    totalForTurnInRoadControl:totalForTurnInRoadControl,
    turnInRoadObservation:turnInRoadObservation,
    totalForTurnInRoadObservation:totalForTurnInRoadObservation, 
    
    taxiManoeuvreControl:taxiManoeuvreControl,
    totalForTaxiManoeuvreControl:totalForTaxiManoeuvreControl,
    taxiManoeuvreObservation:taxiManoeuvreObservation,
    totalForTaxiManoeuvreObservation:totalForTaxiManoeuvreObservation,
    
    isRChecked: isRChecked,
    isCChecked: isCChecked,

    vehicleCheck:vehicleCheck,
    totalForVehicleCheck:totalForVehicleCheck,

    uncoupleOrRecouple:uncoupleOrRecouple,
    totalForUncoupleOrRecouple:totalForUncoupleOrRecouple,

    precautions:precautions,
    totalForPrecautions:totalForPrecautions,

    accelerator:accelerator,
    totalForAccelerator:totalForAccelerator,

    signallingForUseOfMirrors:signallingForUseOfMirrors,
    totalForSignallingForUseOfMirrors:totalForSignallingForUseOfMirrors,
    changeDirectionForUseOfMirrors:changeDirectionForUseOfMirrors,
    totalForChangeDirectionForUseOfMirrors:totalForChangeDirectionForUseOfMirrors,
    changeSpeedForUseOfMirrors:changeSpeedForUseOfMirrors,
    totalForChangeSpeedForUseOfMirrors:totalForChangeSpeedForUseOfMirrors,

    trafficSignalsForResponseToSignsOrSignals:trafficSignalsForResponseToSignsOrSignals,
    totalForTrafficSignalsForResponseToSignsOrSignals:totalForTrafficSignalsForResponseToSignsOrSignals,
    roadMarkingsForResponseToSignsOrSignals:roadMarkingsForResponseToSignsOrSignals,
    totalForRoadMarkingsForResponseToSignsOrSignals:totalForRoadMarkingsForResponseToSignsOrSignals,
    trafficLightsForResponseToSignsOrSignals:trafficLightsForResponseToSignsOrSignals,
    totalForTrafficLightsForResponseToSignsOrSignals:totalForTrafficLightsForResponseToSignsOrSignals,
    trafficControllersForResponseToSignsOrSignals:trafficControllersForResponseToSignsOrSignals,
    totalForTrafficControllersForResponseToSignsOrSignals:totalForTrafficControllersForResponseToSignsOrSignals,
    totalForTrafficControllersForResponseToSignsOrSignals:totalForTrafficControllersForResponseToSignsOrSignals,
    otherRoadUsersForResponseToSignsOrSignals:otherRoadUsersForResponseToSignsOrSignals,
    totalForOtherRoadUsersForResponseToSignsOrSignals:totalForOtherRoadUsersForResponseToSignsOrSignals,

    approachSpeedForJunctions:approachSpeedForJunctions,
    totalForApproachSpeedForJunctions:totalForApproachSpeedForJunctions,
    observationForJunctions:observationForJunctions,
    totalForObservationForJunctions:totalForObservationForJunctions,
    turningRightForJunctions:turningRightForJunctions,
    totalForTurningRightForJunctions:totalForTurningRightForJunctions,
    turningLeftForJunctions:turningLeftForJunctions,
    totalForTurningLeftForJunctions:totalForTurningLeftForJunctions,
    cuttingCornersForJunctions:cuttingCornersForJunctions,
    totalForCuttingCornersForJunctions:totalForCuttingCornersForJunctions,

    overtakingForJudgement:overtakingForJudgement,
    totalForOvertakingForJudgement:totalForOvertakingForJudgement,
    meetingForJudgement:meetingForJudgement,
    totalForMeetingForJudgement:totalForMeetingForJudgement,
    crossingForJudgement:crossingForJudgement,
    totalForCrossingForJudgement:totalForCrossingForJudgement,

    normalDrivingForPositioning:normalDrivingForPositioning,
    totalForNormalDrivingForPositioning:totalForNormalDrivingForPositioning,
    laneDisciplineForPositioning:laneDisciplineForPositioning,
    totalForLaneDisciplineForPositioning:totalForLaneDisciplineForPositioning,

    appropriateSpeedForProgress:appropriateSpeedForProgress,
    totalForAppropriateSpeedForProgress:totalForAppropriateSpeedForProgress,
    undueHesitationForProgress:undueHesitationForProgress,
    totalForUndueHesitationForProgress:totalForUndueHesitationForProgress,

    gears:gears,
    totalForGears:totalForGears,

    footbrake:footbrake,
    totalForFootbrake,

    parkingBrakeOrMCFrontBrake:parkingBrakeOrMCFrontBrake,
    totalForParkingBrakeOrMCFrontBrake:totalForParkingBrakeOrMCFrontBrake,
   
    steering:steering,
    totalForSteering:totalForSteering,

    balanceMOrC:balanceMOrC,
    totalForBalanceMOrC:totalForBalanceMOrC,

    lgvOrPcvGearExercise:lgvOrPcvGearExercise,
    totalForLgvOrPcvGearExercise:totalForLgvOrPcvGearExercise,

    pcvDoorExercise:pcvDoorExercise,
    totalForPcvDoorExercise:totalForPcvDoorExercise,

    safety:safety,
    totalForSafety:totalForSafety,
    
    control:control,
    totalForControl:totalForControl,

    necessaryForSignals:necessaryForSignals,
    totalsOfNecessaryForSignals:totalsOfNecessaryForSignals,
    correctlyForSignals:correctlyForSignals,
    totalOfCorrectlyForSignals:totalOfCorrectlyForSignals,
    timedForSignals:timedForSignals,
    totalOfTimedForSignals:totalOfTimedForSignals,

    clearanceOrObstruction:clearanceOrObstruction,
    totalForClearanceOrObstruction:totalForClearanceOrObstruction,


    useOfSpeed:useOfSpeed,
    totalForUseOfSpeed:totalForUseOfSpeed,
    followingDistance:followingDistance,
    totalForFollowingDistance:totalForFollowingDistance,

    
    pedestrianCrossing:pedestrianCrossing,
    totalForPedestrianCrossing:totalForPedestrianCrossing,

    positionOrNormalStops:positionOrNormalStops,
    totalForPositionOrNormalStops:totalForPositionOrNormalStops,

    awarenessOrPlanning:awarenessOrPlanning,
    totalForAwarenessOrPlanning:totalForAwarenessOrPlanning,

    ancillaryControls:ancillaryControls,
    totalForAncillaryControls:totalForAncillaryControls,

    ecoSafeDriving:ecoSafeDriving,
    totalForEcoSafeDriving:totalForEcoSafeDriving,

    spare1:spare1,
    totalForSpare1:totalForSpare1,

    spare2:spare2,
    totalForSpare2:totalForSpare2,

    spare3:spare3,
    totalForSpare3:totalForSpare3,

    spare4:spare4,
    totalForSpare4:totalForSpare4,

    endresult: endresult,
    totalFaults: totalFaults,
    routeNumber: routeNumber,
    ETA: ETA,
    survey: survey,
    debrief: debrief,
    activityCode: activityCode,
    passCertificateNumber: passCertificateNumber,
    wheelchairCertNo: wheelchairCertNo,
    healthStatusOrConfirmation: healthStatusOrConfirmation,
    declaration: declaration
  };
  const fieldOrder = Object.keys(formData); // This gets the order of the fields
  try {
    await firebase.firestore().collection('driveForm3').add({ name,formData, fieldOrder });
    console.log('Form data successfully written!');
    navigation.navigate('FormList3', { forceRefresh: true }); // Navigate to FormListScreen
  } catch (error) {
    console.error('Error writing document: ', error);
  }
};


// const handleSubmit = async () => {
//   const formData = {
//     userName: name,
//     userEmail: email,
//     formNumber: formNumber,
//     candidateName,
//     applicationRef,
//     date,
//     time,
//     drNo,
//     marks,
//     dtcCodeOrAuthority,
//     regNo,
//     staffOrRefNo,
//     examinerName,
//     catType,
//     adiOrReg,
//     isAutoChecked,
//     isExtChecked,
//     adiCertNo,
//     sup,
//     adi,
//     int,
//     other,
//     eyeSight,
//     vChecked,
//     cChecked,
//     hOrCodeOrSafety,
//     controlStop,
//     reverseOrLeftReverseWithTrailer,
//     reverseOrRight,
//     reversePark,
//     turnInRoad,
//     isRChecked,
//     isCChecked,
//     taxiManoeuvre,
//     moveOff,
//     progress,
//     positioning,
//     useOfMirrors,
//     signals, 
//     junctions,
//     judgement,
//     vehicleCheck,
//     uncoupleOrRecouple,
//     precautions,
//     accelerator,
//     clutch,
//     gears,
//     footbrake,
//     parkingBrakeOrMCFrontBrake,
//     steering,
//     balanceMOrC,
//     lgvOrPcvGearExercise,
//     pcvDoorExercise,
//     useOfSpeed,
//     followingDistance,
//     pedestrianCrossing,
//     positionOrNormalStops,
//     awarenessOrPlanning,
//     ancillaryControls,
//     ecoSafeDriving,
//     spare1,
//     spare2,
//     spare3,
//     spare4,
//     endresult,
//     totalFaults,
//     routeNumber,
//     ETA,
//     survey,
//     debrief,
//     activityCode,
//     passCertificateNumber, 
//     wheelchairCertNo,
//     healthStatusOrConfirmation,
//     declaration
//   };
//   try {
//     await firebase.firestore().collection('driveForm3').add(formData);
//     console.log('Form data successfully written!');
//     navigation.navigate('FormList3', { forceRefresh: true }); // Navigate to FormListScreen
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


  return (
    <SafeAreaView style={styles.container}>
    <ScrollView>
     
        <View style={{flexDirection:'row', justifyContent:'space-between'}} >
          <Text style={styles.titleMain}>Driving Test Report</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.subtitle}>DL25A</Text>
            <Text style={styles.subtitle}>0407T</Text>
          </View>
        </View>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>FORM DETAILS</Text>
        </View>
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Candidate Name" 
            onChangeText={setCandidateName} 
          />
          <View style={styles.inputHalf}  >
            <View style={styles.row}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:17, marginTop:5}}>S</Text>
  <CheckBox
    value={sChecked}
    onValueChange={setSChecked}
    style={styles.checkbox}
  />
  <Text style={{color:'black', fontWeight:'bold', fontSize:17, marginLeft:10,marginTop:5}}>D/C</Text>
  <CheckBox
    value={dcChecked}
    onValueChange={setDCChecked}
    style={[styles.checkbox, styles.additionalStyle]}

  />
</View>
</View>
         
        </View>

      
        <TextInput 
          style={styles.input} 
          placeholder="Application Ref." 
          onChangeText={setApplicationRef} 
        />
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Date" 
            onChangeText={setDate}
          />
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Time"  
            onChangeText={setTime}
          />
        </View>
        <View style={styles.row}>
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Dr.No."
            onChangeText={setDrNo}
          />
          <TextInput 
            style={styles.inputHalf} 
            placeholder="Reg. No."
            onChangeText={setRegNo}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="DTC Code / Authority"
          onChangeText={setDtcCodeOrAuthority}
        />
        <View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
            placeholder="Examiner Name"
            onChangeText={setExaminerName}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="Staff / Ref. No."
            onChangeText={setStaffOrRefNo}
          />
        </View>
      
        <View style={styles.declarationContainer}>
  <Text style={styles.declarationText}>I declare that my use of the test vehicle for the purposes of the test is covered by a valid policy of insurance which satisfies the requirements of relevant legislation.</Text>
  <View style={styles.row1}>
    <Text style={{color:'black', marginRight:5}}>Yes</Text>
    <CheckBox value={declaration === 'Yes'} onValueChange={(newValue) => { if (newValue) setDeclaration('Yes'); }} />
    <Text style={{color:'black', marginLeft:5, marginRight:5}}>No</Text>
    <CheckBox value={declaration === 'No'} onValueChange={(newValue) => { if (newValue) setDeclaration('No'); }} />
  </View>
</View>


<View style={styles.row}>
          <TextInput
            style={styles.inputHalf}
          
            placeholder="Category Type" 
            onChangeText={setCatType}
          />
          <TextInput
            style={styles.inputHalf}
            placeholder="ADI/Reg Number" 
            onChangeText={setAdiOrReg}
          />
        </View>
<View style={styles.inputHalf1} > 
<View style={styles.row1}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,marginRight:5}}>Auto</Text>
  <CheckBox
    value={isAutoChecked}
    onValueChange={setIsAutoChecked}
    style={styles.checkbox}
  />
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,marginRight:5, marginLeft:5}}>Ext</Text>
  <CheckBox
    value={isExtChecked}
    onValueChange={setIsExtChecked}
    style={styles.checkbox}
  />
</View>
</View>

<View style={styles.row}>
  {buttonValues.map((value, index) => (
    <View style={styles.buttonContainer} key={index}>
      <CheckBox
        value={value}
        onValueChange={(newValue) => {
          const newButtonValues = [...buttonValues];
          newButtonValues[index] = newValue;
          setButtonValues(newButtonValues);
          if (newValue) {
            setMarks(index + 1);
          }
        }}
        style={styles.checkbox}
      />
      <Text style={{color:'black', marginLeft:5,fontSize:16}}>{index + 1}</Text>
    </View>
  ))}
</View>
<View style={styles.row}>
  {buttonValues2.map((value, index) => (
    <View style={styles.buttonContainer} key={index}>
      <CheckBox
        value={value}
        onValueChange={(newValue) => {
          const newButtonValues = [...buttonValues2];
          newButtonValues[index] = newValue;
          setButtonValues2(newButtonValues);
          if (newValue) {
            setMarks(index + 6);
          }
        }}
        style={styles.checkbox}
      />
      <Text style={{color:'black', marginLeft:5,fontSize:16}}>{index + 6}</Text>
    </View>
  ))}
</View>

<View style={styles.row1}>
  <TextInput 
    style={{...styles.inputHalf2, flex: 0.5}} 
    placeholder="ADI Cert. No."
    onChangeText={setAdiCertNo}
  />
  <View style={{...styles.buttonContainer, flex: 0.25}} >
    <CheckBox
      value={vChecked}
      onValueChange={setVChecked}
      style={styles.checkbox}
    />
    <Text style={{color:'black', marginLeft:5}}>V</Text>
  </View>
  <View style={{...styles.buttonContainer, flex: 0.25}} >
    <CheckBox
      value={cChecked}
      onValueChange={setCChecked}
      style={styles.checkbox}
    />
    <Text style={{color:'black', marginLeft:5}}>C</Text>
  </View>  
</View>

<View style={styles.row}>
  <View style={styles.buttonContainer1}>
    <CheckBox
      value={sup}
      onValueChange={setSup}
      style={styles.checkbox}
    />
    <Text style={{color:'black', marginLeft:5}}>Sup</Text>
  </View>
  <View style={styles.buttonContainer1}>
    <CheckBox
      value={adi}
      onValueChange={setAdi}
      style={styles.checkbox}
    />
    <Text style={{color:'black',  marginLeft:5}}>ADI</Text>
  </View>
  <View style={styles.buttonContainer1}>
    <CheckBox
      value={int}
      onValueChange={setInt}
      style={styles.checkbox}
    />
    <Text style={{color:'black' , marginLeft:5}}>Int</Text>
  </View>
  <View style={styles.buttonContainer1}>
    <CheckBox
      value={other}
      onValueChange={setOther}
      style={styles.checkbox}
    /> 
    <Text style={{color:'black', marginLeft:5}}>Other</Text>
  </View>
</View>


<View style={styles.row2}>
  <Text style={styles.label}>Eye Sight</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 5, color:'black' }}>Total:</Text>
          <TextInput  onChangeText={setEyeSightTotal}
        value={eyeSightTotal} placeholder='Enter Total'/>
        </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
      <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={eyeSight === 'S'}
        onValueChange={() => setEyeSight('S')}
        style={styles.checkbox}
      />
    </View>
    <View style={styles.commonBox}>
      <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={eyeSight === 'D'}
        onValueChange={() => setEyeSight('D')}
        style={styles.checkbox}
      />
    </View>
   
  </View>
</View>


  
{/* <View style={styles.row2}>
      <Text style={styles.label}>EyeSight</Text>
      <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
        <View  style={styles.commonBox}>
            <Text style={{color:'black', marginRight:5}}>S</Text>
          <CheckBox value={sCheckedEyeSight} onValueChange={setSCheckedEyeSight} />
        </View>
        <View style={styles.commonBox}>
             <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
          <CheckBox value={dCheckedEyeSight} onValueChange={setDCheckedEyeSight} />
        </View>
        <View style={styles.commonBox}>
          <Text>Total</Text>
          <CheckBox value={totalCheckedEyeSight} onValueChange={setTotalCheckedEyeSight} />
        </View>
      </View>
    </View> */}

    {/* <View style={styles.row2}>
      <Text style={styles.label}>H/Code/Safety</Text>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={styles.commonBox}>
              <Text style={{color:'black', marginRight:5}}>S</Text>
            <CheckBox value={sCheckedHCodeSafety} onValueChange={setSCheckedHCodeSafety} />
          </View>
          <View style={styles.commonBox}>
               <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
            <CheckBox value={dCheckedHCodeSafety} onValueChange={setDCheckedHCodeSafety} />
          </View>
          <View style={styles.commonBox}>
            <Text>Total</Text>
            <CheckBox value={totalCheckedHCodeSafety} onValueChange={setTotalCheckedHCodeSafety} />
          </View>
        </View>
        <TextInput  style={styles.inputHalf3}  placeholder="" onChangeText={setHCodeInputText} />
      </View>
    </View> */}

<View style={styles.row2}>
  <Text style={styles.label}>H/Code/Safety</Text>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 5, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setHOrCodeOrSafetyTotal}
      value={hOrCodeOrSafetyTotal}
      placeholder='Enter Total'
    />
  </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox value={hOrCodeOrSafety === 'S'} onValueChange={(newValue) => { if (newValue) setHOrCodeOrSafety('S'); }} />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox value={hOrCodeOrSafety === 'D'} onValueChange={(newValue) => { if (newValue) setHOrCodeOrSafety('D'); }} />
      </View>
    
    </View>
   
  </View>
</View>
{/* 
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Control Stop</Text>
      
      <View style={styles.newrow}>
        <View style={styles.checkboxContainer}>
          <Text>Promptness</Text>
          <CheckBox value={promptnessChecked} onValueChange={setPromptnessChecked} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Total</Text>
          <CheckBox value={totalChecked1} onValueChange={setTotalChecked1} />
        </View>
        <View style={styles.checkboxContainer}>
            <Text style={{color:'black', marginRight:5}}>S</Text>
          <CheckBox value={sChecked1} onValueChange={setSChecked1} />
        </View>
        <View style={styles.checkboxContainer}>
             <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
          <CheckBox value={dChecked1} onValueChange={setDChecked1} />
        </View>
      </View>

      <View style={styles.newrow}>
        <View style={styles.checkboxContainer}>
          <Text style={{marginLeft: 30}} >Control</Text>
          <CheckBox value={controlChecked} onValueChange={setControlChecked} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text>Total</Text>
          <CheckBox value={totalChecked2} onValueChange={setTotalChecked2} />
        </View>
        <View style={styles.checkboxContainer}>
            <Text style={{color:'black', marginRight:5}}>S</Text>
          <CheckBox value={sChecked2} onValueChange={setSChecked2} />
        </View>
        <View style={styles.checkboxContainer}>
             <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
          <CheckBox value={dChecked2} onValueChange={setDChecked2} />
        </View>
      </View>
    </View> */}
    <View style={styles.section}>
  <Text style={styles.sectionTitle}>Control Stop</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black', marginRight:5}}>Promptness</Text>
      <CheckBox
        value={controlStopPromptness === 'S'}
        onValueChange={() => setControlStopPromptness('S')}
      />
    </View>
    
    <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
       
        onChangeText={setTotalForControlStopPromptness}
        value={totalForControlStopPromptness}
        placeholder='Enter Total'
      />
  </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={controlStopPromptness === 'S'}
        onValueChange={() => setControlStopPromptness('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={controlStopPromptness === 'D'}
        onValueChange={() => setControlStopPromptness('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={controlStopControl === 'S'}
        onValueChange={() => setControlStopControl('S')}
      />
    </View>
   
    <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
       
       onChangeText={setTotalForControlStopControl}
       value={totalForControlStopControl}
        placeholder='Enter Total'
      />
  </View>
    
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={controlStopControl === 'S'}
        onValueChange={() => setControlStopControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={controlStopControl === 'D'}
        onValueChange={() => setControlStopControl('D')}
      />
    </View>
  </View>
</View>
{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Control Stop</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Promptness</Text>
      <CheckBox value={controlStop.promptness === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={controlStop.promptness === 'Total'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={controlStop.promptness === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={controlStop.promptness === 'D'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, promptness: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Control</Text>
      <CheckBox value={controlStop.control === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={controlStop.control === 'Total'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={controlStop.control === 'S'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={controlStop.control === 'D'} onValueChange={(newValue) => { if (newValue) setControlStop(prevState => ({ ...prevState, control: 'D' })); }} />
    </View>
  </View>
</View> */}

{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Left Reverse with trailer</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Control</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'Total'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.control === 'D'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, control: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Observation</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'Total'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'S'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={reverseOrLeftReverseWithTrailer.observation === 'D'} onValueChange={(newValue) => { if (newValue) setReverseOrLeftReverseWithTrailer(prevState => ({ ...prevState, observation: 'D' })); }} />
    </View>
  </View>
</View> */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Left Reverse with trailer</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'S'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerControl('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrLeftReverseWithTrailerControl}
        value={totalForReverseOrLeftReverseWithTrailerControl}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'S'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerControl === 'D'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerControl('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'S'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerObservation('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrLeftReverseWithTrailerObservation}
        value={totalForReverseOrLeftReverseWithTrailerObservation}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'S'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerObservation('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseOrLeftReverseWithTrailerObservation === 'D'}
        onValueChange={() => setReverseOrLeftReverseWithTrailerObservation('D')}
      />
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse/ Right</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={reverseOrRightControl === 'S'}
        onValueChange={() => setReverseOrRightControl('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrRightControl}
        value={totalForReverseOrRightControl}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black'}} >S</Text> 
      <CheckBox
        value={reverseOrRightControl === 'S'}
        onValueChange={() => setReverseOrRightControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseOrRightControl === 'D'}
        onValueChange={() => setReverseOrRightControl('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={reverseOrRightObservation === 'S'}
        onValueChange={() => setReverseOrRightObservation('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseOrRightObservation}
        value={totalForReverseOrRightObservation}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={reverseOrRightObservation === 'S'}
        onValueChange={() => setReverseOrRightObservation('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseOrRightObservation === 'D'}
        onValueChange={() => setReverseOrRightObservation('D')}
      />
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Reverse Park</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={reverseParkControl === 'S'}
        onValueChange={() => setReverseParkControl('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseParkControl}
        value={totalForReverseParkControl}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={reverseParkControl === 'S'}
        onValueChange={() => setReverseParkControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseParkControl === 'D'}
        onValueChange={() => setReverseParkControl('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={reverseParkObservation === 'S'}
        onValueChange={() => setReverseParkObservation('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForReverseParkObservation}
        value={totalForReverseParkObservation}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={reverseParkObservation === 'S'}
        onValueChange={() => setReverseParkObservation('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={reverseParkObservation === 'D'}
        onValueChange={() => setReverseParkObservation('D')}
      />
    </View>
  </View>
</View>




    
    

    <View style={styles.row1}>
  <Text style={{color:'black', fontWeight:'bold', fontSize:16, marginRight:7}}>R</Text>
  <CheckBox
    value={isRChecked}
    onValueChange={setIsRChecked}
    style={styles.checkbox}
  />
  <Text style={{color:'black', fontWeight:'bold', fontSize:16,marginRight:7, marginLeft:7}}>C</Text>
  <CheckBox
    value={isCChecked}
    onValueChange={setIsCChecked}
    style={styles.checkbox}
  />
</View>
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Turn in road</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={turnInRoadControl === 'S'}
        onValueChange={() => setTurnInRoadControl('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurnInRoadControl}
        value={totalForTurnInRoadControl}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={turnInRoadControl === 'S'}
        onValueChange={() => setTurnInRoadControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={turnInRoadControl === 'D'}
        onValueChange={() => setTurnInRoadControl('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={turnInRoadObservation === 'S'}
        onValueChange={() => setTurnInRoadObservation('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurnInRoadObservation}
        value={totalForTurnInRoadObservation}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={turnInRoadObservation === 'S'}
        onValueChange={() => setTurnInRoadObservation('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={turnInRoadObservation === 'D'}
        onValueChange={() => setTurnInRoadObservation('D')}
      />
    </View>
  </View>
</View>


<View style={styles.row2}>
  <Text style={styles.label}>Vehicle Check</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForVehicleCheck}
        value={totalForVehicleCheck}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
 
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={vehicleCheck === 'S'}
        onValueChange={() => setVehicleCheck('S')}
      />
    </View>
    <View style={styles.commonBox}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={vehicleCheck === 'D'}
        onValueChange={() => setVehicleCheck('D')}
      />
    </View>
   
  </View>
</View>


      
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Taxi Manoeuvre</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30, color:'black', marginRight:5}} >Control</Text>
      <CheckBox
        value={taxiManoeuvreControl === 'S'}
        onValueChange={() => setTaxiManoeuvreControl('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTaxiManoeuvreControl}
        value={totalForTaxiManoeuvreControl}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={taxiManoeuvreControl === 'S'}
        onValueChange={() => setTaxiManoeuvreControl('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={taxiManoeuvreControl === 'D'}
        onValueChange={() => setTaxiManoeuvreControl('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={taxiManoeuvreObservation === 'S'}
        onValueChange={() => setTaxiManoeuvreObservation('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTaxiManoeuvreObservation}
        value={totalForTaxiManoeuvreObservation}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={taxiManoeuvreObservation === 'S'}
        onValueChange={() => setTaxiManoeuvreObservation('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={taxiManoeuvreObservation === 'D'}
        onValueChange={() => setTaxiManoeuvreObservation('D')}
      />
    </View>
  </View>
</View>

     
    <View style={styles.row2}>
      <Text style={styles.label}>Taxi wheelchair</Text>
      <View style={{flex: 1}}>
        <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
          <View style={styles.commonBox}>
              <Text style={{color:'black', marginRight:5}}>S</Text>
            <CheckBox value={sCheckedHCodeSafety} onValueChange={setSCheckedHCodeSafety} />
          </View>
          
        </View>
      
      </View>
    </View>
      
        
    <View style={styles.row2}> 
    <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Uncouple/</Text>
  <Text style={styles.label}>Recouple</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForUncoupleOrRecouple}
          value={totalForUncoupleOrRecouple}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
 
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={uncoupleOrRecouple === 'S'}
          onValueChange={() => setUncoupleOrRecouple('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={uncoupleOrRecouple === 'D'}
          onValueChange={() => setUncoupleOrRecouple('D')}
        />
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Precautions</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForPrecautions}
          value={totalForPrecautions}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={precautions === 'S'}
          onValueChange={() => setPrecautions('S')}
        />
      </View>
     
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={precautions === 'D'}
          onValueChange={() => setPrecautions('D')}
        />
      </View>
    </View>
  </View>
</View>
  
    <Text style={styles.NewsectionTitle}>Control</Text>
    
    <View style={styles.row2}>
  <Text style={styles.label}>Accelerator</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForAccelerator}
          value={totalForAccelerator}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={accelerator === 'S'}
          onValueChange={() => setAccelerator('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={accelerator === 'D'}
          onValueChange={() => setAccelerator('D')}
        />
      </View>
      
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Clutch</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForClutch}
          value={totalForClutch}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={clutch === 'S'}
          onValueChange={() => setClutch('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={clutch === 'D'}
          onValueChange={() => setClutch('D')}
        />
      </View>
     
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Gears</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForGears}
          value={totalForGears}
          placeholder='Enter Total'
        />
      </View>

  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={gears === 'S'}
          onValueChange={() => setGears('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={gears === 'D'}
          onValueChange={() => setGears('D')}
        />
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Footbrake</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForFootbrake}
          value={totalForFootbrake}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={footbrake === 'S'}
          onValueChange={() => setFootbrake('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={footbrake === 'D'}
          onValueChange={() => setFootbrake('D')}
        />
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
    <Text style={styles.label}>Parking brake/</Text>
    <Text style={styles.label}>MC front brake</Text>
  
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForParkingBrakeOrMCFrontBrake}
          value={totalForParkingBrakeOrMCFrontBrake}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={parkingBrakeOrMCFrontBrake === 'S'}
          onValueChange={() => setParkingBrakeOrMCFrontBrake('S')}
        />
      </View>
      <View style={styles.commonBox}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={parkingBrakeOrMCFrontBrake === 'D'}
          onValueChange={() => setParkingBrakeOrMCFrontBrake('D')}
        />
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Steering</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginLeft: 30, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForSteering}
          value={totalForSteering}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={steering === 'S'}
          onValueChange={() => setSteering('S')}
        />
      </View>
      <View style={styles.commonBox}>
           <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={steering === 'D'}
          onValueChange={() => setSteering('D')}
        />
      </View>
     
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Balance M/C</Text>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForBalanceMOrC}
          value={totalForBalanceMOrC}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={balanceMOrC === 'S'}
          onValueChange={() => setBalanceMOrC('S')}
        />
      </View>
      <View style={styles.commonBox}>
           <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={balanceMOrC === 'D'}
          onValueChange={() => setBalanceMOrC('D')}
        />
      </View>
     
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:"column"}} >
  <Text style={styles.label}>LGV/ PCV gear</Text>
 
  <Text style={styles.label}>exercise</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForLgvOrPcvGearExercise}
          value={totalForLgvOrPcvGearExercise}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={lgvOrPcvGearExercise === 'S'}
          onValueChange={() => setLgvOrPcvGearExercise('S')}
        />
      </View>
      <View style={styles.commonBox}>
           <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={lgvOrPcvGearExercise === 'D'}
          onValueChange={() => setLgvOrPcvGearExercise('D')}
        />
      </View>
    
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:"column"}}>
  <Text style={styles.label}>PCV door </Text>
  <Text style={styles.label}>exercise</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
        <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
        <TextInput
          onChangeText={setTotalForPcvDoorExercise}
          value={totalForPcvDoorExercise}
          placeholder='Enter Total'
        />
      </View>
  <View style={{flex: 1}}>
    <View style={{flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center'}}>
      <View style={styles.commonBox}>
          <Text style={{color:'black', marginRight:5}}>S</Text>
        <CheckBox
          value={pcvDoorExercise === 'S'}
          onValueChange={() => setPcvDoorExercise('S')}
        />
      </View>
      <View style={styles.commonBox}>
           <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
        <CheckBox
          value={pcvDoorExercise === 'D'}
          onValueChange={() => setPcvDoorExercise('D')}
        />
      </View>
     
    </View>
  </View>
</View>

    <View style={styles.section}>
  <Text style={styles.sectionTitle}>Move Off</Text>
  
  <View style={styles.newrow}>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black', marginRight:7}} >Safety</Text>
    <CheckBox
      value={safety === 'S'}
      onValueChange={() => setSafety('S')}
    />
  </View>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setTotalForSafety}
      value={totalForSafety}
      placeholder='Enter Total'
    />
  </View>
  <View style={styles.checkboxContainer}>
      <Text style={{color:'black', marginRight:5}}>S</Text>
    <CheckBox
      value={safety === 'S'}
      onValueChange={() => setSafety('S')}
    />
  </View>
  <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
    <CheckBox
      value={safety === 'D'}
      onValueChange={() => setSafety('D')}
    />
  </View>
</View>

<View style={styles.newrow}>
  <View style={styles.checkboxContainer}>
    <Text style={{color:'black',marginRight:7}}>Control</Text>
    <CheckBox
      value={control === 'S'}
      onValueChange={() => setControl('S')}
    />
  </View>
  <View style={styles.surveyInputContainer12 }>
    <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
    <TextInput
      onChangeText={setTotalForControl}
      value={totalForControl}
      placeholder='Enter Total'
    />
  </View>
  <View style={styles.checkboxContainer}>
      <Text style={{color:'black', marginRight:5}}>S</Text>
    <CheckBox
      value={control === 'S'}
      onValueChange={() => setControl('S')}
    />
  </View>
  <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
    <CheckBox
      value={control === 'D'}
      onValueChange={() => setControl('D')}
    />
  </View>
</View>
</View>

{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Use of mirrors- M/C rear obs</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Signalling</Text>
      <CheckBox value={useOfMirrors.signalling === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.signalling === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={useOfMirrors.signalling === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={useOfMirrors.signalling === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, signalling: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Change Directions</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={useOfMirrors.changeDirections === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeDirections: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Change Speed</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'Total'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={useOfMirrors.changeSpeed === 'D'} onValueChange={(newValue) => { if (newValue) setUseOfMirrors(prevState => ({ ...prevState, changeSpeed: 'D' })); }} />
    </View>
  </View>
</View> */}

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Use of mirrors- M/C rear obs</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:7}} >Signalling</Text>
      <CheckBox
        value={signallingForUseOfMirrors === 'S'}
        onValueChange={() => setSignallingForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSignallingForUseOfMirrors}
        value={totalForSignallingForUseOfMirrors}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={signallingForUseOfMirrors === 'S'}
        onValueChange={() => setSignallingForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={signallingForUseOfMirrors === 'D'}
        onValueChange={() => setSignallingForUseOfMirrors('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Change </Text>
      <Text style={{color:'black',marginRight:7}}>Directions</Text>
      </View>
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'S'}
        onValueChange={() => setChangeDirectionForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForChangeDirectionForUseOfMirrors}
        value={totalForChangeDirectionForUseOfMirrors}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'S'}
        onValueChange={() => setChangeDirectionForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={changeDirectionForUseOfMirrors === 'D'}
        onValueChange={() => setChangeDirectionForUseOfMirrors('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Change </Text>
      <Text style={{color:'black'}}>Speed</Text>
      </View>
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'S'}
        onValueChange={() => setChangeSpeedForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForChangeSpeedForUseOfMirrors}
        value={totalForChangeSpeedForUseOfMirrors}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'S'}
        onValueChange={() => setChangeSpeedForUseOfMirrors('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={changeSpeedForUseOfMirrors === 'D'}
        onValueChange={() => setChangeSpeedForUseOfMirrors('D')}
      />
    </View>
  </View>
</View>

{/*       
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Necessary</Text>
      <CheckBox value={signals.necessary === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.necessary === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={signals.necessary === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={signals.necessary === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, necessary: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Correctly</Text>
      <CheckBox value={signals.correctly === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.correctly === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={signals.correctly === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={signals.correctly === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, correctly: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Timed</Text>
      <CheckBox value={signals.timed === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={signals.timed === 'Total'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={signals.timed === 'S'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={signals.timed === 'D'} onValueChange={(newValue) => { if (newValue) setSignals(prevState => ({ ...prevState, timed: 'D' })); }} />
    </View>
  </View>
</View> */}


<View style={styles.section}>
  <Text style={styles.sectionTitle}>Signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Necessary</Text>
      <CheckBox
        value={necessaryForSignals === 'S'}
        onValueChange={() => setNecessaryForSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalsOfNecessaryForSignals}
        value={totalsOfNecessaryForSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={necessaryForSignals === 'S'}
        onValueChange={() => setNecessaryForSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={necessaryForSignals === 'D'}
        onValueChange={() => setNecessaryForSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Correctly</Text>
      <CheckBox
        value={correctlyForSignals === 'S'}
        onValueChange={() => setCorrectlyForSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalOfCorrectlyForSignals}
        value={totalOfCorrectlyForSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={correctlyForSignals === 'S'}
        onValueChange={() => setCorrectlyForSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={correctlyForSignals === 'D'}
        onValueChange={() => setCorrectlyForSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Timed</Text>
      <CheckBox
        value={timedForSignals === 'S'}
        onValueChange={() => setTimedForSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalOfTimedForSignals}
        value={totalOfTimedForSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={timedForSignals === 'S'}
        onValueChange={() => setTimedForSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={timedForSignals === 'D'}
        onValueChange={() => setTimedForSignals('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Clearance/ </Text>
  <Text style={styles.label}>obstruction</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForClearanceOrObstruction}
        value={totalForClearanceOrObstruction}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={clearanceOrObstruction === 'S'}
        onValueChange={() => setClearanceOrObstruction('S')}
      />
    </View>
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={clearanceOrObstruction === 'D'}
        onValueChange={() => setClearanceOrObstruction('D')}
      />
    </View>
   
  </View>
</View>

    {/* <View style={styles.section}>
  <Text style={styles.sectionTitle}>Response to signs/ signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Traffic Signals</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficSignals === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficSignals: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficSignals === 'Total'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficSignals: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficSignals === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficSignals: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficSignals === 'D'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficSignals: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Road Markings</Text>
      <CheckBox value={resposeToSignsOrSignals.roadMarkings === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, roadMarkings: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={resposeToSignsOrSignals.roadMarkings === 'Total'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, roadMarkings: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={resposeToSignsOrSignals.roadMarkings === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, roadMarkings: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={resposeToSignsOrSignals.roadMarkings === 'D'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, roadMarkings: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Traffic Lights</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficLights === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficLights: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficLights === 'Total'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficLights: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficLights === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficLights: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficLights === 'D'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficLights: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Traffic Controllers</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficControllers === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficControllers: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficControllers === 'Total'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficControllers: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficControllers === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficControllers: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={resposeToSignsOrSignals.trafficControllers === 'D'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, trafficControllers: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Other Road Users</Text>
      <CheckBox value={resposeToSignsOrSignals.otherRoadUsers === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, otherRoadUsers: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={resposeToSignsOrSignals.otherRoadUsers === 'Total'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, otherRoadUsers: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={resposeToSignsOrSignals.otherRoadUsers === 'S'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, otherRoadUsers: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={resposeToSignsOrSignals.otherRoadUsers === 'D'} onValueChange={(newValue) => { if (newValue) setResposeToSignsOrSignals(prevState => ({ ...prevState, otherRoadUsers: 'D' })); }} />
    </View>
  </View>
</View>
 */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Response to signs/ signals</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black'}}>Traffic </Text>
      <Text style={{color:'black',marginRight:5}}>Signals</Text>
      </View>
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficSignalsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficSignalsForResponseToSignsOrSignals}
        value={totalForTrafficSignalsForResponseToSignsOrSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficSignalsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={trafficSignalsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => setTrafficSignalsForResponseToSignsOrSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Road </Text>
      <Text style={{color:'black',marginRight:5}}>Markings</Text>
      </View>
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setRoadMarkingsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForRoadMarkingsForResponseToSignsOrSignals}
        value={totalForRoadMarkingsForResponseToSignsOrSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setRoadMarkingsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={roadMarkingsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => setRoadMarkingsForResponseToSignsOrSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Traffic </Text>
      <Text style={{color:'black',marginRight:5}}>Lights</Text>
      </View>
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficLightsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficLightsForResponseToSignsOrSignals}
        value={totalForTrafficLightsForResponseToSignsOrSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficLightsForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={trafficLightsForResponseToSignsOrSignals === 'D'}
        onValueChange={() => setTrafficLightsForResponseToSignsOrSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Traffic </Text>
      <Text style={{color:'black',marginRight:5}}>Controllers</Text>
      </View>
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficControllersForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTrafficControllersForResponseToSignsOrSignals}
        value={totalForTrafficControllersForResponseToSignsOrSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setTrafficControllersForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={trafficControllersForResponseToSignsOrSignals === 'D'}
        onValueChange={() => setTrafficControllersForResponseToSignsOrSignals('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Other Road </Text>
      <Text style={{color:'black'}}>Users</Text>
      </View>
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setOtherRoadUsersForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForOtherRoadUsersForResponseToSignsOrSignals}
        value={totalForOtherRoadUsersForResponseToSignsOrSignals}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'S'}
        onValueChange={() => setOtherRoadUsersForResponseToSignsOrSignals('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={otherRoadUsersForResponseToSignsOrSignals === 'D'}
        onValueChange={() => setOtherRoadUsersForResponseToSignsOrSignals('D')}
      />
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Use of Speed</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForUseOfSpeed}
        value={totalForUseOfSpeed}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={useOfSpeed === 'S'}
        onValueChange={() => setUseOfSpeed('S')}
      />
    </View>
  
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={useOfSpeed === 'D'}
        onValueChange={() => setUseOfSpeed('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Following</Text>
  <Text style={styles.label}>distance</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForFollowingDistance}
        value={totalForFollowingDistance}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={followingDistance === 'S'}
        onValueChange={() => setFollowingDistance('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={followingDistance === 'D'}
        onValueChange={() => setFollowingDistance('D')}
      />
    </View>
  </View>
</View>

<View style={styles.section}>
  <Text style={styles.sectionTitle}>Progress</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:"column"}} >
      <Text style={{color:'black',marginRight:5}}>Appropriate</Text>
      <Text style={{color:'black',marginRight:5}}>Speed</Text>
      </View>
      <CheckBox
        value={appropriateSpeedForProgress === 'S'}
        onValueChange={() => setAppropriateSpeedForProgress('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAppropriateSpeedForProgress}
        value={totalForAppropriateSpeedForProgress}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={appropriateSpeedForProgress === 'S'}
        onValueChange={() => setAppropriateSpeedForProgress('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={appropriateSpeedForProgress === 'D'}
        onValueChange={() => setAppropriateSpeedForProgress('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:"column"}} >
      <Text style={{color:'black',marginRight:5}}>Undue</Text>
      <Text style={{color:'black',marginRight:5}}>Hesitation</Text>
      </View>
      <CheckBox
        value={undueHesitationForProgress === 'S'}
        onValueChange={() => setUndueHesitationForProgress('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForUndueHesitationForProgress}
        value={totalForUndueHesitationForProgress}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={undueHesitationForProgress === 'S'}
        onValueChange={() => setUndueHesitationForProgress('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={undueHesitationForProgress === 'D'}
        onValueChange={() => setUndueHesitationForProgress('D')}
      />
    </View>
  </View>
</View>

{/* 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Junctions</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{marginLeft: 30}} >Approach Speed</Text>
      <CheckBox value={junctions.approachSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, approachSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={junctions.approachSpeed === 'Total'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, approachSpeed: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={junctions.approachSpeed === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, approachSpeed: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={junctions.approachSpeed === 'D'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, approachSpeed: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Observation</Text>
      <CheckBox value={junctions.observation === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={junctions.observation === 'Total'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, observation: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={junctions.observation === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, observation: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={junctions.observation === 'D'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, observation: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Turning Right</Text>
      <CheckBox value={junctions.turningRight === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningRight: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={junctions.turningRight === 'Total'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningRight: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={junctions.turningRight === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningRight: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={junctions.turningRight === 'D'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningRight: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Turning Left</Text>
      <CheckBox value={junctions.turningLeft === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningLeft: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={junctions.turningLeft === 'Total'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningLeft: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={junctions.turningLeft === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningLeft: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={junctions.turningLeft === 'D'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, turningLeft: 'D' })); }} />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text>Cutting Corners</Text>
      <CheckBox value={junctions.cuttingCorners === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, cuttingCorners: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
      <Text>Total</Text>
      <CheckBox value={junctions.cuttingCorners === 'Total'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, cuttingCorners: 'Total' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox value={junctions.cuttingCorners === 'S'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, cuttingCorners: 'S' })); }} />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox value={junctions.cuttingCorners === 'D'} onValueChange={(newValue) => { if (newValue) setJunctions(prevState => ({ ...prevState, cuttingCorners: 'D' })); }} />
    </View>
  </View>
</View>
 */}


<View style={styles.section}>
  <Text style={styles.sectionTitle}>Junctions</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Approach </Text>
      <Text style={{color:'black',marginRight:5}}>Speed</Text>
      </View>
      <CheckBox
        value={approachSpeedForJunctions === 'S'}
        onValueChange={() => setApproachSpeedForJunctions('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForApproachSpeedForJunctions}
        value={totalForApproachSpeedForJunctions}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={approachSpeedForJunctions === 'S'}
        onValueChange={() => setApproachSpeedForJunctions('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={approachSpeedForJunctions === 'D'}
        onValueChange={() => setApproachSpeedForJunctions('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
       <Text style={{color:'black',marginRight:5}}>Observation</Text>
      <CheckBox
        value={observationForJunctions === 'S'}
        onValueChange={() => setObservationForJunctions('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForObservationForJunctions}
        value={totalForObservationForJunctions}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={observationForJunctions === 'S'}
        onValueChange={() => setObservationForJunctions('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={observationForJunctions === 'D'}
        onValueChange={() => setObservationForJunctions('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Turning </Text>
      <Text style={{color:'black',marginRight:5}}>Right</Text>
      </View>
      <CheckBox
        value={turningRightForJunctions === 'S'}
        onValueChange={() => setTurningRightForJunctions('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurningRightForJunctions}
        value={totalForTurningRightForJunctions}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={turningRightForJunctions === 'S'}
        onValueChange={() => setTurningRightForJunctions('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={turningRightForJunctions === 'D'}
        onValueChange={() => setTurningRightForJunctions('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Turning </Text>
      <Text style={{color:'black',marginRight:5}}>Left</Text>
      </View>
      <CheckBox
        value={turningLeftForJunctions === 'S'}
        onValueChange={() => setTurningLeftForJunctions('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForTurningLeftForJunctions}
        value={totalForTurningLeftForJunctions}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={turningLeftForJunctions === 'S'}
        onValueChange={() => setTurningLeftForJunctions('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={turningLeftForJunctions === 'D'}
        onValueChange={() => setTurningLeftForJunctions('D')}
      />
    </View>
  </View>
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}}>Cutting </Text>
      <Text style={{color:'black',marginRight:5}}>Corners</Text>
      </View>
      <CheckBox
        value={cuttingCornersForJunctions === 'S'}
        onValueChange={() => setCuttingCornersForJunctions('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForCuttingCornersForJunctions}
        value={totalForCuttingCornersForJunctions}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={cuttingCornersForJunctions === 'S'}
        onValueChange={() => setCuttingCornersForJunctions('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={cuttingCornersForJunctions === 'D'}
        onValueChange={() => setCuttingCornersForJunctions('D')}
      />
    </View>
  </View>
</View>

 
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Judgement</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}} >Overtaking</Text>
      <CheckBox
        value={overtakingForJudgement === 'S'}
        onValueChange={() => setOvertakingForJudgement('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForOvertakingForJudgement}
        value={totalForOvertakingForJudgement}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={overtakingForJudgement === 'S'}
        onValueChange={() => setOvertakingForJudgement('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={overtakingForJudgement === 'D'}
        onValueChange={() => setOvertakingForJudgement('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Meeting</Text>
      <CheckBox
        value={meetingForJudgement === 'S'}
        onValueChange={() => setMeetingForJudgement('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForMeetingForJudgement}
        value={totalForMeetingForJudgement}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={meetingForJudgement === 'S'}
        onValueChange={() => setMeetingForJudgement('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={meetingForJudgement === 'D'}
        onValueChange={() => setMeetingForJudgement('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <Text style={{color:'black',marginRight:5}}>Crossing</Text>
      <CheckBox
        value={crossingForJudgement === 'S'}
        onValueChange={() => setCrossingForJudgement('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForCrossingForJudgement}
        value={totalForCrossingForJudgement}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={crossingForJudgement === 'S'}
        onValueChange={() => setCrossingForJudgement('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={crossingForJudgement === 'D'}
        onValueChange={() => setCrossingForJudgement('D')}
      />
    </View>
  </View>
</View>

               
<View style={styles.section}>
  <Text style={styles.sectionTitle}>Positioning</Text>
  
  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
      <View style={{flexDirection:'column'}} >
      <Text  style={{color:'black',marginRight:5}}>Normal</Text>
      <Text style={{color:'black',marginRight:5}}>Driving</Text>
      </View>
      <CheckBox
        value={normalDrivingForPositioning === 'S'}
        onValueChange={() => setNormalDrivingForPositioning('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForNormalDrivingForPositioning}
        value={totalForNormalDrivingForPositioning}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={normalDrivingForPositioning === 'S'}
        onValueChange={() => setNormalDrivingForPositioning('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={normalDrivingForPositioning === 'D'}
        onValueChange={() => setNormalDrivingForPositioning('D')}
      />
    </View>
  </View>

  <View style={styles.newrow}>
    <View style={styles.checkboxContainer}>
    <View style={{flexDirection:'column'}} >
      <Text style={{color:'black',marginRight:5}} >Lane</Text>
      <Text style={{color:'black',marginRight:5}}>Discipline</Text>
      </View>
      <CheckBox
        value={laneDisciplineForPositioning === 'S'}
        onValueChange={() => setLaneDisciplineForPositioning('S')}
      />
    </View>
    <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForLaneDisciplineForPositioning}
        value={totalForLaneDisciplineForPositioning}
        placeholder='Enter Total'
      />
    </View>
    <View style={styles.checkboxContainer}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={laneDisciplineForPositioning === 'S'}
        onValueChange={() => setLaneDisciplineForPositioning('S')}
      />
    </View>
    <View style={styles.checkboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={laneDisciplineForPositioning === 'D'}
        onValueChange={() => setLaneDisciplineForPositioning('D')}
      />
    </View>
  </View>
</View>

<View style={styles.row2}>
  <View style={{flexDirection:'column'}}>
  <Text style={styles.label}>Pedestrian</Text>
  <Text style={styles.label}>Crossing</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForPedestrianCrossing}
        value={totalForPedestrianCrossing}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={pedestrianCrossing === 'S'}
        onValueChange={() => setPedestrianCrossing('S')}
      />
    </View>
    
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={pedestrianCrossing === 'D'}
        onValueChange={() => setPedestrianCrossing('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}} >
  <Text style={styles.label}>Position/</Text>
  <Text style={styles.label}>normal stops</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForPositionOrNormalStops}
        value={totalForPositionOrNormalStops}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={positionOrNormalStops === 'S'}
        onValueChange={() => setPositionOrNormalStops('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={positionOrNormalStops === 'D'}
        onValueChange={() => setPositionOrNormalStops('D')}
      />
    </View>
  </View>
</View><View style={styles.row2}>
  <View style={{flexDirection:"column"}} >
  <Text style={styles.label}>Awareness/</Text>
  <Text style={styles.label}> Planning</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAwarenessOrPlanning}
        value={totalForAwarenessOrPlanning}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={awarenessOrPlanning === 'S'}
        onValueChange={() => setAwarenessOrPlanning('S')}
      />
    </View>
    
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={awarenessOrPlanning === 'D'}
        onValueChange={() => setAwarenessOrPlanning('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <View style={{flexDirection:'column'}}>
  <Text style={styles.label}>Ancillary</Text>
  <Text style={styles.label}>controls</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForAncillaryControls}
        value={totalForAncillaryControls}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={ancillaryControls === 'S'}
        onValueChange={() => setAncillaryControls('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={ancillaryControls === 'D'}
        onValueChange={() => setAncillaryControls('D')}
      />
    </View>
  </View>
</View>

    

<View style={styles.row2}>
  <View style={{flexDirection:"column"}}>
  <Text style={styles.label}>Eco Safe</Text>
  <Text style={styles.label}>Driving</Text>
  </View>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForEcoSafeDriving}
        value={totalForEcoSafeDriving}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={ecoSafeDriving === 'S'}
        onValueChange={() => setEcoSafeDriving('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={ecoSafeDriving === 'D'}
        onValueChange={() => setEcoSafeDriving('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-1</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare1}
        value={totalForSpare1}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={spare1 === 'S'}
        onValueChange={() => setSpare1('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={spare1 === 'D'}
        onValueChange={() => setSpare1('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-2</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare2}
        value={totalForSpare2}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={spare2 === 'S'}
        onValueChange={() => setSpare2('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={spare2 === 'D'}
        onValueChange={() => setSpare2('D')}
      />
    </View>
  </View>
</View>

<View style={styles.row2}>
  <Text style={styles.label}>Spare-3</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare3}
        value={totalForSpare3}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={spare3 === 'S'}
        onValueChange={() => setSpare3('S')}
      />
    </View>

    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={spare3 === 'D'}
        onValueChange={() => setSpare3('D')}
      />
    </View>
  </View>
</View>
<View style={styles.row2}>
  <Text style={styles.label}>Spare-4</Text>
  <View style={styles.surveyInputContainer12 }>
      <Text style={{fontSize:15,marginRight: 0, color:'black' }}>Total:</Text>
      <TextInput
        onChangeText={setTotalForSpare4}
        value={totalForSpare4}
        placeholder='Enter Total'
      />
    </View>
  <View style={{flex: 1, flexDirection:'row', justifyContent: 'flex-end', alignItems: 'center', }}>
    <View  style={styles.commonBox}>
        <Text style={{color:'black', marginRight:5}}>S</Text>
      <CheckBox
        value={spare4 === 'S'}
        onValueChange={() => setSpare4('S')}
      />
    </View>
   
    <View style={styles.commonBox}>
         <Text style={{color:'black',marginRight:5, marginLeft:5}}>D</Text>
      <CheckBox
        value={spare4 === 'D'}
        onValueChange={() => setSpare4('D')}
      />
    </View>
  </View>
</View>
    <View style={styles.sectionnew}>
      <Text style={styles.sectionTitle}>Wheelchair</Text>
      
      <View style={styles.newrow1}>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black',marginRight:5, marginLeft:5}}>Pass</Text>
          <CheckBox value={wheelchairPassChecked} onValueChange={setWheelchairPassChecked} />
        </View>
        <View style={styles.checkboxContainer}>
          <Text style={{color:'black',marginRight:5,marginLeft:5}}> Fail</Text>
          <CheckBox value={wheelchairFailChecked} onValueChange={setWheelchairFailChecked} />
        </View>
      </View>
    </View>
    <View style={styles.uniqueSection}>
    
      
    <View style={styles.uniqueRow}>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black',marginRight:5,marginLeft:5}}>Pass</Text>
    <CheckBox value={endresult === 'Pass'} onValueChange={(newValue) => { if (newValue) setEndresult('Pass'); }} />
  </View>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black',marginRight:5}}>Fail</Text>
    <CheckBox value={endresult === 'Fail'} onValueChange={(newValue) => { if (newValue) setEndresult('Fail'); }} />
  </View>
  <View style={styles.uniqueCheckboxContainer}>
    <Text style={{color:'black',marginRight:5}}>None</Text>
    <CheckBox value={endresult === 'None'} onValueChange={(newValue) => { if (newValue) setEndresult('None'); }} />
  </View>
</View>


      <View style={styles.uniqueRow}>
        <View style={styles.uniqueInputContainer}>
          <TextInput placeholder="Total Faults" value={totalFaults} onChangeText={setTotalFaults} />
        </View>
        <View style={styles.uniqueInputContainer}>
          <TextInput placeholder="Route No." value={routeNumber} onChangeText={setRouteNumber} />
        </View>
      </View>
    </View>

    <View style={styles.uniqueSection}>
      
      
    <View style={styles.uniqueRow}>
  <View style={styles.etaContainer}>
    <Text style={{fontSize:16, fontWeight:'bold',marginRight: 15, color:'black' }}>ETA: </Text>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black',marginRight:5}}>V</Text>
      <CheckBox value={ETA === 'V'} onValueChange={(newValue) => { if (newValue) setETA('V'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black',marginRight:5}}>P</Text>
      <CheckBox value={ETA === 'P'} onValueChange={(newValue) => { if (newValue) setETA('P'); }} />
    </View>
    <View style={styles.snContainer}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>SN</Text>
      <CheckBox value={ETA === 'SN'} onValueChange={(newValue) => { if (newValue) setETA('SN'); }} />
    </View>
  </View>
</View>

    </View>

    <View style={styles.uniqueSection}>
  <Text style={styles.uniqueSectionTitle1}>Survey</Text>
  
  <View style={styles.uniqueRow}>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7, marginLeft:7}}>A</Text>
      <CheckBox value={survey === 'A'} onValueChange={(newValue) => { if (newValue) setSurvey('A'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7}}>B</Text>
      <CheckBox value={survey === 'B'} onValueChange={(newValue) => { if (newValue) setSurvey('B'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7}}>C</Text>
      <CheckBox value={survey === 'C'} onValueChange={(newValue) => { if (newValue) setSurvey('C'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
         <Text style={{color:'black',marginRight:5, marginLeft:5, marginRight:7}}>D</Text>
      <CheckBox value={survey === 'D'} onValueChange={(newValue) => { if (newValue) setSurvey('D'); }} />
    </View>
  </View>

  <View style={styles.uniqueRow}>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7, marginLeft:7}}>E</Text>
      <CheckBox value={survey === 'E'} onValueChange={(newValue) => { if (newValue) setSurvey('E'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7}}>F</Text>
      <CheckBox value={survey === 'F'} onValueChange={(newValue) => { if (newValue) setSurvey('F'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7}}>G</Text>
      <CheckBox value={survey === 'G'} onValueChange={(newValue) => { if (newValue) setSurvey('G'); }} />
    </View>
    <View style={styles.uniqueCheckboxContainer}>
      <Text style={{color:'black', marginRight:7}}>H</Text>
      <CheckBox value={survey === 'H'} onValueChange={(newValue) => { if (newValue) setSurvey('H'); }} />
    </View>
  </View>
</View>


    <View style={styles.surveySection}>
      
      
      <View style={styles.surveyRow}>
        <View style={styles.surveyInputContainer1}>
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>Debrief:</Text>
          <TextInput value={debrief} onChangeText={setDebrief} placeholder='Debrief' />
        </View>
        <View style={styles.surveyInputContainer2}>
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' }}>Activity Code:</Text>
          <TextInput  value={activityCode} onChangeText={setActivityCode} placeholder='Activity Code' />
        </View>
      </View>
    </View>

    <View style={styles.renamedSection}>
      <View style={styles.renamedColumn}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black', marginBottom:5 }}>I acknowledge receipt of Pass Certificate Number:</Text>
        <TextInput placeholder="Enter Pass Certificate Number:" value={passCertificateNumber} onChangeText={setPassCertificateNumber} />
        <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black', marginTop:5 }}>Wheelchair Cert. No:</Text>
        <TextInput placeholder="Enter Cert. No.:" value={wheelchairCertNo} onChangeText={setWheelchairCertNo} />
      </View>
    </View>

      
    <View style={styles.renamedSection}>
      <View style={styles.renamedColumn}>
      <Text style={{fontSize:16, fontWeight:'bold',marginRight: 5, color:'black' ,marginTop:5}}>There has been no change to my health: see note 29 overleaf.</Text>
        <TextInput placeholder="Enter confirmation" value={healthStatusOrConfirmation} onChangeText={setHealthStatusOrConfirmation} />
       
      </View>
    </View>

    
    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>

     
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: windowWidth * 0.025, // 10/400
    backgroundColor:'#b5daaf'
  },
  titleContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  title: {
    fontSize: windowWidth * 0.05, // 20/400
    fontWeight: 'bold',
    color:'black'
  },
  subtitle: {
    fontSize: windowWidth * 0.03, // 12/400
    fontWeight: 'bold',
    color:'black'
  },
  titleMain: {
    fontSize: windowWidth * 0.055, // 22/400
    fontWeight: 'bold',
    color:'black',
    alignSelf:'center',
    marginBottom: windowHeight * 0.0166, // 15/900
    marginLeft: windowWidth * 0.220, // 22% of window width
    marginTop: windowHeight * 0.0111, // 10/900
  },
  headerContainer: {
    marginBottom: windowHeight * 0.0111, // 10/900
  },
  header: {
    fontSize: windowWidth * 0.04, // 16/400
    fontWeight: 'bold',
    color:'black'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black'
  },
  inputSmall: {
    width: 30,
    height: 30,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    marginLeft: 5,
  },
  inputHalf: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    flex: 0.5,
    color:'black'
  },
  inputHalf2:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    flex: 0.5,
    color:'black'
  },

  inputHalf3: {
    height: 30,
    borderColor: 'gray',
    width:160,
   alignSelf:'flex-end',
    paddingLeft: 10,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor:'white',
    fontSize:15,
    marginLeft: 10,
    color:'black'
    
  },
 
  inputHalf1: {
    height: 40,
    borderColor: 'gray',
   
    paddingLeft: 10,
    marginBottom: 10,
    color:'black',
    flex: 0.5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  catrow: {
    flexDirection: 'row',
    
  },
  catinput:{
    
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black',
    marginLeft: 10
  },
  adirow: {
    flexDirection: 'row',
    
  },
  adiinput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
    color: 'black',
    marginLeft: 10
  },
  row1: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor:"white",
    width:'40%'
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.6,
    borderBottomColor: 'gray',
    backgroundColor:'white'
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color:'black',
    marginRight: 10
  },

  commonBox:{
    flexDirection:'row', 
    alignItems: 'center',  
    backgroundColor:'white',
    marginBottom: 5
  },
  declarationContainer: {
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
  },
  declarationText: {
    color: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 67,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
  },
  buttonContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 86,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor:'white',
  },
  commonBox:{
    flexDirection:'row', alignItems: 'center',  backgroundColor:'white'
  },
  checkbox:{
marginTop:2
  },

  section: {
    marginBottom: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
  },

  sectionnew: {
    marginBottom: 20,
    borderBottomWidth: 0.7,
    borderBottomColor: 'gray',
    flexDirection:'row',
    justifyContent:"space-between"
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  NewsectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black',
    alignSelf:'center'
  },

  newrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor:"white"
  },
  newrow1: {
    flexDirection: 'row',
    alignSelf:'center',
    marginBottom: 10,
    backgroundColor:"white",
    marginLeft: 20,
    justifyContent:'flex-end'
  },


  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uniqueSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  uniqueSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  uniqueSectionTitle1: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black',
    alignSelf:'center'
  },

  uniqueRow: {
    flexDirection: 'row',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  uniqueCheckboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },

  uniqueInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    flex: 1,
  borderBottomWidth:0.3,
  color:'gray'
  },
  uniqueSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },

  snContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  surveySection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  surveySectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },

  surveyRow: {
    flexDirection: 'row',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },

  surveyInputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'35%',
    marginRight: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    height:50
  },
  surveyInputContainer12: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'37%',
    marginLeft: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'black',
   
    alignSelf:'center'
    
  },
  surveyInputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    width:'65%',
    marginRight: 10,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
  },
  renamedSection: {
    marginBottom: 20,
    backgroundColor: 'white',
  },

  renamedSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },

  renamedColumn: {
    flexDirection: 'column',
    alignSelf:'stretch',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  submitButton: {
    backgroundColor: '#61b08e',
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
  totalinput:{
    borderWidth:0,
    height:32,
    marginLeft:15,
    marginRight:15,
    fontSize:15
  },
  additionalStyle:{
    marginRight:10
  }

});

export default DriveForm3;