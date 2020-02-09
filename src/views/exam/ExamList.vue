<template>
    <section class="e-main">
        <div class="e-header">考试信息</div>

        <el-form class="mt2 form" inline :model="query">
            <el-form-item>
                <el-select v-model="query.SchoolID"
                           @change="onSchoolChange"
                           style="width: 400px" filterable>
                    <el-option v-for="s in schoolList"
                               :key="s.AutoID"
                               :label="s.Name"
                               :value="s.AutoID"/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary"
                           @click="onCreateExam"
                           icon="el-icon-circle-plus-outline">新建考试
                </el-button>
            </el-form-item>
        </el-form>

        <el-alert v-if="examinfoList.length === 0"
                  :closable="false"
                  title="该学校没有考试信息记录！"
                  type="error" show-icon/>

        <el-collapse v-show="examinfoList.length > 0" @change="onCollapseChange">
            <el-collapse-item v-for="e in examinfoList" :key="e.AutoID" :name="e.AutoID">
                <!-- 考试信息 -->
                <template slot="title">
                    <div class="title">
                        <div class="fl ml1">
                            <span class="time">[{{ e.UpdatedTime }}]</span>
                            &nbsp;
                            <i class="el-icon-document icon"></i>
                            <span class="grade">{{ e.Name }}（{{ e.Grade || '无' }} - {{ e.ClassType || '无'}})</span>
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
                    <el-card v-else v-for="s in e.subjectList" :key="s.AutoID" class="box-card fl ml1 mt1">
                        <div slot="header">
                            <span class="subjec-title">{{ s.SubjectName }}</span>
                            <el-dropdown @command="onSubjectOperation" placement="bottom-start" class="fr">
                                <span class="el-dropdown-link">
                                    <i class="el-icon-more el-icon--right"></i>
                                </span>
                                <el-dropdown-menu style="width: 150px" slot="dropdown">
                                    <el-dropdown-item :command="{subject:s,operation:'StartCut'}">
                                        开始切割
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{subject:s,operation:'StopCut'}">
                                        停止切割
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{subject:s,operation:'ResetCut'}">
                                        重新切割
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{subject:s,operation:'RedoStatistics'}" divided>
                                        重新统计
                                    </el-dropdown-item>
                                    <el-dropdown-item :command="{subject:s,operation:'DeleteSubject'}" divided>
                                        删除科目
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <div class="progress-item">
                            <span>扫描进度({{ s.ScanCount }}/{{ s.CandidateCount }})</span>
                            <el-progress :show-text="false"
                                         :percentage="$toFixed(s.ScanCount/s.CandidateCount, 0, 0)"
                                         :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>上传进度({{ s.UploadCount }}/{{ s.ScanCount }})</span>
                            <el-progress :show-text="false"
                                         :percentage="$toFixed(s.UploadCount/s.ScanCount, 0, 0)"
                                         :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>切割进度({{ s.CuttingCount }}/{{ s.UploadCount }})</span>
                            <el-progress :show-text="false"
                                         :percentage="$toFixed(s.CuttingCount/s.UploadCount, 0, 0)"
                                         :color="customColors"/>
                        </div>
                        <div class="progress-item">
                            <span>阅卷进度({{ s.MarkingCount }}/{{ s.TaskCount }})</span>
                            <el-progress :show-text="false"
                                         :percentage="$toFixed(s.MarkingCount/s.TaskCount, 0, 0)"
                                         :color="customColors"/>
                        </div>
                    </el-card>
                </div>
            </el-collapse-item>
        </el-collapse>

        <el-pagination v-show="examinfoList.length > 0 && page.TotalPageNumber > 1"
                       layout="prev, pager, next"
                       class="mt1"
                       @current-change="onCurrentPageChange"
                       :current-page="query.PageNumber"
                       :page-size="query.PageSize"
                       :total="page.TotalCount"/>

        <SubjectSelector ref="subjectSelector" @ok="onSubjectSelected"/>
        <StudentSelector ref="studentSelector" @ok="onStudentSelected"/>
    </section>
</template>


<script>
    // 扫描进度 = ScanCount / CandidateCount
    // 上传进度 = UploadCount / ScanCount
    // 切割进度 = CuttingCount / UploadCount
    // 阅卷进度 = MarkingCount / TaskCount

    import SubjectSelector from '../../components/SubjectSelector.vue';
    import StudentSelector from '../../components/StudentSelector.vue';

    export default {
        components: {SubjectSelector, StudentSelector},
        data () {
            return {
                query: {
                    PageNumber: 1,
                    PageSize: 20,
                    SchoolID: undefined
                },
                page: {},
                customColors: [
                    {color: '#f56c6c', percentage: 30},
                    {color: '#e6a23c', percentage: 60},
                    {color: '#5cb87a', percentage: 100}
                ],
                schoolList: [],
                examinfoList: []
            }
        },
        created () {
            this._collapsed = [];
            this.loadSchools();
        },
        methods: {
            loadSchools() {
                this.$httpGet('/api/schools')
                    .then(res => {
                        this.schoolList = res;
                        this.query.SchoolID = res[0].AutoID;
                        this.loadExams();
                    });
            },
            loadExams() {
                this.$httpGet('/api/exams', this.query)
                    .then(res => {
                        if (res.Status === 'success') {
                            this.examinfoList = res.ResultSet;
                            this.page = res.Paging;
                        }
                    });
            },
            loadSubjectList(examId) {
                if (typeof examId === 'undefined') {
                    return;
                }
                this.$httpGet(`/api/exam/${examId}/subjects`)
                    .then(res => {
                        let exam = this.examinfoList.find(exma => exma.AutoID === examId);
                        this.$set(exam, 'subjectList', res);
                    });
            },
            onSchoolChange () {
                this.query.PageNumber = 1;
                this.loadExams();
            },
            onCollapseChange (examIds) {
                if (examIds && examIds.length) {
                    examIds.forEach(examId => {
                        if (this._collapsed.findIndex(i => i === examId) === -1) {
                            console.log(this._collapsed, examIds);
                            this.loadSubjectList(examId);
                        }
                    });
                }
                this._collapsed = examIds;
            },
            onRefresh(e, exam) {
                e.stopPropagation();
                this.loadSubjectList(exam.AutoID);
            },
            onAddSubject(e, exam) {
                e.stopPropagation();
                this.$httpGet(`/api/exam/${exam.AutoID}/subjects`)
                    .then(res => {
                        let selected = res.map(i => i.SubjectID);
                        this._currentExam = exam;
                        this.$refs.subjectSelector.show(selected, true);
                    });
            },
            onAddCandidate(e, exam) {
                e.stopPropagation();
                this.$refs.studentSelector.show();
            },
            onSubjectSelected (boxes) {
                this.$httpPut(`/api/exam/${this._currentExam.AutoID}/subjects`, boxes.add)
                    .then(() => {
                        this.$message({message: '科目增加成功!', type: 'success'});
                        this.loadSubjectList(this._currentExam.AutoID);
                    });
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
            },

            onCurrentPageChange(PageNumber) {
                this.query.PageNumber = PageNumber;
                this.loadExams();
            },
            onCreateExam() {
                window.location.href = `./exam-creation.html?s=${this.query.SchoolID}`;
            },
            onSubjectOperation ({subject, operation}) {
                this['on' + operation](subject);
            },
            // ------------------------------------------------------- 科目操作
            onStartCut(subject) {
            },
            onStopCut(subject) {
            },
            onResetCut(subject) {
            },
            onRedoStatistics(subject) {
            },
            onDeleteSubject(subject) {
                this.$httpDelete(`/api/exam/subject/${subject.AutoID}`)
                    .then(res => {
                        this.loadSubjectList(subject.ExamID);
                        this.$message({type: 'success', message: '删除成功!'});
                    });
            }
            // -------------------------------------------------------
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