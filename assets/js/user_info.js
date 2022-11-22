$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if(value.length > 6) {
                return '昵称长度必须在1~6个字符之间'
            }
        }
    })
    userInfo1 ()


    //初始化用户信息
    function userInfo1 () {
        //发起请求
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                //判断
                if(res.code !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                // console.log(res);
                //调研form.val()为表担负值
                form.val('formUserInfo', res.data)
            }
        })
    }
    //重置
    $('#btnSet').on('click', function (e) {
        console.log(11);
        //阻止默认行为
        e.preventDefault()
        userInfo1 ()

    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    return  layui.layer.msg('更新用户信息失败')
                }
                layui.layer.msg('更新用户信息成功')
                window.parent.getInfo()
            }
        })
    })

})