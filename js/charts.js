(function(){
    // 请求数据
    function ajax(url) {
        const p = new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(
                            JSON.parse(xhr.responseText)
                        )
                    }
                } else if (xhr.status === 404) {
                    reject(new Error('404 not found'))
                }
            }
            xhr.send(null)
        })
        return p
    }

    // 获取节点
    const ndline = document.getElementById('line')
    const ndpie = document.getElementById('pie')
    const ndhistogram = document.getElementById('histogram')

    // 数据接口请求地址
    const monthUrl = 'https://edu.telking.com/api/?type=month'
    const weekUrl = 'https://edu.telking.com/api/?type=week'

    const dataX = []

    ajax(monthUrl).then(res => {
        const dataY = [...res.data.series]
        const dataX = [...res.data.xAxis]
        const lineChart = echarts.init(ndline)
        let option = {
            title: {
                text: '曲线图数据展示',
                left: "center",
                textStyle: {
                    fontSize: 20,
                    lineHeight: 50
                },
            },
            xAxis: {
                type: 'category',
                data: dataX
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            series: [{
                data: dataY,
                type: 'line',
                smooth: true,
                areaStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: 'rgba(243, 246, 254,0.3)' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: 'rgba(58,132,255,0.3)' //   100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#4662d9',
                        lineStyle: {
                            color: '#5f97f1' //改变折线颜色
                        },
                        label: {
                            show: true
                        }
                    }
                },
            }]
        };
        lineChart.setOption(option)

    }).catch(err => {
        console.error(err)
    })

    ajax(weekUrl).then(res => {
        const pieChart = echarts.init(ndpie)
        const histogramChart = echarts.init(ndhistogram)
        // 获取数据
        const value = [...res.data.series]
        const name = [...res.data.xAxis]
        const showData = []

        for (let i = 0; i < name.length - 1; i++) {
            showData.push({
                "value": value[i],
                "name": name[i]
            })
        }
        // 饼图
        pieOption = {
            title: {
                text: '饼状图数据展示',
                left: 'center',
                textStyle: {
                    fontSize: 20,
                    lineHeight: 50
                },
            },
            series: [{
                name: '访问来源',
                type: 'pie',
                radius: '50%',
                data: showData,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        };
        pieChart.setOption(pieOption)

        // 柱状图
        histogramChartOption = {
            title: {
                text: '饼状图数据展示',
                left: 'center',
                textStyle: {
                    fontSize: 20,
                    lineHeight: 50
                },
            },
            color:['#4587f0'],
            xAxis: {
                type: 'category',
                data: name
            },
            yAxis: {
                name: '商品数',
                type: 'value'
            },
            series: [{

                data: value,
                type: 'bar',
                barWidth:25
            }]
        };
        histogramChart.setOption(histogramChartOption)

    }).catch(err => {
        console.error(err)
    })
})()