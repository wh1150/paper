import paper from 'paper';
// import history from "@/tools/history";
// eslint-disable-next-line no-unused-vars
let local = {
    path: null,
    center: null,
    s_point: null,
    click: false,
    sel_some: false,
    drag: false
};


function onMouseMove(event){
    for(let layer of paper.project.layers)
        layer.selected = false;

    if(event.item) {
        console.log(event.item.position);
    }
}
// eslint-disable-next-line no-unused-vars
function onMouseDown(event) {
    console.log(event.item);
    //---------------------------------
    /*p = event.item;
    local.s_point = event.point;*/
}
// eslint-disable-next-line no-unused-vars
function onMouseDrag(event) {
    if(event.item) {
        console.log(event.item.position);
    }

    event.item.position += event.delta;


    //---------------------------------
    /*if( local.sel_some )
        for( let layer of paper['project']['layers'] )
            if( layer['selected'] ){
                layer['position'] = event.point;
            }*/
}
// eslint-disable-next-line no-unused-vars
function onMouseUp(event) {

    //---------------------------------
    /*local.click = (local.s_point.y == event.point.y && local.s_point.x == event.point.x) ? true : false;
    if(local.click)  {
        console.log(paper['project']['layers']);
        select_line(event);
    }else if( local.sel_some )
        for( let pj_layer of paper['project']['layers'] )
            if ( pj_layer['selected'] ){
                pj_layer['selected'] = false;
            }*/
}




//---------------------------------
/*function select_line(event){
    for( let pj_layer of paper['project']['layers'] )
        pj_layer['selected'] = false;

    local.sel_some = false;

    for( let his of history['history'] )
        for(let point of his['_args']['points'])
            if(event.point.x - 15 < point['x'] && event.point.x + 15 > point['x'] &&
                event.point.y - 15 < point['y'] && event.point.y + 15 > point['y'])
                for( let pj_layer of paper['project']['layers'] )
                    if( his['_args']['layer'] === pj_layer['name'] ) {
                        pj_layer['selected'] = true;
                        local.sel_some = true;
                    }
}*/

export const tool = new paper.Tool();
tool.onMouseMove = onMouseMove;
tool.onMouseDown = onMouseDown;
tool.onMouseDrag = onMouseDrag;
tool.onMouseUp = onMouseUp;