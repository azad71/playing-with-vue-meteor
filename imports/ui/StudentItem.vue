<template>
  <tr>
    <th>{{ student.name }}</th>
    <td>{{ student.email }}</td>
    <td>{{ student.phone }}</td>
    <td>{{ student.DoB }}</td>
    <td>
      {{ getSubjects }}
      {{ subs }}
      <span
        ><button
          @click.prevent="addSubject"
          class="btn btn-sm"
          title="Add Subject"
        >
          &#9999;
        </button></span
      >
    </td>
    <td>
      <div class="d-flex justify-content-between">
        <button @click="showUpdateFrom" class="btn btn-sm">&#9999;</button>
        <button @click="removeStudent" class="btn btn-sm">&#x2715;</button>
      </div>
    </td>
  </tr>
</template>

<script>
import AddStudentModal from "./AddStudentModal.vue";
import { Students } from "../api/students.js";
import { Subjects } from "../api/subjects.js";
import { Meteor } from "meteor/meteor";

export default {
  props: ["student"],
  data() {
    return {
      subs: null,
    };
  },

  methods: {
    showUpdateFrom() {
      this.$modal.show(
        AddStudentModal,
        { student: this.student, isUpdate: true },
        {
          draggable: true,
          height: "auto",
        }
      );
    },

    addSubject() {
      const subjectInput = window.prompt(
        "Enter subjects(Separate by comma)",
        this.subs
      );

      // if prompt get closed without submission, return
      if (subjectInput === null) {
        return;
      }

      this.subs = subjectInput;

      Meteor.call(
        "subjects.insert",
        this.subs,
        this.student._id,
        this.student.name
      );
    },

    removeStudent() {
      Meteor.call("students.remove", this.student._id);
    },
  },

  computed: {
    getSubjects() {
      Meteor.call("subjects.find", this.student._id, (err, data) => {
        if (err) {
          console.log(err);
        } else if (data) {
          this.subs = data.subs.join(", ");
          return this.subs;
        }

        return null;
      });
    },
  },
};
</script>

<style scoped></style>
