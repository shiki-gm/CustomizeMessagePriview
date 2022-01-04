

export const activitSource = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `活动${i}`,
        created: '2021-12-22',
      });
    }
    return data
}

export const goodsSource = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `商品${i}`,
        price: '￥' + 50,
        num: 1200 + i,
        left: 1200 + i,
      });
    }
    return data
}