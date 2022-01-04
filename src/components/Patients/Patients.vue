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
      @filter="filter"
    >
  </UsersFiltersBody>
  <hr>
  <div class="mx-2 mt-2" v-if="usernameIn === ''">
    <button type="button" class="btn btn-success px-4 btn-adduser" @click="addPatient">
      <i class="bi bi-xs bi-plus-circle"></i> Add New
    </button>
    <hr>
  </div>

  <div v-if="usernameIn !== ''">
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="associatePatient">
        <i class="bi bi-xs bi-plus-circle"></i> Associate Patient
      </button>
      <div class="col-3 text-start">
        <label for="inputPatientUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputPatientUsername" placeholder="Patient Username" v-model="patientUsernameAssociate">
      </div>
    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="desassociatePatient">
        <i class="bi bi-xs bi-plus-circle"></i> Desassociate Patient
      </button>
      <div class="col-3 text-start">
        <label for="inputPatientUsernameDesassociate" class="form-label">Username</label>
        <input type="text" class="form-control" id="inputPatientUsernameDesassociate" placeholder="Patient Username" v-model="patientUsernameDesassociate">
      </div>
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
      :show-document-list="true"
      :show-make-super-admin="false"
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
  props: {
    usernameIn: {
      type: String,
      required: false,
      default: ''
    },
  },
  data() {
    return {
      patients: [],
      patientToDelete: null,
      patientUsernameAssociate: '',
      patientUsernameDesassociate: ''
    }
  },
  computed: {
    patientToDeleteName() {
      return this.patientToDelete
          ? `"${this.patientToDelete.name}"` : ''
    },

    totalPatients() {
      return this.patients.length
    },
    loggedUser(){
      return this.$store.state.user.username
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
    loadHealthcareProfessionalPatients(username){
      this.$axios.get('healthcareprofissionals/' + username + '/patients' )
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
    associatePatient(){
      if (this.patientUsernameAssociate !== ''){
        this.$axios.patch('healthcareprofissionals/' + this.loggedUser + "/patients/" + this.patientUsernameAssociate + '/associate')
            .then(() => {
              this.loadHealthcareProfessionalPatients(this.usernameIn)
              this.$toast.success(`Patient ${this.patientUsername} was associated successfully.`)
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    desassociatePatient(){
      if (this.patientUsernameDesassociate !== ''){
        this.$axios.patch('healthcareprofissionals/' + this.loggedUser + "/patients/" + this.patientUsernameDesassociate + '/desassociate')
            .then(() => {
              this.loadHealthcareProfessionalPatients(this.usernameIn)
              this.$toast.success(`Patient ${this.patientUsername} was disassociated successfully.`)
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    deleteConfirmed() {
      this.$axios.delete('patients/' + this.patientToDelete.username, this.patientToDelete)
          .then(() => {
            this.loadPatients();
            this.$toast.success(`Patient ${this.patientToDelete.username} (${this.patientToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.error('There was an issue deleting this account')
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
    if (this.usernameIn == '') {
      this.loadPatients()
    }else{
      this.loadHealthcareProfessionalPatients(this.$store.state.user.username)
    }
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