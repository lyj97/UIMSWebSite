<template>
    <el-table
        :data="tableData"
        v-loading="loading"
        border
        height="700"
        style="width: 100%">

        <el-table-column
            prop="title"
            label="标题"
            width="360">
        </el-table-column>

        <el-table-column
            prop="dept"
            label="部门"
            width="180">
        </el-table-column>

        <el-table-column
            prop="abs_link"
            label="地址">
        </el-table-column>

        <el-table-column
            prop="time"
            label="发布时间">
        </el-table-column>

        <el-table-column
            prop="flagTop"
            label="置顶?">
        </el-table-column>

        <el-table-column
            fixed="right"
            label="操作"
            width="100">

            <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            </template>

        </el-table-column>
    </el-table>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [],
        loading: true
      }
    }
  }
</script>