<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the user ${ BIToDeleteName } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Biomedical Indicators</h3>

    </div>
    <div class="mx-2 total-records">
      <h5 class="mt-4">Total: {{ totalIndicators}}</h5>
    </div>
  </div>
  <hr>
  <biomedical-indicators-table-filter
    @filter="filter"
    @add="addIndicator">
  </biomedical-indicators-table-filter>

  <hr>
  <IndicatorsTable
      :indicators="indicators"
      @edit="editIndicator"
      @delete="deleteIndicator"
  ></IndicatorsTable>
</template>


<script>


import IndicatorsTable from "./IndicatorsTable";
import BiomedicalIndicatorsTableFilter from "./BiomedicalIndicatorsTableFilter";

export default {
  name: "BiomedicalIndicators",
  components: {
    IndicatorsTable,
    BiomedicalIndicatorsTableFilter
  },
  data() {
    return {
      indicators: [],
      BIToDelete: null,
    }
  },
  computed: {
    BIToDeleteName() {
      return this.BIToDelete
          ? `"${this.BIToDelete.name}"` : ''
    },

    totalIndicators() {
      return this.indicators.length
    }
  },
  methods: {
    loadIndicators() {
      this.$axios.get('biomedicalindicators')
          .then((response) => {
            this.indicators = response.data
          })
          .catch((error) => {
            console.log(error)
          })
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

    filter(filterBody) {
      const str = this.parameters(filterBody)
      this.$axios.get('biomedicalindicators'+str)
          .then((response) => {
            this.indicators = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    addIndicator() {
      this.$router.push({name: 'NewBiomedicalIndicator'})
    },
    editIndicator(indicator) {
      this.$router.push({ name: 'EditBiomedicalIndicator', params: {id: indicator.id, indicatorType : indicator.indicatorType} })
    },
    deleteConfirmed() {
      this.$axios.delete('biomedicalindicators/' + this.BIToDelete.id)
          .then(() => {
            this.loadIndicators();
            this.$toast.success(`Patient ${this.BIToDelete.id} (${this.BIToDelete.name}) was deleted successfully.`)
          })
          .catch((error) => {
            this.$toast.error('There was an issue deleting this account')
            console.log(error)
          })
    },
    deleteIndicator(indicator) {
      /*TODO admin cant delete himself
      if (admin.id != this.$store.state.user.id) {

       */
        this.BIToDelete = indicator
        let dlg = this.$refs.confirmationDialog
        dlg.show()
      }
    },
  mounted() {
    this.loadIndicators()
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