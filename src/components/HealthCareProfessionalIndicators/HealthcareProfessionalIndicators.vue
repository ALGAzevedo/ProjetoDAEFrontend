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
  <IndicatorsFilterBody
  @filter="filterInd">

  </IndicatorsFilterBody>

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
import IndicatorsFilterBody from "../BiomedicalIndicators/IndicatorsFilterBody";



export default {
  name: 'HealthcareProfessionalIndicators',
  components: {
    ConfirmationDialog,
    IndicatorsHPTable,
    IndicatorsFilterBody,

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
    },


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
    filterInd(filterBody) {
      const str = this.parameters(filterBody)


      this.$axios.get('patients/biomedicalRegisters'+str)
          .then((response) => {
            console.log(response)
            this.indicators = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },

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
