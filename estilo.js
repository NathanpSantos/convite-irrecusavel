const nao = document.getElementById('nao');
const sim = document.getElementById('sim');
const tela1 = document.getElementById('tela1');
const tela2 = document.getElementById('tela2');
const btns = document.getElementById('btns');
const walink = document.getElementById('walink');
const shareBtn = document.getElementById('shareBtn');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');
const assinatura = document.getElementById('assinatura');
const titulo = document.getElementById('titulo');
const frase = document.getElementById('frase');
const icsLink = document.getElementById('icsLink');

const params = new URLSearchParams(location.search);
const para = params.get('para') || '';
const de = params.get('de') || '';
const whats = params.get('whats') || '5511958582052';

if (para) titulo.textContent = `Convite pra você, ${para} 💌`;
if (de) {
  assinatura.textContent = `Com carinho, ${de} ❤️`;
  frase.textContent = `Convite especial de aniversário… preparado com carinho por ${de} 😏🔥`;
}

// Botão "Não" foge
const moveNao = () => {
  const rect = btns.getBoundingClientRect();
  const btnRect = nao.getBoundingClientRect();
  const maxX = rect.width - btnRect.width - 20;
  const maxY = rect.height - btnRect.height - 20;
  const x = Math.max(0, Math.min(maxX, Math.random() * maxX));
  const y = Math.max(0, Math.min(maxY, Math.random() * maxY));
  nao.style.transform = `translate(${x}px, ${y}px)`;
};
nao.addEventListener('mouseenter', moveNao);
nao.addEventListener('click', moveNao);
nao.addEventListener('touchstart', (e)=>{ e.preventDefault(); moveNao(); }, { passive:false });

// Ao clicar em "Sim"
sim.addEventListener('click', () => {
  tela1.classList.add('hidden');
  tela2.classList.remove('hidden');
  document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--bg2').trim();
  window.scrollTo({ top:0, behavior:'smooth' });
});

// WhatsApp
function buildWhatsLink(){
  const local = document.getElementById('local').textContent.trim();
  const data = document.getElementById('data').textContent.trim();
  const hora = document.getElementById('hora').textContent.trim();
  const msg = `Oi${de ? ' ' + de : ''}! Eu *aceito* passar o fim de semana com você! 💖%0A%0A` +
              `📍 *Local*: ${local}%0A📅 *Data*: ${data}%0A⏰ *Hora*: ${hora}%0A%0A` +
              `Vai ser inesquecível! ✨`;
  walink.href = `https://wa.me/${whats}?text=${msg}`;
}
buildWhatsLink();

// Compartilhar
shareBtn.addEventListener('click', async () => {
  const shareUrl = location.href;
  const shareData = {
    title: 'Convite Irrecusável 💌',
    text: de ? `Convite especial de ${de}!` : 'Convite especial!',
    url: shareUrl
  };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch {}
  } else {
    await navigator.clipboard.writeText(shareUrl);
    showToast('Link copiado!');
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(location.href);
  showToast('Link copiado!');
});

let toastTimer = null;
function showToast(text){
  toast.textContent = text || 'Pronto!';
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> toast.classList.remove('show'), 1600);
}

// ICS (calendário)
function buildICS(){
  const ano = new Date().getFullYear();
  const start = new Date(`${ano}-10-17T18:00:00`);
  const end = new Date(`${ano}-10-20T12:00:00`);
  const dt = (d)=> d.toISOString().replace(/[-:]/g,'').split('.')[0] + 'Z';
  const ics =
`BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
DTSTAMP:${dt(new Date())}
DTSTART:${dt(start)}
DTEND:${dt(end)}
SUMMARY:Fim de semana especial ${de ? 'com ' + de : ''}
LOCATION:Gonçalves - MG
DESCRIPTION:Convite irrecusável 💌
END:VEVENT
END:VCALENDAR`;
  icsLink.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
}
buildICS();


