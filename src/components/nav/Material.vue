<template>
  <div id="material">
    <el-container>
      <el-main>
        <el-button @click="dialogVisible = true" plain type="primary">添加购买记录</el-button>
        <el-table :data="purchaseRecords" style="width: 100%;">
          <el-table-column label="购买日期" prop="purchaseDate" sortable width="180"></el-table-column>
          <el-table-column label="材料名称" prop="materialName"></el-table-column>
          <el-table-column label="单价(种子为g/￥, 原料为kg/￥)" prop="price" sortable></el-table-column>
          <el-table-column label="数量" prop="amount"></el-table-column>
          <el-table-column label="备注" prop="remarks"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="removeRecord(scope.row)" plain size="small" type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :visible.sync="dialogVisible" title="添加购买记录">
          <el-form :model="form">
            <el-form-item :label-width="formLabelWidth" label="材料名称">
              <el-select autocomplete="off" placeholder="请选择" v-model="form.materialName">
                <el-option
                  :key="item.materialName"
                  :label="item.materialName + ' --- ' + item.price"
                  :value="item.materialName"
                  v-for="item in materials"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="数量">
              <el-input placeholder="请输入数量" type="text" v-model="form.amount"></el-input>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="购买日期">
              <el-date-picker placeholder="选择购买日期" type="date" v-model="form.purchaseDate"></el-date-picker>
            </el-form-item>
            <el-form-item :label-width="formLabelWidth" label="备注">
              <el-input placeholder="备注" type="textarea" v-model="form.remarks"></el-input>
            </el-form-item>
          </el-form>
          <div class="dialog-footer" slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="createPurchaseRecord" type="primary">确 定</el-button>
          </div>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Material",
  data() {
    return {
      userType: null,
      username: null,
      dialogVisible: false,
      materials: null,
      purchaseRecords: null,
      form: {
        materialName: "",
        amount: 0,
        purchaseDate: null,
        remarks: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.reloadData();
  },
  methods: {
    createPurchaseRecord: function() {
      let _this = this;
      let data = _this.form;
      _this.dialogVisible = false;
      _this.httpPost("/api/createPurchaseRecord", data, responseBean => {
        _this.$message.success(responseBean.msg);
        _this.reloadData();
        _this.clearForm();
      });
    },
    reloadData: function() {
      let _this = this;
      _this.httpGet("/api/getAllMaterialsAndRecords", responseBean => {
        let mTemp = responseBean.content.materials;
        for (let i = 0; i < mTemp.length; i++) {
          mTemp[i].price = mTemp[i].price / 100.0;
        }
        let pTemp = responseBean.content.purchaseRecords;
        for (let j = 0; j < pTemp.length; j++) {
          pTemp[j].price = pTemp[j].price / 100.0;
        }
        _this.purchaseRecords = pTemp;
        _this.materials = mTemp;
      });
    },
    clearForm: function() {
      this.form.materialName = "";
      this.form.amount = 0;
      this.form.remarks = "";
      this.form.purchaseDate = null;
    },
    removeRecord: function(row) {
      let _this = this;
      _this
        .$confirm("此操作将永久删除该记录,是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.httpPost(
            "/api/removeRecord",
            { rId: row.rid },
            responseBean => {
              _this.$message.success(responseBean.msg);
              _this.reloadData();
            }
          );
        })
        .catch(() => {
          _this.$message.info("已取消删除");
        });
    }
  }
};
</script>

<style scoped>
</style>