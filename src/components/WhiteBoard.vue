<template>
  <div>
    <mainPanel></mainPanel>
    <historyPanel></historyPanel>
    <canvas id="whiteboard" resize></canvas>
  </div>
</template>

<script>
import paper from "paper";
import MainPanel from "./panel/MainPanel";
import HistoryPanel from "./panel/HistoryPanel";

export default {
  components: {
    mainPanel: MainPanel,
    historyPanel: HistoryPanel
  },
  created() {
    paper.install(window);
  },
  mounted() {
    paper.setup("whiteboard");
  }
};
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Limelight&family=Mate+SC&family=Roboto&family=ZCOOL+KuaiLe&display=swap');
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
canvas {
  height: 100vh;
  width: 100%;
  background: #ffffff;
}
</style>