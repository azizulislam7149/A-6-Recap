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
        loadingSpinner(false);
    },2000)
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
    <button class="btn bg-white text-teal-700 border rounded-lg py-1 px-4"><i class="fa-solid fa-thumbs-up"></i></button>
    <button class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Adopt</button>
    <button class="btn bg-white text-teal-700 border rounded-lg py-1 px-4">Details</button>
</div>
`
petContainers.appendChild(div);
});

}
loadCategories();
loadAllPets();