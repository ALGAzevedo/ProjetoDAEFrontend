<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete category"
      :msg="`Do you really want to delete the category ${ indicatorToDeleteDescription }?`"
      @confirmed="deleteConfirmed"
  >
  </confirmation-dialog>

  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Patient Indicators</h3>
    </div>
  </div>
  <hr>
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search"
            >
    </div>
  </div>
  <hr>

  <IndicatorsHPTable
      :indicators=indicators
      @add="addIndicator"
      @edit="editIndicator"
      @delete="deleteIndicator">
  </IndicatorsHPTable>


</template>

<script>


import ConfirmationDialog from "../global/ConfirmationDialog";
import IndicatorsHPTable from "./IndicatorsHPTable";




export default {
  name: 'HealthcareProfessionalIndicators',
  components: {
    ConfirmationDialog,
    IndicatorsHPTable,

  },
  data () {
    return {
      indicatorToDelete: null,
      indicators : []
    }
  },
  mounted() {
    this.loadIndicators();
  },
  computed: {

    indicatorToDeleteDescription () {
      return this.indicatorToDelete
          ? `#${this.indicatorToDelete.id} (${this.indicatorToDelete.indicator})`
          : ''
    }

  },
  methods: {

    loadIndicators() {
      this.$axios.get('patients/biomedicalRegisters')
          .then((response) => {
            console.log(response)
            this.indicators = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addIndicator (indicator) {
      console.log(indicator)
      this.$router.push({name:'UserNewMeasure', params: {patientUsername: indicator.patient}})
    },
    editIndicator (indicator) {
      this.$router.push({name: 'UserEditMeasure', params: {patientUsername: indicator.patient, indicatorID: indicator.id, operationType: 'edit'}})

    },
    deleteConfirmed () {
      this.$axios.delete('patients/' + this.indicatorToDelete.patient + '/biomedicalRegisters/' + this.indicatorToDelete.id)
          .then(() => {
            this.$toast.success('indicator deleted sucessfully')
            this.loadIndicators()
          })
          .catch((error) => {
            console.log(error.response)
            this.$toast.error('Indicator was not deleted due to a server error')
          })
    },
    deleteIndicator(indicator) {
      this.indicatorToDelete = indicator
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },

  },
}
</script>

<style scoped>


</style>
