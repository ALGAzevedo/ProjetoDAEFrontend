<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <custom-confirmation-dialog
      ref="deleteConfirmationDialog"
      confirmationBtn="Delete vcard and logout"
      msg="Do you really want to delete your vcard?"
      passwordMsg="Password"
      confCodeMsg="Confirmation code"
      @confirmed="deleteConfirmed"
      :vcardCreds="vcardCreds"
  >
  </custom-confirmation-dialog>

  <vcard-detail
      :vcard="vcard"
      :operationType="operation"
      :errors="errors"
      @save="save"
      @cancel="cancel"
      @deleteConfirmed="deleteVCard"
  ></vcard-detail>
</template>

<script>
import VcardDetail from "./VcardDetail";

export default {
  name: 'Vcard',
  components: {
    VcardDetail
  },
  props: {
    phoneNumber: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      vcard: this.newVCard(),
      vcardCreds: this.newVcardCreds(),
      errors: null,
    }
  },
  computed: {
    operation() {
      //update -> admin updating vcard
      //insert -> register vcard
      //ownerUpdate -> vcard update his own vcard
      console.log((!this.phoneNumber || this.phoneNumber == '') ? 'insert' : (this.userType === 'V' ? 'ownerUpdate' : 'update'))
      return (!this.phoneNumber || this.phoneNumber == '') ? 'insert' : (this.userType === 'V' ? 'ownerUpdate' : 'update')
    },
    userType() {
      return this.$store.state.user ? this.$store.state.user.type : 'None'
    },
  },
  watch: {
    phoneNumber: {
      immediate: true,
      handler(newValue) {
        this.loadVCard(newValue)
      }
    },
  },
  methods: {
    dataAsString() {
      return JSON.stringify(this.vcard)
    },
    newVCard() {
      return {
        phoneNumber: null,
        name: '',
        email: '',
        photoUrl: '',
        photoFile: null,
        password: '',
        password_confirm: '',
        confirmation_code: '',
        confirmation_code_confirm: '',
        blocked: 0,
        balance: 0.00,
        max_debit: 5000.00,
      }
    },
    newVcardCreds() {
      return {
        password: '',
        confirmation_code: ''
      }
    },
    loadVCard(phoneNumber) {
      if (!phoneNumber || phoneNumber == '') {
        this.vcard = this.newVCard()
        this.originalValueStr = this.dataAsString()
      } else {
        this.$axios.get('vcards/' + phoneNumber)
            .then((response) => {
              this.vcard = response.data.data
              this.originalValueStr = this.dataAsString()
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    save() {
      this.errors = null
      if (this.operation == 'insert') {

        let formData = new FormData();
        formData.append("name", this.vcard.name);
        formData.append("email", this.vcard.email);
        formData.append("password", this.vcard.password);
        formData.append("password_confirm", this.vcard.password_confirm);
        formData.append("confirmation_code", this.vcard.confirmation_code);
        formData.append("confirmation_code_confirm", this.vcard.confirmation_code_confirm);
        if (this.vcard.photoFile != null) {
          formData.append("photoUrl", this.vcard.photoFile);
        }
        formData.append("phoneNumber", this.vcard.phoneNumber);

        this.$axios.post('vcards', formData)
            .then((response) => {
              console.log(response.data.data)
              this.$toast.success('Vcard #' + response.data.data.phone_number + ' was created successfully.')
              this.vcard = response.data.data
              this.$router.push({name: 'Login'})
            })
            .catch((error) => {
              this.errors = error.response.data.errors
              console.log(this.errors)
              this.$toast.error('Vcard was not created due to unknown server error!')
            })
      } else if (this.operation == 'ownerUpdate') {
        //this block is executed when the vcard edits its own profile
        //console.log("olaaaaaaaa")
        //console.log(this.vcard)
        let formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append("name", this.vcard.name)
        formData.append("email", this.vcard.email)
        //for some reason FormData isn't sending the name + email params when a photo isn't selected, so we will send a regular json when the photo doesn't change
        console.log(this.vcard.photoFile)
        if (this.vcard.photoFile != null) {
          console.log("with photo")
          formData.append("photoUrl", this.vcard.photoFile)
        }
        this.$axios.post('vcards/' + this.phoneNumber, formData)
            .then((response) => {
              console.log(response.data.data)
              this.$toast.success('Your vcard was successfully updated.')
              this.vcard = response.data.data
              //update the stored vcard
              this.$store.dispatch('refresh')
            })
            .catch((error) => {
              this.errors = error.response.data.errors
              console.log(this.errors)
              this.$toast.error('Vcard was not updated due to unknown server error!')
            })
      } else {
        //admin updates a vcard
        this.$axios.patch('admin/vcards/' + this.phoneNumber, {
          blocked: this.vcard.blocked,
          max_debit: this.vcard.max_debit
        })
            .then((response) => {
              console.log(this.vcard)
              this.$toast.success('Vcard #' + response.data.data.phone_number + ' was updated successfully.')
              //send notification
              let jsonToSend = {}
              jsonToSend.id = this.phoneNumber
              jsonToSend.type = "maxDebit"
              jsonToSend.value = this.vcard.max_debit
              this.$socket.emit('editVcard', jsonToSend)

              this.vcard = response.data.data
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              this.errors = error.response.data.errors
              this.$toast.error('Vcard #' + this.phoneNumber + ' was not updated due to unknown server error!')
            })
      }
    },
    deleteConfirmed() {
      console.log(this.vcardCreds)
      this.$axios.delete('vcards/' + this.vcard.phone_number, {
        data: {
          password: this.vcardCreds.password,
          validation_code: this.vcardCreds.confirmation_code
        }
      })
          .then(() => {
            this.$toast.success('Your vcard was deleted successfully.')
            //logout after deleting the vcard
            this.$router.push({name: 'Home'})
            this.nextCallBack = this.$store.dispatch('logout', true)
          })
          .catch((error) => {
            if (error.response.status == 422) {
              this.$toast.error(error.response.data.message)
            }
          })
    },
    deleteVCard() {
      let dlg = this.$refs.deleteConfirmationDialog
      console.log("oi")
      dlg.show()
    },
    cancel() {
      this.$router.back()
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack()
      }
    },
  },
  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null
    let newValueStr = this.dataAsString()
    if (this.operation == 'update' && this.originalValueStr != newValueStr) {
      this.nextCallBack = next
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    } else {
      next()
    }
  },
  mounted() {

  }
}
</script>
