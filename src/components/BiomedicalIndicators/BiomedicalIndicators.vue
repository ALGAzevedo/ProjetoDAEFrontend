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
  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label for="selectName" class="form-label">Filter by Name:</label>
      <input type="text" id="selectName" class="form-control" placeholder="Enter name to search">

    </div>
    <div class="mx-2 mt-2">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addIndicator">
        <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
      </button>
    </div>
  </div>
  <hr>
  <IndicatorsTable
      :indicators="indicators"
      @edit="editIndicator"
      @delete="deleteIndicator"
  ></IndicatorsTable>
</template>


<script>


import IndicatorsTable from "./IndicatorsTable";

export default {
  name: "BiomedicalIndicators",
  components: {
    IndicatorsTable,
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
            console.log(response.data)
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
            this.$toast.success('There was an issue deleting this account')
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