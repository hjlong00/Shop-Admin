<template>
  <el-dialog title="修改分类" :visible.sync="editdialogVisible" width="50%" @close="editDialogClosed">
    <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef"
      label-width="100px">
      <el-form-item label="分类名称：" prop="cat_name">
        <el-input v-model="editCateForm.cat_name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editCategory">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { editCategory } from 'service/goods.js'

export default {
  name: 'editCategory',
  data() {
    return {
      editdialogVisible: false,
      editCateForm: {
        cat_name: '',
        cat_id: ''
      },
      editCateFormRules: {
        cat_name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
      }
    }
  },
  methods: {
    editDialogClosed() {
      this.$refs.editCateFormRef.resetFields()
    },
    editCategory() {
      this.$refs.editCateFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await editCategory(this.editCateForm)
        if (res.meta.status !== 200) return this.$message.error('更新分类名称失败')
        this.$message.success('更新分类名称成功')
        this.editdialogVisible = false
        // console.log(res)
        this.$emit('editCate')
      })
    }
  }
}
</script>

<style scoped>
</style>
