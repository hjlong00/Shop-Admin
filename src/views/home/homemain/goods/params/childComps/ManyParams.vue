<template>
  <!-- 动态参数面板 -->
  <div id=''>
    <el-table :data="manyParamsData" border stripe>
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <!-- {{scope.row}} -->
          <el-tag v-for="item in scope.row.attr_vals" :key="item" closable
            @close="handleClose(item,scope.row)">
            {{item}}</el-tag>
          <!-- 输入的文本框 -->
          <el-input class=" input-new-tag" v-if="scope.row.inputVisible"
            v-model="scope.row.inputValue" ref="saveTagInput" size="small"
            @keyup.enter.native="handleInputConfirm(scope.row)"
            @blur="handleInputConfirm(scope.row)">
          </el-input>
          <!-- 添加的按钮 -->
          <el-button v-else class="button-new-tag" size="small" @click="showInput(scope.row)">+
            New
            Tag
          </el-button>
        </template>
      </el-table-column>
      <!-- 索引列 -->
      <el-table-column type="index" label="#" />
      <el-table-column label="参数名称" prop="attr_name" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- 编辑按钮 -->
          <el-button type="primary" size="mini" icon="el-icon-edit"
            @click="showEditDialog(scope.row.attr_id)" />
          <!-- 删除按钮 -->
          <el-button type="danger" size="mini" icon="el-icon-delete"
            @click="delGoodsParams(scope.row.attr_id)" />
        </template>
      </el-table-column>
    </el-table>

    <!-- 修改属性 -->
    <el-dialog :title="`修改`+ titleText" :visible.sync="editDialogVisible" width="50%"
      @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="titleText" prop="attr_name">
          <el-input v-model="editForm.attr_name" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { editAndDelParams } from '@/mixin/goodsMixin.js'

export default {
  name: 'ManyParams',
  data() {
    return {
      // 动态属性参数列表
      manyParamsData: []
    }
  },
  // 修改属性的script代码
  mixins: [editAndDelParams],
  methods: {
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 15px;
}
.input-new-tag {
  width: 120px;
}
</style>
