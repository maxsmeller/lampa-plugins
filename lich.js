(function() {
    'use strict';
    
    Lampa.Lang.add({
        maxsm_lich_tvcaption: {
            ru: "СЕРИАЛ",       
            en: "SERIES",   
            uk: "СЕРІАЛ",    
            be: "СЕРЫЯЛ",     
            zh: "剧集",       
            pt: "SÉRIE",     
            bg: "СЕРИАЛ",      
            he: "סִדְרָה",  
            cs: "SERIÁL" 
        }
    });

    // Функция для применения тем
    function applyStyle() {

        // Создаем новый стиль
        var style = $('<style id="maxsm_lich_style"></style>');

        // Определяем стили
        var themes = {
            lich: "\n.navigation-bar__body\n{background: rgba(18, 32, 36, 0.96);\n}\n.card__quality1,\n .card__type1::after,\n .card--tv .card__type1 {\nbackground: linear-gradient(to right, #1e6262, #3da18d);\n}\n.screensaver__preload {\nbackground:url(\"data:image/svg+xml,".concat(svgCode, "\") no-repeat 50% 50%\n}\n.activity__loader {\nposition:absolute;\ntop:0;\nleft:0;\nwidth:100%;\nheight:100%;\ndisplay:none;\nbackground:url(\"data:image/svg+xml,").concat(svgCode, "\") no-repeat 50% 50%\n \n}\nhtml, body, .extensions\n {\nbackground: linear-gradient(135deg, #0a1b2a, #1a4036) !important;\ncolor: #ffffff !important;\n}\n.company-start.icon--broken .company-start__icon,\n.explorer-card__head-img > img,\n.bookmarks-folder__layer,\n.card-more__box,\n.card__img\n,.extensions__block-add\n,.extensions__item\n {\nbackground-color: #1e2c2f;\n}\n.search-source.focus,\n.simple-button.focus,\n.menu__item.focus,\n.menu__item.traverse,\n.menu__item.hover,\n.full-start__button.focus,\n.full-descr__tag.focus,\n.player-panel .button.focus,\n.full-person.selector.focus,\n.tag-count.selector.focus,\n.full-review.focus {\nbackground: linear-gradient(to right, #1e6262, #3da18d);\ncolor: #fff;\nbox-shadow: 0 0.0em 0.4em rgba(61, 161, 141, 0.0);\n}\n.selectbox-item.focus,\n.settings-folder.focus,\n.settings-param.focus {\nbackground: linear-gradient(to right, #1e6262, #3da18d);\ncolor: #fff;\nbox-shadow: 0 0.0em 0.4em rgba(61, 161, 141, 0.0);\nborder-radius: 0.5em 0 0 0.5em;\n}\n.full-episode.focus::after,\n.card-episode.focus .full-episode::after,\n.items-cards .selector.focus::after,  \n.card-more.focus .card-more__box::after,\n.card-episode.focus .full-episode::after,\n.card-episode.hover .full-episode::after,\n.card.focus .card__view::after,\n.card.hover .card__view::after,\n.torrent-item.focus::after,\n.watched-history.selector.focus::after,.online-prestige.selector.focus::after,\n.online-prestige--full.selector.focus::after,\n.explorer-card__head-img.selector.focus::after,\n.extensions__item.focus::after,\n.extensions__block-add.focus::after,\n.full-review-add.focus::after {\nborder: 0.2em solid #3da18d;\nbox-shadow: 0 0 0.8em rgba(61, 161, 141, 0.0);\n}\n.head__action.focus,\n.head__action.hover {\nbackground: linear-gradient(45deg, #3da18d, #1e6262);\n}\n.modal__content {\nbackground: rgba(18, 32, 36, 0.96);\nborder: 0em solid rgba(18, 32, 36, 0.96);\n}\n.settings__content,\n.settings-input__content,\n.selectbox__content,\n.settings-input {\nbackground: rgba(18, 32, 36, 0.96);\n}\n.torrent-serial {\nbackground: rgba(0, 0, 0, 0.22);\nborder: 0.2em solid rgba(0, 0, 0, 0.22);\n}\n.torrent-serial.focus {\nbackground-color: #1a3b36cc;\nborder: 0.2em solid #3da18d;\n}\n")
        };

        // Устанавливаем стили для выбранной темы
        style.html(themes[lich]);

        // Добавляем стиль в head
        $('head').append(style);
        animations();
        forall();
        fix_lang();
        translate_tv();
    }
    
    function fix_lang() {
       Lampa.Lang.add({
        tv_status_returning_series: {
          ru: "Идет"
        },
        tv_status_planned: {
          ru: "Запланирован"
        },
        tv_status_in_production: {
          ru: "В производстве"
        },
        tv_status_ended: {
          ru: "Завершен"
        },
        tv_status_canceled: {
          ru: "Отменен"
        },
        tv_status_pilot: {
          ru: "Пилот"
        },
        tv_status_released: {
          ru: "Вышел"
        },
        tv_status_rumored: {
          ru: "По слухам"
        },
        tv_status_post_production: {
          ru: "Скоро"
        }
      });
    }

    // Дополнительные Шаблоны, не меняющиеся от цветовых стилей    
    function forall() {
        // Шаблон карточки, где год перенесен выше названия
        Lampa.Template.add('card', "<div class=\"card selector layer--visible layer--render\">\n    <div class=\"card__view\">\n        <img src=\"../img/img_load.svg\" class=\"card__img\" />\n\n        <div class=\"card__icons\">\n            <div class=\"card__icons-inner\">\n                \n            </div>\n        </div>\n    <div class=\"card__age\">{release_year}</div>\n    </div>\n\n    <div class=\"card__title\">{title}</div>\n    </div>");
        // Шаблон карточки выхода эпизода, выкинем футер из card_episode, год и название на карточку
        Lampa.Template.add('card_episode', "<div class=\"card-episode selector layer--visible layer--render\">\n    <div class=\"card-episode__body\">\n        <div class=\"full-episode\">\n            <div class=\"full-episode__img\">\n                <img />\n            </div>\n\n            <div class=\"full-episode__body\">\n     <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n            <div class=\"full-episode__num hide\">{num}</div>\n                <div class=\"full-episode__name\">{name}</div>\n                <div class=\"full-episode__date\">{date}</div>\n            </div>\n        </div>\n    </div>\n    <div class=\"card-episode__footer hide\">\n        <div class=\"card__imgbox\">\n            <div class=\"card__view\">\n                <img class=\"card__img\" />\n            </div>\n        </div>\n\n        <div class=\"card__left\">\n            <div class=\"card__title\">{title}</div>\n            <div class=\"card__age\">{release_year}</div>\n        </div>\n    </div>\n</div>");
        // Стили 
        var forall_style = "\n<style id=\"maxsm_lich_forall\">\n " +
            // Отступник для часов
            ".head__time-now  {\n margin-left: 0.5em;\n}\n" +
            // Фикс шапки на тач интерфейсе если нет на главной иконок вверху.
            ".head__body {\n   min-height: 4.1em;\n}\n" +
            // По центру в мобилке
            "@media screen and (max-width: 480px) { .full-start-new__head, .full-start-new__title, .full-start__title-original, .full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, .full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { -webkit-justify-content: center; justify-content: center; text-align: center; }\n" +
            ".full-start__title-original {\n   max-width: 100%;\n}\n}" +
            "@media screen and (max-width: 480px) { .full-start-new__right { background: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0))); background: -webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%); background: -o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%); background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%);}}" +
            // Круглые чек-боксы
            // ".selectbox-item__checkbox\n {\nborder-radius: 100%\n}\n" +
            // ".selectbox-item--checked .selectbox-item__checkbox\n {\nbackground: #ccc;\n}\n" +
            //  Рейтинги внутри карточки
            ".full-start-new__rate-line .full-start__pg {\n    font-size: 1em;\nbackground: #fff;\n    color: #000;\n}\n." +
            ".full-start__rate \n{\n     border-radius: 0.25em;\n padding: 0.3em;\n background-color: rgba(0, 0, 0, 0.3);\n}\n" +
            ".full-start__pg, .full-start__status\n {\nfont-size: 1em;\nbackground: #fff;\n    color: #000;\n}\n" +
            // Докручиваем плашки на карточках стилями 
              // Заголовок
            ".card__title {\n                    height: 3.6em;\n                    text-overflow: ellipsis;\n                     -o-text-overflow: ellipsis;\n                    text-overflow: ellipsis;\n                    -webkit-line-clamp: 3;\n                    line-clamp: 3;\n                }\n " +
              // Год
            ".card__age {\n  position: absolute;\n  right: 0em;\n  bottom: 0em;\n  z-index: 10;\n  background: rgba(0, 0, 0, 0.6);\n  color: #ffffff;\n  font-weight: 700;\n  padding: 0.4em 0.6em;\n    -webkit-border-radius: 0.48em 0 0.48em 0;\n     -moz-border-radius: 0.48em 0 0.48em 0;\n          border-radius: 0.48em 0 0.48em 0;\nline-height: 1.0;\nfont-size: 1.0em;\n}\n " +
              // Рейтинг
            ".card__vote {\n  position: absolute;\n  bottom: auto; \n right: 0em;\n  top: 0em;\n  background: rgba(0, 0, 0, 0.6);\n    font-weight: 700;\n  color: #fff;\n -webkit-border-radius: 0 0.34em 0 0.34em;\n     -moz-border-radius: 0 0.34em 0 0.34em;\n          border-radius: 0 0.34em 0 0.34em;\nline-height: 1.0;\n}\n  " + 
             /*font-size: 1.4em;\n*/
              // Иконки закладок и т.д.
            ".card__icons {\n  position: absolute;\n  top: 2em;\n  left: 0;\n  right: auto;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n     -moz-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n     -webkit-border-radius: 0 0.5em 0.5em 0;\n     -moz-border-radius: 0 0.5em 0.5em 0;\n          border-radius: 0 0.5em 0.5em 0;\n}\n" +
            ".card__icons-inner {\n  background: none; color: #fff\n}\n" +
              // Статус расширенных закладок
            ".card__marker {\n position: absolute;\n  left: 0em;\n  top: 4em;\n  bottom: auto; \n  background: rgba(0, 0, 0, 0.6);\n  -webkit-border-radius: 0 0.5em 0.5em 0;\n     -moz-border-radius: 0 0.5em 0.5em 0;\n          border-radius: 0 0.5em 0.5em 0;\n  font-weight: 700;\n font-size: 1.0em;\n   padding: 0.4em 0.6em;\n    display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n     -moz-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  line-height: 1.2;\nmax-width: min(12em, 95%);\nbox-sizing: border-box;\n}\n" +
              // На маленьких экранах обрезаем, на больших полностью
            ".card__marker > span {\n max-width: min(12em, 95%);\n}\n" +
              // отметка качества background: rgba(0, 0, 0, 0.6);\n  
            //".card__quality {\n  position: absolute;\n  left: auto;\n right: 0em;\n  bottom: 2.4em;\n  padding: 0.4em 0.6em;\n  color: #fff;\n font-weight: 700;\n  font-size: 1.0em;\n  -webkit-border-radius: 0.5em 0 0 0.5em;\n  -moz-border-radius: 0.5em 0 0 0.5em;\n  border-radius: 0.5em 0 0 0.5em;\n  text-transform: uppercase;\n}\n" +
            ".card__quality {\n  position: absolute;\n  bottom: auto; \n left: 0em; \nright: auto;\n  top: 0em;\n  padding: 0.4em 0.6em;\n  color: #fff;\n font-weight: 700;\n  font-size: 1.0em;\n  -webkit-border-radius: 0.4em 0 0.4em 0;\n     -moz-border-radius: 0.4em 0 0.4em 0;\n          border-radius: 0.4em 0 0.4em 0;\n  text-transform: uppercase;\n}\n" +
            //                ".card__type {\n  position: absolute;\n  bottom: auto; \n left: 0em; \nright: auto;\n  top: 0em;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  font-weight: 700;\n  padding: 0.4em 0.6em;\n  -webkit-border-radius: 0.4em 0 0.4em 0;\n     -moz-border-radius: 0.4em 0 0.4em 0;\n          border-radius: 0.4em 0 0.4em 0;\nline-height: 1.0;\nfont-size: 1.0em;\n}\n " +
            // Уменьшаем расстояние между рядами только для карточках в списках
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards  {\nmargin-top: 1em;\n}\n" +
            // Так же широкие карты фиксим, чтобы не было отскока нижнего ряда, делаем отступ снизу
            ".card--small .card__view {\nmargin-bottom: 2em;\n}\n" +
            // Уменьшаем высоту после удаления футера, нужно для card_episode
            ".items-line--type-cards {\n min-height: 18em;\n}\n" +
            // Внутри карточки информация стремится к нижней границе экрана
            "@media screen and (min-width: 580px) {\n.full-start-new {\nmin-height: 80vh;\ndisplay: flex\n}\n}\n" +
            // Постер в карточке, менее затемнен чем в стоке
            ".full-start__background.loaded {\nopacity: 0.8;\n}\n.full-start__background.dim {\nopacity: 0.2;\n}\n" +
            // Скругления у большого числа элементов
            ".explorer__files .torrent-filter .simple-button {\nfont-size: 1.2em;\n-webkit-border-radius: 0.5em;\n-moz-border-radius: 0.5em;\nborder-radius: 0.5em;\n}\n" +
            ".full-review-add,\n.full-review,\n.extensions__item,\n.extensions__block-add,\n.search-source,\n.bookmarks-folder__layer,\n.bookmarks-folder__body,\n.card__img,\n.card__promo,\n.full-episode--next .full-episode__img:after,\n.full-episode__img img,\n.full-episode__body,\n.full-person__photo,\n.card-more__box,\n.full-start__button,\n.simple-button,\n.register {\nborder-radius: 0.5em;\n}\n" +
            ".extensions__item.focus::after,\n.extensions__block-add.focus::after,\n.full-episode.focus::after,\n.full-review-add.focus::after,\n.card-parser.focus::after,\n.card-episode.focus .full-episode::after,\n.card-episode.hover .full-episode::after,\n.card.focus .card__view::after,\n.card.hover .card__view::after,\n.card-more.focus .card-more__box::after,\n.register.focus::after {\nborder-radius: 1em;\n}\n" +
            ".search-source.focus,\n.simple-button.focus,\n.menu__item.focus,\n.menu__item.traverse,\n.menu__item.hover,\n.full-start__button.focus,\n.full-descr__tag.focus,\n.player-panel .button.focus,\n.full-person.selector.focus,\n.tag-count.selector.focus {\nborder-radius: 0.5em;\n}\n" +
            // Меню слева
            ".menu__item.focus {border-radius: 0 0.5em 0.5em 0;\n}\n" +
            ".menu__list {\npadding-left: 0em;\n}\n" +
            // Оставим иконки белыми в левом Меню
            // ".menu__item.focus .menu__ico {\n   -webkit-filter: invert(1);\n    filter: invert(1);\n }\n " +
            // Фикс ТОЛЬКО для иконок плагинов (те, что в <li>)
            "li.menu__item.focus .menu__ico,\n" +
            "li.menu__item.hover .menu__ico {\n" +
            "    color: #fff !important;\n" +
            "}\n" +
            // Белые иконки в бошке
            ".head__action.focus, .head__action.hover {\ncolor: fff;\n}\n" +
            // Фон метки качества
            ".card__quality,\n .card__type::after,\n .card--tv .card__type {\nbackground: rgba(0, 0, 0, 0.6);\n}\n" +
            "</style>\n";
        Lampa.Template.add('forall_style_css', forall_style);
        $('body').append(Lampa.Template.get('forall_style_css', {}, true));
    }
    
    function translate_tv() {
        var tv_caption =  Lampa.Lang.translate('maxsm_lich_tvcaption');
        var translate_tv_style;
        translate_tv_style = "\n<style id=\"maxsm_lich_translate_tv\">\n " +
                ".card__type {\n  position: absolute;\n  bottom: auto; \n left: 0em; \nright: auto;\n  top: 0em;\n  background: rgba(0, 0, 0, 0.6);\n  color: #fff;\n  font-weight: 700;\n  padding: 0.4em 0.6em;\n  -webkit-border-radius: 0.4em 0 0.4em 0;\n     -moz-border-radius: 0.4em 0 0.4em 0;\n          border-radius: 0.4em 0 0.4em 0;\nline-height: 1.0;\nfont-size: 1.0em;\n}\n " +
                ".card--tv .card__type {\n  color: #fff;\n}\n" +
            "</style>\n";
        $('body').append(translate_tv_style);
    }
    
    function animations() {
        $('#maxsm_lich_animations').remove();
        var animations_style = "\n<style id=\"maxsm_lich_animations\">\n " +
                // Пробуем немного анимацмм
                ".card\n{transform: scale(1);\ntransition: transform 0.3s ease;\n}\n" +
                ".card.focus\n{transform: scale(1.03);\n}\n" +
                ".watched-history,\n.torrent-item,\n.online-prestige\n{transform: scale(1);\ntransition: transform 0.3s ease;\n}\n" +
                ".watched-history.focus,\n.torrent-item.focus,\n.online-prestige.focus\n{transform: scale(1.01);\n}\n" +
                ".extensions__item,\n.extensions__block-add,\n.full-review-add,\n.full-review,\n.tag-count,\n.full-person,\n.full-episode,\n.simple-button,\n.full-start__button,\n.items-cards .selector,\n.card-more,\n.explorer-card__head-img.selector,\n.card-episode\n{transform: scale(1);\ntransition: transform 0.3s ease;\n}\n" +
                ".extensions__item.focus,\n.extensions__block-add.focus,\n.full-review-add.focus,\n.full-review.focus,\n.tag-count.focus,\n.full-person.focus,\n.full-episode.focus,\n.simple-button.focus,\n.full-start__button.focus,\n.items-cards .selector.focus,\n.card-more.focus,\n.explorer-card__head-img.selector.focus,\n.card-episode.focus\n{transform: scale(1.03);\n}\n" +
                ".menu__item {\n  transition: transform 0.3s ease;\n}\n" +
                ".menu__item.focus {\n transform: translateX(-0.2em);\n}\n" +
                ".selectbox-item,\n.settings-folder,\n.settings-param {\n transition: transform 0.3s ease;\n}\n" +
                ".selectbox-item.focus,\n.settings-folder.focus,\n.settings-param.focus {\n transform: translateX(0.2em);\n}\n" +
            "</style>\n";
        $('body').append(animations_style);
    }

    // Ждем загрузки приложения и запускаем плагин
    if (window.appready) {
        applyStyle();
    } else {
        Lampa.Listener.follow('app', function(event) {
            if (event.type === 'ready') {
                applyStyle();
            }
        });
    }
})();



