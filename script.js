const API_MAIN = 'https://ecomm.dotvik.com/v2kart/service/categories/mainCategories';
const API_CHILD = id => `https://ecomm.dotvik.com/v2kart/service/categories/men/tree`;

async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(res.status);
    return res.json();
}

function buildMenu(mainCats, childDataMap) {
    const menus = [
        document.getElementById('main-menu-desktop'),
        document.getElementById('main-menu-mobile')
    ];

    menus.forEach(menu => menu.innerHTML = '');

    mainCats.forEach(cat => {
        if (!cat.showInMenu) return;

        const li = document.createElement('li');
        li.className = 'menu-item';
        const a = document.createElement('a');
        a.href = `#`;
        a.textContent = cat.categoryName;
        li.appendChild(a);

        const child = childDataMap.get(cat.id);
        if (child && child.subCategory) {
            const dropdown = document.createElement('div');
            dropdown.className = 'dropdown';

            child.subCategory.forEach(sub => {
                const col = document.createElement('div');
                col.className = 'col';
                const h3 = document.createElement('h3');
                h3.textContent = sub.categoryName;
                col.appendChild(h3);

                const ul = document.createElement('ul');

                (child.childCategory || [])
                    .filter(cc => cc.parentId === sub.id)
                    .sort((a, b) => a.position - b.position)
                    .forEach(cc => {
                        const li2 = document.createElement('li');
                        const a2 = document.createElement('a');
                        a2.href = `/${cc.urlKey}`;
                        a2.textContent = cc.categoryName;
                        li2.appendChild(a2);
                        ul.appendChild(li2);
                    });

                col.appendChild(ul);
                dropdown.appendChild(col);
            });

            li.appendChild(dropdown);
        }

        menus.forEach(menu => menu.appendChild(li.cloneNode(true)));
    });
}

async function initMenu() {
    try {
        const mainResp = await fetchJSON(API_MAIN);
        const mainCats = mainResp.data;
        const childDataMap = new Map();

        await Promise.all(mainCats.map(async cat => {
            if (cat.categoryName === 'MEN') {
                const resp = await fetchJSON(API_CHILD(cat.id));
                childDataMap.set(cat.id, resp.data);
            }
        }));

        buildMenu(mainCats, childDataMap);
    } catch (e) {
        console.error('Menu load failed', e);
    }
}

document.addEventListener('DOMContentLoaded', initMenu);


// herData map
fetch('data/herdata.json')
    .then(response => response.json())
    .then(data => {
        const row = document.getElementById('product-row');

        data.forEach(item => {
            // Create col div   
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 col-md-3 mb-3';

            // Create wrapper div
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'wrapper_her';

            // Create anchor tag
            const anchor = document.createElement('a');
            anchor.href = '#';

            // Create img tag
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.alt;
            img.className = 'img-fluid';

            // Append img to anchor, anchor to wrapper, wrapper to col, col to row
            anchor.appendChild(img);
            wrapperDiv.appendChild(anchor);
            colDiv.appendChild(wrapperDiv);
            row.appendChild(colDiv);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));


// himData map
fetch('data/himdata.json')
    .then(response => response.json())
    .then(data => {
        const row = document.getElementById('product-row1');

        data.forEach(item => {
            // Create col div   
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 col-md-3 mb-3';

            // Create wrapper div
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'wrapper_him';

            // Create anchor tag
            const anchor = document.createElement('a');
            anchor.href = '#';

            // Create img tag
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.alt;
            img.className = 'img-fluid';

            // Append img to anchor, anchor to wrapper, wrapper to col, col to row
            anchor.appendChild(img);
            wrapperDiv.appendChild(anchor);
            colDiv.appendChild(wrapperDiv);
            row.appendChild(colDiv);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));


// kidsData map
fetch('data/kidsdata.json')
    .then(response => response.json())
    .then(data => {
        const row = document.getElementById('product-row2');

        data.forEach(item => {
            // Create col div   
            const colDiv = document.createElement('div');
            colDiv.className = 'col-4 col-md-3 mb-3';

            // Create wrapper div
            const wrapperDiv = document.createElement('div');
            wrapperDiv.className = 'wrapper_him';

            // Create anchor tag
            const anchor = document.createElement('a');
            anchor.href = '#';

            // Create img tag
            const img = document.createElement('img');
            img.src = item.imgSrc;
            img.alt = item.alt;
            img.className = 'img-fluid';

            // Append img to anchor, anchor to wrapper, wrapper to col, col to row
            anchor.appendChild(img);
            wrapperDiv.appendChild(anchor);
            colDiv.appendChild(wrapperDiv);
            row.appendChild(colDiv);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));

