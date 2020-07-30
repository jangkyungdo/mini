const loadItems = () => {
  return fetch("data/data.json")
    .then((res) => res.json())
    .then((res) => res.items);
};

// Items 화면에 보이기
const displayItems = (items) => {
  const constainer = document.querySelector(".items");
  constainer.innerHTML = items.map((item) => createHTMLString(item)).join("");
};

// list 생성
const createHTMLString = (item) => {
  return `
    <li class="item">  
    <img src="${item.image}" alt="${item.type}" class="item__thumbnail" />
    <span class="item__description"> ${item.gender}, ${item.size}</span>
    </li>
    `;
};

// 이벤트 핸들링
const setEventListeners = (items) => {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");

  logo.addEventListener("click", () => displayItems(items));
  buttons.addEventListener("click", (e) => onButtonClick(e, items));
};

// 필터링
const onButtonClick = (e, items) => {
  const dataset = e.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key == null || value == null) {
    return;
  }
  displayItems(items.filter((item) => item[key] === value));
  // key = data-key값인 type이고 item[key]는 item객체에 type속서인 tshirts이런거
};

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
