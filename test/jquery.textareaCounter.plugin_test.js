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
      this.textarea = $('textarea');
    }
  });

  test('adds charleft div', function() {
    expect(1);
    this.textarea.textareaCount({
      maxCharacterSize: -1 
    });
    strictEqual($('.charleft').length, 1);
  });

  test('truncate over max chars', function() {
    this.textarea.textareaCount({
      maxCharacterSize: 5,
      truncate: true
    });
    this.textarea.val('1234567890').keyup();
    strictEqual(this.textarea.val().length, 5);
  });

}(jQuery));
