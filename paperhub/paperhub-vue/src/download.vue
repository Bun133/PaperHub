<template>
  <div>
    <HangBar/>
    <v-main>
      <h1>Download Server File</h1>
      <h2>Output Directory:<v-file-input webkitdirectory></v-file-input></h2>
    </v-main>
  </div>
</template>

<script>
import HangBar from "@/components/HangBar";

export default {
  name: "download",
  components: {HangBar}
}
</script>

<style scoped>

</style>