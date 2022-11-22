$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
          samepwd: function (value) {
            if(value === $('[name=old_pwd]').val()) {
                return '新旧密码不能相同'
            }
          },
          samerepwd: function (value) {
            if(value !== $('[name=new_pwd]').val()) {
                return '两次密码不一致'
                
            }
          }
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            //获取表单终的数据
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功')
            }
        })
    })
})