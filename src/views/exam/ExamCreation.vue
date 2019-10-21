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
                    <el-form-item label="学校信息" prop="schoolId">
                        <el-select v-model="examInfo.schoolId" style="width:100%;" filterable>
                            <el-option v-for="s in schoolList"
                                       :key="s.id"
                                       :label="s.name"
                                       :value="s.id"/>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时间">
                        <el-date-picker type="date"
                                        v-model="examInfo.date1"
                                        style="width: 100%;"/>
                    </el-form-item>
                    <el-form-item label="考试名称">
                        <el-input/>
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

            <el-form-item label="考试科目">
                <el-checkbox-group v-model="examInfo.todo">
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                    <el-checkbox label="复选框 A"></el-checkbox>
                    <el-checkbox label="复选框 B"></el-checkbox>
                    <el-checkbox label="复选框 C"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onCreateExam">创建考试并选择考生</el-button>
            </el-form-item>
        </el-form>


        <SubjectSelector ref="subjectSelector" @ok="onSubjectSelected"/>
    </section>
</template>


<script>
    import SubjectSelector from '../../components/SubjectSelector.vue';

    export default {
        components: {
            SubjectSelector
        },
        data () {
            return {
                examInfo: {
                    todo: [],
                    scanType: '2'
                },
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
                    schoolId: [
                        {required: true, message: '请选择学校',}
                    ],
                }
            }
        },
        created () {
        },
        methods: {
            onSubjectSelected () {

            },
            onCreateExam () {
                this.$refs.form.validate((valid) => {
                    if (!valid) {
                        return;
                    }
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