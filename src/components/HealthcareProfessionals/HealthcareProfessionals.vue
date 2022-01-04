<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ hpToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between my-3">
    <div class="mx-2">
      <h3 >Healthcare Professionals</h3>
    </div>
    <div class="mx-2 total-records">
      <h5>Total: {{ totalHP }}</h5>
    </div>
  </div>
  <hr>
  <UsersFiltersBody
      :show-institutional-phone="true"
      :show-institutional-email="true"
      @add="addHP"
      @filter="filter"
    ></UsersFiltersBody>

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
      :show-make-super-admin="false"
      :show-documents-list="false"
      @edit="editHP"
      @delete="deleteHP"
  ></users-table>
</template>


<script>
import UsersTable from "../UsersCommon/UsersTable";
import UsersFiltersBody from "../UsersCommon/UsersFiltersBody";

export default {
  name: "HealthcareProfessionals",
  components: {
    UsersTable,
    UsersFiltersBody,
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
      this.$axios.get('healthcareprofissionals'+str)
          .then((response) => {
            this.hps = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
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