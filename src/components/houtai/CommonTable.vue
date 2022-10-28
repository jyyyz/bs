<template>
  <div class="common-table">
    <el-table :data="dataShow" height="92%" stripe>
      <el-table-column 
        show-overflow-tooltip
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :width="item.width?item.width:125">
        <template slot-scope="scope">
          <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
        </template>
        </el-table-column>
        <el-table-column label="是否启用">
            <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="true"
                  :inactive-value="false"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="changeSwitch(scope.row)"
                  />
            </template>
        </el-table-column>
        <el-table-column label="操作" min-width="130">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'CommonTable',
  props:{
    dataShow:Array,
    tableLabel:Array
  },
  data(){
    return{
    }
  },
  methods:{
    handleDelete(row){
      this.$emit('del',row)
    },
    handleEdit(row){
      this.$emit('edit',row)
    },
    changeSwitch (row) {
      this.putRequest('/admin/status/'+row.id).then(resp=>{
        if(resp){
          return
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
.common-table{
  height: calc(100% - 62px);
  background-color: #fff;
  position: relative;
  .pager{
    position: absolute;
    bottom: 0;
    right:20px
  }
}
</style>