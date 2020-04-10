window.addEventListener('DOMContentLoaded', function() {
   'use strict';

let info = document.querySelector('.info-header'),
     tab = document.querySelectorAll('.info-header-tab'),
     tabContent = document.querySelectorAll('.info-tabcontent');

     function hideTabContent(a) {
         for(let i = a; i < tabContent.length; i++) {
             tabContent[i].classList.remove('show');
             tabContent[i].classList.add('hide');
         }
    }

    hideTabContent(1);

    function showTabContent(b) {
        if(tabContent[b].classList.contains('hide')) {
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    }
     
    info.addEventListener('click', function(event) {
        let target = event.target;

        if(target && target.classList.contains('info-header-tab')){
             for(let i = 0; i < tab.length; i++) {
                if(target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
             }
        }
    });

    // Timers:

    let deadline = '2020-06-02';

    function getTimeRemaining(endtime) {
         let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t/1000) % 60),
            minutes = Math.floor((t/1000/60) % 60),
            hours = Math.floor((t/(1000*60*60))%24),
            days = Math.floor(t / (1000 * 60 * 60 * 24));

            return {
                'total': t,
                'seconds': seconds,
                'minutes': minutes,
                'hours': hours,
                'days': days,
            };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
              days = timer.querySelector('.days'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);
            days.textContent = t.days;
            hours.textContent = ('0' + t.hours).slice(-2);
            minutes.textContent = ('0' + t.minutes).slice(-2);
            seconds.textContent = ('0' + t.seconds).slice(-2);

            if(t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
            minutes.textContent = '00';
            seconds.textContent = '00';
            days.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);

    // Modal:

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    let moreInfo = document.querySelector('.info'),
       infoBtn = document.querySelectorAll('.description-btn');

    function showMoreInfo() {
        overlay.style.display = 'block';
        //this.classList.add('more-splash');
    }

    //let shM = showMoreInfo.bind(overlay);

    moreInfo.addEventListener('click', function(event) {
        let target = event.target;

        if(target && target.classList.contains('description-btn')) {
                for(let i = 0; i < infoBtn.length; i++) {
                    if(target == infoBtn[i]) {
                        showMoreInfo();
                        //shM();
                        break;
                    }
                }
        }
    });

       // Forms:

   /* let message = {
        loading: 'Загрузка...',
        success: 'Благодарим! Ожидайте звонок!',
        failure: 'Упсс! Что то пошло не так(('
    };

    let formMod = document.querySelector('.main-form'),
       inputMod = formMod.getElementsByTagName('input'),
       statusMessag = document.createElement('div'),

       formContact = document.getElementById('form'),
       inputContact = formContact.getElementsByTagName('input');

       statusMessag.classList.add('status');

    function sendForm (elem) {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            elem.appendChild(statusMessag);

            let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

            let formData = new FormData(elem);

                request.send(formData);

            request.addEventListener('readystatechange', function() {
                if(request.readyState < 4) {
                    statusMessag.innerHTML = message.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    statusMessag.innerHTML = message.success;
                } else {
                    statusMessag.innerHTML = message.failure;
                }
            });

            for(let i = 0; i < inputMod.length; i++) {
                inputMod[i].value = '';
            }

         }); 
    }

    sendForm(formMod);
    sendForm(formContact);

    let contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('click', function() {
       statusMessag.innerText = '';
   });*/


     // Forms for JSON:

    /* let message = {
        loading: 'Загрузка...',
        success: 'Благодарим! Ожидайте звонок!',
        failure: 'Упсс! Что то пошло не так(('
    };

    let formMod = document.querySelector('.main-form'),
       inputMod = formMod.getElementsByTagName('input'),
       statusMessag = document.createElement('div'),

       formContact = document.getElementById('form'),
       inputContact = formContact.getElementsByTagName('input');

       statusMessag.classList.add('status');

    function sendForm (elem) {
        elem.addEventListener('submit', function(event) {
            event.preventDefault();
            elem.appendChild(statusMessag);

            let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');

            let formData = new FormData(elem);

            let jsonObj = {};  // переводим данные в формат json: 1) в заголовок ставим application/json; charset=utf-8

            formData.forEach(function(key, value) {   // 2) создаем пустой объект и циклом forEach складываем в него данные из формы
                jsonObj[key] = value;
            });

            let json = JSON.stringify(jsonObj);    // 3) создаем переменную в которую кладем переведенные в формат json данные
                                                    //  из нашего JS объекта с данными из формы
                request.send(json);                // 4) кладем эту переменную в метод отправки данных на сервер

            request.addEventListener('readystatechange', function() {
                if(request.readyState < 4) {
                    statusMessag.innerHTML = message.loading;
                } else if(request.readyState === 4 && request.status == 200) {
                    statusMessag.innerHTML = message.success;
                } else {
                    statusMessag.innerHTML = message.failure;
                }
            });

            for(let i = 0; i < inputMod.length; i++) {
                inputMod[i].value = '';
            }

         }); 
    }

    sendForm(formMod);
    sendForm(formContact);

    let contactForm = document.querySelector('.contact-form');

    contactForm.addEventListener('click', function() {
       statusMessag.innerText = '';
   });*/


   // Forms with PROMISE


    let message = {
    loading: 'Загрузка...',
    success: 'Благодарим! Ожидайте звонок!',
    failure: 'Упсс! Что то пошло не так(('
    };

    let formMod = document.querySelector('.main-form'),
    inputMod = formMod.getElementsByTagName('input'),
    statusMessag = document.createElement('div'),

    formContact = document.getElementById('form'),
    inputContact = formContact.getElementsByTagName('input');

    statusMessag.classList.add('status');

    function sendForm (elem) {
         elem.addEventListener('submit', function(event) {
            event.preventDefault();
            elem.appendChild(statusMessag);
            let formData = new FormData(elem);

        function postData(data) {
            return new Promise(function(resolve, reject) {
                let request = new XMLHttpRequest();

                request.open('POST', 'server.php');
                request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

                request.onreadystatechange = function() {
                        if(request.readyState < 4) {
                        resolve();
                    } else if(request.readyState === 4 && request.status == 200) {
                        resolve();
                    } else {
                        reject();
                    }
                };
                request.send(formData);
            });
          }

            function clearInput() {
                for(let i = 0; i < inputMod.length; i++) {
                    inputMod[i].value = '';
                }
            }

            function clearContactForm() {
                let contactForm = document.querySelector('.contact-form');

                contactForm.addEventListener('click', function() {
                statusMessag.innerText = '';
                });
            }

            postData(formData)
                             .then(() => statusMessag.innerText = message.loading)
                             .then(() => statusMessag.innerText = message.success)
                             .catch(() => statusMessag.innerText = message.failure)
                             .then(clearInput)
                             .then(clearContactForm);

        }); 
    }

    sendForm(formMod);
    sendForm(formContact);

    



});


