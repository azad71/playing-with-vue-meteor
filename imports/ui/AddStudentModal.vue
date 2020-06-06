<template name="AddStudentModal">
  <div class="container">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <button
          @click="closeModal"
          class="btn btn-sm btn-danger float-right m-3"
        >
          close
        </button>
        <form class="mt-4" @submit.prevent="handleSubmit">
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Name(can't be empty)"
              v-model="name"
              name="name"
            />
          </div>

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              v-model="email"
              name="email"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Phone Number"
              v-model="phone"
              name="phone"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              class="form-control"
              placeholder="Date of Birth(DD-MM-YY)"
              v-model="DoB"
              name="DoB"
            />
          </div>

          <button type="submit" class="btn btn-block btn-sm btn-primary mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import { Students } from "../api/students.js";
export default {
  props: {
    isUpdate: {
      type: Boolean,
      optional: true,
    },
    student: {
      type: Object,
      optional: true,
    },
  },

  data() {
    return {
      name: "",
      email: "",
      phone: "",
      DoB: "",
    };
  },
  methods: {
    handleSubmit() {
      const studentData = {
        name: this.name,
        email: this.email,
        phone: this.phone,
        DoB: this.DoB,
      };

      if (this.isUpdate) {
        Meteor.call("students.update", this.student._id, studentData);
      } else {
        Meteor.call("students.insert", studentData);
      }
      // this.$emit("close");
      this.closeModal();
    },

    closeModal() {
      this.$emit("close");
    },

    setFormData() {
      if (this.$props.isUpdate) {
        this.name = this.student.name;
        this.email = this.student.email;
        this.phone = this.student.phone;
        this.DoB = this.student.DoB;
      }
    },
  },

  mounted: function () {
    this.setFormData();
  },
};
</script>
