<template>
  <div class="pagination">
    
    <button :disabled='pageNo==1' @click="$emit('getPageNo',pageNo-1)">上一页</button>
    <button v-if="startAndEnd.start!==1" :class="{active:pageNo==1}" @click="$emit('getPageNo',1)">1</button>
    <button v-if="startAndEnd.start>2">···</button>
    <template v-for="(page,index) in startAndEnd.end">
    <button v-show="page >= startAndEnd.start" :key="index" :class="{active:pageNo==page}" @click="getPageNo(page)">{{page}}</button>
    </template>
    <button v-if="startAndEnd.end<totalPage-1">···</button>
    <button v-if="startAndEnd.end!==totalPage" :class="{active:pageNo==totalPage}" @click="$emit('getPageNo',totalPage)">{{totalPage}}</button>
    <button  :disabled='pageNo==totalPage' @click="$emit('getPageNo',pageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共 {{total}} 条</button>
    <!-- 分页器分析 -->
    <!-- <h1>{{startAndEnd}}-----{{pageNo}}---共{{totalPage}}页</h1> -->
     <!-- <span v-for="(a,b) in startAndEnd.end" :key="b">{{a}}</span> -->
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    // pageNo：当前页码数'pageSize'：一页展示多少条数据'total'：总共多少条数据,'continues'：连续多少页
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 可以算出多少页 总共多少页
        totalPage(){
            // 向上取整
            return Math.ceil(this.total/this.pageSize)
        },
        // 计算出连续页面数的前几位与后几位是多少
        //底下的代码是整个分页器最重要的地方[算出连续五个数字、开头、结尾]
        startAndEnd(){
            // 6 7 8 9 10
            // -1 0 1 2 3
            const {pageNo,continues, totalPage}=this
            let start = 88
            let end = 99

            // 如果 连续页面数 大于 总页数 要纠正 总页数不够五页
            if(continues>totalPage){
                start =1
                end=parseInt(totalPage)
            }else{
                // 正常情况
            start = Number(pageNo) - parseInt(continues / 2);
            end = Number(pageNo) + parseInt(continues / 2);
            }
            // 约束头部
            // 正常情况，但当前页为1 2 页,-1 0 <1> 2 3, 0 1 <2> 3 4  分页器没有负数和0
            if(start<1){
                start =1
                // 转成number值parseInt(continues)
                end= continues
            }
            // 约束尾部
            // 假如总页数只有7页， 5 6 <7> 8 9  end 没有八九  end 不能大于总页数
            if(end>totalPage){
                start = totalPage - continues +1
                end = totalPage
            }
            return {start, end}
        }
    },
    methods:{
      getPageNo(page){
        this.$emit('getPageNo',page)
      }
    }
    
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
