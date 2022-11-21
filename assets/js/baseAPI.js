//注意：每次调用$.get()\$post()\$ajax()的时候
//会先调用ajaxPrefilter这个热函数
//在这个函数中，可以真正拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3000' + options.url
    // console.log(options.url);
    if(options.url.indexOf('/my/') !== -1 ) {
        options.headers = {Authorization: localStorage.getItem('token' ) || ''}
    }
    options.complete = function (res) {
        if(res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }

    }
})