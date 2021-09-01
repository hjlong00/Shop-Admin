<template>
  <div id='open-role'>
    <el-table-column type="expand">
      <template slot-scope="scope">
        <!-- 栅格布局 -->
        <el-row :class="['bdbottom',i1 === 0 ? 'bdtop': '','vcenter']"
          v-for="(item1,i1) in scope.row.children" :key="item1.id">
          <!-- 渲染一级权限 -->
          <el-col :span="5">
            <el-tag closable @close="removeRightById(scope.row,item1.id)"> {{item1.authName}}
            </el-tag>
            <i class="el-icon-caret-right" />
          </el-col>
          <!-- 渲染二级权限和三级权限 -->
          <el-col :span="19">
            <!-- 通过for循环嵌套渲染二级权限 -->
            <el-row :class="[i2 === 0 ? '':'bdtop','vcenter']" v-for="(item2,i2) in item1.children"
              :key="item2.id">
              <!-- 二级权限 -->
              <el-col :span="6">
                <el-tag closable type="success" @close="removeRightById(scope.row,item2.id)">
                  {{item2.authName}}</el-tag>
                <i class="el-icon-caret-right" />
              </el-col>
              <!-- 三级权限 -->
              <el-col :span="18">
                <el-tag closable type="warning" v-for="(item3) in item2.children" :key="item3.id"
                  @close="removeRightById(scope.row,item3.id)">
                  {{item3.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </template>
    </el-table-column>
  </div>
</template>

<script>
import { delRight } from 'service/power.js'

export default {
  name: 'openRole',
  data() {
    return {

    }
  },
  methods: {
    async removeRightById(role, rightId) {
      // 弹框提示是否要删除
      const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') return this.$message('取消删除')

      const { data: res } = await delRight(role, rightId)
      if (res.meta.status !== 200) return this.$message.error('删除权限失败')

      this.$message.success('删除权限成功')
      console.log(res)
      // 这里如果使用刷新，合使展开页回到初始的合上状态，这样用户体验不好
      // 因为删除权限后返回的data数据是最新的权限数据，所以赋值给role.chilren 就可以不刷新页面，更新数据
      // 这里的role 就是 scope.row
      role.children = res.data
    }
  }
}
</script>

<style scoped>
.el-tag {
  margin: 7px;
}
.bdtop {
  border-top: 1px solid #eee;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
