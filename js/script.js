
window.addEventListener('DOMContentLoaded', () => {

    // add tab ========================================================
    
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabParen = document.querySelector('.tabheader__items');

    
    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.remove('show', 'fade');
            item.classList.add('hide');
            
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    } 

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    tabParen.addEventListener('click', (event) => {
        const target = event.target;
        console.log(target);
        
        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    hideTabContent();
    showTabContent();
    
    // add timer clock ========================================================

    const deadLine = '2022-08-30';

    function getTimeRemaining(endTime) {
        const timeZone = new Date().getTimezoneOffset() * 60 * 1000;
        const t = Date.parse(endTime) - Date.parse(new Date()) - timeZone;
        
        if (t <= 0) {
            return {
                'total': 0,
                'days': 0,
                'huors': 0,
                'minutes': 0,
                'secons': 0
            };
        }
                
        const days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor(t / (1000 * 60 * 60) % 24),
              minutes = Math.floor(t / (1000 * 60) % 60),
              secons = Math.floor(t / 1000 % 60);

        return {
            'total': t,
            'days': days,
            'huors': hours,
            'minutes': minutes,
            'secons': secons
        };
    }

    function addZero(num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              huors = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              secons = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

            function updateClock() {
                const t = getTimeRemaining(endTime);

                days.innerHTML = addZero(t.days);
                huors.innerHTML = addZero(t.huors);
                minutes.innerHTML = addZero(t.minutes);
                secons.innerHTML = addZero(t.secons);
                
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }
    }
    setClock('.timer', deadLine);

    /* modal==================================================================*/

    const showModal = document.querySelectorAll('[data-modal]'),
          closeModal = document.querySelector('.modal__close'),
          modal = document.querySelector('.modal');

    
    function showModalWindow () {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    }

    function closeModalWindow () {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
    
    showModal.forEach(show => {
        show.addEventListener('click', showModalWindow);
    });

    closeModal.addEventListener('click', closeModalWindow);

    modal.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModalWindow ();
        }
    });
          
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
            closeModalWindow ();
        }
    });

    const modalTimer = setTimeout(showModalWindow, 5000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            showModalWindow ();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    
    window.addEventListener('scroll', showModalByScroll);
    
}); 

