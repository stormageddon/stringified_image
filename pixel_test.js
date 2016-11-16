'use strict';

var fs = require('fs');
var PNG = require('pngjs').PNG;
var ctx = require('axel');
var DEFAULT_STRING = 'abcdefghijklmnopqrstuvwxyz';

ctx.clear();

var imageUrl = process.argv[2];

fs.createReadStream(imageUrl).pipe(new PNG({
  filterType: 4
})).on('parsed', function(data) {
  var srcStrIdx = 0;
  var sourceStr = process.argv[3] || DEFAULT_STRING;

  for (var y = 1; y < this.width; y++) {
    var srcChar = sourceStr[srcStrIdx];
    for (var x = 0; x < this.height; x++) {//x <= this.height; x++) {
      var idx = (this.width * x + y) << 2;


      // Set pixel background color
      ctx.fg(this.data[idx], this.data[idx + 1], this.data[idx + 2]);


      // Print char to terminal
      ctx.text(y, x, srcChar);
    }
    srcStrIdx++;
    if (srcStrIdx >= sourceStr.length) {
      srcStrIdx = 0;
    }
  }
  ctx.cursor.restore();
//  this.pack().pipe(fs.createWriteStream('out.png'));
}).on('error', function(err) {
  console.log('err:',err);
});
