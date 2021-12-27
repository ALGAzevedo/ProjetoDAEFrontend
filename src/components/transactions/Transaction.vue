<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <transaction-detail
      :operationType="operation"
      :transaction="transaction"
      :categories="filteredCategories"
      :paymentTypes="paymentTypes"
      :errors="errors"
      @save="save"
      @cancel="cancel">
  </transaction-detail>
</template>

<script>
import TransactionDetail from "../transactions/TransactionDetail";

export default {
  name: "Transaction",
  components: {
    TransactionDetail
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    vcard: {
      type: String,
      default: ''
    },
    value : Number,
    phone_number : String,

  },
  data() {
    return {
      transaction: this.newTransaction(),
      errors: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    userType(){
      return this.$store.state.user ?  this.$store.state.user.type : 'None'
    },
    operation() {
      //.log("Transaction operation: "+(!this.id || this.id < 0) ? (this.$store.state.user.type === 'V' ? 'create' : 'adminCreate') : 'update')
      return (!this.id || this.id < 0) ? (this.userType === 'V' ? 'create' : 'adminCreate') : 'update'
    },
    filteredCategories() {
      //console.log("Filtered transactions on component")
      //console.log(this.$store.getters.categoriesFilteredByType(this.transaction.type))
      //console.log(this.$store.getters.categories)
      if (this.operation == 'update') {
        return this.$store.getters.categoriesFilteredByType(this.transaction.type)
      } else {
        //create new transaction
        return this.$store.getters.categoriesFilteredByType('D')
      }
    },
    paymentTypes() {
      //console.log(this.$store.getters.paymentTypes)
      //remove VCARD payment type when an admin is crediting another vcard
      if (this.userType === 'V'){
        //console.log("vcard user")
        return this.$store.getters.paymentTypes
      }else{
        //console.log("vcard app admin")
        //this.$store.getters.paymentTypes.forEach( v => {console.log(v.code)})
        if(this.userType === 'A'){
          return this.$store.getters.paymentTypes.filter(x => x.code !== "VCARD")
        }
        //return nothing
        return []
      }
    }
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler(newValue) {
        this.loadTransaction(newValue)
      }
    }
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.transaction)
    },
    newTransaction() {
      let amountToSend = this.value
      let phoneToSend = this.phone_number

      return {
        value: amountToSend == 0 ? '' : amountToSend,
        extra: this.vcard,
        payment_type: '',
        paymentRef: phoneToSend == 0 ? '' : phoneToSend,
        category_id: '',
        description: '',
        confirmationCode: '',
      }
    }, isNumber(n) {
      return !isNaN(parseFloat(n)) && !isNaN(n - 0)
    },
    save() {
      //console.log("Save on Transaction")
      if (this.operation === "create") {
        console.log("create transaction")
        //console.log(this.transaction)


        let jsonToSend = {}
        //create transaction
        if (this.transaction.category_id) {
          jsonToSend.category = this.transaction.category_id
        }
        if (this.transaction.description) {
          jsonToSend.description = this.transaction.description
        }

        jsonToSend.paymentType = this.transaction.payment_type
        jsonToSend.value = this.transaction.value
        jsonToSend.paymentRef = this.transaction.paymentRef
        jsonToSend.confirmationCode = this.transaction.confirmationCode

        //console.log(this.$store.state.user.id)
        console.log("Sending transaction to API")
        this.$axios.post('vcards/' + this.$store.state.user.id + '/transaction', jsonToSend)
            .then(() => {
              this.$store.dispatch('refreshVcard')
              this.$toast.success('Transaction was created successfully.')
              //send an extra field to the message borker to identify who sent the transaction
              jsonToSend.sender = this.$store.state.user.id
              this.$socket.emit('createTransaction', jsonToSend)
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('Transaction was not created due to validation errors!')
                //need to fix this we need an error object. Adicionar 1 campo na resposta com 1 object chamado errors??
                this.errors = error.response.data.errors
                //console.log(error.response.data.message)
              } else {
                this.$toast.error('Transaction was not created due to an unknown server error!')
              }
            })


      } else if(this.operation === "update"){
        console.log("update transaction")
        console.log(this.transaction)
        //axios patch; check for 422
        let newDescription = this.transaction.description
        let newCategory = this.transaction.category_id
        let jsonToSend = {}
        if (newDescription) {
          jsonToSend.description = newDescription
        }
        if (newCategory) {
          jsonToSend.category = newCategory
          //jsonToSend.category = "999"
        }

        if (Object.keys(jsonToSend).length === 0) {
          //json object empty
          this.$toast.error('Transaction update failed.')
          return
        }

        this.$axios.patch('transactions/' + this.transaction.id, jsonToSend)
            .then((response) => {
              this.$toast.success('Transaction #' + response.data.data.id + ' was updated successfully.')
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('Transaction was not updated due to validation errors!')
                //need to fix this we need an error object. Adicionar 1 campo na resposta com 1 object chamado errors??
                this.errors = error.response.data.errors
                //console.log(error.response.data.message)
              } else {
                this.$toast.error('Transaction was not updated due to an unknown server error!')
              }
            })
      }else{
        //admin transfer
        console.log("admin credit transaction")
        //console.log(this.transaction)

        let jsonToSend = {}
        //create transaction
        if (this.transaction.category_id) {
          jsonToSend.category = this.transaction.category_id
        }
        if (this.transaction.description) {
          jsonToSend.description = this.transaction.description
        }

        jsonToSend.receivingVcardNumber = this.transaction.extra
        jsonToSend.value = this.transaction.value
        jsonToSend.paymentType = this.transaction.payment_type
        jsonToSend.paymentRef = this.transaction.paymentRef

        //console.log(this.$store.state.user.id)
        console.log("Sending transaction to API")
        this.$axios.post('admin/transactions', jsonToSend)
            .then(() => {
              this.$toast.success('Transaction was created successfully.')
              //I gotta switch the json field names so that the node server sends the transaction json to the right channel
              jsonToSend.type = "External"
              //had to reorganize the json to simplify the notification part
              jsonToSend.adminID = this.$store.state.user.id
              jsonToSend.paymentRef = jsonToSend.receivingVcardNumber
              jsonToSend.sender = this.transaction.paymentRef
              this.$socket.emit('createTransaction', jsonToSend)
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('Transaction was not created due to validation errors!')
                //need to fix this we need an error object. Adicionar 1 campo na resposta com 1 object chamado errors??
                this.errors = error.response.data.errors
                console.log(error.response.data.message)
              } else {
                this.$toast.error('Transaction was not created due to an unknown server error!')
              }
            })
      }
      /*
      if (this.operation == 'insert') {
        this.$axios.post('transactions', this.transaction)
            .then((response) => {
              this.$toast.success('transaction #' + response.data.data.id + ' was created successfully.')
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('transaction was not created due to validation errors!')
              } else {
                this.$toast.error('transaction was not created due to unknown server error!')
              }
            })
      } else {
        this.$axios.put('transactions/' + this.id, this.transaction)
            .then((response) => {
              this.$toast.success('Transaction #' + response.data.data.id + ' was updated successfully.')
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 422) {
                this.$toast.error('transaction #' + this.id + ' was not updated due to validation errors!')
              } else {
                this.$toast.error('transaction #' + this.id + ' was not updated due to unknown server error!')
              }
            })
      }*/
    },
    loadTransaction(id) {
      if (!id || (id < 0)) {
        this.transaction = this.newTransaction()
        this.originalValueStr = this.dataAsString()
      } else {
        this.$axios.get('transactions/' + id)
            .then((response) => {
              this.transaction = response.data.data
              this.originalValueStr = this.dataAsString()
              //console.log(this.transaction)
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    cancel() {
      // Replace this code to navigate back
      // this.loadtransaction(this.id)
      this.$router.back()
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack()
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null
    let newValueStr = this.dataAsString()
    if (this.originalValueStr != newValueStr) {
      this.nextCallBack = next
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    } else {
      next()
    }
  },
  mounted() {
    //load user categories when a vcard visits the page
    if( this.$store.state.user.type == 'V'){
      this.$store.dispatch('loadCategories')
    }
    //load payment types on login
    this.$store.dispatch('loadPaymentTypes')
  }
}
</script>

<style scoped>

</style>