const emitter = new mitt();

const inputComponent = {
    /* html */
    template: `<input class="input is-small" type="text" :placeholder="placeholder" 
                v-model="input" @keyup.enter="monitorEnterKey"/>`,
    props: ['placeholder'],
    data() {
        return {
            input: ""
        }
    },
    methods: {
        monitorEnterKey() {
            emitter.emit("add-note", {
                note: this.input,
                timestamp: new Date().toLocaleString()
            });
            this.input = "";
        }
    }
};

const noteCountComponent = {
    /* html */
    template:
        `<div class="note-count">
            Note count: <strong>{{ noteCount }}</strong>
        </div>`,
    data() {
        return {
            noteCount: 0
        };
    },
    created() {
        emitter.on("add-note", event => this.noteCount++)
    }
};

const app = {
    components: {
        'input-component': inputComponent,
        'note-count-component': noteCountComponent
    },
    data() {
        return {
            notes: [],
            timestamps: [],
            placeholder: 'Enter a note'
        }
    },
    methods: {
        addNote(event) {
            this.notes.push(event.note);
            this.timestamps.push(event.timestamp)
        }
    },
    created() {
        emitter.on("add-note", (event) => this.addNote(event));
    }
};

Vue.createApp(app).mount('#app');