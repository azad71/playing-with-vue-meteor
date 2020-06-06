import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

import { Subjects } from "./subjects.js";

export const Students = new Mongo.Collection("students");

if (Meteor.isServer) {
  Meteor.publish("students", function studentPublication() {
    return Students.find();
  });
}

Meteor.methods({
  "students.insert"(studentData) {
    const { name, email, phone, DoB } = studentData;

    check(name, String);
    check(email, String);
    check(phone, String);
    check(DoB, String);

    if (name.length === 0) {
      throw new Meteor.Error("empty", "Empty name field");
    }

    Students.insert({ name: name, email: email, phone: phone, DoB: DoB });
  },

  "students.update"(id, studentData) {
    const { name, email, phone, DoB } = studentData;
    check(name, String);
    check(email, String);
    check(phone, String);
    check(DoB, String);

    Students.update(id, { $set: { name, email, phone, DoB } });
    Subjects.update({ "student.id": id }, { $set: { "student.name": name } });
  },

  "students.remove"(id) {
    Subjects.remove({ "student.id": id });
    Students.remove(id);
  },
});
