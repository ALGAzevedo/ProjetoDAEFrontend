<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Discard changes and leave"
      msg="Do you really want to leave? You have unsaved changes!"
      @confirmed="leaveConfirmed"
  >
  </confirmation-dialog>
  <TreatmentTypeDetail
      :treatmentTypeCode="treatmentTypeCode"
      :treatmentTypeType="treatmentTypeType"
      :possibleValues="treatmentTypeValues"
      :prcCode="prcCode"
      :errors="errors"
      :operationType="operation"
      @save="save"
      @cancel="cancel"
  ></TreatmentTypeDetail>
</template>

<script>
import TreatmentTypeDetail from "./TreatmentTypeDetail";
export default {
  name: "TreatmentType",
  components: {
    TreatmentTypeDetail
  },
  props: {
    treatmentTypeCode: {
      type: Number,
      default: -1
    },
    treatmentTypeType: {
      type: String,
      default: ''
    },
    prcCode: {
      type: Number,
      default: -1
    },
  },
  data() {
    return {
      // treatmentType: this.newTreatmentType(),
      treatmentTypeValues: [],
      errors: null,
    }
  },
  computed: {
    operation() {
      return (this.treatmentTypeCode === -1) ? 'insert' : 'update'
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
      return JSON.stringify(this.treatmentType)
    },
    loadTreatmentTypeValues(){
      this.$axios.get('behaviours/treatmentTypeValues')
          .then((response) => {
            //we need to take type of dto of admin data
            this.treatmentTypeValues = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
    save(treatment) {
      this.errors = null
      if (this.operation == 'insert') {
        console.log(treatment)
        this.$axios.post(treatment.treatmentType, treatment)
            .then((response) => {
              this.treatmentType = response.data
              this.$router.back()
            })
            .catch((error) => {
              console.log(error.response)
              if (error.response.status == 400) {
                this.$toast.error('Treatment type was not created due to validation errors!')
                this.splitErrormessage(error.response.data)
                //this.errors = error.response.data
              } else {
                this.$toast.error('Treatment type was not created due to unknown server error!')
              }
            })
      } else {
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
    // if (this.operation === 'update') {
    //   this.loadTreatmentType(this.treatmentTypeCode)
    // }
    this.loadTreatmentTypeValues()
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

<style scoped>

</style>