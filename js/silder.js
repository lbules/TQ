(function () {
    // 获取dom节点
    const ndlist = document.getElementById('imgList')
    const ndImgList = ndlist.getElementsByTagName('li')

    const ndSelction = document.getElementById('selction')
    const ndSelctionList = ndSelction.getElementsByTagName('li')

    const ndLeft = document.getElementById('left')
    const ndRight = document.getElementById('rigth')


    let timer //定时器
    let index = 0 //初始值
    let lock = false
    let length = ndImgList.length //图片数量


    // 1.自动轮播
    const inervalRun = function () {
        timer = setInterval(() => {
            next();
        }, 3000);
    }
    // 更改属性
    const show = function (index) {
        // 设置新图透明度为1,显示
        ndImgList[index].style.opacity = 1
        ndSelctionList[index].style.height = '14px'
        ndSelctionList[index].style.backgroundColor = '#fff'
    }
    const hidden = function (index) {
        // 当前图片透明度设为0,隐藏
        ndImgList[index].style.opacity = 0
        ndSelctionList[index].style.height = '10px'
        ndSelctionList[index].style.backgroundColor = '#bfc2c4'
    }

    // 1.1 切换下一张
    const next = function () {
        // 是否已锁
        if (lock) return
        // 锁上
        lock = true
        hidden(index)
        // 索引值加1
        index++
        // 判断是否为最后一张图片
        if (index > length - 1) {
            index = 0
        }
        show(index)
        setTimeout(() => {
            lock = false
        }, 2000)
    }
    // 1.2 切换上一张
    const previous = function () {
        if (lock) return

        lock = true
        hidden(index)

        // 是否为最后一张
        if (index === 0) {
            index = 5
        }
        index--
        show(index)

        setTimeout(() => {
            lock = false
        }, 2000)
    }

    // 开始轮播
    inervalRun();

    // 2.切换左右按钮图片
    ndLeft.onclick = function () {
        previous()
    }

    ndRight.onclick = function () {
        next()
    }

    // 3.点击下方小按钮切换图片
    const selctionList = function () {
        for (let i = 0; i < length; i++) {
            ndSelctionList[i].onclick = function () {
                // 当前图片透明度设为0,隐藏
                hidden(index)
                // 更新index
                index = i
                // 设置新图透明度为1,显示
                show(index)
            }
        }
    }
    selctionList()

    // 4.鼠标移入暂停/移出继续
    ndlist.onmouseover = function () {
        clearTimeout(timer)
    }
    ndlist.onmouseout = function () {
        inervalRun();
    }
})()