<template>
  <form
      class="row g-3 needs-validation"
      novalidate
      @submit.prevent="save"
  >
    <h3 class="mt-5 mb-3">{{ categoryName }}</h3>

    <div class="mb-3">
      <label
          for="inputName"
          class="form-label"
      >Name</label>
      <input
          type="text"
          class="form-control"
          id="inputName"
          placeholder="Category Name"
          required
          v-model="editingCategory.name">
      <field-error-message
          :errors="errors"
          fieldName="name"
      ></field-error-message>
    </div>

    <div class="d-flex flex-wrap justify-content-between">

      <div class="mb-3 ms-xs-3 flex-grow-1">
        <label
            for="inputCategory"
            class="form-label"
        >Type</label>
        <select
            class="form-select"
            id="inputCategory"
            v-model="editingCategory.type">
          <option :value="null"></option>
          <option value="C">Credit</option>
          <option value="D">Debit</option>
        </select>
        <field-error-message
            :errors="errors"
            fieldName="type"
        ></field-error-message>
      </div>
    </div>

    <div class="mb-3 d-flex justify-content-end">
      <button
          type="button"
          class="btn btn-primary px-5"
          @click="save"
      >Save
      </button>
      <button
          type="button"
          class="btn btn-light px-5"
          @click="cancel"
      >Cancel
      </button>
    </div>

  </form>
</template>

<script>
export default {
  name: 'CategoryDetail',
  components: {},
  props: {
    category: {
      type: Object,
      required: true
    },
    operationType: {
      type: String,
      default: 'insert'  // insert / update
    },
    errors: {
      type: Object,
      default: null,
    },
  },
  emits: [
    'save',
    'cancel'
  ],
  data() {
    return {
      editingCategory: this.category
    }
  },
  watch: {
    category(newCategory) {
      console.log(newCategory)
      this.editingCategory = newCategory
    }
  },
  computed: {
    categoryName() {
      if (!this.editingCategory) {
        return ''
      }
      return this.operationType == 'insert' ? 'New Category' : 'Category #' + this.editingCategory.name
    }
  },
  methods: {
    save() {
      this.$emit('save', this.editingCategory)
    },
    cancel() {
      this.$emit('cancel', this.editingCategory)
    },
  }
}
</script>

<style scoped>
.total_price {
  width: 26rem;
}

.checkBilled {
  margin-top: 0.4rem;
  min-height: 2.375rem;
}
</style>
