<template>
  <div class="row">
    <div class="col-12 col-lg-10">
      <h3 class="mt-5 mb-3">{{ userTitle }}</h3>
      <form class="row g-3 needs-validation" @submit.prevent="save">

        <div class="form-group col-12 col-md-6">
          <label for="fUserName" class="form-label">Nome</label>
          <input type="text" class="form-control" name="name" id="fUserName" placeholder="Nome"
                 required >
          <field-error-message :errors="errors" fieldName="name"></field-error-message>
        </div>
        <div class="form-group col-12 col-md-7">
          <span class="form-label d-block mb-2 ">Pick ... </span>
        <div class="form-check-inline">
          <input type="radio" class="btn-check" name="options" v-model="selected" id="option1" autocomplete="off"  value="A">
          <label class="btn btn-outline-primary" for="option1">Qualitative</label>

        </div>
        <div class="form-check-inline">
          <input type="radio" class="btn-check" name="options" v-model="selected"  id="option2" autocomplete="off"  value="B">
          <label class="btn btn-outline-primary" for="option2">Quantitative</label>

        </div>
        </div>
        <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>


        <div class="row px-0 mx-0 mt-3" v-if="selected === 'A'">

          <div class="col-12 col-md-4">
            <label for="inputMin" class="form-label">Min</label>
            <input type="text" class="form-control" id="inputMin">
          </div>
          <div class="col-12 col-md-4">
            <label for="inputMax" class="form-label">Max</label>
            <input type="text" class="form-control" id="inputMax">
          </div>

          <div class="col-12 col-md-2">
            <label for="inputUnity" class="form-label">Unity</label>
            <input type="text" class="form-control" id="inputUnity">
          </div>

        </div>

        <div class="row px-0 mx-0 mt-3" v-if="selected === 'B'">

          <div class="col-12 col-md-4"  v-for="(field, key) in quantiFields" :key="key">
            <label for="inputAlta" class="form-label">Alta</label>
            <input type="text" v-model="field.name"  placeholder="Add a value" class="form-control" id="inputAlta">
            <button type="button" class="btn btn-sm btn-danger btn-block mt-2" @click="RemoveField(field)">
              <i class="bi bi-trash"></i>
             Remove
            </button>
          </div>

          <div class="col-12">
            <div class="col-12 col-lg-3 mt-3">
          <button type="button" class="btn btn-xs btn-dark btn-block" @click="AddField">
            <i class="bi bi-xs bi-plus-circle"></i> Add new field
          </button>
              </div>
          </div>

        </div>



        <div class="col-12"><hr></div>

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
  components: {},
  props: {
    biomedical: {
      type: Object,
      required: false
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
      quantiFields: [{ name: ''}],
    }
  },
  watch: {
    user(newBiomedical) {
      this.editingBiomedical = newBiomedical
    }
  },
  methods: {
    AddField: function (e) {
      this.quantiFields.push({ name: '',}); //Aqyui falta pegar o valor do imput
      e.preventDefault()
    },

    RemoveField: function (event) {
      this.quantiFields.splice(event); // Está mal, apaga tudo :(
    },
    save() {
      console.log(' save()')
      //this.$emit('save', this.editingUser)
    },
    cancel() {
      console.log('cancel()')
      //this.$emit('cancel', this.editingUser)
    }
  }
}
</script>

<style scoped>

</style>
