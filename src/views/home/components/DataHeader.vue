<script setup>
import { ref, computed } from "vue";
import { useGlobalStore } from "@/stores/global";
import { getMuneTree } from '@/services/userData'
import { buildTree } from '@/utils'
import { Search } from '@element-plus/icons-vue'

const globalStore = useGlobalStore();
const emits = defineEmits(["onMuneChange"]);
const open = ref(false);
const ref1 = ref(null);
const searchVal = ref('');
const activeMune = ref("DataUpdate");
const activeChildrenMune = ref('');
const menus = ref([])
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const muneChange = (menu) => {
    activeMune.value = menu.id;
};

// 获取用户菜单
const userMenus = async () => {
    const res = await getMuneTree({ syskey: window.clientId });
    if (res.code === 200) {
        const { Data } = res.data;
        if (Data.length === 0) {
            ElNotification({
                title: '提示',
                message: '当前用户没有任何菜单权限',
            })
            return;
        }
        menus.value = buildTree(Data)[0].children;
        activeMune.value = menus.value[0].id;
    }

}
userMenus()
open.value = true;
const childrenOnchage = (m) => {
    activeChildrenMune.value = m.id;
    emits("onMuneChange", m);
    console.log(m, 'childrenOnchage');
};
const toogleClick = () => {
    globalStore.toggleDataTree();
};

const childrenMune = computed(() => {
    const activeMenu = menus.value.find((menu) => menu.id === activeMune.value);
    if (activeMenu && activeMenu.children) {
        return activeMenu.children;
    }
    return [];
});

// 退出登录
const loginOut = () => {
    sessionStorage.setItem('casToken', '');
    window.location.href = window.logoutUrl;
};
</script>

<template>
    <div
        :class="`theme-bg h-16 flex  items-center p-2 justify-between bg-img-${globalStore.themeName} bg-size bg-no-repeat bg-position-right border-b`">
        <div class="sys-title flex items-center ">
            <div class="rounded-full w-10 h-10 bg-white">
                <i
                    class="iconfont icon-guanxian theme-text-color flex items-center justify-center text-2xl h-full w-full"></i>
                <!-- <div class="bg-[url('@/assets/images/logo.png')] bg-no-repeat bg-size bg-position-center h-full w-full">
                </div> -->
            </div>
            <div class="ml-2">
                <span class="text-xl font-bold">管线数据综合管理系统</span>
                <div class="text-sm">Pipeline Data Comprehensive Management System</div>
            </div>
        </div>
        <div class="sys-menus  h-full flex items-center">
            <div :class="[
                `flex relative flex-col mx-2 items-center p-1 ${globalStore.isShowFullPanel ? 'hover:cursor-not-allowed' : 'hover:cursor-pointer'}`,
                activeMune === menu.id ? 'theme-active' : '',
            ]" v-for="menu in menus" :key="menu.id" @click="globalStore.isShowFullPanel ? '' : muneChange(menu)">
                <div v-show="activeMune === menu.id" class="w-full absolute top-0 h-1 bg-white rounded-b-sm">
                </div>
                <i :class="`font-bold iconfont text-2xl ${menu.treeclsname}`"></i>
                <div class="name">
                    {{ menu.title }}
                </div>
            </div>
        </div>
        <div class="sys-user theme-bg flex items-center">
            <!-- <span class="mx-1">{{ userInfo.displayName }}</span> -->
            <el-dropdown>
                <el-icon ref="ref1" class="text-white text-2xl">
                    <UserFilled />
                </el-icon>
                <!-- <img src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" alt="" /> -->
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item @click="globalStore.setThemeVisible(true)">主题设置</el-dropdown-item>
                        <el-dropdown-item>{{ userInfo.displayName }}</el-dropdown-item>
                        <el-dropdown-item @click="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
    <!-- 子级菜单 -->
    <div v-if="!globalStore.isShowFullPanel" class="theme-bg h-8 py-5 flex items-center">
        <div
            :class="`${globalStore.isShowDataTree ? 'w-[20%]' : 'w-10'} flex text-center max-auto items-center justify-between hover:cursor-pointer border-r`">
            <span v-show="globalStore.isShowDataTree" class="px-2">图层管理</span>
            <!-- <el-input class="w-[60%] rounded-md" placeholder="请输入关键字" /> -->
            <el-input v-show="globalStore.isShowDataTree" class="w-[60%] h-8 rounded-2xl" v-model="searchVal"
                placeholder="请输入关键字" clearable :prefix-icon="Search" />

            <div :class="`mx-1 ${globalStore.isShowDataTree ? 'flex items-center justify-center' : ''}`">
                <el-icon v-show="globalStore.isShowDataTree" class="mx-1 text-xl">
                    <Delete />
                </el-icon>
                <el-icon @click="toogleClick" class="mx-1 text-xl ">
                    <Expand v-if="globalStore.isShowDataTree" />
                    <Fold v-else />
                </el-icon>
            </div>
        </div>
        <div class="flex items-center flex-grow px-2">
            <div class="children-mune-item flex items-center hover:cursor-pointer"
                v-for="childMune, index in childrenMune" :key="childMune.key">
                <div class="flex items-center">
                    <div :class="`flex items-center mx-1 py-1 px-2 rounded-sm ${activeChildrenMune === c.id ? 'theme-active' : ''}`"
                        v-for="c in childMune.children" :key="c.id" @click="childrenOnchage(c)">
                        <!-- <i class="w-4 h-4 iconfont icon-shujuqianchu"></i> -->
                        <i :class="` font-bold iconfont ${c.treeclsname}`"></i>

                        <span class="px-1">{{ c.title }}</span>
                    </div>
                    <span v-if="index < childrenMune.length - 1">|</span>
                </div>
            </div>
        </div>
    </div>

    <!-- <el-tour v-model="open">
        <el-tour-step :target="ref1?.$el" title="提示">
            主题设置在这呢，点击右上角的头像，选择主题即可。
        </el-tour-step>
    </el-tour> -->
</template>

<style scoped lang="scss">
$bg-imgs: blue-theme, green-theme, red-theme, purple-theme;

@each $img in $bg-imgs {
    .bg-img-#{$img} {
        background-image: url('@/assets/images/main/#{$img}.png');
    }
}

.bg-position-center {
    background-position: center;
}

.bg-position-right {
    background-position: right center;
}

.bg-no-repeat {
    background-repeat: no-repeat;
}
</style>
