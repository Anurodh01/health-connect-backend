export enum UserType {
    Doctor = "Doctor",
    User = "User"
}

export enum speciality { 
    PHYSICIAN = "physician",
    DENTIST = 'dentist',
    ENT = 'ent',
    CARDIOLOGIST = 'Cardiologist',
    NEUROLOGIST = 'Neurologist',
    GYNECOLOGIST = 'Gynecologist',
    ONCOLOGGIST = 'Oncologist'
}

export enum weekdays {
    MONDAY = "monday",
    TUESDAY = "tuesday",
    WEDNESDAY = "wednesday",
    THRUSDAY = "thrusday",
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}

export enum degree {
    MBBS = "mbbs", MD = "md", DO = "do", BDS = "bds", BHMS = "bhms", BAMS = "bams", DNB = "dnb", PharmD = "pharmd",
    MS = "ms", MSc = "msc", PhD = "phd", Physiotherapy = "physio", other = "other"
}

export enum VerificationStatus {
    AWAITING_VERIFICATION,
    VERIFIED
}

export enum gender { 
    Male="Male", Female="Female", Transgender="Trans"
}