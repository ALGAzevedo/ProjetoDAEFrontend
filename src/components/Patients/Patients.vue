<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ patientToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Patients</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalPatients }}</h5>
    </div>
  </div>


  <div class="main-card bg-white">

  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">

    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addPatient">
        <i class="bi bi-xs bi-plus-circle"></i> Add Patient
      </button>
    </div>
  </div>
  <hr>
  <users-table
      :users="patients"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-emergency-phone-number="true"
      :show-social-security-number="true"
      :show-institutional-email="false"
      :show-institutional-phone-number="false"
      :show-is-super-admin="false"
      @edit="editPatient"
      @delete="deletePatient"
      @showPrcsList="showPrcsList"
  ></users-table>
  </div>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";

export default {
  name: "Patients",
  components: {
    UsersTable,
  },
  data() {
    return {
      patients: [],
      patientToDelete: null,
    }
  },
  computed: {
    patientToDeleteName() {
      return this.patientToDelete
          ? `"${this.patientToDelete.name}"` : ''
    },

    totalPatients() {
      return this.patients.length
    }
  },
  methods: {
    loadPatients() {
      this.$axios.get('patients')
          .then((response) => {
            this.patients = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addPatient() {
      this.$router.push({name: 'NewPatient'})
    },
    editPatient(patient) {
      this.$router.push({name: 'EditPatient', params: {usernameIn: patient.username}})
    },
    deleteConfirmed() {
      this.$axios.delete('patients/' + this.patientToDelete.username, this.patientToDelete)
          .then(() => {
            this.loadPatients();
            this.$toast.success(`Patient ${this.patientToDelete.username} (${this.patientToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.success('There was an issue deleting this account')
            console.log(error)
          })
    },
    deletePatient(patient) {
      /*TODO admin cant delete himself
      if (admin.id != this.$store.state.user.id) {

       */
      this.patientToDelete = patient
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },
    showPrcsList(patient) {
      this.$router.push({name: 'PatientPrcs', params: {usernameIn: patient.username}})
    },
  },
  mounted() {
    this.loadPatients()
  }
}
</script>

<style scoped>

.filter-div {
  min-width: 12rem;
}

.btn-adduser {
  margin-top: 1.85rem;
}
</style>