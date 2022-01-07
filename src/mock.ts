

export const activitSource = () => {
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `活动${i}`,
        created: '2021-12-22',
        url: 'https://qimai-1251581441.cos.ap-shanghai.myqcloud.com/qimai-mp/test/1457587149057691648/2021-11-15/064E7D39-9DE3-49F8-8456-09F5209D0E4C_1636941868160a6f6f885.png',
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
        qcode: 'https://qimai-1251581441.cos.ap-shanghai.myqcloud.com/qimai-mp/test/1457587149057691648/2021-11-15/064E7D39-9DE3-49F8-8456-09F5209D0E4C_1636941868160a6f6f885.png',
      });
    }
    return data
}