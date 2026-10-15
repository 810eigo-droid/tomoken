(() => {
const dialog=document.querySelector('#image-viewer');
dialog.innerHTML='<div class="gallery-header"><h2 id="gallery-title"></h2><button type="button" class="viewer-close" aria-label="拡大表示を閉じる">閉じる ×</button></div><div class="gallery-controls" role="group" aria-label="写真の表示方法"><button type="button" data-view="compare">2枚を比較</button><button type="button" data-view="before">施工前</button><button type="button" data-view="after">施工後</button></div><div class="gallery-stage"></div><p class="viewer-caption" aria-live="polite"></p>';
dialog.setAttribute('aria-labelledby','gallery-title');
const controls=dialog.querySelector('.gallery-controls'),stage=dialog.querySelector('.gallery-stage');
let opener,photos=[];
function render(mode){
 const paired=photos.length===2,compare=paired&&mode==='compare';
 controls.hidden=!paired;dialog.classList.toggle('gallery-comparing',compare);
 controls.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.view===mode)));
 stage.replaceChildren();
 (compare?photos:[photos[paired&&mode==='after'?1:0]]).forEach(photo=>{
  const figure=document.createElement('figure'),label=document.createElement('figcaption'),img=document.createElement('img');
  label.textContent=paired?(photo.phase==='before'?'施工前 / BEFORE':'施工後 / AFTER'):photo.alt;img.src=photo.src;img.alt=photo.alt;
  figure.append(label);
  if(compare){const button=document.createElement('button');button.type='button';button.className='gallery-photo-choice';button.setAttribute('aria-label',label.textContent+'を1枚で拡大');button.append(img);button.addEventListener('click',()=>{render(photo.phase);controls.querySelector('[data-view="'+photo.phase+'"]').focus()});figure.append(button)}else figure.append(img);
  stage.append(figure);
 });
 dialog.querySelector('.viewer-caption').textContent=compare?'写真を選ぶと、1枚ずつ大きく表示できます。':paired?(mode==='after'?'施工後を表示中':'施工前を表示中')+'。「2枚を比較」で並べて確認できます。':photos[0].alt;
}
document.querySelectorAll('[data-lightbox]').forEach(link=>link.addEventListener('click',event=>{
 if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||typeof dialog.showModal!=='function')return;
 event.preventDefault();opener=link;
 const card=link.closest('.work-card, .project'),links=card?[...card.querySelectorAll('[data-lightbox]')]:[];
 photos=links.length===2?links.map((a,i)=>({src:a.href,alt:a.querySelector('img')?.alt||'',phase:i===0?'before':'after'})):[{src:link.href,alt:link.querySelector('img')?.alt||'株式会社友建 健康宣言の証'}];
 dialog.querySelector('#gallery-title').textContent=card?.querySelector('h3')?.textContent||'健康宣言の証';render(photos.length===2?'compare':'before');dialog.showModal();document.body.classList.add('viewer-open');dialog.querySelector('.viewer-close').focus();
}));
controls.addEventListener('click',e=>{const b=e.target.closest('[data-view]');if(b)render(b.dataset.view)});
dialog.querySelector('.viewer-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('keydown',e=>{if(photos.length!==2||!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const phase=e.key==='ArrowLeft'?'before':'after';render(phase);controls.querySelector('[data-view="'+phase+'"]').focus()});
dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()});
dialog.addEventListener('close',()=>{document.body.classList.remove('viewer-open');opener?.focus()});
})();
