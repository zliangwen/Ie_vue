<template>
    <div class="dialog" v-show="showMask">
        <div class="dialog-container">
            <div class="dialog-img" v-if="type == 'error' || type == 'success'" >
                <img src="../../images/btns/error.png" v-if="type == 'error'"/>
                <img src="../../images/btns/success.png" v-if="type == 'success'"/>
            </div>
            <div class="dialog-title" v-if="title != ''" style="margin-top:20px;">{{title}}</div>
            <div class="content" v-html="content" v-if="content != ''"></div>
            <div class="btns">
                <div v-if="type == 'danger' || type == 'error' || type == 'confirm'" class="default-btn"  @click="closeBtn">
                    {{cancelText}}
                </div>
                <div v-if="type == 'danger'" class="danger-btn" @click="dangerBtn">
                    {{dangerText}}
                </div>
                <div v-if="type == 'confirm'" class="confirm-btn" @click="confirmBtn">
                    {{confirmText}}
                </div>
                <div v-if="type == 'success'" class="success-btn" @click="successBtn">
                    {{successText}}
                </div>
                <div v-if="type == 'error'" class="error-btn" @click="errorBtn">
                    {{errorText}}
                </div>
            </div>
            <div class="close-btn" @click="closeMask"><i class="iconfont icon-close"></i></div>
        </div>
        
    </div>
</template>
<script>
export default {
    props: {
        value: {},
        // 类型包括 defalut 默认， danger 危险， confirm 确认，
        type:{
            type: String,
            default: 'default'
        },
        content: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        dangerText: {
            type: String,
            default: '删除'
        },
        confirmText: {
            type: String,
            default: '确认'
        },
        successText:{
            type: String,
            default: '好的'
        },
        errorText:{
            type: String,
            default: '确认'
        }
    },
    data(){
        return{
            showMask: false,
        }
    },
    methods:{
        closeMask(){
            this.showMask = false;
        },
        closeBtn(){
            this.$emit('cancel');
            this.closeMask();
        },
        dangerBtn(){
            this.$emit('danger');
            this.closeMask();
        },
        confirmBtn(){
            this.$emit('confirm');
            this.closeMask();
        },
        successBtn(){
            this.$emit('success');
            this.closeMask();
        },
        errorBtn(){
            this.$emit('error');
            //this.closeMask();
        }
    },

    mounted(){
        this.showMask = this.value;
    },
    watch:{
        value(newVal, oldVal){
            this.showMask = newVal;
        },
        showMask(val) {
            this.$emit('input', val);
        }
    },
}
</script>
<style lang="less" scoped>
    img{
        display: block;
    }
    .dialog{
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999;
        .dialog-container{
            width: 300px;
            height: 200px;
            background: #ffffff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 8px;
            position: relative;
            overflow: hidden;
            .dialog-img{
                width:40px;
                height:40px;
                margin:10px auto 0;
            }
            .dialog-title{
                width: 100%;
                font-size: 16px;
                color: #696969;
                font-weight: 500;
                text-align: center;
                box-sizing: border-box;
            }
            .content{
                color: #797979;
                font-size: 12px;
                padding:10px 10% 0;
                box-sizing: border-box;
                text-align:left;
            }
            .inp{
                margin: 10px 0 0 20px;
                width: 200px;
                height: 40px;
                padding-left: 4px;
                border-radius: 4px;
                border: none;
                background: #efefef;
                outline: none;
                &:focus{
                    border: 1px solid #509EE3;
                }
            }
            .btns{
                width: 100%;
                // line-height: 60px;
                position: absolute;
                bottom: 20px;
                left: 0;
                text-align: right;
                padding: 0 16px;
                box-sizing: border-box;
                & > div{
                    display: block;
                    height: 30px;
                    line-height: 30px;
                    width:80px;
                    text-align: center;
                    color: #ffffff;
                    background: #f1f1f1;
                    border-radius: 4px;
                    font-size: 14px;
                    cursor: pointer;
                }
                .default-btn{
                    color: #787878;
                    float:left;
                    &:hover{
                        color: #509EE3; 
                    }
                }
                .danger-btn{
                    background: #EF8C8C;
                    &:hover{
                        background: rgb(224, 135, 135);
                    }
                    &:active{
                        background: #EF8C8C;
                    }
                }
                .confirm-btn{
                    color: #ffffff;
                    background: #509EE3;
                    float: right;
                    &:hover{
                        background: #6FB0EB;
                    }
                }
                .success-btn{
                    color:#fff;
                    background: red;
                    margin-right:34%;
                    float: right;
                    &:hover{
                         background: red;
                    }
                }
                .error-btn{
                    color:#fff;
                    background: red;
                    float: right;
                    &:hover{
                         background: red;
                    }
                }
            }
            .close-btn{
                position: absolute;
                top: 16px;
                right: 16px;
                width: 30px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                font-size: 18px;
                cursor: pointer;
                &:hover{
                    font-weight: 600;
                }
            }
        }
    }
</style>