<template>
  <div>
    <form >
      <div class="form-group">
        <label for="exampleInputPhone">Phone</label>
        <input v-model="askForMoneyMsg.phone" type="number" class="form-control" id="exampleInputPhone" placeholder="Phone Number">
      </div>
      <div class="form-group">
        <label for="exampleInputAmount">Amount to ask for</label>
        <input v-model="askForMoneyMsg.amount" type="number" class="form-control" id="exampleInputAmount" placeholder="0.00€">
      </div>
      <div class="form-group">
        <label for="exampleInputMsg">Message</label>
        <input v-model="askForMoneyMsg.msg" type="text" class="form-control" id="exampleInputMsg" placeholder="optional message">
      </div>
      <button
          type="button"
          class="btn btn-primary px-5"
          @click="save"
      >Send
      </button>
      <button
          type="button"
          class="btn btn-light px-5"
          @click="reset"
      >Reset
      </button>
      <button
          type="button"
          class="btn btn-light px-5"
          @click="$router.go(-1)"
      >Cancel
      </button>
    </form>

  </div>


</template>

<script>
export default {
  name: 'RequestMoney',
  data() {
    return {
      askForMoneyMsg: {
        phone: '',
        amount: '',
        msg: '',
        source_phone: this.getUser().id,
      }
    }
  },
  methods: {
    getUser() {
      return this.$store.state.user
    },
    save() {
      this.$socket.emit('askForMoney',this.askForMoneyMsg)
      this.$toast.info('Money Request sent sucessfuly')
      this.$router.go(-1)

    },
    reset() {
      // Reset our form values
      this.askForMoneyMsg.phone = ''
      this.askForMoneyMsg.amount = ''
      this.askForMoneyMsg.msg = ''
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>