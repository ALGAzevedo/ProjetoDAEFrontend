<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Patient {{ patientUsernameView }} PRCs</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalPrcs }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">

    </div>
    <!--    <div class="mx-2 mt-2">-->
    <!--      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addAdmin">-->
    <!--        <i class="bi bi-xs bi-plus-circle"></i> Add Administrator-->
    <!--      </button>-->
    <!--    </div>-->
  </div>
  <hr>
  <prcs-table
      :prcs="prcs"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-prc-button="true"
      @edit="editPrc"
      @cancel="cancel"
  ></prcs-table>

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
      console.log(username)
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
      this.$router.push({name: 'NewAdministrator'})
    },
    editPrc(prc) {
      this.$router.push({name: 'EditPrc', params: {prcCode: prc.code}})
    },
    cancel() {
      this.$router.back()
    },
    // deleteConfirmed() {
    //   this.$axios.delete('administrators/' + this.adminToDelete.username, this.adminToDelete)
    //       .then(() => {
    //         this.loadAdmins();
    //         this.$toast.success(`Account ${this.adminToDelete.username} (${this.adminToDelete.name}) was deleted successfully.`)
    //       })
    //       .catch((error) => {
    //         this.$toast.success('There was an issue deleting this account')
    //         console.log(error)
    //       })
    // },
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