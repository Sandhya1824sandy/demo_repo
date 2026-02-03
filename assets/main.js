
const headerHTML = `
  <img src="assets/logo.png" alt="Melted Minds" class="logo">
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="explore.html">Explore</a>
    <a href="top-selling.html">Top Selling</a>
    <a href="offer.html">Offers</a>
    <a href="contact.html">Contact Us</a>
    <a href="profile.html">Profile</a>
    <a href="#" id="logoutBtn" style="display:none">Logout</a>
  </nav>
`;
const footerHTML = `
  <div>&copy; 2026 Melted Minds | Designed with <span style="color:#ff6f91">&#10084;</span> for ice cream lovers</div>
`;
function injectHeaderFooter() {
  const header = document.getElementById('main-header');
  const footer = document.getElementById('main-footer');
  if(header) header.innerHTML = headerHTML;
  if(footer) footer.innerHTML = footerHTML;
  setActiveNav();
}
function setActiveNav() {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if(link.href && window.location.href.includes(link.getAttribute('href'))){
      link.classList.add('active');
    }
  });
}
window.addEventListener('DOMContentLoaded', injectHeaderFooter);


const flavours = [
  { name: 'Classic Vanilla', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq6vx_40wjlXHJmUslSnCEydv3CsKwJY2cdw&s', price: '₹80', offer: '', desc: 'Smooth and creamy classic vanilla.' , rating: 4.5},
  { name: 'Chocolate Fudge', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVorTqB-CCKXDCgHwx_n6O6RG8svsXPWI-Sw&s', price: '₹90', offer: '20% Off!', desc: 'Rich chocolate with fudge swirls.' , rating: 4.8},
  { name: 'Strawberry Swirl', img: 'https://gingersnapsbakingaffairs.com/wp-content/uploads/2023/06/strawberry-swirl-ice-cream-flatlay-1200px.jpg', price: '₹85', offer: '', desc: 'Fresh strawberries with creamy base.' , rating: 4.4},
  { name: 'Mango Tango', img: 'https://www.tradeindia.com/wp-content/uploads/2025/04/Mango-Tango.webp', price: '₹95', offer: 'Buy 1 Get 1', desc: 'Tropical mango bursts in every bite.' , rating: 4.7},
  { name: 'Mint Choco Chip', img: 'https://static.toiimg.com/thumb/53501658.cms?imgsize=122965&width=800&height=800', price: '₹100', offer: '', desc: 'Cool mint with chocolate chips.' , rating: 4.6},
  { name: 'Blueberry Bliss', img: 'https://thumbs.dreamstime.com/b/experience-joy-summer-delightful-bowl-creamy-ice-cream-adorned-juicy-blueberries-refreshing-treat-captures-372478695.jpg', price: '₹110', offer: 'Limited!', desc: 'Bursting blueberries with creamy texture.' , rating: 4.3},
  { name: 'Cookie Dough', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2oILD4KLFWKyEOy5PAMPOhVBay09DCBFEA&s', price: '₹120', offer: '', desc: 'Chunks of cookie dough and vanilla.' , rating: 4.9},
  { name: 'Salted Caramel', img: 'https://static.toiimg.com/thumb/85616830.cms?imgsize=74094&width=800&height=800', price: '₹105', offer: '15% Off!', desc: 'Sweet caramel with a hint of salt.' , rating: 4.5}
];
const topSelling = [
  flavours[1], flavours[3], flavours[5], flavours[6]
];
const offers = [
  flavours[3], flavours[1], flavours[7]
];
function renderCards(sectionId, data) {
  const section = document.getElementById(sectionId);
  if(!section) return;
  section.innerHTML = data.map((f, idx) => `
    <div class="card" data-index="${idx}">
      <img src="${f.img}" alt="${f.name}">
      <h3>${f.name}</h3>
      <div class="price">${f.price}</div>
      ${f.offer ? `<div class="offer">${f.offer}</div>` : ''}
      <button class="view-btn" data-index="${idx}">View</button>
    </div>
  `).join('');

  
  setTimeout(()=>{
    const buttons = section.querySelectorAll('.view-btn');
    buttons.forEach(btn => btn.addEventListener('click', (e) => {
      const i = parseInt(btn.getAttribute('data-index'));
      openCardModal(data[i]);
    }));
    
    section.querySelectorAll('.card img').forEach((img, i) => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', () => openCardModal(data[i]));
    });
  }, 50);
}


function openCardModal(card) {
  let modal = document.getElementById('cardModal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = 'cardModal';
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-inner">
        <button class="modal-close">&times;</button>
        <img class="modal-img" src="" alt="">
        <div class="modal-info">
          <h3 class="modal-title"></h3>
          <p class="modal-desc"></p>
          <div class="modal-meta"><span class="modal-price"></span> <span class="modal-rating"></span></div>
        </div>
      </div>`;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', (e) => { if(e.target === modal) modal.remove(); });
  }
  modal.querySelector('.modal-img').src = card.img;
  modal.querySelector('.modal-img').alt = card.name;
  modal.querySelector('.modal-title').textContent = card.name;
  modal.querySelector('.modal-desc').textContent = card.desc || '';
  modal.querySelector('.modal-price').textContent = card.price;
  modal.querySelector('.modal-rating').textContent = `Rating: ${card.rating || 'N/A'}`;
  modal.classList.add('show');
}
window.addEventListener('DOMContentLoaded', () => {
  if(document.getElementById('flavour-cards')) renderCards('flavour-cards', flavours);
  if(document.getElementById('explore-cards')) renderCards('explore-cards', flavours);
  if(document.getElementById('top-cards')) renderCards('top-cards', topSelling);
  if(document.getElementById('offer-cards')) renderCards('offer-cards', offers);
});
// Contact Form Animation
const contactForm = document.querySelector('.contact-form');
if(contactForm){
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    showPopup('Thank you for contacting us!');
    contactForm.reset();
  });
}

function showPopup(msg) {
  const popup = document.getElementById('popup');
  if(!popup) return;
  popup.textContent = msg;
  popup.classList.add('show');
  setTimeout(() => popup.classList.remove('show'), 2500);
}
window.showPopup = showPopup;