<template>
    <div class="register">
        <section class="form_container">
            <div class="manage_tip">
                <span class="title">你大爷后台管理</span>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px" class="registerForm">
                    <el-form-item label="用户名:" prop="username">
                        <el-input type="text" v-model="ruleForm.username" placeholder="请输入用户名"></el-input>
                    </el-form-item>

                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" class="submit_btn" @click="submitForm('ruleForm')">提交</el-button>

                    </el-form-item>
                </el-form>
            </div>
        </section>
    </div>
</template>

<script>
    import qs from 'qs'
    export default {
        name: "Register",
        data() {
            // var checkAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('年龄不能为空'));
            //     }
            //     setTimeout(() => {
            //         if (!Number.isInteger(value)) {
            //             callback(new Error('请输入数字值'));
            //         } else {
            //             if (value < 18) {
            //                 callback(new Error('必须年满18岁'));
            //             } else {
            //                 callback();
            //             }
            //         }
            //     }, 1000);
            // };
            // var validatePass = (rule, value, callback) => {
            //     if (value === '') {
            //         callback(new Error('请输入密码'));
            //     } else {
            //         if (this.ruleForm.checkPass !== '') {
            //             this.$refs.ruleForm.validateField('checkPass');
            //         }
            //         callback();
            //     }
            // };

            return {
                ruleForm: {
                    username:'',
                    password: '',

                },
                rules: {
                    password: [
                        { required:true,message:"密码不能为空", trigger: 'blur' },
                        {
                            min:6,max:30,message: '长度6到30之间',trigger:'blur'
                        }
                    ],
                    username: [
                        {
                            required:true,message:"用户名不能为空",trigger:'blur'
                        },{
                            min:2,max:30,message: '长度2到30之间',trigger:'blur'
                        }
                    ]

                }
            };
        },
        methods:{
            submitForm(formName){
              // console.log(formname)
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/api/user/login',qs.stringify(this.ruleForm)).then(res=>{
                            // console.log(res.data.data)
                            const { token } = res.data.data
                            // const { username,id } = res.data.data
                            // console.log(token)
                            // this.$message({
                            //     message:'登录成功',
                            //     type:'success'
                            // });
                            localStorage.setItem('eleToken',token)
                            localStorage.setItem('user',JSON.stringify(res.data.data))
                            this.$store.dispatch('setAuthenticated',!this.isEmpty(token))
                            this.$store.dispatch('setUser',res.data.data)
                            // console.log(this.$store.getters.user)
                            this.$router.replace('/index')
                        }).catch(err=>{
                            console.log(err)
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            isEmpty(value){
                return (
                    value ===undefined ||
                    value ===null ||
                    (typeof value === 'object'&& Object.keys(value).length===0)  ||
                    (typeof value === 'string'&& value.trim().length===0)
                );
            }
        },

    }
</script>

<style scoped>
.register{
    position: relative;
    width: 100%;
    height: 100%;
    background: url("../assets/222.jpg") no-repeat center center;
    background-size: 100% 100%;
}
    .form_container{
        width: 370px;
        height: 210px;
        position: absolute;
        top: 10%;
        left: 34%;
        padding: 25px;
        border-radius: 5px;
        text-align: center;
    }
    .form_container .manage_tip .title{
        /*font-family: 'Microsoft YaHei';*/
        font-weight: bold;
        font-size: 26px;
        color: #fff;
    }
    .registerForm {
        margin-top: 20px;
        background-color: #fff;
        padding: 20px 40px 20px 20px;
        border-radius: 5px;
        box-shadow: 0px 5px 10px #cccc;
    }

    .submit_btn {
        width: 100%;
    }
</style>
