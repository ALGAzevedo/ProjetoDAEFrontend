<template>
  <div class="row">
    <div class="col-xl-10 col-xxl-6">
      <div class="main-card bg-white">
        <h3 class="mt-2 mb-3">View Patient Biomedical Chart </h3>
        <div class="form-group  col-12 col-md-3 mb-3">
          <label for="inputGender" class="form-label">Patient</label>
          <select id="inputGender" class="form-select" v-model="viewPatient">
            <option v-for="patient in patients" :value="patient.username" v-bind:key="patient.usernme">{{patient.name}} </option>
          </select>
        </div>
         <PatientBiomedicalChart :username="this.viewPatient" />
      </div>
    </div>
  </div>

</template>

<script>
import PatientBiomedicalChart from "./PatientBiomedicalChart";
export default {
  components: {PatientBiomedicalChart},
  data() {
    return {
      patients: [],
      viewPatient: '',
    }
  },

  mounted() {
    this.filterPatients()

  },

  methods:{
    filterPatients() {
      this.$axios.get('patients')
          .then((response) => {
            this.patients  = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },

  }
}
</script>

<style>

</style>
