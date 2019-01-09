<template>
    <div id="fertilizer">
        <el-container>
            <el-main>
                <el-button @click="dialogVisible = true" type="primary" plain>添加培肥配药</el-button>
                <el-table :data="fertilizers" style="width: 100%;">
                    <el-table-column prop="fdate" label="日期" sortable></el-table-column>
                    <el-table-column prop="fname" label="名称"></el-table-column>
                    <el-table-column prop="fee" label="劳务费(元)"></el-table-column>
                    <el-table-column prop="lossRate" label="总质量损失率(%)"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="viewIngredient(scope.row)" type="primary" size="small" plain>查看配料
                            </el-button>
                            <el-button @click="removeFI(scope.row)" type="danger" size="small" plain>删除</el-button>
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
                                    <el-button @click="removeIngredient(scope.$index)" type="danger" size="small">删除
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
            this.reloadDate();
        },
        methods: {
            reloadDate: function () {
                let _this = this;
                this.$http.get('/api/getAllFertilizersAndIngredients').then(function (response) {
                    let resp = response.body;
                    if (resp && resp.status === 200) {
                        _this.ingredients = resp.content.ingredients;
                        _this.fertilizers = resp.content.fertilizers;
                    } else {
                        _this.handleResponseError(resp, _this);
                    }
                })
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
                        this.$message({
                            type: 'info',
                            message: '已添加该原料'
                        });
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
                this.dialogVisible = false;
                let data = this.form;
                let _this = this;
                this.$http.post('/api/createFI', data).then(function (response) {
                    let resp = response.body;
                    if (resp && resp.status === 200) {
                        _this.$message({
                            type: 'success',
                            message: resp.msg
                        });
                        _this.reloadDate();
                    } else {
                        _this.handleResponseError(resp, _this);
                    }
                    _this.clearForm();
                });
            },
            removeFI: function (row) {
                let fId = row.id;
                let _this = this;
                _this.$confirm('此操作将永久删除该记录,是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(function () {
                    _this.$http.post('/api/removeFI', fId).then(function (response) {
                        let resp = response.body;
                        if (resp && resp.status === 200) {
                            _this.$message({
                                type: 'success',
                                message: resp.msg
                            });
                            _this.reloadDate();
                        } else {
                            _this.handleResponseError(resp, _this);
                        }

                    })
                }).catch(function () {
                    _this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            viewIngredient: function (row) {
                let _this = this;
                _this.ingredientsFromFertilizer = null;
                this.$http.post('/api/getIngredientsByFertilizer', row.id).then(function (response) {
                    let resp = response.body;
                    if (resp && resp.status === 200) {
                        this.ingredientsFromFertilizer = resp.content;
                    } else {
                        _this.handleResponseError(resp, _this);
                    }
                    this.dialogViewVisible = true;
                });
            }
        }
    }
</script>

<style scoped>

</style>