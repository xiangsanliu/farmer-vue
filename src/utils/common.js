export const handleResponseError = (resp, vm) => {
    let _this = vm;
    if (resp.status === 401) {
        _this.$alert('未登录,请先登录!', '提示', {
            confirmButtonText: '确定',
            callback: function () {
                window.location.href = "/login.html";
            }
        });
    } else if (resp.status === 403) {
        _this.$message.error('无此权限');
    }
};