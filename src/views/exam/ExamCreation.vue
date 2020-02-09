<template>
    <section class="e-main">
        <div class="e-header">创建考试</div>

        <el-form :rules="rules"
                 ref="form"
                 :model="examInfo"
                 label-width="90px"
                 label-position="top"
                 class="mt2 ml1 form">
            <el-row :gutter="80">
                <el-col :span="14">
                    <el-form-item label="学校信息" prop="SchoolID">
                        <el-select v-model="examInfo.SchoolID" style="width:100%;" filterable>
                            <el-option v-for="s in schoolList"
                                       :key="s.AutoID"
                                       :label="s.Name"
                                       :value="s.AutoID"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时间">
                        <el-date-picker type="date"
                                        v-model="examInfo.date1"
                                        style="width: 100%;"/>
                    </el-form-item>
                    <el-form-item label="考试名称" prop="Name">
                        <el-input v-model="examInfo.Name"/>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="年级">
                        <el-cascader v-model="examInfo.grade"
                                     :options="gradeList"
                                     style="width: 100%;"/>
                    </el-form-item>
                    <el-form-item label="文理科">
                        <el-select v-model="examInfo.classType" style="width:100%;">
                            <el-option value="1" label="文科"></el-option>
                            <el-option value="2" label="理科"></el-option>
                            <el-option value="3" label="不分文理"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="扫描模式">
                        <el-radio-group v-model="examInfo.scanType" style="width: 100%;">
                            <el-radio label="1">先阅后扫</el-radio>
                            <el-radio label="2">先扫后阅</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="考试科目" prop="Subjects">
                <el-checkbox-group v-model="examInfo.Subjects">
                    <el-checkbox v-for="s in subjects"
                                 :key="s.AutoID"
                                 :label="s.AutoID">
                        {{ s.Name }}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="submiting" @click="onCreateExam">
                    创建考试并选择考生
                </el-button>
            </el-form-item>
        </el-form>

    </section>
</template>

<script>
    export default {
        data () {
            return {
                submiting: false,
                examInfo: {
                    Subjects: [],
                    scanType: '2'
                },
                subjects: [],
                schoolList: [
                    {id: '1', name: '实验一小'},
                    {id: '2', name: '实验二小'},
                    {id: '3', name: '实验三小'}
                ],
                gradeList: [{ // TODO
                    value: 'gz',
                    label: '高中',
                    children: [{
                        value: 'g1',
                        label: '高一'
                    }, {
                        value: 'g2',
                        label: '高二'
                    }, {
                        value: 'g3',
                        label: '高三',
                    }]
                }, {
                    value: 'cz',
                    label: '初中',
                    children: [{
                        value: 'c1',
                        label: '初一'
                    }, {
                        value: 'c2',
                        label: '初二'
                    }, {
                        value: 'c3',
                        label: '初三',
                    }]
                }],
                rules: {
                    SchoolID: [
                        {required: true, message: '请选择学校',}
                    ],
                    Name: [
                        {required: true, message: '请填写考试名称',}
                    ],
                    Subjects: [
                        {type: 'array', required: true, message: '请至少选择一个科'}
                    ]
                }
            }
        },
        created () {
            this.examInfo.SchoolID = window.location.search.substring(3) - 0;
            this.loadSchools();
            this.loadSubjects();
        },
        methods: {
            loadSchools() {
                this.$httpGet('/api/schools').then(res => this.schoolList = res);
            },
            loadSubjects() {
                this.$httpGet('/api/subjects').then(res => this.subjects = res);
            },
            onSubjectSelected () {

            },
            onCreateExam () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
                    this.submiting = true;
                    this.$httpPost('/api/exam', this.examInfo)
                        .then(res => {
                            this.submiting = false;
                            window.location.href = `./exam-student.html?e=${res.AutoID}`;
                        });
                });
            }
        }
    }
</script>
<style scoped>
    .form {
        width: 900px;
    }
</style>
<style>
    .el-form-item__label {
        color: #222;
        font-weight: bold;
    }
</style>