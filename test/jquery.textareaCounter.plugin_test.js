(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery.textareaCounter', {
    // This will run before each test in this module.
    setup: function() {
      this.$textarea = $('textarea');
    }
  });

  test('adds charleft div', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: -1 
    });
    strictEqual($('.charleft').length, 1);
  });

  test('truncate over max chars', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 5,
      truncate: true
    });
    this.$textarea.val('1234567890').keyup();
    strictEqual(this.$textarea.val().length, 5);
  });

  test('does not truncate if false', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 5,
      truncate: false
    });
    this.$textarea.val('1234567890').keyup();
    strictEqual(this.$textarea.val().length, 10);
  });

  test('standard char counter', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      charCounter: 'standard',
      'displayFormat': '#input,#left'
    });
    this.$textarea.val('1234567890').keyup();
    strictEqual($('.charleft').text(), '10,0');
  });

  test('newlines count normally', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      charCounter: 'standard',
      'displayFormat': '#input,#left'
    });
    this.$textarea.val('\n').keyup();
    strictEqual($('.charleft').text(), '1,9');
  });

  test('custom char counter', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      charCounter: function(content){
        strictEqual(content, '1234567890');
      }
    });
    this.$textarea.val('1234567890').keyup();
  });

  test('char counter no max', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 0,
      charCounter: 'standard',
      'displayFormat': '#input'
    });
    this.$textarea.val('123').keyup();
    strictEqual($('.charleft').text(), '3');
  });

  test('warningStyle is not shown if no warning', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      warningNumber: 5,
      warningStyle: 'custom-warning'
    });
    this.$textarea.val('1').keyup();
    ok(!$('.charleft').hasClass('custom-warning'));
  });

  test('warningStyle is shown if warning', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      warningNumber: 5,
      warningStyle: 'custom-warning'
    });
    this.$textarea.val('12345').keyup();
    ok($('.charleft').hasClass('custom-warning'));
  });

  test('warningStyle hidden if was shown previously', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      warningNumber: 5,
      warningStyle: 'custom-warning'
    });
    this.$textarea.val('12345').keyup();
    this.$textarea.val('1234').keyup();
    ok(!$('.charleft').hasClass('custom-warning'));
  });


  test('errorStyle is shown if no truncate and over', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 5,
      truncate: false,
      errorStyle: 'custom-error'
    });
    this.$textarea.val('12345').keyup();
    ok($('.charleft').hasClass('custom-error'));
  });

  test('errorStyle removed if was shown', function() {
    expect(1);
    this.$textarea.textareaCount({
      maxCharacterSize: 5,
      truncate: false,
      errorStyle: 'custom-error'
    });
    this.$textarea.val('12345').keyup();
    this.$textarea.val('1234').keyup();
    ok(!$('.charleft').hasClass('custom-error'));
  });

  test('originalStyle always shown', function() {
    expect(3);
    this.$textarea.textareaCount({
      maxCharacterSize: 10,
      warningNumber: 5,
      truncate: false,
      originalStyle: 'orig'
    });
    this.$textarea.val('1').keyup();
    ok($('.charleft').hasClass('orig'));
    this.$textarea.val('12345').keyup();
    ok($('.charleft').hasClass('orig'));
    this.$textarea.val('1234567890').keyup();
    ok($('.charleft').hasClass('orig'));
  });

  test('displayFormat displays all documented numbers', function() {
    expect(3);
    this.$textarea.textareaCount({
      'maxCharacterSize': 10,
      'truncate': false,
      'displayFormat': '#input,#max,#left,#words'
    });
    this.$textarea.val('123').keyup();
    strictEqual($('.charleft').text(), '3,10,7,1');
    this.$textarea.val('123 567 ').keyup();
    strictEqual($('.charleft').text(), '8,10,2,2');
    this.$textarea.val('123 567 901').keyup();
    strictEqual($('.charleft').text(), '11,10,-1,3');
  });

  test('display Callback called', function() {
    expect(1);
    this.$textarea.textareaCount({
      'maxCharacterSize': 10
    }, function(data){
      deepEqual(data, {
        input: 10,
        words: 1,
        left: 0,
        max: 10
      });
    });
    this.$textarea.val('1234567890').keyup();
  });

  module('TwitterStyleTestCase', {
    setup: function() {
      this.$textarea = $('textarea');
      this.$textarea.textareaCount({
        'maxCharacterSize': 140,
        'truncate': false,
        'charCounter': 'twitter',
        'warningNumber': 30,
        'displayFormat': '#input,#left'
      });
      this.$charleft = $('.charleft');
    }
  });
  
  test('No WWW or HTTP URLs counted as 22 chars', function() {
    expect(2);
    this.$textarea.val('s.xxx').keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val('s.xxx s.xxx').keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('Long urls counted as 22 chars', function() {
    var url = 'http://www.leadsift.com/happy-1st-birthday-leadsift/and-some-extra-spam/and-some-extra-spam/';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('MiXeD case urls counted as 22 chars', function() {
    var url = 'wWw.LeadSift.com/happy-1st-birthday-leadsift/And-More-Mixed';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('WWW urls counted as 22 chars', function() {
    var url = 'wWw.LeadSift.com';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('http urls counted as 22 chars', function() {
    var url = 'HTTP://LeadSift.com';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('http urls counted as 22 chars', function() {
    var url = 'HTTP://LeadSift.com';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "22,118");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "45,95");
  });

  test('Min two letter tld to count', function() {
    var url = 'http://lx.t';
    expect(2);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "11,129");
    this.$textarea.val(url + ' ' + url).keyup();
    strictEqual(this.$charleft.text(), "23,117");
  });

  test('Extra chars are counted', function() {
    var url = 'Xhttp://lx.tl';
    expect(1);
    this.$textarea.val(url).keyup();
    strictEqual(this.$charleft.text(), "23,117");
  });

  test('test all gltds without http or www are counted', function() {
    var url_base = 's.'
      , gtlds = ['aero', 'asia', 'biz', 'cat', 'com', 'coop', 'edu', 'gov', 'info', 'int', 'jobs', 'mil', 'mobi', 'museum', 'name', 'net', 'org', 'post', 'pro', 'tel', 'travel', 'xxx']
      , _this = this;

    expect(gtlds.length);
    gtlds.forEach(function(tld){
      var url = url_base + tld;
      _this.$textarea.val(url).keyup();
      strictEqual(_this.$charleft.text(), "22,118", "testing gtld "+tld);
    });
  });

  test('test iana root db tlds (english only)', function() {
    var url_base = 's.'
      , gtlds = ['ac', 'ad', 'ae', 'aero', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'arpa', 'as', 'asia', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'biz', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cat', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'com', 'coop', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'edu', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gov', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'info', 'int', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jobs', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mil', 'mk', 'ml', 'mm', 'mn', 'mo', 'mobi', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'museum', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'name', 'nc', 'ne', 'net', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'org', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'post', 'pr', 'pro', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sr', 'ss', 'st', 'su', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tel', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'travel', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'xxx', 'ye', 'yt', 'za', 'zm', 'zw', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'so'] // 276 tlds
      , _this = this;
    expect(gtlds.length);
    gtlds.forEach(function(tld){
      var url = url_base + tld;
      _this.$textarea.val(url).keyup();
      strictEqual(_this.$charleft.text(), "22,118", "testing gtld "+tld);
    });
  });

}(jQuery));
