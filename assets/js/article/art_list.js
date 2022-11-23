$(function () {
    var laypage = layui.laypage
    //参数太多，可以定义一个参数对象
    var q = {
        pagenum: 1,//页码值，默认请求第一页的数据
        pagesize: 2, //每页显示几条数据，默认每页显示2条
        cate_id: '',//文章分类的id
        state: ''//文章的发布状态
    }
    

    //定义时间过滤器
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = zro(dt.getMonth() + 1)
        var d = zro(dt.getDate())
        var h = zro(dt.getHours())
        var mm = zro(dt.getMinutes())
        var s = zro(dt.getSeconds())
        return `${y}-${m}-${d} ${h}:${mm}:${s}`
    }

    //补零函数
    function zro(n) {
        return n > 10? n:'0' + n
    }

    initTable ()
    initCase ()




    
    //发起请求，获取了文章列表数据
    function initTable () {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if(res.code !== 0) {
                    return layui.layer.msg('获取文章列表失败')
                }
                var htmlstr = template('tpl-table', res)
                $('tbody').html(htmlstr)
                renderPage (res.total)
            }
        })
    }

    //发起请求，获取文章分类数据
    function initCase () {
        $.ajax({
            method: 'get',
            url: '/my/cate/list', 
            success: function (res) {
                console.log(res);
                if(res.code !== 0) {
                    return layui.layer.msg('获取分类失败')
                }
                var htmlstr = template('tpl_cate', res)
                console.log(htmlstr);
                $('#cate_id').html(htmlstr)
                //通知layui重新渲染
                layui.form.render()
            }
        })
    }

    //筛选
    $('#form_cate').on('submit', function (e) {
        e.preventDefault()
        //获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        //重新渲染数据表格
        initTable ()
    })


    //调用渲染分页的方法
    function renderPage (total) {
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数
            limit: q.pagesize,//每页显示几条数据
            curr: q.pagenum,//默认选择的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 4, 5, 10],
            jump: function (obj, first) {
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first) {
                    initTable ()
                }
                
            }
          })


    }

    //删除操作
    $('body').on('click', '#btn_del', function () {
        //获取删除按钮个数
        var len = $('#btn_del').length
        //获取文章id
        var id = $(this).attr('data-id')
        //弹出框
        layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
            //请求数据
            
            $.ajax({
                method: 'delete',
                url: `/my/article/info?id=${id}`,
                success: function (res) {
                    if(res.code !== 0) {
                        return layui.layer.msg('删除失败')
                    }
                    layui.layer.msg('删除成功')
                    // layer.close(index)
                    if(len === 1) {
                        q.pagenum = q.pagenum === 1? 1: q.pagenum - 1
                    }
                    initTable ()
                }
            })
          })
    })
})