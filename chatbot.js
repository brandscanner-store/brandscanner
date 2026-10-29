(function() {
  var style = document.createElement('style');
  style.innerHTML = `
    /* Techno AI Toggle Button */
    .bs-chat-toggle { 
      position: fixed; bottom: 85px; right: 20px; width: 64px; height: 64px; 
      border-radius: 50%; background: #0a1f44; color: #b3ff00; 
      display: flex; align-items: center; justify-content: center; 
      box-shadow: 0 4px 20px rgba(10,31,68,.4); z-index: 999; 
      cursor: pointer; transition: transform 0.2s; border: 2px solid #b3ff00; 
      overflow: hidden;
    }
    .bs-chat-toggle svg { width: 42px; height: 42px; }
    .bs-chat-toggle:active { transform: scale(0.92); }
    
    /* Waving Hand Animation */
    .waving-hand {
      transform-origin: 17px 17px;
      animation: wave-hand 0.8s infinite ease-in-out;
    }
    @keyframes wave-hand {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-25deg); }
      75% { transform: rotate(20deg); }
    }

    /* 30-Second Slide Animation */
    .bs-chat-toggle.wave-long { animation: wave-long-anim 3.5s ease-in-out forwards; }
    @keyframes wave-long-anim {
      0% { transform: translateX(80px); opacity: 0; }
      15% { transform: translateX(0); opacity: 1; }
      100% { transform: translateX(0) scale(1); }
    }

    /* Tooltip */
    .bs-chat-tooltip {
      position: fixed; bottom: 100px; right: 95px; background: #fff; 
      color: #0a1f44; padding: 8px 14px; border-radius: 12px; 
      font-size: 13px; font-weight: 700; box-shadow: 0 4px 15px rgba(0,0,0,.1); 
      z-index: 999; border: 1px solid #e5e5e0; opacity: 0; 
      transform: translateX(10px); transition: all 0.3s; pointer-events: none;
      font-family: 'Inter', system-ui, sans-serif;
    }
    .bs-chat-tooltip.show { opacity: 1; transform: translateX(0); }
    .bs-chat-tooltip::after {
      content: ''; position: absolute; right: -6px; top: 50%; 
      transform: translateY(-50%); border-width: 6px 0 6px 6px; 
      border-style: solid; border-color: transparent transparent transparent #fff;
    }

    /* Chat Window */
    .bs-chat-window { 
      position: fixed; bottom: 160px; right: 20px; width: 350px; 
      max-width: calc(100vw - 40px); height: 520px; max-height: calc(100vh - 180px); 
      background: #faf9f6; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.15); 
      z-index: 1000; display: none; flex-direction: column; overflow: hidden; 
      border: 1px solid #e5e5e0; font-family: 'Inter', system-ui, sans-serif; 
    }
    .bs-chat-window.open { display: flex; animation: slideUp 0.3s ease; }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    .bs-chat-header { background: #0a1f44; color: #fff; padding: 16px; display: flex; justify-content: space-between; align-items: center; }
    .bs-chat-header h3 { margin: 0; font-size: 16px; font-weight: 700; color: #b3ff00; display: flex; align-items: center; gap: 8px; }
    .bs-chat-close { background: none; border: none; color: #fff; font-size: 20px; cursor: pointer; padding: 0; }

    /* Chat Body & Messages */
    .bs-chat-body { flex: 1; padding: 16px; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; background: #faf9f6; scroll-behavior: smooth; }
    .bs-msg { padding: 12px 16px; border-radius: 16px; font-size: 13.5px; line-height: 1.5; max-width: 85%; word-wrap: break-word; position: relative; }
    
    .bs-msg-bot { background: #fff; color: #0a1f44; border: 1px solid #e5e5e0; border-bottom-left-radius: 4px; align-self: flex-start; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
    .bs-msg-user { background: #0a1f44; color: #fff; border-bottom-right-radius: 4px; align-self: flex-end; }

    /* Typing Indicator */
    .typing-indicator { display: flex; gap: 4px; padding: 14px 18px; align-items: center; }
    .typing-indicator span { width: 6px; height: 6px; background-color: #6b7280; border-radius: 50%; display: inline-block; animation: typing 1.4s infinite ease-in-out both; }
    .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
    .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes typing { 0%, 80%, 100% { transform: scale(0); } 40% { transform: scale(1); } }

    /* Buttons */
    .bs-btn-group { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; width: 100%; }
    .bs-btn { background: #fff; border: 1.5px solid #0a1f44; color: #0a1f44; padding: 12px 14px; border-radius: 10px; font-size: 13px; font-weight: 600; text-align: left; cursor: pointer; transition: all 0.2s; display: flex; justify-content: space-between; align-items: center; }
    .bs-btn:hover { background: #f0f4ff; }
    .bs-btn::after { content: '›'; font-size: 18px; color: #b3ff00; -webkit-text-stroke: 1px #0a1f44; }

    /* Search Input */
    .bs-search-wrap { padding: 12px 16px; background: #fff; border-top: 1px solid #e5e5e0; display: flex; gap: 8px; }
    .bs-search-wrap input { flex: 1; padding: 10px 14px; border: 1.5px solid #e5e5e0; border-radius: 20px; font-size: 13px; outline: none; transition: border-color 0.2s; }
    .bs-search-wrap input:focus { border-color: #0a1f44; }
    .bs-search-wrap button { background: #0a1f44; color: #b3ff00; border: none; border-radius: 50%; width: 38px; height: 38px; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; }
  `;
  document.head.appendChild(style);

  // Full Robot with Waving Hand
  var robotSVG = `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="12" y1="2" x2="12" y2="5" stroke="#b3ff00" stroke-width="2" stroke-linecap="round"/>
    <circle cx="12" cy="2" r="1.5" fill="#b3ff00"/>
    <rect x="4" y="5" width="16" height="11" rx="3" stroke="#b3ff00" stroke-width="2"/>
    <circle cx="8.5" cy="10" r="1.5" fill="#b3ff00"/>
    <circle cx="15.5" cy="10" r="1.5" fill="#b3ff00"/>
    <path d="M9 13.5H15" stroke="#b3ff00" stroke-width="2" stroke-linecap="round"/>
    <rect x="7" y="16" width="10" height="7" rx="2" stroke="#b3ff00" stroke-width="2"/>
    <g class="waving-hand">
      <line x1="17" y1="18" x2="21" y2="15" stroke="#b3ff00" stroke-width="2" stroke-linecap="round"/>
      <circle cx="22" cy="14.5" r="1.5" fill="#b3ff00"/>
    </g>
  </svg>`;

  var chatHTML = `
    <div class="bs-chat-tooltip" id="bsChatTooltip">Ask Techno AI! 👋</div>
    <div class="bs-chat-toggle" id="bsChatToggle">${robotSVG}</div>
    <div class="bs-chat-window" id="bsChatWindow">
      <div class="bs-chat-header">
        <h3>⚡ Techno AI</h3>
        <button class="bs-chat-close" id="bsChatClose">✕</button>
      </div>
      <div class="bs-chat-body" id="bsChatBody"></div>
      <div class="bs-search-wrap">
        <input type="text" id="bsChatSearchInput" placeholder="Type a keyword (e.g., box)...">
        <button id="bsChatSearchBtn">🔍</button>
      </div>
    </div>
  `;
  var div = document.createElement('div');
  div.innerHTML = chatHTML;
  document.body.appendChild(div);

  var toggle = document.getElementById('bsChatToggle');
  var window_ = document.getElementById('bsChatWindow');
  var closeBtn = document.getElementById('bsChatClose');
  var body = document.getElementById('bsChatBody');
  var searchInput = document.getElementById('bsChatSearchInput');
  var searchBtn = document.getElementById('bsChatSearchBtn');
  var tooltip = document.getElementById('bsChatTooltip');

  // First Load Animation & Tooltip (after 1 second)
  setTimeout(function() {
    toggle.classList.add('wave-long');
    tooltip.classList.add('show');
    setTimeout(function(){ tooltip.classList.remove('show'); }, 4000);
    setTimeout(function(){ toggle.classList.remove('wave-long'); }, 3600);
  }, 1000);

  // Repeat Animation Every 30 Seconds
  setInterval(function() {
    if (!window_.classList.contains('open')) {
      toggle.classList.add('wave-long');
      setTimeout(function(){ toggle.classList.remove('wave-long'); }, 3600);
    }
  }, 30000); 

  var chatData = [
    { icon: '📦', label: 'Quality & Video Call', qs: [
      { q: 'Can I see the watch before you ship it?', a: 'Yes! We offer "Video Call Packing" on request. You can connect with us on WhatsApp video call, and we will show you your watch live, inspect it for any defects, and pack it in front of you.' },
      { q: 'Are the watches exactly as shown in the photos?', a: 'Yes, we use real photos of the actual watches. What you see is exactly what you will receive.' },
      { q: 'What if the watch gets damaged during delivery?', a: 'We pack the watches very securely. However, if you receive a damaged item, please make a continuous unboxing video and contact us on WhatsApp immediately. We will arrange a replacement.' }
    ]},
    { icon: '💵', label: 'Payment & Advance (COD)', qs: [
      { q: 'Is Cash on Delivery (COD) available?', a: 'Yes, COD is available on almost all serviceable pincodes across India. You only need to pay a small token advance to confirm the order.' },
      { q: 'Why is the advance amount required?', a: 'The advance (₹200+) ensures that we only process genuine orders and avoid fake bookings. This amount is fully adjusted in your final bill. You pay the rest as COD.' },
      { q: 'Can I pay the advance using UPI?', a: 'Yes, we accept all UPI apps (GPay, PhonePe, Paytm) via our secure QR code.' },
      { q: 'What if I cancel my order after paying the advance?', a: 'If you cancel before dispatch, the advance is non-refundable as it covers the booking and verification costs. Once shipped, cancellation is not possible.' }
    ]},
    { icon: '🚚', label: 'Delivery & Shipping', qs: [
      { q: 'How many days does delivery take?', a: 'Standard delivery takes 4-5 business days. For remote areas, it might take up to 7 days.' },
      { q: 'Is shipping free?', a: 'Absolutely! We provide 100% Free Shipping Pan-India.' },
      { q: 'How will I track my order?', a: 'Once your order is dispatched, we will send you a tracking link directly on your WhatsApp number.' }
    ]},
    { icon: '🔄', label: 'Exchange & Returns', qs: [
      { q: 'Can I return the watch if I do not like it?', a: 'We do not offer returns for "change of mind". However, if the product is damaged or defective, we offer an exchange.' },
      { q: 'What is the exchange process?', a: 'You must record a continuous unboxing video. Contact us within 3 days of delivery on WhatsApp (+91 79906 43295). If approved, you will need to courier the watch to our office address.' },
      { q: 'Can I exchange for a different design?', a: 'Exchanges are only for the same model in case of defects/damage.' }
    ]},
    { icon: '⌚', label: 'Watch Care & Info', qs: [
      { q: 'Is the watch waterproof?', a: 'Our watches are 3ATM water-resistant. They can handle splashes and rain, but please do not use them for swimming, showering, or diving.' },
      { q: 'Is the movement automatic or quartz?', a: 'We have both options. You can check the product title/description for the specific movement, or contact us on WhatsApp before ordering.' },
      { q: 'Can I adjust the strap size?', a: 'Yes, most of our metal watches come with a sizing tool. If you need help, any local watch shop can adjust the size in 2 minutes, or you can ask us to adjust it before shipping.' }
    ]},
    { icon: '📦', label: 'Ordering & Packaging', qs: [
      { q: 'How do I place an order?', a: 'Click on "Buy Now", fill in your address, scan the UPI QR for the advance, and click "Confirm on WhatsApp" to place your order.' },
      { q: 'Will I get the original brand box with the watch?', a: 'The watch comes in a secure, plain safety box. If you want the original brand box, you can add it separately. Please contact us on WhatsApp for pricing, as original box prices vary by brand.' },
      { q: 'Do I get a bill/invoice with the order?', a: 'Yes, we provide a standard invoice with your order for your records.' }
    ]},
    { icon: '❓', label: 'General & Support', qs: [
      { q: 'Do you have an Instagram page?', a: 'Yes, please follow us for new arrivals and offers. (Link is in the footer).' },
      { q: 'How can I contact customer support?', a: 'You can WhatsApp us at +91 79906 43295. We are available from 10 AM to 7 PM, Mon-Sat.' }
    ]}
  ];

  function appendMsg(text, type) {
    var msg = document.createElement('div');
    msg.className = 'bs-msg bs-msg-' + type;
    msg.innerHTML = text;
    body.appendChild(msg);
    body.scrollTop = body.scrollHeight;
    return msg;
  }

  function showTyping() {
    var typing = document.createElement('div');
    typing.className = 'bs-msg bs-msg-bot typing-indicator';
    typing.innerHTML = '<span></span><span></span><span></span>';
    body.appendChild(typing);
    body.scrollTop = body.scrollHeight;
    return typing;
  }

  function showCategories() {
    body.innerHTML = '';
    appendMsg('Hi there! 👋 Welcome to BrandScanner. How can we help you today?', 'bot');
    var optionsDiv = document.createElement('div');
    optionsDiv.className = 'bs-btn-group';
    chatData.forEach(function(cat) {
      var btn = document.createElement('button');
      btn.className = 'bs-btn';
      btn.innerHTML = '<span>' + cat.icon + ' ' + cat.label + '</span>';
      btn.onclick = function() { showQuestions(cat); };
      optionsDiv.appendChild(btn);
    });
    body.appendChild(optionsDiv);
    body.scrollTop = body.scrollHeight;
  }

  function showQuestions(cat) {
    appendMsg(cat.icon + ' ' + cat.label, 'user');
    var oldGroups = body.querySelectorAll('.bs-btn-group');
    oldGroups.forEach(function(el) { el.remove(); });

    var typing = showTyping();

    setTimeout(function() {
      body.removeChild(typing);
      appendMsg('Here are some common questions about <strong>' + cat.label + '</strong>:', 'bot');
      
      var optionsDiv = document.createElement('div');
      optionsDiv.className = 'bs-btn-group';
      
      cat.qs.forEach(function(item) {
        var btn = document.createElement('button');
        btn.className = 'bs-btn';
        btn.textContent = item.q;
        btn.onclick = function() { showAnswer(item); };
        optionsDiv.appendChild(btn);
      });
      
      var backBtn = document.createElement('button');
      backBtn.className = 'bs-btn';
      backBtn.style.borderColor = '#6b7280';
      backBtn.style.color = '#6b7280';
      backBtn.innerHTML = '<span>⬅ Back to categories</span>';
      backBtn.onclick = showCategories;
      optionsDiv.appendChild(backBtn);
      
      body.appendChild(optionsDiv);
      body.scrollTop = body.scrollHeight;
    }, 1500);
  }

  function showAnswer(item) {
    appendMsg(item.q, 'user');
    var oldGroups = body.querySelectorAll('.bs-btn-group');
    oldGroups.forEach(function(el) { el.remove(); });

    var typing = showTyping();

    setTimeout(function() {
      body.removeChild(typing);
      appendMsg(item.a, 'bot');
      
      var optionsDiv = document.createElement('div');
      optionsDiv.className = 'bs-btn-group';
      var againBtn = document.createElement('button');
      againBtn.className = 'bs-btn';
      againBtn.innerHTML = '<span>🔄 Ask something else</span>';
      againBtn.onclick = showCategories;
      optionsDiv.appendChild(againBtn);
      
      body.appendChild(optionsDiv);
      body.scrollTop = body.scrollHeight;
    }, 2500);
  }

  // SMART SEARCH (Multi-word Keyword based)
  function searchQuestions(query) {
    if (!query || query.trim().length < 2) { return; }
    
    appendMsg(query, 'user');
    var typing = showTyping();
    
    var q = query.toLowerCase().trim();
    var tokens = q.split(/\s+/).filter(Boolean);
    var results = [];

    chatData.forEach(function(cat) {
      cat.qs.forEach(function(item) {
        var searchText = (cat.label + ' ' + item.q + ' ' + item.a).toLowerCase();
        var matchesAll = tokens.every(function(token) {
          return searchText.indexOf(token) !== -1;
        });
        if (matchesAll) { results.push(item); }
      });
    });

    setTimeout(function() {
      body.removeChild(typing);
      
      var oldGroups = body.querySelectorAll('.bs-btn-group');
      oldGroups.forEach(function(el) { el.remove(); });

      if (results.length === 0) {
        appendMsg('No results found for "<strong>' + query + '</strong>". Please try different keywords (e.g., "advance", "box", "delivery").', 'bot');
        var optionsDiv = document.createElement('div');
        optionsDiv.className = 'bs-btn-group';
        var backBtn = document.createElement('button');
        backBtn.className = 'bs-btn';
        backBtn.innerHTML = '<span>⬅ Back to categories</span>';
        backBtn.onclick = showCategories;
        optionsDiv.appendChild(backBtn);
        body.appendChild(optionsDiv);
      } else {
        appendMsg('Here are the results for "<strong>' + query + '</strong>":', 'bot');
        var optionsDiv = document.createElement('div');
        optionsDiv.className = 'bs-btn-group';
        results.slice(0, 6).forEach(function(item) {
          var btn = document.createElement('button');
          btn.className = 'bs-btn';
          btn.textContent = item.q;
          btn.onclick = function() { showAnswer(item); };
          optionsDiv.appendChild(btn);
        });
        body.appendChild(optionsDiv);
      }
      body.scrollTop = body.scrollHeight;
    }, 2000);
    searchInput.value = '';
  }

  searchBtn.onclick = function() { searchQuestions(searchInput.value); };
  searchInput.onkeydown = function(e) { if (e.key === 'Enter') { searchQuestions(searchInput.value); } };

  toggle.onclick = function() {
    window_.classList.toggle('open');
    tooltip.classList.remove('show');
    if (window_.classList.contains('open')) {
      document.body.style.overflow = 'hidden'; // Background Scroll Lock
      if (body.innerHTML === '') { showCategories(); }
    } else {
      document.body.style.overflow = ''; // Unlock background scroll
    }
  };
  
  closeBtn.onclick = function() { 
    window_.classList.remove('open'); 
    document.body.style.overflow = ''; 
  };
})();
