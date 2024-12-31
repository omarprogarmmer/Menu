const foods = [
  { id: 1, name: 'بيتزا', description: 'بيتزا ساخنة طازجة', price: 20, type: 'الوجبات السريعة', rating: 4.5, image: 'image/و/d.jpg', types: ['مارجريتا', 'بيبروني', 'خضار'] },
  { id: 2, name: 'شاورما دجاج', description: 'شاورما دجاج لذيذة', price: 15, type: 'الوجبات السريعة', rating: 4.2, image: 'image/ش/034acd57f316c01a62167cd083a573fd.jpg', types: ['دجاج مشوي', 'دجاج مكسيكي', 'دجاج طازج'] },
  { id: 4, name: 'سلطة', description: 'سلطة طازجة', price: 10, type: 'السلطات', rating: 4.1, image: 'image/س/6d0c0c47a391fd8d8087c072132a31b7.jpg', types: ['سلطة خضراء', 'سلطة فواكه', 'سلطة سيزر'] },
  { id: 5, name: 'كنافة', description: 'معجنات ساخنة', price: 25, type: 'الحلويات', rating: 4.6, image: 'image/ح/1c575cb03ecd78ad86a1b7d46cd3ea44.jpg', types: ['كنافة بالقشطة', 'كنافة بالجبنة', 'كنافة بالمكسرات'] },
  { id: 6, name: 'زنود', description: 'كيك شوكولاتة لذيذ', price: 18, type: 'الحلويات', rating: 4.4, image: 'image/ح/b2ff39b78d144eaf62f8f48cd7192b48.jpg', types: ['زنود بالعسل', 'زنود بالشوكولاتة', 'زنود بالمكسرات'] },
  { id: 7, name: 'سمك مقلي', description: 'سمك مقلي طازج', price: 35, type: 'الوجبات البحرية', rating: 4.9, image: 'image/ب/ثص.jpg', types: ['سمك مقلي مع أرز', 'سمك مقلي مع بطاطا', 'سمك مقلي مع صلصة'] },
  { id: 8, name: 'منسف', description: 'دجاج مشوي لذيذ', price: 20, type: 'الوجبات الشرقية', rating: 4.3, image: 'image/ش/833de302b67412799090e20de805c4e1.jpg', types: ['منسف لحم', 'منسف دجاج'] }
];

let cart = [];

// دالة لعرض الأطعمة في القائمة
function displayFoods(foods) {
  const foodList = document.getElementById('food-list');
  foodList.innerHTML = ''; // إعادة تعيين المحتوى

  foods.forEach(food => {
    const foodItem = document.createElement('div');
    foodItem.classList.add('food-item');
    foodItem.innerHTML = `
      <img src="${food.image}" alt="${food.name}" />
      <h3>${food.name}</h3>
      <p>${food.description}</p>
      <p>السعر: ${food.price} ريال</p>
      <p>التقييم: ${food.rating} ⭐</p>
      <button onclick="addToCart(${food.id})">إضافة إلى السلة</button>
      <button onclick="showTypes(${food.id})">أنواع</button>
      <div id="types-${food.id}" class="types-container" style="display: none;"></div>
    `;
    foodList.appendChild(foodItem);
  });
}

// عرض الأنواع مع إمكانية الإضافة للسلة
function showTypes(foodId) {
  const typesContainer = document.getElementById(`types-${foodId}`);
  const food = foods.find(item => item.id === foodId);

  if (typesContainer.style.display === "none") {
    typesContainer.style.display = "block";
    typesContainer.innerHTML = `
      <p><strong>الأنواع المتاحة:</strong></p>
      <ul>
        ${food.types
          .map(
            (type) =>
              `<li>
                ${type} - وصف: ${food.description} - تقييم: ${food.rating} ⭐
                <button onclick="addTypeToCart(${foodId}, '${type}')">إضافة إلى السلة</button>
              </li>`
          )
          .join("")}
      </ul>
    `;
  } else {
    typesContainer.style.display = "none";
  }
}

// دالة لإضافة الطعام إلى السلة
function addToCart(foodId) {
  const food = foods.find(item => item.id === foodId);
  const existingItem = cart.find(item => item.name === food.name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: food.name, price: food.price, quantity: 1 });
  }
  updateCart();
}

// دالة لإضافة نوع محدد إلى السلة
function addTypeToCart(foodId, type) {
  const food = foods.find(item => item.id === foodId);
  const itemName = `${food.name} (${type})`;
  const existingItem = cart.find(item => item.name === itemName);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name: itemName, price: food.price, quantity: 1 });
  }
  updateCart();
}

// دالة لتحديث عرض السلة
function updateCart() {
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML = ''; // إعادة تعيين محتوى السلة

  cart.forEach((food, index) => {
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${food.name} - ${food.price} ريال × ${food.quantity}</span>
      <button onclick="removeFromCart(${index})">إزالة</button>
    `;
    cartList.appendChild(cartItem);
  });

  // حساب المجموع
  const totalPrice = cart.reduce((acc, food) => acc + food.price * food.quantity, 0);
  document.getElementById('total-price').textContent = `المجموع: ${totalPrice} ريال`;
}

// دالة لإزالة الطعام من السلة (تقليل الكمية أو الإزالة بالكامل)
function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
  } else {
    cart.splice(index, 1);
  }
  updateCart();
}

// دالة لتصفية الأطعمة حسب النوع
function filterFoods(type) {
  const filteredFoods = type ? foods.filter(food => food.type === type) : foods;
  displayFoods(filteredFoods);
}

// عرض الأطعمة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  displayFoods(foods);
});
