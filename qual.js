/*
Плагин для отображения качества на карточках (только фильмы)
*/

(function() {
    'use strict';

    // Переменные настройки
    var Q_LOGGING = true;  // Логгинг качества
    var Q_CACHE_TIME = 24 * 60 * 60 * 1000;  // Время кеша качества (сутки)
    var QUALITY_CACHE = 'maxsm_quality_cache_v3';
    
    // Получение настроек из внешних переменных
    var PRECONF = (window.QUALITY_PLUGIN_TOKENS && window.QUALITY_PLUGIN_TOKENS.PRECONF) || 'NO';
    var JACRED_URL = (window.QUALITY_PLUGIN_TOKENS && window.QUALITY_PLUGIN_TOKENS.JACRED_URL) || 
                    localStorage.getItem('maxsm_jacred_url') || '';
    var JACRED_API_KEY = (window.QUALITY_PLUGIN_TOKENS && window.QUALITY_PLUGIN_TOKENS.JACRED_API_KEY) || 
                        localStorage.getItem('maxsm_jacred_api_key') || '';

    // Стили для отображения качества
    var qualityStyle = "<style id=\"maxsm_quality\">" +
        ".maxsm-quality {" +
        "    min-width: 2.8em;" +
        "    text-align: center;" +
        "}" +
        /*
        ".card__quality {" +
        "    position: absolute;" +
        "    bottom: 5px;" +
        "    right: 5px;" +
        "    background: rgba(0, 0, 0, 0.7);" +
        "    color: white;" +
        "    padding: 2px 6px;" +
        "    border-radius: 3px;" +
        "    font-size: 0.8em;" +
        "    font-weight: bold;" +
        "    z-index: 10;" +
        "}" +
        */
        "</style>";
    
    // Добавляем стили на страницу
    Lampa.Template.add('maxsm_quality_css', qualityStyle);
    $('body').append(Lampa.Template.get('maxsm_quality_css', {}, true));

    // Локализация
    Lampa.Lang.add({
        maxsm_quality: {
            ru: 'Качество',
            en: 'Quality',
            uk: 'Якість',
            be: 'Якасць',
            pt: 'Qualidade',
            zh: '画质',
            he: 'איכות',
            cs: 'Kvalita',
            bg: 'Качество'
        },
        maxsm_quality_cc: {
            ru: 'Очистить кеш качества',
            en: 'Clear quality cache',
            uk: 'Очистити кеш якості',
            be: 'Ачысціць кэш якасці',
            pt: 'Limpar cache de qualidade',
            zh: '清除质量缓存',
            he: 'נקה מטמון איכות',
            cs: 'Vymazat mezipaměť kvality',
            bg: 'Изчистване на кеша за качество'
        }
    });

    // Функции для работы с кешем качества
    function getQualityCache(key) {
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
        var item = cache[key];
        
        if (!item) {
            if (Q_LOGGING) {
                console.log("MAXSM-QUALITY", "getQualityCache: no cache found for key: " + key);
            }
            return null;
        }
        
        var currentTime = Date.now();
        var timeDiff = currentTime - item.timestamp;
        var ageInDays = Math.round(timeDiff / (1000 * 60 * 60 * 24));
        
        // Если качество "4K" - всегда возвращаем, независимо от времени
        if (item.quality === "4K") {
            if (Q_LOGGING) {
                console.log(
                    "MAXSM-QUALITY", 
                    "getQualityCache: 4K quality detected, ignoring timestamp for key: " + key + 
                    ", age: " + ageInDays + " days (always valid)"
                );
            }
            return item;
        }
        
        // Для остальных качеств проверяем срок годности
        if (timeDiff < Q_CACHE_TIME) {
            if (Q_LOGGING) {
                console.log(
                    "MAXSM-QUALITY", 
                    "getQualityCache: valid cache found for key: " + key + 
                    ", quality: " + item.quality + 
                    ", age: " + ageInDays + " days (within limit)"
                );
            }
            return item;
        } else {
            if (Q_LOGGING) {
                console.log(
                    "MAXSM-QUALITY", 
                    "getQualityCache: cache expired for key: " + key + 
                    ", quality: " + item.quality + 
                    ", age: " + ageInDays + " days (expired)"
                );
            }
            return null;
        }
    }
    
    function saveQualityCache(key, data) {
        if (Q_LOGGING) console.log("MAXSM-QUALITY", "Save quality cache for key: " + key);
    
        var cache = Lampa.Storage.get(QUALITY_CACHE) || {};
    
        cache[key] = {
            quality: data.quality || null,
            timestamp: Date.now()
        };
    
        Lampa.Storage.set(QUALITY_CACHE, cache); 
    }

    // Получаем тип карточки
    function getCardType(card) {
        var type = card.media_type || card.type;
        if (type === 'movie' || type === 'tv') return type;
        return card.name || card.original_name ? 'tv' : 'movie';
    }

    // Получаем информацию от JacRed  
    function getBestReleaseFromJacred(normalizedCard, callback) {
        if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: Optimized search");

        var MAX_QUALITY = 2160;
        var stopWords = ['camrip', 'камрип', 'ts', 'telecine', 'telesync', 'telesynch', 'upscale', 'tc', 'тс'];
        var stopWordsPatterns = null;
        
        function translateQuality(quality) {
            if (quality === 2160) return '4K';
            if (quality === 1080) return 'FHD';
            return '';
        }

        function hasLetters(str) {
            return /[a-zа-яё]/i.test(str || '');
        }
        
        function onlyDigits(str) {
            return /^\d+$/.test(str);
        }
        
        function isScreenCopy(title) {
            if (!title) return false;
            var lower = title.toLowerCase();
            
            if (stopWordsPatterns === null) {
                stopWordsPatterns = stopWords.map(function(word) {
                    return new RegExp('\\b' + word + '\\b', 'i');
                });
            }

            for (var i = 0; i < stopWordsPatterns.length; i++) {
                if (stopWordsPatterns[i].test(lower)) {
                    return true;
                }
            }
            return false;
        }

        // Извлечение года
        var year = '';
        var dateStr = normalizedCard.release_date || '';
        if (dateStr.length >= 4) {
            year = dateStr.substring(0, 4);
        }

        if (!year || isNaN(year)) {
            if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: Missing/invalid year");
            callback(null);
            return;
        }

        var uid = Lampa.Storage.get('lampac_unic_id', '');
        var apiUrl = JACRED_URL + '/api/v2.0/indexers/all/results?' +
                     'apikey=' + JACRED_API_KEY +
                     '&uid=' + uid +
                     '&year=' + year;

        // Добавляем оба заголовка если они есть
        var hasTitle = false;
        if (normalizedCard.title && (hasLetters(normalizedCard.title) || onlyDigits(normalizedCard.title))) {
            apiUrl += '&title=' + encodeURIComponent(normalizedCard.title.trim());
            hasTitle = true;
        }
        if (normalizedCard.original_title && (hasLetters(normalizedCard.original_title) || onlyDigits(normalizedCard.original_title))) {
            apiUrl += '&title_original=' + encodeURIComponent(normalizedCard.original_title.trim());
            hasTitle = true;
        }

        if (!hasTitle) {
            if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: No valid titles");
            callback(null);
            return;
        }

        if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: Unified Request URL: " + apiUrl);

        new Lampa.Reguest().silent(apiUrl, function(response) {
            if (!response) {
                if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: Request failed");
                callback(null);
                return;
            }

            try {
                // Парсим ответ и извлекаем Results
                var data = typeof response === 'string' ? JSON.parse(response) : response;
                var torrents = data.Results || [];
                
                if (!Array.isArray(torrents)) {
                    torrents = [];
                }

                if (torrents.length === 0) {
                    if (Q_LOGGING) console.log("MAXSM-QUALITY", "JacRed: Empty response");
                    callback(null);
                    return;
                }

                var bestQuality = -1;
                var bestTorrent = null;
                var findStopWords = false;
                var searchYearNum = parseInt(year, 10);
                var prevYear = searchYearNum - 1;

                for (var i = 0; i < torrents.length; i++) {
                    var t = torrents[i];
                    var info = t.info || t.Info || {};
                    var usedQuality = info.quality;
                    var usedYear = info.relased;
                    var titleForCheck = t.Title || '';
                    
                    // Пропускаем торренты без информации о качестве
                    if (typeof usedQuality !== 'number' || usedQuality === 0) {
                        continue;
                    }

                    // Проверяем валидность года
                    var yearValid = false;
                    var parsedYear = 0;
                    
                    if (usedYear && !isNaN(usedYear)) {
                        parsedYear = parseInt(usedYear, 10);
                        if (parsedYear > 1900) {
                            yearValid = true;
                        }
                    }
                    
                    if (!yearValid) {
                        continue;
                    }

                    // Проверяем соответствие года (текущий или предыдущий)
                    if (parsedYear !== searchYearNum && parsedYear !== prevYear) {
                        continue;
                    }

                    // Проверяем на стоп-слова
                    if (isScreenCopy(titleForCheck)) {
                        findStopWords = true;
                        continue;
                    }

                    // Проверяем максимальное качество
                    if (usedQuality === MAX_QUALITY) {
                        if (Q_LOGGING) console.log("MAXSM-QUALITY", "Found MAX quality: " + usedQuality);
                        callback({ 
                            quality: translateQuality(usedQuality),
                            title: titleForCheck 
                        });
                        return;
                    }

                    // Обновляем лучший торрент
                    if (usedQuality > bestQuality) {
                        bestQuality = usedQuality;
                        bestTorrent = {
                            title: titleForCheck,
                            quality: usedQuality,
                            year: parsedYear
                        };
                    }
                }

                if (bestTorrent) {
                    var translatedQuality = translateQuality(bestTorrent.quality);
                    if (Q_LOGGING) console.log("MAXSM-QUALITY", 
                        "Found torrent: " + bestTorrent.title + 
                        " quality: " + translatedQuality + " (" + bestTorrent.quality + "p)" +
                        " year: " + bestTorrent.year);
                    callback({ 
                        quality: translatedQuality, 
                        title: bestTorrent.title 
                    });
                } else if (findStopWords) {
                    if (Q_LOGGING) console.log("MAXSM-QUALITY", "Screen copy detected");
                    callback({ 
                        quality: translateQuality('TS'),
                        title: "NOT SAVED" 
                    });
                } else {
                    if (Q_LOGGING) console.log("MAXSM-QUALITY", "No suitable torrents found");
                    callback(null);
                }
            } catch (e) {
                if (Q_LOGGING) console.log("MAXSM-QUALITY", "Processing error: " + e.message);
                callback(null);
            }
        });
    }

    // Обновляем качество внутри карточки
    function updateQualityInCard(quality, render) {
        if (!render) return;
        var element = $('.full-start__status.maxsm-quality', render);
        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) return;
        
        if (element.length) {
            if (Q_LOGGING) console.log('MAXSM-QUALITY', 'Updating existing element with quality "' + quality + '"');
            element.text(quality).css('opacity', '1');
        } else {
            if (Q_LOGGING) console.log('MAXSM-QUALITY', 'Creating new element with quality "' + quality + '"');
            var div = document.createElement('div');
            div.className = 'full-start__status maxsm-quality';
            div.textContent = quality;
            rateLine.append(div);
        }
    }

    // Удаляем качество с карточки если есть
    function clearQualityElements(render) {
        if (render) $('.full-start__status.maxsm-quality', render).remove();
    }

    // Плейсхолдер качества
    function showQualityPlaceholder(render) {
        if (!render) return;
        
        var rateLine = $('.full-start-new__rate-line', render);
        if (!rateLine.length) return;
        
        // Проверяем, не добавлен ли уже плейсхолдер
        if (!$('.full-start__status.maxsm-quality', render).length) {
            var placeholder = document.createElement('div');
            placeholder.className = 'full-start__status maxsm-quality';
            placeholder.textContent = '...';
            placeholder.style.opacity = '0.7';
            rateLine.append(placeholder);
        } 
    }

    // Применяем качество к карточке в списке
    function applyQualityToCard(card, quality, source, qCacheKey) {
        if (!document.body.contains(card)) {
            if (Q_LOGGING) console.log('MAXSM-QUALITY', 'Card removed from DOM');
            return;
        }
        
        card.setAttribute('data-quality-added', 'true');
        
        var cardView = card.querySelector('.card__view');
        var qualityElements = null;
        
        // Сохраняем в кеш если данные от JacRed
        if (source === 'JacRed' && quality && quality !== 'NO') {
            saveQualityCache(qCacheKey, { quality: quality });
        }
        
        if (quality && quality !== 'NO') {
            if (Q_LOGGING) console.log('MAXSM-QUALITY', source + ' found quality: ' + quality);
            
            if (cardView) {
                var hasQuality = false;
                qualityElements = cardView.getElementsByClassName('card__quality');
                if (qualityElements.length > 0) hasQuality = true;
                
                var qualityDiv;
                var innerElement;
                var qualityInner;
                
                if (!hasQuality) {
                    qualityDiv = document.createElement('div');
                    qualityDiv.className = 'card__quality';
                    qualityInner = document.createElement('div');
                    qualityInner.textContent = quality;
                    qualityDiv.appendChild(qualityInner);
                    cardView.appendChild(qualityDiv);
                } else {
                    qualityDiv = qualityElements[0];
                    innerElement = qualityDiv.firstElementChild;
                    
                    if (innerElement) {
                        innerElement.textContent = quality;
                    } else {
                        qualityInner = document.createElement('div');
                        qualityInner.textContent = quality;
                        qualityDiv.innerHTML = '';
                        qualityDiv.appendChild(qualityInner);
                    }
                }
            }
        } else {
            if (cardView) {
                qualityElements = cardView.getElementsByClassName('card__quality');
                var elementsToRemove = [];
                for (var j = 0; j < qualityElements.length; j++) {
                    elementsToRemove.push(qualityElements[j]);
                }
                for (var k = 0; k < elementsToRemove.length; k++) {
                    var el = elementsToRemove[k];
                    if (el.parentNode) {
                        el.parentNode.removeChild(el);
                    }
                }
            }
        }
    }

    // Получаем качество последовательно
    function fetchQualitySequentially(normalizedCard, qCacheKey, render, callback) {
        if (Q_LOGGING) console.log('MAXSM-QUALITY', 'Starting JacRed request');
        getBestReleaseFromJacred(normalizedCard, function(jrResult) {
            if (Q_LOGGING) console.log('MAXSM-QUALITY', 'JacRed callback received');
            var quality = (jrResult && jrResult.quality) || null;
            if (quality && quality !== 'NO') {
                if (Q_LOGGING) console.log('MAXSM-QUALITY', 'JacRed found quality: ' + quality);
                saveQualityCache(qCacheKey, { quality: quality });
                if (callback) callback(quality);
            } else {
                if (callback) callback(null);
            }
        });
    }

    // Проверяем, является ли карточка фильмом
    function isMovieCard(card) {
        var type = getCardType(card);
        return type === 'movie';
    }

    // Основная функция для обработки качества внутри карточки (только фильмы)
    function processCardQuality(card, render) {
        if (!render) return;
        
        // Проверяем, что это фильм
        if (!isMovieCard(card)) {
            return;
        }
        
        var normalizedCard = {
            id: card.id,
            title: card.title || card.name || '',
            original_title: card.original_title || card.original_name || '',
            type: 'movie', // всегда movie для этой функции
            release_date: card.release_date || card.first_air_date || ''
        };
        
        var qCacheKey = 'movie_' + normalizedCard.id;
        var cacheQualityData = getQualityCache(qCacheKey);
        
        // Если есть кеш - сразу применяем
        if (cacheQualityData) {
            if (Q_LOGGING) console.log("MAXSM-QUALITY", "Get Quality data from cache");
            updateQualityInCard(cacheQualityData.quality, render);
        } else {
            clearQualityElements(render);
            showQualityPlaceholder(render);
            fetchQualitySequentially(normalizedCard, qCacheKey, render, function(quality) {
                if (quality) {
                    updateQualityInCard(quality, render);
                } else {
                    clearQualityElements(render);
                }
            });
        }
    }

    // Обновляем качество на карточках в списке (только фильмы)
    function updateCards(cards) {
        for (var i = 0; i < cards.length; i++) {
            var card = cards[i];
            if (card.hasAttribute('data-quality-added')) continue;
            
            // Проверяем, что это карточка фильма
            var cardView = card.querySelector('.card__view');
            if (cardView) {
                var typeElements = cardView.getElementsByClassName('card__type');
                // Пропускаем сериалы (они имеют card__type)
                if (typeElements.length > 0) {
                    continue;
                }
            }

            (function(currentCard) {
                var data = currentCard.card_data;
                if (!data) return;
                
                // Проверяем, что это фильм
                if (!isMovieCard(data)) {
                    return;
                }
                
                if (Q_LOGGING) console.log("MAXSM-QUALITY", "CARDLIST: movie card data: ", data);
                
                var normalizedCard = {
                    id: data.id || '',
                    title: data.title || data.name || '',
                    original_title: data.original_title || data.original_name || '',
                    release_date: data.release_date || data.first_air_date || '',
                    type: 'movie'
                };     
                
                var qCacheKey = 'movie_' + normalizedCard.id;
                var cacheQualityData = getQualityCache(qCacheKey);
                
                // Если есть кеш - сразу применяем
                if (cacheQualityData) {
                    if (Q_LOGGING) console.log("MAXSM-QUALITY", "Get Quality data from cache");
                    applyQualityToCard(currentCard, cacheQualityData.quality, 'Cache');
                } 
                // Если нет кеша - запрашиваем у JacRed
                else {
                    applyQualityToCard(currentCard, '...', 'Pending');
                    getBestReleaseFromJacred(normalizedCard, function(jrResult) {
                        if (Q_LOGGING) console.log('MAXSM-QUALITY', 'CARDLIST: JacRed callback received');
                        var quality = (jrResult && jrResult.quality) || null;
                        applyQualityToCard(currentCard, quality, 'JacRed', qCacheKey);
                    });
                }
            })(card);
        }
    }

    // Обсервер DOM для новых карт
    var observer = new MutationObserver(function(mutations) {
        var newCards = [];
        for (var m = 0; m < mutations.length; m++) {
            var mutation = mutations[m];
            if (mutation.addedNodes) {
                for (var j = 0; j < mutation.addedNodes.length; j++) {
                    var node = mutation.addedNodes[j];
                    if (node.nodeType !== 1) continue;
                    
                    if (node.classList && node.classList.contains('card')) {
                        newCards.push(node);
                    }
                    
                    var nestedCards = node.querySelectorAll('.card');
                    for (var k = 0; k < nestedCards.length; k++) {
                        newCards.push(nestedCards[k]);
                    }
                }
            }
        }
        
        if (newCards.length) updateCards(newCards);
    });

    // Инициализация плагина
    function startPlugin() {
        if (Q_LOGGING) console.log("MAXSM-QUALITY", "Hello! (Movies only)"); 
        window.maxsmQualityPlugin = true;
        
        // Добавление компонента в настройки
        Lampa.SettingsApi.addComponent({
            component: "maxsm_quality",
            name: Lampa.Lang.translate("maxsm_quality"),
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="white" d="M23 11.01L18 11c-.55 0-1 .45-1 1v9c0 .55.45 1 1 1h5c.55 0 1-.45 1-1v-9c0-.55-.45-.99-1-.99zM23 20h-5v-7h5v7zM20 2H2C.89 2 0 2.89 0 4v12a2 2 0 0 0 2 2h7v2H7v2h8v-2h-2v-2h2v-2H2V4h18v5h2V4c0-1.11-.89-2-2-2zm-8.03 7L11 6l-.97 3H7l2.47 1.76-.94 2.91 2.47-1.8 2.47 1.8-.94-2.91L15 9h-3.03z"/></svg>'
        });

        // Настройки сервера (если не предустановлены)
        if (PRECONF === 'NO') {
            Lampa.SettingsApi.addParam({
                component: 'maxsm_quality',
                param: {
                    name: 'maxsm_jacred_url',
                    type: 'button'
                },
                field: {
                    name: 'ENTER JACRED URL',
                    description: ''
                },
                onChange: function() {    
                    Lampa.Input.edit({
                        free: true,
                        title: 'ENTER JACRED URL'
                    }, function(newKey) { 
                        if (typeof newKey === 'string') {
                            newKey = newKey.trim();
                        }
                        if (newKey && newKey.length > 0) {
                            Lampa.Storage.set('maxsm_jacred_url', newKey);
                            setTimeout(function() { location.reload(); }, 500);
                        } 
                    });
                }
            });

            Lampa.SettingsApi.addParam({
                component: 'maxsm_quality',
                param: {
                    name: 'maxsm_jacred_api_key',
                    type: 'button'
                },
                field: {
                    name: 'ENTER JACRED API KEY',
                    description: ''
                },
                onChange: function() {    
                    Lampa.Input.edit({
                        free: true,
                        title: 'ENTER JACRED API KEY'
                    }, function(newKey) { 
                        if (typeof newKey === 'string') {
                            newKey = newKey.trim();
                        }
                        if (newKey && newKey.length > 0) {
                            Lampa.Storage.set('maxsm_jacred_api_key', newKey);
                            setTimeout(function() { location.reload(); }, 500);
                        } 
                    });
                }
            });
            
            // Отображение статуса сервера
            var qualityLabelText = '';
            if (JACRED_URL && JACRED_URL.trim() !== '') {
                qualityLabelText = 'Quality: ' + JACRED_URL;
            } else {
                qualityLabelText = 'Quality: JacRed server not set';
            }
            
            if (Q_LOGGING) console.log('MAXSM-QUALITY', qualityLabelText);
            
            Lampa.SettingsApi.addParam({
                component: 'maxsm_quality',
                param: {
                    name: '',
                    type: 'title'
                },
                field: {
                    name: qualityLabelText,
                    description: ''
                }
            });
        }
        
        // Кнопка очистки кеша
        Lampa.SettingsApi.addParam({
            component: 'maxsm_quality',
            param: {
                name: 'maxsm_quality_cc',
                type: 'button'
            },
            field: {
                name: Lampa.Lang.translate('maxsm_quality_cc')
            },
            onChange: function() {
                localStorage.removeItem(QUALITY_CACHE);
                window.location.reload();
            }
        });
        
        // Включение наблюдателя
        observer.observe(document.body, { childList: true, subtree: true });
        if (Q_LOGGING) console.log('MAXSM-QUALITY', 'observer Start (movies only)');
        
        // Обработка открытия полной карточки (только фильмы)
        Lampa.Listener.follow('full', function (e) {
            if (e.type == 'complite') {
                var render = e.object.activity.render();
                // Всегда ищем качество для фильмов
                processCardQuality(e.data.movie, render);
            }
        });
    }

    // Запуск плагина
    if (!window.maxsmQualityPlugin) startPlugin();


})();



