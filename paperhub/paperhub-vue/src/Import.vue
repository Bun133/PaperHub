<template>
  <v-app>
    <HangBar/>
    <v-main>
      <v-container>
        <h1>Import Server</h1>
        <folder-input v-model="folder"></folder-input>
        {{ folder }}
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HangBar from "@/components/HangBar";
import FolderInput from "@/components/FolderInput";

export default {
  name: "import",
  components: {FolderInput, HangBar},
  data() {
    return {
      folder: ""
    }
  }
}
</script>

<style scoped>

</style>