var Word, ctx, curr, draw, mouseClicked, setup, windowResized, words;

ctx = null;

curr = null;

words = [];

Word = (function() {
  function Word() {}

  return Word;

})();

({
  constructor: function(ctx1, id, text, link, x, y) {
    this.ctx = ctx1;
    this.id = id;
    this.text = text;
    this.link = link;
    this.x = x;
    this.y = y;
    this.animateStartIndex = 0;
    this.animateSpeed = 1;
    this.width = this.ctx.measureText(this.text).width * 1.2;
    this.displayText = this.text;
    this.colorStop = 1;
    return this.state = 0;
  },
  update: function() {
    var r;
    if (curr && curr.id === this.id) {
      this.state = 1;
    } else {
      if (this.state === 1) {
        this.state = 0;
      }
      if (this.state === 0) {
        r = random(0, 1111);
        if (r < 1) {
          this.state = 2;
          this.animateStartIndex = 0;
          this.animateSpeed = random(0.11, 0.66);
        } else if (r < 2) {
          this.state = 3;
          this.animateStartIndex = 0;
        } else if (r < 4) {
          this.state = 4;
          this.animateStartIndex = 0;
          this.animateSpeed = random(0.11, 0.66);
        }
      }
    }
    if (this.state === -1) {
      return this.displayText = "";
    } else if (this.state === 0) {
      return this.displayText = this.text;
    } else if (this.state === 1) {
      this.colorStop = max(min((mouseX - curr.x) / curr.width, 1), 0);
      return this.displayText = this.text;
    } else if (this.state === 2) {
      if (this.animateStartIndex < this.text.length) {
        this.animateStartIndex += this.animateSpeed;
        this.displayText = "";
        if (this.animateStartIndex > 0) {
          return this.displayText = this.text.substring(0, int(this.animateStartIndex));
        }
      } else {
        return this.state = 0;
      }
    } else if (this.state === 3) {
      this.displayText = this.text;
      if (random(111) < 1) {
        this.displayText = "";
      }
      this.animateStartIndex++;
      if (this.animateStartIndex > 1111) {
        return this.state = 0;
      }
    } else if (this.state === 4) {
      this.colorStop = cos(this.animateStartIndex * 0.22 * this.animateSpeed) * 0.5 + 0.5;
      this.displayText = this.text;
      this.animateStartIndex++;
      if (this.animateStartIndex > 111) {
        return this.state = 0;
      }
    }
  },
  draw: function() {
    this.color = this.ctx.createLinearGradient(this.x, this.y, this.x + this.width, this.y);
    this.color.addColorStop("0", "#111");
    this.color.addColorStop(this.colorStop, "#fff");
    this.color.addColorStop("1.0", "#111");
    this.ctx.fillStyle = this.color;
    return this.ctx.fillText(this.displayText, this.x, this.y);
  }
});

setup = function() {
  var canvas, index, startX, startY, stories;
  stories = selectAll('.story-item');
  if (stories.length === 0) {
    return;
  }
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.id('canvas').position(0, 0).style('position', 'absolute');
  ctx = canvas.drawingContext;
  ctx.font = "27px San Francisco";
  startX = 0;
  startY = 50;
  return index = 0;
};

draw = function() {};

windowResized = function() {
  return resizeCanvas(windowWidth, windowHeight);
};

mouseClicked = function() {
  if (curr !== null) {
    return window.location = curr.link;
  }
};
