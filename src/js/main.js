import {nameProducts} from "/src/js/data"

const catFoodList = document.querySelector(".catfood-list");

const createCatFoodItemMarkup = (productsList) => {

  const createCatFoodItemTemplate = productsList.map((it) => {
    return (
      `<li class="catfood-list__item ${it.id}" data-disabled=${it.disabled}>
         <p class="catfood-list__item-title">${it.name}</p>
         <h2 class="catfood-list__item-heading">${it.title}</h2>
         <p class="catfood-list__item-description">${it.description}</p>
         <ul class="features-list">
           <li class="features-list__item"><b>${it.number}</b> ${it.unit}</li>
           <li class="features-list__item">${it.bonus_number} ${it.bonus_description}</li>
         </ul>
         <div class="catfood-list__innerwrapper">
           <p>${it.weight}</p>
           <p>${it.weight_unit}</p>
         </div>
         <p class="catfood-list__item-slogan">Чего сидишь? Порадуй котэ,<a href="#">купи</a></p>
       </li>`
      )
  }).join(`\n`);

  return createCatFoodItemTemplate;
};

catFoodList.insertAdjacentHTML('afterbegin', createCatFoodItemMarkup(nameProducts));

catFoodList.addEventListener("mousedown", (evt) => {
  evt.preventDefault();

  const target = evt.target.closest(".catfood-list__item");

  const onMouseUp = () => {
    if (target.classList.contains('fuagra') || target.classList.contains('fish') || target.classList.contains('chicken')) {
        const slogan = target.querySelector('.catfood-list__item-slogan');
        slogan.style.left = '50px';
        slogan.innerHTML = 'Чего сидишь? Порадуй котэ, <a href="#">купи.</a>';
    }

    target.removeEventListener("mouseup", onMouseUp);
  };

  if (target.classList.contains("chicken") && target.dataset.disabled !== "true") {
   const slogan = target.querySelector(".catfood-list__item-slogan");
   slogan.style.left = "40px";
   slogan.textContent = "Филе из цыплят с трюфелями в бульоне";

   target.addEventListener("mouseup", onMouseUp);
  };

  if (target.classList.contains("fish") && target.dataset.disabled !== "true") {
    const slogan = target.querySelector(".catfood-list__item-slogan");
    slogan.style.width = "320px";
    slogan.style.left = "5px";
    slogan.textContent = "Головы щучьи с чесноком да свежайшая семгушка";

    target.addEventListener("mouseup", onMouseUp);
  };

  if (target.classList.contains("fuagra") && target.dataset.disabled !== "true") {
    const slogan = target.querySelector(".catfood-list__item-slogan");
    slogan.style.width = "234px";
    slogan.textContent = "Печень утки разварная с артишоками";

    target.addEventListener("mouseup", onMouseUp);
  };

  if (target.dataset.disabled === 'true') {
    target.style.backgroundImage = 'url("/img/bg-disabled.png")';
    target.style.backgroundRepeat = 'no-repeat';
    target.querySelector('.catfood-list__item-title').style.color = 'rgba(179, 179, 179, 0.5)';
    target.querySelector('.catfood-list__item-heading').style.color = 'rgba(179, 179, 179, 0.5)';
    target.querySelector('.catfood-list__item-description').style.color = 'rgba(179, 179, 179, 0.5)';
    target.querySelector('.features-list').style.color = 'rgba(179, 179, 179, 0.5)';
    target.querySelector('.catfood-list__innerwrapper').style.backgroundColor = '#b3b3b3';
    target.querySelector('.catfood-list__item-slogan').style.color = '#ffff66';

    const idToText = new Map([
      ["chicken", "Печалька, с курой закончился"],
      ["fish", "Печалька, с рыбой закончился"],
      ["fuagra", "Печалька, с фуа-гра закончился"],
    ]);

    for (let [key, value] of idToText) {
      if (target.classList.contains(key)) {
        target.querySelector('.catfood-list__item-slogan').textContent = value;
      }
    }

  }
});
