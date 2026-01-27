(function() {
    'use strict';
    
    // Добавление переводов
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
        },
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

    // Основная функция применения стилей
    function applyStyle() {
        var style = $('<style id="maxsm_lich_style"></style>');
        
        // Объединенные стили с возможностью комментирования строк
        var css = "" +
            /* Основной фон приложения */
            "html, body, .extensions { background: linear-gradient(135deg, #0a1b2a, #1a4036) !important; }" +
            
            /* Навигационная панель */
            ".navigation-bar__body { background: rgba(18, 32, 36, 0.96); }" +
            
            /* Модальные окна */
            ".modal__content { background: rgba(18, 32, 36, 0.96); border: 0 solid rgba(18, 32, 36, 0.96); }" +
            
            /* Настройки */
            ".settings__content, .settings-input__content, .selectbox__content, .settings-input { background: rgba(18, 32, 36, 0.96); }" +
            
            /* Заставки и загрузчики */
            ".screensaver__preload { background: #1e2c2f no-repeat 50% 50%; }" +
            ".activity__loader { position:absolute; top:0; left:0; width:100%; height:100%; display:none; background: #1e2c2f no-repeat 50% 50%; }" +
            
            /* Элементы с темным фоном */
            ".company-start.icon--broken .company-start__icon," +
            ".explorer-card__head-img > img," +
            ".bookmarks-folder__layer," +
            ".card-more__box," +
            ".card__img," +
            ".extensions__block-add," +
            ".extensions__item { background-color: #1e2c2f; }" +
            
            /* Активные элементы с градиентом */
            ".search-source.focus," +
            ".simple-button.focus," +
            ".menu__item.focus," +
            ".menu__item.traverse," +
            ".menu__item.hover," +
            ".full-start__button.focus," +
            ".full-descr__tag.focus," +
            ".player-panel .button.focus," +
            ".full-person.selector.focus," +
            ".tag-count.selector.focus," +
            ".full-review.focus { background: linear-gradient(to right, #1e6262, #3da18d); color: #fff; box-shadow: none; }" +
            
            /* Элементы настроек */
            ".selectbox-item.focus," +
            ".settings-folder.focus," +
            ".settings-param.focus { background: linear-gradient(to right, #1e6262, #3da18d); color: #fff; border-radius: 0.5em 0 0 0.5em; }" +
            
            /* Качество и тип контента */
            ".card__quality1, .card__type1::after, .card--tv .card__type1 { background: linear-gradient(to right, #1e6262, #3da18d); }" +
            
            /* Обводка фокуса */
            ".full-episode.focus::after," +
            ".card-episode.focus .full-episode::after," +
            ".items-cards .selector.focus::after," +
            ".card-more.focus .card-more__box::after," +
            ".card.hover .card__view::after," +
            ".torrent-item.focus::after," +
            ".watched-history.selector.focus::after," +
            ".online-prestige.selector.focus::after," +
            ".explorer-card__head-img.selector.focus::after," +
            ".extensions__item.focus::after," +
            ".extensions__block-add.focus::after," +
            ".full-review-add.focus::after { border: 0.2em solid #3da18d; box-shadow: none; }" +
            
            /* Кнопки в шапке */
            ".head__action.focus, .head__action.hover { background: linear-gradient(45deg, #3da18d, #1e6262); }" +
            
            /* Торренты */
            ".torrent-serial { background: rgba(0, 0, 0, 0.22); border: 0.2em solid rgba(0, 0, 0, 0.22); }" +
            ".torrent-serial.focus { background-color: #1a3b36cc; border: 0.2em solid #3da18d; }" +
            
            /* Отступ для времени */
            ".head__time-now { margin-left: 0.5em; }" +
            
            /* Фикс минимальной высоты шапки */
            ".head__body { min-height: 4.1em; }" +
            
            /* Адаптивность для мобилок */
            "@media screen and (max-width: 480px) { " +
            ".full-start-new__head, .full-start-new__title, .full-start__title-original, " +
            ".full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, " +
            ".full-start-new__buttons, .full-start-new__details, .full-start-new__tagline { " +
            "justify-content: center; text-align: center; }" +
            ".full-start__title-original { max-width: 100%; }" +
            ".full-start-new__right { background: transparent; }" +
            "}" +
            
            /* Рейтинги */
            ".full-start__rate { border-radius: 0.25em; padding: 0.3em; background-color: rgba(0, 0, 0, 0.3); }" +
            ".full-start__pg, .full-start__status, .full-start-new__rate-line .full-start__pg { " +
            "font-size: 1em; background: #fff; color: #000; }" +
            
            /* Карточки */
            ".card__title { height: 3.6em; text-overflow: ellipsis; -webkit-line-clamp: 3; line-clamp: 3; }" +
            ".card__age { position: absolute; right: 0; bottom: 0; z-index: 10; background: rgba(0, 0, 0, 0.6); " +
            "color: #fff; font-weight: 700; padding: 0.4em 0.6em; border-radius: 0.48em 0 0.48em 0; " +
            "line-height: 1; font-size: 1em; }" +
            ".card__vote { position: absolute; bottom: auto; right: 0; top: 0; background: rgba(0, 0, 0, 0.6); " +
            "font-weight: 700; color: #fff; border-radius: 0 0.34em 0 0.34em; line-height: 1; }" +
            ".card__icons { position: absolute; top: 2em; left: 0; right: auto; justify-content: center; " +
            "background: rgba(0, 0, 0, 0.6); color: #fff; border-radius: 0 0.5em 0.5em 0; }" +
            ".card__icons-inner { background: none; color: #fff; }" +
            ".card__marker { position: absolute; left: 0; top: 4em; bottom: auto; background: rgba(0, 0, 0, 0.6); " +
            "border-radius: 0 0.5em 0.5em 0; font-weight: 700; font-size: 1em; padding: 0.4em 0.6em; " +
            "align-items: center; line-height: 1.2; max-width: min(12em, 95%); }" +
            ".card__marker > span { max-width: min(12em, 95%); }" +
            ".card__quality { position: absolute; bottom: auto; left: 0; right: auto; top: 0; " +
            "padding: 0.4em 0.6em; color: #fff; font-weight: 700; font-size: 1em; " +
            "border-radius: 0.4em 0 0.4em 0; text-transform: uppercase; }" +
            ".card__type { position: absolute; bottom: auto; left: 0; right: auto; top: 0; " +
            "background: rgba(0, 0, 0, 0.6); color: #fff; font-weight: 700; padding: 0.4em 0.6em; " +
            "border-radius: 0.4em 0 0.4em 0; line-height: 1; font-size: 1em; }" +
            ".card--tv .card__type { color: #fff; }" +
            ".card__quality, .card__type::after, .card--tv .card__type { background: rgba(0, 0, 0, 0.6); }" +
            
            /* Расстояние между рядами */
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em; }" +
            ".card--small .card__view { margin-bottom: 2em; }" +
            ".items-line--type-cards { min-height: 18em; }" +
            
            /* Высота карточки */
            "@media screen and (min-width: 580px) { .full-start-new { min-height: 80vh; display: flex; } }" +
            
            /* Постер */
            ".full-start__background.loaded { opacity: 0.8; }" +
            ".full-start__background.dim { opacity: 0.2; }" +
            
            /* Скругления */
            ".explorer__files .torrent-filter .simple-button { font-size: 1.2em; border-radius: 0.5em; }" +
            ".full-review-add, .full-review, .extensions__item, .extensions__block-add, .search-source, " +
            ".bookmarks-folder__layer, .bookmarks-folder__body, .card__img, .card__promo, " +
            ".full-episode__img img, .full-episode__body, .full-person__photo, .card-more__box, " +
            ".full-start__button, .simple-button, .register { border-radius: 0.5em; }" +
            ".extensions__item.focus::after, .extensions__block-add.focus::after, .full-episode.focus::after, " +
            ".full-review-add.focus::after, .card-episode.focus .full-episode::after, " +
            ".card.focus .card__view::after, .card-more.focus .card-more__box::after, " +
            ".register.focus::after { border-radius: 1em; }" +
            ".search-source.focus, .simple-button.focus, .menu__item.focus, .full-start__button.focus, " +
            ".full-descr__tag.focus, .player-panel .button.focus, .full-person.selector.focus, " +
            ".tag-count.selector.focus { border-radius: 0.5em; }" +
            
            /* Меню */
            ".menu__item.focus { border-radius: 0 0.5em 0.5em 0; }" +
            ".menu__list { padding-left: 0; }" +
            "li.menu__item.focus .menu__ico, li.menu__item.hover .menu__ico { color: #fff !important; }" +
            ".head__action.focus, .head__action.hover { color: #fff; }" +
            
            /* Анимации */
            ".card, .watched-history, .torrent-item, .online-prestige, .extensions__item, " +
            ".extensions__block-add, .full-review-add, .full-review, .tag-count, .full-person, " +
            ".full-episode, .simple-button, .full-start__button, .items-cards .selector, " +
            ".card-more, .explorer-card__head-img.selector, .card-episode { " +
            "transform: scale(1); transition: transform 0.3s ease; }" +
            ".card.focus, .watched-history.focus, .torrent-item.focus, .online-prestige.focus, " +
            ".extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, " +
            ".full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, " +
            ".simple-button.focus, .full-start__button.focus, .items-cards .selector.focus, " +
            ".card-more.focus, .explorer-card__head-img.selector.focus, .card-episode.focus { " +
            "transform: scale(1.03); }" +
            ".menu__item { transition: transform 0.3s ease; }" +
            ".menu__item.focus { transform: translateX(-0.2em); }" +
            ".selectbox-item, .settings-folder, .settings-param { transition: transform 0.3s ease; }" +
            ".selectbox-item.focus, .settings-folder.focus, .settings-param.focus { " +
            "transform: translateX(0.2em); }";
        
        style.html(css);
        $('head').append(style);
        
        // Добавление шаблонов
        addTemplates();
    }
    
    // Функция добавления шаблонов
    function addTemplates() {
        // Шаблон карточки с годом выше названия
        Lampa.Template.add('card', 
            '<div class="card selector layer--visible layer--render">' +
                '<div class="card__view">' +
                    '<img src="../img/img_load.svg" class="card__img" />' +
                    '<div class="card__icons">' +
                        '<div class="card__icons-inner"></div>' +
                    '</div>' +
                    '<div class="card__age">{release_year}</div>' +
                '</div>' +
                '<div class="card__title">{title}</div>' +
            '</div>');
        
        // Шаблон карточки эпизода без футера
        Lampa.Template.add('card_episode',
            '<div class="card-episode selector layer--visible layer--render">' +
                '<div class="card-episode__body">' +
                    '<div class="full-episode">' +
                        '<div class="full-episode__img">' +
                            '<img />' +
                        '</div>' +
                        '<div class="full-episode__body">' +
                            '<div class="card__title">{title}</div>' +
                            '<div class="card__age">{release_year}</div>' +
                            '<div class="full-episode__num hide">{num}</div>' +
                            '<div class="full-episode__name">{name}</div>' +
                            '<div class="full-episode__date">{date}</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="card-episode__footer hide">' +
                    '<div class="card__imgbox">' +
                        '<div class="card__view">' +
                            '<img class="card__img" />' +
                        '</div>' +
                    '</div>' +
                    '<div class="card__left">' +
                        '<div class="card__title">{title}</div>' +
                        '<div class="card__age">{release_year}</div>' +
                    '</div>' +
                '</div>' +
            '</div>');
    }

    // Запуск при загрузке приложения
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
