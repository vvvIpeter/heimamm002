<template>
<div class="index">
<el-container class="box">
    <!-- 头部 左右两部分 -->
  <el-header>
<div class="left">
    <i class="el-icon-s-fold"></i>
    <img src="../../assets/titlelogo.png" alt="">
    <span>黑马面面</span>
</div>
<div class="right">
    <img src="../../assets/logo.png" alt="">
    <span class="word">李达,你好</span>
    <el-button>退出</el-button>
</div>


  </el-header>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-main>Main</el-main>
  </el-container>
</el-container>
</div>
</template>
<script>
import {apiInfo} from '@/api/index.js'
export default {
    created(){
        // 一进入首页 获取用户信息并在header中 显示
        apiInfo().then(res=>{
            window.console.log(res)
        })

    }
}
</script>
<style lang="less">
.index,
.box
{
    height: 100%;
}
  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    display: flex;
    justify-content:  space-between;
    align-items: center;
    .left{
        display: flex;
        align-items: center;
        i{
            font-size: 24px;
            cursor: pointer;
            margin-right: 22px;
        }
          img {
            width: 33px;
            height: 28px;
            margin-right: 11px;
        }
          span {
            font-size: 22px;
            color: #49A1FF;
        }
    }
    .right{
        display: flex;
        align-items: center;
        img{
             width: 43px;
            height: 43px;
            border-radius: 50%;
            margin-right: 9px;
        }
        .word{
             font-size: 14px;
            color: black;
            margin-right: 38px;
        }
    }
  }
    .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
 
</style>