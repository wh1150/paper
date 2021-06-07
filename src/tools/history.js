class History {
    constructor(limit) {
        this.limit = limit;
        this.clear();
    }
    add(action) {
        if (this.history.length >= this.limit || this.current === this.history.length - 1)
            this.history.shift();

        this.history[this.current++] = action;
        this.history.splice(this.current, this.history.length-this.current);
        if(action['_args']['tool'] === 'text'){
            this.text_cnt++;
            if(this.text_cnt > 1){
                for( let i = 0 ; i < this.history.length - 1 ; i++ )
                    if(this.history[i]['_args']['tool'] === 'text' &&
                        this.history[i]['_args']['text_check'] === 0){
                        this.history[i].unexec();
                        this.history[i]['_args']['text_check'] = 1;
                        this.text_cnt--;
                        break;
                    }
            }
        }
    }
    undo() {
        if (this.current > 0) {
            this.history[--this.current].unexec();
            if (this.current > 0)
                if(this.history[this.current]['_args']['tool'] === 'text'){
                    for( let i = (this.current - 1 ) ; i > 0 ; i-- )
                        if(this.history[i]['_args']['tool'] === 'text' &&
                            this.history[i]['_args']['text_check'] === 1){
                            this.history[i].exec();
                            this.history[i]['_args']['text_check'] = 0;
                            break;
                        }
                }
        }
    }
    redo() {
        if (this.history.length > this.current) {
            this.history[this.current++].exec();
            if(this.history[this.current]['_args']['tool'] === 'text')
                for( let i = 0 ; i < this.history.length - 1 ; i++ )
                    if(this.history[i]['_args']['tool'] === 'text' &&
                        this.history[i]['_args']['text_check'] === 0){
                        this.history[i].unexec();
                        this.history[i]['_args']['text_check'] = 1;
                        break;
                    }

        }
    }
    clear() {
        this.history = [];
        this.current = 0;
        this.text_cnt = 0;
    }
}

// Default size 20
export default new History(20);
