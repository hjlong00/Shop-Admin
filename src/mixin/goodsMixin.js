// 修改参数
import { getGoodsParams, editGoodsParams, delParams, editAttrVals } from 'service/goods.js'
export const editAndDelParams = {
  props: {
    titleText: {
      type: String
    },
    // 商品ID
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
      // 修改属性弹窗显示与隐藏
      editDialogVisible: false,
      // 修改表单数据对象
      editForm: {
      },
      // 表单验证规则
      editFormRules: {
        attr_name: [{ required: true, message: '请输入角色名', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 打开修改参数弹窗
    async showEditDialog(attrId) {
      const { data: res } = await getGoodsParams(this.cateId, attrId, this.activeName)
      if (res.meta.status !== 200) return this.$message.error('获取参数信息失败')
      console.log(res)
      this.editForm = res.data
      this.editDialogVisible = true
    },
    // 关闭弹窗重置表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 修改参数
    editParams() {
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await editGoodsParams(this.cateId, this.editForm.attr_id, this.editForm.attr_name, this.activeName)
        // console.log(res)
        if (res.meta.status !== 200) return ('修改参数信息失败')
        this.$message.success('修改参数信息成功')
        this.editDialogVisible = false
        this.$emit('editParams')
      })
    },
    // 删除参数
    async delGoodsParams(attrId) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(res => res) // !这里捕获了err信息，同时把结果 return 给confirmResult
      /**
       * * 如果用户确认删除，则返回值为字符串 'confirm'
       * * 如果用户取消删除，则返回值为字符串 'cancel'
       */
      // console.log(confirmResult)
      if (confirmResult !== 'confirm') return this.$message.info('已取消删除')

      const { data: res } = await delParams(this.cateId, attrId)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('删除参数失败')
      this.$message.success('删除参数成功')

      this.$emit('delParams')
    },
    // 封装修改参数函数
    async _editAttrVals(row) {
      // *注意 因为之前为了可以循环属性参数，把attr_vals从字符串以逗号为分割转成了数组，现在提交回服务器需要转换会字符串， .join(',') 是以逗号拼接数组里的每一项
      const { data: res } = await editAttrVals(this.cateId, row.attr_id, row.attr_name, row.attr_sel, row.attr_vals.join(','))
      // console.log(res)
      if (res.meta.status !== 200) return this.$message.error('修改参数失败')
      this.$message.success('修改参数成功')
    },
    // 文本框失去了焦点，或摁下了 enter 键都会触发
    handleInputConfirm(row) {
      /**
       *  先判断是否输入了有效信息
       * trim() 作用是删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。
       * 如果无效则重置内容，并隐藏input框。
       * 如果内容有效，则进行下一步操作
       *
      */
      if (row.inputValue.trim().length === 0) {
        // 信息无效，清空内容
        row.inputValue = ''
        // 关闭input输入框
        row.inputVisible = false
        return
      }
      // 输入信息有效，将内容加入到attr_vals数组中
      // 这里的tag都是从attr_vals中遍历出来的
      row.attr_vals.push(row.inputValue.trim())
      // 完成后重置输入内容
      row.inputValue = ''
      row.inputVisible = false

      // 发起请求保存到服务器数据库中
      this._editAttrVals(row)
    },
    // 删除参数
    handleClose(item, row) {
      // 因为这里用了"item" 做为:key ，所以可以根据item来查找删除项
      row.attr_vals.splice(row.attr_vals.indexOf(item), 1)
      // 发起请求保存到服务器数据库中
      this._editAttrVals(row)
    },
    // 点击打开el-input
    showInput(row) {
      row.inputVisible = true
      /**
       *  让文本框自动获得焦点
       *  $nextTick 方法的作用，就是当页面上元素被重新渲染之后，才会指定回调函数中的代码
       */
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    }
  }
}
