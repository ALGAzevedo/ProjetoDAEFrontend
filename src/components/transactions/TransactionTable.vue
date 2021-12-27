<template>
  <table class="table">
    <thead>
    <tr>
      <th
          v-if="showId"
          class="align-middle"
      >#
      </th>
      <th
          v-if="showDate"
          class="align-middle"
      >Date
      </th>
      <th
          v-if="showCategory"
          class="align-middle"
      >Category
      </th>
      <th
          v-if="showTransactionType"
          class="align-middle"
      >Transaction Type
      </th>
      <th
          v-if="showValue"
          class="align-middle"
      >Value
      </th>
      <th
          v-if="showPaymentType"
          class="align-middle"
      >Payment Type
      </th>
      <th
          v-if="showReference"
          class="align-middle"
      >Payment Reference
      </th>
    </tr>
    </thead>

    <tbody>
    <tr
        v-for="transaction in transactions"
        :key="transaction.id"
    >
      <td
          v-if="showId"
          class="align-middle"
      >{{ transaction.id }}
      </td>
      <td
          v-if="showDate"
          class="align-middle"
      >{{ transaction.datetime }}
      </td>
      <td
        v-if="showCategory"
        class="align-middle"
      >{{transaction.category}}</td>
      <td
          v-if="showTransactionType"
          class="align-middle"
      >{{ transaction.type == 'D' ? 'Debit' : 'Credit'}}
      </td>
      <td
          v-if="showValue"
          class="align-middle"
      >{{ transaction.value }}
      </td>
      <td
          v-if="showPaymentType"
          class="align-middle"
      >{{ transaction.payment_type }}
      </td>
      <td
          v-if="showReference"
          class="align-middle"
      >{{ transaction.payment_reference }}
      </td>
      <td
          class="text-end align-middle"
          v-if="showEditButton"
      >
        <div class="d-flex justify-content-end">
          <button
              class="btn btn-xs btn-light"
              @click="editClick(transaction)"
              v-if="showEditButton"
          ><i class="bi bi-xs bi-pencil"></i>
          </button>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TransactionTable",
  props: {
    transactions: {
      type: Array,
      default: () => [],
    },
    showId: {
      type: Boolean,
      default: true,
    },
    showDate: {
      type: Boolean,
      default: true,
    },
    showTransactionType: {
      type: Boolean,
      default: true,
    },
    showValue: {
      type: Boolean,
      default: true,
    },
    showPaymentType: {
      type: Boolean,
      default: true,
    },
    showReference: {
      type: Boolean,
      default: true,
    },
    showCategory: {
      type: Boolean,
      default: true,
    },
    showEditButton: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'edit',
  ],
  methods: {
    editClick(transaction){
      //console.log(transaction)
      this.$emit('edit',transaction.id)
    }
  }
}
</script>

<style scoped>

</style>