(function() {
    'use strict';

    // Основная функция применения стилей и добавления шаблонов
    function applyStyleAndTemplates() {
        // Проверяем, не добавлены ли уже стили
        if (document.getElementById('maxsm_lich_style')) {
            return;
        }
        
        // Удаляем старые стили если jQuery доступен
        if (typeof window.$ !== 'undefined' && window.$ && window.$.fn) {
            $('#maxsm_lich_style').remove();
        }
        
        // Создаем элемент стилей
        var style = document.createElement('style');
        style.id = 'maxsm_lich_style';
        
        // Оптимизированные объединенные стили
        var css = '' +       
            // Заголовок карточки максимум 3 строки
            '.card__title {' +
                'height: 3.6em !important;' +
                'text-overflow: ellipsis !important;' +
                '-webkit-line-clamp: 3 !important;' +
                'line-clamp: 3 !important;' +
            '}' +
			
            // Год - обновлено: закругление со всех сторон и отступ от края
            '.card__age {' +
                'position: absolute !important;' +
                'right: 0.4em !important;' + 
                'bottom: 0.4em !important;' + 
                'font-weight: 700 !important;' +
                'padding: 0.4em 0.8em !important;' +
                'border-radius: 1em !important;' + 
                'line-height: 1.0 !important;' +
                'font-size: 1.0em !important;' +
                'background: rgba(0, 0, 0, 0.5) !important;' +
            '}' +
            
            // Иконки закладок и т.д.
            //'.card__icons {' +
            //    'top: 2.5em !important;' + 
           // '}' +
            
            // Рейтинг - обновлено: закругление со всех сторон и отступ от края
            '.card__vote {' +
                'position: absolute !important;' +
                'bottom: auto !important;' +
                'right: 0.4em !important;' + 
                'top: 0.4em !important;' + 
                'font-weight: 700 !important;' +
                'padding: 0.4em 0.8em !important;' +
                'border-radius: 1em !important;' + 
                'line-height: 1.0 !important;' +
                'font-size: 1.0em !important;' +
            '}' +

'.card .card__vote::before {' +
    'content: "" !important;' + /* Убрали SVG из content */
    'width: 1.2em !important;' + /* Относительный размер */
    'height: 1.2em !important;' +
    'background-image: url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 -960 960 960\'%3E%3Cpath fill=\'%23ffffff\' d=\'M349.923-241.308L480-320.077l131.077 79.769-34.615-148.307 115.384-99.924L540.077-502 480-642.308 420.923-503l-151.769 13.461 115.384 99.693-34.615 148.538ZM283-150.076l52.615-223.539-173.923-150.847 229.231-18.846L480-754.693l90.077 211.385 228.231 18.846-173.923 150.847L677-150.076 480-268.923 283-150.076Zm197-281.616Z\'/%3E%3C/svg%3E") !important;' +
    'background-size: contain !important;' +
    'background-repeat: no-repeat !important;' +
    'background-position: center !important;' +
    'flex-shrink: 0 !important;' + /* Иконка не сжимается */
    'display: inline-block !important;' +
'}' +
            
            // Качество - обновлено: закругление со всех сторон и отступ от края
            '.card__quality {' +
                //'position: absolute !important;' +
                'bottom: auto !important;' +
                //'left: 0.4em !important;' + 
                //'right: auto !important;' +
                'top: 1.4em !important;' + 
                // 'padding: 0.4em 0.8em !important;' +
                'font-weight: 700 !important;' +
                'font-size: 1.0em !important;' +
                // 'border-radius: 1em !important;' + 
                // 'color: #ffffff;' +
            '}' +
            
            // Тип сериал - обновлено: закругление со всех сторон и отступ от края
            '.card--tv .card__type {' +
            //    'position: absolute !important;' +
              //  'bottom: auto !important;' +
             //  'left: 0.4em !important;' + 
              //  'right: auto !important;' +
              //  'top: 0.4em !important;' + 
                'font-weight: 700 !important;' +
                // 'padding: 0.4em 0.8em !important;' +
                // 'border-radius: 1em !important;' + 
               // 'line-height: 1.0 !important;' +
                'font-size: 1.0em !important;' +
            '}' +
			
            // Расстояние между рядами
            '.items-line.items-line--type-cards + .items-line.items-line--type-cards {' +
                'margin-top: 1em !important;' +
            '}' +
            '.card--small .card__view {' +
                'margin-bottom: 2em !important;' +
            '}' +
            '.items-line--type-cards {' +
                'min-height: 18em !important;' +
            '}' +
            
            // Смещение наполнения карточки вниз для больших экранов
            '@media screen and (min-width: 580px) {' +
                '.full-start-new {' +
                    'min-height: 80vh !important;' +
                    'display: flex !important;' +
                '}' +
            '}' +
            '';
        
        // Добавляем CSS
        if (style.styleSheet) {
            // Для IE
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
        
        document.head.appendChild(style);
		
        // Добавление шаблонов если доступен Lampa.Template
        if (typeof Lampa !== 'undefined' && Lampa.Template) {
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
        } else {
            console.warn('Lampa.Template не найден, шаблоны не добавлены');
        }
    }

    // Запуск при загрузке приложения
    function init() {
        if (window.appready) {
            applyStyleAndTemplates();
        } else if (typeof Lampa !== 'undefined' && Lampa.Listener) {
            Lampa.Listener.follow('app', function(event) {
                if (event.type === 'ready') {
                    applyStyleAndTemplates();
                }
            });
        } else {
            // Fallback: запускаем при полной загрузке DOM
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', applyStyleAndTemplates);
            } else {
                applyStyleAndTemplates();
            }
        }
    }

    // Запускаем инициализацию
    init();
})();








