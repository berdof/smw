
var smwSkeleton =
        ' <div class="smw__stuff__in">' +
            '<div class="smw__body">' +
            '<div class="smw__tab">' +
            '<div class="smw__tab__contents"><div class="smw__tab__contents__item">' +
            '<div class="smw__prices"><div class="smw__prices__list"></div></div></div>' +
            '<div class="smw__tab__contents__item"><div class="smw__impression"></div></div>' +
            '<div class="smw__tab__contents__item"><div class="smw__info-wrap-scroll"></div></div></div></div></div></div>',
    smwHeader =
        ' <div class="smw__header"> ' +
            '<script data-id="headerTemplate" type="text/x-handlebars-template">' +
            '<div class="smw__stuff-img-wrap"><div class="smw__stuff-img">' +
            '<img src="{{photo}}" alt=""/>' +
            '</div></div><div class="fl_l">' +
            '<h2 class="smw__stuff-name">{{name}}</h2>' +
            '<div>Цена от <span class="smw__stuff-price">{{prices.min}} руб</span></div>' +
            '</div><a class="smw__logo fl_r" href="http://socialmart.ru" target="_blank"></a>' +
            '</script>' +
            '</div>',
    smwTabNav = '<ul class="smw__tab__nav">' +
        '<li><a class="smw__tab__nav__prices  active" href="javascript:void(0);">Цены <span class="smw__tab__nav__counter"></span> </a></li>' +
        '<li><a class="smw__tab__nav__reviews" href="javascript:void(0);">Впечатления <span class="smw__tab__nav__counter"></span> </a></li>' +
        '<li><a class="smw__tab__nav__info " href="javascript:void(0);">Характеристики</a></li>' +
        '</ul>'+
        '<div class="ya-info">Данные - <a href="http://market.yandex.ru/" target="_blank"> Яндекс.Маркет</a></div>',
    smwPriceHead = ' ' +
        '<div class="smw__prices__list__l fl_l">' +
        '<div class="smw__prices__list__all">' +


        '</div></div></div>'+
        '<div class="smw__prices__list__table-head">' +
        '<div class="smw__prices__list__cell">' +
        '<strong>Магазин</strong>' +
        '<div class="where-to-buy "><a class="where-to-buy__trigger" href="javascript:void(0);">Москва</a>' +
        '<form action="#" class="search">' +
        '<input autocomplete="off" data-provide="typeaheadSmwMod" data-items="4" type="text" placeholder="Найти город"/>' +
        '<input type="submit" value=""/>' +
        '</form></div>' +
        '</div>' +
        '<div class="smw__prices__list__cell">Рейтинг</div>' +
        '<div class="smw__prices__list__cell">Доставка</div>' +
        '<div class="smw__prices__list__cell">Цена</div>'
    ,
    smwPriceList = '<div class="smw__prices__list-scroll">' +
        '<div class="smw__prices__list__table">' +
        '<script data-id="pricesTemplate" type="text/x-handlebars-template">' +
        '{{#each this}}' +
        '<div class="smw__prices__item">' +
        '<div class="smw__prices__list__cell"><a class="smw__impression__list__item__name" href="{{clickUrl}}" target="_blank">{{name}}</a></div>' +
        '<div class="smw__prices__list__cell"><div class="smw__rate"><span style="width: {{shopRatingPercent}}%;"></span></div></div>' +
        '<div  class="smw__prices__list__cell">{{delivery}}</div>' +
        '<div class="smw__prices__item__cost smw__prices__list__cell">{{price}}<small>руб</small></div>' +
        '<div  class="smw__prices__list__cell"><a class="smw__prices__buy" target="_blank" href="{{clickUrl}}">Купить</a></div>' +
        '</div>{{/each }}</script></div></div>'
         ,
    smwInpressionsHead = '<div class="smw__impression__head">' +
        '{{#if impressions.length }} <i class="smw__impression__head__rate fl_l">{{avgRate}}</i>{{else}} ' +
        '<i class="smw__impression__head__rate_empty fl_l">0</i>' +
        '{{/if}}<span class="smw__impression__head__mark fl_l">оценок' +
        '{{#if impressions.length }}<strong class="db">{{impressions.length}}</strong>' +
        '{{else}}<strong class="db">НЕТ</strong>' +
        '{{/if}}</span><a data-redirect="true" class="fl_r btn_dgreen" href="http://socialmart.ru">Поделиться впечатлением</a>' +
        '{{#if impressions.length }}<ul class="smw__impression__filter center">' +
        '<li>Сортировать по:</li>' +
        '<li><a data-sort-type="date" class="active" href="javascript:void(0);">дата</a></li>' +
        '<li><a data-sort-type="mark" href="javascript:void(0);">оценка</a></li>' +
        '<li><a data-sort-type="usefull" href="javascript:void(0);">полезность</a></li></ul>' +
        '{{else}}<p class="smw__impression__head__slogan fl_l">Пока никто не поделился своим впечатлением об этом товаре. Почему бы не стать первым?</p>{{/if }}</div>',
    smwInpressionsBody =
        '<div class="smw__impression__body">' +
        '{{#if impressions.length }}' +
            '<div class="smw__impression__list-sort"><div class="smw__impression__list">' +
            '{{#each impressions}}<div data-date={{impression.date}} data-mark={{impression.rating}} data-usefull={{impression.count_like}} class="smw__impression__list__item">' +
            '<img class="fl_l smw__impression__list__item__ava" src="{{user.pic}}" alt=""/>' +
            '<div class="center"><span class="smw__impression__list__item__rate">{{impression.rating}}</span>' +
            '<a class="smw__impression__list__item__name" href="{{user.profileUrl}}">{{user.name}} -<!--  <i class={{classN}}></i>--></a>' +
            '<p class="smw__impression__list__item__text">{{impression.text}}</p>' +
            '<span class="smw__impression__list__item__date">{{impression.date_h}}</span>' +
            '<ul class="smw__impression__list__item__nav">' +
            '<li><a class="smw__impression__list__item__tu" href="javascript:void(0);">{{impression.count_like}}</a></li>' +
            '<li><a class="smw__impression__list__item__td" href="javascript:void(0);">{{impression.count_dislike}}</a></li>' +
            '<li><a class="smw__impression__list__item__comments" href="javascript:void(0);">{{impression.count_comments}}</a></li>' +
            '</ul></div></div>' +
            '{{/each}}</div></div>{{/if }}</div>',
    smwImpressions = '<script  data-id="impressionsTemplate" type="text/x-handlebars-template">'+
        smwInpressionsHead +smwInpressionsBody
        +'</script>',
    smwInfo =
        '<div class="smw__info-wrap">' +
        '<script data-id="infoTemplate" type="text/x-handlebars-template">' +
            '<div class="clearfix">' +
            '<div class="clearfix">' +
            '{{#each this}}<div class="smw__info">' +
            '<span class="smw__info__name">{{key}}</span>' +
            '<p class="smw__info__value">{{value}}</p></div>' +
            '{{/each}}</div>' +

            '</script>' +
            '<div class="ya-info">Данные -<a href="http://market.yandex.ru/" target="_blank"> Яндекс.Маркет</a></div></div>',
    smwRedirect = '<div class="smwRedirect">' +
        '<div class="redirect__head">' +
        '<a class="redirect__back fl_r " href="javascript:void(0);">← Назад</a></div>' +
        '<div class="redirect__body">' +
        '<p>Вы будете перенаправлены на сайт сервиса</p>' +
        '<a class="logo" href="javascript:void(0);"></a>' +
        '<p>Ссылка откроется в новом окне</p>' +
        '<a class="redirect__to" target="_blank" href="javascript:void(0);">Продолжить →</a></div>' +
        '</div>';
