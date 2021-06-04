import tools from '../../tools/tool/tools';

const state = {
    tool: null,
    toolArgs: {
        size: 2,
        color: '#000000'
    },
    eraserArgs: {
        size: 2,
        color: '#ffffff'
    },
    shapeArgs: {
        size: 2,
        color: '#000000'
    },
    textArgs: {
        size: 2,
        content: '',
        font: ''
    }
};

const mutations = {
    //ToolArgs
    'SET_TOOL_COLOR'(state, toolColor) {
        state.toolArgs.color = toolColor;
    },
    'SET_TOOL_SIZE'(state, toolSize) {
        state.toolArgs.size = toolSize;
    },
    //EraserArgs
    'SET_ERASER_SIZE'(state, eraserSize) {
        state.eraserArgs.size = eraserSize;
    },
    'SET_ERASER_COLOR'(state, eraserColor) {
        state.eraserArgs.color = eraserColor;
    },
    //ShapesArgs
    'SET_SHAPE_SIZE'(state, shapeSize) {
        state.shapeArgs.size = shapeSize;
    },
    'SET_SHAPE_COLOR'(state, shapeColor) {
        state.shapeArgs.color = shapeColor;
    },
    //Tool
    'SET_WHITEBOARD_TOOL'(state, tool) {
        state.tool = tool;
        if (tools[tool]) {
            tools[tool].activate();
        }
    },
    'SET_TEXT_CONTENT'(state, cont) {
        state.textArgs.content = cont;
    },
    'SET_CONTENT_FONT'(state, font) {
        state.textArgs.font = font;
    }
}


const actions = {
    //ToolArgs 테스트
    setToolColor: ({
        commit
    }, toolColor) => {
        commit('SET_TOOL_COLOR', toolColor);
    },
    setToolSize: ({
        commit
    }, toolSize) => {
        commit('SET_TOOL_SIZE', toolSize);
    },
    //Eraser
    setEraserSize: ({
        commit
    }, eraserSize) => {
        commit('SET_ERASER_SIZE', eraserSize);
    },
    setEraserColor: ({
        commit
    }, eraserColor) => {
        commit('SET_ERASER_COLOR', eraserColor);
    },
    //ShapeArgs
    setShapeSize: ({
        commit
    }, shapeSize) => {
        commit('SET_SHAPE_SIZE', shapeSize);
    },
    setShapeColor: ({
        commit
    }, shapeColor) => {
        commit('SET_SHAPE_COLOR', shapeColor);
    },
    //Tool
    setWhiteboardTool: ({
        commit
    }, tool) => {
        commit('SET_WHITEBOARD_TOOL', tool);
    },
    setTextContent: ({
        commit
    }, cont) => {
        commit('SET_TEXT_CONTENT', cont);
    },
    setContentFont: ({
        commit
    }, font) => {
        commit('SET_CONTENT_FONT', font);
    }
}

const getters = {
    tool(state) {
        return state.tool;
    },
    toolArgs(state) {
        return state.toolArgs;
    },
    eraserArgs(state) {
        return state.eraserArgs;
    },
    shapeArgs(state) {
        return state.shapeArgs;
    },
    textArgs(state) {
        return state.textArgs;
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}