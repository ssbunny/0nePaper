<template>
    <section class="e-main">
        <div class="e-header">考试信息</div>

        <el-form class="mt2 form" inline :model="query">
            <el-form-item>
                <el-select v-model="query.school" style="width: 400px" filterable>
                    <el-option v-for="s in schoolList"
                               :key="s.id"
                               :label="s.name"
                               :value="s.id"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-circle-plus-outline">新建考试</el-button>
            </el-form-item>
        </el-form>

        <el-collapse>
            <el-collapse-item v-for="e in examinfoList" :key="e.autoId">
                <!-- 考试信息 -->
                <template slot="title">
                    <div class="title">
                        <div class="fl ml1">
                            <span class="time">[{{ e.date }}]</span>
                            &nbsp;
                            <i class="el-icon-document icon"></i>
                            <span class="grade">{{ e.name }}（{{ e.grade }} - {{ e.classType }}）</span>
                        </div>
                        <div class="fr mr1">
                            <el-tooltip content="刷新" :open-delay="200" :hide-after="700" placement="top">
                                <el-button @click="onRefresh($event, e)"
                                           icon="el-icon-refresh" type="primary" size="mini" circle/>
                            </el-tooltip>
                            <el-tooltip content="增加科目" :open-delay="200" :hide-after="700" placement="top">
                                <el-button @click="onAddSubject($event, e)"
                                           icon="el-icon-notebook-2" type="success" size="mini" circle/>
                            </el-tooltip>
                            <el-tooltip content="增加考生" :open-delay="200" :hide-after="700" placement="top">
                                <el-button @click="onAddCandidate($event, e)"
                                           icon="el-icon-user-solid" type="warning" size="mini" circle/>
                            </el-tooltip>
                            <el-tooltip content="删除" :open-delay="200" :hide-after="700" placement="top">
                                <el-button @click="onDelete($event, e)"
                                           type="danger" icon="el-icon-delete" size="mini" circle/>
                            </el-tooltip>
                        </div>
                    </div>
                </template>

                <!-- 科目列表 -->
                <div class="content">
                    <div v-if="!e.subjectList || !e.subjectList.length">
                        <el-alert :closable="false" title="没有科目" type="info" show-icon/>
                    </div>
                    <el-card v-else v-for="s in e.subjectList" :key="s.id" class="box-card fl ml1 mt1">
                        <div slot="header">
                            <span class="subjec-title">{{ s.name }}</span>
                            <el-dropdown placement="bottom-start" class="fr">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-more el-icon--right"></i>
                                </span>
                                <el-dropdown-menu style="width: 150px" slot="dropdown">
                                    <el-dropdown-item>开始切割</el-dropdown-item>
                                    <el-dropdown-item>停止切割</el-dropdown-item>
                                    <el-dropdown-item>重新切割</el-dropdown-item>
                                    <el-dropdown-item divided>重新统计</el-dropdown-item>
                                    <el-dropdown-item divided>删除科目</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="progress-item">
                            <span>扫描进度(0/0)</span>
                            <el-progress :show-text="false" :percentage="0" :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>上传进度(15/100)</span>
                            <el-progress :show-text="false" :percentage="15" :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>切割进度(50/200)</span>
                            <el-progress :show-text="false" :percentage="40" :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>阅卷进度(8/10)</span>
                            <el-progress :show-text="false" :percentage="80" :color="customColors"/>
                        </div>
                    </el-card>
                </div>
            </el-collapse-item>
        </el-collapse>

        <SubjectSelector ref="subjectSelector" @ok="onSubjectSelected"/>
        <StudentSelector ref="studentSelector" @ok="onStudentSelected"/>
    </section>
</template>


<script>
    import SubjectSelector from '../../components/SubjectSelector.vue';
    import StudentSelector from '../../components/StudentSelector.vue';

    export default {
        components: {SubjectSelector, StudentSelector},
        data () {
            return {
                query: {},
                customColors: [
                    {color: '#f56c6c', percentage: 30},
                    {color: '#e6a23c', percentage: 60},
                    {color: '#5cb87a', percentage: 100}
                ],
                schoolList: [
                    {id: '1', name: '实验一小'},
                    {id: '2', name: '实验二小'},
                    {id: '3', name: '实验三小'}
                ],
                examinfoList: [
                    {
                        autoId: '1', name: '2019年七月份月考', classType: '文科', grade: '九年级', date: '2019-07-20',
                        subjectList: [
                            {id: '1', name: '语文'},
                            {id: '2', name: '数学'},
                            {id: '3', name: '英语'},
                        ]
                    },
                    {autoId: '2', name: '2016年数学测试', grade: '一年级', classType: '不分文理', date: '2019-01-02'},
                    {autoId: '3', name: '一年级入学考试', grade: '高三', date: '2019-01-02'},
                    {autoId: '4', name: '这是一个比较长的名字这是一个比较长的名字这是一个比较长的名字', grade: '九年级', date: '2019-01-02'},
                ]
            }
        },
        created () {
            //this.query.school = this.schoolList[0].id;
        },
        methods: {
            onRefresh(e, exam) {
                e.stopPropagation();
                // TODO
            },
            onAddSubject(e, exam) {
                e.stopPropagation();
                this.$refs.subjectSelector.show(['1', '3']);
            },
            onAddCandidate(e, exam) {
                e.stopPropagation();
                this.$refs.studentSelector.show();
            },
            onSubjectSelected (boxes) {
                // TODO 提交
            },
            onStudentSelected () {

            },
            onDelete(e, exam) {
                e.stopPropagation();
                this.$confirm('确定要删除该考试信息吗?', '警告', {
                    type: 'warning'
                }).then(() => {
                    // TODO 提交
                    this.$message({type: 'success', message: '删除成功!'});
                }).catch(() => {
                    // nothing...
                });
            }

        }
    }
</script>
<style scoped>
    .title {
        position: relative;
        width: 100%;
    }

    .content {
        background-color: #FFF;
        padding: 10px;
        overflow: hidden;
    }

    .icon {
        color: #2E6EB1;
        font-size: 16px;
    }

    .time {
        font-weight: bold;
        font-size: 14px;
        color: #929292;
    }

    .grade {
        margin: 0 10px;
        font-weight: bold;
        font-size: 14px;
    }

    .box-card {
        width: 170px;
        margin-right: 10px;
        margin-bottom: 10px;
    }

    .progress-item {
        margin-bottom: 10px;
    }

    .progress-item span {
        font-size: 12px;
    }

    .subjec-title {
        font-weight: bold;
        font-size: 14px;
        height: 20px;
    }
</style>
<style>
    .el-collapse-item__header {
        background-color: #f4f8ff;
        /*border-bottom-color: #aeaeae;*/
    }

    .el-collapse-item__arrow {
        display: none;
    }

    .el-collapse-item__content {
        padding-bottom: 0;
    }

    .el-card__header {
        padding: 10px 20px;
    }
</style>