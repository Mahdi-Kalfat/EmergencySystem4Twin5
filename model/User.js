const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { 
        type: String, 
        enum: ['Patient', 'Doctor', 'Nurse', 'Driver', 'worker', 'Service_Chief'], 
        required: true 
    },
    password: { type: String, required: true }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

const PatientSchema = new mongoose.Schema({
    id_patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    allergies: { type: [String] },
    chronicDiseases: { type: [String] },
    creation_date: { type: Date, default: Date.now },
    modification_date: { type: Date, default: Date.now }
});

const Patient = mongoose.model('Patient', PatientSchema);

const PersonalSchema = new mongoose.Schema({
    id_personal: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    age: { type: Number, required: true },
    admission_date: { type: Date, required: true },
    conge: { type: Date },
    nbr_conge: { type: Number },
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    role: { type: String },
});

const Personal = mongoose.model('Personal', PersonalSchema);

const DoctorSchema = new mongoose.Schema({
    id_doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true },
    speciality: { type: String },
    garde: { type: Boolean }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

const NurseSchema = new mongoose.Schema({
    id_nurse: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true },
    poste_inf: { type: String },
    garde_inf: { type: Boolean }
});

const Nurse = mongoose.model('Nurse', NurseSchema);

const DriverSchema = new mongoose.Schema({
    id_driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true },
    experience: { type: String },
    garde: { type: Boolean }
});

const Driver = mongoose.model('Driver', DriverSchema);

const WorkerSchema = new mongoose.Schema({
    id_worker: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true },
    poste: { type: String }
});

const Worker = mongoose.model('Worker', WorkerSchema);

const ServiceChiefSchema = new mongoose.Schema({
    id_chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Personal', required: true },
    speciality_chief: { type: String },
    garde: { type: Boolean }
});

const ServiceChief = mongoose.model('ServiceChief', ServiceChiefSchema);

module.exports = { User, Patient, Personal, Doctor, Nurse, Driver, Worker, ServiceChief };
    