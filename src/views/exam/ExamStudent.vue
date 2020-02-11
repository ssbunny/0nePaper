<template>
    <section class="e-main">
        <div class="e-header">选择考生</div>

        <Alert class="mt2">
            {{ examInfo.Name }}
            <template slot="desc">
                <span>考试时间：{{ examInfo.date }}</span>
                <span class="ml1"> {{ examInfo.date }}</span>
                TODO
            </template>
        </Alert>

        <Table :loading="loading"
               class="mt1"
               @on-selection-change="onSelectionChange"
               :columns="columns"
               :data="students" max-height="500">
        </Table>

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
                loading: false,
                examInfo: {},
                students: [],
                columns: [],
                btnLoading: false,
                btnDisabled: true
            }
        },
        created () {
            this.examId = window.location.search.substring(3) - 0;
            this.loadExamInfo();
        },
        methods: {
            loadExamInfo () {
                this.$httpGet(`/api/exam/${this.examId}`)
                    .then(res => {
                        this.examInfo = res;
                        this.loadStudents();
                    });
            },
            loadStudents () {
                this.loading = true;

                Promise.all([
                    this.$httpGet(`api/exam/${this.examId}/candidates`),
                    this.$httpGet(`/api/school/${this.examInfo.SchoolID}/students`)
                ]).then(res => {
                    let selected = res[0];
                    let all = res[1];

                    // 设置初始已经选中的考生
                    let setSelected = function (item) {
                        for (let i = 0, len = selected.length; i < len; ++i) {
                            if (selected[i].StudentID === item.AutoID) {
                                item._checked = true;
                            }
                        }
                    };
                    for (let i = 0, len = all.length; i < len; ++i) {
                        setSelected(all[i]);
                    }

                    // 创建列表的 filters 数组
                    let filters = this.$collection.nest()
                        .key(i => i.ClassName)
                        .entries(all)
                        .map(i => {
                            return {label: i.key, value: i.key};
                        });

                    // columns
                    this.columns = [
                        {type: 'selection', width: 60, align: 'center'},
                        {
                            title: '班级', key: 'ClassName', sortable: true, width: 180,
                            filters: filters,
                            filterMethod (value, row) {
                                return row.ClassName.indexOf(value) > -1;
                            }
                        },
                        {title: '姓名', key: 'Name', sortable: true, width: 120},
                        {title: '班级注册号', key: 'RollNo', sortable: true, minWidth: 220},
                    ];

                    this.students = all;
                    this.loading = false;
                });
            },
            onSelectionChange (selection) {
                this.candidates = selection;
                this.btnDisabled = !(this.candidates && this.candidates.length);
            },
            onStudentSelected () {
                let data = this.candidates.map(c => {
                    return {
                        "Name": c.Name,
                        "RollNo": c.RollNo,
                        "StudentID": c.AutoID
                    };
                });
                this.btnLoading = true;
                this.$httpPut(`/api/exam/${this.examId}/candidates`, data)
                    .then(() => {
                        this.btnLoading = false;
                        window.location.href = `./exam-list.html`;
                    });
            }
        }
    }
</script>
<style scoped>

</style>
<style>

</style>