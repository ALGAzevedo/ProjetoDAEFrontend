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
  <hr>
  <TreatmentTypesFilterBody
      @filter="filter"
  ></TreatmentTypesFilterBody>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
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
    @delete="deleteTreatment"
    @edit="editPrc"
    @cancel="cancel"
    ></treatment-types-table>
</template>

<script>

import TreatmentTypesTable from "./TreatmentTypesTable";
import TreatmentTypesFilterBody from "./TreatmentTypesFilterBody";

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
    TreatmentTypesFilterBody
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
    filter(filterBody, type) {
      console.log(type)
      const str = this.parameters(filterBody)
      console.log(str)
      this.$axios.get(type + str)
          .then((response) => {
            this.treatmentTypes = response.data
          })
          .catch((error) => {
            this.treatmentTypes = []
            console.log(error)
          })
    },
    cancel() {
      this.$router.back()
    },
    deleteConfirmed() {
      console.log(this.treatmentToDelete)
      this.$axios.delete(this.treatmentToDelete.treatmentType + "/" + this.treatmentToDelete.code)
          .then(() => {
            this.loadPrcTreatmentTypes()
            this.$toast.success(`Treatment #${this.treatmentToDelete.code} (${this.treatmentToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.error('There was an issue deleting this treatment')
            console.log(error)
          })
    },
    deleteTreatment(treatment) {
      this.treatmentToDelete = treatment
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
