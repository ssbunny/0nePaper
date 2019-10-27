<template>
    <section class="full">
        <header class="e-header">
            <span>阅卷</span>
            <div class="menu mr1">
                <el-button size="mini" @click="onChangeQuestion" type="primary" icon="el-icon-files">切换题目</el-button>
                <el-button size="mini" @click="moveCenter" type="primary" icon="el-icon-files">居中显示</el-button>
                <el-dropdown class="ml1" style="display: none">
                    <el-button type="primary" size="mini">
                        更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>切换题目</el-dropdown-item>
                        <el-dropdown-item>切换题目</el-dropdown-item>
                        <el-dropdown-item>切换题目</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </header>

        <!-- 画布区域 -->
        <main class="container">
            <div ref="canvasWraper" :class="`canvas ${isProtectEye?'protect-eye':''}`">
                <!-- 批注区 -->

            </div>
            <ToolMark @confirmchange="onMarkConfirmchange" :isConfirm="isMarkSubmitConfirm"/>
        </main>

        <footer class="status-bar">
            <span class="mr1">{{ title }}</span>
            <div class="fr" style="cursor: pointer">
                <span @click="isProtectEye=!isProtectEye"
                      :style="`color:${isProtectEye?'#009600':'#9a9391'}`">
                    护眼模式({{ isProtectEye?'开':'关'}}):
                    <i v-show="isProtectEye"  class="el-icon-open"></i>
                    <i v-show="!isProtectEye" class="el-icon-turn-off"></i>
                </span>
                <span @click="isMarkSubmitConfirm=!isMarkSubmitConfirm"
                      class="ml1"
                      :style="`color:${isMarkSubmitConfirm?'#009600':'#9a9391'}`">
                    分数确认({{ isMarkSubmitConfirm?'开':'关'}}):
                    <i v-show="isMarkSubmitConfirm"  class="el-icon-open"></i>
                    <i v-show="!isMarkSubmitConfirm" class="el-icon-turn-off"></i>
                </span>
            </div>
        </footer>

        <ChangeQuestion ref="question" @ok="onChangeQuestionOK"/>
    </section>
</template>

<script>
    import ChangeQuestion from './ChangeQuestion.vue';
    import ToolMark from './ToolMark.vue';
    //    import Comment from './Comment.vue';

    const MAX_SCALE = 3;
    const MIN_SCALE = 0.5;

    export default {
        components: {ChangeQuestion, ToolMark},
        data () {
            return {
                isProtectEye: true,
                isMarkSubmitConfirm: true,
                title: '济南市第十四中学 [2019-07-20]2019年七月份月考九年级 - 文科） 数学 一 正常卷' // TODO
            }
        },
        created () {
        },
        mounted () {
            this.initCanvas();
            this.loadPaper();
        },
        methods: {
            initCanvas () {
                this._zr = zrender.init(this.$refs.canvasWraper, {
                    renderer: 'canvas',
                    devicePixelRatio: 2 // 便于 Retina 屏显示
                });
            },
            // 加载试卷
            loadPaper () {
                let imageAspect = 910 / 1140;  // TODO 从服务端获取图片比例

                let cw = this.$refs.canvasWraper.clientWidth;
                let ch = this.$refs.canvasWraper.clientHeight;

                let screenAspect = cw / ch;
                let iw = 0;
                let ih = 0;

                if (imageAspect >= screenAspect) {
                    iw = cw * .8;
                    ih = iw / imageAspect;
                } else {
                    ih = ch * .8;
                    iw = ih * imageAspect;
                }

                this._paper = new zrender.Image({
                    draggable: true,
                    style: {
                        image: 'zuowen.png', // TODO
                        x: (cw - iw) * .5,
                        y: (ch - ih) * .5,
                        width: iw,
                        height: ih
                    }
                });
                this._zr.add(this._paper);
            },
            moveCenter () {
                // 按说是应该移动到 0,0 的，但是 zrender 的 drag 有 bug
                // 返回到 0,0 时，外包矩阵算的不对。
                this._paper.attr('position', [.1, .1]);
            },
            scaleUp () {

            },
            onChangeQuestion () {
                this.$refs.question.show();
            },
            onChangeQuestionOK (questionId, pathNodes) {
                let title = pathNodes.map(node => node.label);
                this.title = title.join(' ');
            },
            // 打分是否确认的状态改变
            onMarkConfirmchange (checked) {
                this.isMarkSubmitConfirm = !checked;
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
        height: calc(100vh - 42px - 40px);
        background-color: #FFF;
        overflow: hidden;
    }

    .container .tool {
        position: absolute;
        background-color: #f7f7f7;
        box-shadow: 2px 2px 10px #888888;
        padding: 10px;
        border: 1px solid #afafaf;
    }

    .container .canvas {
        width: 100%;
        height: 100%;
    }

    .container .canvas.protect-eye {
        background-color: #CCE8CF;
    }

    .status-bar {
        height: 39px;
        line-height: 39px;
        font-size: 13px;
        padding: 0 20px;
        background-color: #EEE;
        border-top: 1px solid #d6d6d6;
    }


</style>