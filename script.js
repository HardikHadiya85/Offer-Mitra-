const offers = [
  {name:"Smart Watch",emoji:"⌚",price:999,old:1699,discount:"-40%",rating:"4.5",reviews:"(1.2k)"},
  {name:"Wireless Earbuds",emoji:"🎧",price:699,old:1099,discount:"-35%",rating:"4.6",reviews:"(856)"},
  {name:"Backpack",emoji:"🎒",price:499,old:999,discount:"-50%",rating:"4.4",reviews:"(642)"},
  {name:"Perfume",emoji:"🧴",price:899,old:1209,discount:"-30%",rating:"4.3",reviews:"(521)"}
];
const trending = [
  {name:"Men's T-Shirt",emoji:"👕",price:599,old:899,rating:"4.5",reviews:"(1.1k)"},
  {name:"Bluetooth Speaker",emoji:"🔊",price:1299,old:1099,rating:"4.4",reviews:"(823)"},
  {name:"Running Shoes",emoji:"👟",price:1999,old:2099,rating:"4.6",reviews:"(1.5k)"},
  {name:"Skincare Kit",emoji:"🧴",price:799,old:1299,rating:"4.3",reviews:"(764)"},
  {name:"Laptop Bag",emoji:"🎒",price:1199,old:1699,rating:"4.5",reviews:"(932)"},
  {name:"Kitchen Set",emoji:"🍳",price:1499,old:2499,rating:"4.2",reviews:"(521)"}
];
const money = n => "₹" + n.toLocaleString("en-IN");
function productCard(p, isOffer=false) {
  return `<article class="product-card" data-name="${p.name.toLowerCase()}">
    <div class="product-image">${isOffer?`<span class="discount">${p.discount}</span>`:""}<button class="wish" aria-label="Add ${p.name} to wishlist" aria-pressed="false">♡</button><span class="product-emoji" aria-hidden="true">${p.emoji}</span></div>
    <div class="product-info"><div class="product-name">${p.name}</div><div class="rating"><span>★</span> ${p.rating} <small>${p.reviews}</small></div>
    <div class="price-row"><span class="price">${money(p.price)}</span><span class="old-price">${money(p.old)}</span></div>
    <button class="add-cart" data-product="${p.name}">Add to Cart</button></div></article>`;
}
document.querySelector("#offersGrid").innerHTML = offers.map(p=>productCard(p,true)).join("");
document.querySelector("#trendingGrid").innerHTML = trending.map(p=>productCard(p)).join("");
let cart = 0;
let toastTimer;
function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>toast.classList.remove("show"),2400);
}
document.addEventListener("click", e=>{
  const add = e.target.closest(".add-cart");
  if(add) { cart++; document.querySelector("#cartCount").textContent=cart; showToast(`${add.dataset.product} added to your cart`); }
  const wish = e.target.closest(".wish");
  if(wish) { const liked=wish.getAttribute("aria-pressed")!=="true"; wish.setAttribute("aria-pressed",String(liked)); wish.classList.toggle("liked",liked); wish.textContent=liked?"♥":"♡"; showToast(liked?"Added to wishlist":"Removed from wishlist"); }
});
const searchForm=document.querySelector("#searchForm");
searchForm.addEventListener("submit",e=>{
  e.preventDefault();
  const query=document.querySelector("#searchInput").value.trim().toLowerCase();
  const cards=[...document.querySelectorAll(".product-card")];
  let count=0;
  cards.forEach(card=>{const match=!query||card.dataset.name.includes(query);card.hidden=!match;if(match)count++;});
  showToast(query?(count?`${count} product${count===1?"":"s"} found`:"No matching products found"):"Showing all products");
  if(query) document.querySelector("#offers").scrollIntoView({behavior:"smooth",block:"start"});
});
document.querySelector("#searchInput").addEventListener("input",e=>{
  if(!e.target.value.trim()) document.querySelectorAll(".product-card").forEach(card=>card.hidden=false);
});
document.querySelector("#newsletterForm").addEventListener("submit",e=>{
  e.preventDefault(); showToast("Thanks for subscribing to Offer Mitra!"); e.target.reset();
});
const menuToggle=document.querySelector(".menu-toggle");
menuToggle.addEventListener("click",()=>{
  const nav=document.querySelector(".main-nav");
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
});
document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>{
  document.querySelector(".main-nav").classList.remove("open");
  menuToggle.setAttribute("aria-expanded","false");
}));
document.querySelectorAll(".hero-dots button").forEach((dot,i)=>dot.addEventListener("click",()=>{
  document.querySelectorAll(".hero-dots button").forEach(d=>d.classList.remove("selected"));
  dot.classList.add("selected");
  showToast(i===0?"Featured deals":i===1?"New arrivals":"Popular picks");
}));
document.querySelector(".login-button").addEventListener("click",()=>showToast("Login feature can be connected to your account system."));
document.querySelector(".cart-icon").addEventListener("click",()=>showToast(`You have ${cart} item${cart===1?"":"s"} in your cart.`));
