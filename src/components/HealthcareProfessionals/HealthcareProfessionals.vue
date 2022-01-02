<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ hpToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Healthcare Professionals</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalHP }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">

    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addHP">
        <i class="bi bi-xs bi-plus-circle"></i> Add Healthcare Professional
      </button>
    </div>
  </div>
  <hr>
  <users-table
      :users="hps"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-emergency-phone-number="false"
      :show-social-security-number="false"
      :show-institutional-email="true"
      :show-institutional-phone-number="true"
      :show-is-super-admin="false"
      :show-document-list="false"
      @edit="editHP"
      @delete="deleteHP"
  ></users-table>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";

export default {
  name: "HealthcareProfessionals",
  components: {
    UsersTable,
  },
  data() {
    return {
      hps: [],
      hpToDelete: null,
    }
  },
  computed: {
    hpToDeleteName() {
      return this.hpToDelete
          ? `"${this.hpToDelete.name}"` : ''
    },

    totalHP() {
      return this.hps.length
    }
  },
  methods: {
    loadHPs() {
      this.$axios.get('healthcareprofissionals')
          .then((response) => {
            this.hps = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addHP() {
      this.$router.push({name: 'NewHealthcareProfessional'})
    },
    editHP(admin) {
      this.$router.push({ name: 'EditHealthcareProfessional', params: {usernameIn: admin.username} })
    },
    deleteConfirmed() {
      this.$axios.delete('healthcareprofissionals/' + this.hpToDelete.username, this.hpToDelete)
          .then(() => {
            this.loadHPs();
            this.$toast.success(`Account ${this.hpToDelete.username} (${this.hpToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.success('There was an issue deleting this account')
            console.log(error)
          })
    },
    deleteHP(hp) {
      /*TODO admin cant delete himself
      if (admin.id != this.$store.state.user.id) {

       */
        this.hpToDelete = hp
        let dlg = this.$refs.confirmationDialog
        dlg.show()
      }
    },
  mounted() {
    this.loadHPs()
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