$(function () {
    getInfo()

    var layer = layui.layer

    //退出登录
    $('.btn_loginout').on('click', function () {

        layer.confirm('确定退出登录?', {icon: 3, title: '提示'}, function (index) {
            //清空本地储存的token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/login.html'
            layer.close(index)
        })
    })



})


function getInfo() {

    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token' ) || ''
        // },
        success: function (res) {

            if(res.code !== 0) {
                return layer.msg('获取信息失败')
            }
            rederAvater(res.data)


        },
        // complete: function (res) {
        //     console.log(res);
        //     if(res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    })

}
//渲染头像
function rederAvater (user) {
    //获取用户的名称
    var name = user.nickname || user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp; &nbsp;' + name)
    //按需渲染用户头像
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avater').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avater').html(first).show()
    }
}