<template>
  <div>
    <br>
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div class="container">
        <div class="row">

          <h3 class="text-center">{{ userName.name }}</h3>
          <h5 class="text-center">{{ userName.email }}</h5>
        </div>
      </div>
    </div>

    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">

      <p><strong>Active vcards</strong>: {{ arrStatistics[0] }}</p>
      <p><strong>Blocked vcards</strong>: {{ arrStatistics[1] }}</p>
      <p><strong>Total sum of active vcard balances</strong>: {{ arrStatistics[2] }}&#8364;</p>
      <p><strong>Total number of transactions</strong>: {{ arrStatistics[3] }}</p>


    </div>


    <div>
      <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div class="container">
          <div class="row">
            <div class="col-sm-9">

              <br>
              <table class="table table-bordered">
                <thead>
                <tr>

                  <th scope="col">Payment type</th>
                  <th scope="col">Total</th>

                </tr>
                </thead>
                <tbody  v-for="item in arrStatistics[4]" :key="item[0]">
                <tr>

                  <td> {{item[0]}}</td>
                  <td>{{ item[1] }}&#8364;</td>

                </tr>
                </tbody>
              </table>


            </div>
          </div>
        </div>
        <div class="container">
          <div class="row h-25">
            <div class="col-sm-12">
              <p class="fst-italic text-center">Debit by payment type</p>
              <PieChart
                  :data-chart="this.arrChartStatistics[0]"
                  :key="this.arrChartStatistics[0]"
                  :label="this.labelPieChart"
                  :labels-for-chart="this.arrChartStatistics[2]"
              ></PieChart>

            </div>
          </div>
        </div>
        <div class="container">
          <div class="row h-25">
            <div class="col-sm-12">
              <p class="fst-italic text-center">Credit by payment type</p>
              <PieChart
                  :data-chart="this.arrChartStatistics[1]"
                  :key="this.arrChartStatistics[1]"
                  :label="this.labelPieChart"
                  :labels-for-chart="this.arrChartStatistics[2]"
              ></PieChart>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import PieChart from "../statistics/PieChart";

export default {
  name: 'AdminDashboard',
  components: {
    PieChart
  },

  data() {
    return {
      arrStatistics: [],
      labelPieChart: "Total by payment type",
      arrChartStatistics: []

    }
  },
  computed: {
    userName() {
      return this.$store.state.user;
    },


  },
  methods: {
    loadStatistics() {
      this.$axios.get('admin/statistics/globalstatistics')
          .then(response =>
              this.arrStatistics = response.data
          )

          .catch(error => {
            console.error("Error -> " + error.message);
          });
    },
    loadChartStatistics() {
      this.$axios.get('admin/statistics/chartstatistics')
          .then(response =>
                  this.arrChartStatistics = response.data
              // console.log(response.data))

              //  this.loadDataForChart()
          )

          .catch(error => {
            console.error("Error -> " + error.message);
          });
    },


  },
  watch: {
    arrStatistics(newData) {
      this.arrStatistics = newData;

    }
  },
  mounted() {
    this.loadStatistics();
    this.loadChartStatistics();


  }
};

</script>

<style scoped lang="scss">
</style>
