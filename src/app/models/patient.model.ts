export interface Patient {
  firstName: string;
  lastName: string;
  middleInitial?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
}
