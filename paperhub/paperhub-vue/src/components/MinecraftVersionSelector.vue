<template>
  <div>
    <v-autocomplete :items="versions"
                    :loading="isVersionLoading"
                    item-text="id"
                    label="Minecraft Version"
                    v-model="autoCompleteVersion"
                    @change="emitEvent"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-title>
            No Minecraft Version Found
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
export default {
  name: "MinecraftVersionSelector",
  model: {
    prop: "selectedVersion",
    event: "onVersionSelect"
  },
  props: {
    selectedVersion: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      versions: [],
      isVersionLoading: false,
      autoCompleteVersion: null
    }
  },
  methods: {
    emitEvent() {
      if (this.autoCompleteVersion) {
        this.selectedVersion = this.autoCompleteVersion
        this.$emit('onVersionSelect', this.autoCompleteVersion);
      }
    }
  },
  created() {
    this.isVersionLoading = true;
    fetch("https://launchermeta.mojang.com/mc/game/version_manifest.json")
        .then(res => res.json())
        .then(json => {
          this.versions = json.versions;
          this.isVersionLoading = false;
        });
  },
  watch: {
    selectedVersion(newVersion) {
      this.autoCompleteVersion = newVersion;
    }
  }
}
</script>

<style scoped>

</style>