#### 功能说明

1. 文本输入框
2. select选择器
3. select选择器多选
4. selectGroup 分组选择器
5. DatePicker时间选择器 支持 daterange && date
6. 重置按钮自动判断显示隐藏
7. 媒体查询自动根据浏览器宽度展示不同大小
8. 当条件过多自动收起 展示 “更多条件”筛选 美化表单
9. loading时禁用查询

#### 使用方法：

1. 引入
```javascript
import TableSearch from "_c/Data/Table/TableSearch.vue";

components: {
  TableSearch,
},
```
2. 使用

``` javascript
<TableSearch v-model="tableSearchData" :disabled="loading"  @on-search="search" :columns="searchColums" />
```

3. 数据绑定

```javascript
data() {
    return {
        // 这里可以传入默认值
        tableSearchData: {
            enableStates: ['1'],
            businessStateMode: "1",
            pageNo: 1,
        	pageSize: 10,
        },
    }
}
computed: {
  searchColums() {
    const merchantState = {
      name: '商户状态',
      field: 'enableStates',
      type: 'select',
      multiple: true, 开启多选
      values: this.merchantStateEnum // 这里可以通过异步获取数据加载进来
    }
    return [
      merchantState,
      {
        name: '商户预警状态',
        field: 'businessStateMode',
        type: 'select',
        values: [
          {value: '0', displayName: '全部'},
          {value: '1', displayName: '正常'},
        ]
      },
      {
        name: '商户名称',
        field: 'merchantName',
        type: 'input'
      },
      {
        name: '日期',
        field: 'date',
        type: 'date'
      },
      {
        name: '日期区间',
        field: ['t1', 't2'],
        type: 'daterange'
      },
    ]
  },
},

methods: {
    search(data) {
        console.log(data)
        const params = Object.assign({}, this.tableSearchData, formData);
        /** 返回一个对对象
          *  businessStateMode: "1",
          *  date: "",
          *  enableStates: ["1"],
          *  merchantName: "",
          *  t1: "2020-12-10",
          *  t2: "2020-12-12",
        */
    },
}
```

#### 特别说明

为了监听是否显示重置按钮 请在data里面为**tableSearchData**都加上初始值` input`&&`date`&&`select单选`是**string**类型，`select多选`和`daterange`是**array**类型

```javascript
tableSearchData: {
    input: '',
    date: '',
    daterange: [],
    select: '' || [],
},
```

#### Page分页

```javascript
<Page
    size="small"
    :total="total"
    :disabled="pending || exporting"
    @on-change="pageNoChange"
    @on-page-size-change="pageSizeChange"
    :current="tableSearchData.pageNo"
    :page-size="tableSearchData.pageSize"
    show-sizer
    show-elevator
    show-total
/>

methods: {
	pageNoChange(pageNo) {
      this.tableSearchData.pageNo = pageNo;
      this.search();
    },
    pageSizeChange(pageSize) {
      this.tableSearchData.pageSize = pageSize;
      this.search();
    },
}
```

