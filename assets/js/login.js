$(function () {
    $('#link_login').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })

    $('#link_reg').on('click', function () {
        $('.reg_box').hide()
        $('.login_box').show()
    })

    //验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'] ,
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if(pwd !== value) {
                return alert('两次密码不一致')
            }
        }
    })


    //监听提交事件并调接口

    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password').val()}
        $.post('/api/reg', data, function(res) {
            console.log(res);
            if(res.code !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('#link_reg').click()
        })
    })

    //登录
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            //获取登录表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                // console.log(res.token);
                //将登陆成功得到的token字符串，保存到localstorage中
                localStorage.setItem('token', res.token)
                //跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})

