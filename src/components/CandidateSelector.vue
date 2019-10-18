<template>
    <el-dialog title="选择考生" :visible.sync="isShow" width="990px">
        <el-tabs @tab-click="onTabClick"
                 v-model="active"
                 type="border-card"
                 tab-position="left"
                 style="height: 400px;">
            <el-tab-pane v-for="clazz in classes" :key="clazz.id" :name="clazz.id">
                <span slot="label">{{ clazz.name }}</span>
                <el-table v-loading="!clazz.loaded"
                          :data="clazz.candidates"
                          height="370"
                          border
                          stripe
                          size="mini">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column prop="code" label="考号" width="180"/>
                    <el-table-column prop="date" label="学号" width="180"/>
                    <el-table-column prop="date" label="姓名"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>
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
                active: '',
                classes: []
            }
        },
        methods: {
            show () {
                this.loadClasses();
                this.isShow = true;
            },
            loadClasses () {
                this.classes = [
                    {id: '1', name: '1班', candidates: [], loaded: false},
                    {id: '2', name: '2班', candidates: [], loaded: false},
                    {id: '3', name: '3班', candidates: [], loaded: false},
                    {id: '4', name: '4班', candidates: [], loaded: false},
                    {id: '5', name: '超级赛亚人班', candidates: [], loaded: false},
                ];
                this.active = this.classes[0].id;
                this.loadCandidates(this.active);
            },
            loadCandidates (classId) {
                let clazz = this.classes.find(item => item.id === classId);
                if (clazz.loaded) {
                    return;
                }
                // TODO
                setTimeout(() => {
                    clazz.loaded = false;
                    clazz.candidates = [
                        {code: classId},
                        {code: classId},
                        {code: classId},
                    ];
                    clazz.loaded = true;
                }, 400);
            },
            onTabClick () {
                this.loadCandidates(this.active);
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

<style>
    .el-table thead {
        color: #333;
    }

    .el-table th {
        background-color: #f4f8ff;
    }
</style>