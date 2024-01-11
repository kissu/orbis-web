document.addEventListener('DOMContentLoaded', function () {
    const suggestions = ["Location1", "Location2", "Location3"];
    const itemCategories = ["Category1", "Category2", "Category3"];

    const appElement = document.getElementById('app');

    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.size = 50;
    searchBar.placeholder = 'Search by location';

    const locationSuggestionsList = document.createElement('ul');
    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        locationSuggestionsList.appendChild(listItem);
    });

    const timeIntervalPicker = document.createElement('select');
    const timeIntervalOptions = ["Today", "Tomorrow", "This Week", "This Weekend", "This Month"];
    timeIntervalOptions.forEach(optionText => {
        const option = document.createElement('option');
        option.text = optionText;
        timeIntervalPicker.add(option);
    });

    const categoryPicker = document.createElement('select');
    itemCategories.forEach(category => {
        const option = document.createElement('option');
        option.text = category;
        categoryPicker.add(option);
    });

    const itemsListView = document.createElement('ul');

    appElement.appendChild(searchBar);
    appElement.appendChild(locationSuggestionsList);
    appElement.appendChild(timeIntervalPicker);
    appElement.appendChild(categoryPicker);
    appElement.appendChild(itemsListView);
});


document.addEventListener('DOMContentLoaded', function () {
    const itemsData = [
        { Image: 'image1.png', Text: 'Item 1', Start_date: new Date(), IsNotShared: true },
        { Image: 'image2.png', Text: 'Item 2', Start_date: new Date(), IsNotShared: false },
        { Image: 'image1.png', Text: 'Item 3', Start_date: new Date(), IsNotShared: false },
        { Image: 'image2.png', Text: 'Item 4', Start_date: new Date(), IsNotShared: true },
        { Image: 'image1.png', Text: 'Item 5', Start_date: new Date(), IsNotShared: false },
    ];

    const appElement = document.getElementById('app');

    const itemsListView = document.createElement('ul');
    itemsData.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="item-container">
                <img src="${item.Image}" alt="Item Image" class="item-image">
                <div class="item-details">
                    <div class="item-text">${item.Text}</div>
                    <div class="item-date">${item.Start_date.toLocaleDateString()} - ${item.Start_date.toLocaleTimeString()}</div>
                </div>
                <img src="ic_share.png" alt="Apple Logo" width="50" height="50" onclick="onShareButtonClick(${item.IsNotShared})">
            </div>
        `;
        itemsListView.appendChild(listItem);
    });
    appElement.appendChild(itemsListView);
});

function onShareButtonClick(isNotShared) {
    if (isNotShared) {
        alert('Item shared!');
    } else {
        alert('Item is already shared.');
    }
}

function goToLogoutPage() {
    window.location.href = 'LogoutPage.html';
}


