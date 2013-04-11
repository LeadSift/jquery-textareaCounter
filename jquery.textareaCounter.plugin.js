/*
 * jQuery Textarea Counter Plugin
 * Copyright (c) 2010 Roy Jin
 * Copyright (c) 2013 LeadSift
 * Version: 3.0 (11-APR-2013)
 * http://www.opensource.org/licenses/mit-license.php
 * Requires: jQuery v1.4.2 or later
 */
/*jslint regexp: true, laxcomma: true, browser: true, white: true, indent: 2, nomen: true, plusplus: true */
/*global $, jQuery
*/
(function($) {
  $.fn.textareaCount = function(options, fn) {
    var defaults = {
        maxCharacterSize: -1,
        truncate: true,
        originalStyle: 'originalTextareaInfo',
        warningStyle: 'warningTextareaInfo',
        errorStyle: 'errorTextareaInfo',
        warningNumber: 20,
        displayFormat: '#input characters | #words words'
      }
      , container = $(this)
      , charLeftCss = {
        'width' : container.width()
      }
      , charLeftInfo
      , numInput = 0
      , maxCharacters = options.maxCharacterSize
      , numLeft = 0
      , numWords = 0
      ;

    function getNewlineCount(content){
      var newlineCount = 0
        , i;
      for(i=0; i<content.length;i++){
        if(content.charAt(i) === '\n'){
          newlineCount++;
        }
      }
      return newlineCount;
    }

    function formatDisplayInfo(){
      var format = options.displayFormat;
      format = format.replace('#input', numInput);
      format = format.replace('#words', numWords);
      //When maxCharacters <= 0, #max, #left cannot be substituted.
      if(maxCharacters > 0){
        format = format.replace('#max', maxCharacters);
        format = format.replace('#left', numLeft);
      }
      return format;
    }

    function getInfo(){
      var info = {
        input: numInput,
        max: maxCharacters,
        left: numLeft,
        words: numWords
      };
      return info;
    }

    function getNextCharLeftInformation(container){
      return container.next('.charleft');
    }

    function isWin(){
      var strOS = navigator.appVersion;
      if (strOS.toLowerCase().indexOf('win') !== -1){
        return true;
      }
      return false;
    }

    function getCleanedWordString(content){
      var fullStr = content + " "
        , initial_whitespace_rExp = /^[^A-Za-z0-9]+/gi
        , left_trimmedStr = fullStr.replace(initial_whitespace_rExp, "")
        , non_alphanumerics_rExp = /[^A-Za-z0-9]+/gi
        , cleanedStr = left_trimmedStr.replace(non_alphanumerics_rExp, " ")
        , splitString = cleanedStr.split(" ")
        ;
      return splitString;
    }

    function countWord(cleanedWordString){
      var word_count = cleanedWordString.length-1;
      return word_count;
    }

    function countByCharacters(){
      var content = container.val()
        , contentLength = content.length
        , newlineCount
        , systemmaxCharacterSize
        , originalScrollTopPosition
        ;

      // Start Cut
      if(options.maxCharacterSize > 0){
        // If copied content is already more than maxCharacterSize,
        // chop it to maxCharacterSize only if truncate is true
        if(options.truncate && contentLength >= options.maxCharacterSize) {
          content = content.substring(0, options.maxCharacterSize);
        }

        newlineCount = getNewlineCount(content);

        // newlineCount new line character. For windows, it occupies 2 characters
        systemmaxCharacterSize = options.maxCharacterSize - newlineCount;
        if (!isWin()){
          systemmaxCharacterSize = options.maxCharacterSize;
        }
        if(options.truncate && contentLength > systemmaxCharacterSize){
          //avoid scroll bar moving
          originalScrollTopPosition = this.scrollTop;
          container.val(content.substring(0, systemmaxCharacterSize));
          this.scrollTop = originalScrollTopPosition;
        }
        charLeftInfo.removeClass(options.warningStyle + ' ' + options.errorStyle);
        if(systemmaxCharacterSize - contentLength <= options.warningNumber){
          charLeftInfo.addClass(options.warningStyle);
        }
        if(systemmaxCharacterSize - contentLength <= 0){
          charLeftInfo.addClass(options.errorStyle);
        }

        numInput = container.val().length + newlineCount;
        if(!isWin()){
          numInput = container.val().length;
        }

        numWords = countWord(getCleanedWordString(container.val()));

        numLeft = maxCharacters - numInput;
      } else {
        //normal count, no cut
        newlineCount = getNewlineCount(content);
        numInput = container.val().length + newlineCount;
        if(!isWin()){
          numInput = container.val().length;
        }
        numWords = countWord(getCleanedWordString(container.val()));
      }

      return formatDisplayInfo();
    }

    function limitTextAreaByCharacterCount(){
      charLeftInfo.html(countByCharacters());
      //function call back
      if(typeof fn !== 'undefined'){
        fn.call(this, getInfo());
      }
      return true;
    }

    options = $.extend(defaults, options);
    $("<div class='charleft'>&nbsp;</div>").insertAfter(container);
    charLeftInfo = getNextCharLeftInformation(container);
    charLeftInfo.addClass(options.originalStyle);
    charLeftInfo.css(charLeftCss);

    container.bind('keyup', function(event){limitTextAreaByCharacterCount();})
     .bind('mouseover', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);})
     .bind('paste', function(event){setTimeout(function(){limitTextAreaByCharacterCount();}, 10);});
  };
}(jQuery));
