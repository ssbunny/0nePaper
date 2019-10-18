<template>
    <el-dialog title="选择考生" :visible.sync="isShow" width="990px">

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
            show () {

            },
            loadAll () {
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

//                this.$emit('ok', boxes);
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