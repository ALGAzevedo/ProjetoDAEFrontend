<template>

  <canvas id="myChart" ref="myChart" width="100" height="100"></canvas>

</template>

<script>

import Chart from 'chart.js'

export default {
  name: "LineChart",
  props: {
    dataChart: {
      type: Array
    },
    label: {
      type: String
    },
    rgbaColor: {
      type: String
    },
    rgbaBorderColor: {
      type: String
    }



  },


  data() {
    return {

      myChart: null,
      dataToFill: this.dataToFill,


    }
  },
  methods: {
    loadChart() {
      this.myChart = new Chart(this.$refs.myChart, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: this.label,
            data: this.dataToFill,
            backgroundColor: [
              this.rgbaColor,


            ],
            borderColor: [
              this.rgbaBorderColor,


            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    loadData(){
      this.dataToFill = this.dataChart
    },

  },
  watch: {
    dataToFill(newData) {
      this.dataToFill = newData

      this.loadChart()
    },


  },
  mounted() {
    this.loadData()
    this.loadChart()


  }

}
</script>

<style scoped>

</style>