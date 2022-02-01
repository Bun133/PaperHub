<template>
  <v-card elevation="5">
    <v-card-title>
      {{ this.$props.entry['title'] }}
    </v-card-title>

    <v-card-text>
      Minecraft Version: {{ this.$props.entry['minecraftVersion'] }}<br/>
      Paper Version: {{ this.$props.entry['paperVersion'] }}
    </v-card-text>

    <v-card-actions>
      <v-btn color="primary" @click="onClick()">
        Launch!
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "PaperCard",
  props: {
    entry: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick() {
    }
  }
}
</script>

<style scoped>

</style>