<template>
  <div>
    <br>
    <h3>{{ userName }}</h3>
    <h4>Vcard # {{ vcardNumber }}</h4>
    <h4>Vcard balance: {{ vcardBalance }}&#8364;</h4>

    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">


      <p>Avg debit last 3 months: {{ numOfTransactions[2] }}&#8364;</p>
      <p>Number of Debit transactions: {{ numOfTransactions[1] }}</p>
      <p>Total amount paid: {{ numOfTransactions[3] }}&#8364;</p>
      <p>Number of Credit transactions: {{ numOfTransactions[0] }}</p>
      <p>Total amount received: {{ numOfTransactions[4] }}&#8364;</p>


    </div>
    <div class="d-flex justify-content-center mt-3 mb-3">
      <router-link :to="{ name: 'NewTransaction'}">
        <button type="button" class="btn btn-primary me-2"><i class="bi bi-credit-card"></i>Send Money</button>
      </router-link>

      <router-link :to="{ name: 'RequestMoney'}">
        <button type="button" class="btn btn-primary ms-2"><i class="bi bi-credit-card"></i>Request Money</button>
      </router-link>
    </div>
    <div v-if="this.numOfTransactions[0] && this.numOfTransactions[0] !== 0"
         class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <h5>Last transaction:</h5>
            <p>Date: {{ transaction.datetime }}</p>
            <p v-if="transaction.type === 'C'">Type: Credit</p>
            <p v-if="transaction.type === 'D'">Type: Debit</p>
            <p>Amount: {{ transaction.value }}&#8364;</p>
            <p>Category: {{ transaction.category }}</p>
            <p>Payment type: {{ transaction.payment_type }}</p>
            <p>Reference: {{ transaction.payment_reference }}</p>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row h-25">
          <div class="col-sm-12">
            <BarChart
                :data-chart="this.sumOfDebitTransactionsBYMonth"
                :key="this.sumOfDebitTransactionsBYMonth"
                :label="this.labelChartDebit"
            ></BarChart>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="row h-25">
          <div class="col-sm-12">
            <BarChart
                :data-chart="this.sumOfCreditTransactionsBYMonth"
                :key="this.sumOfCreditTransactionsBYMonth"
                :label="this.labelChartCredit"
            ></BarChart>
          </div>
        </div>
      </div>
      <div>

      </div>
    </div>
  </div>

</template>

<script>

//import StatisticsDashboard from "../statistics/StatisticsDashboard";
import BarChart from "../statistics/BarChart";
//import ChartTest from "../statistics/ChartTest"
export default {
  name: 'VcardDashboard',
  components: {

    BarChart

    //StatisticsDashboard,
    //Chart,

  },
  data() {
    return {
      transaction: this.newTransaction(),
      numOfTransactions: [],
      sumOfDebitTransactionsBYMonth: [],
      sumOfCreditTransactionsBYMonth: [],
      labelChartDebit: "Total amount paid by month in the current year",
      labelChartCredit: "Total amount received by month in the current year",

    }
  },
  computed: {
    vcardNumber() {
      return this.$store.state.user.id;
    },
    userName() {
      return this.$store.state.user.name;
    },
    vcardBalance() {
      return this.$store.state.vcard.balance;
    },


  },
  methods: {
    loadTransaction() {
      this.$axios.get('vcards/' + this.$store.state.user.id + '/transactions')
          .then(response => this.transaction = response.data.data[0])
          .catch(error => {
            console.error("Error -> " + error.message);
          });
    },
    newTransaction() {
      return {
        datetime: '',
        type: '',
        value: '',
        payment_type: '',
        payment_reference: '',
        category: ''
      }
    },
    loadNumTransactions() {
      this.$axios.get('statistics/transactions')
          .then(response => {
                this.numOfTransactions = response.data
                //console.log(this.numOfTransactions);
                //console.log(this.numOfTransactions[0] !== 0);
              }
          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })


    },
    loadChartDebit() {
      this.$axios.get('statistics/debitTransactionsByMonth')
          .then(response =>
                  this.sumOfDebitTransactionsBYMonth = response.data[0]
              // console.log(response.data[0])

          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    },
    loadChartCredit() {
      this.$axios.get('statistics/creditTransactionsByMonth')
          .then(response =>
                  this.sumOfCreditTransactionsBYMonth = response.data[0]
              //console.log(response.data[0])

          )
          .catch(error => {
            console.log("Error -> " + error.message)
          })
    }
  },
  mounted() {
    this.loadTransaction();
    this.loadNumTransactions();
    this.loadChartDebit();
    this.loadChartCredit();


  }
}


</script>

<style scoped lang="scss">


</style>