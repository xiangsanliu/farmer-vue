<template>
    <div id="fertilizer">
        <el-container>
            <el-main>
                <el-button @click="dialogVisible = true" plain type="primary">添加培肥配药</el-button>
                <el-table :data="fertilizers" style="width: 100%;">
                    <el-table-column label="日期" prop="fdate" sortable></el-table-column>
                    <el-table-column label="名称" prop="fname"></el-table-column>
                    <el-table-column label="劳务费(元)" prop="fee"></el-table-column>
                    <el-table-column label="总质量损失率(%)" prop="lossRate"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="viewIngredient(scope.row)" plain size="small" type="primary">查看配料
                            </el-button>
                            <el-button @click="removeFI(scope.row)" plain size="small" type="danger">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-dialog :visible.sync="dialogVisible" title="添加记录">
                    <el-form :model="form">
                        <el-form-item :label-width="formLabelWidth" label="肥料或农药名称">
                            <el-input placeholder="" type="text" v-model="form.fName"></el-input>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="日期">
                            <el-date-picker type="date" v-model="form.fDate"></el-date-picker>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="劳务费">
                            <el-input-number v-model="form.fee"></el-input-number>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="总质量损耗比">
                            <el-input type="text" v-model="form.lossRate">
                                <template slot="append">%</template>
                            </el-input>
                        </el-form-item>
                        <el-button @click="dialogIngredientVisible = true" type="primary">添加原料</el-button>
                        <el-table :data="form.ingredients" style="width: 100%">
                            <el-table-column label="原料名称" prop="ingredientName"></el-table-column>
                            <el-table-column label="数量" prop="amount"></el-table-column>
                            <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button @click="removeIngredient(scope.$index)" size="small" type="danger">删除
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button @click="createFI" type="primary">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="dialogIngredientVisible" title="添加原料">
                    <el-form :model="ingredient">
                        <el-form-item :label-width="formLabelWidth" label="原料名称">
                            <el-select auto-complete="off" placeholder="请选择" v-model="ingredient.id">
                                <el-option :key="item.id"
                                           :label="item.ingredientName"
                                           :value="item.id"
                                           v-for="item in ingredients">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item :label-width="formLabelWidth" label="数量">
                            <el-input-number v-model="ingredient.amount"></el-input-number>
                        </el-form-item>
                    </el-form>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="dialogIngredientVisible = false">取 消</el-button>
                        <el-button @click="addIngredient" type="primary">确 定</el-button>
                    </div>
                </el-dialog>
                <el-dialog :visible.sync="dialogViewVisible" title="原料">
                    <el-table :data="ingredientsFromFertilizer" style="width: 100%">
                        <el-table-column label="名称" prop="ingredientName"></el-table-column>
                        <el-table-column label="数量" prop="amount"></el-table-column>
                    </el-table>
                    <div class="dialog-footer" slot="footer">
                        <el-button @click="dialogViewVisible = false" type="primary">确 定</el-button>
                    </div>
                </el-dialog>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Fertilizer",
        data() {
            return {
                dialogVisible: false,
                dialogIngredientVisible: false,
                dialogViewVisible: false,
                formLabelWidth: '120px',
                fertilizers: null,
                ingredients: null,
                ingredientsFromFertilizer: null,
                form: {
                    fName: '',
                    fDate: null,
                    fee: 0,
                    lossRate: 0,
                    ingredients: []
                },
                ingredient: {
                    ingredientName: '',
                    amount: 0,
                    id: null
                }
            }
        },
        created() {
            this.reloadData();
        },
        methods: {
            reloadData: function () {
                let _this = this;
                _this.httpGet('/api/getAllFertilizersAndIngredients', responseBean => {
                    _this.ingredients = responseBean.content.ingredients;
                    _this.fertilizers = responseBean.content.fertilizers;
                });
            },
            clearForm: function () {
                this.form.fName = '';
                this.form.fDate = null;
                this.form.fee = 0;
                this.form.lossRate = 0;
                this.form.ingredients = [];
            },
            addIngredient: function () {
                for (let j = 0; j < this.form.ingredients.length; j++) {
                    if (this.ingredient.id === this.form.ingredients[j].id) {
                        this.$message.info('已添加该原料');
                        this.dialogIngredientVisible = false;
                        return;
                    }
                }
                for (let i = 0; i < this.ingredients.length; i++) {
                    if (this.ingredient.id === this.ingredients[i].id) {
                        this.ingredient.ingredientName = this.ingredients[i].ingredientName;
                        break;
                    }
                }
                // 因为如果直接push的话, 是push this.ingredient的引用,会出现问题
                let temp = {
                    ingredientName: this.ingredient.ingredientName,
                    amount: this.ingredient.amount,
                    id: this.ingredient.id
                };
                this.form.ingredients.push(temp);
                this.dialogIngredientVisible = false;
            },
            removeIngredient: function (index) {
                this.form.ingredients.splice(index, 1);
            },
            createFI: function () {
                let _this = this;
                _this.dialogVisible = false;
                _this.httpPost('/api/createFI', _this.form, responseBean => {
                    _this.$message.success(responseBean.msg);
                    _this.reloadData();
                    _this.clearForm();
                });
            },
            removeFI: function (row) {
                let _this = this;
                _this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    _this.httpPost('/api/removeFI', {fId: row.id}, responseBean => {
                        _this.$message.success(responseBean.msg);
                        _this.reloadData();
                    });
                }).catch(() => {
                    _this.$message.info('已取消删除');
                });
            },
            viewIngredient: function (row) {
                let _this = this;
                _this.ingredientsFromFertilizer = null;
                _this.httpPost('/api/getIngredientsByFertilizer', {fId: row.id}, responseBean => {
                    this.ingredientsFromFertilizer = responseBean.content;
                    this.dialogViewVisible = true;
                });
            }
        }
    }
</script>

<style scoped>

</style>