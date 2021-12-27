<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <AdministratorDetail
      :admin="admin"
      :errors="errors"
      :countries="country"
      :maritalStatus="maritalStatus"
      :genders="gender"
      :operationType="operation"
      @save="save"
      @cancel="cancel"
  ></AdministratorDetail>
</template>

<script>


import AdministratorDetail from "./AdministratorDetail";

export default {
  name: 'Administrator',
  components: {
    AdministratorDetail
  },
  props: {
    usernameIn: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      admin: this.newAdmin(),
      errors: null,
      country: [],
      maritalStatus: [],
      gender: [],

    }
  },
  computed: {
    operation() {
      return (!this.usernameIn) ? 'insert' : 'update'
    },
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler(newValue) {
        this.loadAdmin(newValue)
      }
    },
  },
  methods: {
    splitErrormessage(msg) {

      var erros = msg.split(';');

      var errosTransformed = [[], []];
      for (var erro of erros) {
        var temp = erro.split(':');
        if (temp != undefined && temp.length == 2) {
          var key = temp[0].trim()
          var val = temp[1].trim()
          errosTransformed[key] = val
        }

      }
      this.errors = errosTransformed
    },

    dataAsString() {
      return JSON.stringify(this.admin)
    },
    newAdmin() {
      return {
        username : ''
      }

    },
    loadAdmin (username) {
      console.log(username)
      this.errors = null
      if (!username) {
        this.admin = this.newAdmin()
        this.originalValueStr = this.dataAsString()
      } else {
        this.$axios.get('administrators/' + username)
            .then((response) => {
              //we need to take type of dto of admin data
              this.admin = response.data
              if(this.admin.type)
                delete this.admin.type

              this.originalValueStr = this.dataAsString()
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },
    loadDemographicData() {
      this.$axios.get('demographicdata')
          .then((response) => {
            this.country = response.data[0]
            this.maritalStatus = response.data[1]
            this.gender = response.data[2]
          })
          .catch((error) => {
            console.log(error)
          })

    },

    save() {
      this.errors = null
      if (this.operation == 'insert') {

        this.$axios.post('administrators', this.admin)
            .then((response) => {
              this.admin = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('Admin was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
                //this.errors = error.response.data
              } else {
                this.$toast.error('Admin was not created due to unknown server error!')
              }
            })
      } else {
        console.log(this.admin)
        this.$axios.put('administrators/' + this.admin.username, this.admin)
            .then((response) => {
              this.$toast.success('Admin "' + response.data.name + '" was updated successfully.')
              let jsonToSend = {}
              jsonToSend.id = this.admin.id
              jsonToSend.type = "update"
              jsonToSend.value = -1
              jsonToSend.name = this.admin.name
              this.admin = response.data
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.error('Admin #' + this.id + ' was not updated due to validation errors!')
                this.errors = error.response.data
              } else {
                this.$toast.error('Admin #' + this.id + ' was not updated due to unknown server error!')
              }
            })
      }
    },
    cancel() {
      this.$router.back()
    },
    leaveConfirmed() {
      if (this.nextCallBack) {
        this.nextCallBack()
      }
    }
  },
  mounted() {
    this.loadDemographicData()
    this.loadAdmin(this.usernameIn)
  },

  beforeRouteLeave(to, from, next) {
    this.nextCallBack = null
    let newValueStr = this.dataAsString()
    if (this.operation == 'update' && this.originalValueStr != newValueStr
    ) {
      this.nextCallBack = next
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    } else {
      next()
    }
  }
}
</script>
