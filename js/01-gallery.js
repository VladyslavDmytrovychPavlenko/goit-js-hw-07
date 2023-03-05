import { galleryItems } from "./gallery-items.js";
const galleryContainer = document.querySelector(".gallery");
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
  <div class="gallery__item">
    <a class="gallery__link" href="${original.value}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
   </a>
 </div>`;
    })
    .join("");
}

function onGalleryContainerClick(evt) {
  evt.preventDefault();
  const isGalleryImgEl = evt.target.classList.contains("gallery__image");
  if (!isGalleryImgEl) {
    return;
  }

  const source = evt.target.dataset.source;

  const instance = basicLightbox.create(
    `<img src="${source}"width="800" height="600">`
  );
  instance.show();

  const onKeyDown = (evt) => {
    if (evt.code === "Escape") {
      instance.close();
    }
  };

  document.addEventListener("keydown", onKeyDown);

  instance.element().addEventListener("click", (evt) => {
    if (evt.target.nodeName !== "IMG") {
      instance.close();
    }
  });

  instance.element().addEventListener("hidden.simplelightbox", (evt) => {
    document.removeEventListener("keydown", onKeyDown);
  });
}

galleryContainer.addEventListener("click", onGalleryContainerClick);

// імпортується масив об'єктів galleryItems з окремого модуля gallery-items.js
// отримується елемент DOM контейнера галереї за допомогою методу querySelector(), який відповідає класу .gallery.
// createGalleryMarkup() з galleryItems як аргумент, щоб згенерувати HTML-код для відображення зображень в галереї.
// згенерований HTML-код вставляється в контейнер галереї за допомогою методу insertAdjacentHTML(), який додає HTML-рядок до DOM визначеного елемента після останньої дочірньої ноди.
// функція createGalleryMarkup() приймає масив galleryItems в якості параметру та повертає рядок HTML-коду.
// кожен об'єкт galleryItem масиву розпаковується за допомогою деструктуризації об'єкта на окремі поля: preview, original та description.
// на кожній ітерації масиву генерується рядок HTML, який містить зображення з ескейпованими рядками та іншими властивостями, які необхідні для роботи галереї.
// функція join() об'єднує масив рядків HTML у один рядок, щоб вставити його в контейнер галереї.
// функція onGalleryContainerClick() відповідає за реагування на подію кліку на зображенні галереї.
// basicLightbox приймає рядок HTML-коду з більшим зображенням та параметри ширини та висоти.
// вікно з більшим зображенням відображається на екрані за допомогою методу show().
// встановлюється обробник подій кліку на контейнері галереї.
// при кліку буде викликана функція onGalleryContainerClick(), яка буде обробляти подію тільки для зображень галереї з класом gallery__image.
// додали обробник події keydown в функцію onGalleryContainerClick() після відкриття модального вікна за допомогою instance.show().
// у функції onKeyDown() перевіряється, чи була натиснута клавіша Escape, і якщо так, то закривається вікно за допомогою instance.close().
// додали обробник події show.simplelightbox на екземпляр відкриття basicLightbox.
// у цьому обробнику додали обробник події keydown на весь документ, який буде слухати клавіатуру тільки тоді, коли відкрите модальне вікно.
// e обробнику події hidden.simplelightbox видаляємо обробник події keydown з документа, тому що не хочемо слухати клавіатуру, коли вікно закрите.
