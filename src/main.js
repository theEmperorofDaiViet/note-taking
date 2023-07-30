const emitter = new mitt();

const inputComponent = {
    /* html */
    template: `<input class="input is-small" type="text" :placeholder="placeholder" 
                v-model="input" @keyup.enter="monitorEnterKey"/>`,
    props: ['placeholder'],
    emits: ["add-note"],
    data() {
        return {
            input: ""
        }
    },
    methods: {
        monitorEnterKey() {
            this.$emit("add-note", {
                note: this.input,
                timestamp: new Date().toLocaleString()
            });
            this.input = "";
        }
    }
};

const app = {
    components: {
        'input-component': inputComponent
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
    }
};

Vue.createApp(app).mount('#app');