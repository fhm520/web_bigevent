$(function () {
    getData ()




    //发起get请求，获取数据
    function getData () {
        $.ajax({
            method: 'get',
            url: '/my/cate/list',
            success: function (res) {
                console.log(res);
                if(res.code !== 0) {
                    return layui.layer.msg('获取文章分类失败')
                }
                var htmlstr = template('moban', res)
                $('tbody').html(htmlstr)
            }
        })
    }
    var open = null
    $('#btncate').on('click', function () {
        //弹出页面
         open = layui.layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '300px'],
            content: $('#qc_table').html()
        })
    })

    $('body').on('submit', '#form_table', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/cate/add',
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    return layui.layer.msg('添加失败')
                }
                layui.layer.msg('添加成功')
                getData ()

                layui.layer.close(open)
            }
        })

    })

    //为编辑====================================================
    var indexedit = null
    $('body').on('click', '#btn_edit', function () {
        indexedit = layui.layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '300px'],
            content: $('#qc_edit').html()
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'get',
            url: `/my/cate/info/?id=${id}`,
            success: function (res) {
                layui.form.val('form_edit', res.data)
            }
        })
    })
    $('body').on('submit', '#form_edit', function (e) {
        e.preventDefault()
        // alert(11)
        $.ajax({
            method: 'put',
            url: '/my/cate/info',
            data: $(this).serialize(),
            success: function (res) {
                if(res.code !== 0) {
                    return layui.layer.msg('修改失败')
                }
                getData ()
                layui.layer.close(indexedit)


            }
        })
    })


    //删除=======================================================
    $('body').on('click', '#btn_del', function () {
        //获取每一行的数据，id
        var id = $(this).attr('data-id')
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            //发起请求
            $.ajax({
                method: 'delete',
                url: `/my/cate/del?id=${id}`,
                success: function (res) {
                    if(res.code !== 0) {
                        return layui.layer.msg('删除失败')
                    }
                    layui.layer.msg('删除成功')
                    layer.close(index)
                    // 删除后更新数据
                    getData ()
                }
            })
          })
            
    

    })
})