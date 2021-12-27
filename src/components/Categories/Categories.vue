<template>
  <confirmation-dialog
      ref="confirmationDialog"
      confirmationBtn="Delete category"
      :msg="`Do you really want to delete the category ${ categoryToDeleteDescription }?`"
      @confirmed="deleteConfirmed"
  >
  </confirmation-dialog>
  <div>
    <CategoryFilterBody
        v-model:modelType="filterByType"
        v-model:modelName="filterByName"
        :totalCategories=totalCategories
        @add="addCategory"

    >
    </CategoryFilterBody>
  </div>

  <CategoriesTable
      :categories=filteredCategories
      :show-id="true"
      :show-name="true"
      :show-type="true"
      @edit="editCategory"
      @delete="deleteCategory">
  </CategoriesTable>


</template>

<script>


import ConfirmationDialog from "../global/ConfirmationDialog";
import CategoriesTable from "./CategoriesTable";
import CategoryFilterBody from "./CategoryFilterBody";

export default {
  name: 'Categories',
  components: {
    ConfirmationDialog,
    CategoriesTable,
    CategoryFilterBody,
  },
  data () {
    return {
      filterByType: 'C',
      filterByName: '',
      categoryToDelete: null
    }
  },
  mounted() {
    this.loadCategories();
  },
  computed: {
    filteredCategories () {
      return this.$store.getters.categoriesFilter(this.filterByType, this.filterByName)
    },
    totalCategories () {
      return this.$store.getters.totalCategoriesFilter(this.filterByType, this.filterByName)
    },

    categoryToDeleteDescription () {
      return this.categoryToDelete
          ? `#${this.categoryToDelete.id} (${this.categoryToDelete.name})`
          : ''
    }

  },
  methods: {
    changeTypeFilter(type) {
      this.type = type
    },
    loadCategories() {
      this.$store.dispatch('loadCategories')
    },
    addCategory () {
      this.$router.push({ name: 'NewCategory' })
    },
    editCategory (category) {
      this.$router.push({ name: 'Category', params: { id: category.id } })
    },
    deleteConfirmed () {
      console.log(this.categoryToDelete)

      this.$store.dispatch('deleteCategory', this.categoryToDelete)
          .catch((error) => {
            console.log(error)
          })
    },
    deleteCategory(category) {
      this.categoryToDelete = category
      let dlg = this.$refs.confirmationDialog
      dlg.show()
    },

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
