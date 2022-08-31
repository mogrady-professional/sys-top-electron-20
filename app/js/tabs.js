const contents = document.querySelectorAll('.content');
const listItems = document.querySelectorAll('nav ul li');
const settingsInput = document.getElementById('settings-input');

listItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    hideAllContents();
    hideAllItems();

    // activate list item
    item.classList.add('active');

    // display content
    contents[index].classList.add('show');

    // find out the current tab
    let tab = item.textContent.trim();
    // console.log(item.textContent);

    // toggle settings input
    tab === 'Settings'
      ? settingsInput.classList.remove('hide')
      : settingsInput.classList.add('hide');
  });
});

function hideAllContents() {
  contents.forEach((content) => {
    content.classList.remove('show');
  });
}

function hideAllItems() {
  listItems.forEach((item) => {
    item.classList.remove('active');
  });
}
