const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('#primary-nav');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');navigation.classList.remove('is-open');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){closeMenu();menuButton.focus();}});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
const contactBar=document.querySelector('.mobile-contact');
const hero=document.querySelector('.hero');
const contactSection=document.querySelector('#contact');
let heroVisible=true,contactVisible=false;
function updateContactBar(){contactBar.hidden=heroVisible||contactVisible;}
if('IntersectionObserver' in window){
 new IntersectionObserver(entries=>{for(const entry of entries){if(entry.target===hero)heroVisible=entry.isIntersecting;if(entry.target===contactSection)contactVisible=entry.isIntersecting;}updateContactBar();},{threshold:0}).observe(hero);
 new IntersectionObserver(entries=>{contactVisible=entries[0].isIntersecting;updateContactBar();},{threshold:0}).observe(contactSection);
}
