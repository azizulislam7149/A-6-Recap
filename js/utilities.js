const loadingSpinner = (show)=>{
    const spinner =  document.getElementById('loader')
    if(show){
   spinner.classList.remove('hidden')
   const petContainers = document.getElementById('all-pets');
    petContainers.innerHTML= '';
}
else{
    spinner.classList.add('hidden');
}
}
const removeActiveClasses= ()=>{
const allButtons = document.querySelectorAll('.category-btn');
for(btn of allButtons){
btn.classList.remove('bg-emerald-100' ,'rounded-full' ,'bordre-red-500', 'border-2')
btn.classList.add('rounded-xl');
}

}
const addActiveClasses = (category)=>{
const activeButtons = document.getElementById(`btn-${category}`);

console.log(activeButtons);
activeButtons.classList.add('bg-emerald-100' ,'rounded-full' ,'bordre-red-500', 'border-2');
activeButtons.classList.remove('rounded-xl');
}