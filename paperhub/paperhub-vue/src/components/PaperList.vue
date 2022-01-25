<template>
  <div id="all">
    <div v-if="this.$props.papers !== undefined">
      <div v-for="(entry,index) in this.$props.papers" :key="index">
        <PaperCard :entry="entry"></PaperCard>
      </div>
    </div>
    <div v-else>
      <div class="text-center">
        <h3>No papers found</h3>
      </div>
    </div>
  </div>
</template>

<script>
import PaperCard from "@/components/PaperCard";

export default {
  name: "PaperList",
  components: {PaperCard},
  props: {
    papers: [Array, undefined]
  },
}
</script>

<style scoped>

</style>