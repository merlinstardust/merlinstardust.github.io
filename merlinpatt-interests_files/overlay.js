




/*
     FILE ARCHIVED ON 15:27:46 Dec 21, 2014 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:18:24 Sep 28, 2015.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
$(function() {
    $('.activator').click(function(){
		$('#overlay').fadeIn('fast',function(){
            $('#box').animate({'right':'30%'},0);
        });
        $('#overlay').fadeIn('fast',function(){
            $('#box').animate({'left':'30%'},0);
        });
    });
    $('#boxclose').click(function(){
		$('#box').animate({'left':'-200%'},0,function(){
            $('#overlay').fadeOut('fast');
        });
        $('#box').animate({'right':'160%'},0,function(){
            $('#overlay').fadeOut('fast');
        });
    });
});
