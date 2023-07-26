const fs = require("fs");

function getDateTimeFormatted(date = new Date()) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().padStart(4, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `[${day}.${month}.${year} ${hours}:${minutes}]`;
}

function log(message) {
  console.log(`${getDateTimeFormatted()} ${message}`);
  fs.appendFile(
    "medicalInstitutionLog.txt",
    `${getDateTimeFormatted()} ${message} \n`,
    (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("Data written to the file successfully!");
      }
    }
  );
}

class Person {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
}

class Doctor extends Person {
  pacientList = [];
  appointmentList = [];
  constructor(name, lastName, spec) {
    super(name, lastName);
    this.spec = spec;
  }

  setPacient(pacient) {
    if (pacient instanceof Person) {
      this.pacientList = [...this.pacientList, pacient];
      log(
        `${this.name} has accepted ${pacient.name} ${pacient.lastName} as his pacient`
      );
    } else {
      console.log(pacient, "is not a person");
    }
  }

  makeAppointment(pacient, appointmentDate, type) {
    if (this.pacientList.includes(pacient)) {
      if (type == "pressure") {
        let newAppointment = new BloodPressureTest(
          this,
          pacient,
          appointmentDate
        );
        this.appointmentList.push(newAppointment);
        log(
          `Dr.${this.name} made a appointment for a blood pressure test for pacient ${pacient.name}`
        );
        return newAppointment;
      }
      if (type == "sugar") {
        let newAppointment = new BloodSugarTest(this, pacient, appointmentDate);
        this.appointmentList.push(newAppointment);
        log(
          `Dr.${this.name} made a appointment for a blood blood sugar for pacient ${pacient.name}`
        );
        return newAppointment;
      }
      if (type == "cholesterol") {
        let newAppointment = new BloodSugarTest(this, pacient, appointmentDate);
        this.appointmentList.push(newAppointment);
        log(
          `Dr.${this.name} made a appointment for a blood cholesterol test for pacient ${pacient.name}`
        );
        return newAppointment;
      } else {
        console.log("Test of type", type, "does not exist");
      }
    } else {
      throw new Error(`${pacient} not found`);
    }
  }
}

class Pacient extends Person {
  constructor(name, lastName, JMBG, BZK) {
    super(name, lastName);
    this.JMBG = JMBG;
    this.BZK = BZK;
  }

  setDoctor(doctor) {
    if (doctor instanceof Doctor) {
      this.doctor = doctor;
      doctor.setPacient(this);
      log(`${this.name} has aceppted Dr.${doctor.name} as his doctor`);
    } else {
      console.log(doctor, "is not a doctor");
    }
  }
}

class LabTest {
  constructor(doctor, pacient, appointmentDate) {
    if (this.constructor === LabTest) {
      throw new Error("Abstract classes can't be instantiated.");
    }
    this.doctor = doctor;
    this.appointmentDate = appointmentDate;
    this.pacient = pacient;
  }

  performTest() {
    throw new Error("Method 'PerformTest' must be implemented.");
  }
}

class BloodPressureTest extends LabTest {
  constructor(doctor, pacient, appointmentDate) {
    super(doctor, pacient, appointmentDate);
  }

  performTest() {
    let highMin = 90;
    let highMax = 140;
    let lowMin = 60;
    let lowMax = 90;
    let pulseMin = 60;
    let pulseMax = 100;

    let high = Math.floor(Math.random() * (highMax - highMin + 1)) + highMin;
    let low = Math.floor(Math.random() * (lowMax - lowMin + 1)) + lowMin;
    let pulse =
      Math.floor(Math.random() * (pulseMax - pulseMin + 1)) + pulseMin;

    this.high = high;
    this.low = low;
    this.pulse = pulse;

    log(
      `Blood Pressure Test Results: ${this.high}/${this.low} pulse:${this.pulse} for ${this.pacient.name} by Dr.${this.doctor.name}`
    );
  }
}

class BloodSugarTest extends LabTest {
  constructor(doctor, pacient, appointmentDate) {
    super(doctor, pacient, appointmentDate);
  }

  performTest() {
    let sugarMin = 70;
    let sugarMax = 150;

    let bloodSugar =
      Math.floor(Math.random() * (sugarMax - sugarMin + 1)) + sugarMin;

    this.bloodSugar = bloodSugar;

    log(
      `Blood Sugar Test Result: ${this.bloodSugar} for ${this.pacient.name} by Dr.${this.doctor.name}`
    );
  }
}

class BloodCholesterolTest extends LabTest {
  constructor(doctor, pacient, appointmentDate) {
    super(doctor, pacient, appointmentDate);
  }

  performTest() {
    let sugarMin = 70;
    let sugarMax = 150;

    let bloodCholesterol =
      Math.floor(Math.random() * (sugarMax - sugarMin + 1)) + sugarMin;

    this.bloodCholesterol = bloodCholesterol;

    log(
      `Blood Cholesterol Test Result: ${this.bloodCholesterol} for ${this.pacient.name} by Dr.${this.doctor.name}`
    );
  }
}

let drMilan = new Doctor("Milan", "Milanovic", "hirurg");
let dragan = new Pacient("Dragan", "Draganovic", "12345678", "K1");
dragan.setDoctor(drMilan);
let appointment = drMilan.makeAppointment(dragan, new Date(), "sugar");
appointment.performTest();
