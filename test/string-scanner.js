/**
 * Module Dependencies
 */

var assert = require('assert');
var scanner = require('string-scanner');

/**
 * Tests
 */

describe('string-scanner', function() {
  it('should move forward across words', function() {
    var s = scanner('hi there');
    assert('hi' == s.next(/\w+/))
    assert(2 == s.cursor())
    assert('there' == s.next(/\w+/))
    assert(8 == s.cursor())
    assert(null == s.next(/\w+/))
    assert(8 == s.cursor())
  });

  it('should move forward across mixed expressions', function() {
    var s = scanner('hi there matt');
    assert(' ' == s.next(/\s+/))
    assert(3 == s.cursor())
    assert(' ' == s.next(/\s+/))
    assert(9 == s.cursor())
    assert('matt' == s.next(/\w+/))
    assert(13 == s.cursor())
  });

  it('should get the nth next token', function() {
    var s = scanner('hi hi hi');
    assert(0 == s.cursor())
    assert('hi' == s.next('hi', 3));
    assert(8 == s.cursor());
    assert(null == s.next('hi'));
  })

  it('should move backwards across words', function() {
    var s = scanner('hi there there').last();
    assert(14 == s.cursor())
    assert('there' == s.prev(/\w+/))
    assert(9 == s.cursor())
    assert('there' == s.prev(/\w+/))
    assert(3 == s.cursor())
    assert('hi' == s.prev(/\w+/))
    assert(0 == s.cursor())
    assert(null == s.prev(/\w+/))
    assert(0 == s.cursor())
  });

  it('should get the nth previous token', function() {
    var s = scanner('hi there there').last();
    assert(14 == s.cursor())
    assert('there' == s.prev(/\w+/, 2))
    assert(3 == s.cursor())
    assert('hi' == s.prev(/\w+/))
    assert(0 == s.cursor())
    assert(null == s.prev(/\w+/))
    assert(0 == s.cursor())
  });

  it('should move backwards with offset words', function() {
    var s = scanner('hi there there', 12);
    assert(12 == s.cursor())
    assert('there' == s.prev('there'))
    assert(3 == s.cursor())
    assert('hi' == s.prev('hi'))
    assert(0 == s.cursor())
    assert(null == s.prev('hi'))
    assert(0 == s.cursor())
  });

  it('should peak forwards', function() {
    var s = scanner('hi there matt');
    assert(0 == s.cursor())
    assert('hi' == s.peak(/\w+/))
    assert(0 == s.cursor())
    assert('hi' == s.peak(/\w+/))
    assert('hi' == s.next(/\w+/))
    assert(2 == s.cursor())
    assert('matt' == s.peak(/\w+/, 2))
    assert('matt' == s.next(/\w+/, 2))
    assert(13 == s.cursor())
  })


  it('should peak backwards', function() {
    var s = scanner('hi there there').last();
    assert(14 == s.cursor())
    assert('there' == s.peak('there', -1))
    assert(14 == s.cursor())
    assert('hi' == s.peak(/\w+/, -3))
    assert(14 == s.cursor())
    assert('there' == s.peak('there', -1))
    assert('there' == s.prev('there'))
    assert(9 == s.cursor())
  })
})
