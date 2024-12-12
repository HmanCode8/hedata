<script setup>
import { ref } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import _ from 'lodash';

const waitTableRef = ref(null);
const inTableRef = ref(null);
const filterForm = ref({
  type: '',
  category: '',
  element: '',
});

//质检项表格
const ruleTable = [
  {
    id: 1,
    index: 1,
    ruleName: '规则1',
    ruleDesc: '规则1描述',
  },
  {
    id: 2,
    index: 2,
    ruleName: '规则2',
    ruleDesc: '规则2描述',
  },
  {
    id: 3,
    index: 3,
    ruleName: '规则3',
    ruleDesc: '规则3描述',
  },
  {
    id: 4,
    index: 4,
    ruleName: '规则4',
    ruleDesc: '规则4描述',
  },
  {
    id: 5,
    index: 5,
    ruleName: '规则5',
    ruleDesc: '规则5描述',
  },
  {
    id: 6,
    index: 6,
    ruleName: '规则6',
    ruleDesc: '规则6描述',
  },
  {
    id: 7,
    index: 7,
    ruleName: '规则7',
    ruleDesc: '规则7描述',
  },
  {
    id: 8,
    index: 8,
    ruleName: '规则8',
    ruleDesc: '规则8描述',
  },
  {
    id: 9,
    index: 9,
    ruleName: '规则9',
    ruleDesc: '规则9描述',
  },
  {
    id: 10,
    index: 10,
    ruleName: '规则10',
    ruleDesc: '规则10描述',
  },
  {
    id: 11,
    index: 11,
    ruleName: '规则11',
    ruleDesc: '规则11描述',
  },
];
const ruleTable1 = [
  {
    id: 1,
    index: 1,
    ruleName: '规则1',
    ruleDesc: '规则1描述',
  },

  {
    id: 5,
    index: 5,
    ruleName: '规则5',
    ruleDesc: '规则5描述',
  },
  {
    id: 6,
    index: 6,
    ruleName: '规则6',
    ruleDesc: '规则6描述',
  },
  {
    id: 7,
    index: 7,
    ruleName: '规则7',
    ruleDesc: '规则7描述',
  },
  {
    id: 8,
    index: 8,
    ruleName: '规则8',
    ruleDesc: '规则8描述',
  },
  {
    id: 9,
    index: 9,
    ruleName: '规则9',
    ruleDesc: '规则9描述',
  },
  {
    id: 10,
    index: 10,
    ruleName: '规则10',
    ruleDesc: '规则10描述',
  },
  {
    id: 11,
    index: 11,
    ruleName: '规则11',
    ruleDesc: '规则11描述',
  },
  {
    id: 12,
    index: 12,
    ruleName: '规则12',
    ruleDesc: '规则12描述',
  },
  {
    id: 2,
    index: 2,
    ruleName: '规则2',
    ruleDesc: '规则2描述',
  },
  {
    id: 3,
    index: 3,
    ruleName: '规则3',
    ruleDesc: '规则3描述',
  },
  {
    id: 4,
    index: 4,
    ruleName: '规则4',
    ruleDesc: '规则4描述',
  },
];
// 质检项表格列
const ruleColumns = [
  {
    align: 'center',
    property: 'index',
    label: '序号',
    width: 120,
  },
  {
    align: 'center',
    property: 'ruleName',
    label: '规则名称',
  },
  {
    align: 'center',
    property: 'ruleDesc',
    label: '规则说明',
  },
];
function handleRowClick(row, tableRef, tableType) {
  const revetItem = _.find(tableType, (item) => item.id === row.id);
  tableRef.setCurrentRow(revetItem);
}
const handlePageChange = (currentPage) => {
  console.log(currentPage);
};
</script>

<template>
  <div class="p-2">
    <div class="border-b py-1 flex justify-between items-center">
      <div>
        结论：待入库管线115条，管点个。其中：新增管线18条，管点15个；被修改管线8条，管点66个；被删除管线10条，管点20
        个。
      </div>
      <div>
        <el-button>返回</el-button>
        <el-button type="primary">下一步</el-button>
      </div>
    </div>
    <div class="flex w-full border-b items-center">
      <el-row class="w-[80%] items-center my-2">
        <el-col :span="6">
          <div class="flex items-center">
            <span class="w-1/3">管线类型：</span>
            <el-select v-model="filterForm.type" placeholder="请选择">
              <el-option label="新增管线" value="新增管线"></el-option>
              <el-option label="被修改管线" value="被修改管线"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center mx-2">
            <span class="w-1/3">差异类别：</span>
            <el-select v-model="filterForm.category" placeholder="请选择">
              <el-option label="管点" value="管点"></el-option>
              <el-option label="长度" value="长度"></el-option>
              <el-option label="宽度" value="宽度"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="flex items-center mx-1">
            <span class="w-1/3">要素类别：</span>
            <el-select v-model="filterForm.element" placeholder="请选择">
              <el-option label="管线" value="管线"></el-option>
              <el-option label="管点" value="管点"></el-option>
              <el-option label="长度" value="长度"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" :icon="Edit"> 数据预览 </el-button>
        </el-col>
      </el-row>
      <div class="flex w-[20%] justify-end">
        <el-button type="">新增</el-button>
        <el-button type="">修改</el-button>
        <el-button type="">删除</el-button>
      </div>
    </div>
    <div class="flex w-full h-full items-center">
      <div ref="waitDivRef" class="w-1/2 h-full p-2 border-r border-[#eee]">
        <div class="flex items-center theme-text-color border-b py-1">
          待入库：
        </div>
        <el-table
          ref="waitTableRef"
          :data="ruleTable"
          :height="200"
          highlight-current-row
          @row-click="(row) => handleRowClick(row, inTableRef, ruleTable1)"
        >
          <el-table-column
            v-for="column in ruleColumns"
            :key="column.prop"
            :prop="column.property"
            :align="column.align"
            :label="column.label"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="flex mt-4">
          <el-pagination
            layout="prev, pager, next , total"
            background
            :current-page="1"
            :page-size="10"
            :total="ruleTable.length"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
      <div ref="inDivRef" class="w-1/2 h-full p-2">
        <div class="flex items-center theme-text-color border-b py-1">
          已入库：
        </div>
        <el-table
          ref="inTableRef"
          :data="ruleTable1"
          :height="200"
          highlight-current-row
          @row-click="(row) => handleRowClick(row, waitTableRef, ruleTable)"
        >
          <el-table-column
            v-for="column in ruleColumns"
            :key="column.prop"
            :prop="column.property"
            :align="column.align"
            :label="column.label"
          >
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="flex justify-center mt-4">
          <el-pagination
            layout="prev, pager, next, total"
            background
            :current-page="1"
            :page-size="10"
            :total="ruleTable1.length"
            @current-change="handlePageChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
