'use strict';

  // Сохранение сгенерированного html для страницы
  let productsHTML = '';

  // Генерация html кода для каждого обьекта
  products.forEach((product) => {
  // Используем шаблон накопления
    productsHTML += ` 
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars * 10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>`;
});

// Помещаем html код на страницу
document.querySelector('.js-products-grid').innerHTML = productsHTML;

// Добавляем прослушиватель событий ко всем кнопкам
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {

      // Получаем название продукта по атрибуту data
      const productId = button.dataset.productId;

      // Проверяем есть ли товар в карзине
      let machingItem;
      cart.forEach((item) => {
        if (productId === item.productId) {
          machingItem = item;
        }
      });

      // Если товар имееться в козине увеличеваем счетчик
      if (machingItem) {
        machingItem.quantity += 1 
      } else {
      // Добавляем продукт в карзину
        cart.push({
          productId: productId,
          quantity: 1,
        });
      }

      // Подсчет общего количества товара в корзине
      let cartQuantity = 0;
      cart.forEach((item) => {
        cartQuantity += item.quantity;
      });
      // Помещаем html код на страницу
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    });
  });