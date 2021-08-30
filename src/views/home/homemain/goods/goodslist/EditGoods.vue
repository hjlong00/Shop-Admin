<template>
  <div id=''>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改商品</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card>
      <!-- 标题提示 -->
      <el-alert title="修改商品信息" type="info" center show-icon :closable="false" />
      <!-- 步骤进度条 -->
      <el-steps :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <!-- tab栏区域 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px"
        label-position="top">
        <el-tabs v-model="activeIndex" tab-position="left" :before-leave="beforeTabLeave"
          @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="editForm.goods_name" />
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="editForm.goods_price" type="number" />
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="editForm.goods_weight" type="number" />
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="editForm.goods_number" type="number" />
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader v-model="editForm.goods_cat" :options="cateList" :props="cascaderProps"
                @change="handleChange" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border />
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload class="upload-demo" :action="uploadURL" :headers="headersObj"
              :on-preview="handlePreview" :on-remove="handleRemove" :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <!-- 富文本编辑器 -->
            <quill-editor v-model="editForm.goods_introduce" placeholder="请在此输入内容" />
            <el-button type="primary" class="btnedit" @click="edit">确定</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <!-- 图片预览  -->
    <el-dialog title="图片预览" :visible.sync="prviewVisible" width="30%">
      <img :src="prviewPath" alt="" class="prviewImg">
    </el-dialog>
  </div>
</template>

<script>
import { getCateList, getParamsData, getInfoById, editGoods } from 'service/goods.js'
import _ from 'lodash'

export default {
  name: 'EditGoods',
  data() {
    return {
      // 商品分类数据列表
      cateList: [],
      // 级联选择器里的props配置
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      // 要修改信息的商品的ID
      goodsId: '',
      activeIndex: '0',
      // 表单内容
      editForm: {
        goods_id: '',
        goods_name: '',
        // 当选择器做出选择时，将选择结果绑定到这里
        goods_cat: [],
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        pics: [],
        // 商品的描述
        goods_introduce: '',
        // 商品的参数（数组），包含 `动态参数` 和 `静态属性`
        attrs: []
      },
      editFormRules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }]
      },
      // 商品动态参数
      manyTableData: [],
      // 商品静态属性
      onlyTableData: [],
      // 图片上传URL
      uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      // token设置
      headersObj: { Authorization: window.sessionStorage.getItem('token') },
      // 预览框显示和隐藏
      prviewVisible: false,
      // 预览图片的路径
      prviewPath: ''
    }
  },
  created() {
    this.goodsId = this.$route.params.id
    this._getInfoById()
    this._getCateList()
  },
  methods: {
    // 获取产品分类清单请求
    async _getCateList() {
      const { data: res } = await getCateList()
      if (res.meta.status !== 200) return this.$message.error('获取商品分类失败')
      // console.log(this.cateList)
      this.cateList = res.data
    },
    // 获取要修改的商品的信息
    async _getInfoById() {
      const { data: res } = await getInfoById(this.goodsId)
      if (res.meta.status !== 200) return this.$message.error('获取商品信息失败')
      console.log(res.data)
      // 他这里原本是字符串，先转为数组，但里面每一项都是字符串，级联选择器需要数字类型，所以接着用map转
      res.data.goods_cat = res.data.goods_cat.split(',').map(Number)
      // 为表单赋值商品原始信息
      this.editForm = { ...res.data }
      console.log(this.editForm)
    },
    // 级联选择器选中项变化，就会触发这个函数
    handleChange() {
      console.log(this.editForm.goods_cat)
      if (this.editForm.goods_cat.length !== 3) {
        this.editForm.goods_cat = []
      }
    },
    beforeTabLeave(activename, oldeactivename) {
      if (oldeactivename === '0' && this.editForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    // tabs发生点击时产生的事件
    async tabClicked() {
      if (this.activeIndex === '1') {
        const { data: res } = await getParamsData(this.goodsId, 'many')
        if (res.meta.status !== 200) return this.$message.error('获取商品参数失败')
        // console.log(res.data)
        res.data.forEach(element => {
          element.attr_vals = element.attr_vals.length === 0 ? [] : element.attr_vals.split(',')
        })
        this.manyTableData = res.data
      } else if (this.activeIndex === '2') {
        const { data: res } = await getParamsData(this.goodsId, 'only')
        if (res.meta.status !== 200) return this.$message.error('获取商品属性失败')
        // console.log(res.data)
        this.onlyTableData = res.data
      }
    },
    // 处理图片预览效果
    handlePreview(file) {
      console.log(file)
      this.prviewPath = file.response.data.url
      this.prviewVisible = true
    },
    // 监听图片上传成功的事件
    handleSuccess(response) {
      // console.log(response)
      // 1,拼接得到一个图片信息对象
      const picInfo = { pic: response.data.tmp_path }
      // 2，将图片信息对象，push到pics
      this.editForm.pics.push(picInfo)
      console.log(this.editForm)
    },
    // 监听图片移除的事件
    handleRemove(file) {
      // console.log(file)
      // 1，先获取要删除的图片的临时路径
      const filePath = file.response.data.tmp_path
      // 2，通过路径查找到索引值
      const i = this.addForm.pics.findIndex(x => x.pic === filePath)
      // 3，通过索引值删除
      this.addForm.pics.splice(i, 1)
      console.log(this.addForm)
    },
    // 提交修改
    edit() {
      // 先预验证表单内容是否完整
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写必要的表单项')
        // 这里用了lodash 的 cloneDeep 方法做了深克隆
        const form = _.cloneDeep(this.editForm)
        // 把goods_cat 从数组转为了字符串
        form.goods_cat = form.goods_cat.join(',')

        // 整理动态参数
        this.manyTableData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals.join(',') }
          this.editForm.attrs.push(newInfo)
        })

        // 整理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.editForm.attrs.push(newInfo)
        })

        form.attrs = this.editForm.attrs
        // console.log(form)

        const { data: res } = await editGoods(form)
        if (res.meta.status !== 200) return this.$message.error('修改商品失败')
        this.$message.success('修改商品成功')
        // console.log(res)
        this.$router.push('/goods')
      })
    }
  }
}
</script>

<style scoped>
.el-checkbox {
  margin: 0 10px 0 0 !important;
}
.prviewImg {
  width: 100%;
}
.btnAdd {
  margin-top: 10px;
}
</style>
