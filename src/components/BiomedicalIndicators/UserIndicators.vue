<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete user"
      :msg="`Do you really want to delete the indicator ${ indicatorToDeleteId } ?`"
      @confirmed="deleteConfirmed">
  </confirmation-dialog>

  <div class="d-flex justify-content-between my-3">
    <div class="mx-2">
      <h3 >Biomedical Indicators History</h3>
    </div>
    <div class="mx-2 ">
      <button type="button" class="btn btn-success px-4 btn-adduser" @click="addNewIndicator">
        <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
      </button>
    </div>
  </div>
  <div class="main-card bg-white">
  <IndicatorsFilterBody
      :show-name="false"
      :show-username="false"
      @filter="filterInd"
  >

  </IndicatorsFilterBody>
    <hr class="mt-4">
  <div>
    <div class="row m-5">
      <div class="text-end">
        <button type="button" class="btn btn-success px-4 btn-adduser" @click="addNewIndicator">
          <i class="bi bi-xs bi-plus-circle"></i> Add Indicator
        </button>
      </div>
      <div class="text-end">
        <button type="button" class="btn btn-success px-4 btn-adduser" @click="addNewDocument">
          <i class="bi bi-xs bi-plus-circle"></i> Add Document
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
      </div>
      <div class="col-12 col-md-7" v-if="selectedIndicator">
        <div class="table-responsive">
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
            <td>{{ indicator.date }}</td>
            <td>{{ indicator.value }}</td>
            <td>{{ indicator.description }}</td>
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
  </div>
  </div>
</template>

<script>
import IndicatorsFilterBody from "./IndicatorsFilterBody";

export default {
  name: "UserIndicators",
  props: {
    patient: {
      type: Object
    },
  },
  components : {
    IndicatorsFilterBody,
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
    addNewDocument() {
      this.$router.push({name:'DocumentUpload'})
    },
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


      this.$axios.get('patients/' + this.patientUsername + '/biomedicalRegisters' + str)
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