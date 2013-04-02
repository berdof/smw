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
            '<div>Средняя цена <span class="smw__stuff-price">{{prices.avg}} руб</span></div>' +
            '</div><a class="smw__logo fl_r" href="#"></a>' +
            '</script>' +
            '</div>',
    smwTabNav = '<ul class="smw__tab__nav">' +
        '<li><a class="smw__tab__nav__prices  active" href="#">Цены <span class="smw__tab__nav__counter"></span> </a></li>' +
        '<li><a class="smw__tab__nav__reviews" href="#">Впечатления <span class="smw__tab__nav__counter"></span> </a></li>' +
        '<li><a class="smw__tab__nav__info " href="#">Характеристики</a></li>' +
        '</ul>',
    smwPriceHead = '<div class="smw__prices__list__head">' +
        '<div class="smw__prices__list__l fl_l">' +
        '<div class="smw__prices__list__all">' +
        'Все предложения:<div class="where-to-buy "><a class="where-to-buy__trigger" href="#">Москва</a>' +
        '<form action="#" class="search">' +
        '<input autocomplete="off" data-provide="typeaheadSmwMod" data-items="4" type="text" placeholder="Найти город"/>' +
        '<input type="submit" value=""/>' +
        '</form></div></div></div>' +
        '<div class="ya-info fl_r">Данные - <a href="#"> Яндекс.Маркет</a></div>' +
        '</div>',
    smwPriceList = '<div class="smw__prices__list-scroll">' +
        '<table class="smw__prices__list__table">' +
        '<script data-id="pricesTemplate" type="text/x-handlebars-template">' +
        '<tbody>{{#each this}}' +
        '<tr class="smw__prices__item">' +
        '<td>{{name}}</td>' +
        '<td class="smw__prices__item__cost">{{price}}<small>руб</small></td>' +
        '<td><a class="smw__prices__buy" target="_blank" href="{{clickUrl}}">Купить</a></td>' +
        '</tr>{{/each }}</tbody></script></table></div>',
    smwInpressionsHead = '<div class="smw__impression__head">' +
        '{{#if impressions.length }} <i class="smw__impression__head__rate fl_l">{{avgRate}}</i>{{else}} ' +
        '<i class="smw__impression__head__rate_empty fl_l">0</i>' +
        '{{/if}}<span class="smw__impression__head__mark fl_l">оценок' +
        '{{#if impressions.length }}<strong class="db">{{impressions.length}}</strong>' +
        '{{else}}<strong class="db">НЕТ</strong>' +
        '{{/if}}</span><a data-redirect="true" class="fl_r btn_dgreen" href="http://socialmart.ru">Поделиться впечатлением</a>' +
        '{{#if impressions.length }}<ul class="smw__impression__filter center">' +
        '<li>Сортировать по:</li>' +
        '<li><a data-sort-type="date" class="active" href="#">дата</a></li>' +
        '<li><a data-sort-type="mark" href="#">оценка</a></li>' +
        '<li><a data-sort-type="usefull" href="#">полезность</a></li></ul>' +
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
            '<li><a class="smw__impression__list__item__tu" href="#">{{impression.count_like}}</a></li>' +
            '<li><a class="smw__impression__list__item__td" href="#">{{impression.count_dislike}}</a></li>' +
            '<li><a class="smw__impression__list__item__comments" href="#">{{impression.count_comments}}</a></li>' +
            '</ul></div></div>' +
            '{{/each}}</div></div>{{/if }}</div>',
    smwImpressions = '<script  data-id="impressionsTemplate" type="text/x-handlebars-template">'+
        smwInpressionsHead +smwInpressionsBody
        +'</script>',
    smwInfo =
        '<div class="smw__info-wrap">' +
        '<script data-id="infoTemplate" type="text/x-handlebars-template">' +
            '<div class="clearfix">' +
                        '<div class="ya-info fl_r">Данные -<a href="#"> Яндекс.Маркет</a></div></div>'+
            '<div class="clearfix">' +
            '{{#each this}}<div class="smw__info">' +
            '<span class="smw__info__name">{{key}}</span>' +
            '<p class="smw__info__value">{{value}}</p></div>' +
            '{{/each}}</div>' +

            '</script>' +
            '<div class="ya-info">Данные -<a href="#"> Яндекс.Маркет</a></div></div>',
    smwRedirect = '<div class="smwRedirect">' +
        '<div class="redirect__head">' +
        '<a class="redirect__back fl_r " href="#">← Назад</a></div>' +
        '<div class="redirect__body">' +
        '<p>Вы будете перенаправлены на сайт сервиса</p>' +
        '<a class="logo" href="#"></a>' +
        '<p>Ссылка откроется в новом окне</p>' +
        '<a class="redirect__to" target="_blank" href="#">Продолжить →</a></div>' +
        '</div>';

