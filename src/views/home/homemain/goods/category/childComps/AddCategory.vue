<template>
  <el-dialog title="添加分类" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
    <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef"
      label-width="100px">
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="addCateForm.cat_name" />
      </el-form-item>
      <el-form-item label="父级分类：">
        <!-- options用来指定数据源 -->
        <el-cascader v-model="selectedKeys" :options="parentCateList" :props="cascaderProps"
          ref="cascaderRef" clearable @change="parentCateChange" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addCate">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addCategory } from 'service/goods.js'

export default {
  name: 'AddCategory',
  data() {
    return {
      // 控制分类对话框的显示和隐藏
      addDialogVisible: false,
      // 添加分类表单的数据对象
      addCateForm: {
        // 将要添加的名称
        cat_name: '',
        // 分类父 ID
        cat_pid: 0,
        // 分类层级,默认是1级
        cat_level: 0
      },
      // 添加分类表单的验证规则
      addCateFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      },
      // 父级分类数据列表
      parentCateList: [],
      // 级联选择器里的props配置
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
        checkStrictly: true
      },
      // 当选择器做出选择时，将选择结果绑定到这里
      selectedKeys: []
    }
  },
  methods: {
    // 选择项发生变化触发这个函数
    parentCateChange() {
      console.log(this.selectedKeys)
      if (this.selectedKeys.length > 0) {
        this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1]
        this.addCateForm.cat_level = this.selectedKeys.length
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    addDialogClosed() {
      this.$refs.addCateFormRef.resetFields()
      this.selectedKeys = []
      this.addCateForm.cat_pid = 0
      this.addCateForm.cat_level = 0
    },
    addCate() {
      console.log(this.addCateForm)
      this.$refs.addCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await addCategory(this.addCateForm)
        if (res.meta.status !== 201) return this.$message.error('添加分类失败')
        this.$message.success('添加分类成功')
        // console.log(res)
        this.addDialogVisible = false
        this.$emit('addCate')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
