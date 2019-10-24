<template>
    <el-dialog title="选择题目" :visible.sync="isShow" width="950px">
        <el-cascader-panel
                size="small"
                @change="onCascaderChange"
                :options="questions"/>
    </el-dialog>
</template>

<script>
    export default {
        props: {},
        data () {
            return {
                isShow: false,
                questions: []
            }
        },
        created () {

        },
        methods: {
            show () {
                this.isShow = true;
                this.loadAll();
            },
            loadAll () {
                this.questions = [{
                    value: '1',
                    label: '济南市第十四中学',
                    children: [
                        {
                            value: '11', label: '[2019-07-20]2019年七月份月考九年级 - 文科）',
                            children: [
                                {
                                    value: 'aa', label: '数学',
                                    children: [
                                        {
                                            value: 'a1', label: '一',
                                            children: [
                                                {value: 'c1', label: '正常卷'},
                                                {value: 'ca2', label: '正常卷'},
                                            ]
                                        },
                                        {value: 'a2', label: '二'},
                                        {value: 'a3', label: '三'},
                                        {value: 'a4', label: '四'},
                                    ]
                                },
                                {value: 'bb', label: '数学'},
                                {value: 'cc', label: '数学'},
                                {value: 'dd', label: '数学'}
                            ]
                        },
                        {value: '22', label: '[2019-07-20]2019年七月份月考九年级 - 文科）'},
                        {value: '33', label: '[2019-07-20]2019年七月份月考九年级 - 文科）'},
                        {value: '44', label: '[2019-07-20]2019年七月份月考九年级 - 文科）'}
                    ]
                }]
            },
            onCascaderChange (nodes) {
                if (nodes.length === 5) {
                    this.$emit('ok', nodes[4]);
                    this.isShow = false;
                }
            }
        }
    }
</script>
<style scoped>

</style>