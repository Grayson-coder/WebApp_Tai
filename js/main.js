//  导航的轮播
new Swiper('#nav .swiper-container', {
    slidesPerView: 6,
    spaceBetween: 1,
    freeMode: true,
    freeModeMomentumBounceRatio: 7,
});


// 轮播图区域
new Swiper('.carousel .swiper-container', {
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
});



/**
 * 频道按钮的显示与隐藏
 */
menuToggle()
function menuToggle() {
    let menuBtn = document.querySelector('#header .top .menu-btn')
    let mask = document.querySelector('#header .mask')
    let maskShow = false
    let scrollWrap = document.querySelector('#scroll-wrap')

    // 监听菜单按钮的点击
    menuBtn.addEventListener('touchstart', (e) => {
        maskShow = !maskShow
        if (maskShow) {
            mask.style.display = 'block'
            menuBtn.classList.add('cancel-btn')
        } else {
            mask.style.display = 'none'
            menuBtn.classList.remove('cancel-btn')
        }
    })

    scrollWrap.addEventListener('touchstart', () => {
        if (maskShow) {
            maskShow = !maskShow
            mask.style.display = 'none'
            menuBtn.classList.remove('cancel-btn')
        }
    })
}



/**
 * 导航点击变色
 */
activeNav()
function activeNav() {
    let navList = document.querySelectorAll('#nav .swiper-container a')
    navList.forEach((item, index) => {
        item.addEventListener('click', function () {
            navList.forEach(v => {
                v.classList.remove('active')
                navList[index].classList.add('active')
            })
        })
    })
}



/**
 * 电影内容的滑动逻辑
 */
movieScroll()
function movieScroll() {

    // 电影内容轮播区域
    init('.movie.one')
    init('.movie.two')
    init('.movie.three')

    function init(selector) {
        // 获取地区列表
        let countryList = document.querySelectorAll(`${selector} .country> span`)

        // 获取地区列表下激活的线
        let line = document.querySelector(`${selector} .country .line`)
        // 初始化激活的线对应的位置
        let x = countryList[0].offsetLeft + countryList[0].offsetWidth / 2 - line.offsetWidth / 2
        line.style.left = x + 'px'

        let index = -1  // 用于记录激活的地区
        new Swiper(`${selector} .swiper-container`, {
            initialSlide: 1,
            on: {
                // swiper从一个slide过渡到另一个slide结束时执行
                slideChangeTransitionEnd() {
                    //切换结束时，告诉我现在是第几个slide
                    let activeIndex = this.activeIndex

                    if (activeIndex >= 1) {
                        index = index >= 5 ? 0 : ++index
                    } else {
                        index = index < 1 ? 5 : --index
                    }

                    setTimeout(() => {
                        // 跳转到第一张轮播图
                        this.slideTo(1, 0, false)

                        countryList.forEach((item) => {
                            item.classList.remove('active')
                        })
                        countryList[index].classList.add('active')

                        // 设置绿色的线的偏移量
                        let x = countryList[index].offsetLeft + countryList[index].offsetWidth / 2 - line.offsetWidth / 2
                        line.style.left = x + 'px'

                        // console.log(index);

                        // if (activeIndex >= 1) {
                        //     index = index >= 5 ? 0 : ++index
                        //     console.log(index);
                        // } else {
                        //     index = index <= 1 ? 5 : --index
                        //     console.log(index);
                        // }


                    }, 500);
                }
            }
        });
    }




}


/**
 * 垂直滚动 （搜索框的显示与隐藏逻辑）
 */
verticalScroll()
function verticalScroll() {
    // 初始化betterscroll
    let bs = new BScroll('#scroll-wrap', {
        click: true,
        probeType: 3
    })

    let img = document.querySelectorAll('img')

    img.forEach(v => {
        // 所有图片加载完成后重新刷新滚动高度
        v.addEventListener('load', () => {
            bs.refresh()
        })
    })

    // 搜索框的显示与隐藏逻辑
    let nav = document.querySelector('#nav')
    let search = document.querySelector('#header .search')
    let searchBtn = document.querySelector('#header .search-btn')
    let searchShow = true

    searchBtn.addEventListener('click', () => {
        if (!searchShow) {
            search.style.opacity = 1
        } else {
            search.style.opacity = 0
        }
        searchShow = !searchShow
    })

    // 监听滚动
    bs.on('scroll', position => {
        let y = position.y
        let height = nav.offsetHeight
        // console.log(y);
        if (-y >= height) {
            search.style.opacity = 0
            searchShow = false
        } else {
            search.style.opacity = 1
            searchShow = true
        }
    })
}

