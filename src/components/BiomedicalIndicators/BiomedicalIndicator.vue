<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <UsersDetail
      :user="Indicator"
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
  name: 'BiomedicalIndicatorDetail',
  components: {
    UsersDetail
  },
  props: {
    id: {
      type: Number,
      default: -1
    },
    indicatorType: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      Indicator: this.newIndicator(),
      errors: null,
    }
  },
  computed: {
    operation() {
      return (!this.id) ? 'insert' : 'update'
    },
  },
  watch: {
    // beforeRouteUpdate was not fired correctly
    // Used this watcher instead to update the ID
    id: {
      immediate: true,
      handler(newValue) {
        this.loadIndicator(newValue)
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
      return JSON.stringify(this.Indicator)
    },
    newIndicator() {
      return {
        username : ''
      }

    },
    loadIndicator (id) {
      this.errors = null
      if (!id || id < 0) {
        this.Indicator = this.newIndicator()
        this.originalValueStr = this.dataAsString()
      } else {
        let url = ''
        if(this.indicatorType == "QUALITATIVE")
          url = 'biomedicalindicators/qualitative/' + id
        else
          url = 'biomedicalindicators/quantitative/' + id
        this.$axios.get(url)
            .then((response) => {
              //we need to take type of dto of admin data
              this.Indicator = response.data
              if(this.Indicator.type)
                delete this.Indicator.type

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

        this.$axios.post('patients/', this.Indicator)
            .then((response) => {
              this.Indicator = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('Patient was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
                //this.errors = error.response.data
              } else {
                this.$toast.error('Patient was not created due to unknown server error!')
              }
            })
      } else {

        this.$axios.put('patients/' + this.Indicator.username, this.Indicator)
            .then((response) => {
              this.$toast.success('Patient "' + response.data.name + '" was updated successfully.')
              this.Indicator = response.data
              this.originalValueStr = this.dataAsString()
              this.$router.back()
            })
            .catch((error) => {
              if (error.response.status == 400) {
                this.$toast.error('Patient #' + this.username + ' was not updated due to validation errors!')
                this.errors = error.response.data
              } else {
                this.$toast.error('Patient #' + this.username + ' was not updated due to unknown server error!')
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
    this.loadIndicator(this.id)
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
