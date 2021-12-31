<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <BiomedicalIndicatorDetail
      :biomedical="bIndicator"
      :errors="errors"
      @save="save"
      @cancel="cancel"
  ></BiomedicalIndicatorDetail>
</template>

<script>




import BiomedicalIndicatorDetail from "./BiomedicalIndicatorDetail";

export default {
  name: 'BiomedicalIndicator',
  components: {
    BiomedicalIndicatorDetail
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    indicatorType : {
      type : String,
      default: ''
    }

  },
  data() {
    return {
      bIndicator: this.newBIndicator(),
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
    // Used this watcher instead to update the username
    id: {
      immediate: true,
      handler(newValue) {
        this.loadBIndicator(newValue)
      }
    },
  },
  methods: {
    splitErrormessage(msg) {
      if(!msg)
        return
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
      return JSON.stringify(this.bIndicator)
    },
    newBIndicator() {
      return {
        id : null,
        name : ''
      }

    },
    loadBIndicator (id) {
      this.errors = null
      if (!id) {
        this.admin = this.newBIndicator()
        this.originalValueStr = this.dataAsString()
      } else {
        let url = ''
        if(this.indicatorType === 'QUALITATIVE')
          url = "biomedicalindicators/qualitative"
        else
          url = "biomedicalindicators/quantitative"
        this.$axios.get(url + "/" + id)
            .then((response) => {
              //we need to take type of dto of admin data
              this.bIndicator = response.data
              this.bIndicator.indicatorType = this.indicatorType
              if(this.bIndicator.type)
                delete this.bIndicator.type

              this.originalValueStr = this.dataAsString()
            })
            .catch((error) => {
              console.log(error)
            })
      }
    },

    save() {
      console.log(this.bIndicator)
      this.errors = null
      if (this.operation == 'insert') {
        let url = "biomedicalindicators/"+ this.bIndicator.newType.toLowerCase()
        this.$axios.post(url, this.bIndicator)
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
                this.$toast.error('Admin was not created due to a server error!')
                this.splitErrormessage(error.response.data)
              }
            })
      } else {
        let url =''
        //indicatortype == newType? ->Simple update
        if(!this.bIndicator.newType || this.bIndicator.newType == this.bIndicator.indicatorType)
          url = "biomedicalindicators/"+ this.bIndicator.indicatorType.toLowerCase()

        else
          //indicatorType != typr ->change in type
          url = "biomedicalindicators"


        this.$axios.put(url + "/" + this.bIndicator.id, this.bIndicator)
            .then((response) => {
              this.$toast.success('Indicator "' + response.data.name + '" was updated successfully.')
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
    this.loadBIndicator(this.usernameIn)
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
