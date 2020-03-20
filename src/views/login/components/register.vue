<template>
  <el-dialog class="reg_dialog" title="用户注册" :visible.sync="dialogFormVisible">
    <el-form :model="form" :rules="rules" ref="form">
      <!-- 文件上传结构代码 -->
      <el-form-item prop="avator" label="头像" :label-width="formLabelWidth">
        <el-upload
          class="avatar-uploader"
          :action="imgUpload"
          name="image"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item prop="nickname" label="昵称" :label-width="formLabelWidth">
        <el-input v-model="form.nickname" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱" :label-width="formLabelWidth">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="phone" label="手机" :label-width="formLabelWidth">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" :label-width="formLabelWidth">
        <el-input v-model="form.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- 分栏偏移 -->
      <el-form-item prop="imgcode" label="图形码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input v-model="form.imgcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <img @click="changeImg" class="el_img" :src="imgUrl" alt />
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item prop="code" label="验证码" :label-width="formLabelWidth">
        <el-row>
          <el-col :span="17">
            <el-input :offset="1" v-model="form.code " autocomplete="off"></el-input>
          </el-col>
          <el-col :span="6" :offset="1">
            <el-button
              :disabled="time !== 0"
              plain
              @click="getCode"
            >{{ time === 0 ? '获取用户验证码' : '剩余:'+time + 'S' }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="onSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
// 导入外部封装的方法
import { apiGetCode,apiRegister } from "../../../api/register";
import {checkphone,checkemail} from "@/utils/mycheck.js"
export default {
  methods: {
    // 上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      // 将已上传好的文件显示到页面上
      this.imageUrl1 = URL.createObjectURL(file.raw);
      // avator 是祖册接口所必须的参数  要保存起来  就是头像的地址
      this.form.avator = res.data.file_path;
      this.$refs.form.validateField('avator');
    },
    // 上传之前的回调函数
    beforeAvatarUpload(file) {
      // 判断文件类型  上传的接口支持三种图片格式：jpg & png & gif
      const isJPG = file.type === "image/jpeg" || "image/png" || "image/gif";
      // 判断文件是否小于2M
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
   
    //  获取短信验证码
    getCode() {
      // 如果手机号不合法 获取短信按钮不能点
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
      if (!reg.test(this.form.phone)) {
        // 手机号如果不符合规则
        this.$message.error("手机号不合法");
        // 不执行后边的代码
        return;
      }
      // 判断验证码是否合法
      if(this.form.imgcode.trim().length !== 4){
        return this.$message.error('验证码不合法')
      }
      this.time = 60;
      this.timer = setInterval(() => {
        if (this.time > 0) {
          this.time--;
        }
        if (this.time == 0) {
          // 清除计时器
          clearInterval(this.timer);
        }
      }, 100);
      apiGetCode({
        code: this.form.imgcode,
        phone: this.form.phone
      }).then(res => {
        // window.console.log(res);
        // 为了解决重复注册
        if(res.data.code == 200){
          // 模拟输出手机验证码
          this.$message.success('手机验证码为:' + res.data.data.captcha)
        }else{
          this.$message.error(res.data.message)
        }
      });
    },
    //   更改图片验证码
    changeImg() {
      this.imgUrl =
        process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now();
    },
    cancel() {
      // 重置表单
      this.$refs.form.resetFields();
      // 清除图片
      this.imageUrl1 = ''
      // 隐藏表单
      this.dialogFormVisible = false;
    },
    onSubmit() {
      //调用form表单的validate方法,检验参数的合法性
      this.$refs.form.validate(valid => {
        if (valid) {
          // this.$message({
          //   message: "验证通过",
          //   type: "success"
          // });
        apiRegister({
          username:this.form.nickname,
          phone:this.form.phone,
          email:this.form.email,
          avatar:this.form.avator,
          password:this.form.password,
          rcode:this.form.code
        }).then(res=>{
          if(res.data.code == 200){
            this.$message.success('注册成功')
            // 关闭注册面板
            this.dialogFormVisible = false
            // 重置面板
            this.$refs.form.resetFields()
            this.imageUrl1 = ''
          }else{
            this.$message.error(res.data.message)
          }
        })
        } else {
          this.$message("验证不通过");
        }
      });
    }
  },
  data() {
    return {
      imgUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms&t=" + Date.now(), // 时间戳,
      dialogFormVisible: false,
      rules: {
        // 非空验证
        avator: [{ required: true, message: "头像不能为空", trigger: "blur" }],
        nickname: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 5, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: checkemail,
            trigger: "blur"
          }
        ],
        phone: [
          { required: true, message: "手机不能为空", trigger: "blur" },
          { validator: checkphone, trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        imgcode: [
          { required: true, message: "图片验证码不能为空", trigger: "blur" },
          { min: 4, max: 4, message: "长度是 4 个字符", trigger: "blur" }
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "blur" },
          { min: 4, max:4 , message: "长度在 4 个字符", trigger: "blur" }
        ]
      },
      form: {
        nickname: "",
        email: "",
        phone: "",
        password: "",
        imgcode: "",
        code: "",
        avator: "" //头像属性
      },

      //   获取验证码倒计时
      time: 0,
      //   计时器
      timer: null,
      formLabelWidth: "67px",
      imgUpload: process.env.VUE_APP_URL + `/uploads`,
      imageUrl1: null
    };
  }
};
</script>
<style lang="less">
.reg_dialog {
  .el-dialog__header {
    height: 53px;
    padding: 0;
    background: linear-gradient(to right, #0dc1ef, #1394fc);
    text-align: center;
    line-height: 53px;
    .el-dialog__title {
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(254, 254, 254, 1);
    }
  }
  .el_img {
    height: 41px;
    width: 143px;
  }
  .dialog-footer {
    text-align: center;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>