<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ adminToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>

  <div class="d-flex justify-content-between my-3">
    <div class="mx-2">
      <h3>Admins</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 >Total: {{ totalAdmins }}</h5>
    </div>
  </div>
  <hr>
  <users-filters-body
      :show-institutional-email="false"
      :show-institutional-phone="false"
      :show-social-security-number="false"
      @filter="filter"
      @add="addAdmin"
    ></users-filters-body>

  <hr>
  <users-table
      :users="admins"
      :show-delete-button="true"
      :show-edit-button="true"
      :show-emergency-phone-number="false"
      :show-social-security-number="false"
      :show-institutional-email="false"
      :show-institutional-phone-number="false"
      :show-is-super-admin="true"
      :showPrcList="false"
      :showDocumentsList="false"
      @edit="editAdmin"
      @delete="deleteAdmin"
      @makeSuper="makeSuper"
  ></users-table>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";
import UsersFiltersBody from "../UsersCommon/UsersFiltersBody";

export default {
  name: "Administrators",
  components: {
    UsersTable,
    UsersFiltersBody,
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
      this.$axios.get('administrators'+str)
          .then((response) => {
            this.admins = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
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
            this.$toast.warning('There was an issue deleting this account')
            console.log(error)
          })
    },
    deleteAdmin(admin) {
        this.adminToDelete = admin
        let dlg = this.$refs.confirmationDialog
        dlg.show()
      },
    makeSuper(admin) {
      if(!admin.superAdmin) {
        this.$axios.patch('administrators/'+admin.username+'/super', true)
            .then((response) => {
              this.$toast.success('User is Super Admin Now')
              this.user = response.data.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)

                this.$toast.error('User was not created due to unknown server error!')

            })

      }
    },
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