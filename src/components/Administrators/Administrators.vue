<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ adminToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Admins</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalAdmins }}</h5>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">

    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addAdmin">
        <i class="bi bi-xs bi-plus-circle"></i> Add Administrator
      </button>
    </div>
  </div>
  <hr>
  <users-table
      :users="admins"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-emergency-phone-number="false"
      :show-social-security-number="false"
      :show-institutional-email="false"
      :show-institutional-phone-number="false"
      :show-pcr-list="false"
      :showDocumentsList="false"
      @edit="editAdmin"
      @delete="deleteAdmin"
  ></users-table>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";

export default {
  name: "Administrators",
  components: {
    UsersTable,
  },
  data() {
    return {
      admins: [],
      adminToDelete: null,
    }
  },
  computed: {
    adminToDeleteName() {
      return this.adminToDelete
          ? `"${this.adminToDelete.username}"` : ''
    },

    totalAdmins() {
      return this.admins.length
    }
  },
  methods: {
    loadAdmins() {
      this.$axios.get('administrators')
          .then((response) => {
            this.admins = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addAdmin() {
      this.$router.push({name: 'NewAdministrator'})
    },
    editAdmin(admin) {
      this.$router.push({ name: 'EditAdministrator', params: {usernameIn: admin.username} })
    },
    deleteConfirmed() {
      this.$axios.delete('administrators/' + this.adminToDelete.username, this.adminToDelete)
          .then(() => {
            this.loadAdmins();
            this.$toast.success(`Account ${this.adminToDelete.username} (${this.adminToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.success('There was an issue deleting this account')
            console.log(error)
          })
    },
    deleteAdmin(admin) {
      /*TODO admin cant delete himself
      if (admin.id != this.$store.state.user.id) {

       */
        this.adminToDelete = admin
        let dlg = this.$refs.confirmationDialog
        dlg.show()
      }
    },
  mounted() {
    this.loadAdmins()
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