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
            // Рейтинг
            '.card__vote {' +
                'right: -0.8em;' + 
                'top: 1.4em;' +
			    'left: auto;' +
			    'bottom: auto;' +
                'background: #ffe216;' +
			    'color: #000;' +
			    'padding: 0.4em 0.4em;' +
	     	    'border-radius: 0.3em;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +
			
            // Год
            '.card__age {' +
                'position: absolute;' +
	            'right: -0.8em;' + 
			    'left: auto;' +
	     		'bottom: 0.8em;' +
			    'top: auto;' +
                'background: #ffe216;' +
			    'color: #000;' +
			    'padding: 0.4em 0.4em;' +
	     	    'border-radius: 0.3em;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +

            
            // Качество
            '.card__quality {' +
	            'right: -0.8em;' + 
			    'left: auto;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +
            
            // Тип сериал
            '.card--tv .card__type {' +
	            'right: -0.8em;' + 
			    'left: auto;' +
	     		'bottom: 3em;' +
			    'top: auto;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +
			
            // Заголовок карточки максимум 3 строки
            '.card__title {' +
                'height: 3.6em;' +
                'text-overflow: ellipsis;' +
                '-webkit-line-clamp: 3;' +
                'line-clamp: 3;' +
            '}' +
			
            // Расстояние между рядами
            '.items-line.items-line--type-cards + .items-line.items-line--type-cards {' +
                'margin-top: 1em;' +
            '}' +
            '.card--small .card__view {' +
                'margin-bottom: 2em;' +
            '}' +
            '.items-line--type-cards {' +
                'min-height: 18em;' +
            '}' +
            
            // Смещение наполнения карточки вниз для больших экранов
            '@media screen and (min-width: 580px) {' +
                '.full-start-new {' +
                    'min-height: 80vh;' +
                    'display: flex;' +
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





































