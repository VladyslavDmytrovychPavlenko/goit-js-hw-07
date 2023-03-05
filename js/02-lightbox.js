import { galleryItems } from "./gallery-items.js";
console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");

const createGalleryMarkup = galleryItems
  .map(({ preview, original, description }) => {
    return `
    <a class="gallery__item" href="${original}">
    <img class="gallery__image" src="${preview}" alt="${description}"/>
  </a>`;
  })
  .join("");

galleryContainer.insertAdjacentHTML("beforeend", createGalleryMarkup);

new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionsData: "alt",
});

// спочатку імпортуємо масив зображень з gallery-items.js та виводимо його в консоль з допомогою console.log(galleryItems).
// потім вибираємо контейнер галереї за допомогою const galleryContainer = document.querySelector(".gallery").
// створюємо HTML-код для кожного зображення в галереї з використанням методу map().
// для кожного елементу масиву зображень (galleryItems) отримуємо preview, original та description та використовуємо їх для створення HTML-коду для кожного елемента галереї.
// після того, як створили HTML-код для кожного елемента галереї, об'єднуємо його в один рядок за допомогою методу join("").
// вставляємо HTML-код для всієї галереї до кінця контейнера галереї, використовуючи метод insertAdjacentHTML() з параметром "beforeend".
// ініціалізуємо SimpleLightbox, який буде відкривати зображення в повноекранному режимі, коли користувач клікне на зображення в галереї.
// передаємо ".gallery a" в якості селектора, який означає всі посилання з класом gallery__item в контейнері .gallery.
// передаємо параметр captionDelay, щоб встановити затримку підпису зображення, та captionsData, щоб використовувати значення атрибуту alt зображення як підпис.
