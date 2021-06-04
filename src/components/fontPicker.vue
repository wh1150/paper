<template>
  <div class="fontPicker">
    <div
        @click="selectFont(font)"
        class="font"
        :style="{'font-family' : font}"
        v-for="(font, i) in fonts"
        :key="i"
        v-html="message"
    >abc <br>ABC</div>
  </div>
</template>

<script>
export default {
  props: ["fonts", "onSelectFont","value"],
  data(){
    return {
      message : 'abc <br>ABC'
    };
  },
  methods: {
    selectFont: function(font) {
      this.onSelectFont(font);
    }
  },
  watch:{
    value: function (txt){
      this.message = txt;
    }
  }
};
</script>


<style lang="scss">
.fontPicker {
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  .font {
    width: 150px;
    margin: 5px;
    padding : 5px 15px;
    border-radius: 15px;
    transition: opacity 0.2s;
    border: 1px solid rgba(0, 0, 0, 0.1);
    &:not(.active):hover {
      cursor: pointer;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
  }
}
</style>