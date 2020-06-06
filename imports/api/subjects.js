import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
// import { check } from "meteor/check";

export const Subjects = new Mongo.Collection("subjects");

if (Meteor.isServer) {
  Meteor.publish("subjects", function subjectPublication() {
    return Subjects.find();
  });
}

Meteor.methods({
  "subjects.insert"(subjectData, studentId, studentName) {
    let subjectArray = [];

    subjectData.split(",").map((sub) => subjectArray.push(sub.trim()));

    const docExist = Subjects.findOne({
      "student.id": studentId,
    });

    if (docExist) {
      // console.log(docExist.subs);
      // console.log(subjectArray.length);
      Subjects.update({ _id: docExist._id }, { $set: { subs: subjectArray } });
    } else {
      Subjects.insert({
        subs: subjectArray,
        student: {
          id: studentId,
          name: studentName,
        },
      });
    }
  },

  "subjects.find"(id) {
    return Subjects.findOne({
      "student.id": id,
    });
  },
});
