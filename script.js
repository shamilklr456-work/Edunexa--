// Data blueprints matching existing implementation state
const tierBenefits = {
  Silver: [
    "Access to basic syllabus files",
    "Max 3 downloaded mock papers",
    "Standard platform access",
    "Community board reading view"
  ],
  Gold: [
    "Complete structured crash courses",
    "Unlimited mock exams & keys",
    "Ad-free interface downloads",
    "Direct expert chat assistance"
  ],
  Platinum: [
    "All Gold tier perks included",
    "1-on-1 personal mentorship room",
    "Customizable progress trackers",
    "Early access entrance modules"
  ]
};

let selectedPlan = 'Gold'; // default initial state
let userSessionPoints = 0;
const referralLimits = { maxInvitesPerDay: 3, pointsPerFriend: 2, redemptionTarget: 450 };

// Initialize platform views
document.addEventListener("DOMContentLoaded", () => {
  // Prime data rendering
  selectPlanTier(selectedPlan);
  
  // Test modal trigger automatically or on button actions
  openPremiumModal();
});

function openPremiumModal() {
  const modal = document.getElementById('premium-modal');
  if(modal) modal.classList.remove('hidden');
}

function closePremiumModal() {
  const modal = document.getElementById('premium-modal');
  if(modal) modal.classList.add('hidden');
}

function selectPlanTier(tierName) {
  if (!tierBenefits[tierName]) return;
  selectedPlan = tierName;
  
  // Dynamic Text Updates
  document.getElementById('display-selected-plan-name').innerText = tierName;
  
  // Render Dynamic Benefits Checkmarks
  const container = document.getElementById('dynamic-benefits-container');
  container.innerHTML = '';
  
  tierBenefits[tierName].forEach(benefit => {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex items-center space-x-2';
    wrapper.innerHTML = `
      <i class="fa-solid fa-circle-check text-indigo-500 text-[10px]"></i>
      <span>${benefit}</span>
    `;
    container.appendChild(wrapper);
  });

  // Update Active Button Classes
  ['Silver', 'Gold', 'Platinum'].forEach(tier => {
    const btn = document.getElementById(`btn-tier-${tier}`);
    if (!btn) return;
    if (tier === tierName) {
      btn.className = "p-3 rounded-xl border text-center transition-all bg-indigo-600 border-indigo-400 text-white font-black shadow-md";
    } else {
      btn.className = "p-3 rounded-xl border text-center transition-all bg-slate-50 border-slate-200 text-slate-600 hover:border-indigo-400";
    }
  });
}

function handleLeadFormSubmit(event) {
  event.preventDefault();
  
  // Data extraction matching lead properties
  const leadData = {
    name: document.getElementById('lead-name').value,
    email: document.getElementById('lead-email').value,
    phone: document.getElementById('lead-phone').value,
    whatsapp: document.getElementById('lead-whatsapp').value,
    batchClass: document.getElementById('lead-class').value,
    chosenPlan: selectedPlan
  };

  showToast(`Processing secure gateway details for ${leadData.name}...`);

  // Simple view transitions
  setTimeout(() => {
    document.getElementById('modal-step-lead').classList.add('hidden');
    document.getElementById('modal-step-success').classList.remove('hidden');
  }, 900);
}

function redirectToWhatsAppOperator() {
  const name = document.getElementById('lead-name').value || "Student";
  const whatsappMsg = `Hi Operator, I just signed up for the EduNexa Premium ${selectedPlan} Plan. Please activate my account for ${name}.`;
  const formattedUrl = `https://wa.me/919000000000?text=${encodeURIComponent(whatsappMsg)}`;
  window.open(formattedUrl, '_blank');
}

function showToast(message) {
  const toastAlert = document.getElementById('toast-alert');
  const toastMessage = document.getElementById('toast-message');
  if(toastAlert && toastMessage) {
    toastMessage.innerText = message;
    toastAlert.classList.remove('hidden');
    setTimeout(() => {
      toastAlert.classList.add('hidden');
    }, 4000);
  }
}
