import {BACKEND_BASE_URL} from "../config/connect";

/***
 * API Connection URLs
 * */
 export const API_URL = BACKEND_BASE_URL + 'api';

export const SIGNUP_URL = '';
export const LOGIN_URL = 'users/login/';
export const PRACTICESTAFF='clinics/%s/practice_staff/';
export const ALL_PRACTICE= 'clinics/';
export const PRACTICE= 'clinics/%s/';
export const TAXES= 'clinics/%s/taxes/';
export const OFFERS= 'clinics/%s/offers/';
export const PAYMENT_MODES= 'clinics/%s/payment_modes/';
export const PROCEDURE_CATEGORY= 'clinics/%s/procedure_category/';
export const EMR_DIAGNOSES= 'clinics/%s/diagnoses/';
export const EMR_COMPLAINTS= 'clinics/%s/complaints/';
export const EMR_OBSERVATIONS= 'clinics/%s/observations/';
export const EMR_TREATMENTNOTES= 'clinics/%s/treatmentnotes/';
export const EMR_INVESTIGATIONS= 'clinics/%s/investigations/';
export const EMR_FILETAGS= 'clinics/%s/filetags/';
export const ALL_PRACTICE_STAFF='staff/';
export const SINGLE_PRACTICE_STAFF_API='staff/%s/';

export const PATIENTS_LIST = 'patients/'
export const PATIENT_PROFILE = 'patients/%s/'
export const STAFF_ROLES = 'staff/roles/'
export const MEDICAL_HISTORY = 'patients/history/?id=%s'
export const EXPENSE_TYPE= 'clinics/%s/expense_type/';
export const DRUG_CATALOG= 'clinics/%s/drugcatalog/';
export const LABTEST_API= 'clinics/%s/labtest/';
export const COMMUNICATONS_API= 'clinics/%s/communications/';
export const CALENDER_SETTINGS= 'clinics/%s/calender_settings/';
export const ALL_APPOINTMENT_API= 'appointment/';
export const APPOINTMENT_API= 'appointment/%s/';
export const APPOINTMENT_PERPRACTICE_API= 'appointment/?id=%s';
export const PATIENT_GROUPS = 'patients/group/?id=%s';
export const VITAL_SIGNS_API='patients/vital_sign/?id=%s';
export const PRESCRIPTIONS_API='patients/prescriptions/?id=%s';
export const TREATMENTPLANS_API='patients/procedure/?id=%s';
export const ALL_PRESCRIPTIONS_API='patients/prescriptions/%s/';
export const INVOICES_API='patients/invoices/?id=%s';


//search and advanced search API
export const SEARCH_PATIENT='patients/search/?name=%s';
