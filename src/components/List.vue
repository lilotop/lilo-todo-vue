<template>
    <div class="list">
            <table cellpadding="0" cellspacing="0">
                <tr class="list__headers">
                    <th class="list__headers__selection-indicator"></th>
                    <th class="list__headers__column" v-for="col in columns">{{col.header}}</th>
                </tr>
                <tr class="list__item" v-for="(item, index) in items"
                    @click="itemSelected(item)">
                    <td class="list__selection-indicator" :class="index === pointerIndex ? 'list__selection-indicator_selected':''"></td>
                    <td class="list__item__column" v-for="col in columns">
                        <CheckBox v-if="col.type === Boolean" :checked="item[col.field]"/>
                        <span v-else>{{col.formatter ? col.formatter(item[col.field]) : item[col.field]}}</span>
                    </td>
                </tr>
            </table>
        </div>
</template>

<script>
    import CheckBox from "./CheckBox";

    export default {
        name: 'List',
        components: { CheckBox },
        methods: {
            handleKey(e) {
                if (e.which === 38) {
                    // up
                    if (this.pointerIndex === null || this.pointerIndex <= 0) {
                        this.pointerIndex = this.list.length - 1;
                    } else {
                        this.pointerIndex--;
                    }
                }
                if (e.which === 40) {
                    // down
                    if (this.pointerIndex === null || this.pointerIndex >= this.list.length - 1) {
                        this.pointerIndex = 0;
                    } else {
                        this.pointerIndex++;
                    }
                }
                if (e.which === 32) {
                    // space - select
                    if (this.pointerIndex !== null) {
                        let item = this.items[this.pointerIndex];
                        if (item) {
                            this.itemSelected(item);
                        }
                    }
                }

            },
            itemSelected(item) {
                this.$emit('selected', item);
            }

        },
        data() {
            return {
                pointerIndex: null,
            }
        },
        props: {
            columns: Array,
            items: Array
        },
        computed: {
        },
        mounted() {
            window.addEventListener('keyup', this.handleKey);
        },
        beforeDestroy() {
            window.removeEventListener('keyup', this.handleKey);
        },
    }
</script>

<style scoped lang='scss'>
    @import '../main';

    .list {
    }

    table {
        width: 100%;
    }

    .list__item {
        cursor: pointer;

        .list__selection-indicator {
            border-left: 2px solid transparent;
        }

        .list__selection-indicator_selected {
            border-left: 2px solid $primary;
        }

        &:hover {
            background: $highlight;
        }

        td {
            padding: 6px 4px;
        }
    }

    .list__headers {
        background: $primary;
        color: $text_on-primary;

        .list__headers__column {
            padding: 6px 4px;
            text-align: start;
        }

    }
</style>
