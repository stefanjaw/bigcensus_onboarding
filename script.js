// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Add event listener for the "Other" referral checkbox
document.getElementById('referralOther').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('referralExplainGroup').style.display = 'block';
  } else {
    document.getElementById('referralExplainGroup').style.display = 'none';
    document.getElementById('referralExplain').value = '';
    document.getElementById('referralExplain').classList.remove('is-invalid');
    document.getElementById('referralExplainError').style.display = 'none';
  }
});

// Add event listeners for the dementia radio buttons
document.getElementById('dementiaYes').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('dementiaDiagnosisDateGroup').style.display = 'block';
  }
});

document.getElementById('dementiaNo').addEventListener('change', function() {
  if (this.checked) {
    document.getElementById('dementiaDiagnosisDateGroup').style.display = 'none';
    document.getElementById('dementiaDiagnosisDate').value = '';
    document.getElementById('dementiaDiagnosisDate').classList.remove('is-invalid');
    document.getElementById('dementiaDiagnosisDateError').style.display = 'none';
  }
});

// Function to calculate and update dementia screening score
function calculateDementiaScore() {
  let score = 0;
  
  // Each "Yes, a change" answer gets 1 point
  if (document.getElementById('judgmentChange').checked) score += 1;
  if (document.getElementById('hobbiesChange').checked) score += 1;
  if (document.getElementById('repeatsChange').checked) score += 1;
  if (document.getElementById('toolsChange').checked) score += 1;
  if (document.getElementById('dateChange').checked) score += 1;
  if (document.getElementById('financialChange').checked) score += 1;
  if (document.getElementById('thinkingChange').checked) score += 1;
  
  // Update the score field
  document.getElementById('dementiaScore').value = score;
}

// Add event listeners to all dementia screening radio buttons to update score
const dementiaRadios = [
  'judgmentChange', 'judgmentNoChange', 'judgmentNA',
  'hobbiesChange', 'hobbiesNoChange', 'hobbiesNA',
  'repeatsChange', 'repeatsNoChange', 'repeatsNA',
  'toolsChange', 'toolsNoChange', 'toolsNA',
  'dateChange', 'dateNoChange', 'dateNA',
  'financialChange', 'financialNoChange', 'financialNA',
  'thinkingChange', 'thinkingNoChange', 'thinkingNA'
];

dementiaRadios.forEach(radioId => {
  document.getElementById(radioId).addEventListener('change', calculateDementiaScore);
});

// Set default date for dementiaScreeningDate to today
const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
document.getElementById('dementiaScreeningDate').value = today;

// Form elements
const patientForm = document.getElementById('patientForm');
const printButton = document.getElementById('printButton');
const printView = document.getElementById('printView');
const resetButton = document.getElementById('resetButton');
const submitButton = document.getElementById('submitButton');
const loadingSpinner = document.getElementById('loadingSpinner');
const submitText = document.getElementById('submitText');
const successMessage = document.getElementById('successMessage');
const errorMessage = document.getElementById('errorMessage');
const errorDetails = document.getElementById('errorDetails');

// Living Situation elements
const dwellingOther = document.getElementById('dwellingOther');
const otherDwellingGroup = document.getElementById('otherDwellingGroup');
const livesAloneYes = document.getElementById('livesAloneYes');
const livesAloneNo = document.getElementById('livesAloneNo');
const householdSection = document.getElementById('householdSection');
const householdTableBody = document.getElementById('householdTableBody');
const caregivingTableBody = document.getElementById('caregivingTableBody');
const addHouseholdMemberBtn = document.getElementById('addHouseholdMember');

// Patient Status elements
const directCareYes = document.getElementById('directCareYes');
const directCareNo = document.getElementById('directCareNo');
const responsiblePersonGroup = document.getElementById('responsiblePersonGroup');
const responsiblePerson = document.getElementById('responsiblePerson');
const contactsList = document.getElementById('contactsList');
const weightLossYes = document.getElementById('weightLossYes');
const weightLossNo = document.getElementById('weightLossNo');
const weightLossAmountGroup = document.getElementById('weightLossAmountGroup');
const weightLossAmount = document.getElementById('weightLossAmount');

// Hospitalization elements
const diagnosisTableBody = document.getElementById('diagnosisTableBody');
const addDiagnosisBtn = document.getElementById('addDiagnosis');

// Counters
let householdMemberCount = 1;
let diagnosisCount = 1;
let medicationCount = 1;

// Form fields
const formFields = {
  firstName: {
    element: document.getElementById('firstName'),
    errorElement: document.getElementById('firstNameError'),
    validators: {
      required: true,
      minLength: 2,
      maxLength: 50
    }
  },
  lastName: {
    element: document.getElementById('lastName'),
    errorElement: document.getElementById('lastNameError'),
    validators: {
      required: true,
      minLength: 2,
      maxLength: 50
    }
  },
  middleInitial: {
    element: document.getElementById('middleInitial'),
    errorElement: document.getElementById('middleInitialError'),
    validators: {
      maxLength: 1
    }
  },
  contactName: {
    element: document.getElementById('contactName'),
    errorElement: document.getElementById('contactNameError'),
    validators: {
      required: true,
      minLength: 2,
      maxLength: 100
    }
  },
  relationship: {
    element: document.getElementById('relationship'),
    errorElement: document.getElementById('relationshipError'),
    validators: {
      required: true,
      minLength: 2,
      maxLength: 50
    }
  },
  phoneNumber: {
    element: document.getElementById('phoneNumber'),
    errorElement: document.getElementById('phoneNumberError'),
    validators: {
      required: true,
      pattern: /^[0-9\-\(\)\s\+\.]+$/
    }
  },
  // Living Situation Fields
  dwelling: {
    elements: [
      document.getElementById('dwellingApartment'),
      document.getElementById('dwellingHouse'),
      document.getElementById('dwellingOther')
    ],
    errorElement: document.getElementById('dwellingError'),
    validators: {
      required: true
    }
  },
  otherDwelling: {
    element: document.getElementById('otherDwelling'),
    errorElement: document.getElementById('otherDwellingError'),
    validators: {
      conditionalRequired: true, // Only required if "Other" is selected
      maxLength: 100
    }
  },
  floor: {
    element: document.getElementById('floor'),
    errorElement: document.getElementById('floorError'),
    validators: {
      maxLength: 20
    }
  },
  numberOfRooms: {
    element: document.getElementById('numberOfRooms'),
    errorElement: document.getElementById('numberOfRoomsError'),
    validators: {
      min: 1
    }
  },
  elevator: {
    elements: [
      document.getElementById('elevatorYes'),
      document.getElementById('elevatorNo')
    ],
    errorElement: document.getElementById('elevatorError'),
    validators: {
      // Not required
    }
  },
  livesAlone: {
    elements: [
      document.getElementById('livesAloneYes'),
      document.getElementById('livesAloneNo')
    ],
    errorElement: document.getElementById('livesAloneError'),
    validators: {
      // Not required
    }
  },
  // Hospitalization Fields
  hospitalName: {
    element: document.getElementById('hospitalName'),
    errorElement: document.getElementById('hospitalNameError'),
    validators: {
      maxLength: 100
    }
  },
  hospitalAddress: {
    element: document.getElementById('hospitalAddress'),
    errorElement: document.getElementById('hospitalAddressError'),
    validators: {
      maxLength: 200
    }
  },
  hospitalFrom: {
    element: document.getElementById('hospitalFrom'),
    errorElement: document.getElementById('hospitalFromError'),
    validators: {
      // Not required
    }
  },
  hospitalTo: {
    element: document.getElementById('hospitalTo'),
    errorElement: document.getElementById('hospitalToError'),
    validators: {
      // Not required
    }
  },
  // Impairments - Sensory
  speechImpairment: {
    elements: [
      document.getElementById('speechNone'),
      document.getElementById('speechPartial'),
      document.getElementById('speechTotal')
    ],
    errorElement: document.getElementById('speechImpairmentError'),
    validators: {
      // Not required
    }
  },
  sightImpairment: {
    elements: [
      document.getElementById('sightNone'),
      document.getElementById('sightPartial'),
      document.getElementById('sightTotal')
    ],
    errorElement: document.getElementById('sightImpairmentError'),
    validators: {
      // Not required
    }
  },
  hearingImpairment: {
    elements: [
      document.getElementById('hearingNone'),
      document.getElementById('hearingPartial'),
      document.getElementById('hearingTotal')
    ],
    errorElement: document.getElementById('hearingImpairmentError'),
    validators: {
      // Not required
    }
  },
  // Impairments - Muscular/Motor
  handArmImpairment: {
    elements: [
      document.getElementById('handArmNone'),
      document.getElementById('handArmPartial'),
      document.getElementById('handArmTotal')
    ],
    errorElement: document.getElementById('handArmImpairmentError'),
    validators: {
      // Not required
    }
  },
  upperExtremitiesImpairment: {
    elements: [
      document.getElementById('upperExtremitiesNone'),
      document.getElementById('upperExtremitiesPartial'),
      document.getElementById('upperExtremitiesTotal')
    ],
    errorElement: document.getElementById('upperExtremitiesImpairmentError'),
    validators: {
      // Not required
    }
  },
  lowerExtremitiesImpairment: {
    elements: [
      document.getElementById('lowerExtremitiesNone'),
      document.getElementById('lowerExtremitiesPartial'),
      document.getElementById('lowerExtremitiesTotal')
    ],
    errorElement: document.getElementById('lowerExtremitiesImpairmentError'),
    validators: {
      // Not required
    }
  },
  // Cardiovascular / Respiratory Impairments
  respiratoryImpairment: {
    elements: [
      document.getElementById('respiratoryNone'),
      document.getElementById('respiratoryPartial'),
      document.getElementById('respiratoryTotal')
    ],
    errorElement: document.getElementById('respiratoryImpairmentError'),
    validators: {
      // Not required
    }
  },
  cardiacImpairment: {
    elements: [
      document.getElementById('cardiacNone'),
      document.getElementById('cardiacPartial'),
      document.getElementById('cardiacTotal')
    ],
    errorElement: document.getElementById('cardiacImpairmentError'),
    validators: {
      // Not required
    }
  },
  circulatoryImpairment: {
    elements: [
      document.getElementById('circulatoryNone'),
      document.getElementById('circulatoryPartial'),
      document.getElementById('circulatoryTotal')
    ],
    errorElement: document.getElementById('circulatoryImpairmentError'),
    validators: {
      // Not required
    }
  },
  cardioFunctionalImpact: {
    element: document.getElementById('cardioFunctionalImpact'),
    errorElement: document.getElementById('cardioFunctionalImpactError'),
    validators: {
      // Not required
      maxLength: 500
    }
  },
  // Tuberculosis History
  tbHistory: {
    elements: [
      document.getElementById('tbHistoryYes'),
      document.getElementById('tbHistoryNo')
    ],
    errorElement: document.getElementById('tbHistoryError'),
    validators: {
      // Not required
    }
  },
  tbHistoryPulmonary: {
    element: document.getElementById('tbHistoryPulmonary'),
    validators: {
      // Not required, checkbox
    }
  },
  tbHistoryExtraPulmonary: {
    element: document.getElementById('tbHistoryExtraPulmonary'),
    validators: {
      // Not required, checkbox
    }
  },
  tbCompletedTherapy: {
    elements: [
      document.getElementById('tbCompletedTherapyYes'),
      document.getElementById('tbCompletedTherapyNo')
    ],
    errorElement: document.getElementById('tbCompletedTherapyError'),
    validators: {
      // Not required
    }
  },
  currentTb: {
    elements: [
      document.getElementById('currentTbYes'),
      document.getElementById('currentTbNo')
    ],
    errorElement: document.getElementById('currentTbError'),
    validators: {
      // Not required
    }
  },
  currentTbPulmonary: {
    element: document.getElementById('currentTbPulmonary'),
    validators: {
      // Not required, checkbox
    }
  },
  currentTbExtraPulmonary: {
    element: document.getElementById('currentTbExtraPulmonary'),
    validators: {
      // Not required, checkbox
    }
  },
  currentProphylaxis: {
    elements: [
      document.getElementById('currentProphylaxisYes'),
      document.getElementById('currentProphylaxisNo')
    ],
    errorElement: document.getElementById('currentProphylaxisError'),
    validators: {
      // Not required
    }
  },
  prophylaxisHistory: {
    elements: [
      document.getElementById('prophylaxisHistoryYes'),
      document.getElementById('prophylaxisHistoryNo')
    ],
    errorElement: document.getElementById('prophylaxisHistoryError'),
    validators: {
      // Not required
    }
  },
  lastPpdDate: {
    element: document.getElementById('lastPpdDate'),
    errorElement: document.getElementById('lastPpdDateError'),
    validators: {
      // Not required
    }
  },
  lastPpdResult: {
    element: document.getElementById('lastPpdResult'),
    errorElement: document.getElementById('lastPpdResultError'),
    validators: {
      // Not required
      maxLength: 100
    }
  },
  anergyResults: {
    element: document.getElementById('anergyResults'),
    errorElement: document.getElementById('anergyResultsError'),
    validators: {
      // Not required
      maxLength: 200
    }
  },
  negativeAfb: {
    elements: [
      document.getElementById('negativeAfbYes'),
      document.getElementById('negativeAfbNo')
    ],
    errorElement: document.getElementById('negativeAfbError'),
    validators: {
      // Not required
    }
  },
  negativeChestXray: {
    elements: [
      document.getElementById('negativeChestXrayYes'),
      document.getElementById('negativeChestXrayNo')
    ],
    errorElement: document.getElementById('negativeChestXrayError'),
    validators: {
      // Not required
    }
  },
  // Mental Status Fields
  orientedStatus: {
    elements: [
      document.getElementById('orientedNever'),
      document.getElementById('orientedPartial'),
      document.getElementById('orientedTotal')
    ],
    errorElement: document.getElementById('orientedStatusError'),
    validators: {
      // Not required
    }
  },
  anxietyStatus: {
    elements: [
      document.getElementById('anxietyNever'),
      document.getElementById('anxietyPartial'),
      document.getElementById('anxietyTotal')
    ],
    errorElement: document.getElementById('anxietyStatusError'),
    validators: {
      // Not required
    }
  },
  agitatedStatus: {
    elements: [
      document.getElementById('agitatedNever'),
      document.getElementById('agitatedPartial'),
      document.getElementById('agitatedTotal')
    ],
    errorElement: document.getElementById('agitatedStatusError'),
    validators: {
      // Not required
    }
  },
  memoryLossStatus: {
    elements: [
      document.getElementById('memoryLossNever'),
      document.getElementById('memoryLossPartial'),
      document.getElementById('memoryLossTotal')
    ],
    errorElement: document.getElementById('memoryLossStatusError'),
    validators: {
      // Not required
    }
  },
  wandersStatus: {
    elements: [
      document.getElementById('wandersNever'),
      document.getElementById('wandersPartial'),
      document.getElementById('wandersTotal')
    ],
    errorElement: document.getElementById('wandersStatusError'),
    validators: {
      // Not required
    }
  },
  depressionStatus: {
    elements: [
      document.getElementById('depressionNever'),
      document.getElementById('depressionPartial'),
      document.getElementById('depressionTotal')
    ],
    errorElement: document.getElementById('depressionStatusError'),
    validators: {
      // Not required
    }
  },
  impairedJudgmentStatus: {
    elements: [
      document.getElementById('impairedJudgmentNever'),
      document.getElementById('impairedJudgmentPartial'),
      document.getElementById('impairedJudgmentTotal')
    ],
    errorElement: document.getElementById('impairedJudgmentStatusError'),
    validators: {
      // Not required
    }
  },
  dangerToOthersStatus: {
    elements: [
      document.getElementById('dangerToOthersNever'),
      document.getElementById('dangerToOthersPartial'),
      document.getElementById('dangerToOthersTotal')
    ],
    errorElement: document.getElementById('dangerToOthersStatusError'),
    validators: {
      // Not required
    }
  },
  dangerToSelfStatus: {
    elements: [
      document.getElementById('dangerToSelfNever'),
      document.getElementById('dangerToSelfPartial'),
      document.getElementById('dangerToSelfTotal')
    ],
    errorElement: document.getElementById('dangerToSelfStatusError'),
    validators: {
      // Not required
    }
  },
  articulatesNeedsStatus: {
    elements: [
      document.getElementById('articulatesNeedsNever'),
      document.getElementById('articulatesNeedsPartial'),
      document.getElementById('articulatesNeedsTotal')
    ],
    errorElement: document.getElementById('articulatesNeedsStatusError'),
    validators: {
      // Not required
    }
  },
  sleepDisorderStatus: {
    elements: [
      document.getElementById('sleepDisorderNever'),
      document.getElementById('sleepDisorderPartial'),
      document.getElementById('sleepDisorderTotal')
    ],
    errorElement: document.getElementById('sleepDisorderStatusError'),
    validators: {
      // Not required
    }
  },
  abusiveToOthersStatus: {
    elements: [
      document.getElementById('abusiveToOthersNever'),
      document.getElementById('abusiveToOthersPartial'),
      document.getElementById('abusiveToOthersTotal')
    ],
    errorElement: document.getElementById('abusiveToOthersStatusError'),
    validators: {
      // Not required
    }
  },
  abusiveToSelfStatus: {
    elements: [
      document.getElementById('abusiveToSelfNever'),
      document.getElementById('abusiveToSelfPartial'),
      document.getElementById('abusiveToSelfTotal')
    ],
    errorElement: document.getElementById('abusiveToSelfStatusError'),
    validators: {
      // Not required
    }
  },
  otherMentalStatus: {
    element: document.getElementById('otherMentalStatus'),
    errorElement: document.getElementById('otherMentalStatusError'),
    validators: {
      // Not required
      maxLength: 500
    }
  },
  // Medication Administration Fields
  independentStatus: {
    elements: [
      document.getElementById('independentNever'),
      document.getElementById('independentSometimes'),
      document.getElementById('independentAlways')
    ],
    errorElement: document.getElementById('independentStatusError'),
    validators: {
      // Not required
    }
  },
  needsRemindingStatus: {
    elements: [
      document.getElementById('needsRemindingNever'),
      document.getElementById('needsRemindingSometimes'),
      document.getElementById('needsRemindingAlways')
    ],
    errorElement: document.getElementById('needsRemindingStatusError'),
    validators: {
      // Not required
    }
  },
  nonCompliantStatus: {
    elements: [
      document.getElementById('nonCompliantNever'),
      document.getElementById('nonCompliantSometimes'),
      document.getElementById('nonCompliantAlways')
    ],
    errorElement: document.getElementById('nonCompliantStatusError'),
    validators: {
      // Not required
    }
  },
  needsHelpPreparingStatus: {
    elements: [
      document.getElementById('needsHelpPreparingNever'),
      document.getElementById('needsHelpPreparingSometimes'),
      document.getElementById('needsHelpPreparingAlways')
    ],
    errorElement: document.getElementById('needsHelpPreparingStatusError'),
    validators: {
      // Not required
    }
  },
  needsAdministrationStatus: {
    elements: [
      document.getElementById('needsAdministrationNever'),
      document.getElementById('needsAdministrationSometimes'),
      document.getElementById('needsAdministrationAlways')
    ],
    errorElement: document.getElementById('needsAdministrationStatusError'),
    validators: {
      // Not required
    }
  },
  canBeTaught: {
    elements: [
      document.getElementById('canBeTaughtYes'),
      document.getElementById('canBeTaughtNo')
    ],
    errorElement: document.getElementById('canBeTaughtError'),
    validators: {
      // Not required
    }
  },
  explainTeaching: {
    element: document.getElementById('explainTeaching'),
    errorElement: document.getElementById('explainTeachingError'),
    validators: {
      // Not required
      maxLength: 500
    }
  },
  medicationArrangements: {
    element: document.getElementById('medicationArrangements'),
    errorElement: document.getElementById('medicationArrangementsError'),
    validators: {
      // Not required
      maxLength: 500
    }
  },
  // Elimination Fields
  continentBowel: {
    element: document.getElementById('continentBowel'),
    validators: {
      // Not required, checkbox
    }
  },
  continentBladder: {
    element: document.getElementById('continentBladder'),
    validators: {
      // Not required, checkbox
    }
  },
  occasionallyIncontinentBowel: {
    element: document.getElementById('occasionallyIncontinentBowel'),
    validators: {
      // Not required, checkbox
    }
  },
  occasionallyIncontinentBladder: {
    element: document.getElementById('occasionallyIncontinentBladder'),
    validators: {
      // Not required, checkbox
    }
  },
  incontinentBowel: {
    element: document.getElementById('incontinentBowel'),
    validators: {
      // Not required, checkbox
    }
  },
  incontinentBladder: {
    element: document.getElementById('incontinentBladder'),
    validators: {
      // Not required, checkbox
    }
  },
  // Medical Treatment Fields
  decubitusCare: {
    element: document.getElementById('decubitusCare'),
    validators: {
      // Not required, checkbox
    }
  },
  dressingsSimple: {
    element: document.getElementById('dressingsSimple'),
    validators: {
      // Not required, checkbox
    }
  },
  dressingsSterile: {
    element: document.getElementById('dressingsSterile'),
    validators: {
      // Not required, checkbox
    }
  },
  enema: {
    element: document.getElementById('enema'),
    validators: {
      // Not required, checkbox
    }
  },
  catheterCare: {
    element: document.getElementById('catheterCare'),
    validators: {
      // Not required, checkbox
    }
  },
  monitorVitalSigns: {
    element: document.getElementById('monitorVitalSigns'),
    validators: {
      // Not required, checkbox
    }
  },
  tubeFeeding: {
    element: document.getElementById('tubeFeeding'),
    validators: {
      // Not required, checkbox
    }
  },
  tubeIrrigation: {
    element: document.getElementById('tubeIrrigation'),
    validators: {
      // Not required, checkbox
    }
  },
  suctioning: {
    element: document.getElementById('suctioning'),
    validators: {
      // Not required, checkbox
    }
  },
  oxygenAdministration: {
    element: document.getElementById('oxygenAdministration'),
    validators: {
      // Not required, checkbox
    }
  },
  bloodTests: {
    element: document.getElementById('bloodTests'),
    validators: {
      // Not required, checkbox
    }
  },
  ambulationExercise: {
    element: document.getElementById('ambulationExercise'),
    validators: {
      // Not required, checkbox
    }
  },
  rehabilitationTherapy: {
    element: document.getElementById('rehabilitationTherapy'),
    validators: {
      // Not required, checkbox
    }
  },
  physicalTherapy: {
    element: document.getElementById('physicalTherapy'),
    validators: {
      // Not required, checkbox
    }
  },
  // Service Needs Fields
  // Ambulate inside
  ambInsideNoHelp: {
    element: document.getElementById('ambInsideNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  ambInsideCane: {
    element: document.getElementById('ambInsideCane'),
    validators: {
      // Not required, checkbox
    }
  },
  ambInsideWalker: {
    element: document.getElementById('ambInsideWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  ambInsideWheelchair: {
    element: document.getElementById('ambInsideWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  ambInsideAssistance: {
    element: document.getElementById('ambInsideAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  ambInsideUnable: {
    element: document.getElementById('ambInsideUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Ambulate outside
  ambOutsideNoHelp: {
    element: document.getElementById('ambOutsideNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  ambOutsideCane: {
    element: document.getElementById('ambOutsideCane'),
    validators: {
      // Not required, checkbox
    }
  },
  ambOutsideWalker: {
    element: document.getElementById('ambOutsideWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  ambOutsideWheelchair: {
    element: document.getElementById('ambOutsideWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  ambOutsideAssistance: {
    element: document.getElementById('ambOutsideAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  ambOutsideUnable: {
    element: document.getElementById('ambOutsideUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Get up from seated position
  getUpSeatedNoHelp: {
    element: document.getElementById('getUpSeatedNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpSeatedCane: {
    element: document.getElementById('getUpSeatedCane'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpSeatedWalker: {
    element: document.getElementById('getUpSeatedWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpSeatedWheelchair: {
    element: document.getElementById('getUpSeatedWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpSeatedAssistance: {
    element: document.getElementById('getUpSeatedAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpSeatedUnable: {
    element: document.getElementById('getUpSeatedUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Get up from bed
  getUpBedNoHelp: {
    element: document.getElementById('getUpBedNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpBedCane: {
    element: document.getElementById('getUpBedCane'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpBedWalker: {
    element: document.getElementById('getUpBedWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpBedWheelchair: {
    element: document.getElementById('getUpBedWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpBedAssistance: {
    element: document.getElementById('getUpBedAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  getUpBedUnable: {
    element: document.getElementById('getUpBedUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Transfer to: commode
  transferCommodeNoHelp: {
    element: document.getElementById('transferCommodeNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  transferCommodeCane: {
    element: document.getElementById('transferCommodeCane'),
    validators: {
      // Not required, checkbox
    }
  },
  transferCommodeWalker: {
    element: document.getElementById('transferCommodeWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  transferCommodeWheelchair: {
    element: document.getElementById('transferCommodeWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  transferCommodeAssistance: {
    element: document.getElementById('transferCommodeAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  transferCommodeUnable: {
    element: document.getElementById('transferCommodeUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Transfer to: Wheelchair
  transferWheelchairNoHelp: {
    element: document.getElementById('transferWheelchairNoHelp'),
    validators: {
      // Not required, checkbox
    }
  },
  transferWheelchairCane: {
    element: document.getElementById('transferWheelchairCane'),
    validators: {
      // Not required, checkbox
    }
  },
  transferWheelchairWalker: {
    element: document.getElementById('transferWheelchairWalker'),
    validators: {
      // Not required, checkbox
    }
  },
  transferWheelchairWheelchair: {
    element: document.getElementById('transferWheelchairWheelchair'),
    validators: {
      // Not required, checkbox
    }
  },
  transferWheelchairAssistance: {
    element: document.getElementById('transferWheelchairAssistance'),
    validators: {
      // Not required, checkbox
    }
  },
  transferWheelchairUnable: {
    element: document.getElementById('transferWheelchairUnable'),
    validators: {
      // Not required, checkbox
    }
  },
  // Personal Service Needs Fields
  // Grooming
  groomingIndependent: {
    element: document.getElementById('groomingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  groomingPartial: {
    element: document.getElementById('groomingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  groomingTotal: {
    element: document.getElementById('groomingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Dressing
  dressingIndependent: {
    element: document.getElementById('dressingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  dressingPartial: {
    element: document.getElementById('dressingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  dressingTotal: {
    element: document.getElementById('dressingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Washing
  washingIndependent: {
    element: document.getElementById('washingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  washingPartial: {
    element: document.getElementById('washingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  washingTotal: {
    element: document.getElementById('washingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Bathing
  bathingIndependent: {
    element: document.getElementById('bathingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  bathingPartial: {
    element: document.getElementById('bathingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  bathingTotal: {
    element: document.getElementById('bathingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Feeding
  feedingIndependent: {
    element: document.getElementById('feedingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  feedingPartial: {
    element: document.getElementById('feedingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  feedingTotal: {
    element: document.getElementById('feedingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Meal Prep
  mealPrepIndependent: {
    element: document.getElementById('mealPrepIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  mealPrepPartial: {
    element: document.getElementById('mealPrepPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  mealPrepTotal: {
    element: document.getElementById('mealPrepTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Reheat Meals
  reheatMealsIndependent: {
    element: document.getElementById('reheatMealsIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  reheatMealsPartial: {
    element: document.getElementById('reheatMealsPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  reheatMealsTotal: {
    element: document.getElementById('reheatMealsTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Toileting
  toiletingIndependent: {
    element: document.getElementById('toiletingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  toiletingPartial: {
    element: document.getElementById('toiletingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  toiletingTotal: {
    element: document.getElementById('toiletingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Urinal/Bedpan
  urinalIndependent: {
    element: document.getElementById('urinalIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  urinalPartial: {
    element: document.getElementById('urinalPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  urinalTotal: {
    element: document.getElementById('urinalTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Commode
  commodeIndependent: {
    element: document.getElementById('commodeIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  commodePartial: {
    element: document.getElementById('commodePartial'),
    validators: {
      // Not required, checkbox
    }
  },
  commodeTotal: {
    element: document.getElementById('commodeTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Catheter
  catheterIndependent: {
    element: document.getElementById('catheterIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  catheterPartial: {
    element: document.getElementById('catheterPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  catheterTotal: {
    element: document.getElementById('catheterTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Laundry
  laundryIndependent: {
    element: document.getElementById('laundryIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  laundryPartial: {
    element: document.getElementById('laundryPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  laundryTotal: {
    element: document.getElementById('laundryTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Shopping
  shoppingIndependent: {
    element: document.getElementById('shoppingIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  shoppingPartial: {
    element: document.getElementById('shoppingPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  shoppingTotal: {
    element: document.getElementById('shoppingTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Housecleaning
  housecleaningIndependent: {
    element: document.getElementById('housecleaningIndependent'),
    validators: {
      // Not required, checkbox
    }
  },
  housecleaningPartial: {
    element: document.getElementById('housecleaningPartial'),
    validators: {
      // Not required, checkbox
    }
  },
  housecleaningTotal: {
    element: document.getElementById('housecleaningTotal'),
    validators: {
      // Not required, checkbox
    }
  },
  // Homebound
  isHomebound: {
    elements: [
      document.getElementById('homeboundYes'),
      document.getElementById('homeboundNo')
    ],
    errorElement: document.getElementById('isHomeboundError'),
    validators: {
      // Not required
    }
  },
  // Certification Fields
  personalObservation: {
    elements: [
      document.getElementById('personalObservationYes'),
      document.getElementById('personalObservationNo')
    ],
    errorElement: document.getElementById('personalObservationError'),
    validators: {
      // Not required
    }
  },
  relayedInfoBy: {
    element: document.getElementById('relayedInfoBy'),
    errorElement: document.getElementById('relayedInfoByError'),
    validators: {
      conditionalRequired: true, // Required if "No" is selected for personalObservation
      maxLength: 100
    }
  },
  preparedBy: {
    element: document.getElementById('preparedBy'),
    errorElement: document.getElementById('preparedByError'),
    validators: {
      required: true,
      maxLength: 100
    }
  },
  preparedByPhone: {
    element: document.getElementById('preparedByPhone'),
    errorElement: document.getElementById('preparedByPhoneError'),
    validators: {
      pattern: /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/
    }
  },
  agencyAffiliation: {
    element: document.getElementById('agencyAffiliation'),
    errorElement: document.getElementById('agencyAffiliationError'),
    validators: {
      maxLength: 100
    }
  },
  faxNumber: {
    element: document.getElementById('faxNumber'),
    errorElement: document.getElementById('faxNumberError'),
    validators: {
      pattern: /^(\+\d{1,2}\s?)?(\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/
    }
  },
  certificationDate: {
    element: document.getElementById('certificationDate'),
    errorElement: document.getElementById('certificationDateError'),
    validators: {
      required: true
    }
  },
  otherAgency: {
    elements: [
      document.getElementById('otherAgencyYes'),
      document.getElementById('otherAgencyNo')
    ],
    errorElement: document.getElementById('otherAgencyError'),
    validators: {
      // Not required
    }
  },
  otherAgencyName: {
    element: document.getElementById('otherAgencyName'),
    errorElement: document.getElementById('otherAgencyNameError'),
    validators: {
      conditionalRequired: true, // Required if "Yes" is selected for otherAgency
      maxLength: 100
    }
  },
  otherAgencyServices: {
    element: document.getElementById('otherAgencyServices'),
    errorElement: document.getElementById('otherAgencyServicesError'),
    validators: {
      conditionalRequired: true, // Required if "Yes" is selected for otherAgency
      maxLength: 200
    }
  },
  benefitsExhausted: {
    elements: [
      document.getElementById('benefitsExhaustedYes'),
      document.getElementById('benefitsExhaustedNo')
    ],
    errorElement: document.getElementById('benefitsExhaustedError'),
    validators: {
      // Not required
    }
  },
  medicaidEligible: {
    elements: [
      document.getElementById('medicaidEligibleYes'),
      document.getElementById('medicaidEligibleNo')
    ],
    errorElement: document.getElementById('medicaidEligibleError'),
    validators: {
      // Not required
    }
  },
  medicaidApplied: {
    elements: [
      document.getElementById('medicaidAppliedYes'),
      document.getElementById('medicaidAppliedNo')
    ],
    errorElement: document.getElementById('medicaidAppliedError'),
    validators: {
      // Not required
    }
  },
  medicaidReasons: {
    element: document.getElementById('medicaidReasons'),
    errorElement: document.getElementById('medicaidReasonsError'),
    validators: {
      conditionalRequired: true, // Required if "No" is selected for medicaidApplied
      maxLength: 500
    }
  },
  // Dementia Screening Interview Fields
  hasDementia: {
    elements: [
      document.getElementById('dementiaYes'),
      document.getElementById('dementiaNo')
    ],
    errorElement: document.getElementById('hasDementiaError'),
    validators: {
      // Not required
    }
  },
  dementiaDiagnosisDate: {
    element: document.getElementById('dementiaDiagnosisDate'),
    errorElement: document.getElementById('dementiaDiagnosisDateError'),
    validators: {
      conditionalRequired: true // Required if "Yes" is selected for hasDementia
    }
  },
  dementiaScreeningDate: {
    element: document.getElementById('dementiaScreeningDate'),
    errorElement: document.getElementById('dementiaScreeningDateError'),
    validators: {
      // Not required
    }
  },
  judgmentProblems: {
    elements: [
      document.getElementById('judgmentChange'),
      document.getElementById('judgmentNoChange'),
      document.getElementById('judgmentNA')
    ],
    errorElement: document.getElementById('judgmentProblemsError'),
    validators: {
      // Not required
    }
  },
  hobbiesInterest: {
    elements: [
      document.getElementById('hobbiesChange'),
      document.getElementById('hobbiesNoChange'),
      document.getElementById('hobbiesNA')
    ],
    errorElement: document.getElementById('hobbiesInterestError'),
    validators: {
      // Not required
    }
  },
  repeatsThings: {
    elements: [
      document.getElementById('repeatsChange'),
      document.getElementById('repeatsNoChange'),
      document.getElementById('repeatsNA')
    ],
    errorElement: document.getElementById('repeatsThingsError'),
    validators: {
      // Not required
    }
  },
  toolsLearning: {
    elements: [
      document.getElementById('toolsChange'),
      document.getElementById('toolsNoChange'),
      document.getElementById('toolsNA')
    ],
    errorElement: document.getElementById('toolsLearningError'),
    validators: {
      // Not required
    }
  },
  forgetsDate: {
    elements: [
      document.getElementById('dateChange'),
      document.getElementById('dateNoChange'),
      document.getElementById('dateNA')
    ],
    errorElement: document.getElementById('forgetsDateError'),
    validators: {
      // Not required
    }
  },
  financialTrouble: {
    elements: [
      document.getElementById('financialChange'),
      document.getElementById('financialNoChange'),
      document.getElementById('financialNA')
    ],
    errorElement: document.getElementById('financialTroubleError'),
    validators: {
      // Not required
    }
  },
  thinkingProblems: {
    elements: [
      document.getElementById('thinkingChange'),
      document.getElementById('thinkingNoChange'),
      document.getElementById('thinkingNA')
    ],
    errorElement: document.getElementById('thinkingProblemsError'),
    validators: {
      // Not required
    }
  },
  dementiaScore: {
    element: document.getElementById('dementiaScore'),
    errorElement: document.getElementById('dementiaScoreError'),
    validators: {
      // Not required
    }
  },
  // New Home Care Applicant Fields
  referralDoctor: {
    element: document.getElementById('referralDoctor'),
    validators: {
      // Not required, checkbox
    }
  },
  referralSocialWorker: {
    element: document.getElementById('referralSocialWorker'),
    validators: {
      // Not required, checkbox
    }
  },
  referralDischargePlanner: {
    element: document.getElementById('referralDischargePlanner'),
    validators: {
      // Not required, checkbox
    }
  },
  referralOther: {
    element: document.getElementById('referralOther'),
    validators: {
      // Not required, checkbox
    }
  },
  referralExplain: {
    element: document.getElementById('referralExplain'),
    errorElement: document.getElementById('referralExplainError'),
    validators: {
      conditionalRequired: true, // Required if "Other" is checked
      maxLength: 200
    }
  },
  referralLocation: {
    element: document.getElementById('referralLocation'),
    errorElement: document.getElementById('referralLocationError'),
    validators: {
      maxLength: 100
    }
  },
  // Patient Status Fields
  patientAlert: {
    elements: [
      document.getElementById('alertAlways'),
      document.getElementById('alertSometimes'),
      document.getElementById('alertNever')
    ],
    errorElement: document.getElementById('patientAlertError'),
    validators: {
      // Not required
    }
  },
  patientHeight: {
    element: document.getElementById('patientHeight'),
    errorElement: document.getElementById('patientHeightError'),
    validators: {
      // Not required
      min: 0
    }
  },
  patientWeight: {
    element: document.getElementById('patientWeight'),
    errorElement: document.getElementById('patientWeightError'),
    validators: {
      // Not required
      min: 0
    }
  },
  canDirectCare: {
    elements: [
      document.getElementById('directCareYes'),
      document.getElementById('directCareNo')
    ],
    errorElement: document.getElementById('canDirectCareError'),
    validators: {
      // Not required
    }
  },
  responsiblePerson: {
    element: document.getElementById('responsiblePerson'),
    errorElement: document.getElementById('responsiblePersonError'),
    validators: {
      conditionalRequired: true, // Only required if "No" is selected for canDirectCare
      maxLength: 100
    }
  },
  recentWeightLoss: {
    elements: [
      document.getElementById('weightLossYes'),
      document.getElementById('weightLossNo')
    ],
    errorElement: document.getElementById('recentWeightLossError'),
    validators: {
      // Not required
    }
  },
  weightLossAmount: {
    element: document.getElementById('weightLossAmount'),
    errorElement: document.getElementById('weightLossAmountError'),
    validators: {
      conditionalRequired: true, // Only required if "Yes" is selected for recentWeightLoss
      min: 0
    }
  }
};

// Validation functions
function validateField(fieldName) {
  const field = formFields[fieldName];
  let isValid = true;
  let errorMessage = '';

  // Clear previous validation errors
  if (field.errorElement) {
    field.errorElement.style.display = 'none';
    field.errorElement.textContent = '';
  }

  // Handle different field types
  if (field.elements) {
    // This is a checkbox group or radio group
    if (field.validators.required) {
      const checkedElements = field.elements.filter(el => el.checked);
      if (checkedElements.length === 0) {
        isValid = false;
        errorMessage = `Please select a ${fieldName.replace(/([A-Z])/g, ' $1').trim().toLowerCase()}`;
      }
    }
    
    // Special validation for dwelling other input
    if (fieldName === 'dwelling' && field.elements[2].checked) {
      // "Other" dwelling is selected, so validate the otherDwelling field
      const otherField = formFields.otherDwelling;
      const otherValue = otherField.element.value.trim();
      
      if (otherValue === '') {
        otherField.element.classList.add('is-invalid');
        otherField.errorElement.textContent = 'Please specify your dwelling type';
        otherField.errorElement.style.display = 'block';
        isValid = false;
      } else {
        otherField.element.classList.remove('is-invalid');
      }
    }
  } else {
    // This is a regular input field
    const value = field.element.value.trim();
    field.element.classList.remove('is-invalid');
    
    // Check conditionally required fields
    if (field.validators.conditionalRequired) {
      if (fieldName === 'otherDwelling') {
        // Only required if "Other" dwelling is selected
        const isOtherSelected = formFields.dwelling.elements[2].checked;
        if (isOtherSelected && value === '') {
          isValid = false;
          errorMessage = 'Please specify your dwelling type';
        }
      } else if (fieldName === 'responsiblePerson') {
        // Only required if "No" is selected for canDirectCare
        const cannotDirectCare = formFields.canDirectCare.elements[1].checked;
        if (cannotDirectCare && value === '') {
          isValid = false;
          errorMessage = 'Please specify who is responsible for directing care';
        }
      } else if (fieldName === 'weightLossAmount') {
        // Only required if "Yes" is selected for recentWeightLoss
        const hasWeightLoss = formFields.recentWeightLoss.elements[0].checked;
        if (hasWeightLoss && value === '') {
          isValid = false;
          errorMessage = 'Please specify the amount of weight lost';
        }
      } else if (fieldName === 'relayedInfoBy') {
        // Only required if "No" is selected for personalObservation
        const notPersonalObservation = formFields.personalObservation.elements[1].checked;
        if (notPersonalObservation && value === '') {
          isValid = false;
          errorMessage = 'Please specify who relayed the assessment information to you';
        }
      } else if (fieldName === 'otherAgencyName' || fieldName === 'otherAgencyServices') {
        // Only required if "Yes" is selected for otherAgency
        const hasOtherAgency = formFields.otherAgency.elements[0].checked;
        if (hasOtherAgency && value === '') {
          isValid = false;
          errorMessage = fieldName === 'otherAgencyName' 
            ? 'Please specify the agency name' 
            : 'Please specify the services provided';
        }
      } else if (fieldName === 'medicaidReasons') {
        // Only required if "No" is selected for medicaidApplied
        const notAppliedToMedicaid = formFields.medicaidApplied.elements[1].checked;
        if (notAppliedToMedicaid && value === '') {
          isValid = false;
          errorMessage = 'Please specify the reasons for not applying to Medicaid';
        }
      } else if (fieldName === 'referralExplain') {
        // Only required if "Other" is checked for referral
        const isOtherReferral = formFields.referralOther.element.checked;
        if (isOtherReferral && value === '') {
          isValid = false;
          errorMessage = 'Please explain the other referral source';
        }
      } else if (fieldName === 'dementiaDiagnosisDate') {
        // Only required if "Yes" is selected for hasDementia
        const hasDementia = formFields.hasDementia.elements[0].checked;
        if (hasDementia && value === '') {
          isValid = false;
          errorMessage = 'Please specify when the patient was diagnosed with dementia';
        }
      }
    }
    // Check required
    else if (field.validators.required && value === '') {
      isValid = false;
      errorMessage = `${fieldName.replace(/([A-Z])/g, ' $1').trim()} is required`;
    }
    // Check minLength
    else if (field.validators.minLength && value.length < field.validators.minLength) {
      isValid = false;
      errorMessage = `${fieldName.replace(/([A-Z])/g, ' $1').trim()} must be at least ${field.validators.minLength} characters`;
    }
    // Check maxLength
    else if (field.validators.maxLength && value.length > field.validators.maxLength) {
      isValid = false;
      errorMessage = `${fieldName.replace(/([A-Z])/g, ' $1').trim()} cannot exceed ${field.validators.maxLength} characters`;
    }
    // Check pattern
    else if (field.validators.pattern && !field.validators.pattern.test(value)) {
      isValid = false;
      errorMessage = `Please enter a valid ${fieldName.replace(/([A-Z])/g, ' $1').toLowerCase()}`;
    }
    // Check min value for number inputs
    else if (field.validators.min && parseInt(value) < field.validators.min) {
      isValid = false;
      errorMessage = `${fieldName.replace(/([A-Z])/g, ' $1').trim()} must be at least ${field.validators.min}`;
    }

    if (!isValid && field.element) {
      field.element.classList.add('is-invalid');
    }
  }

  if (!isValid && field.errorElement) {
    field.errorElement.textContent = errorMessage;
    field.errorElement.style.display = 'block';
  }

  return isValid;
}

function validateForm() {
  let isValid = true;

  // Validate each field
  for (const fieldName in formFields) {
    if (!validateField(fieldName)) {
      isValid = false;
    }
  }

  return isValid;
}

// Event handlers
patientForm.addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Hide previous messages
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
  
  // Validate form
  if (!validateForm()) {
    // Scroll to the top of the form to show errors
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  
  // Show loading state
  submitButton.disabled = true;
  loadingSpinner.style.display = 'inline-block';
  submitText.textContent = 'Submitting...';
  
  // Collect form data
  const patientData = {
    firstName: formFields.firstName.element.value.trim(),
    lastName: formFields.lastName.element.value.trim(),
    middleInitial: formFields.middleInitial.element.value.trim(),
    emergencyContact: {
      name: formFields.contactName.element.value.trim(),
      relationship: formFields.relationship.element.value.trim(),
      phoneNumber: formFields.phoneNumber.element.value.trim()
    },
    livingArrangement: {
      dwelling: formFields.dwelling.elements.find(el => el.checked)?.value || '',
      otherDwelling: formFields.dwelling.elements[2].checked ? formFields.otherDwelling.element.value.trim() : '',
      floor: formFields.floor.element.value.trim(),
      numberOfRooms: formFields.numberOfRooms.element.value.trim(),
      hasElevator: formFields.elevator.elements[0].checked ? true : 
                  formFields.elevator.elements[1].checked ? false : null,
      livesAlone: formFields.livesAlone.elements[0].checked ? true : 
                 formFields.livesAlone.elements[1].checked ? false : null
    },
    impairments: {
      sensory: {
        speech: formFields.speechImpairment.elements[0].checked ? 'none' :
                formFields.speechImpairment.elements[1].checked ? 'partial' :
                formFields.speechImpairment.elements[2].checked ? 'total' : null,
        sight: formFields.sightImpairment.elements[0].checked ? 'none' :
              formFields.sightImpairment.elements[1].checked ? 'partial' :
              formFields.sightImpairment.elements[2].checked ? 'total' : null,
        hearing: formFields.hearingImpairment.elements[0].checked ? 'none' :
                formFields.hearingImpairment.elements[1].checked ? 'partial' :
                formFields.hearingImpairment.elements[2].checked ? 'total' : null
      },
      muscularMotor: {
        handArm: formFields.handArmImpairment.elements[0].checked ? 'none' :
                formFields.handArmImpairment.elements[1].checked ? 'partial' :
                formFields.handArmImpairment.elements[2].checked ? 'total' : null,
        upperExtremities: formFields.upperExtremitiesImpairment.elements[0].checked ? 'none' :
                         formFields.upperExtremitiesImpairment.elements[1].checked ? 'partial' :
                         formFields.upperExtremitiesImpairment.elements[2].checked ? 'total' : null,
        lowerExtremities: formFields.lowerExtremitiesImpairment.elements[0].checked ? 'none' :
                         formFields.lowerExtremitiesImpairment.elements[1].checked ? 'partial' :
                         formFields.lowerExtremitiesImpairment.elements[2].checked ? 'total' : null
      },
      cardiovascularRespiratory: {
        respiratory: formFields.respiratoryImpairment.elements[0].checked ? 'none' :
                    formFields.respiratoryImpairment.elements[1].checked ? 'partial' :
                    formFields.respiratoryImpairment.elements[2].checked ? 'total' : null,
        cardiac: formFields.cardiacImpairment.elements[0].checked ? 'none' :
                formFields.cardiacImpairment.elements[1].checked ? 'partial' :
                formFields.cardiacImpairment.elements[2].checked ? 'total' : null,
        circulatory: formFields.circulatoryImpairment.elements[0].checked ? 'none' :
                    formFields.circulatoryImpairment.elements[1].checked ? 'partial' :
                    formFields.circulatoryImpairment.elements[2].checked ? 'total' : null,
        functionalImpact: formFields.cardioFunctionalImpact.element.value.trim()
      }
    },
    patientStatus: {
      alertness: formFields.patientAlert.elements[0].checked ? 'always' :
                formFields.patientAlert.elements[1].checked ? 'sometimes' :
                formFields.patientAlert.elements[2].checked ? 'never' : null,
      height: formFields.patientHeight.element.value.trim(),
      weight: formFields.patientWeight.element.value.trim(),
      canDirectCare: formFields.canDirectCare.elements[0].checked ? true :
                    formFields.canDirectCare.elements[1].checked ? false : null,
      responsiblePerson: formFields.canDirectCare.elements[1].checked ? 
                        formFields.responsiblePerson.element.value.trim() : null,
      recentWeightLoss: formFields.recentWeightLoss.elements[0].checked ? true :
                       formFields.recentWeightLoss.elements[1].checked ? false : null,
      weightLossAmount: formFields.recentWeightLoss.elements[0].checked ?
                       formFields.weightLossAmount.element.value.trim() : null
    },
    hospitalization: {
      hospitalName: formFields.hospitalName.element.value.trim(),
      hospitalAddress: formFields.hospitalAddress.element.value.trim(),
      hospitalFrom: formFields.hospitalFrom.element.value.trim(),
      hospitalTo: formFields.hospitalTo.element.value.trim(),
      diagnoses: []
    },
    tuberculosisHistory: {
      hasTbHistory: formFields.tbHistory.elements[0].checked ? true :
                    formFields.tbHistory.elements[1].checked ? false : null,
      tbHistoryType: {
        pulmonary: formFields.tbHistoryPulmonary.element?.checked || false,
        extraPulmonary: formFields.tbHistoryExtraPulmonary.element?.checked || false
      },
      completedTherapy: formFields.tbCompletedTherapy.elements[0].checked ? true :
                       formFields.tbCompletedTherapy.elements[1].checked ? false : null,
      hasCurrentTb: formFields.currentTb.elements[0].checked ? true :
                   formFields.currentTb.elements[1].checked ? false : null,
      currentTbType: {
        pulmonary: formFields.currentTbPulmonary.element?.checked || false,
        extraPulmonary: formFields.currentTbExtraPulmonary.element?.checked || false
      },
      onProphylaxis: formFields.currentProphylaxis.elements[0].checked ? true :
                    formFields.currentProphylaxis.elements[1].checked ? false : null,
      hasProphylaxisHistory: formFields.prophylaxisHistory.elements[0].checked ? true :
                           formFields.prophylaxisHistory.elements[1].checked ? false : null,
      lastPpdDate: formFields.lastPpdDate.element.value.trim(),
      lastPpdResult: formFields.lastPpdResult.element.value.trim(),
      anergyResults: formFields.anergyResults.element.value.trim(),
      hasNegativeAfb: formFields.negativeAfb.elements[0].checked ? true :
                     formFields.negativeAfb.elements[1].checked ? false : null,
      hasNegativeChestXray: formFields.negativeChestXray.elements[0].checked ? true :
                          formFields.negativeChestXray.elements[1].checked ? false : null
    },
    mentalStatus: {
      orientedPlaceTime: formFields.orientedStatus.elements[0].checked ? 'never' :
                        formFields.orientedStatus.elements[1].checked ? 'partial' :
                        formFields.orientedStatus.elements[2].checked ? 'total' : null,
      anxiety: formFields.anxietyStatus.elements[0].checked ? 'never' :
              formFields.anxietyStatus.elements[1].checked ? 'partial' :
              formFields.anxietyStatus.elements[2].checked ? 'total' : null,
      agitated: formFields.agitatedStatus.elements[0].checked ? 'never' :
               formFields.agitatedStatus.elements[1].checked ? 'partial' :
               formFields.agitatedStatus.elements[2].checked ? 'total' : null,
      shortTermMemoryLoss: formFields.memoryLossStatus.elements[0].checked ? 'never' :
                          formFields.memoryLossStatus.elements[1].checked ? 'partial' :
                          formFields.memoryLossStatus.elements[2].checked ? 'total' : null,
      wanders: formFields.wandersStatus.elements[0].checked ? 'never' :
              formFields.wandersStatus.elements[1].checked ? 'partial' :
              formFields.wandersStatus.elements[2].checked ? 'total' : null,
      depression: formFields.depressionStatus.elements[0].checked ? 'never' :
                 formFields.depressionStatus.elements[1].checked ? 'partial' :
                 formFields.depressionStatus.elements[2].checked ? 'total' : null,
      impairedJudgment: formFields.impairedJudgmentStatus.elements[0].checked ? 'never' :
                       formFields.impairedJudgmentStatus.elements[1].checked ? 'partial' :
                       formFields.impairedJudgmentStatus.elements[2].checked ? 'total' : null,
      dangerToOthers: formFields.dangerToOthersStatus.elements[0].checked ? 'never' :
                     formFields.dangerToOthersStatus.elements[1].checked ? 'partial' :
                     formFields.dangerToOthersStatus.elements[2].checked ? 'total' : null,
      dangerToSelf: formFields.dangerToSelfStatus.elements[0].checked ? 'never' :
                   formFields.dangerToSelfStatus.elements[1].checked ? 'partial' :
                   formFields.dangerToSelfStatus.elements[2].checked ? 'total' : null,
      articulatesNeeds: formFields.articulatesNeedsStatus.elements[0].checked ? 'never' :
                       formFields.articulatesNeedsStatus.elements[1].checked ? 'partial' :
                       formFields.articulatesNeedsStatus.elements[2].checked ? 'total' : null,
      sleepDisorder: formFields.sleepDisorderStatus.elements[0].checked ? 'never' :
                    formFields.sleepDisorderStatus.elements[1].checked ? 'partial' :
                    formFields.sleepDisorderStatus.elements[2].checked ? 'total' : null,
      abusiveToOthers: formFields.abusiveToOthersStatus.elements[0].checked ? 'never' :
                      formFields.abusiveToOthersStatus.elements[1].checked ? 'partial' :
                      formFields.abusiveToOthersStatus.elements[2].checked ? 'total' : null,
      abusiveToSelf: formFields.abusiveToSelfStatus.elements[0].checked ? 'never' :
                    formFields.abusiveToSelfStatus.elements[1].checked ? 'partial' :
                    formFields.abusiveToSelfStatus.elements[2].checked ? 'total' : null,
      otherInformation: formFields.otherMentalStatus.element.value.trim()
    },
    medicationAdministration: {
      totallyIndependent: formFields.independentStatus.elements[0].checked ? 'never' :
                         formFields.independentStatus.elements[1].checked ? 'sometimes' :
                         formFields.independentStatus.elements[2].checked ? 'always' : null,
      needsReminding: formFields.needsRemindingStatus.elements[0].checked ? 'never' :
                     formFields.needsRemindingStatus.elements[1].checked ? 'sometimes' :
                     formFields.needsRemindingStatus.elements[2].checked ? 'always' : null,
      nonCompliant: formFields.nonCompliantStatus.elements[0].checked ? 'never' :
                   formFields.nonCompliantStatus.elements[1].checked ? 'sometimes' :
                   formFields.nonCompliantStatus.elements[2].checked ? 'always' : null,
      needsHelpPreparing: formFields.needsHelpPreparingStatus.elements[0].checked ? 'never' :
                         formFields.needsHelpPreparingStatus.elements[1].checked ? 'sometimes' :
                         formFields.needsHelpPreparingStatus.elements[2].checked ? 'always' : null,
      needsAdministration: formFields.needsAdministrationStatus.elements[0].checked ? 'never' :
                          formFields.needsAdministrationStatus.elements[1].checked ? 'sometimes' :
                          formFields.needsAdministrationStatus.elements[2].checked ? 'always' : null,
      canBeTaught: formFields.canBeTaught.elements[0].checked ? true :
                  formFields.canBeTaught.elements[1].checked ? false : null,
      teachingExplanation: formFields.explainTeaching.element.value.trim(),
      administrationArrangements: formFields.medicationArrangements.element.value.trim(),
      medications: []
    },
    elimination: {
      continent: {
        bowel: formFields.continentBowel.element.checked,
        bladder: formFields.continentBladder.element.checked
      },
      occasionallyIncontinent: {
        bowel: formFields.occasionallyIncontinentBowel.element.checked,
        bladder: formFields.occasionallyIncontinentBladder.element.checked
      },
      incontinent: {
        bowel: formFields.incontinentBowel.element.checked,
        bladder: formFields.incontinentBladder.element.checked
      }
    },
    medicalTreatment: {
      decubitusCare: formFields.decubitusCare.element.checked,
      dressingsSimple: formFields.dressingsSimple.element.checked,
      dressingsSterile: formFields.dressingsSterile.element.checked,
      enema: formFields.enema.element.checked,
      catheterCare: formFields.catheterCare.element.checked,
      monitorVitalSigns: formFields.monitorVitalSigns.element.checked,
      tubeFeeding: formFields.tubeFeeding.element.checked,
      tubeIrrigation: formFields.tubeIrrigation.element.checked,
      suctioning: formFields.suctioning.element.checked,
      oxygenAdministration: formFields.oxygenAdministration.element.checked,
      bloodTests: formFields.bloodTests.element.checked,
      ambulationExercise: formFields.ambulationExercise.element.checked,
      rehabilitationTherapy: formFields.rehabilitationTherapy.element.checked,
      physicalTherapy: formFields.physicalTherapy.element.checked
    },
    serviceNeeds: {
      ambulateInside: {
        withoutHelp: formFields.ambInsideNoHelp.element.checked,
        withCane: formFields.ambInsideCane.element.checked,
        withWalker: formFields.ambInsideWalker.element.checked,
        withWheelchair: formFields.ambInsideWheelchair.element.checked,
        withPersonalAssistance: formFields.ambInsideAssistance.element.checked,
        unable: formFields.ambInsideUnable.element.checked
      },
      ambulateOutside: {
        withoutHelp: formFields.ambOutsideNoHelp.element.checked,
        withCane: formFields.ambOutsideCane.element.checked,
        withWalker: formFields.ambOutsideWalker.element.checked,
        withWheelchair: formFields.ambOutsideWheelchair.element.checked,
        withPersonalAssistance: formFields.ambOutsideAssistance.element.checked,
        unable: formFields.ambOutsideUnable.element.checked
      },
      getUpFromSeated: {
        withoutHelp: formFields.getUpSeatedNoHelp.element.checked,
        withCane: formFields.getUpSeatedCane.element.checked,
        withWalker: formFields.getUpSeatedWalker.element.checked,
        withWheelchair: formFields.getUpSeatedWheelchair.element.checked,
        withPersonalAssistance: formFields.getUpSeatedAssistance.element.checked,
        unable: formFields.getUpSeatedUnable.element.checked
      },
      getUpFromBed: {
        withoutHelp: formFields.getUpBedNoHelp.element.checked,
        withCane: formFields.getUpBedCane.element.checked,
        withWalker: formFields.getUpBedWalker.element.checked,
        withWheelchair: formFields.getUpBedWheelchair.element.checked,
        withPersonalAssistance: formFields.getUpBedAssistance.element.checked,
        unable: formFields.getUpBedUnable.element.checked
      },
      transferToCommode: {
        withoutHelp: formFields.transferCommodeNoHelp.element.checked,
        withCane: formFields.transferCommodeCane.element.checked,
        withWalker: formFields.transferCommodeWalker.element.checked,
        withWheelchair: formFields.transferCommodeWheelchair.element.checked,
        withPersonalAssistance: formFields.transferCommodeAssistance.element.checked,
        unable: formFields.transferCommodeUnable.element.checked
      },
      transferToWheelchair: {
        withoutHelp: formFields.transferWheelchairNoHelp.element.checked,
        withCane: formFields.transferWheelchairCane.element.checked,
        withWalker: formFields.transferWheelchairWalker.element.checked,
        withWheelchair: formFields.transferWheelchairWheelchair.element.checked,
        withPersonalAssistance: formFields.transferWheelchairAssistance.element.checked,
        unable: formFields.transferWheelchairUnable.element.checked
      }
    },
    personalServiceNeeds: {
      grooming: {
        independent: formFields.groomingIndependent.element.checked,
        partialAssist: formFields.groomingPartial.element.checked,
        totalAssist: formFields.groomingTotal.element.checked
      },
      dressing: {
        independent: formFields.dressingIndependent.element.checked,
        partialAssist: formFields.dressingPartial.element.checked,
        totalAssist: formFields.dressingTotal.element.checked
      },
      washing: {
        independent: formFields.washingIndependent.element.checked,
        partialAssist: formFields.washingPartial.element.checked,
        totalAssist: formFields.washingTotal.element.checked
      },
      bathing: {
        independent: formFields.bathingIndependent.element.checked,
        partialAssist: formFields.bathingPartial.element.checked,
        totalAssist: formFields.bathingTotal.element.checked
      },
      feeding: {
        independent: formFields.feedingIndependent.element.checked,
        partialAssist: formFields.feedingPartial.element.checked,
        totalAssist: formFields.feedingTotal.element.checked
      },
      mealPrep: {
        independent: formFields.mealPrepIndependent.element.checked,
        partialAssist: formFields.mealPrepPartial.element.checked,
        totalAssist: formFields.mealPrepTotal.element.checked
      },
      reheatMeals: {
        independent: formFields.reheatMealsIndependent.element.checked,
        partialAssist: formFields.reheatMealsPartial.element.checked,
        totalAssist: formFields.reheatMealsTotal.element.checked
      },
      toileting: {
        independent: formFields.toiletingIndependent.element.checked,
        partialAssist: formFields.toiletingPartial.element.checked,
        totalAssist: formFields.toiletingTotal.element.checked,
        urinalOrBedpan: {
          independent: formFields.urinalIndependent.element.checked,
          partialAssist: formFields.urinalPartial.element.checked,
          totalAssist: formFields.urinalTotal.element.checked
        },
        commode: {
          independent: formFields.commodeIndependent.element.checked,
          partialAssist: formFields.commodePartial.element.checked,
          totalAssist: formFields.commodeTotal.element.checked
        },
        catheter: {
          independent: formFields.catheterIndependent.element.checked,
          partialAssist: formFields.catheterPartial.element.checked,
          totalAssist: formFields.catheterTotal.element.checked
        }
      },
      laundry: {
        independent: formFields.laundryIndependent.element.checked,
        partialAssist: formFields.laundryPartial.element.checked,
        totalAssist: formFields.laundryTotal.element.checked
      },
      shopping: {
        independent: formFields.shoppingIndependent.element.checked,
        partialAssist: formFields.shoppingPartial.element.checked,
        totalAssist: formFields.shoppingTotal.element.checked
      },
      housecleaning: {
        independent: formFields.housecleaningIndependent.element.checked,
        partialAssist: formFields.housecleaningPartial.element.checked,
        totalAssist: formFields.housecleaningTotal.element.checked
      }
    },
    homebound: formFields.isHomebound.elements[0].checked ? true : 
               formFields.isHomebound.elements[1].checked ? false : null,
    certification: {
      personalObservation: formFields.personalObservation.elements[0].checked ? true :
                          formFields.personalObservation.elements[1].checked ? false : null,
      relayedInfoBy: formFields.personalObservation.elements[1].checked ? 
                     formFields.relayedInfoBy.element.value.trim() : null,
      preparedBy: formFields.preparedBy.element.value.trim(),
      preparedByPhone: formFields.preparedByPhone.element.value.trim(),
      agencyAffiliation: formFields.agencyAffiliation.element.value.trim(),
      faxNumber: formFields.faxNumber.element.value.trim(),
      certificationDate: formFields.certificationDate.element.value,
      otherAgency: {
        hasOtherAgency: formFields.otherAgency.elements[0].checked ? true :
                       formFields.otherAgency.elements[1].checked ? false : null,
        agencyName: formFields.otherAgency.elements[0].checked ? 
                    formFields.otherAgencyName.element.value.trim() : null,
        services: formFields.otherAgency.elements[0].checked ? 
                 formFields.otherAgencyServices.element.value.trim() : null
      },
      benefitsExhausted: formFields.benefitsExhausted.elements[0].checked ? true :
                        formFields.benefitsExhausted.elements[1].checked ? false : null,
      medicaidEligible: formFields.medicaidEligible.elements[0].checked ? true :
                       formFields.medicaidEligible.elements[1].checked ? false : null,
      medicaidApplied: formFields.medicaidApplied.elements[0].checked ? true :
                      formFields.medicaidApplied.elements[1].checked ? false : null,
      notAppliedReasons: formFields.medicaidApplied.elements[1].checked ?
                        formFields.medicaidReasons.element.value.trim() : null
    },
    dementiaScreening: {
      hasDementia: formFields.hasDementia.elements[0].checked ? true :
                  formFields.hasDementia.elements[1].checked ? false : null,
      diagnosisDate: formFields.hasDementia.elements[0].checked ?
                     formFields.dementiaDiagnosisDate.element.value : null,
      screeningDate: formFields.dementiaScreeningDate.element.value,
      questions: {
        judgmentProblems: formFields.judgmentProblems.elements[0].checked ? 'change' :
                          formFields.judgmentProblems.elements[1].checked ? 'no_change' :
                          formFields.judgmentProblems.elements[2].checked ? 'na' : null,
        hobbiesInterest: formFields.hobbiesInterest.elements[0].checked ? 'change' :
                         formFields.hobbiesInterest.elements[1].checked ? 'no_change' :
                         formFields.hobbiesInterest.elements[2].checked ? 'na' : null,
        repeatsThings: formFields.repeatsThings.elements[0].checked ? 'change' :
                       formFields.repeatsThings.elements[1].checked ? 'no_change' :
                       formFields.repeatsThings.elements[2].checked ? 'na' : null,
        toolsLearning: formFields.toolsLearning.elements[0].checked ? 'change' :
                       formFields.toolsLearning.elements[1].checked ? 'no_change' :
                       formFields.toolsLearning.elements[2].checked ? 'na' : null,
        forgetsDate: formFields.forgetsDate.elements[0].checked ? 'change' :
                     formFields.forgetsDate.elements[1].checked ? 'no_change' :
                     formFields.forgetsDate.elements[2].checked ? 'na' : null,
        financialTrouble: formFields.financialTrouble.elements[0].checked ? 'change' :
                          formFields.financialTrouble.elements[1].checked ? 'no_change' :
                          formFields.financialTrouble.elements[2].checked ? 'na' : null,
        thinkingProblems: formFields.thinkingProblems.elements[0].checked ? 'change' :
                          formFields.thinkingProblems.elements[1].checked ? 'no_change' :
                          formFields.thinkingProblems.elements[2].checked ? 'na' : null
      },
      totalScore: formFields.dementiaScore.element.value
    },
    newApplicant: {
      referralSource: {
        doctor: formFields.referralDoctor.element.checked,
        socialWorker: formFields.referralSocialWorker.element.checked,
        dischargePlanner: formFields.referralDischargePlanner.element.checked,
        other: formFields.referralOther.element.checked,
        otherExplanation: formFields.referralOther.element.checked ? 
                          formFields.referralExplain.element.value.trim() : null
      },
      referralLocation: formFields.referralLocation.element.value.trim()
    }
  };
  
  // Only add household members if patient doesn't live alone
  if (formFields.livesAlone.elements[1].checked) {
    patientData.livingArrangement.householdMembers = [];
    
    // Collect all household members data from the tables
    const householdRows = householdTableBody.querySelectorAll('.household-row');
    
    householdRows.forEach((row) => {
      const rowIndex = parseInt(row.getAttribute('data-index'));
      const nameInput = document.getElementById(`memberName${rowIndex}`);
      const relationshipInput = document.getElementById(`memberRelationship${rowIndex}`);
      
      // Find the corresponding caregiving row
      const caregivingRow = document.querySelector(`.caregiving-row[data-index="${rowIndex}"]`);
      
      if (nameInput && nameInput.value.trim()) {
        const servicesInput = document.getElementById(`memberServices${rowIndex}`);
        const hoursInput = document.getElementById(`memberHours${rowIndex}`);
        const daysInput = document.getElementById(`memberDays${rowIndex}`);
        
        patientData.livingArrangement.householdMembers.push({
          name: nameInput.value.trim(),
          relationship: relationshipInput ? relationshipInput.value.trim() : '',
          caregivingDetails: {
            services: servicesInput ? servicesInput.value.trim() : '',
            hours: hoursInput ? hoursInput.value.trim() : '',
            days: daysInput ? daysInput.value.trim() : ''
          }
        });
      }
    });
  }
  
  // Collect diagnoses data from the table
  const diagnosisRows = diagnosisTableBody.querySelectorAll('.diagnosis-row');
  diagnosisRows.forEach((row) => {
    const rowIndex = parseInt(row.getAttribute('data-index'));
    const diagnosisInput = document.getElementById(`diagnosis${rowIndex}`);
    const notesTextarea = document.getElementById(`diagnosisNotes${rowIndex}`);
    
    if (diagnosisInput && diagnosisInput.value.trim()) {
      patientData.hospitalization.diagnoses.push({
        name: diagnosisInput.value.trim(),
        notes: notesTextarea ? notesTextarea.value.trim() : ''
      });
    }
  });
  
  // Collect medications data from the table
  const medicationRows = medicationTableBody.querySelectorAll('.medication-row');
  medicationRows.forEach((row) => {
    const rowIndex = parseInt(row.getAttribute('data-index'));
    const nameInput = document.getElementById(`medicationName${rowIndex}`);
    const dosageInput = document.getElementById(`medicationDosage${rowIndex}`);
    const frequencyInput = document.getElementById(`medicationFrequency${rowIndex}`);
    const routeInput = document.getElementById(`medicationRoute${rowIndex}`);
    
    if (nameInput && nameInput.value.trim()) {
      patientData.medicationAdministration.medications.push({
        name: nameInput.value.trim(),
        dosage: dosageInput ? dosageInput.value.trim() : '',
        frequency: frequencyInput ? frequencyInput.value.trim() : '',
        route: routeInput ? routeInput.value.trim() : ''
      });
    }
  });
  
  // Simulate API call
  setTimeout(() => {
    console.log('Submitting patient data:', patientData);
    
    // Format the JSON data with indentation for better readability
    const formattedJSON = JSON.stringify(patientData, null, 2);
    
    // Show the JSON data in a popup
    alert('Form Data (JSON format):\n\n' + formattedJSON);
    
    // Reset loading state
    submitButton.disabled = false;
    loadingSpinner.style.display = 'none';
    submitText.textContent = 'Submit';
    
    // Reset form after showing the data
    resetForm();
  }, 1000);
});

resetButton.addEventListener('click', resetForm);

// Print Form Functionality
printButton.addEventListener('click', generatePrintableForm);

/**
 * Generates a printable version of the form with all filled data
 * Creates a structured HTML view and triggers the browser's print dialog
 */
function generatePrintableForm() {
  // Validate form first to ensure all data is correct
  if (!validateForm()) {
    // If form is not valid, show an alert
    alert('Please fill out all required fields correctly before printing.');
    return;
  }
  
  // Build the print view content
  const printContent = document.createElement('div');
  printContent.classList.add('print-content');
  
  // Add print header
  const printHeader = document.createElement('div');
  printHeader.classList.add('print-header');
  printHeader.innerHTML = `
    <h1>Patient Onboarding Form</h1>
    <p>Form generated on ${new Date().toLocaleDateString()}</p>
  `;
  printContent.appendChild(printHeader);
  
  // Patient Information Section
  addPrintSection(printContent, 'Patient Information', [
    { label: 'First Name', value: document.getElementById('firstName').value },
    { label: 'Last Name', value: document.getElementById('lastName').value },
    { label: 'Middle Initial', value: document.getElementById('middleInitial').value }
  ]);
  
  // Emergency Contact Information
  addPrintSection(printContent, 'Emergency Contact Information', [
    { label: 'Contact Person Name', value: document.getElementById('contactName').value },
    { label: 'Relationship', value: document.getElementById('relationship').value },
    { label: 'Contact Phone (Day-time)', value: document.getElementById('phoneNumber').value }
  ]);
  
  // Living Situation
  const dwellingTypes = [];
  if (document.getElementById('dwellingApartment').checked) dwellingTypes.push('Apartment');
  if (document.getElementById('dwellingHouse').checked) dwellingTypes.push('House');
  if (document.getElementById('dwellingOther').checked) {
    dwellingTypes.push('Other: ' + document.getElementById('otherDwelling').value);
  }
  
  addPrintSection(printContent, 'Living Situation', [
    { label: 'Dwelling', value: dwellingTypes.join(', ') },
    { label: 'Floor', value: document.getElementById('floor').value },
    { label: 'Number of Rooms', value: document.getElementById('numberOfRooms').value },
    { label: 'Elevator', value: document.querySelector('input[name="elevator"]:checked')?.value === 'yes' ? 'Yes' : 'No' },
    { label: 'Lives Alone', value: document.querySelector('input[name="livesAlone"]:checked')?.value === 'yes' ? 'Yes' : 'No' }
  ]);
  
  // Household Members
  if (document.querySelector('input[name="livesAlone"]:checked')?.value === 'no') {
    const householdSection = document.createElement('div');
    householdSection.classList.add('print-section');
    householdSection.innerHTML = `<h3>Household Members and Caregiving</h3>`;
    
    const householdTable = document.createElement('table');
    householdTable.classList.add('print-table');
    householdTable.innerHTML = `
      <thead>
        <tr>
          <th>#</th>
          <th>Full Name</th>
          <th>Relationship to Patient</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from(document.querySelectorAll('.household-row')).map((row, index) => {
          const nameInput = row.querySelector('input[id^="memberName"]');
          const relationshipInput = row.querySelector('input[id^="memberRelationship"]');
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${nameInput ? nameInput.value : ''}</td>
              <td>${relationshipInput ? relationshipInput.value : ''}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    `;
    householdSection.appendChild(householdTable);
    
    // Caregiving Details
    const caregivingTable = document.createElement('table');
    caregivingTable.classList.add('print-table');
    caregivingTable.style.marginTop = '15px';
    caregivingTable.innerHTML = `
      <thead>
        <tr>
          <th>Household Member</th>
          <th>Services</th>
          <th>Available Hours</th>
          <th>Available Days</th>
        </tr>
      </thead>
      <tbody>
        ${Array.from(document.querySelectorAll('.caregiving-row')).map(row => {
          const nameDisplay = row.querySelector('.member-name-display');
          const servicesTextarea = row.querySelector('textarea[id^="memberServices"]');
          const hoursInput = row.querySelector('input[id^="memberHours"]');
          const daysInput = row.querySelector('input[id^="memberDays"]');
          return `
            <tr>
              <td>${nameDisplay ? nameDisplay.textContent : ''}</td>
              <td>${servicesTextarea ? servicesTextarea.value : ''}</td>
              <td>${hoursInput ? hoursInput.value : ''}</td>
              <td>${daysInput ? daysInput.value : ''}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    `;
    householdSection.appendChild(caregivingTable);
    printContent.appendChild(householdSection);
  }
  
  // Diagnoses
  const diagnosesSection = document.createElement('div');
  diagnosesSection.classList.add('print-section');
  diagnosesSection.innerHTML = `<h3>Diagnoses</h3>`;
  
  const diagnosesTable = document.createElement('table');
  diagnosesTable.classList.add('print-table');
  diagnosesTable.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>Diagnosis</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      ${Array.from(document.querySelectorAll('.diagnosis-row')).map((row, index) => {
        const diagnosisInput = row.querySelector('input[id^="diagnosis"]');
        const notesTextarea = row.querySelector('textarea[id^="diagnosisNotes"]');
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${diagnosisInput ? diagnosisInput.value : ''}</td>
            <td>${notesTextarea ? notesTextarea.value : ''}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
  diagnosesSection.appendChild(diagnosesTable);
  printContent.appendChild(diagnosesSection);
  
  // Medications
  const medicationsSection = document.createElement('div');
  medicationsSection.classList.add('print-section');
  medicationsSection.innerHTML = `<h3>Medications</h3>`;
  
  const medicationsTable = document.createElement('table');
  medicationsTable.classList.add('print-table');
  medicationsTable.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>Medication</th>
        <th>Dosage</th>
        <th>Frequency</th>
        <th>Route</th>
      </tr>
    </thead>
    <tbody>
      ${Array.from(document.querySelectorAll('.medication-row')).map((row, index) => {
        const nameInput = row.querySelector('input[id^="medicationName"]');
        const dosageInput = row.querySelector('input[id^="medicationDosage"]');
        const frequencyInput = row.querySelector('input[id^="medicationFrequency"]');
        const routeInput = row.querySelector('input[id^="medicationRoute"]');
        return `
          <tr>
            <td>${index + 1}</td>
            <td>${nameInput ? nameInput.value : ''}</td>
            <td>${dosageInput ? dosageInput.value : ''}</td>
            <td>${frequencyInput ? frequencyInput.value : ''}</td>
            <td>${routeInput ? routeInput.value : ''}</td>
          </tr>
        `;
      }).join('')}
    </tbody>
  `;
  medicationsSection.appendChild(medicationsTable);
  printContent.appendChild(medicationsSection);
  
  // Impairments
  const getImpairmentValue = (name) => {
    const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return checkedRadio ? checkedRadio.value.charAt(0).toUpperCase() + checkedRadio.value.slice(1) : 'None';
  };
  
  addPrintSection(printContent, 'Impairments', [
    { label: 'Speech', value: getImpairmentValue('speechImpairment') },
    { label: 'Sight', value: getImpairmentValue('sightImpairment') },
    { label: 'Hearing', value: getImpairmentValue('hearingImpairment') },
    { label: 'Hand/Arm', value: getImpairmentValue('handArmImpairment') },
    { label: 'Upper Extremities', value: getImpairmentValue('upperExtremitiesImpairment') },
    { label: 'Lower Extremities', value: getImpairmentValue('lowerExtremitiesImpairment') },
    { label: 'Respiratory', value: getImpairmentValue('respiratoryImpairment') },
    { label: 'Cardiac', value: getImpairmentValue('cardiacImpairment') },
    { label: 'Circulatory', value: getImpairmentValue('circulatoryImpairment') }
  ]);
  
  // Mental Status
  const getMentalStatusValue = (name) => {
    const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return checkedRadio ? checkedRadio.value.charAt(0).toUpperCase() + checkedRadio.value.slice(1) : 'Normal';
  };
  
  addPrintSection(printContent, 'Mental Status', [
    { label: 'Orientation', value: getMentalStatusValue('orientation') },
    { label: 'Memory', value: getMentalStatusValue('memory') },
    { label: 'Judgment', value: getMentalStatusValue('judgment') },
    { label: 'Mood/Affect', value: getMentalStatusValue('mood') }
  ]);
  
  // Dementia Screening
  const getDementiaAnswer = (name) => {
    const checkedRadio = document.querySelector(`input[name="${name}"]:checked`);
    return checkedRadio ? (checkedRadio.value === 'yes' ? 'Yes, a change' : 
                          (checkedRadio.value === 'no' ? 'No, No change' : 'N/A, Don\'t Know')) : 'Not Answered';
  };
  
  const hasDementia = document.querySelector('input[name="dementiaDiagnosis"]:checked')?.value === 'yes';
  const dementiaItems = [
    { label: 'Has Dementia Diagnosis', value: hasDementia ? 'Yes' : 'No' }
  ];
  
  if (hasDementia) {
    dementiaItems.push({
      label: 'Diagnosis Date', 
      value: document.getElementById('dementiaDiagnosisDate').value
    });
  }
  
  dementiaItems.push(
    { label: 'Screening Date', value: document.getElementById('dementiaScreeningDate').value },
    { label: 'Problems with judgment', value: getDementiaAnswer('judgmentProblems') },
    { label: 'Less interest in hobbies/activities', value: getDementiaAnswer('hobbiesInterest') },
    { label: 'Repeats things', value: getDementiaAnswer('repeatsThings') },
    { label: 'Trouble learning to use tools', value: getDementiaAnswer('toolsLearning') },
    { label: 'Forgets month or year', value: getDementiaAnswer('forgetsDate') },
    { label: 'Trouble with financial affairs', value: getDementiaAnswer('financialTrouble') },
    { label: 'Daily problems with thinking/memory', value: getDementiaAnswer('thinkingProblems') },
    { label: 'Total Score', value: document.getElementById('dementiaScore').value }
  );
  
  addPrintSection(printContent, 'Dementia Screening', dementiaItems);
  
  // Add form certification information
  const certificationItems = [];
  
  const personalObservation = document.querySelector('input[name="personalObservation"]:checked')?.value === 'yes';
  certificationItems.push({ 
    label: 'Assessment based on personal observation', 
    value: personalObservation ? 'Yes' : 'No' 
  });
  
  if (!personalObservation) {
    certificationItems.push({
      label: 'Assessment based on information relayed by',
      value: document.getElementById('relayedInfoBy').value
    });
  }
  
  certificationItems.push(
    { label: 'Prepared by', value: document.getElementById('preparedBy').value },
    { label: 'Title', value: document.getElementById('preparerTitle').value },
    { label: 'Date', value: document.getElementById('preparationDate').value }
  );
  
  addPrintSection(printContent, 'Certification', certificationItems);
  
  // Clear the print view div and add the new content
  printView.innerHTML = '';
  printView.appendChild(printContent);
  
  // Trigger the print dialog
  window.print();
}

/**
 * Helper function to add a section to the printable form
 */
function addPrintSection(container, title, items) {
  const section = document.createElement('div');
  section.classList.add('print-section');
  
  // Add section title
  const sectionTitle = document.createElement('h3');
  sectionTitle.textContent = title;
  section.appendChild(sectionTitle);
  
  // Add section content
  items.forEach(item => {
    if (item.value) {
      const row = document.createElement('div');
      row.classList.add('print-row');
      
      const label = document.createElement('div');
      label.classList.add('print-label');
      label.textContent = item.label + ':';
      
      const value = document.createElement('div');
      value.classList.add('print-value');
      value.textContent = item.value;
      
      row.appendChild(label);
      row.appendChild(value);
      section.appendChild(row);
    }
  });
  
  container.appendChild(section);
}

// Form fields event listeners for real-time validation
for (const fieldName in formFields) {
  const field = formFields[fieldName];
  
  if (field.elements) {
    // For checkbox or radio groups
    field.elements.forEach(element => {
      element.addEventListener('change', () => {
        validateField(fieldName);
        
        // Special handling for conditional fields
        if (fieldName === 'dwelling') {
          // Show/hide "other dwelling" field based on selection
          if (field.elements[2].checked) { // Other is checked
            otherDwellingGroup.style.display = 'block';
          } else {
            otherDwellingGroup.style.display = 'none';
            formFields.otherDwelling.element.value = '';
            formFields.otherDwelling.element.classList.remove('is-invalid');
            formFields.otherDwelling.errorElement.style.display = 'none';
          }
        } else if (fieldName === 'livesAlone') {
          // We keep track of the lives alone selection but don't hide the household section
          // This selection will still affect the data collection logic
        } else if (fieldName === 'canDirectCare') {
          // Show/hide the responsible person field based on selection
          if (field.elements[1].checked) { // "No" is checked
            responsiblePersonGroup.style.display = 'block';
            
            // Populate the datalist with emergency contact names
            const emergencyContactName = formFields.contactName.element.value.trim();
            if (emergencyContactName) {
              // Clear existing options
              contactsList.innerHTML = '';
              
              // Add emergency contact to options
              const option = document.createElement('option');
              option.value = emergencyContactName;
              contactsList.appendChild(option);
              
              // Add household members to options
              const householdRows = householdTableBody.querySelectorAll('.household-row');
              householdRows.forEach(row => {
                const rowIndex = parseInt(row.getAttribute('data-index'));
                const nameInput = document.getElementById(`memberName${rowIndex}`);
                
                if (nameInput && nameInput.value.trim()) {
                  const option = document.createElement('option');
                  option.value = nameInput.value.trim();
                  contactsList.appendChild(option);
                }
              });
            }
          } else {
            responsiblePersonGroup.style.display = 'none';
            formFields.responsiblePerson.element.value = '';
            formFields.responsiblePerson.element.classList.remove('is-invalid');
            formFields.responsiblePerson.errorElement.style.display = 'none';
          }
        } else if (fieldName === 'recentWeightLoss') {
          // Show/hide the weight loss amount field based on selection
          if (field.elements[0].checked) { // "Yes" is checked
            weightLossAmountGroup.style.display = 'block';
          } else {
            weightLossAmountGroup.style.display = 'none';
            formFields.weightLossAmount.element.value = '';
            formFields.weightLossAmount.element.classList.remove('is-invalid');
            formFields.weightLossAmount.errorElement.style.display = 'none';
          }
        } else if (fieldName === 'tbHistory') {
          // Show/hide the TB history type checkboxes based on selection
          if (field.elements[0].checked) { // "Yes" is checked
            document.getElementById('tbHistoryTypeGroup').style.display = 'block';
          } else {
            document.getElementById('tbHistoryTypeGroup').style.display = 'none';
            formFields.tbHistoryPulmonary.element.checked = false;
            formFields.tbHistoryExtraPulmonary.element.checked = false;
          }
        } else if (fieldName === 'currentTb') {
          // Show/hide the current TB type checkboxes based on selection
          if (field.elements[0].checked) { // "Yes" is checked
            document.getElementById('currentTbTypeGroup').style.display = 'block';
          } else {
            document.getElementById('currentTbTypeGroup').style.display = 'none';
            formFields.currentTbPulmonary.element.checked = false;
            formFields.currentTbExtraPulmonary.element.checked = false;
          }
        } else if (fieldName === 'personalObservation') {
          // Show/hide the relayed info field based on selection
          if (field.elements[1].checked) { // "No" is checked
            document.getElementById('relayedInfoGroup').style.display = 'block';
          } else {
            document.getElementById('relayedInfoGroup').style.display = 'none';
            formFields.relayedInfoBy.element.value = '';
            formFields.relayedInfoBy.element.classList.remove('is-invalid');
            if (formFields.relayedInfoBy.errorElement) {
              formFields.relayedInfoBy.errorElement.style.display = 'none';
            }
          }
        } else if (fieldName === 'otherAgency') {
          // Show/hide the other agency details based on selection
          if (field.elements[0].checked) { // "Yes" is checked
            document.getElementById('otherAgencyDetailsGroup').style.display = 'flex';
          } else {
            document.getElementById('otherAgencyDetailsGroup').style.display = 'none';
            formFields.otherAgencyName.element.value = '';
            formFields.otherAgencyServices.element.value = '';
            formFields.otherAgencyName.element.classList.remove('is-invalid');
            formFields.otherAgencyServices.element.classList.remove('is-invalid');
            if (formFields.otherAgencyName.errorElement) {
              formFields.otherAgencyName.errorElement.style.display = 'none';
            }
            if (formFields.otherAgencyServices.errorElement) {
              formFields.otherAgencyServices.errorElement.style.display = 'none';
            }
          }
        } else if (fieldName === 'medicaidApplied') {
          // Show/hide the medicaid reasons field based on selection
          if (field.elements[1].checked) { // "No" is checked
            document.getElementById('medicaidReasonsGroup').style.display = 'block';
          } else {
            document.getElementById('medicaidReasonsGroup').style.display = 'none';
            formFields.medicaidReasons.element.value = '';
            formFields.medicaidReasons.element.classList.remove('is-invalid');
            if (formFields.medicaidReasons.errorElement) {
              formFields.medicaidReasons.errorElement.style.display = 'none';
            }
          }
        }
        

      });
    });
  } else if (field.element) {
    // For regular input fields
    field.element.addEventListener('blur', () => validateField(fieldName));
  }
}

// Function to update the member name in the caregiving table
function updateCaregivingMemberName(index, name) {
  const memberNameCell = document.querySelector(`.caregiving-row[data-index="${index}"] .member-name-display`);
  if (memberNameCell) {
    memberNameCell.textContent = name || '-';
  }
}

// Function to add a new household member row
function addHouseholdMemberRow(index, name = '', relationship = '') {
  const row = document.createElement('tr');
  row.className = 'household-row';
  row.setAttribute('data-index', index);
  
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <input 
        type="text" 
        id="memberName${index}" 
        name="householdMembers[${index}].name" 
        class="form-control"
        value="${name}"
        required
      >
      <div class="invalid-feedback" id="memberNameError${index}"></div>
    </td>
    <td>
      <input 
        type="text" 
        id="memberRelationship${index}" 
        name="householdMembers[${index}].relationship" 
        class="form-control"
        value="${relationship}"
        placeholder="e.g., Spouse, Child, Parent"
      >
    </td>
    <td class="action-cell">
      <button type="button" class="btn btn-outline-danger btn-sm remove-member" data-index="${index}">
        Remove
      </button>
      <button type="button" class="btn btn-outline-info btn-sm edit-caregiving" data-index="${index}">
        Caregiving
      </button>
    </td>
  `;
  
  householdTableBody.appendChild(row);
  
  // Add event listener to the input field to update the caregiving table
  const nameInput = row.querySelector(`#memberName${index}`);
  nameInput.addEventListener('input', function() {
    updateCaregivingMemberName(index, nameInput.value.trim());
  });
  
  // Add event listener to the remove button
  const removeButton = row.querySelector('.remove-member');
  removeButton.addEventListener('click', function() {
    // Get the index from the data attribute
    const rowIndex = parseInt(removeButton.getAttribute('data-index'));
    
    // Remove both the household row and corresponding caregiving row
    document.querySelector(`.household-row[data-index="${rowIndex}"]`).remove();
    document.querySelector(`.caregiving-row[data-index="${rowIndex}"]`).remove();
    
    // Update the numbering and data-index attributes of all remaining rows
    updateTableRowNumbers();
  });
  
  // Add event listener to the caregiving button
  const caregivingButton = row.querySelector('.edit-caregiving');
  caregivingButton.addEventListener('click', function() {
    // Scroll to the caregiving section
    document.querySelector('.caregiving-details-container').scrollIntoView({ behavior: 'smooth' });
    
    // Highlight the corresponding caregiving row
    const caregivingIndex = parseInt(caregivingButton.getAttribute('data-index'));
    const caregivingRow = document.querySelector(`.caregiving-row[data-index="${caregivingIndex}"]`);
    
    if (caregivingRow) {
      // First, remove highlight from all rows
      const allRows = document.querySelectorAll('.caregiving-row');
      allRows.forEach(row => row.classList.remove('highlight-row'));
      
      // Add highlight to the selected row
      caregivingRow.classList.add('highlight-row');
      
      // Focus on the services textarea
      const servicesTextarea = caregivingRow.querySelector(`#memberServices${caregivingIndex}`);
      if (servicesTextarea) {
        setTimeout(() => {
          servicesTextarea.focus();
        }, 500);
      }
    }
  });
  
  return nameInput;
}

// Function to add a new caregiving row
function addCaregivingRow(index) {
  const row = document.createElement('tr');
  row.className = 'caregiving-row';
  row.setAttribute('data-index', index);
  
  row.innerHTML = `
    <td>${index + 1}</td>
    <td class="member-name-display">-</td>
    <td>
      <textarea 
        id="memberServices${index}" 
        name="householdMembers[${index}].services" 
        class="form-control"
        placeholder="e.g., Meal preparation, transportation, medication management"
        rows="2"
      ></textarea>
    </td>
    <td>
      <input 
        type="text" 
        id="memberHours${index}" 
        name="householdMembers[${index}].hours" 
        class="form-control"
        placeholder="e.g., 9am-5pm"
      >
    </td>
    <td>
      <input 
        type="text" 
        id="memberDays${index}" 
        name="householdMembers[${index}].days" 
        class="form-control"
        placeholder="e.g., Mon-Fri"
      >
    </td>
  `;
  
  caregivingTableBody.appendChild(row);
}

// Add household member button click handler
addHouseholdMemberBtn.addEventListener('click', function() {
  // Add a new household member row
  const nameInput = addHouseholdMemberRow(householdMemberCount);
  
  // Add a corresponding caregiving row
  addCaregivingRow(householdMemberCount);
  
  // Increment the counter
  householdMemberCount++;
  
  // Focus on the name input
  nameInput.focus();
});

// Add diagnosis button click handler
addDiagnosisBtn.addEventListener('click', function() {
  // Add a new diagnosis row
  const diagnosisInput = addDiagnosisRow(diagnosisCount);
  
  // Increment the counter
  diagnosisCount++;
  
  // Focus on the diagnosis input
  diagnosisInput.focus();
});

// Add medication button click handler
addMedicationBtn.addEventListener('click', function() {
  // Add a new medication row
  const medicationInput = addMedicationRow(medicationCount);
  
  // Increment the counter
  medicationCount++;
  
  // Focus on the medication input
  medicationInput.focus();
});

// Function to update row numbers after removal
function updateTableRowNumbers() {
  // Update household table
  const householdRows = householdTableBody.querySelectorAll('.household-row');
  householdRows.forEach((row, index) => {
    const oldIndex = parseInt(row.getAttribute('data-index'));
    
    // Update row number cell
    row.querySelector('td:first-child').textContent = index + 1;
    
    // Update data-index attribute
    row.setAttribute('data-index', index);
    
    // Update form field IDs and names
    const nameInput = row.querySelector(`#memberName${oldIndex}`);
    const relationshipInput = row.querySelector(`#memberRelationship${oldIndex}`);
    const errorDiv = row.querySelector(`#memberNameError${oldIndex}`);
    const buttons = row.querySelectorAll('button');
    
    if (nameInput) {
      nameInput.id = `memberName${index}`;
      nameInput.name = `householdMembers[${index}].name`;
    }
    
    if (relationshipInput) {
      relationshipInput.id = `memberRelationship${index}`;
      relationshipInput.name = `householdMembers[${index}].relationship`;
    }
    
    if (errorDiv) {
      errorDiv.id = `memberNameError${index}`;
    }
    
    buttons.forEach(button => {
      button.setAttribute('data-index', index);
    });
  });
  
  // Update caregiving table
  const caregivingRows = caregivingTableBody.querySelectorAll('.caregiving-row');
  caregivingRows.forEach((row, index) => {
    const oldIndex = parseInt(row.getAttribute('data-index'));
    
    // Update row number cell
    row.querySelector('td:first-child').textContent = index + 1;
    
    // Update data-index attribute
    row.setAttribute('data-index', index);
    
    // Update form field IDs and names
    const servicesTextarea = row.querySelector(`#memberServices${oldIndex}`);
    const hoursInput = row.querySelector(`#memberHours${oldIndex}`);
    const daysInput = row.querySelector(`#memberDays${oldIndex}`);
    
    if (servicesTextarea) {
      servicesTextarea.id = `memberServices${index}`;
      servicesTextarea.name = `householdMembers[${index}].services`;
    }
    
    if (hoursInput) {
      hoursInput.id = `memberHours${index}`;
      hoursInput.name = `householdMembers[${index}].hours`;
    }
    
    if (daysInput) {
      daysInput.id = `memberDays${index}`;
      daysInput.name = `householdMembers[${index}].days`;
    }
  });
  
  // Reset the counter
  householdMemberCount = householdRows.length;
}

// Function to add a new diagnosis row
function addDiagnosisRow(index, diagnosisName = '', notes = '') {
  const row = document.createElement('tr');
  row.className = 'diagnosis-row';
  row.setAttribute('data-index', index);
  
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <input 
        type="text" 
        id="diagnosis${index}" 
        name="diagnoses[${index}].name" 
        class="form-control"
        value="${diagnosisName}"
        placeholder="e.g., Hypertension, Diabetes"
        required
      >
      <div class="invalid-feedback" id="diagnosisError${index}"></div>
    </td>
    <td>
      <textarea 
        id="diagnosisNotes${index}" 
        name="diagnoses[${index}].notes" 
        class="form-control"
        placeholder="Additional details about the diagnosis"
        rows="2"
      >${notes}</textarea>
    </td>
    <td class="action-cell">
      <button type="button" class="btn btn-outline-danger btn-sm remove-diagnosis" data-index="${index}">
        Remove
      </button>
    </td>
  `;
  
  diagnosisTableBody.appendChild(row);
  
  // Add event listener to the remove button
  const removeButton = row.querySelector('.remove-diagnosis');
  removeButton.addEventListener('click', function() {
    // Get the index from the data attribute
    const rowIndex = parseInt(removeButton.getAttribute('data-index'));
    
    // Remove the diagnosis row
    document.querySelector(`.diagnosis-row[data-index="${rowIndex}"]`).remove();
    
    // Update the numbering and data-index attributes of all remaining rows
    updateDiagnosisTableRows();
  });
  
  return row.querySelector(`#diagnosis${index}`);
}

// Function to update diagnosis table row numbers after removal
function updateDiagnosisTableRows() {
  // Update diagnosis table
  const diagnosisRows = diagnosisTableBody.querySelectorAll('.diagnosis-row');
  diagnosisRows.forEach((row, index) => {
    const oldIndex = parseInt(row.getAttribute('data-index'));
    
    // Update row number cell
    row.querySelector('td:first-child').textContent = index + 1;
    
    // Update data-index attribute
    row.setAttribute('data-index', index);
    
    // Update form field IDs and names
    const diagnosisInput = row.querySelector(`#diagnosis${oldIndex}`);
    const notesTextarea = row.querySelector(`#diagnosisNotes${oldIndex}`);
    const errorDiv = row.querySelector(`#diagnosisError${oldIndex}`);
    const buttons = row.querySelectorAll('button');
    
    if (diagnosisInput) {
      diagnosisInput.id = `diagnosis${index}`;
      diagnosisInput.name = `diagnoses[${index}].name`;
    }
    
    if (notesTextarea) {
      notesTextarea.id = `diagnosisNotes${index}`;
      notesTextarea.name = `diagnoses[${index}].notes`;
    }
    
    if (errorDiv) {
      errorDiv.id = `diagnosisError${index}`;
    }
    
    buttons.forEach(button => {
      button.setAttribute('data-index', index);
    });
  });
  
  // Reset the counter
  diagnosisCount = diagnosisRows.length;
}

// Function to add a new medication row
function addMedicationRow(index, medicationName = '', dosage = '', frequency = '', route = '') {
  const row = document.createElement('tr');
  row.className = 'medication-row';
  row.setAttribute('data-index', index);
  
  row.innerHTML = `
    <td>${index + 1}</td>
    <td>
      <input 
        type="text" 
        id="medicationName${index}" 
        name="medications[${index}].name" 
        class="form-control" 
        placeholder="Medication name"
        value="${medicationName}"
      >
      <div class="invalid-feedback" id="medicationNameError${index}"></div>
    </td>
    <td>
      <input 
        type="text" 
        id="medicationDosage${index}" 
        name="medications[${index}].dosage" 
        class="form-control" 
        placeholder="Dosage"
        value="${dosage}"
      >
    </td>
    <td>
      <input 
        type="text" 
        id="medicationFrequency${index}" 
        name="medications[${index}].frequency" 
        class="form-control" 
        placeholder="Frequency"
        value="${frequency}"
      >
    </td>
    <td>
      <input 
        type="text" 
        id="medicationRoute${index}" 
        name="medications[${index}].route" 
        class="form-control" 
        placeholder="Route"
        value="${route}"
      >
    </td>
    <td>
      <button type="button" class="btn btn-danger btn-sm remove-medication-btn" data-index="${index}">
        <i class="fas fa-times"></i> Remove
      </button>
    </td>
  `;
  
  medicationTableBody.appendChild(row);
  
  // Add event listener to the remove button
  const removeButton = row.querySelector('.remove-medication-btn');
  removeButton.addEventListener('click', function() {
    const index = parseInt(this.getAttribute('data-index'));
    medicationTableBody.querySelector(`.medication-row[data-index="${index}"]`).remove();
    updateMedicationTableRows();
  });
  
  return row.querySelector(`#medicationName${index}`);
}

// Function to update medication row numbers after removal
function updateMedicationTableRows() {
  // Update medication table row numbers
  const medicationRows = medicationTableBody.querySelectorAll('.medication-row');
  
  medicationRows.forEach((row, index) => {
    const oldIndex = parseInt(row.getAttribute('data-index'));
    
    // Update row number cell
    row.querySelector('td:first-child').textContent = index + 1;
    
    // Update data-index attribute
    row.setAttribute('data-index', index);
    
    // Update form field IDs and names
    const nameInput = row.querySelector(`#medicationName${oldIndex}`);
    const dosageInput = row.querySelector(`#medicationDosage${oldIndex}`);
    const frequencyInput = row.querySelector(`#medicationFrequency${oldIndex}`);
    const routeInput = row.querySelector(`#medicationRoute${oldIndex}`);
    const errorDiv = row.querySelector(`#medicationNameError${oldIndex}`);
    const buttons = row.querySelectorAll('button');
    
    if (nameInput) {
      nameInput.id = `medicationName${index}`;
      nameInput.name = `medications[${index}].name`;
    }
    
    if (dosageInput) {
      dosageInput.id = `medicationDosage${index}`;
      dosageInput.name = `medications[${index}].dosage`;
    }
    
    if (frequencyInput) {
      frequencyInput.id = `medicationFrequency${index}`;
      frequencyInput.name = `medications[${index}].frequency`;
    }
    
    if (routeInput) {
      routeInput.id = `medicationRoute${index}`;
      routeInput.name = `medications[${index}].route`;
    }
    
    if (errorDiv) {
      errorDiv.id = `medicationNameError${index}`;
    }
    
    buttons.forEach(button => {
      button.setAttribute('data-index', index);
    });
  });
  
  // Reset the medication counter
  medicationCount = medicationRows.length;
}

// Reset form function
function resetForm() {
  patientForm.reset();
  
  // Clear validation styles
  for (const fieldName in formFields) {
    const field = formFields[fieldName];
    
    if (field.elements) {
      // For checkbox or radio groups
      field.elements.forEach(element => {
        element.checked = false;
      });
    } else if (field.element) {
      // For regular input fields
      field.element.classList.remove('is-invalid');
    }
    
    if (field.errorElement) {
      field.errorElement.style.display = 'none';
      field.errorElement.textContent = '';
    }
  }
  
  // Hide conditional other dwelling section
  otherDwellingGroup.style.display = 'none';
  
  // Hide conditional TB History sections
  document.getElementById('tbHistoryTypeGroup').style.display = 'none';
  document.getElementById('currentTbTypeGroup').style.display = 'none';
  
  // Hide conditional Patient Status sections
  responsiblePersonGroup.style.display = 'none';
  weightLossAmountGroup.style.display = 'none';
  
  // Reset elimination checkboxes
  formFields.continentBowel.element.checked = false;
  formFields.continentBladder.element.checked = false;
  formFields.occasionallyIncontinentBowel.element.checked = false;
  formFields.occasionallyIncontinentBladder.element.checked = false;
  formFields.incontinentBowel.element.checked = false;
  formFields.incontinentBladder.element.checked = false;
  
  // Reset medical treatment checkboxes
  formFields.decubitusCare.element.checked = false;
  formFields.dressingsSimple.element.checked = false;
  formFields.dressingsSterile.element.checked = false;
  formFields.enema.element.checked = false;
  formFields.catheterCare.element.checked = false;
  formFields.monitorVitalSigns.element.checked = false;
  formFields.tubeFeeding.element.checked = false;
  formFields.tubeIrrigation.element.checked = false;
  formFields.suctioning.element.checked = false;
  formFields.oxygenAdministration.element.checked = false;
  formFields.bloodTests.element.checked = false;
  formFields.ambulationExercise.element.checked = false;
  formFields.rehabilitationTherapy.element.checked = false;
  formFields.physicalTherapy.element.checked = false;
  
  // Reset service needs checkboxes
  // Ambulate Inside
  formFields.ambInsideNoHelp.element.checked = false;
  formFields.ambInsideCane.element.checked = false;
  formFields.ambInsideWalker.element.checked = false;
  formFields.ambInsideWheelchair.element.checked = false;
  formFields.ambInsideAssistance.element.checked = false;
  formFields.ambInsideUnable.element.checked = false;
  
  // Ambulate Outside
  formFields.ambOutsideNoHelp.element.checked = false;
  formFields.ambOutsideCane.element.checked = false;
  formFields.ambOutsideWalker.element.checked = false;
  formFields.ambOutsideWheelchair.element.checked = false;
  formFields.ambOutsideAssistance.element.checked = false;
  formFields.ambOutsideUnable.element.checked = false;
  
  // Get up from seated position
  formFields.getUpSeatedNoHelp.element.checked = false;
  formFields.getUpSeatedCane.element.checked = false;
  formFields.getUpSeatedWalker.element.checked = false;
  formFields.getUpSeatedWheelchair.element.checked = false;
  formFields.getUpSeatedAssistance.element.checked = false;
  formFields.getUpSeatedUnable.element.checked = false;
  
  // Get up from bed
  formFields.getUpBedNoHelp.element.checked = false;
  formFields.getUpBedCane.element.checked = false;
  formFields.getUpBedWalker.element.checked = false;
  formFields.getUpBedWheelchair.element.checked = false;
  formFields.getUpBedAssistance.element.checked = false;
  formFields.getUpBedUnable.element.checked = false;
  
  // Transfer to: commode
  formFields.transferCommodeNoHelp.element.checked = false;
  formFields.transferCommodeCane.element.checked = false;
  formFields.transferCommodeWalker.element.checked = false;
  formFields.transferCommodeWheelchair.element.checked = false;
  formFields.transferCommodeAssistance.element.checked = false;
  formFields.transferCommodeUnable.element.checked = false;
  
  // Transfer to: Wheelchair
  formFields.transferWheelchairNoHelp.element.checked = false;
  formFields.transferWheelchairCane.element.checked = false;
  formFields.transferWheelchairWalker.element.checked = false;
  formFields.transferWheelchairWheelchair.element.checked = false;
  formFields.transferWheelchairAssistance.element.checked = false;
  formFields.transferWheelchairUnable.element.checked = false;
  
  // Reset personal service needs checkboxes
  // Grooming
  formFields.groomingIndependent.element.checked = false;
  formFields.groomingPartial.element.checked = false;
  formFields.groomingTotal.element.checked = false;
  
  // Dressing
  formFields.dressingIndependent.element.checked = false;
  formFields.dressingPartial.element.checked = false;
  formFields.dressingTotal.element.checked = false;
  
  // Washing
  formFields.washingIndependent.element.checked = false;
  formFields.washingPartial.element.checked = false;
  formFields.washingTotal.element.checked = false;
  
  // Bathing
  formFields.bathingIndependent.element.checked = false;
  formFields.bathingPartial.element.checked = false;
  formFields.bathingTotal.element.checked = false;
  
  // Feeding
  formFields.feedingIndependent.element.checked = false;
  formFields.feedingPartial.element.checked = false;
  formFields.feedingTotal.element.checked = false;
  
  // Meal Prep
  formFields.mealPrepIndependent.element.checked = false;
  formFields.mealPrepPartial.element.checked = false;
  formFields.mealPrepTotal.element.checked = false;
  
  // Reheat Meals
  formFields.reheatMealsIndependent.element.checked = false;
  formFields.reheatMealsPartial.element.checked = false;
  formFields.reheatMealsTotal.element.checked = false;
  
  // Toileting
  formFields.toiletingIndependent.element.checked = false;
  formFields.toiletingPartial.element.checked = false;
  formFields.toiletingTotal.element.checked = false;
  
  // Urinal/Bedpan
  formFields.urinalIndependent.element.checked = false;
  formFields.urinalPartial.element.checked = false;
  formFields.urinalTotal.element.checked = false;
  
  // Commode
  formFields.commodeIndependent.element.checked = false;
  formFields.commodePartial.element.checked = false;
  formFields.commodeTotal.element.checked = false;
  
  // Catheter
  formFields.catheterIndependent.element.checked = false;
  formFields.catheterPartial.element.checked = false;
  formFields.catheterTotal.element.checked = false;
  
  // Laundry
  formFields.laundryIndependent.element.checked = false;
  formFields.laundryPartial.element.checked = false;
  formFields.laundryTotal.element.checked = false;
  
  // Shopping
  formFields.shoppingIndependent.element.checked = false;
  formFields.shoppingPartial.element.checked = false;
  formFields.shoppingTotal.element.checked = false;
  
  // Housecleaning
  formFields.housecleaningIndependent.element.checked = false;
  formFields.housecleaningPartial.element.checked = false;
  formFields.housecleaningTotal.element.checked = false;
  
  // Reset homebound radio buttons
  formFields.isHomebound.elements.forEach(el => el.checked = false);
  
  // Reset certification fields
  formFields.personalObservation.elements.forEach(el => el.checked = false);
  formFields.relayedInfoBy.element.value = '';
  formFields.preparedBy.element.value = '';
  formFields.preparedByPhone.element.value = '';
  formFields.agencyAffiliation.element.value = '';
  formFields.faxNumber.element.value = '';
  formFields.certificationDate.element.value = '';
  formFields.otherAgency.elements.forEach(el => el.checked = false);
  formFields.otherAgencyName.element.value = '';
  formFields.otherAgencyServices.element.value = '';
  formFields.benefitsExhausted.elements.forEach(el => el.checked = false);
  formFields.medicaidEligible.elements.forEach(el => el.checked = false);
  formFields.medicaidApplied.elements.forEach(el => el.checked = false);
  formFields.medicaidReasons.element.value = '';
  
  // Hide conditional fields
  document.getElementById('otherAgencyDetailsGroup').style.display = 'none';
  document.getElementById('medicaidReasonsGroup').style.display = 'none';
  
  // Clear the tables except for the first row
  const householdRows = householdTableBody.querySelectorAll('.household-row');
  for (let i = 1; i < householdRows.length; i++) {
    householdRows[i].remove();
  }
  
  const caregivingRows = caregivingTableBody.querySelectorAll('.caregiving-row');
  for (let i = 1; i < caregivingRows.length; i++) {
    caregivingRows[i].remove();
  }
  
  // Reset the first row values
  if (householdRows.length > 0) {
    const firstNameInput = document.getElementById('memberName0');
    const firstRelationshipInput = document.getElementById('memberRelationship0');
    
    if (firstNameInput) firstNameInput.value = '';
    if (firstRelationshipInput) firstRelationshipInput.value = '';
  }
  
  if (caregivingRows.length > 0) {
    const firstServicesTextarea = document.getElementById('memberServices0');
    const firstHoursInput = document.getElementById('memberHours0');
    const firstDaysInput = document.getElementById('memberDays0');
    const firstMemberNameDisplay = caregivingRows[0].querySelector('.member-name-display');
    
    if (firstServicesTextarea) firstServicesTextarea.value = '';
    if (firstHoursInput) firstHoursInput.value = '';
    if (firstDaysInput) firstDaysInput.value = '';
    if (firstMemberNameDisplay) firstMemberNameDisplay.textContent = '-';
  }
  
  // Reset household member counter
  householdMemberCount = 1;
  
  // Clear the diagnosis table except for the first row
  const diagnosisRows = diagnosisTableBody.querySelectorAll('.diagnosis-row');
  for (let i = 1; i < diagnosisRows.length; i++) {
    diagnosisRows[i].remove();
  }
  
  // Reset the first diagnosis row values
  if (diagnosisRows.length > 0) {
    const firstDiagnosisInput = document.getElementById('diagnosis0');
    const firstNotesTextarea = document.getElementById('diagnosisNotes0');
    
    if (firstDiagnosisInput) firstDiagnosisInput.value = '';
    if (firstNotesTextarea) firstNotesTextarea.value = '';
  }
  
  // Reset diagnosis counter
  diagnosisCount = 1;
  
  // Clear the medication table except for the first row
  const medicationRows = medicationTableBody.querySelectorAll('.medication-row');
  for (let i = 1; i < medicationRows.length; i++) {
    medicationRows[i].remove();
  }
  
  // Reset the first medication row values
  if (medicationRows.length > 0) {
    const firstNameInput = document.getElementById('medicationName0');
    const firstDosageInput = document.getElementById('medicationDosage0');
    const firstFrequencyInput = document.getElementById('medicationFrequency0');
    const firstRouteInput = document.getElementById('medicationRoute0');
    
    if (firstNameInput) firstNameInput.value = '';
    if (firstDosageInput) firstDosageInput.value = '';
    if (firstFrequencyInput) firstFrequencyInput.value = '';
    if (firstRouteInput) firstRouteInput.value = '';
  }
  
  // Reset medication counter
  medicationCount = 1;
  
  // Hide conditional referral explanation field
  document.getElementById('referralExplainGroup').style.display = 'none';
  
  // Reset and hide dementia diagnosis date field
  document.getElementById('dementiaDiagnosisDateGroup').style.display = 'none';
  
  // Set current date for dementiaScreeningDate
  document.getElementById('dementiaScreeningDate').value = today;
}