<template>
    <div class="tool mark">
        <div class="tm-title">
            <i :class="markClass" class="icon"></i>
            <el-button-group class="fr">
                <el-button @click="markMode = 'keyboard'"
                           :class="markMode === 'keyboard'?'active':''"
                           size="mini">键
                </el-button>
                <el-button @click="markMode = 'mouse'"
                           :class="markMode === 'mouse'?'active':''"
                           size="mini" autofocus>鼠
                </el-button>
                <!--<el-button @click="markMode = 'comment'"-->
                <!--:class="markMode === 'comment'?'active':''"-->
                <!--size="mini">批-->
                <!--</el-button>-->
            </el-button-group>
        </div>

        <!-- 鼠 -->
        <div class="tm-content" v-show="markMode === 'mouse'">
            <div v-for="q,i in questions" :key="i">
                <div class="tm-mouse-label">
                    <i class="el-icon-tickets"></i>
                    <span class="tm-code">{{ i + 1 }}</span>
                    <span class="tm-total">(共 {{ q.total }} 分)</span>
                    <span class="tm-score">{{ scores[i] }}</span>
                </div>
                <div class="tm-mouse-scores">
                    <!-- TIP: 键盘模式时输入的是 string, 这里不要使用 `===` 来判断状态 -->
                    <span v-for="k in q.total+1"
                          :key="k - 1"
                          @click="$set(scores, i, k - 1)"
                          :class="scores[i]==(k - 1) ? 'active': ''"
                          class="tm-mouse-score">{{ k - 1 }}</span>
                </div>
            </div>
        </div>

        <!-- 键 -->
        <div class="tm-content" v-show="markMode === 'keyboard'">
            <div v-for="q,i in questions" :key="i">
                <div class="tm-keyboard-label">
                    <i class="el-icon-tickets"></i>
                    <span class="tm-code">{{ i + 1 }}</span>
                    <span class="tm-total">(共 {{ q.total }} 分)</span>
                    <label>
                        <input type="number" class="tm-score"
                               min="0" :max="q.total"
                               ime-mode="disabled"
                               v-model="scores[i]"
                               :class="`input-${i}`"
                               @keyup="onKeyboardScoreInput($event, i)"/>
                    </label>
                </div>
            </div>
        </div>

        <!-- 底部按钮区 -->
        <div class="tm-bottons">
            <el-button @click="onSubmit" type="primary" size="small">提交</el-button>
            <el-button class="fr" @click="onFillFull" type="success" size="small">满分</el-button>
            <el-button class="fr" @click="onFillZero" type="danger" size="small">零分</el-button>
        </div>


        <el-dialog title="分数确认" :visible.sync="isConfirmShow">
            <div class="score-confirm">{{ totalScore }} 分</div>
            <div slot="footer" style="text-align: center">
                <div style="margin-bottom: 15px">
                    <el-checkbox v-model="isConfirmChecked">不再进行分数确认提醒</el-checkbox>
                </div>
                <el-button type="primary" @click="onOK">确 定</el-button>
                <el-button @click="onCancel">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        props: {
            isConfirm: Boolean,
        },
        data () {
            return {
                markMode: 'mouse', // keyboard mouse
                isConfirmShow: false,
                isConfirmChecked: false,
                questions: [
                    {total: 3},
                    {total: 10},
                    {total: 5}
                ],
                scores: [],
                totalScore: undefined,
            }
        },
        watch: {
            isConfirm (val) {
                this.isConfirmChecked = !val;
            },
            scores (val) {
                console.log('000----',val);
            }
        },
        computed: {
            markClass() {
                return 'el-icon-' + {
                        mouse: 'mouse',
                        comment: 'edit',
                        keyboard: 'bank-card'
                    }[this.markMode];
            }
        },
        created () {
            //this.scores.fill(undefined, 0, this.questions.length);
        },
        methods: {
            onKeyboardScoreInput (event, index) {
                if (event.keyCode === 13) { // Enter
                    let next = document.querySelector(`.tm-score.input-${index + 1}`);
                    if (!next) {
                        next = document.querySelector(`.tm-score.input-0`);
                    }
                    next && next.focus();
                }
                // 输入时不超过最大最小分值
                let val = (event.srcElement || event.target).value;
                if (val !== '') {
                    if (val < 0) {
                        this.$set(this.scores, index, 0);
                    } else if (val > this.questions[index].total) {
                        this.$set(this.scores, index, this.questions[index].total);
                    }
                }
            },
            onSubmit () {
                if (!this.isConfirm) {
                    this.submitIt();
                    return;
                }
                let valid = this.validateScores();
                if (!valid) {
                    return;
                }
                this.totalScore = this.calcTotalScore();
                this.isConfirmShow = true;
            },
            onOK () {
                this.isConfirmShow = false;
                this.submitIt();
            },
            onCancel () {
                this.isConfirmShow = false;
            },
            onFillFull () {
                this.scores = this.questions.map(q => q.total);
            },
            onFillZero () {
                this.scores = this.questions.map(q => 0);
            },
            submitIt () {
                let valid = this.validateScores();
                if (!valid) {
                    return;
                }
                let totalScore = this.calcTotalScore();
                if (!totalScore) {
                    return;
                }
                // TODO
                this.$emit('confirmchange', this.isConfirmChecked);
            },
            calcTotalScore () {
                return this.scores.reduce((sum, item) => {
                    return (sum - 0) + (item - 0);
                });
            },
            validateScores() {
                if (!this.scores || !this.scores.length) {
                    this.$message.error('尚未填写分数！');
                    return false;
                }
                // TIP: Arrya 的 some/forEach 等方法，不会遍历 undefine/null/空串
                let someEmpty = false;
                for (let i = 0, len = this.scores.length; i < len; ++i) {
                    if (!this.scores[i] && this.scores[i] !== 0) {
                        someEmpty = true;
                        break;
                    }
                }
                if (someEmpty || this.questions.length !== this.scores.length) {
                    this.$message.error('分数填写不完整！');
                    return false;
                }
                return true;
            }
        }
    }
</script>
<style scoped>
    .container .tool.mark {
        width: 310px;
        top: 4px;
        right: 4px;
    }

    .tm-title {
        height: 34px;
    }

    .tm-title .icon {
        margin-top: 6px;
        color: #898989;
    }

    .tm-content {
        padding: 2px 8px;
        font-size: 13px;
        background-color: #FFF;
        border-radius: 5px;
    }

    .tm-mouse-label {
        height: 30px;
        line-height: 30px;
    }

    .tm-keyboard-label {
        height: 40px;
        line-height: 40px;
    }

    .tm-mouse-scores {
        margin-top: 4px;
        color: #444;
    }

    .tm-mouse-score {
        font-size: 14px;
        display: inline-block;
        width: 30px;
        text-align: center;
        height: 30px;
        cursor: pointer;
        border: 1px solid #a8cbde;
        background-color: #FFF;
        line-height: 30px;
        margin-right: 4px;
        margin-bottom: 4px;
    }

    .tm-mouse-score:hover {
        border: 1px solid #94b3c4;
        background-color: #f9f9f9;
    }

    .tm-mouse-score.active {
        border: 1px solid #8aa6b6;
        background-color: #94b3c4;
        color: #FFF;
    }

    .tm-code {
        display: inline-block;
        width: 30px;
        margin-left: 4px;
    }

    .tm-total {

    }

    .tm-score {
        color: #f20000;
        font-size: 17px;
        font-weight: bold;
        float: right;
        margin-right: 10px;
    }

    input.tm-score {
        border: none;
        border-bottom: 1px solid #d4d4d4;
        text-align: right;
        width: 50px;
        height: 30px;
        outline: none;
        padding-right: 10px;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }

    .tm-bottons {
        padding-top: 10px;
    }

    .tm-title .active {
        color: #2E6EB1;
        border-color: #c0d4e8;
        background-color: #eaf1f7;
    }

    .score-confirm {
        font-size: 40px;
        color: #f20000;
        font-weight: bold;
        text-align: center;
    }
</style>