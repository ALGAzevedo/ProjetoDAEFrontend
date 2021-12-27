<template>
  <div>
    <br>
    <h2 class="text-center">{{pageTitle}}</h2>
    <br>
    <br>
    <form @submit.prevent="save">
      <div class="form-group">
        <label for="InputValue">Amount</label>
        <input :disabled="operationType === 'update'" v-model="editingTransaction.value" type="number" class="form-control"
               id="InputValue" aria-describedby="amountHelp" placeholder="Amount to send" name="value">
        <field-error-message
            :errors="errors"
            fieldName="value"
        ></field-error-message>
      </div>
      <br>
      <div class="mx-2 mt-2 flex-grow-1 filter-div">
        <label
            for="selectStatus"
            class="form-label"
        >Payment type:</label>
        <select class="form-select"
                id="selectStatus"
                v-model="editingTransaction.payment_type"
                :disabled="operationType === 'update'">
          <option v-for="paymentType in paymentTypes" :value="paymentType.code" :key="paymentType.code">
            {{ paymentType.name }}
          </option>


        </select>
        <field-error-message
            :errors="errors"
            fieldName="payment_type"
        ></field-error-message>
      </div>

      <br>
      <div class="form-group">
        <label for="InputDestination">Payment Reference</label>
        <input v-if="operationType === 'update'" disabled
               v-model="editingTransaction.payment_reference" type="text" class="form-control"
               id="InputDestinationUpdate"
               placeholder="Insert the payment reference"
               name="paymentRef">
        <input v-if="operationType !== 'update'"
               v-model="editingTransaction.paymentRef" type="text" class="form-control"
               id="InputDestination"
               placeholder="Insert the payment reference"
               name="paymentRef">
        <field-error-message
            :errors="errors"
            fieldName="paymentRef"
        ></field-error-message>
        <field-error-message
            :errors="errors"
            fieldName="vcard"
        ></field-error-message>
      </div>
      <br>
      <div class="mx-2 mt-2 flex-grow-1 filter-div" v-if="operationType != 'adminCreate'">
        <label
            for="selectCat"
            class="form-label"
        >Choose a category:</label>
        <select
            class="form-select"
            id="selectCat"
            v-model="editingTransaction.category_id"
        >
          <option value=""></option>
          <option v-for="category in categories" :value="category.id" :key="category.id">
            {{ category.name }}
          </option>
        </select>
        <field-error-message
            :errors="errors"
            fieldName="category_id"
        ></field-error-message>
      </div>
      <br>
      <div class="form-group" v-if="operationType != 'adminCreate'">
        <label for="InputDestination">Description</label>
        <input v-model="editingTransaction.description"
               type="text"
               class="form-control"
               id="InputDescription"
               aria-describedby="emailHelp"
               placeholder="Insert a brief description"
               name="description">
        <field-error-message
            :errors="errors"
            fieldName="description"
        ></field-error-message>
      </div>
      <br>
      <div v-if="operationType === 'create'" class="form-group">
        <label for="InputConfirmCode">Confirmation code</label>
        <input v-model="editingTransaction.confirmationCode"
               type="password"
               class="form-control"
               id="InputConfirmCode"
               placeholder="Insert your confirmation code"
               name="confirmationCode">
        <field-error-message
            :errors="errors"
            fieldName="confirmationCode"
        ></field-error-message>
      </div>
      <div class="d-flex justify-content-start mt-3">
        <div v-if="operationType === 'update'" class="me-5">
          <button type="button" @click="save" class="btn btn-primary">Save transaction</button>
        </div>
        <div v-if="(operationType === 'create') || operationType === 'adminCreate'">
          <button type="button" @click="save" class="btn btn-primary">Create transaction</button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
export default {
  name: "TransactionDetail",
  props: {
    transaction: {
      type: Object,
      required: true
    },
    paymentTypes: {
      type: Object,
    },
    categories: {
      type: Array
    },
    operationType: {
      type: String,
      default: 'update'  // insert / update
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      editingTransaction: this.transaction,
      amount: 0,
      responseTransaction: "",
      vcardDestination: 0,
      selectedCategory: -1,
      transactionDescription: '',
      transactionCreation: false,
    }
  },
  computed: {
    userId() {
      return this.$store.state.user.id;
    },
    vcardBalance() {
      //console.log(this.$store.state.vcard)
      return this.$store.state.vcard.balance;
    },
    pageTitle () {
      if (!this.editingTransaction) {
        return ""
      }
      //console.log("Detail op type: "+this.operationType)
      if(this.operationType == "create"){
        return "Current balance: "+this.vcardBalance+"€"
      }else if(this.operationType == "update"){
        return "Edit Transaction #"+this.editingTransaction.id
      }
      return "Add credit to vcard #"+this.editingTransaction.extra
    },
  },
  watch: {
    transaction(newTransaction) {
      this.editingTransaction = newTransaction
      console.log(this.editingTransaction)
      //once the transaction is available, we'll pre-select the category dropdown option that corresponds to this transaction
      this.selectedCategory = newTransaction.category === '' ? -1 : {name: newTransaction.category}
      //console.log("Informar o professor que há transações de debito com categoria de credito na DB -> "+newTransaction.category)
      //console.log("wats trans type -> "+newTransaction.type)
      this.transactionDescription = newTransaction.description
    }
  },
  methods: {
    save(){
      this.$emit("save", this.editingTransaction)
    },
    postNewTransaction() {
      this.$axios.post('transactions', this.newTransaction())
          .then(response => this.responseTransaction = response.data.status_code)
          .catch(error => {
            console.error("Error -> " + error.message);
          });
    },
  },
}
</script>

<style scoped>

</style>