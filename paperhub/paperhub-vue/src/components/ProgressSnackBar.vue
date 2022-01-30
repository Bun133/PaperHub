<template>
  <div>
    <v-snackbar v-model="isShown" :timeout="-1">
      <slot name="message">
      </slot>
      <v-progress-linear :value="progress" :indeterminate="isIndeterminate">
      </v-progress-linear>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "ProgressSnackBar",
  props: {
    isShown: {
      type: Boolean,
      default: false
    },
    progress: {
      type: Number,
      default: 0
    },
    isIndeterminate: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>