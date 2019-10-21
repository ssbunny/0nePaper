<template>
    <section class="e-main">
        <div class="e-header">选择考生</div>

        <el-alert class="mt2" type="info">
            <span slot="title">TODO 名{{ examInfo.name }}</span>
            <span>考试时间：{{ examInfo.date }}</span>
            <span class="ml1">文科 {{ examInfo.date }}</span>
            <span>考试时间：{{ examInfo.date }}</span>
        </el-alert>

        <el-tabs @tab-click="onTabClick"
                 v-model="active"
                 class="mt2"
                 type="card"
                 tab-position="left">
            <el-tab-pane v-for="clazz in classes" :key="clazz.id" :name="clazz.id">
                <span slot="label">{{ clazz.name }}</span>
                <el-table v-loading="!clazz.loaded"
                          :data="clazz.candidates"
                          border
                          stripe
                          height="420"
                          size="mini">
                    <el-table-column type="selection" width="55"/>
                    <el-table-column prop="code" label="考号" width="180"/>
                    <el-table-column prop="date" label="学号" width="180"/>
                    <el-table-column prop="date" label="姓名"/>
                </el-table>
            </el-tab-pane>
        </el-tabs>

        <div style="text-align: center" class="mt2">
            <el-button type="primary"
                       :loading="btnLoading"
                       :disabled="btnDisabled"
                       @click="onStudentSelected">确定
            </el-button>
        </div>
    </section>
</template>


<script>
    export default {
        data () {
            return {
                active: '',
                examInfo: {},
                classes: [],
                btnDisabled: true,
                btnLoading: false
            }
        },
        created () {
            let id = window.location.search.substring(4);
            // TODO
            this.examInfo.id = id;

            this.loadClasses();
        },
        methods: {
            loadExamInfo () {

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
                    ];
                    clazz.loaded = true;
                }, 400);
            },
            onTabClick () {
                this.loadCandidates(this.active);
            },
            onStudentSelected () {
                this.btnLoading = true;
                // TODO
            }
        }
    }
</script>
<style scoped>

</style>
<style>

</style>