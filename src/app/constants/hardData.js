export const PAYMENT_TYPES = [
    {label: 'cash', value: 'cash'},
    {label: 'cheque', value: 'cheque'},
    {label: 'card', value: 'card'},
    {label: 'netbanking', value: 'netbanking'},
    {label: 'unknown', value: 'unknown'},
]
export const DISEASE_TYPES = [
    {label: 'Kidney Disease', value: 'Kidney Disease'},
    {label: 'Cancer Disease', value: 'Cancer Disease'},
    {label: 'Other Disease', value: 'Other Disease'}
];
export const DRUG = "Drug";
export const EQUIPMENT = "Equipment";
export const SUPPLIES = "Supplies";
export const PROCEDURES = "Procedure";
export const PRESCRIPTIONS = "Prescriptions";
export const INVENTORY = "Inventory";


export const INVOICE_ITEM_TYPE = [
    {label: PROCEDURES, value: PROCEDURES},
    {label: PRESCRIPTIONS, value: PRESCRIPTIONS},
    {label: INVENTORY, value: INVENTORY}
];
export const INVENTORY_ITEM_TYPE = [
    {label: DRUG, value: DRUG},
    {label: EQUIPMENT, value: EQUIPMENT},
    {label: SUPPLIES, value: SUPPLIES}
];


export const ADD_STOCK = "ADD";
export const CONSUME_STOCK = "CONSUME";

export const APPOINTMENT_CONFIRMATION_SMS_TAG_OPTIONS = [{
    label: "CLINIC CONTACT",
    value: "{{CLINICCONTACTNUMBER}}"
}, {
    label: "CLINIC NAME",
    value: "{{CLINIC}}"
}, {
    label: "PATIENT NAME",
    value: "{{PATIENT}}"
}, {
    label: "APPOINTMENT CATEGORY",
    value: "{{CATEGORY}}"
}];

export const APPOINTMENT_CANCELATION_SMS_TAG_OPTIONS = [{
    label: "CLINIC CONTACT",
    value: "{{CLINICCONTACTNUMBER}}"
}, {
    label: "CLINIC NAME",
    value: "{{CLINIC}}"
}, {
    label: "PATIENT NAME",
    value: "{{PATIENT}}"
}, {
    label: "APPOINTMENT CATEGORY",
    value: "{{CATEGORY}}"
}];
export const EMR_TYPE = "EMR";
export const BILLING_TYPE= "BILLING";

export const EMR_SUB_TYPE = [
  { title: 'PRESCRIPTION'},
  { title: 'TREATMENT PLAN'},
  { title: 'CASE SHEET' },
  { title: 'MEDICAL LEAVE'},
  { title: 'VITAL SIGNS' },
  { title: 'LAB ORDER'},
  { title: 'LAB ORDER RESULT'},
];
export const BILLING_SUB_TYPE =[
    { title:'INVOICE' },
    { title:'RECEIPTS'},
   ];

export const CUSTOMIZE_PAPER_TYPE=[
    'PAGE', 'HEADER', 'PATIENT', 'FOOTER'
];

export const PAPER_SIZE = ['A2','A3','A4','A5'];

export const PAGE_ORIENTATION= [
    {value: 'PORTRAIT'},
    {value: 'LANDSCAPE'}
];

export const PRINTER_TYPE = [
    {value: 'COLOR'},
    {value: 'BLACK'}
];
export const HEADER_INCLUDE= [
    {title:'Yes', value: true},
    {title: 'No , I already have a letter head.', value: false}
];
export const LOGO_TYPE =[
    {value: 'Square'},
    {value: 'Narrow'},
    {value: 'Wide'}
];
export const LOGO_ALIGMENT= [
    {value: 'RIGHT'},
    {value: 'LEFT'},
    {value: 'CENTRE'}
];
export const LOGO_INCLUDE= [
    {title: 'Yes', value: true},
    {title: 'No', value: false}
];
export const PATIENT_DETAILS_LIST =[
    {value: 'Exclude Mediacal History'},
    {value: 'Exclude Patient Number'},
    {value: 'Exclude address'},
    {value: 'Exclude Blood Group'}
];
export const EXCLUDE_PATIENT_DOB = "Exclude Patient Gender & DOB";

export const SMS_ENABLE=[
    {title:'Yes' , value:true},
    {title:'No' , value:false}
]

export const EMAIL_ENABLE=[
    {title:'Yes' , value:true},
    {title:'No' , value:false}
]

export const BIRTHDAY_SMS_ENABLE=[
    {title:'Yes' , value:true},
    {title:'No' , value:false}
]

export const DURATIONS_UNIT = [
    {label:'day(s)',value:'day(s)'},
    {label:'week(s)',value:'week(s)'},
    {label:'month(s)',value:'month(s)'},
    {label:'year(s)',value:'year(s)'},
];

export const DOSE_FREQUENCIES = [
    {label:'day(s)',value:'day(s)'},
]
