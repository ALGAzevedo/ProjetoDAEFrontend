<template>
  <div class="d-flex justify-content-between">
    <div class="mx-2">
      <h3 class="mt-4">Categories</h3>
    </div>
    <div class="mx-2 total-filtro">
      <h5 v-if="totalCategories"  class="mt-4">Total: {{ totalCategories }}</h5>
    </div>
  </div>
  <hr>

  <div class="mb-3 d-flex justify-content-between flex-wrap">
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label
          for="filterName"
          class="form-label"
      >Filter by name:</label>
      <input @input="filterName($event)" :value="keywords" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Search For name">
    </div>
    <div class="mx-2 mt-2 flex-grow-1 filter-div">
      <label
          for="selectType"
          class="form-label"
      >Filter by type:</label>
      <select
          class="form-select"
          id="selectType"
          @change="filter($event)"
          v-model="type"
      >
        <option :value="null"></option>
        <option value="C">Credit</option>
        <option value="D">Debit</option>

      </select>
    </div>

    <div class="mx-2 mt-2">
      <button
          type="button"
          class="btn btn-success px-4 btn-addprj"
          @click="addCategory"
      ><i class="bi bi-xs bi-plus-circle"></i>&nbsp; Add Category</button>
    </div>
  </div>

</template>

<script>
export default {
  name: "categoryFilterBody",
  data() {
    return {
      keywords: '',
      type: 'C',
    }
  },
  props: {
    modelType : {
      String,
      default : 'C',
    },
    modelName : {
      String,
      default : '',
    },
    totalCategories: {
      totalCategories: Number,
    },
  },
  emits: [
    'update:modelType',
    'update:modelName',
    'add',
  ],
  methods: {
    addCategory () {
      this.$emit('add')
    },
    filter(event) {

      this.$emit("update:modelType", event.target.value)
    },
    filterName(event) {
      const value = event.target.value
      this.keywords = value
      this.$emit("update:modelName", event.target.value)
    }
  },

}
</script>

<style scoped>
.filter-div {
  min-width: 12rem;
}
.total-filtro {
  margin-top: 0.35rem;
}
.btn-addprj {
  margin-top: 1.85rem;
}
</style>