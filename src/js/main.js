'use strict';

const items = document.querySelectorAll('.catfood-list__item');

for (let it of items) {
    it.addEventListener('mousedown', (evt) => {

        evt.preventDefault();

        const onMouseUp = () => {
            if (it.classList.contains('fuagra') || it.classList.contains('fish') || it.classList.contains('chicken')) {
                const excerpt = it.querySelector('.catfood-list__excerpt');
                excerpt.style.left = '50px';
                excerpt.innerHTML = 'Чего сидишь? Порадуй котэ, <a href="#">купи.</a>';
            }
        };

        if (it.dataset.disabled === 'true') {
            it.style.backgroundImage = 'url("/img/bg-disabled.png")';
            it.style.backgroundRepeat = 'no-repeat';
            it.querySelector('.catfood-list__title').style.color = 'rgba(179, 179, 179, 0.5)';
            it.querySelector('.catfood-list__heading').style.color = 'rgba(179, 179, 179, 0.5)';
            it.querySelector('.catfood-list__description').style.color = 'rgba(179, 179, 179, 0.5)';
            it.querySelector('.features-list').style.color = 'rgba(179, 179, 179, 0.5)';
            it.querySelector('.catfood-list__innerwrapper').style.backgroundColor = '#b3b3b3';
            it.querySelector('.catfood-list__excerpt').style.color = '#ffff66';

            if (it.classList.contains('chicken')) {
                it.querySelector('.catfood-list__excerpt').textContent = 'Печалька, с курой закончился';
            } else if (it.classList.contains('fish')) {
                it.querySelector('.catfood-list__excerpt').textContent = 'Печалька, с рыбой закончился';
            } else if (it.classList.contains('fuagra')) {
                it.querySelector('.catfood-list__excerpt').textContent = 'Печалька, с фуа-гра закончился';
            }
        }

        if (it.classList.contains('chicken') && it.dataset.disabled !== 'true') {
            const excerpt = it.querySelector('.catfood-list__excerpt');
            excerpt.style.left = '40px'
            excerpt.textContent = 'Филе из цыплят с трюфелями в бульоне';

            it.addEventListener('mouseup', onMouseUp);
        } else if (it.classList.contains('fish') && it.dataset.disabled !== 'true') {
            const excerpt = it.querySelector('.catfood-list__excerpt');
            excerpt.style.width = '320px'
            excerpt.style.left = '5px'
            excerpt.textContent = 'Головы щучьи с чесноком да свежайшая семгушка';

            it.addEventListener('mouseup', onMouseUp);
        } else if (it.classList.contains('fuagra') && it.dataset.disabled !== 'true') {
            const excerpt = it.querySelector('.catfood-list__excerpt');
            excerpt.style.width = '234px';
            excerpt.textContent = 'Печень утки разварная с артишоками';

            it.addEventListener('mouseup', onMouseUp);
        }


    })
}
