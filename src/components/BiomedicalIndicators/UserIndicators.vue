<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the indicator ${ indicatorToDeleteId } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>
  <div>
    <div class="row mt-5">
      <div class="col">
        Biomedical Indicators History

      </div>
    </div>
    <div class="row m-5">
      <div class="text-end" v-if="indicators">
        Last Insertion {{LastInsertion}}

      </div>
    </div>
    <div class="row m-5">
      <div class="text-end mx-2 mt-2">
        <button type="button" class="btn btn-success px-4 btn-adduser" @click="addNewIndicator">
          <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
        </button>
      </div>
    </div>
    <div class="row m-5" v-if="indicatorsName">
      <div class="col-5">
        <table class="table">
          <thead>
          <tr>
            <th>Name</th>
            <th class="text-end">Go to Full list</th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="indicator in indicatorsName"
              :key="indicator.id"
          >
            <td>{{ indicator}}</td>
            <td class="text-end">
              <div class="d-flex justify-content-end">
                <button
                    class="btn btn-xs btn-light"
                    @click="goToIndicator(indicator)"
                ><i class="bi bi-arrow-right"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="col-7" v-if="selectedIndicator">
        <table class="table">
          <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
            <th>Description</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr
              v-for="indicator in selectedIndicator"
              :key="indicator.id"
          >
            <th>{{ indicator.date }}</th>
            <th>{{ indicator.value }}</th>
            <th>{{ indicator.description }}</th>
            <td class="text-end align-middle">
              <div class="d-flex justify-content-end">
                <button class="btn btn-xs btn-light" @click="editClick(indicator)">
                  <i class="bi bi-xs bi-pencil"></i>
                </button>
                <button class="btn btn-xs btn-light" @click="deleteClick(indicator)">
                  <i class="bi bi-xs bi-x-square-fill"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserIndicators",
  props: {
    patient: {
      type: Object
    },
  },

  data () {
    return {
      indicators: [],
      indicatorsName : [],
      selectedIndicator : undefined,
      selectedIndicatorName : {
        String,
        default : undefined,
      }
    }
  },
  computed : {
    LastInsertion() {
      return "not implemented yet"
    },
    patientUsername() {
        if(this.$store.state.user.userType == 'Patient' ) {
          return this.$store.state.user.username
        }
        return this.patient.username
    },
    indicatorToDeleteId() {
      return this.indicatorToDelete
          ? `"${this.indicatorToDelete.id}"` : ''
    },
  },
  methods: {
    addNewIndicator() {
      this.$router.push({name:'UserNewMeasure', params: {patientUsername: this.patientUsername.toString()}})
    },
    goToIndicator(indicator) {
      if(indicator == this.selectedIndicatorName) {
        this.selectedIndicator = undefined
        this.selectedIndicatorName = ''
      }

      else {
        this.selectedIndicator = this.indicators.filter(e => e.indicator == indicator)
        this.selectedIndicatorName = indicator;
      }


    },
    loadIndicators() {
      this.$axios.get('patients/' + this.patientUsername + '/biomedicalRegisters')
          .then((response) => {
            if(response.data[0] == null) {
              this.indicators = undefined
              this.indicatorsName = undefined
            }

            else
            {
              this.indicators = response.data
              //distinct names
              this.indicatorsName = [...new Set(this.indicators.map(item => item.indicator))];
              this.selectedIndicator = this.indicators.filter(e => e.indicator == this.selectedIndicatorName)
            }


          })
          .catch((error) => {
            console.log(error)
          })

    },
    editClick(indicator) {
      this.$router.push({name: 'UserEditMeasure', params: {patientUsername: this.patientUsername, indicatorID: indicator.id, operationType: 'edit'}})
    },
    deleteClick(indicator) {
      this.indicatorToDelete = indicator
      let dlg = this.$refs.confirmationDialog
      dlg.show()

    },
    deleteConfirmed() {
      this.$axios.delete('patients/' + this.patientUsername + '/biomedicalRegisters/' + this.indicatorToDelete.id)
          .then(() => {
            this.$toast.success('indicator deleted sucessfully')
            this.loadIndicators()
          })
          .catch((error) => {
            console.log(error.response)
            this.$toast.error('Indicator was not deleted due to a server error')
          })
    },
  },
  mounted() {
    this.loadIndicators()
  }

}
</script>

<style scoped>

</style>