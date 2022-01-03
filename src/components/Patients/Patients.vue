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
  <UsersFiltersBody
      :show-institutional-email="false"
      :show-institutional-phone="false"
      @add="addPatient"
      @filter="filter"
    >

  </UsersFiltersBody>

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
      :show-document-list="true"
      @edit="editPatient"
      @delete="deletePatient"
      @showPrcsList="showPrcsList"
      @showDocumentsClick="showDocumentsClick"
  ></users-table>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";
import UsersFiltersBody from "../UsersCommon/UsersFiltersBody";


export default {
  name: "Patients",
  components: {
    UsersTable,
    UsersFiltersBody
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
    parameters(filterBody) {
      if(filterBody == null)
        return ''
      var str = '?'
      Object.entries(filterBody).map(item => {
        if(item[1].trim().length > 0)
          str += item[0]+'='+item[1]+'&'
      })

      return str
    },

    filter(filterBody) {
      const str = this.parameters(filterBody)
      this.$axios.get('patients'+str)
          .then((response) => {
            this.patients = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
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

      this.patientToDelete = patient
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },
    showPrcsList(patient) {
      this.$router.push({name: 'PatientPrcs', params: {usernameIn: patient.username}})
    },
    showDocumentsClick(patient) {
      console.log("aqui")
      this.$router.push({name: 'DocumentUserTable', params: {username: patient.username}})
    }
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