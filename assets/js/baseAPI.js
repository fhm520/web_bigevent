//注意：每次调用$.get()\$post()\$ajax()的时候
//会先调用ajaxPrefilter这个热函数
//在这个函数中，可以真正拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://127.0.0.1:3000' + options.url
    console.log(options.url);
})