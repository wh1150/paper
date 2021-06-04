<template>
  <button
      v-text="name"
      @click="applyFont()"
  ></button>
</template>

<script>
export default {
  props: ["name", "apply_font", "value"],

  methods: {
    applyFont: function() {
      this.apply_font(this.value);
    }
  }

}
</script>

<style scoped>

</style>