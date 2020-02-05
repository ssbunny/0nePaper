<template>
    <section class="full">
        <header class="e-header">
            <span>客观题校验</span>
            <div class="menu mr1">
                <el-button size="mini" @click="onReCheck" type="primary" icon="el-icon-files">重新识别</el-button>
                <el-button size="mini" @click="onSave" type="primary" icon="el-icon-files">保存校验结果</el-button>
            </div>
        </header>

        <main class="container">
            <div class="query-grid">
                <div style="text-align: right;margin: 10px 20px">
                    <el-button size="mini" type="warning" @click="onQuery" icon="el-icon-search">查询</el-button>
                </div>
                <el-table :data="tableData"
                          highlight-current-row
                          @current-change="onTableRowChange"
                          style="width: 100%;border-top: 1px solid #cfcfcf">
                    <el-table-column property="code" label="试卷号" width="90"/>
                    <el-table-column property="num" label="考号"/>
                    <el-table-column property="date" label="页码" width="60"/>
                    <el-table-column property="date" label="卷型" width="60"/>
                    <el-table-column property="date" width="80">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" icon="el-icon-delete">清空</el-button>
                        </template>
                    </el-table-column>
                </el-table>

                <!--<el-button circle size="mini" type="primary" class="caret" icon="el-icon-caret-left"/>-->
            </div>
        </main>

        <ObjectiveQuery ref="query"/>
    </section>
</template>

<script>
    import ObjectiveQuery from './ObjectiveQuery.vue';

    export default {
        components: {ObjectiveQuery},
        data () {
            return {
                tableData: [
                    {code: 80239381, num: 101212222},
                    {code: 80239381, num: 101212222},
                    {code: 80239381, num: 101212222},
                    {code: 80239381, num: 101212222},

                ],
            }
        },
        created () {
        },
        mounted () {
            this.initCanvas();
        },
        methods: {
            initCanvas () {
                this._zr = zrender.init(this.$refs.canvasWraper, {
                    renderer: 'canvas',
                    devicePixelRatio: 2 // 便于 Retina 屏显示
                });
            },
            onTableRowChange () {

            },
            onReCheck () {

            },
            onSave () {
            },
            onQuery () {
                this.$refs.query.show();
            }
        }
    }
</script>
<style scoped>
    .full {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .menu {
        float: right;
    }

    .container {
        position: relative;
        height: calc(100vh - 42px);
        background-color: #FFF;
        overflow: hidden;
    }

    .container .query-grid {
        float: left;
        width: 400px;
        height: 100%;
        background-color: #f6f6f6;
        position: relative;
        border-right: 1px solid #cfcfcf;
        overflow: auto;
    }

    .container .caret {
        position: absolute;
        right: 10px;
        top: 20px;
        font-size: 20px;
        color: #888888;
    }

    .container .canvas {
        width: 100%;
        height: 100%;
    }
</style>