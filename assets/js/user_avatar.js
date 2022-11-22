$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //上传文件
  $('#btnUp').on('click', function () {
    $('#file').click()
  })

  //当文件发生2变化时会触发change事件
  $('#file').on('change', function (e) {
    if(e.target.files.length === 0) {
        return layui.layer.msg('请选择文件')
    }
    //获取文件
    // console.log(e);
    var file = e.target.files[0]
    //创建url地址
    var newUrl = URL.createObjectURL(file)

    $image
   .cropper('destroy')      // 销毁旧的裁剪区域
   .attr('src', newUrl)  // 重新设置图片路径
   .cropper(options)        // 重新初始化裁剪区域

  })

  //更换头像
  $('#btnUpload').on('click', function () {
    // console.log(1111);
    //获取裁剪后的图片
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    //将裁剪后的图片上传到服务器，发起post请求
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {avatar: dataURL},
        success: function (res) {
            console.log(res);
            if(res.code !== 0) {
                return layui.layer.msg('更换头像失败')
            }
            layui.layer.msg('更换头像成功')

            //请求图片
            window.parent.getInfo()


        }

    })

  })
})