import paper from 'paper';
//import history from "@/tools/history";
// eslint-disable-next-line no-unused-vars
import store from '../../store/store';
let local = {
    path: null,
    center: null,
    s_point: null
};

function onMouseDown(event) {
    local.s_point = event.point;
}
function onMouseDrag() {
}
function onMouseUp(event) {
    if( local.s_point.x === event.point.x &&
        local.s_point.y === event.point.y  ){
            //console.log('click');
    }
    else{
        //console.log('drag');
    }
    local.s_point = null;
}

export const tool = new paper.Tool();
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;