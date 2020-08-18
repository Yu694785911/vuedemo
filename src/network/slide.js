export function slide() {
    var p = 0, t = 0; //上下滚动时隐藏导航栏
    $(window).scroll(function (e) {
     p = $(this).scrollTop();
        console.log(p, "1")
        // console.log(t)
        if (p > 500 && p !== 0) {$('.my-nav-footer').slideDown('fast');} else { $('.my-nav-footer').slideUp('fast');}

        //更新上一次的scroll值

        t = p;;

    })
}