/**
 * jQuery Plugin SocialMartWidget(smw)
 *
 * Developed by: Alexander Berdyshev
 *
 * Version: 1.0
 *
 *//*


$(document).ready(function () {

    setTabsEqualHeight();


    $('.smw__tab__nav a').on('click', function () {
        var tabs = $(this).closest('.smw__stuff').find('.smw__tab__contents__item');
        var tabsNav = $(this).closest('.smw__tab__nav');
        tabsNav.find('a').removeClass('active');
        $(this).addClass('active');
        var index = $(this).parent().index();
        tabs.css('display', 'none');
        tabs.eq(index).css('display', 'block');
        $('.smw__impression__list').jScrollPane();
  //      $('.smw__prices__list').jScrollPane();
        return false;
    })

    $('.smw__impression__filter a').on('click', function () {
        $('.smw__impression__filter a').removeClass('active');
        $(this).addClass('active');
    })

    //  $('.smw__tab__nav__reviews').trigger('click')

    $('.where-to-buy__trigger').click(function () {
        $(this).next().fadeToggle(300);
    })

    $('.smw__footer').click(function () {
        $('.smw__stuff__in').not($(this).prev()).slideUp();
        //  $('.smw__footer').not($(this)).slideUp();
        //  $(this).slideDown();
        $(this).prev().slideDown();
        $('.smw__stuff').removeClass('opened');
        $(this).closest('.smw__stuff').addClass('opened');
        $('.smw__tab__nav__prices').each(function () {
            $(this).trigger('click');
        })
    })

    $('a').on('click',function(e){
        e.preventDefault();
    })

    $('.smw__footer').eq(0).trigger('click')
    $('.smw__tab__nav__reviews').eq(0).trigger('click')


})

function setTabsEqualHeight() {
    $('.smw__tab__contents__item').css({
        'position':'absolute',
        'left':0,
        'top':0,
        'display':'block'
    });
    var heightMax = 0;
    $('.smw__tab__contents__item').each(function () {

        if ($(this).height() > heightMax)
            heightMax = $(this).height();
    })
    $('.smw__tab__contents__item').height(heightMax);
    $('.smw__prices__list').height(heightMax);
    $('.smw__impression__list').height(heightMax - 47);

    $('.smw__tab__contents__item').css({
        'position':'relative',
        'display':'none'
    });


    $('.smw__tab__nav__prices').each(function () {
        $(this).trigger('click');
    })

}*/
