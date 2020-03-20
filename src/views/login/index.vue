<template>
  <div class="login">
    <div class="leftBox">
      <div class="title">
        <img src="../../assets/titlelogo.png" alt />
        <span class="titlename">黑马面面</span>
        <span class="line"></span>
        <span class="titlelogin">用户登录</span>
      </div>
      <!-- 使用表单元素完成结构 -->

      <el-form :rules="rules" ref="form" :model="form" label-width="0px">
        <el-form-item prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号">
            <i slot="prefix" class="el-input__icon el-icon-user"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" placeholder="请输入密码">
            <i slot="prefix" class="el-input__icon el-icon-lock"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="logincode">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.logincode" placeholder="请输入验证码">
                <i slot="prefix" class="el-input__icon el-icon-key"></i>
              </el-input>
            </el-col>
            <el-col :span="8">
              <img @click="changeImg" class="loginCode" :src="imgUrl" alt />
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item prop="isCheck">
          <el-checkbox-group v-model="form.isCheck">
            <el-checkbox name="type">
              我已阅读和同意
              <el-link type="primary" :underline="false">用户协议</el-link>和
              <el-link type="primary" :underline="false">隐私条款</el-link>
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="loginBtn" @click="onSubmit">登录</el-button>
          <el-button type="primary" class="loginBtn" @click="btnRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="rightBox">
      <img src="../../assets/login_banner_ele.png" alt />
      <register ref="register"></register>
    </div>
  </div>
</template>
<script>
// 导入自定义校验规则
import { checkphone } from "@/utils/mycheck.js";
// 导入自定义 localStorage 方法
 import { setToken } from '@/utils/mytoken.js'
// 注册组件的使用
//1.导入
import register from "./components/register";
//2.注册
// 导入
import { apiLogin } from "../../api/login";

export default {
  //2,注册
  components: {
    register,
    
  },
  methods: {
    // 改变图片验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=login" + Date.now();
    },
    btnRegister() {
      // 注册按钮
      this.$refs.register.dialogFormVisible = true;
    },
    // 登录按钮触发校验规则
    onSubmit() {
      // form表单的验证方法
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$message({
          //   message: "验证通过",
          //   type: "success"
          // });
          // 将参数提交到服务器
          apiLogin({
            phone: this.form.phone,
            password: this.form.password,
            code: this.form.logincode
          }).then(res => {
            window.console.log(res);
            // 跳转页面  本地存储token   push('地址)
            this.$router.push('/index')
            // 保存token
            // window.localStorage.setItem("hmmm",res.data.data.token)
            //调用方法 将token保存起来
            setToken(res.data.data.token)
          });

        } else {
          this.$message.error("验证不通过");
        }
      });
    }
  },
  data() {
    return {
      //登录图片验证码
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=login" + Date.now(),
      // 添加验证规则
      rules: {
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        logincode: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          // 长度
          { min: 4, max: 4, message: "验证的长度应该为 4", trigger: "blur" }
        ],
        isCheck: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ]
      },
      form: {
        phone: "18511111111",
        password: "12345678",
        logincode: '',
        isCheck: []
      }
    };
  }
};
</script>
<style lang="less">
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .leftBox {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);
    padding: 48px 42px 86px;
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 30px;

      img {
        margin-right: 16px;
      }
      .titlename {
        font-size: 24px;
        font-family: SourceHanSansCN;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
        margin-right: 14px;
      }
      .line {
        display: inline-block;
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 14px;
      }
      .titlelogin {
        font-size: 22px;
        font-family: PingFangSC;
        font-weight: 400;
        color: rgba(12, 12, 12, 1);
      }
    }
    .loginBtn {
      width: 100%;
      margin-left: 0px;
      margin-top: 10px;
    }
    .loginCode {
      width: 100%;
      height: 40px;
    }
  }
}
</style>