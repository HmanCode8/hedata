<script setup>
import { ref } from 'vue';
import { User, Lock } from '@element-plus/icons-vue'
const loginFormData = ref({
    username: '',
    password: ''
});

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '用户名长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, max: 16, message: '密码长度在 6 到 16 个字符', trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 4, max: 4, message: '验证码长度为 4', trigger: 'blur' }
    ]
};

const handleLogin = () => {
    console.log(loginFormData.value);
};



</script>

<template>
    <div
        class="h-full w-full flex flex-col justify-center bg-[url('@/assets/images/login-bg.png')] bg-size bg-repeat items-center">
        <h2 class=" my-10 font-bold text-white text-3xl">管线数据库管理系统</h2>
        <div class="bg-white rounded-lg shadow-lg w-1/3 max-h-2/3  overflow-auto">
            <div class="w-full h-20 text-center mb-6  bg-[url('@/assets/images/logo.png')]  bg-repeat">
            </div>
            <el-form class="w-2/3 m-auto mt-10" :form="loginFormData" :rules="rules" label-width="auto">
                <el-form-item class="my-10 bg-transparent" prop="username">
                    <el-input v-model="loginFormData.username" placeholder="请输入用户名" :prefix-icon="User" />
                </el-form-item>
                <el-form-item class="my-10" prop="password">
                    <el-input v-model="loginFormData.password" type="password" placeholder="请输入密码"
                        :prefix-icon="Lock" />
                </el-form-item>
                <el-form-item class="my-10" prop="captcha">
                    <el-row class="w-full">
                        <el-col :span="16">
                            <el-input v-model="loginFormData.captcha" placeholder="请输入验证码"></el-input>
                        </el-col>
                        <el-col :span="8">
                            <div class="w-full mx-2 h-10 bg-gray-200 flex justify-center items-center rounded-md"> 2+2
                            </div>
                            <!-- <el-link class="mx-2 border w-full">获取验证码</el-link> -->
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item class="my-10">
                    <el-button class="w-full mx-auto" type="primary" @click="handleLogin">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg-repeat {
    background-position: center;
    background-repeat: no-repeat;
}

.bg-size {
    background-size: 100% 100%;

}
</style>