<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ treatmentToDelete } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Treatment Types</h3>
    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalTreatmentTypes }}</h5>
    </div>
  </div>
  <div class="main-card bg-white">
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">
    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addTreatment">
        <i class="bi bi-xs bi-plus-circle"></i> Add Treatment Type
      </button>
    </div>
  </div>
    <treatment-types-table
    :treatmentTypes="treatmentTypes"
    :show-delete-button="true"
    :show-edit-button="true"
    @edit="editPrc"
    @cancel="cancel"
    ></treatment-types-table>

  </div>
</template>

<script>

import TreatmentTypesTable from "./TreatmentTypesTable";

export default {
  name: "TreatmentTypes",
  props: {
    prcCode: {
      type: Number,
      required: true,
    },
  },
  components: {
    TreatmentTypesTable,
  },
  data() {
    return {
      treatmentTypes: [],
      treatmentToDelete: null,
    }
  },
  computed: {
    TreatmentTypeToDeleteCode() {
      return this.treatmentTypes
          ? `"${this.treatmentTypes.code}"` : ''
    },

    totalTreatmentTypes() {
      return this.treatmentTypes.length
    }
  },
  methods: {
    loadPrcTreatmentTypes() {
      this.$axios.get('prcs/' + this.prcCode +'/treatmentTypes')
          .then((response) => {
            this.treatmentTypes = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addTreatment() {
      this.$router.push({name: 'NewTreatmentType'})
    },
    editPrc(treatment) {
      console.log(treatment)
      this.$router.push({name: 'EditTreatmentType', params: {treatmentTypeType: treatment.treatmentType, treatmentTypeCode: treatment.code, prcCode: this.prcCode}})
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
    this.loadPrcTreatmentTypes()
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
