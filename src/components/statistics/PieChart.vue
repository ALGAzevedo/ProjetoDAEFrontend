<template>

  <canvas id="myChart" ref="myChart" width="100" height="100"></canvas>

</template>

<script>

import Chart from 'chart.js'

export default {
  name: "PieChart",
  props: {
    dataChart: {
      type: Array
    },
    label: {
      type: String
    },
    labelsForChart: {
      type: Array
    }

  },


  data() {
    return {

      myChart: null,
      dataToFill: this.dataToFill,
      labelsToFill : this.labelsToFill


    }
  },
  methods: {
    loadChart() {
      this.myChart = new Chart(this.$refs.myChart, {
        type: 'pie',
        data: {
          labels: this.labelsToFill,
          datasets: [{
            label: this.label,
            data: this.dataToFill,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(209, 215, 235, 0.2)',
              'rgba(73, 151, 208, 0.2)'

            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
              'rgba(209, 215, 235, 1)',
              'rgba(73, 151, 208, 1)'

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
    loadLabels(){
      this.labelsToFill = this.labelsForChart
    }

  },
  watch: {
    dataToFill(newData) {
      this.dataToFill = newData

      this.loadChart()
      //console.log(this.dataToFill[0])
    },
    labelsToFill(newData){
      this.labelsToFill = newData
      this.loadChart()
    }

  },
  mounted() {
    this.loadChart()
    this.loadLabels()
    this.loadData()

  }

}
</script>

<style scoped>

</style>