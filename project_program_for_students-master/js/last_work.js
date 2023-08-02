const cardContainer = document.querySelector('.cards');
const fileJson = 'https://jsonplaceholder.typicode.com/posts';

const getFile = async () => {
    try {
        const response = await fetch(fileJson);
        const data = await response.json();

        const cardHTML = data.map((item) => `
        <div class="card_">
            <img src="../images/user.png" alt="">
            <h4>${item.title}</h4>
            <p>${item.body}</p>
        </div>
        `).join('');

        cardContainer.innerHTML = cardHTML;
    } catch (e) {
        console.log('ERROR');
    }
};

getFile();
