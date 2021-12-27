<template>
  <br>
  <h1 class="text-center">Admin Report</h1>
  
  <br>

  <div class="container">
    <div class="row">
      <div class="col-sm-6">
        <select class="form-select"
                id="selectStatus"
                v-model="selectedYear"
        >
          <option :value="item" v-for="item in this.years" :key="item">
            {{ item }}
          </option>
        </select>
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
              :rgba-color="'rgba(255,255,255,0.1)'"
              :rgba-border-color="'rgba(0,0,0,1)'"

          >

          </LineChart>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <PolarChart
              :data-chart="this.arrPolarChartSatistics[0]"
              :key="this.arrLineChartSatistics[0]"
              :labels-for-chart="this.arrPolarChartSatistics[1]"

          >

          </PolarChart>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import LineChart from "../statistics/LineChart";
import PolarChart from "../statistics/PolarChart";

export default {
  name: "Report",
  components: {
    LineChart,
    PolarChart
  },

  data() {
    return {
      arrLineChartSatistics: [],
      arrPolarChartSatistics: [],
      years: [],
      selectedYear: 2021
    }
  },
  computed: {
    labelForLineChart() {
      return "Number of transactions by month in the year " + this.selectedYear
    },
    userName(){
      return this.$store.state.user.name
    }
  },
  methods: {
    loadLineChartStatistics() {
      this.$axios.get('admin/statistics/' + this.selectedYear + '/linechartstatistics')
          .then(response =>
                  this.arrLineChartSatistics = response.data
              // console.log(response.data)
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },
    loadPolarChartStatistics() {
      this.$axios.get('admin/statistics/' + this.selectedYear + '/polarchartstatistics')
          .then(response =>
                  this.arrPolarChartSatistics = response.data
              // console.log(response.data)
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },
    loadYears() {


      let currentYear = new Date().getFullYear();
      let j = 0;
      for (let i = 2019; i <= currentYear; i++) {

        this.years[j] = i;
        j++;

      }

      console.log(this.years)

    }
  },
  watch: {
    selectedYear() {
      this.loadLineChartStatistics()
      this.loadPolarChartStatistics()
    }
  },
  mounted() {
    this.loadLineChartStatistics()
    this.loadPolarChartStatistics()
    this.loadYears()
  }
}

</script>

<style scoped>

</style>