<template>
  <div class="container-fluid">
    <div class="row justify-content-center mt-3">
      <div class="col-4">
        <h3>Transaction History</h3>
      </div>
    </div>
    <div class="row mt-4 mb-3">
      <div class="col-6">
        <h5>Total Transactions: {{totalTransactions}}</h5>
      </div>
      <div class="col-6">
        <div class="float-end">
          <router-link :to="{ name: 'NewTransaction'}">
            <button type="button" class="btn btn-success"> <i class="bi bi-credit-card"></i> Create New Transaction</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div
      class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label
          for="selectTransactionType"
          class="form-label"
      >Filter by transaction category:</label>
      <select
          class="form-select"
          id="selectTransactionType"
          v-model="filterByTransactionCategory"
          @change="updateHandler"
      >
        <option value="-1">Any</option>
        <option value="-2">No category</option>
        <option
            v-for="prj in categories"
            :key="prj.id"
            :value="prj.id"
        >{{ prj.name }}
        </option>
      </select>
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label
          for="selectPaymentType"
          class="form-label"
      >Filter by payment type:</label>
      <select
          class="form-select"
          id="selectPaymentType"
          v-model="filterByPaymentType"
          @change="updateHandler"
      >
        <option value="-1">Any</option>
        <option
            v-for="prj in paymentTypes"
            :key="prj.code"
            :value="prj.code"
        >{{ prj.name }}
        </option>
      </select>
    </div>
  </div>

  <div class="row">
    <div class="d-flex justify-content-center flex-wrap">
      <h6>Transaction type:</h6>
    </div>
  </div>
  <div class="mb-3 d-flex justify-content-center flex-wrap">

    <div class="mx-2 mt-2 filter-div d-flex justify-content-end">
      <input class="form-check-input" type="checkbox" :value="creditValue" id="creditCheck" @change="creditCheckHandler"
             :checked="creditValue">
      <label class="form-check-label" for="creditCheck">
        <b>Credit</b>
      </label>
    </div>
    <div class="mx-2 mt-2 filter-div">
      <input class="form-check-input" type="checkbox" :value="debitValue" id="DebitCheck" @change="debitCheckHandler"
             :checked="debitValue">
      <label class="form-check-label" for="DebitCheck">
        <b>Debit</b>
      </label>
    </div>
  </div>

  <hr>
  <transaction-table
      :transactions="filteredTransactions"
      @edit="editTransaction"
      :showId="true">
  </transaction-table>
  <div class="row mb-4 mt-3">
    <div class="d-flex justify-content-center">
      <v-pagination
          v-model="page"
          :pages="pages"
          :range-size="1"
          active-color="#0275d8"
          @update:modelValue="paginatorHandler"
      />
    </div>
  </div>


</template>

<script>
import TransactionTable from "./TransactionTable";
import VPagination from "@hennge/vue3-pagination";

export default {
  name: "Transactions",
  components: {
    TransactionTable,
    VPagination
  },
  props: {
    vcard: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      transactions: [],
      filterByTransactionCategory: -1,
      creditValue: 1,
      debitValue: 1,
      filterByPaymentType: -1,
      page: 1,
      pages: 1,
      totalTransactions: 0,
    }
  },
  computed: {
    filteredTransactions() {
      return this.transactions;
    },
    totalUsers() {
      return this.transactions.length
    },
    categories(){
      return this.$store.getters.categories
    },
    paymentTypes(){
      return this.$store.getters.paymentTypes
    }
  },
  methods: {
    debitCheckHandler() {
      if (this.debitValue === 0) {
        this.debitValue = 1
      } else {
        this.debitValue = 0
      }
      this.updateHandler()
    },
    creditCheckHandler() {
      if (this.creditValue === 0) {
        this.creditValue = 1
      } else {
        this.creditValue = 0
      }
      this.updateHandler()
    },
    updateHandler() {
      //reset back to page 1 after messing with the filters to prevent getting stuck on a page in certain occasions when reducing the results amount
      this.page = 1;
      this.paginatorHandler();
    },
    paginatorHandler() {
      let transCategory = this.filterByTransactionCategory;
      let payType = this.filterByPaymentType;

      //console.log("Update page: " + this.page + "\nCategory: " + transCategory + "\nType: " + payType + "\nDebit: " + this.debitValue + "\nCredit: " + this.creditValue)
      // -1 = all transaction types / payment type
      // -2 = no


      this.$axios.get('vcards/' + this.vcard + '/transactions?page=' + this.page + '&ttype=' + transCategory + '&ptype=' + payType + '&credit=' + this.creditValue + '&debit=' + this.debitValue)
          .then((response) => {
            this.transactions = response.data.data
            this.page = response.data.meta['current_page']
            this.pages = response.data.meta['last_page']
            this.totalTransactions = response.data.meta['total']
            //console.log(response.data.meta)


          })
          .catch((error) => {
            console.log(error)
          })
    },
    loadTransactions() {
      //get the vcard associated with the logged in user + protect this route from admins to prevent fetching null vcards
      this.$axios.get('vcards/' + this.vcard + '/transactions')
          .then((response) => {
            this.transactions = response.data.data
            this.page = response.data.meta['current_page']
            this.pages = response.data.meta['last_page']
            this.totalTransactions = response.data.meta['total']
            //console.log(response.data.meta)
          })
          .catch((error) => {
            console.log(error)
          })
    },
    editTransaction(transaction) {
      //console.log("ou")
      //console.log(transaction)
      this.$router.push({name: 'Transaction', params: {id: transaction}})
    }
  },
  sockets: {
    createTransaction() {
      //reload all transactions
      this.loadTransactions()
    }
  },
  mounted() {
    //load user categories
    this.$store.dispatch('loadCategories')
    //load payment types on login
    this.$store.dispatch('loadPaymentTypes')
    this.loadTransactions()
  }
}
</script>

<style scoped>
.filter-div {
  min-width: 5rem;
}
.total-filtro {
  margin-top: 2.3rem;
}
</style>