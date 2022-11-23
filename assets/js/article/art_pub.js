$(function () {
    var layer = layui.layer
    var form = layui.form
    initlist ()
    // 初始化富文本编辑器
    initEditor()
    //获取下拉菜单列表数据
    function initlist () {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: function (res) {
                if(res.code !== 0) {
                    return layer.msg('获取失败')
                }
                //调用模板引擎函数
                var htmlstr = template('tpl_Cate', res)
                $('[name=cate_id]').html(htmlstr)
                form.render()
            }
        })
    }

        // 1. 初始化图片裁剪器
    var $image = $('#image')
    
    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#fm').on('click', function() {
        $('#coverfile').click()
    })

    $('#coverfile').on('change', function (e) {
        var arr = e.target.files
        if(arr.length === 0) {
            return
        }
        //创建url地址
        var newImgURL = URL.createObjectURL(arr[0])
        //建立新的裁剪区
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    //定义已发布按钮
    var art_state = '已发布'

    $('#cd').on('click', function () {
        art_state = '草稿'
    })


    $('#form_pub').on('submit', function(e) {
        e.preventDefault()
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob)
                pub (fd)
            })
        
        
            
    })
    //发起请求
    function pub (fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            //必须添加以下
            contentType: false,
            processData: false,
            success: function (res) {
                if(res.code !== 0) {
                    return layer.msg('发布失败')
                }
                layer.msg('发布成功')
                location.href = '/article/art_list.html'
            }
        })
    }
})