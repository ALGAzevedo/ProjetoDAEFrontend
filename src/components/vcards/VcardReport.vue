<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center">
          <h1>Vcard Reports</h1>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="d-flex justify-content-center">
          <h3>#{{ user.id }}</h3>
        </div>
      </div>
    </div>
    <div v-if="debitChartSatisticsCount">
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h4><strong>Debits by Category</strong></h4>
              <DoughnutChart
                  :data-chart="this.arrDoughChartSatistics[0]"
                  :key="this.arrDoughChartSatistics[0]"
                  :labels-for-chart="this.arrDoughChartSatistics[2]"
                  :label="this.labelForDoughChart">

              </DoughnutChart>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <h4><strong>Credits by Category</strong></h4>
              <DoughnutChart
                  :data-chart="this.arrDoughChartSatistics[1]"
                  :key="this.arrDoughChartSatistics[1]"
                  :labels-for-chart="this.arrDoughChartSatistics[2]"
                  :label="this.labelForDoughChart">

              </DoughnutChart>
            </div>
          </div>
        </div>

      </div>
      <br>
      <br>

      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <select class="form-select"
                      id="selectStatus"
                      v-model="selectedYear"
              >
                <option :value="item.year" v-for="item in this.arrDoughChartSatistics[3]" :key="item.year">
                  {{ item.year }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <select class="form-select"
                      id="selectStatus"
                      v-model="selectedCreditYear"
              >
                <option :value="item.year" v-for="item in this.arrDoughChartSatistics[3]" :key="item.year">
                  {{ item.year }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <LineChart
                  :data-chart="this.arrLineChartSatistics"
                  :key="this.arrLineChartSatistics"
                  :label="this.labelForLineChart"
                  :rgba-color="this.rgbaColorDebit"
                  :rgba-border-color="rgbaBorderColorDebit"
              >

              </LineChart>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <LineChart
                  :data-chart="this.arrLineCreditChartSatistics"
                  :key="this.arrLineCreditChartSatistics"
                  :label="this.labelForCreditLineChart"
                  :rgba-color="rgbaColorCredit"
                  :rgba-border-color="rgbaBorderColorCredit"
              >

              </LineChart>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>

import DoughnutChart from "../statistics/DoughnutChart";
import LineChart from "../statistics/LineChart";

export default {
  name: "Report",
  components: {
    DoughnutChart,
    LineChart
  },
  data() {
    return {
      selectedYear: 2021,
      selectedCreditYear: 2021,
      arrDoughChartSatistics: [],
      arrLineChartSatistics: [],
      arrLineCreditChartSatistics: [],
      labelsDoughChartSatistics: [],
      labelForDoughChart: "Payments by category",
      rgbaColorDebit: 'rgba(209, 215, 235, 0.2)',
      rgbaBorderColorDebit: 'rgba(73, 151, 208, 1)',
      rgbaColorCredit: 'rgba(216,252,168,0.2)',
      rgbaBorderColorCredit: 'rgba( 143,165,113,1)'

    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    labelForLineChart() {
      return "Number of debit transactions by month in the year " + this.selectedYear
    },
    labelForCreditLineChart() {
      return "Number of credit transactions by month in the year " + this.selectedCreditYear
    },
    debitChartSatisticsCount(){
      //summ all the debits made in the specific year
      //console.log("123")
      return this.arrLineChartSatistics.reduce(function (a, b) {
        return a + b
      }, 0)
    }
  },
  methods: {
    loadDoughChartSatistics() {
      this.$axios.get('statistics/doughchartstatistics')
          .then(response => this.arrDoughChartSatistics = response.data
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },
    loadLineDebitChartSatistics() {
      this.$axios.get('statistics/' + this.selectedYear + '/linedebitchartstatistics')
          .then(response => {
                this.arrLineChartSatistics = response.data
                //console.log(response.data)
          }
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },
    loadLineCreditChartSatistics() {
      this.$axios.get('statistics/' + this.selectedCreditYear + '/linecreditchartstatistics')
          .then(response =>
                  this.arrLineCreditChartSatistics = response.data
              // console.log(response.data)
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },


  },
  watch: {
    selectedYear() {
      this.loadLineDebitChartSatistics();
    },
    selectedCreditYear() {
      this.loadLineCreditChartSatistics();
    }
  },
  mounted() {
    this.loadDoughChartSatistics()
    this.loadLineDebitChartSatistics();
    this.loadLineCreditChartSatistics();
    // this.loadInitialLineChartSatistics()
  }

}

</script>

<style scoped>

</style>