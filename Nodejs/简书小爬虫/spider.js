const http = require('http');
const cheerio = require('cheerio');
const fs = require('fs');
const outPath = __dirname + '\\jianshu\\';
const url = 'http://www.jianshu.com';
let html = '';
let $data = [];
const getContent = (param, index) => {
  return new Promise(function(resolve, reject) {
    let $content = '';
    http.get(param.url, function(res) {
      res.on('data', (data) => {
        $content += data.toString();
      })
      res.on('end', () => {
        let $ = cheerio.load($content);
        $data[index].author = $('.author .info .name a').text();
        let _detail = $('.show-content').text();
        fs.writeFile(outPath + param.title + '.txt', _detail, (err) => {
          if (err) console.log(err);
        });
        resolve();
      })
    })
  });
};
!fs.existsSync(outPath) && fs.mkdirSync(outPath)
http.get(url, function(res) {
  res.on('data', (data) => {
    html += data.toString();
    console.log('---------------------------加载中--------------------------------');
  })
  res.on('end', () => {
    let $ = cheerio.load(html);

    let ps = [];
    $('.note-list').find('.title').each((index, val) => {
      let _title = $(val).text().replace(/[^\u4e00-\u9fa5|,]|\|+/g, '');
      let _url = $(val).attr('href');
      $data.push({
        title: _title,
        url: url + _url
      });
      var a = getContent($data[index], index);
      ps.push(a);
    })

    Promise.all(ps).then(function() {
      fs.writeFileSync('data.json', JSON.stringify($data, null, 2));
      console.log('json 输出目录：' + __dirname + 'data.json');
      console.log('数据采集完毕 输出目录：' + outPath);
    });
  })
})