import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.scss']
})
export class PatientFormComponent implements OnInit {
  patientForm: FormGroup;
  submitted = false;
  submitSuccess = false;
  submitError = false;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService
  ) {
    this.patientForm = this.createForm();
  }

  ngOnInit(): void {
    // Component initialization logic here
  }

  createForm(): FormGroup {
    return this.fb.group({
      patientInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        middleInitial: ['', [Validators.maxLength(1)]]
      }),
      emergencyContact: this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        relationship: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9\-\(\)\s\+\.]+$/)]]
      })
    });
  }

  /**
   * Get form controls for easier access in the template
   */
  get f() {
    return this.patientForm.controls;
  }

  get patientInfo() {
    return (this.patientForm.get('patientInfo') as FormGroup).controls;
  }

  get emergencyContact() {
    return (this.patientForm.get('emergencyContact') as FormGroup).controls;
  }

  /**
   * Submit the patient form
   */
  onSubmit(): void {
    this.submitted = true;
    
    // Stop if form is invalid
    if (this.patientForm.invalid) {
      // Scroll to the top of the form to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    this.loading = true;
    this.submitSuccess = false;
    this.submitError = false;

    const patientData = {
      firstName: this.patientInfo['firstName'].value,
      lastName: this.patientInfo['lastName'].value,
      middleInitial: this.patientInfo['middleInitial'].value,
      emergencyContact: {
        name: this.emergencyContact['name'].value,
        relationship: this.emergencyContact['relationship'].value,
        phoneNumber: this.emergencyContact['phoneNumber'].value
      }
    };

    this.patientService.submitPatientInfo(patientData)
      .subscribe({
        next: (response) => {
          console.log('Submission successful', response);
          this.loading = false;
          this.submitSuccess = true;
          this.resetForm();
        },
        error: (error) => {
          console.error('Submission error', error);
          this.loading = false;
          this.submitError = true;
          this.errorMessage = error.message || 'An unexpected error occurred. Please try again.';
        }
      });
  }

  /**
   * Reset the form to its initial state
   */
  resetForm(): void {
    this.submitted = false;
    this.patientForm.reset();
    // Create a new form to ensure complete reset
    this.patientForm = this.createForm();
  }
}
