const lang = document.querySelectorAll('#lang button');
const langDiv = document.getElementById('lang')
const langText = {
    RU: `<p>Сап, это игра внутри названия сайта.</p><p>Вдохновленно <a target="_blank" href="titlerun.xyz">TitleRun</a>.</p>
<h1>Правила просты</h1><p>Если все слоты совпадут, ты побеждаешь и забираешь свои миллионы. Если нет, можешь попытаться снова.</p>
<h1 class="m-0">Автор</h1><div class="row"><a class="mt-1" target="_blank" href="https://github.com/sagadav/TitleSlots">GitHub</a>
<a target="_blank" class="mt-1" href="https://teleg.run/sagadav">Telegram</a></div>`,
    EN: `<p>Sup, this is a game inside the site name.</p> <p>Inspired by <a target= "_blank" href= "titlerun.xyz">TitleRun</a>
<h1>Rules are simple</h1><p>If all the slots match, you win and take your millions. If not, you can try again.</p>
<h1 class="m-0">Author</h1><div class="row"><a class="mt-1" target="_blank" href="https://github.com/sagadav/TitleSlots">GitHub</a>
<a target="_blank" class="mt-1" href="https://teleg.run/sagadav">Telegram</a></div>`,
};
const text = langDiv.getAttribute('data-text');
const textP = document.querySelector(text);

const changeLang = (e) => {
  const lang = e.target.innerText;
  if(!langText[lang]) throw new Error('no text with this lang');
  textP.innerHTML = langText[lang]
};

for(const button of lang) {
    button.addEventListener('click', changeLang)
}
