<template>
  <div>
    <HangBar/>
    <v-main>
      <h1>Import Server</h1>
      <v-file-input webkitdirectory v-model="folder"></v-file-input>
      {{ folder }}
    </v-main>
  </div>
</template>

<script>
import HangBar from "@/components/HangBar";

export default {
  name: "import",
  components: {HangBar},
  data() {
    return {
      folder: ""
    }
  }
}
</script>

<style scoped>

</style>