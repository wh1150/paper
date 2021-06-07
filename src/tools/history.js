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
            if(this.text_cnt > this.max_text){
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
            if (this.current >= 0)
                if(this.history[this.current]['_args']['tool'] === 'text'){
                    this.text_cnt--;
                    if(this.text_cnt < this.max_text+1) {
                        for (let i = this.current; i >= 0; i--)
                            if (this.history[i]['_args']['tool'] === 'text' &&
                                this.history[i]['_args']['text_check'] === 1) {
                                this.history[i].exec();
                                this.text_cnt++;
                                this.history[i]['_args']['text_check'] = 0;
                                break;
                            }
                    }
                }
        }
    }
    redo() {
        if (this.history.length > this.current || this.current === 0 ) {
            this.history[this.current].exec();
            console.log(this.current+'번째 인덱스 살림');

            this.history[this.current++]['_args']['text_check'] = 0;
            if(this.history[this.current-1]['_args']['tool'] === 'text')
                this.text_cnt++;
                if(this.text_cnt > this.max_text) {
                    for (let i = 0; i < this.history.length - 1; i++)
                        if (this.history[i]['_args']['tool'] === 'text' &&
                            this.history[i]['_args']['text_check'] === 0) {
                            this.history[i].unexec();
                            this.text_cnt--;
                            this.history[i]['_args']['text_check'] = 1;
                            console.log(i + '번째 인덱스 죽임');
                            break;
                        }
                }

        }
    }
    clear() {
        this.history = [];
        this.current = 0;
        this.text_cnt = 0;
        this.max_text = 1;
    }
}

// Default size 20
export default new History(20);
