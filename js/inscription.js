

const promoButtons = document.querySelectorAll('.promo-btn');
const modeButtons = document.querySelectorAll('.mode-btn');


const sectionPromo = document.getElementById('section-promo');
const sectionMode = document.getElementById('section-mode');
const sectionSolo = document.getElementById('section-solo');


const promoLabel = document.getElementById('promo-label');


let selectedPromo = null;


promoButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    selectedPromo = btn.dataset.promo;
    localStorage.setItem('promotion', selectedPromo);


    sectionMode.classList.remove('hidden');
  });
});




modeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.mode;
    localStorage.setItem('participation_mode', mode);


    if (mode === 'solo') {
      promoLabel.textContent = selectedPromo === 'BTS1' ? 'BTS 1' : 'BTS 2';
      sectionSolo.classList.remove('hidden');
      sectionPromo.classList.add('hidden');
      sectionMode.classList.add('hidden');
    } else if (mode === 'team_member') {
      window.location.href = '/equipes';
    } else if (mode === 'captain') {
      window.location.href = '/creer-equipe';
    }
  });
});


document.getElementById('student-form').addEventListener('submit', (e) => {
  e.preventDefault();


  const formData = new FormData(e.target);


  const participant = {
    id: crypto.randomUUID(),
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    promotion: selectedPromo,
    class_name: formData.get('class_name') || null,
    participation_mode: 'solo',
    team_id: null,
    contact: formData.get('contact') || null,
    skill_level: formData.get('skill_level') || null,
    status: 'pre_registered',
    privacy_consent: formData.get('privacy_consent') === 'on',
    created_at: new Date().toISOString()
  };


  const participants = JSON.parse(localStorage.getItem('participants') || '[]');
  participants.push(participant);
  localStorage.setItem('participants', JSON.stringify(participants));


  localStorage.setItem('last_participant', JSON.stringify(participant));


  window.location.href = '/confirmation';
});


