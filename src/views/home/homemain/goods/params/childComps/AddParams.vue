<template>
  <el-dialog :title="`添加`+ titleText" :visible.sync="addDialogVisible" width="50%"
    @close="addDialogClosed">
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
      <el-form-item :label="titleText" prop="attr_name">
        <el-input v-model="addForm.attr_name" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="addDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addParams">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { addGoodsParams } from 'service/goods.js'

export default {
  name: 'AddParams',
  props: {
    titleText: {
      type: String
    },
    cateId: {
      type: Number
    },
    // 当前选择的是 动态 还是静态
    activeName: {
      type: String
    }
  },
  data() {
    return {
      // 控制dialog显示与隐藏
      addDialogVisible: false,
      // 表单数据
      addForm: {
        attr_name: ''
      },
      // 表单验证规则
      addFormRules: {
        attr_name: [{ required: true, message: '请输入属性名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 弹窗关闭的时候重置表单
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 确认提交
    addParams() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await addGoodsParams(this.cateId, this.addForm.attr_name, this.activeName)
        console.log(res)
        if (res.meta.status !== 201) return this.$message.error('添加属性失败')
        this.addDialogVisible = false
        this.$emit('addParams')
      })
    }
  }
}
</script>

<style scoped>
</style>
