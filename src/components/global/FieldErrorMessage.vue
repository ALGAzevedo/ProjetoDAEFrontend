<template>
  <div
    v-if="errors ? errors[fieldName] : false"
    class="validation-error"
  >
    {{ errors[fieldName] || '' }}
  </div>
</template>

<script>
export default {
  name: "FieldErrorMessage",
  props: {
    errors: {
      type: Object,
      default: null,
    },
    fieldName: {
      type: String,
      default: "",
    },
  },
};
</script>

<style scoped>
.validation-error {
  font-size: 0.85rem;
  width: 100%;
  margin-top: 0.25rem;
  color: #dc3545;
}
</style>