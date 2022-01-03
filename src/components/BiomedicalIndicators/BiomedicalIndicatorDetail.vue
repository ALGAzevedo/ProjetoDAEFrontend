<template>
  <div class="row">
    <div class="col-12 col-lg-10">
      <h3 class="mt-5 mb-3">{{ userTitle }}</h3>
      <form class="row g-3 needs-validation" @submit.prevent="save">
        <div class="form-group col-12 col-md-6">
          <label for="fUserName" class="form-label">Name</label>
          <input type="text" class="form-control" name="name" id="fUserName" placeholder="Nome"
                 required v-model="editingBiomedical.name"
                 :disabled="operation === 'update' ? '' : disabled">
          <field-error-message :errors="errorsMsg" fieldName="name"></field-error-message>
        </div>
        <div class="form-group col-12 col-md-7">
          <span class="form-label d-block mb-2 ">Pick ... </span>
          <div class="form-check-inline">
            <input type="radio" class="btn-check" name="options" v-model="editingBiomedical.newType" id="option1" autocomplete="off"
                   value="QUALITATIVE">
            <label class="btn btn-outline-primary" for="option1">Qualitative</label>

          </div>
          <div class="form-check-inline">
            <input type="radio" class="btn-check" name="options" v-model="editingBiomedical.newType" id="option2" autocomplete="off"
                   value="QUANTITATIVE">
            <label class="btn btn-outline-primary" for="option2">Quantitative</label>

          </div>
          <field-error-message :errors="errorsMsg" fieldName="indicatorType"></field-error-message>
        </div>



        <div class="row px-0 mx-0 mt-3" v-if="editingBiomedical.newType === 'QUANTITATIVE'">

          <div class="col-12 col-md-4">
            <label for="inputMin" class="form-label">Min</label>
            <input type="text" class="form-control" id="inputMin" v-model="editingBiomedical.min">
            <field-error-message :errors="errorsMsg" fieldName="min"></field-error-message>
          </div>


          <div class="col-12 col-md-4">
            <label for="inputMax" class="form-label">Max</label>
            <input type="text" class="form-control" id="inputMax" v-model="editingBiomedical.max">
            <field-error-message :errors="errorsMsg" fieldName="max"></field-error-message>
          </div>

          <div class="col-12 col-md-2">
            <label for="inputUnity" class="form-label">Unity</label>
            <input type="text" class="form-control" id="inputUnity" v-model="editingBiomedical.unity">
            <field-error-message :errors="errorsMsg" fieldName="unity"></field-error-message>
          </div>

        </div>

        <div class="row px-0 mx-0 mt-3" v-if="editingBiomedical.newType === 'QUALITATIVE'">
          <div class="col-12">
            <div class="col-12 col-lg-3 mt-3">
              <button type="button" class="btn btn-xs btn-dark btn-block" @click="AddField">
                <i class="bi bi-xs bi-plus-circle"></i> Add new field
              </button>
              <field-error-message :errors="errorsMsg" fieldName="quantiFields"></field-error-message>
            </div>

          </div>

            <div class="col-12 col-md-4" v-for="(field, key) in quantiFields" :key="key">
              <label for="inputAlta" class="form-label">Value</label>
              <input type="text" v-model="field.name" placeholder="Add a value" class="form-control" id="inputAlta">
              <button type="button" class="btn btn-sm btn-danger btn-block mt-2" @click="RemoveField(key)">
                <i class="bi bi-trash"></i>
                Remove
              </button>
            </div>
          </div>



          <div class="col-12">
            <hr>
          </div>

          <div class="d-flex mt-3 flex-wrap">
            <div class="p-2">
              <button
                  type="button"
                  class="btn btn-primary px-5"
                  @click="save"
              >Save
              </button>
            </div>
            <div class="p-2">
              <button
                  type="button"
                  class="btn btn-light px-5"
                  @click="cancel"
              >Cancel
              </button>
            </div>
          </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  name: 'BiomedicalIndicatorDetail',
  props: {
    biomedical: {
      type: Object,
      required: true
    },
    errors: {
      type: Array,
      default: () => [],
    },
    operation : {
      type : String
    }
  },
  emits: [
    'save',
    'cancel',
  ],
  data() {
    return {
      editingBiomedical: this.biomedical,
      selected: false,
      quantiFields: [],
      errorsMsg : this.errors,
    }
  },
  watch: {
    biomedical(newBiomedical) {
      //console.log("aqui")
      //console.log(newBiomedical)
      this.editingBiomedical = newBiomedical
      this.editingBiomedical.newType = newBiomedical.indicatorType
      this.FillFields()
    },
    errors(newErr) {
      this.errorsMsg = newErr
    }
  },
  computed : {
    userTitle() {
        return this.biomedical.name || 'New Indicator'
    }
  },

  methods: {
    verifyFields() {
      this.errorsMsg = []
      let flag = true

      if(!this.editingBiomedical.name || this.editingBiomedical.name.trim().length == 0) {
        this.errorsMsg['name']='name cant be null'
        flag = false
      }


      if(!this.editingBiomedical.newType || this.editingBiomedical.newType.trim().length == 0) {
        this.errorsMsg['indicatorType']='indicatorType cant be null'
        flag = false
      }


      if(this.editingBiomedical.newType && this.editingBiomedical.newType == "QUANTITATIVE") {
        if(!this.editingBiomedical.min || this.editingBiomedical.min.trim().length == 0) {
          this.errorsMsg['min']='min cant be null'
          flag = false
        }

        if(!this.editingBiomedical.max || this.editingBiomedical.max.trim().length == 0) {
          this.errorsMsg['max']='max cant be null'
          flag = false
        }

        if(!this.editingBiomedical.unity || this.editingBiomedical.unity.trim().length == 0) {
          this.errorsMsg['unity']='unity cant be null'
          flag = false
        }

      }
      return flag


    },


    FillFields() {
      if(!this.editingBiomedical.possibleValues)
        return
      this.editingBiomedical.possibleValues.forEach(v => this.quantiFields.push({name: v,}))

    },
    CleanEmptyFieldsFromArray() {
      this.quantiFields = this.quantiFields.filter(v => v.name!='')
      this.quantiFields = this.quantiFields.map(v => v.name);
    },
    AddField: function (e) {
      this.quantiFields.push({name: '',})
      e.preventDefault()
    },

    RemoveField: function (key) {
      this.quantiFields.splice(key, 1);
    },
    save() {

      if(this.verifyFields()) {
        this.CleanEmptyFieldsFromArray()
        this.editingBiomedical.possibleValues = Object.values(this.quantiFields)
        this.$emit('save', this.editingBiomedical)
      }

    },
    cancel() {
      this.$emit('cancel', this.editingBiomedical)
    }
  },
}
</script>

<style scoped>

</style>
