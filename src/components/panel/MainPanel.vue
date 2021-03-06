<template>
  <div class="mainPanel">
    <!-- Actions panel -->
    <div class="actionsPanel">
      <!-- Tool select -->
      <panelToolIcon
        @click.native="toggleToolSettings"
        :toolColor="toolColor"
        :isActive="tool === 'pencil' || tool === 'brush'"
        :icon="activeTool"
      />
      <!-- Eraser select -->
      <panelToolIcon
        @click.native="setWhiteboardTool('eraser'); toggleEraserSettings();"
        toolColor="#133337"
        :isActive="tool === 'eraser'"
        icon="eraser"
      />
      <!-- Shape select -->
      <panelToolIcon
          @click.native="toggleShapeSettings"
          :toolColor="shapeColor"
          :isActive="tool === 'circle' || tool === 'square' || tool === 'triangle' || tool === 'line'"
          :icon="activeShape"
      />
      <!-- text select-->
      <panelToolIcon
          @click.native="setWhiteboardTool('text'); toggleTextSettings();"
          :toolColor="textColor"
          :isActive="tool === 'text'"
          :icon="'font'"
      />
    </div>

    <!-- Action settings settings -->
    <div class="actionSettingsPanel">
      <!-- Tool settings -->
      <panelToolSettings v-if="isToolSettingsOpened">
        <!-- SettingsActions -->
        <div class="settingsActions" slot="settingsActions">
          <!-- Pencil select -->
          <panelToolIcon
            @click.native="setWhiteboardTool('pencil')"
            :toolColor="toolColor"
            :isActive="tool === 'pencil'"
            icon="pencil-alt"
          />
          <!-- Brush select -->
          <panelToolIcon
            @click.native="setWhiteboardTool('brush')"
            :toolColor="toolColor"
            :isActive="tool === 'brush'"
            icon="paint-brush"
          />
        </div>
        <!-- ColorPicker -->
        <colorPicker
          :onSelectColor="setToolColor"
          class="settingsColorPicker"
          slot="settingsColorPicker"
          :colors="colors"
        />
        <!-- Slider -->
        <rangeSlider
          :onChange="setToolSize"
          :min="0"
          :max="6"
          :value="toolSize"
          class="settingsSlider"
          slot="slider"
        />
      </panelToolSettings>
      <!-- Eraser settings -->
      <panelToolSettings v-if="isEraserSettingsOpened">
        <!-- Slider -->
        <rangeSlider
          :onChange="setEraserSize"
          :min="0"
          :max="24"
          :value="eraserSize"
          class="settingsSlider"
          slot="slider"
        />
      </panelToolSettings>
      <!-- Shape settings -->
      <panelToolSettings v-if="isShapeSettingsOpened">
        <!-- SettingsActions -->
        <div class="settingsActions" slot="settingsActions">
          <!-- Circle select -->
          <panelToolIcon
              @click.native="setWhiteboardTool('circle')"
              :toolColor="shapeColor"
              :isActive="tool === 'circle'"
              icon="circle"
          />
          <!-- Square select -->
          <panelToolIcon
              @click.native="setWhiteboardTool('square')"
              :toolColor="shapeColor"
              :isActive="tool === 'square'"
              icon="square"
          />
          <!-- Triangle select -->
          <panelToolIcon
              @click.native="setWhiteboardTool('triangle')"
              :toolColor="shapeColor"
              :isActive="tool === 'triangle'"
              icon="exclamation-triangle"
          />
          <!-- Line select -->
          <panelToolIcon
              @click.native="setWhiteboardTool('line')"
              :toolColor="shapeColor"
              :isActive="tool === 'line'"
              icon="slash"
          />
        </div>
        <!-- ColorPicker -->
        <colorPicker
            :onSelectColor="setShapeColor"
            class="settingsColorPicker"
            slot="settingsColorPicker"
            :colors="colors"
        />
        <!-- Slider -->
        <rangeSlider
            :onChange="setShapeSize"
            :min="0"
            :max="6"
            :value="shapeSize"
            class="settingsSlider"
            slot="slider"
        />
      </panelToolSettings>

      <panelToolSettings v-if="isTextSelected">
        <!-- SettingsActions -->
        <div class="settingsActions" slot="settingsActions">
          <!-- insert content -->
          <inputContent
            :onChange="setTextContent"
            :txtSize="20"
            :value="txt_content"
          />
        </div>
        <!-- Slider -->
        <!--
        <rangeSlider
            :onChange="setToolSize"
            :min="5"
            :max="15"
            :value="toolSize"
            class="settingsSlider"
            slot="slider"
        />
        -->
        <!-- ColorPicker -->
        <fontPicker
            :onSelectFont="setContentFont"
            :add_cont="add_cont"
            class="settingsColorPicker"
            slot="settingsColorPicker"
            :fonts="fonts"
            :value="font_txt"
        />
        <!-- Pencil select -->
        <apply_btn_comp slot="apply_btn"
            :name="'미리보기 적용'"
            :apply_font="change_txt"
            :value="txt_content"
        />
      </panelToolSettings>
    </div>
  </div>
</template>

<script>
import paper from "paper";
import PanelToolIcon from "./PanelToolIcon";
import PanelToolSettings from "./PanelToolSettings";
import ColorPicker from "../ColorPicker";
import FontPicker from "../fontPicker";
import RangeSlider from "../RangeSlider";
import inputContent from "../inputContent";
import apply_btn_comp from "../apply_btn_comp";
import colorPalette from "../../config/colorPalette.js";
import fontPalette from "../../config/fontPalette.js";
import history from "@/tools/history";
import { createLayer } from '@/tools/shared';
import { DrawAction } from "@/tools/action.js";



export default {
  components: {
    panelToolIcon: PanelToolIcon,
    panelToolSettings: PanelToolSettings,
    rangeSlider: RangeSlider,
    colorPicker: ColorPicker,
    fontPicker: FontPicker,
    inputContent: inputContent,
    apply_btn_comp: apply_btn_comp
  },
  data() {
    return {
      isToolSettingsOpened: false,
      isEraserSettingsOpened: false,
      isShapeSettingsOpened: false,
      isTextSelected : false,
      colors: colorPalette,
      fonts: fontPalette,
      font_txt: 'abc <br> ABC',
    };
  },
  methods: {
    // Toggle
    toggleToolSettings() {
      this.isToolSettingsOpened = !this.isToolSettingsOpened;
      this.isEraserSettingsOpened = false;
      this.isShapeSettingsOpened = false;
      this.isTextSelected = false;

      if( !this.isToolSettingsOpened &&
          !this.isEraserSettingsOpened &&
          !this.isShapeSettingsOpened &&
          !this.isTextSelected )
        this.$store.dispatch("setWhiteboardTool", 'none');
    },
    toggleEraserSettings() {
      this.isEraserSettingsOpened = !this.isEraserSettingsOpened;
      this.isToolSettingsOpened = false;
      this.isShapeSettingsOpened = false;
      this.isTextSelected = false;

      if( !this.isToolSettingsOpened &&
          !this.isEraserSettingsOpened &&
          !this.isShapeSettingsOpened &&
          !this.isTextSelected )
        this.$store.dispatch("setWhiteboardTool", 'none');
    },
    toggleShapeSettings() {
      this.isShapeSettingsOpened = !this.isShapeSettingsOpened;
      this.isEraserSettingsOpened = false;
      this.isToolSettingsOpened = false;
      this.isTextSelected = false;

      if( !this.isToolSettingsOpened &&
          !this.isEraserSettingsOpened &&
          !this.isShapeSettingsOpened &&
          !this.isTextSelected )
        this.$store.dispatch("setWhiteboardTool", 'none');
    },
    toggleTextSettings() {
      this.isTextSelected = !this.isTextSelected;
      this.isShapeSettingsOpened = false;
      this.isEraserSettingsOpened = false;
      this.isToolSettingsOpened = false;

      if( !this.isToolSettingsOpened &&
          !this.isEraserSettingsOpened &&
          !this.isShapeSettingsOpened &&
          !this.isTextSelected )
        this.$store.dispatch("setWhiteboardTool", 'none');
    },
    // Set Color
    setToolColor(color) {
      this.$store.dispatch("setToolColor", color);
    },
    setShapeColor(color) {
      this.$store.dispatch("setShapeColor", color);
    },
    // Set size
    setToolSize(size) {
      this.$store.dispatch("setToolSize", size);
    },
    setEraserSize(size) {
      this.$store.dispatch("setEraserSize", size);
    },
    setShapeSize(size) {
      this.$store.dispatch("setShapeSize", size);
    },
    // Set tool
    setWhiteboardTool(tool) {
      this.$store.dispatch("setWhiteboardTool", tool);
    },
    setTextContent(cont){
      this.$store.dispatch("setTextContent", cont);
    },
    setContentFont(font){
      this.$store.dispatch("setContentFont", font);
      this.add_cont();
    },
    change_txt(font){
      this.font_txt = font;
    },
    add_cont(){
      let cont = this.txt_content;
      if( cont === '' ) return;

      let pp = new paper.PointText(new paper.Point(300, 200));
      pp.fillColor = 'black';
      pp.content = cont;
      pp.fontFamily = this.font_content;
      pp.fontSize = 30;
      let layer = createLayer();
      layer.addChild(pp);

      const action = new DrawAction({
        layer: pp.layer.name,
        tool: this.tool,
        points: pp.point,
        text_check: 0
      });
      history.add(action);
    }

  },
  computed: {
    // Acitve
    activeTool: function() {
      if (this.tool === "pencil") {
        return "pencil-alt";
      } else if (this.tool === "brush") {
        return "paint-brush";
      } else {
        return "pencil-alt";
      }
    },
    activeShape: function() {
      if (this.tool === "cricle") {
        return "circle";
      } else if (this.tool === "square") {
        return "square";
      } else if (this.tool === "triangle") {
        return "exclamation-triangle";
      } else if (this.tool === "line") {
        return "slash";
      } else {
        return "circle";
      }
    },
    tool: function() {
      return this.$store.getters.tool;
    },
    // Color
    toolColor: function() {
      return this.$store.getters.toolArgs.color;
    },
    shapeColor: function() {
      return this.$store.getters.shapeArgs.color;
    },
    textColor: function() {
      return this.$store.getters.textArgs.color;
    },
    // Size
    toolSize: function() {
      return this.$store.getters.toolArgs.size;
    },
    eraserSize: function() {
      return this.$store.getters.eraserArgs.size;
    },
    shapeSize: function() {
      return this.$store.getters.shapeArgs.size;
    },
    txt_content: function() {
      return this.$store.getters.textArgs.content;
    },
    font_content:function() {
      return this.$store.getters.textArgs.font;
    },
  },
  mounted() {
    this.$store.dispatch("setWhiteboardTool", "none");
  }
};
</script>


<style lang="scss">
.mainPanel {
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 10px;
  left: 10px;
  padding: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 10px 30px 8px rgba(0, 0, 0, 0.4);
  .actionsPanel {
    .tool:not(:last-child) {
      margin-bottom: 5px;
    }
  }
}
</style>