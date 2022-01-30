<template>
  <v-app>
    <HangBar/>
    <v-main>
      <v-container>
        <h1>Import Server</h1>
        <v-file-input webkitdirectory v-model="folder"></v-file-input>
        {{ folder }}
      </v-container>
    </v-main>
  </v-app>
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