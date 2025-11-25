(function(){
	const navToggle = document.getElementById('navToggle');
	const mainNav = document.getElementById('mainNav');
	const darkToggle = document.getElementById('darkToggle');
	const liveClock = document.getElementById('liveClock');
	const cards = document.querySelectorAll('.card');
	const form = document.getElementById('demoForm');
	const formMsg = document.getElementById('formMsg');

	// mobile nav toggle
	navToggle && navToggle.addEventListener('click', ()=> {
		const ul = mainNav.querySelector('ul');
		if (ul.style.display === 'flex') ul.style.display = '';
		else ul.style.display = 'flex';
	});

	// dark mode toggle (persist in localStorage)
	const root = document.documentElement;
	function setDark(on){
		if(on) document.documentElement.classList.add('dark');
		else document.documentElement.classList.remove('dark');
		localStorage.setItem('dark', on ? '1' : '0');
	}
	darkToggle && darkToggle.addEventListener('click', ()=>{
		const on = !document.documentElement.classList.contains('dark');
		setDark(on);
	});
	if(localStorage.getItem('dark') === '1') setDark(true);

	// live clock
	function tick(){
		const now = new Date();
		const hh = String(now.getHours()).padStart(2,'0');
		const mm = String(now.getMinutes()).padStart(2,'0');
		const ss = String(now.getSeconds()).padStart(2,'0');
		if(liveClock) liveClock.textContent = `Time: ${hh}:${mm}:${ss}`;
	}
	tick();
	setInterval(tick,1000);

	// card click highlight
	cards.forEach(c=>{
		c.addEventListener('click', ()=> {
			cards.forEach(x=>x.style.outline='');
			c.style.outline = '3px solid rgba(37,99,235,0.2)';
		});
	});

	// form handling (simple)
	form && form.addEventListener('submit', (e)=>{
		e.preventDefault();
		formMsg.textContent = '';
		const name = form.name.value.trim();
		const email = form.email.value.trim();
		if(!name || !email){
			formMsg.textContent = 'Please provide name and email.';
			return;
		}
		formMsg.textContent = 'Thanks! Your message was received (demo).';
		form.reset();
		// small visual feedback
		setTimeout(()=> formMsg.textContent = '', 4000);
	});
})();
