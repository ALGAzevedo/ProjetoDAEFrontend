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
      labelsToFill : this.labelsToFill,
      arrBackGroundColour: [],
      arrBackBorderColour: []


    }
  },
  methods: {
    loadChart() {
      this.myChart = new Chart(this.$refs.myChart, {
        type: 'doughnut',
        data: {
          labels: this.labelsToFill,
          datasets: [{
            label: this.label,
            data: this.dataToFill,
            backgroundColor: this.arrBackGroundColour,
            borderColor: this.arrBackBorderColour,
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
    },
    loadBackGroundColor(){
      for(let i = 0; i < this.labelsToFill.length; i++){
        let rgba1 = Math.floor(Math.random() * 256).toString()
        let rgba2 = Math.floor(Math.random() * 256).toString()
        let rgba3 = Math.floor(Math.random() * 256).toString()
        //let rgba1 = Math.floor(Math.random() * 256)

        this.arrBackGroundColour.push('rgba('+rgba1+','+rgba2+','+rgba3+','+ 0.2+')')
        this.arrBackBorderColour.push('rgba('+rgba1+','+rgba2+','+rgba3+','+ 1+')')

      }

    },


  },
  watch: {
    dataToFill(newData) {
      this.dataToFill = newData

      this.loadBackGroundColor()

      this.loadChart()
      //console.log(this.dataToFill[0])
    },
    labelsToFill(newData){
      this.labelsToFill = newData
      this.loadChart()
    },


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