<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete PRC"
      :msg="`Do you really want to delete the PRC ${ prcToDelete } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Patient: {{ usernameIn }} </h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalPrcs }}</h5>
    </div>
  </div>

  <div class="main-card bg-white">

  <div class="mb-3 d-flex justify-content-between flex-wrap">
        <div class="mx-2 mt-2">
          <button type="button" class="btn btn-success px-4 btn-adduser" @click="addPrc">
            <i class="bi bi-xs bi-plus-circle"></i> Add PRC
          </button>
        </div>
  </div>
  <hr>
  <prcs-table
      :prcs="prcs"
      :errors="errors"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-prc-button="true"
      @edit="editPrc"
      @delete="deletePrc"
      @cancel="cancel"
  ></prcs-table>
  </div>
</template>


<script>
import PrcsTable from "./PrcsTable";
export default {
  name: "PatientPrcs",
  components: {
    PrcsTable,
  },
  props: {
    usernameIn: {
      type: String,
      required: true,
      default: ''
    },
  },
  data() {
    return {
      user: '',
      prcs: '',
      prcToDelete: null,
      errors: null,
    }
  },
  computed: {
    prcToDeleteCode() {
      return this.prcs
          ? `"${this.prcs.code}"` : ''
    },
    totalPrcs() {
      return this.prcs.length
    },
    patientUsernameView(){
      return this.usernameIn;
    }

  },
  methods: {
    loadPatient(username) {
      // console.log(username)
      this.$axios.get('patients/' + username)
          .then((response) => {
            this.user = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    loadPatientPrcs(username){
      this.$axios.get('patients/' + username + '/prcs')
          .then((response) => {
            console.log(this.prcs)
            this.prcs = response.data
            console.log(this.prcs)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addPrc() {
      this.$router.push({name: 'NewPrc', params: { username: this.usernameIn}} )
    },
    editPrc(prc) {
      this.$router.push({name: 'EditPrc', params: {prcCode: prc.code, username: this.usernameIn}})
    },
    deletePrc(prc) {
      this.prcToDelete = prc
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },
    cancel() {
      this.$router.back()
    },
    deleteConfirmed() {
      // console.log(this.prcToDelete)
      this.$axios.delete('prcs/' + this.prcToDelete.code)
          .then((response) => {
            console.log("deleted:", response.data)
            this.loadPatient(this.usernameIn)
            this.loadPatientPrcs(this.usernameIn)
            this.$toast.success(`PRC ${this.prcToDelete.code} (${this.prcToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            if (error.response.status === 400){
              this.$toast.error(error.response.data)
            }else{
              this.$toast.error('There was an issue deleting this PRC')
            }
            console.log(error)
          })
    },
  },
  mounted() {
    this.loadPatient(this.usernameIn)
    this.loadPatientPrcs(this.usernameIn)
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