<template>
    <el-dialog title="选择科目" :visible.sync="isShow" width="840px">
        <div v-for="i in all" class="subject-box">
            <el-checkbox v-model="i.checked"
                         :disabled="i.disabled"
                         :label="i.name"
                         style="width: 100%"
                         size="small"
                         border/>
        </div>
        <div slot="footer">
            <el-button @click="onCansel">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {},
        data () {
            return {
                isShow: false,

                all: []
            }
        },
        created () {

        },
        methods: {
            /**
             * public 显示这个组件
             * @param initData - 初始选中的科目
             * @param unselect - 是否禁止初始科目
             */
            show (initData = [], unselect = false) {
                this._initData = initData;
                this._unselect = unselect;
                this.isShow = true;
                this.loadAll();
            },
            loadAll () {
                // this.$httpGet('')
                let res = [
                    {autoId: '1', name: '语文'},
                    {autoId: '2', name: '数学'},
                    {autoId: '3', name: '哲学'},
                    {autoId: '4', name: '职业与人文素养'},
                    {autoId: '5', name: '历史'},
                    {autoId: '6', name: '英语'},
                    {autoId: '7', name: '音乐'},
                    {autoId: '8', name: '大学生就业指南'},
                    {autoId: '9', name: '吃喝玩乐'}
                ];
                res.forEach(item => {
                    item.checked = this._initData.includes(item.autoId);
                    this._unselect && (item.disabled = item.checked);
                });
                this.all = res;
            },
            onSubmit () {
                let boxes = {
                    add: [],     // 新选的
                    remove: [],  // 从初始化数据中取消的
                    checked: []  // 最终所有选中的
                };
                let checked = this.all.filter(item => item.checked).map(item => item.autoId);
                boxes.remove = this._initData.filter(item => !checked.includes(item));
                boxes.add = checked.filter(item => !this._initData.includes(item));
                boxes.checked = checked;
                this.$emit('ok', boxes);
                this.isShow = false;
            },
            onCansel () {
                this.isShow = false;
            }
        }
    }
</script>
<style scoped>
    .subject-box {
        display: inline-block;
        width: 150px;
        margin: 0 10px 10px 0;
        overflow: hidden;
    }
</style>