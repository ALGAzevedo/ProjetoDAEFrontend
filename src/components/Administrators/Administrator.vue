<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <UsersDetail
      :user="admin"
      :errors="errors"
      :countries="country"
      :maritalStatus="maritalStatus"
      :genders="gender"
      :operationType="operation"
      :show-institutional-phone-number="false"
      :show-institutional-email="false"
      @save="save"
      @cancel="cancel"
  ></UsersDetail>
</template>

<script>



import UsersDetail from "../UsersCommon/UsersDetail";

export default {
  name: 'Administrator',
  components: {
    UsersDetail
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
    // Used this watcher instead to update the username
    username: {
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
              }
              else if (error.response.status == 4009) {
                this.$toast.error('Admin already exists!')
                this.splitErrormessage(error.response.data)
                //this.errors = error.response.data
              }else {
                this.$toast.error('Admin was not created due to server error!')
                this.splitErrormessage(error.response.data)
              }
            })
      } else {
        console.log(this.admin)
        this.$axios.put('administrators/' + this.admin.username, this.admin)
            .then((response) => {
              this.$toast.success('Admin "' + response.data.name + '" was updated successfully.')
              this.admin = response.data
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.error('Admin #' + this.username + ' was not updated due to validation errors!')
                this.errors = error.response.data
              } else {
                this.$toast.error('Admin #' + this.username + ' was not updated due to unknown server error!')
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
