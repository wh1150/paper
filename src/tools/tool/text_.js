import paper from 'paper';
import { createLayer } from '../shared';
import {DrawAction} from "@/tools/action";
import store from "@/store/store";
import history from "@/tools/history";

let local = {
    path: null,
    center: null
};

export default {
   // add_text:add_txt,

}

function onMouseDown() {
    console.log('down text');
}

function onMouseDrag() {
}


function onMouseUp() {
    console.log('up text');
}

// eslint-disable-next-line no-unused-vars
function add_txt(event) {
    console.log("@@@@@@@@@@@@");
    if( store.getters.textArgs.content == '') return;

    let layer = createLayer();
    local.path = new paper.PointText(event.point)
    local.path.fillColor = 'black';
    local.path.content = store.getters.textArgs.content;
    layer.addChild(local.path);
    local.center = event.point;
    const action = new DrawAction({
        layer: local.path.layer.name,
        tool: store.getters.tool,
        points: event.point
    });

    history.add(action);

    local.path = null;
    local.group = null;
}
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;
