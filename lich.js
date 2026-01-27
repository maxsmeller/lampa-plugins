(function() {
    'use strict';

    // Основная функция применения стилей
    function applyStyle() {
        // Удаляем старые стили
        $('#maxsm_lich_style').remove();
        
        var style = $('<style id="maxsm_lich_style"></style>');
        
        // Объединенные стили - только НЕ цветовые свойства
        var css = "" +
            
            /* Отступ для времени */
            ".head__time-now { margin-left: 0.5em; }" +
            
            /* Фикс минимальной высоты шапки */
            ".head__body { min-height: 4.1em; }" +
            
            /* Адаптивность для мобилок */
            "@media screen and (max-width: 480px) { " +
            ".full-start-new__head, .full-start-new__title, .full-start__title-original, " +
            ".full-start__rate, .full-start-new__reactions, .full-start-new__rate-line, " +
            ".full-start-new__details, .full-start-new__tagline { " +
            "-webkit-justify-content: center !important; justify-content: center !important; text-align: center !important; }" +
            ".full-start__title-original { max-width: 100% !important; }" +
            "}" +
            
            /* Карточки - оставляем позиционирование, размеры, но убираем цвета */
            ".card__title { height: 3.6em !important; text-overflow: ellipsis !important; -webkit-line-clamp: 3 !important; line-clamp: 3 !important; }" +
            ".card__age { position: absolute !important; right: 0em !important; bottom: 0em !important; z-index: 10 !important; " +
            "font-weight: 700 !important; padding: 0.4em 0.6em !important; border-radius: 0.48em 0 0.48em 0 !important; " +
            "line-height: 1.0 !important; font-size: 1.0em !important; }" +
            ".card__vote { position: absolute !important; bottom: auto !important; right: 0em !important; top: 0em !important; " +
            "font-weight: 700 !important; border-radius: 0 0.34em 0 0.34em !important; line-height: 1.0 !important; }" +
            ".card__marker { position: absolute !important; left: 0em !important; top: 4em !important; bottom: auto !important; " +
            "border-radius: 0 0.5em 0.5em 0 !important; font-weight: 700 !important; font-size: 1.0em !important; padding: 0.4em 0.6em !important; " +
            "display: flex !important; align-items: center !important; line-height: 1.2 !important; max-width: min(12em, 95%) !important; }" +
            ".card__marker > span { max-width: min(12em, 95%) !important; }" +
            ".card__quality { position: absolute !important; bottom: auto !important; left: 0em !important; right: auto !important; top: 0em !important; " +
            "padding: 0.4em 0.6em !important; font-weight: 700 !important; font-size: 1.0em !important; " +
            "border-radius: 0.4em 0 0.4em 0 !important; text-transform: uppercase !important; }" +

            // Тип сериал
            ".card--tv .card__type { " +
            "position: absolute !important; " +
            "bottom: auto !important; " +
            "left: 0em !important; " +
            "right: auto !important; " +
            "top: 0em !important; " +
            "font-weight: 700 !important; " +
            "padding: 0.4em 0.6em !important; " +
            "border-radius: 0.4em 0 0.4em 0 !important; " +
            "line-height: 1.0 !important; " +
            "font-size: 1.0em !important; " +
            "z-index: 5 !important; " +
            "}" +

              // Год
            ".card__age {\n  position: absolute;\n  right: 0em;\n  bottom: 0em;\n  z-index: 10;\n  background: rgba(0, 0, 0, 0.6);\n  color: #ffffff;\n  font-weight: 700;\n  padding: 0.4em 0.6em;\n    -webkit-border-radius: 0.48em 0 0.48em 0;\n     -moz-border-radius: 0.48em 0 0.48em 0;\n          border-radius: 0.48em 0 0.48em 0;\nline-height: 1.0;\nfont-size: 1.0em;\n}\n " +
            
            /* Расстояние между рядами */
            ".items-line.items-line--type-cards + .items-line.items-line--type-cards { margin-top: 1em !important; }" +
            ".card--small .card__view { margin-bottom: 2em !important; }" +
            ".items-line--type-cards { min-height: 18em !important; }" +
            
            /* Высота карточки */
            "@media screen and (min-width: 580px) { .full-start-new { min-height: 80vh !important; display: flex !important; } }" +
            
            /* Меню - оставляем только неравномерные скругления */
            ".menu__item.focus { border-radius: 0 1em 1em 0 !important; }" +
            ".menu__list { padding-left: 0em !important; }" +
            
            /* Анимации */
            ".card { transform: scale(1) !important; transition: transform 0.3s ease !important; }" +
            ".card.focus { transform: scale(1.03) !important; }" +
            ".extensions__item, .extensions__block-add, .full-review-add, .full-review, .tag-count, " +
            ".full-person, .full-episode, .items-cards .selector, " +
            ".card-more, .explorer-card__head-img.selector, .card-episode { " +
            "transform: scale(1) !important; transition: transform 0.3s ease !important; }" +
            ".extensions__item.focus, .extensions__block-add.focus, .full-review-add.focus, " +
            ".full-review.focus, .tag-count.focus, .full-person.focus, .full-episode.focus, " +
            ".items-cards .selector.focus, " +
            ".card-more.focus, .explorer-card__head-img.selector.focus, .card-episode.focus { " +
            "transform: scale(1.03) !important; }" +
            ".menu__item { transition: transform 0.3s ease !important; }" +
            ".menu__item.focus { transform: translateX(-0.2em) !important; }" +
            ".selectbox-item, .settings-folder, .settings-param { transition: transform 0.3s ease !important; }" +
            ".selectbox-item.focus, .settings-folder.focus, .settings-param.focus { transform: translateX(0.2em) !important; }";
        
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
                            '<div class="full-episode__name>{name}</div>' +
                            '<div class="full-episode__date>{date}</div>' +
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
                        '<div class="card__title>{title}</div>' +
                        '<div class="card__age>{release_year}</div>' +
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



