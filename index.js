/**
 * Module dependencies
 */

var reverse = {};
reverse.regex = require('reverse-regex');
reverse.string = require('reverse');

/**
 * Export `Scanner`
 */

module.exports = Scanner;

/**
 * Initialize `Scanner`
 */

function Scanner(str, offset) {
  if (!(this instanceof Scanner)) return new Scanner(str, offset);
  this.str = str;
  this.reversed = reverse.string(str);
  this.offset = offset || 0;
  this.len = str.length;
  this.m = null;
}

/**
 * Get or set the cursor
 */

Scanner.prototype.cursor = function(i) {
  if (!arguments.length) return this.offset;
  this.offset = i;
  return this;
};

/**
 * Get the match
 */

Scanner.prototype.match = function() {
  return this.m;
}

/**
 * Move offset to the first
 */

Scanner.prototype.first = function() {
  this.offset = 0;
  return this;
};

/**
 * Move offset to the last
 */

Scanner.prototype.last = function() {
  this.offset = this.str.length;
  return this;
};

/**
 * Get the next token.
 * Get the `n`th match.
 *
 * @param {String|Regex} expr
 * @param {Number} n
 * @return {String|null}
 * @api public
 */

Scanner.prototype.next = function(expr, n) {
  var peaking = this.peaking;
  n = n || 1;

  expr = (expr.source) ? expr : new RegExp(expr);
  var offset = peaking ? this.po : this.offset;
  var sliced = this.str.slice(offset);
  var m = this.m = expr.exec(sliced);
  if (!m) return null;

  var dx = m.index + m[0].length;
  if (peaking) this.po += dx;
  else this.offset += dx

  var out = m[0];
  while (--n) out = this.next(expr, false);
  this.m = out;
  return out;
};

/**
 * Get the previous token.
 * Get the `n`th match.
 *
 * @param {String|Regex} expr
 * @param {Number} n
 * @return {String|null}
 * @api public
 */

Scanner.prototype.previous =
Scanner.prototype.prev = function(expr, n) {
  var peaking = this.peaking;
  n = n || 1;

  expr = (expr.source) ? expr : new RegExp(expr);
  expr = reverse.regex(expr);
  var offset = this.len - (peaking ? this.po : this.offset);
  var sliced = this.reversed.slice(offset);
  var m = expr.exec(sliced);
  if (!m) return null;

  var dx = m.index + m[0].length;
  if (peaking) this.po -= dx;
  else this.offset -= dx;

  var out = reverse.string(m[0]);
  while (--n) out = this.prev(expr, false);
  this.m = out;
  return out;
};

/**
 * Peak forward or backward `n` matches.
 *
 * @param {String|Regex} expr
 * @param {Number} n
 * @return {String|null} [description]
 */

Scanner.prototype.peak = function(expr, n) {
  n = n || 1;

  this.peaking = true;
  this.po = this.offset;

  var out = null;
  if (n > 0) out = this.next(expr, n);
  else if (n < 0) out = this.prev(expr, Math.abs(n));

  this.peaking = false;
  return out;
}
