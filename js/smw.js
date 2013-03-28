/**
 * jQuery Plugin SocialMart
 *
 * Author: Alexander Berdyshev
 *
 * Version: 1.0
 *
 */


;
(function ($, window, document, undefined) {

    // plugin constructor
    var SocialMart = function (elem, options) {
        this.elem = elem;
        this.$elem = $(elem);
        this.options = options;
        // This next line takes advantage of HTML5 data attributes
        // to support customization of the plugin on a per-element
        // basis. For example,
        // <div class=item' data-plugin-options='{"message":"Goodbye World!"}'></div>
        this.metadata = this.$elem.data('plugin-options');
    };

    // the plugin prototype
    SocialMart.prototype = {

        //list of parameters
        defaults: {
            gadgetName: null,
            urlModels: 'http://socialmart.ru/widget/get/model',
            urlRegions: 'http://dev2.socialmart.ru/widget/get/regions',
            defaultRegions: ['Москва', 'Санкт-Петербург', 'Красноярск', 'Новосибирск', 'Екатеринбург']

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

        create: function () {
            var self = this,
                $self = this.$elem;
            self.config = $.extend({}, this.defaults, this.options,
                this.metadata);
            self.gadgetName = this.config.gadgetName;
            self.gadgetIndex = $self.index();

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

            //todo: create unique IDs for each template by adding index to it
            self.fetchHeaderData().done(function (data) {

                self.fillHeader(data, self.templateNames.header);
            })
            self.fetchPricesData().done(function (data) {
                self.fillPrices(data.offers, self.templateNames.prices);
            })
            self.fetchImpressionsData().done(function (data) {
                self.fillImpressions(data, self.templateNames.impressions);
            })
            self.fetchInfoData().done(function (data) {

                self.fillInfo(data, self.templateNames.info);
                //when last tab item is rendered and filled with data then fill tabs nav info(counters)
                //todo: fix async problem
                self.fillTabsNav(self.fetchTabsNavData(), self.templateNames.tabsNav);
            })


            self.fetchRegionsData().done(function (data) {

                self.fillRegions(data)

            })

            this.attachEvents();


            //todo: fade this
            $('.' + self.classNames.stuff + ':first .' + self.classNames.footer).trigger('click');


            // this.setTabsEqualHeight();
            return this;
        },
        getGadgetId: function (name) {
            return $.ajax({
                url: this.config.urlModels + '?name=' + name + "&jsonp=?",
                dataType: 'jsonp'
            });
        },

        fillRegions: function (regions) {
            regionsArr = [];
            $.each(regions, function (d) {
                regionsArr.push(this.region);
            });
            //todo: add keys functionality
            //add
            this.$elem.find('.search input[type=text]').typeaheadSmwMod({
                source: regionsArr,
                items: 4
            });

        },

        fetchRegionsData: function () {
            //todo: replace with real regions
            var self = this;
            return $.ajax({
                url: self.config.urlRegions + "?jsonp=?",
                dataType: 'jsonp',
                success: function (d) {

                }
            });
        },
        fetchTabsNavData: function () {
            return {impressionsCount: this.impressionsCount, priceCount: this.priceCount};
        },

        fetchImpressionsData: function () {

            var self = this;
            return $.ajax({
                url: self.config.urlModels + "/impressions?region=1&model=" + self.gadgetId + "&jsonp=?",
                dataType: 'jsonp',
                success: function (data) {
                    var myDate ,
                        curDate = new Date(),
                        daysDiff,
                        rate = 0;

                    $.each(data.impressions, function () {
                        rate += ~~this.impression.rating;
                        this.classN = this.is_have === 1 ?
                            self.classNames.hasIco :
                            self.classNames.likeIco;
                        //todo: fix firefox Date NaN bug
                        this.impression.date = new Date(this.impression.date).getTime();


                    })
                    //todo: floor avg to tens like 5.2
                    data.avgRate = (rate / data.impressions.length).toFixed(1);

                    self.impressionsCount = data.impressions.length;

                }
            });
        },

        fetchHeaderData: function () {
            var self = this;
            return $.ajax({
                url: self.config.urlModels + '/info?region=1&model=' + self.gadgetId + '&jsonp=?',
                dataType: 'jsonp'
            });
        },
        fetchPricesData: function () {
            var self = this;
            return $.ajax({
                url: self.config.urlModels + '/prices?region=1&model=' + self.gadgetId + '&jsonp=?',
                dataType: 'jsonp',
                success: function (d) {

                    d.offers.map(function (offer) {
                        offer.price = offer.price.toString().replace('руб', '');
                    })
                    self.priceCount = d.offers.length;
                }
            });
            //return fakeData.prices.offers;
        },
        fetchInfoData: function () {
            var self = this;
            return $.getJSON('http://dev2.socialmart.ru/widget/get/model/description?region=1&model=8454852&jsonp=?', function (json) {

            });
            /*return $.ajax({
             url: 'http://dev2.socialmart.ru/widget/get/model/description?region=1&model=8454852&jsonp=?',
             dataType: 'jsonp',
             success: function () {
             console.log(this);
             }
             });*/
        },
        fillTabsNav: function (data, tabsNavTemplateId) {
            this.fillFrag(data, tabsNavTemplateId, '.' + this.classNames.tabsNav);
        },
        fillInfo: function (data, infoTemplateId) {
            //console.log(data);
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

            var template = Handlebars.compile(this.$elem.find('script[data-id=' + templateId + ']').html());
            var html = template(data);

            setTimeout(function () {
                //todo: change this setTimeout to differed or delete)
                $(fragId).html(html)
            }, 500)

        },
        //rendering html contents
        render: function () {
            this.renderHeader();
            this.renderBody();
            this.renderFooter();
        },
        renderHeader: function () {
            //todo: render template head asdasd
        },
        renderBody: function () {
            //todo: render template body
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
            //http://dev2.socialmart.ru/widget/get/regions


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

            containerItem.css({'position': 'relative', 'top': 0})
            container.css({position: 'relative', height: container.height(), display: 'block'});
            var iLnH;
            containerItem.each(function (i, el) {
                var iY = $(el).position().top;
                $.data(el, 'h', iY);
                if (i === 1) iLnH = iY;
            });
            containerItem.tsort('', {data: sortType, order: 'desc'})/*.each(function (i, el) {
                var $El = $(el);
                var iFr = $.data(el, 'h');
                var iTo = i * iLnH;
                $El.css({position: 'absolute', top: iFr}).animate({top: iTo}, 500);
            });*/


            /*          plugin.$elem.find('.smw__impression__list__item')
             .tsort('',{data:sortType,order:'desc'});*/
        },
        sortImpressionsHandler: function (e) {
            //todo: write sorter
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
        /** !helpers**/

        /**event handlers**/
        toggleRedirectPopup: function (speed, toLink, effect) {
            //todo: change to $elem link
            $('.smw .redirect')[effect||'fadeToggle'](speed || 200)
                .find('.redirect__body a').attr('href', toLink);
        },
        redirectLinkHandler: function (e) {
            e.preventDefault();
            var self = e.data.self,
                href = $(this).attr('href');
            self.toggleRedirectPopup(200, href,"fadeToggle");

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
            }, 1000)

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

            $("*[data-sort-type=date]").trigger('click')

            self.toggleRedirectPopup(200, "","fadeOut");
            e.preventDefault();
        },
        initScroll: function () {
            var self = this;
            //todo:jscroolpane do not create each time
            $('.smw__impression__list-sort').jScrollPane();
            $('.smw__info-wrap-scroll').jScrollPane();

            $('.smw__prices__list-scroll').jScrollPane();


        },
        //!event handlers
        ieFix: function () {
            //todo: add ie class and delete pseudo comments
        }

    };

    SocialMart.defaults = SocialMart.prototype.defaults;

    $.fn.SocialMart = function (options) {

        return this.each(function () {
            new SocialMart(this, options).create();
        });
    };

    //optional: window.Plugin = Plugin;

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
