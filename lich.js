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
			
	        // Иконки закладок и т.д.
			'.card__icons {' +
				'top: 5em;' +
			'}' +
			
            // Рейтинг
            '.card__vote {' +
			    'bottom: auto;' +
                'top: 0.8em;' +
                'right: 0em;' + 
			    'left: auto;' +
                'background: #000;' +
			    'color: #fff;' +
			    'padding: 0.4em 0.4em;' +
	     	    'border-radius: 0.3em 0 0 0.3em;' +
                'font-weight: 700;' +
                'font-size: 1.2em;' +
            '}' +
			           
            // Качество
            '.card__quality {' +
		    	'background-color: #ffc107;' + 
				'color: #000;' + 
                'bottom: auto;' + 
                'top: 4.2em;' + 
	            'right: 0em;' + 
			    'left: auto;' +
	     	    'border-radius: 0.3em 0 0 0.3em;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +
            
            // Тип сериал
            '.card--tv .card__type {' +
		    	'background-color: #dc3545;' +  
                'bottom: auto;' + 
                'top: 4.2em;' + 
	            'right: 0em;' + 
			    'left: auto;' +
	     	    'border-radius: 0.3em 0 0 0.3em;' +
                'font-weight: 700;' +
                'font-size: 0.8em;' +
            '}' +

            // Год
            '.card__age {' +
                'position: absolute;' +
	     		'bottom: 1.2em;' +
			    'top: auto;' +
	            'right: 0em;' + 
			    'left: auto;' +
                'background: #000;' +
			    'color: #fff;' +
			    'padding: 0.4em 0.4em;' +
	     	    'border-radius: 0.3em 0 0 0.3em;' +
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
			
			// Статус выхода и возростной рейтинг
			'.full-start-new__rate-line .full-start__pg {' +
				'font-size: 1em;' +
				'background: #fff;' +
				'color: #000;' +
			'}' +
			'.full-start__pg, .full-start__status {' +
				'font-size: 1em;' +
				'background: #fff;' +
				'color: #000;' +
			'}' +
			
            // Меню слева
            '.menu__item.focus {' +
				'border-radius: 0 0.5em 0.5em 0;' +
			'}' +
            '.menu__list {' +
				'padding-left: 0em;' +
	        '}' +

			// Уменьшенный бордер
			'.full-episode.focus::after,' +
			'.card-episode.focus .full-episode::after,' +
			'.items-cards .selector.focus::after,' +
			'.card-more.focus .card-more__box::after,' +
			'.card-episode.hover .full-episode::after,' +
			'.card.focus .card__view::after,' +
			'.card.hover .card__view::after,' +
			'.torrent-item.focus::after,' +
			'.watched-history.selector.focus::after,' +
			'.online-prestige.selector.focus::after,' +
			'.online-prestige--full.selector.focus::after,' +
			'.explorer-card__head-img.selector.focus::after,' +
			'.extensions__item.focus::after,' +
			'.extensions__block-add.focus::after,' +
			'.full-review-add.focus::after {' +
			'    border: 0.2em solid #fff;' +
			'}' +
			
			// Анимации
			'.card, ' +
			'.watched-history, ' +
			'.torrent-item, ' +
			'.online-prestige, ' +
			'.extensions__item, ' +
			'.extensions__block-add, ' +
			'.full-review-add, ' +
			'.full-review, ' +
			'.tag-count, ' +
			'.full-person, ' +
			'.full-episode, ' +
			'.simple-button, ' +
			'.full-start__button, ' +
			'.items-cards .selector, ' +
			'.card-more, ' +
			'.explorer-card__head-img.selector, ' +
			'.card-episode {transform: scale(1); transition: transform 0.3s ease;}' +
			
			'.card.focus, ' +
			'.extensions__item.focus, ' +
			'.extensions__block-add.focus, ' +
			'.full-review-add.focus, ' +
			'.full-review.focus, ' +
			'.tag-count.focus, ' +
			'.full-person.focus, ' +
			'.full-episode.focus, ' +
			'.simple-button.focus, ' +
			'.full-start__button.focus, ' +
			'.items-cards .selector.focus, ' +
			'.card-more.focus, ' +
			'.explorer-card__head-img.selector.focus, ' +
			'.card-episode.focus {transform: scale(1.03);}' +
			
			'.watched-history.focus, ' +
			'.torrent-item.focus, ' +
			'.online-prestige.focus {transform: scale(1.01);}' +
			
			'.menu__item {transition: transform 0.3s ease;}' +
			
			'.menu__item.focus {transform: translateX(-0.2em);}' +
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



































































