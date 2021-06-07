import paper from 'paper';/*
import store from "@/store/store";
import history from "@/tools/history";
import { createLayer } from '../shared';
import { DrawAction } from "@/tools/action";
*/
// eslint-disable-next-line no-unused-vars
let local = {
    path: null,
    center: null
};


function onMouseDown(event) {
    event;
}

function onMouseDrag() {

}


function onMouseUp() {
}

/*
function add_txt(event) {
    console.log("@@@@@@@@@@@@");
    if( store.getters.textArgs.content == '') return;

    let layer = createLayer();
    local.path = new paper.PointText(event.point);
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
}*/
export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;