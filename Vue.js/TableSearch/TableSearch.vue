<template>
  <div
    :class="['table-search', { 'inline-btn': columns.length < maxRowItem }]"
    @keyup.enter.prevent="confirm"
  >
    <Form :model="formData" :disabled="disabled" class="form-container">
      <i-input
        style="display: none"
        placeholder="这个框是为了避免只有一个Input时点击回车页面被刷新留下的"
      />
      <Row :gutter="8" :key="`search_row_${i}`" v-for="(row, i) in columnsArr">
        <template v-if="i <= moreIndex && row">
          <i-col
            :sm="8"
            :lg="4"
            :style="{ width: col.width }"
            :key="`search_col_${j}`"
            v-for="(col, j) in row"
            v-show="col"
          >
            <FormItem v-if="col">
              <i-select
                filterable
                :clearable="true"
                v-model="formData[col.field]"
                v-if="col.type === 'select'"
                :multiple="col.multiple"
                :placeholder="`请选择${col.name}`"
                :max-tag-count="1"
              >
                <i-option
                  :value="op.value"
                  v-for="op in col.values"
                  :key="`search_select_${col.field}_${op.value}`"
                  >{{ op.displayName }}</i-option
                >
              </i-select>

              <i-select
                :clearable="true"
                v-model="formData[col.field]"
                v-if="col.type === 'selectGroup'"
                :placeholder="`请选择${col.name}`"
              >
                <OptionGroup
                  v-for="item in col.values"
                  :key="`search_group_${item.value}`"
                  :displayName="item.displayName"
                >
                  <i-option
                    v-for="o in item.children"
                    :value="o.value"
                    :key="`search_select_${col.field}_${o.value}`"
                    >{{ o.displayName }}</i-option
                  >
                </OptionGroup>
              </i-select>

              <i-input
                :clearable="true"
                v-model="formData[col.field]"
                v-else-if="col.type === 'input'"
                type="text"
                :placeholder="`请输入${col.name}`"
                @on-change="changeInput"
              ></i-input>

              <DatePicker
                v-model="formData[col.field]"
                v-else-if="col.type === 'date'"
                type="date"
                :placeholder="`请选择${col.name}`"
                style="width: 100%"
              ></DatePicker>

              <DatePicker
                :value="dateRange[col.field.join(':')]"
                @on-change="dateRangeChange(col, $event)"
                v-else-if="col.type === 'daterange'"
                type="daterange"
                :placeholder="`请选择${col.name}区间`"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </i-col>
        </template>
      </Row>
    </Form>
    <div class="btns clearfix">
      <Button
        :icon="moreIndex === 0 ? 'ios-arrow-down' : 'ios-arrow-up'"
        type="text"
        v-if="columnsArr.length > 1"
        @click="moreFields"
      >
        <span v-if="moreIndex === 0">更多条件</span>
        <span v-else>收起</span>
      </Button>
      <Button type="primary" :disabled="disabled" @click="confirm">查询</Button>
      <Button @click="reset" :disabled="disabled" v-show="showReset"
        >重置</Button
      >
      <slot></slot>
    </div>
  </div>
</template>

<script>
/**
 * 列表条件查询
 */
export default {
  name: "table-search",
  data() {
    return {
      dateRange: {},
      formData: {},
      moreIndex: 0,
      maxRowItem: 6,
      defaultData: "",
      showReset: false,
    };
  },
  props: {
    value: {
      type: Object,
      default() {
        return {};
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  created() {
    // 浅拷贝一个初始值，用于是否展示重置按钮以及重置赋值
    this.defaultData = JSON.stringify(this.value);
  },
  watch: {
    formData: {
      handler(val) {
        const _defaultData = JSON.parse(this.defaultData);
        const _val = Object.assign({}, val);
        // 当有pagenNO和pageSize的情况下重置按钮不校验此参数
        if (_defaultData.pageSize) {
          delete _defaultData.pageNo;
          delete _defaultData.pageSize;
          delete _val.pageNo;
          delete _val.pageSize;
        }
        this.showReset = JSON.stringify(_defaultData) != JSON.stringify(_val);
      },
      deep: true,
    },
  },
  computed: {
    columnsArr() {
      // 将显示的数组转化为一个二维数组
      const Arr = new Array(Math.ceil(this.columns.length / this.maxRowItem));
      for (let i = 0; i < Arr.length; i += 1) {
        Arr[i] = [];
        for (let j = 0; j < this.maxRowItem; j += 1) {
          Arr[i][j] = "";
        }
      }
      for (let i = 0; i < this.columns.length; i += 1) {
        const item = this.columns[i];
        if (item.type === "daterange") {
          if (item.field instanceof Array) {
            const vt = [];
            item.field.forEach((key) => {
              this.$set(this.formData, key, this.value[key] || "");

              if (this.value[key]) {
                vt.push(this.value[key]);
              }
            });
            this.$set(this.dateRange, item.field.join(":"), vt);
          } else {
            throw new Error(`${item.name} Field 需要一个数组`);
          }
        } else {
          this.$set(this.formData, item.field, this.value[item.field] || "");
        }

        Arr[parseInt(i / this.maxRowItem, 10)][i % this.maxRowItem] = item;
      }

      return Arr;
    },
  },
  methods: {
    dateRangeChange(col, data) {
      col.field.forEach((key, i) => {
        this.$set(this.formData, key, data[i] || "");
      });
      this.changeInput();
    },
    moreFields() {
      this.moreIndex = this.moreIndex === 0 ? this.columnsArr.length : 0;
    },
    extendPage() {
      if (this.value.pageSize) {
        this.formData = {
          ...this.formData,
          pageNo: this.value.pageNo,
          pageSize: this.value.pageSize,
        };
      }
    },
    reset() {
      this.formData = JSON.parse(this.defaultData);
      this.$emit("input", this.formData);
      this.$emit("on-search", this.formData);
    },
    confirm() {
      this.extendPage();
      this.$emit("input", this.formData);
      this.$emit("on-search", this.formData);
    },
    changeInput(value) {
      this.$emit("change-input", this.formData);
    },
  },

  beforeMount() {},
  beforeDestroy() {},
  mounted() {},
};
</script>
<style scoped lang="less">
.table-search {
  text-align: left;
  .ivu-form-item {
    margin-bottom: 15px;
  }
  .form-container {
    flex: 1;
  }
  li {
    text-align: left;
  }
  .btns {
    text-align: right;
    min-width: 140px;
    margin-bottom: 20px;
    button {
      margin-left: 10px;
    }
  }
  &.inline-btn {
    display: flex;
    .btns {
      text-align: right;
    }
    .sc-dv-exporting-button {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
