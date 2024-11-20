const loadCategories = async()=>{
const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories');
const data = await res.json();
displayCategories(data.categories
);

}
const loadAllPets = async()=>{
    loadingSpinner(true);
    const res  = await fetch('https://openapi.programming-hero.com/api/peddy/pets');
const data = await res.json();

setTimeout(()=>{
    displayPets(data.pets);
    storedPetssData=data.pets;
    loadingSpinner(false);
},2000)
}
const loadPetsByCategory = async (element)=>{
    removeActiveClasses();
    addActiveClasses(element);
    loadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${element}`);
    const data = await res.json()
    
    setTimeout(()=>{
        displayPets(data.data);
        storedPetssData=data.data;
        loadingSpinner(false);
    },2000)
}

const loadPetDetails = async (id)=>{
    
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data = await res.json()
    
    displayPetDetails(data.petData);
}
const displayPetDetails = (data)=>{
    const modalBody = document.getElementById('details-container');
    modalBody.innerHTML= ` 
    <img class="h-60 object-cover w-full rounded-lg" src="${data.image}" alt="">
    <h3>${data.pet_name}</h3>
    <div class="flex items-start gap-4">
    <div>
    <p><i class="fa-solid fa-paw"></i>Breed: ${data.breed ? data.breed :'Not Available'}</p>
    <p><i class="fa-solid fa-transgender"></i>Gender: ${data.gender ? data.gender :'Not Available'}</p>
    <p><i class="fa-solid fa-syringe"></i>vaccinated_status: ${data.vaccinated_status ? data.vaccinated_status :'Not Available'}</p>
    
    </div>
    <div>
    <p><i class="fa-solid fa-calendar-days"></i>date_of_birth: ${data.date_of_birth ? data.date_of_birth :'Not Available'}</p>
    <p><i class="fa-solid fa-dollar-sign"></i>price: ${data.price ? data.price :'Not Available'}</p>
    </div>
    
    </div>
    <Hr class="my-3"/>
    <h3>Details information</h3>
    <p>${data.pet_details ?data.pet_details : 'Not Available'}</p>

    `
    my_modal_2.showModal();

}


const displayCategories = (information)=>{

const categoryContainer = document.getElementById('pet-categories')
information.forEach(element => {
    const div = document.createElement('div');
    div.innerHTML = `
    <button id="btn-${element.category}" onclick="loadPetsByCategory('${element.category}')" class="btn category-btn flex items-center gap-2 rounded-xl border px-14 py-4 cursor-pointer h-full">
    <img class="w-10" src="${element.category_icon}" alt="">
    <p class="text-xl font-bold">${element.category}</p>
    </button>
    `
    categoryContainer.appendChild(div);
});

}
const displayPets = (information)=>{
const petContainers = document.getElementById('all-pets');
if(information.length=== 0){
    petContainers.classList.remove('grid');
    petContainers.innerHTML= `
    <div class="bg-gray-400 p-20 rounded-xl text-center space-y-4 ">
    <i class="fa-brands fa-instagram mx-auto"></i>
    <h3 class="text-3xl">No data available</h3>
    <p>there is no informmation in this button</p>
</div>
    `
    return
}
else{
    petContainers.classList.add('grid');
}
   
petContainers.innerHTML= '';
information.forEach(elements =>{
const div = document.createElement('div');
div.classList.add('flex','flex-col', 'gap-2','p-4','border','rounded-lg','font-bold');
div.innerHTML= `
<img class="h-36 w-full rounded-xl object-cover" src="${elements.image}" alt="">
<h3 class="text-xl font-bold text-white">${elements.pet_name}</h3>
// <p class="text-white text-sm">Breed: ${elements.breed ? elements.breed : 'Not Available'}</p>
<p class="text-white text-sm">Date of birth: ${elements.date_of_birth ? elements.date_of_birth : 'Not Available'}</p>
<p class="text-white text-sm">Gender: ${elements.gender ? elements.gender : 'Not Available'}</p>
<p class="text-white text-sm">Price: <span>$</span> ${elements.price ? elements.price :'Not Available'}</p>
</hr class="my-2">
<div class="flex justify-between items-center px-2 gap-3">
    <button onclick="like('${elements.image}')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4"><i class="fa-solid fa-thumbs-up"></i></button>
    <button onclick="adoptModal(this)" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Adopt</button>
    <button onclick="loadPetDetails('${elements.petId}')" class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Details</button>
</div>
`
petContainers.appendChild(div);
});

}

const adoptModal = (event)=>{
let count = 3 ;
const countContainer = document.getElementById('countdown-container');
countContainer.innerText = count;
my_modal_5.showModal()
const interval = setInterval(()=>{
count--
countContainer.innerText = count;
if(count<1){
    clearInterval(interval);
    my_modal_5.close();
    event.textContent = 'Adopted';
    event.disabled(true);

}

},1000)
}

loadCategories();
loadAllPets();