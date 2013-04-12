/**
 * jQuery Plugin SocialMart
 *
 * Author: Alexander Berdyshev
 *
 * Version: 1.0
 *
 */

;(function ($, window, document, undefined) {

    // plugin constructor
    var SocialMart = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        this.widgetId =71717171717171;
        this.metadata = this.$elem.data('plugin-options');
    };

    // the plugin prototype
    SocialMart.prototype = {

        //list of parameters
        defaults: {
            gadgetName: null,
            urlModels: 'http://socialmart.ru/widget/get/model',
            urlRegions: 'http://socialmart.ru/widget/get/regions',
            defaultRegions: ['Москва', 'Санкт-Петербург', 'Красноярск', 'Новосибирск', 'Екатеринбург'],
            userRegion: 1,
            disableRegionSelection: true,
            scriptsListPath: [
                'js/libs/jquery.jscrollpane.min.js',
                'js/libs/jquery.tinySort.jquery.js',
                'js/libs/typeaheadSmwMod.jquery.js',
                'js/libs/jquery.mousewheel.js',
                'js/libs/handlebars.js',
                'js/smwVievs.js'
            ],
            cssLinkPath: 'css/style.css',
            liksRoot :'http://crucer.ru/mobile/'
           //liksRoot :''
        },
        classNames: {
            stuff: 'smw__stuff',
            header: 'smw__header',
            stuffIn: 'smw__stuff__in',
            footer: 'smw__footer',
            tabs: 'smw__tab',
            tabsNav: 'smw__tab__nav',
            tabsNavItem: 'smw__tab__nav a',
            tabsContents: 'smw__tab__contents',
            tabsContentsItem: 'smw__tab__contents__item',
            impressions: 'smw__impression',
            impressionsFilterLink: 'smw__impression__filter a',
            pricesListTable: 'smw__prices__list__table',
            info: 'smw__info-wrap',
            likeIco: 'smw__impression__list__item__like',
            hasIco: 'smw__impression__list__item__has'
        },
        //template IDs
        templateNames: {
            header: 'headerTemplate',
            prices: 'pricesTemplate',
            impressions: 'impressionsTemplate',
            info: 'infoTemplate',
            tabsNav: 'tabsNavTemplate'
        },
        //append links only once
        //to prevent appending us '.not-preload' class on parent div
        appendLibraries: function () {
            var self = this,
                parent = self.$elem.parent();
            if (parent.hasClass('preload')) {

                $.each(self.config.scriptsListPath, function (i, link) {
                    var s =$('<script></script>',{
                        "src":self.config.liksRoot + link,
                        "charset":"UTF-8"
                    })
                    $('body').prepend(s);

                });
                $('head').prepend($('<link/>', {
                    'href': self.config.liksRoot +self.config.cssLinkPath,
                    'rel': 'stylesheet'
                }));
            }
            parent.removeClass('preload')
        },
        createWidget: function () {

            var self = this,
                $self = this.$elem;
            self.config = $.extend({}, this.defaults, this.options,
                this.metadata);

            self.appendLibraries();

            self.gadgetName = this.config.gadgetName;
            self.gadgetIndex = $self.index();
            self.userRegion = this.config.userRegion;
            self.WidgetId = this.config.widgetId;


            self.getGadgetId(this.config.gadgetName).done(function (data) {
                self.gadgetId = data.model_id;
                self.init(self, $self);
            });


        },
        //fires after we get the gadget id to work with data
        init: function (self, $self) {

            this.ieFix();
            //generate template
            this.render();

            self.$footer = $self.find('.' + self.classNames.footer);
            self.$tabsNavItem = $self.find('.' + self.classNames.tabsNavItem);

            self.fetchHeaderData().done(function (data) {

                self.fillHeader(data, self.templateNames.header);
            });
            self.fetchPricesData().done(function (data) {
                self.fillPrices(data.offers, self.templateNames.prices);
            });
            self.fetchImpressionsData().done(function (data) {
                self.fillImpressions(data, self.templateNames.impressions);
            });
            self.fetchInfoData().done(function (data) {
                self.fillInfo(data, self.templateNames.info);
            });


            self.fetchRegionsData().done(function (data) {
                self.fillRegions(data);
            });

            this.attachEvents();

            //todo: fade this
            $('.' + self.classNames.stuff + ':first .' + self.classNames.footer).trigger('click');

            if (self.config.disableRegionSelection)
                self.$elem.find('.where-to-buy').hide();


            self.initScroll();


            return this;
        },
        getGadgetId: function (name) {
            return $.ajax({
                url: this.config.urlModels + '?name=' + name +'&wId='+this.widgetId+ "&jsonp=?",
                success:function(){
                    alert(111)
                    'http://dev2.socialmart.ru/widget/get/model?name=Samsung'
                },
                dataType: 'jsonp'
            });
        },

        fillRegions: function (regions) {
            regionsArr = [];
            $.each(regions, function () {
                regionsArr.push(this.region);
            });
            //todo: add keys functionality
            this.$elem.find('.search input[type=text]').typeaheadSmwMod({
                source: regionsArr,
                items: 4
            });

        },

        fetchRegionsData: function () {
            var self = this;
            return $.ajax({
                url: self.config.urlRegions + "?jsonp=?",
                dataType: 'jsonp',
                success: function (d) {

                }
            });
        },
        stringToDateTimeString: function (timeStr) {
            var date = timeStr.split(" ");
            date[0] = date[0].split("-");
            date[1] = date[1].split(":");
            return   new Date(date[0][0], date[0][1], date[0][2], date[1][0], date[1][1], date[1][2]).getTime();
        },
        fetchImpressionsData: function () {

            var self = this;
            return $.ajax({
                url: self.config.urlModels + "/impressions?region=" + self.userRegion + "&model=" + self.gadgetId + '&wId='+this.widgetId+ "&jsonp=?",
                dataType: 'jsonp',
                success: function (data) {
                    var rate = 0;
                    $.each(data.impressions, function () {
                        rate += ~~this.impression.rating;
                        this.classN = this.is_have === 1 ?
                            self.classNames.hasIco :
                            self.classNames.likeIco;
                        this.impression.date = self.stringToDateTimeString(this.impression.date.toString());
                    });
                    data.avgRate = (rate / data.impressions.length).toFixed(1);
                    self.$elem.find('.smw__tab__nav__reviews .smw__tab__nav__counter').html(data.impressions.length)

                }
            });
        },

        fetchHeaderData: function () {
            var self = this;
            return $.ajax({
                url: self.config.urlModels + '/info?region=' + self.userRegion + '&model=' + self.gadgetId + '&wId='+this.widgetId+ '&jsonp=?',
                dataType: 'jsonp',
                success: function (d) {
                    d.prices.avg = self.priceReformat(d.prices.avg);
                }
            });
        },
        fetchPricesData: function () {
            var self = this;
            return $.ajax({
                url: self.config.urlModels + '/prices?region=' + self.userRegion + '&model=' + self.gadgetId +'&wId='+this.widgetId+  '&jsonp=?',
                dataType: 'jsonp',
                success: function (d) {
                    $.map(d.offers, function (offer) {
                        offer.price = self.priceReformat(offer.price)
                            .replace('руб', ' &nbsp;');
                    });
                    self.$elem.find('.smw__tab__nav__prices .smw__tab__nav__counter').html(d.offers.length);
                }
            });
        },
        fetchInfoData: function () {
            var self = this;
            return $.ajax({
                url: 'http://dev2.socialmart.ru/widget/get/model/description?region=' + self.userRegion + '&model=' + self.gadgetId +'&wId='+this.widgetId+  '&jsonp=?',
                dataType: 'jsonp'

            });
        },
        fillTabsNav: function (data, tabsNavTemplateId) {
            this.fillFrag(data, tabsNavTemplateId, '.' + this.classNames.tabsNav);
        },
        fillInfo: function (data, infoTemplateId) {
            this.fillFrag(data, infoTemplateId, '.' + this.classNames.info);
        },
        fillPrices: function (data, pricesTemplateId) {
            this.fillFrag(data, pricesTemplateId, '.' + this.classNames.pricesListTable);
        },
        fillHeader: function (data, headerTemplateId) {
            this.fillFrag(data, headerTemplateId, '.' + this.classNames.header);
        },
        fillImpressions: function (data, impressionsTemplateId) {
            this.fillFrag(data, impressionsTemplateId, '.' + this.classNames.impressions);
        },
        //fills a handlebars template
        //data = obj
        //templateId = id of template:
        //  <script id="entry-template" type="text/x-handlebars-template">
        //      template content
        //  </script>
        //fragId = class or id of DOM element where render the data
        fillFrag: function (data, templateId, fragId) {

            var template = Handlebars.compile(this.$elem.find('script[data-id=' + templateId + ']').html()),
                html = template(data);
            this.$elem.find(fragId).html(html)
        },
        //rendering html contents
        render: function () {
            var self = this;
            self.$elem.html(smwSkeleton);
            self.renderHeader();
            self.renderBody();
            self.renderFooter();
        },
        renderHeader: function () {
            this.$elem.find('.smw__stuff__in').prepend(smwHeader);
        },
        renderBody: function () {
            //todo: render template body
            var $elem = this.$elem;
            $elem.find('.smw__tab').prepend(smwTabNav);
            $elem.find('.smw__prices__list').prepend(smwPriceHead);
            $elem.find('.smw__prices__list').append(smwPriceList);
            $elem.find('.smw__tab').append(smwRedirect);
            $elem.find('.smw__impression').prepend(smwImpressions);
            $elem.find('.smw__info-wrap-scroll').prepend(smwInfo);
        },
        renderFooter: function () {
            this.$elem.append($('<footer/>', {
                'class': 'smw__footer',
                'text': this.gadgetName
            }).prepend($('<span/>', {
                    'class': 'smw__stuff__num',
                    'text': this.gadgetIndex + 1
                })));
        },
        attachEvents: function () {
            var self = this;
            self.$elem.on('click', '.smw__tab__nav a', {self: self }, self.tabsItemClickHandler);
            self.$footer.on('click', {self: self}, this.footerClickHandler);
            self.$elem.on('click', 'a[data-redirect=true]', {self: self }, self.redirectLinkHandler);
            self.$elem.on('click', '.redirect__back', {self: self }, self.toggleRedirectPopup);
            self.$elem.on('click', '.' + self.classNames.impressionsFilterLink, {self: self }, self.sortImpressionsHandler);
            self.$elem.on('click', '.where-to-buy__trigger', {self: self }, self.shownTownFilterHandler);
            self.$elem.on('keyup', '.where-to-buy input[type=text]', {self: self }, self.searchTownTextHandler)
        },

        searchTownTextHandler: function (e) {
        },
        shownTownFilterHandler: function (e) {
            //todo: write fetch towns
            var self = e.data.self;
            self.$elem.find('.search').fadeToggle();
            e.preventDefault();
        },
        /**helpers**/
        sorter: function (plugin, container, containerItem, sortType) {

            /*containerItem.css({'position': 'relative', 'top': 0});
            container.css({position: 'relative', height: container.height(), display: 'block'});
            var iLnH;
            containerItem.each(function (i, el) {
                var iY = $(el).position().top;
                $.data(el, 'h', iY);
                if (i === 1) iLnH = iY;
            });*/
            containerItem.tsort('', {data: sortType, order: 'desc'});
            /*.each(function (i, el) {
             var $El = $(el);
             var iFr = $.data(el, 'h');
             var iTo = i * iLnH;
             $El.css({position: 'absolute', top: iFr}).animate({top: iTo}, 500);
             });*/
        },
        sortImpressionsHandler: function (e) {
            var self = $(this) ,
                plugin = e.data.self;
            self.closest('ul').find('a').removeClass('active')
                .end().end()
                .addClass('active');

            plugin.sorter(
                plugin,
                plugin.$elem.find('.smw__impression__list'),
                plugin.$elem.find('.smw__impression__list__item'),
                self.data('sort-type'));
            e.preventDefault();
        },
        priceReformat: function (str) {
            return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        },
        /** !helpers**/

        /**event handlers**/
        toggleRedirectPopup: function (speed, toLink, effect) {

            $('.smwRedirect')[effect || 'fadeToggle'](speed || 200)
                .find('.redirect__body a').attr('href', toLink);
                return false;
        },
        redirectLinkHandler: function (e) {
            var self = e.data.self,
                href = $(this).attr('href');
            self.toggleRedirectPopup(200, href, "fadeToggle");
            e.preventDefault();
        },
        footerClickHandler: function (e) {

            var self = e.data.self,
                stuffInClass = '.' + self.classNames.stuffIn,
                stuffIn = $(stuffInClass),
                stuffInCur = $(this).siblings(stuffInClass);
            stuffIn.not(stuffInCur).slideUp().parent().removeClass('opened');
            stuffInCur.slideDown().parent().addClass('opened');
            setTimeout(function () {
                self.initScroll();
            }, 1000);
            self.toggleRedirectPopup(300, '#', 'fadeOut');

        },
        tabsItemClickHandler: function (e) {

            var self = e.data.self,
                tabsLi = $(this).parent('li'),
                tabIndex = tabsLi.index(),
                tabItems = self.$elem.find('.' + self.classNames.tabsContentsItem);

            tabItems.hide().eq(tabIndex).show();
            tabsLi.siblings('li').find('a').removeClass('active');
            $(this).addClass('active');
            self.initScroll();
            $("*[data-sort-type=date]").trigger('click');

            self.toggleRedirectPopup(200, "", "fadeOut");
            e.preventDefault();
        },
        initScroll: function () {
            /*this.$elem.find(
             '.smw__impression__list-sort,' +
             ' .smw__info-wrap-scroll, ' +
             '.smw__prices__list-scroll').jScrollPane();*/

            var elem = this.$elem.find(
                '.smw__impression__list-sort:visible,' +
                    ' .smw__info-wrap-scroll:visible, ' +
                    '.smw__prices__list-scroll:visible');
            $.each(elem, function () {
                var targ = $(this);

                if(!targ.hasClass('scroll-loaded')){
                   targ.addClass('scroll-loaded').jScrollPane({autoReinitialise:true});

                }
            })

        },
        /**!event handlers**/
        ieFix: function () {
            //todo: add ie class and delete pseudo comments
            var browser = $.browser;
            if (browser.msie && (browser.version == 8 || browser.version == 7)) {
                this.$elem.parent().addClass('lt-ie9');
            }
        }
    };

    SocialMart.defaults = SocialMart.prototype.defaults;

    $.fn.SocialMart = function (options) {

        return this.each(function () {
            new SocialMart(this, options).createWidget();
        });
    };

})(jQuery, window, document);


/*
 Test queries
 http://dev2.socialmart.ru/widget/get/model?name=Samsung
 http://dev2.socialmart.ru/widget/get/regions
 http://dev2.socialmart.ru/widget/get/model/info?region=1&model=111
 http://dev2.socialmart.ru/widget/get/model/prices?region=1&model=111
 http://dev2.socialmart.ru/widget/get/model/impressions?region=1&model=111
 http://dev2.socialmart.ru/widget/get/model/description?region=1&model=111
 */
