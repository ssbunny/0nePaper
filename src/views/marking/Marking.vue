<template>
    <section class="full">
        <div class="e-header">
            <span>阅卷</span>
            <div class="menu">
                <el-button size="mini" @click="onChangeQuestion" type="primary" icon="el-icon-files">切换题目</el-button>
                <el-button size="mini" @click="moveCenter" type="primary" icon="el-icon-files">居中</el-button>
                <el-dropdown class="ml1">
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
        </div>

        <!-- 画布区域 -->
        <div ref="canvasWraper" class="canvas protect-eye">
            <!-- 批注区 -->
            <!--<Comment/>-->
        </div>

        <ChangeQuestion ref="question" @ok="onChangeQuestionOK"/>
    </section>
</template>

<script>
    import ChangeQuestion from './ChangeQuestion.vue';
    //    import Comment from './Comment.vue';

    export default {
        components: {ChangeQuestion},
        data () {
            return {
                canvasWidth: 100,
                canvasHeight: 100
            }
        },
        created () {
            this._initPosition = {};  // 居中位置
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
                let imageAspect = 888 / 142;  // TODO 从服务端获取图片比例

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
                        image: 'putong.png', // TODO
                        x: (cw - iw) * .5,
                        y: (ch - ih) * .5,
                        width: iw,
                        height: ih
                    }
                });
                this._zr.add(this._paper);
                console.log(this._paper.transform);
            },
            moveCenter () {
                // 按说是应该移动到 0,0 的，但是 zrender 的 drag 有 bug
                this._paper.attr('position', [1, 1]);
            },
            onChangeQuestion () {
                this.$refs.question.show();
            },
            onChangeQuestionOK (questionId) {
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

    .canvas {
        position: relative;
        height: calc(100vh - 42px);
        background-color: #FFF;
        overflow: hidden;
    }

    .canvas.protect-eye {
        background-color: #CCE8CF;
    }

    .menu {
        float: right;
    }
</style>