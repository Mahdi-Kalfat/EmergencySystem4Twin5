const { User, Patient, Personal, Doctor, Nurse, Driver, Worker, ServiceChief } = require('../model/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Start Of the Add User (CRUD) Operations

async function createPersonal(user, req) {
    const personal = new Personal({
        id_personal: user._id,
        age: req.body.age,
        admission_date: req.body.admission_date,
        conge: req.body.conge,
        nbr_conge: req.body.nbr_conge,
    });
    await personal.save();
    return personal;
}

async function createRoleSpecificRecord(role, personal, req) {
    if (role === "Doctor") {
        const doctor = new Doctor({
            id_doctor: personal._id,
            speciality: req.body.speciality,
            grade: req.body.grade,
        });
        await doctor.save();
    } else if (role === "Nurse") {
        const nurse = new Nurse({
            id_nurse: personal._id,
            poste_inf: req.body.poste_inf,
            grade_inf: req.body.grade_inf,
        });
        await nurse.save();
    } else if (role === "Driver") {
        const driver = new Driver({
            id_driver: personal._id,
            experience: req.body.experience,
            garde: req.body.garde,
        });
        await driver.save();
    } else if (role === "Chef") {
        const servicechief = new ServiceChief({
            id_chef: personal._id,
            speciality_chief: req.body.speciality_chief,
            garde: req.body.garde,
        });
        await servicechief.save();
    } else if (role === "worker") {
        const worker = new Worker({
            id_worker: personal._id,
            poste: req.body.poste,
        });
        await worker.save();
    } else {
        throw new Error("Invalid role");
    }
}

async function adduser(req, res, next) {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const validRoles = ["Patient", "Doctor", "Nurse", "Driver", "Chef", "worker"];
        if (!validRoles.includes(req.body.role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const pass = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const cryPass = await bcrypt.hash(pass, salt);

        const user = new User({
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            role: req.body.role,
            password: cryPass,
        });

        await user.save();

        if (user.role === "Patient") {
            const patient = new Patient({
                id_patient: user._id,
                allergies: req.body.allergies,
                chronicDiseases: req.body.chronicDiseases,
                creation_date: Date.now(),
            });
            await patient.save();
        } else {
            const personal = await createPersonal(user, req);
            
            await createRoleSpecificRecord(user.role, personal, req);
        }

        res.json({ message: "User created successfully" });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}
// End Of the Add User (CRUD) Operations

// Start Of the Edit User (CRUD) Operations

async function deleteRoleSpecificRecord(role, userId) {
    if (role === "Doctor") {
        await Doctor.deleteOne({ id_doctor: userId });
    } else if (role === "Nurse") {
        await Nurse.deleteOne({ id_nurse: userId });
    } else if (role === "Driver") {
        await Driver.deleteOne({ id_driver: userId });
    } else if (role === "Chef") {
        await ServiceChief.deleteOne({ id_chef: userId });
    } else if (role === "worker") {
        await Worker.deleteOne({ id_worker: userId });
    }
}

async function editUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        const personal = await Personal.findOne({ id_personal: user._id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const newRole = req.body.role;
        const oldRole = user.role;
        user.name = req.body.name || user.name;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;

        await user.save();
        if(oldRole !== newRole && oldRole == "Patient") {
            await Patient.deleteOne({ id_patient: id });
            const newPersonal = await createPersonal(user, req);
            await createRoleSpecificRecord(user.role, newPersonal, req);
        }else if (oldRole == newRole && oldRole == "Patient") {
            const patient = await Patient.findById(user._id);
            await Patient.updateOne({ id_patient: user._id }, {
                allergies: req.body.allergies || patient.allergies,
                chronicDiseases: req.body.chronicDiseases || patient.chronicDiseases,
            });
        }else if (newRole !== "Patient") {
            const personal = await Personal.findOne({ id_personal: user._id });
            await Personal.updateOne({ id_personal: user._id }, {
                age: req.body.age || personal.age,
                admission_date: req.body.admission_date || personal.admission_date,
                conge: req.body.conge || personal.conge,
                nbr_conge: req.body.nbr_conge || personal.nbr_conge,
            });
            if (oldRole !== newRole){
                await deleteRoleSpecificRecord(oldRole, personal._id);
                createRoleSpecificRecord(user.role, personal, req);
            }else if(oldRole === newRole){
                if (newRole === "Doctor") {
                    await Doctor.updateOne({ id_doctor: personal._id }, {
                        speciality: req.body.speciality,
                        grade: req.body.grade,
                    });
                } else if (newRole === "Nurse") {
                    await Nurse.updateOne({ id_nurse: personal._id }, {
                        poste_inf: req.body.poste_inf,
                        grade_inf: req.body.grade_inf,
                    });
                } else if (newRole === "Driver") {
                    await Driver.updateOne({ id_driver: personal._id }, {
                        experience: req.body.experience,
                        garde: req.body.garde,
                    });
                } else if (newRole === "Chef") {
                    await ServiceChief.updateOne({ id_chef: personal._id }, {
                        speciality_chief: req.body.speciality_chief,
                        garde: req.body.garde,
                    });
                } else if (newRole === "worker") {
                    await Worker.updateOne({ id_worker: personal._id }, {
                        poste: req.body.poste,
                    });
                }
            } 
        } 
        res.json({ message: "User updated successfully" });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

// End Of the Edit User (CRUD) Operations

// Start Of the Delete User (CRUD) Operations

async function delUser(req, res, next) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }else {
            if (user.role === "Patient") {
                await Patient.deleteOne({ id_patient: user._id });
            }else if (user.role !== "Patient"){
                const personal = await Personal.findOne({id_personal: user._id})
                await deleteRoleSpecificRecord(user.role,personal._id)
                await Personal.deleteOne({id_personal: user._id});
            }
            await User.findByIdAndDelete(user.id)
        }
        res.json({ message: "User Deleted successfully" });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
}

// End Of the Delete User (CRUD) Operations

// Start Of the Get User (CRUD) Operations

async function displayUser(req, res, next) {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        const userDetailsList = await Promise.all(users.map(async (user) => {
            let userDetails = {
                name: user.name,
                phoneNumber: user.phoneNumber,
                email: user.email,
                role: user.role
            };

            if (user.role === "Patient") {
                const patient = await Patient.findOne({ id_patient: user._id });
                userDetails = {
                    ...userDetails,
                    allergies: patient.allergies,
                    chronicDiseases: patient.chronicDiseases
                };
            } else {
                const personal = await Personal.findOne({ id_personal: user._id });
                userDetails = {
                    ...userDetails,
                    age: personal.age,
                    admission_date: personal.admission_date,
                    conge: personal.conge,
                    nbr_conge: personal.nbr_conge
                };

                if (user.role === "Doctor") {
                    const doctor = await Doctor.findOne({ id_doctor: personal._id });
                    userDetails = {
                        ...userDetails,
                        speciality: doctor.speciality,
                        grade: doctor.grade
                    };
                } else if (user.role === "Nurse") {
                    const nurse = await Nurse.findOne({ id_nurse: personal._id });
                    userDetails = {
                        ...userDetails,
                        poste_inf: nurse.poste_inf,
                        grade_inf: nurse.grade_inf
                    };
                } else if (user.role === "Driver") {
                    const driver = await Driver.findOne({ id_driver: personal._id });
                    userDetails = {
                        ...userDetails,
                        experience: driver.experience,
                        garde: driver.garde
                    };
                } else if (user.role === "Chef") {
                    const servicechief = await ServiceChief.findOne({ id_chef: personal._id });
                    userDetails = {
                        ...userDetails,
                        speciality_chief: servicechief.speciality_chief,
                        garde: servicechief.garde
                    };
                } else if (user.role === "worker") {
                    const worker = await Worker.findOne({ id_worker: personal._id });
                    userDetails = {
                        ...userDetails,
                        poste: worker.poste
                    };
                }
            }

            return userDetails;
        }));

        res.json(userDetailsList);
    } catch (error) {
        console.error('Error displaying users:', error);
        res.status(500).json({ message: 'Error displaying users', error: error.message });
    }
}

// End Of the Get User (CRUD) Operations

// Start Of Login Function 

    async function login(req, res, next) {
            const email = req.body.email;
            const password = req.body.password;
            const foundUser = await User.findOne({ email: email });
            if (!foundUser) {
                return res.status(400).json({ message: "Email not found" });
            } 
            const currentPass = foundUser.password;
            const isValidPassword = await bcrypt.compare(password, currentPass);
            if (!isValidPassword) {
                return res.status(400).json({ message: "Invalid password" });
            }else{
                const token = jwt.sign({ id: foundUser._id, email: foundUser.email, role: foundUser.role }, 
                process.env.JWT_SECRET, { expiresIn: '1h' });
                return res.status(200).json({ message: "User connected", token: token }); 
            }
    }

// End Of Login Function

// Start of Forget Password Function 
 
    async function forgetPassword(req, res, next) {
        const email = req.body.email;
        const foundUser = await User.findOne({ email: email });
        if (!foundUser) {
            return res.status(400).json({ message: "Email not found" });
        }
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'noreplay.infinitystack@gmail.com',
            pass: 'dwpf ienb ltmg tvgb'
        }
    });

    async function forgetPassword(req, res, next) {
        try {
            const email = req.body.email;
            const foundUser = await User.findOne({ email: email });
            if (!foundUser) {
                return res.status(400).json({ message: "Email not found" });
            }
    
            const token = crypto.randomBytes(20).toString('hex');
    
            foundUser.resetPasswordToken = token;
            foundUser.resetPasswordExpires = Date.now() + 3600000;
            await foundUser.save();
    
            const mailOptions = {
                to: foundUser.email,
                from: 'noreplay.infinitystack@gmail.com',
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                Please click on the following link, or paste this into your browser to complete the process:\n\n
                http://${req.headers.host}/reset/${token}\n\n
                If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
    
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('There was an error: ', err);
                    return res.status(500).json({ message: 'Error sending email', error: err.message });
                } else {
                    res.status(200).json({ message: 'Recovery email sent' });
                }
            });
        } catch (error) {
            console.error('Error in forgetPassword:', error);
            res.status(500).json({ message: 'Error in forgetPassword', error: error.message });
        }
    }

module.exports = { adduser , editUser , delUser , displayUser , login , forgetPassword };