// ===== CHARACTER DATA =====
const characters = {
  itadori: {
    name: "Itadori Yuji",
    desc: "Itadori Yuji adalah protagonis, pemuda kuat yang berjuang melawan kutukan. Penuh semangat, peduli pada teman, dan berani mengambil resiko demi orang lain. Setelah menelan jari Sukuna, ia menjadi wadah kutukan paling berbahaya namun tetap mempertahankan kemanusiaannya.",
    images: ["itadori1.jpg", "itadori2.jpg", "itadori3.jpg"],
    tags: ["Protagonist", "Human", "Courageous"]
  },
  gojo: {
    name: "Gojo Satoru",
    desc: "Gojo Satoru, pengajar kuat dengan teknik berbahaya. Tenang, percaya diri, dan menjadi mentor bagi generasi baru. Dengan Six Eyes dan Limitless, ia adalah penyihir jujutsu terkuat yang pernah ada.",
    images: ["gojo1.jpg", "gojo2.jpg", "gojo3.jpg"],
    tags: ["Teacher", "Strongest", "Mysterious"]
  },
  nobara: {
    name: "Nobara Kugisaki",
    desc: "Nobara adalah penyihir berani dengan gaya bertarung yang unik menggunakan palu dan paku. Tegas, percaya diri, dan berpegang pada prinsip. Ia tidak pernah ragu untuk menjadi dirinya sendiri.",
    images: ["nobara1.jpg", "nobara2.jpg", "nobara3.jpg"],
    tags: ["Ally", "Fierce", "Loyal"]
  },
  sukuna: {
    name: "Ryomen Sukuna",
    desc: "Sukuna, kutukan kuat yang menghuni tubuh tertentu. Antagonis yang menakutkan dengan aura dan kekuatan besar. Dikenal sebagai Raja Kutukan dengan kekuatan yang melampaui imajinasi.",
    images: ["sukuna1.jpg", "sukuna2.jpg", "sukuna3.jpg"],
    tags: ["Antagonist", "Cursed", "Powerful"]
  },
  fushiguro: {
    name: "Megumi Fushiguro",
    desc: "Fushiguro adalah penyihir jujutsu dengan teknik Ten Shadows yang memungkinkannya memanggil shikigami. Meski terlihat dingin, ia sangat peduli pada teman dan memiliki rasa keadilan yang kuat.",
    images: ["fushiguro1.jpg", "fushiguro2.jpg", "fushiguro3.jpg"],
    tags: ["Ally", "Tactical", "Reserved"]
  }
};

// ===== CHARACTER CLICK HANDLER =====
document.addEventListener('DOMContentLoaded', function() {
  
  // Handle character card clicks
  document.querySelectorAll('.char-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-char');
      const data = characters[id];
      if (!data) return;

      // Update character name
      document.getElementById('charName').textContent = data.name;
      
      // Update character description
      document.getElementById('charDesc').textContent = data.desc;

      // Update tags
      const tagWrap = document.getElementById('charTags');
      tagWrap.innerHTML = '';
      data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'badge bg-secondary me-2';
        span.textContent = t;
        tagWrap.appendChild(span);
      });

      // Update carousel images
      const carouselInner = document.querySelector('#charCarousel .carousel-inner');
      carouselInner.innerHTML = '';
      data.images.forEach((src, i) => {
        const div = document.createElement('div');
        div.className = 'carousel-item' + (i === 0 ? ' active' : '');
        div.innerHTML = `<img src="${src}" class="d-block w-100" alt="${data.name}">`;
        carouselInner.appendChild(div);
      });

      // Smooth scroll to character section
      document.querySelector('#character').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ===== FORM VALIDATION =====
  const contactForm = document.getElementById('contactForm');
  
  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => el.classList.remove('show'));
      document.getElementById('successMessage').classList.remove('show');
      
      // Get input values
      const nama = document.getElementById('nama').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value;
      
      let isValid = true;
      
      // Validasi Nama
      if(nama === '') {
        showError('namaError', 'Nama harus diisi!');
        isValid = false;
      }
      
      // Validasi Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(email === '') {
        showError('emailError', 'Email harus diisi!');
        isValid = false;
      } else if(!emailRegex.test(email)) {
        showError('emailError', 'Format email tidak valid! (contoh: nama@domain.com)');
        isValid = false;
      }
      
      // Validasi Password
      if(password === '') {
        showError('passwordError', 'Password harus diisi!');
        isValid = false;
      } else if(password.length < 8) {
        showError('passwordError', 'Password minimal 8 karakter!');
        isValid = false;
      }
      
      // Jika semua valid
      if(isValid) {
        showSuccess(nama);
        contactForm.reset();
      }
    });
  }

  // ===== HELPER FUNCTIONS =====
  function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
  }

  function showSuccess(nama) {
    const successElement = document.getElementById('successMessage');
    successElement.textContent = '✓ Selamat datang di komunitas JJK, ' + nama + '!';
    successElement.classList.add('show');
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      successElement.classList.remove('show');
    }, 3000);
  }

  // ===== BONUS: Alert on Watch/Read Button Click =====
  const watchBtn = document.querySelector('a[href*="crunchyroll"]');
  const readBtn = document.querySelector('a[href*="viz.com"]');

  if(watchBtn) {
    watchBtn.addEventListener('click', function(e) {
      alert('🎬 Anda akan diarahkan ke Crunchyroll untuk menonton Jujutsu Kaisen!');
    });
  }

  if(readBtn) {
    readBtn.addEventListener('click', function(e) {
      alert('📖 Anda akan diarahkan ke Viz Media untuk membaca manga Jujutsu Kaisen!');
    });
  }

});