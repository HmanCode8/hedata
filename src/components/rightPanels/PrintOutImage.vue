<script setup>
import { ref } from 'vue';

const printSetForm = ref({
    size: 'A4',
    direction: 'landscape',
    format: 'png',
    resolution: '72'
});
const printInfoForm = ref({
    title: '',
    unit: '',
    artist: '',
    date: ''
});
const printAnnotateForm = ref({
    size: 'A4',
    color: '#000000'
});




</script>

<template>
    <div class="p-2 theme-primary my-4"> 参数设置</div>
    <el-form class="w-full overflow-hidden" :form="printSetForm" label-width="auto">
        <el-row>
            <el-col :span="12">
                <el-form-item class="mx-2" label="大小：">
                    <el-select v-model="printSetForm.size" placeholder="请选择">
                        <el-option label="A5" value="A5"></el-option>
                        <el-option label="A4" value="A4"></el-option>
                        <el-option label="A3" value="A3"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item class="mx-2" label="方向：">
                    <el-select v-model="printSetForm.direction" placeholder="请选择">
                        <el-option label="横向" value="landscape"></el-option>
                        <el-option label="纵向" value="portrait"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item class="mx-2" label="格式：">
                    <el-select v-model="printSetForm.format" placeholder="请选择">
                        <el-option label="PNG" value="png"></el-option>
                        <el-option label="JPEG" value="jpeg"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item class="mx-2" label="分辨率：">
                    <el-select v-model="printSetForm.resolution" placeholder="请选择">
                        <el-option label="72 dpi" value="72"></el-option>
                        <el-option label="96 dpi" value="96"></el-option>
                        <el-option label="150 dpi" value="150"></el-option>
                        <el-option label="300 dpi" value="300"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="p-2 theme-primary my-4"> 制图信息</div>
    <el-form :form="printInfoForm" label-width="auto">
        <el-row>
            <el-col :span="24">
                <el-form-item class="mx-2" label="标题：">
                    <el-input v-model="printInfoForm.title" placeholder="请输入标题"></el-input>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item class="mx-2" label="制图单位：">
                    <el-input v-model="printInfoForm.unit" placeholder="请输入单位"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item class="mx-2" label="制图员：">
                    <el-input v-model="printInfoForm.artist" placeholder="请输入制图员"></el-input>

                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item class="mx-2" label="制图日期：">
                    <el-date-picker v-model="printInfoForm.date" type="date" placeholder="选择日期"></el-date-picker>

                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
    <div class="p-2 theme-primary my-4"> 标注</div>
    <el-form :form="printAnnotateForm" label-width="auto">
        <el-row>
            <el-col :span="12">
                <el-form-item class="mx-2" label="大小：">
                    <el-select v-model="printSetForm.size" placeholder="请选择">
                        <el-option label="A5" value="A5"></el-option>
                        <el-option label="A4" value="A4"></el-option>
                        <el-option label="A3" value="A3"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item class="mx-2" label="颜色：">
                    <el-color-picker v-model="printAnnotateForm.color" show-alpha></el-color-picker>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>
</template>

<style scoped lang="scss"></style>