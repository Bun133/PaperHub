<template>
  <div>
    <v-autocomplete :items="versions"
                    :loading="isVersionLoading"
                    item-text="id"
                    label="Minecraft Version"
                    v-model="selectedVersion"
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
  model:{
    prop: "selectedVersion",
    event: "onVersionSelect"
  },
  data() {
    return {
      versions: [],
      isVersionLoading: false,
      selectedVersion: null,
    }
  },
  methods: {
    emitEvent() {
      if (this.selectedVersion) {
        this.$emit('onVersionSelect', this.selectedVersion);
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
  }
}
</script>

<style scoped>

</style>