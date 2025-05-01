import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = '/api/patients'; // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }
  
  /**
   * Submit patient onboarding information
   */
  submitPatientInfo(patientData: Patient): Observable<any> {
    // In a real application, this would make an HTTP POST request to your backend API
    // For now, we'll simulate a successful response
    console.log('Submitting patient data:', patientData);
    
    // Return a simulated successful response
    // In production, replace with:
    // return this.http.post<any>(this.apiUrl, patientData);
    return of({ success: true, message: 'Patient information submitted successfully' });
  }
}
