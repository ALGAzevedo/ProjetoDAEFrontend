<template>
  <table class="table">
    <thead>

    <tr>
      <th>Filename</th>
      <th>Uploaded At</th>
      <th></th>
    </tr>
    </thead>
    <tbody>


    <tr


        v-for="doc in documents"
        :key="doc.id"
    >
      <td>{{doc.filename}}</td>
      <td>{{doc.date}}</td>

      <td
          class="text-end"
      >
        <div class="d-flex justify-content-end">
          <button
              class="btn btn-xs btn-light"
              @click="downloadClick(doc)"
          ><i class="bi bi-file-earmark-arrow-down-fill"></i>
          </button>

        </div>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {

  name: "DocumentTable",
  props : {
    username : String,
  },
  data () {
    return {
      documents : []
    }
  },

  methods: {
    downloadClick(doc) {

      this.$axios.get('documents/download/' + doc.id, { responseType:
            'arraybuffer'})
          .then((response => {
            const url = window.URL.createObjectURL(new Blob([response.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', doc.filename)
            document.body.appendChild(link)
            link.click()
          }))


    },
    loadUserDocs() {
      this.$axios.get('documents/' + this.username)
          .then((response) => {
            console.log(response.data)
            this.documents = response.data
          })
          .catch((error) => {
            console.log(error)
          })
    },
  },
  mounted() {
    this.loadUserDocs()
  }
}
</script>

<style scoped>
button {
  margin-left: 3px;
  margin-right: 3px;
}
</style>
