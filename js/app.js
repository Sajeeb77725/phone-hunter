const searchPhone = () =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    // clearing data
    searchField.value = '';

    if(searchText == ''){
        const emptySeacrh = document.getElementById('empty');
        const h4 = document.createElement('h4');
        h4.innerText = 'Wirte somthing';
        emptySeacrh.appendChild(h4);
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displaySearchResult(data.data));
    }
}

// Display search result

const displaySearchResult = phones =>{
    const searchResult = document.getElementById('search-result');
    // Clearing previous search result
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    searchResult.textContent = '';
    // For no result
    if(phones.length == ''){
        const noResult = document.getElementById('no-result');
        const h4 = document.createElement('h4');
        h4.innerText = 'No Result Found';
        noResult.appendChild(h4);
        // Hiding other
        const emptySeacrh = document.getElementById('empty');
        emptySeacrh.style.display = 'none';
    }
    else{
        phones.forEach(phone => {
            console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top" alt="..." />
                <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                 <p class="card-text">
                  ${phone.brand}
                 </p>
                 <button onclick="loadPhoneDetail('${phone.slug}')" class="btn btn-secondary btn-sm">Details</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
            // Hiding no result
            const previousResult = document.getElementById('no-result');
            previousResult.style.display = 'none';
        })
    }
}

// Load phone Details

const loadPhoneDetail = phoneId =>{
    console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data));
}

// Display phone details

const displayPhoneDetail = phone =>{
    console.log(phone);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
    <img src="${phone.image}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${phone.name}</h5>
      <span class="fw-bold">ReleaseDate:</span> ${phone.releaseDate}
      <p class="card-text">
      <span class="fw-bold">Storage:</span> ${phone.mainFeatures.storage}.<br>
      <span class="fw-bold">DisplaySize:</span> ${phone.mainFeatures.displaySize}.<br>
      <span class="fw-bold">ChipSet:</span> ${phone.mainFeatures.chipSet}.
      </p>
    </div>
    `;
    phoneDetails.appendChild(div);
}

