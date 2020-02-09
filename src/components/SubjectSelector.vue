<template>
    <el-dialog title="选择科目" :visible.sync="isShow" width="840px">
        <div v-for="i in all" class="subject-box">
            <el-checkbox v-model="i.checked"
                         :disabled="i.disabled"
                         :label="i.Name"
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
                this.$httpGet('/api/subjects')
                    .then(res => {
                        res.forEach(item => {
                            item.checked = this._initData.includes(item.AutoID);
                            this._unselect && (item.disabled = item.checked);
                        });
                        this.all = res;
                    });
            },
            onSubmit () {
                let boxes = {
                    add: [],     // 新选的
                    remove: [],  // 从初始化数据中取消的
                    checked: []  // 最终所有选中的
                };
                let checked = this.all.filter(item => item.checked).map(item => item.AutoID);
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