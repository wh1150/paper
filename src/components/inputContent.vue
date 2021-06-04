<template>
  <div>
    <input
      :size="txtSize"
      v-model="txtContent">
  </div>
</template>

<script>
export default {
  name: "inputContent",

  data() {
    return {
      txtContent: this.value
    };
  },
  props: ["txtSize", "value", "onChange"],

  watch:{
    txtContent: function (cont){
      this.onChange(cont);
    }
  }
}
</script>

<style scoped>

</style>