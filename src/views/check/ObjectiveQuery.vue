<template>
    <el-dialog title="客观题查询" :visible.sync="isShow" width="600px">
        <el-form ref="form"
                 size="medium"
                 style="margin: 10px;"
                 label-width="70px">
            <el-form-item label="学校">
                <el-select placeholder="请选择" style="width: 90%">
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="考试">
                <el-select placeholder="请选择" style="width: 90%">
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="科目">
                <el-select placeholder="请选择" style="width: 90%">
                    <el-option></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="mode==='1'" label="条件">
                <el-input style="width: 90%">
                    <el-select value="1" style="width: 100px" slot="prepend" placeholder="请选择">
                        <el-option label="考号" value="1"></el-option>
                        <el-option label="试卷号" value="2"></el-option>
                        <el-option label="姓名" value="3"></el-option>
                    </el-select>
                </el-input>
            </el-form-item>
            <el-form-item v-if="mode==='2'" label="时间">
                <el-date-picker style="width: 90%"
                                type="datetimerange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item v-if="mode==='2'" label="连续#数">
                <el-input style="width: 90%"></el-input>
            </el-form-item>
            <el-form-item v-if="mode==='2'">
                <el-checkbox>不查询缺考卷</el-checkbox>
            </el-form-item>
            <el-form-item>
                <el-button size="mini" type="primary" icon="el-icon-search">查询</el-button>
                <el-button @click="mode = '1'" size="mini" type="warning" icon="el-icon-place" plain>精确查询</el-button>
                <el-button @click="mode = '2'" size="mini" type="warning" icon="el-icon-tickets" plain>模糊查询</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    export default {
        data () {
            return {
                isShow: false,
                mode: '1' // 1: 精确查询  2: 模糊查询
            }
        },
        created () {
        },
        mounted () {
        },
        methods: {
            show () {
                this.isShow = true;
            },
        }
    }
</script>
<style scoped>

</style>