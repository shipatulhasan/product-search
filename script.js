// spiner function

const spinner = (isTrue)=>{

    const progress = document.getElementById('spinner')
    if(isTrue){
        progress.classList.remove('hidden')
    }
    else{
        progress.classList.add('hidden')

    }

}

// laodProduct

const loadProducts = async ()=>{

    const res = await fetch("https://fakestoreapi.com/products")
    const data = await res.json()
    return data

}

const showAll = async() =>{

    const data = await (loadProducts())
    spinner(false)

    const menuContainer = document.getElementById("categories")
    menuContainer.innerHTML = `
            <kbd class="kbd hover:cursor-pointer mx-3" onclick="displayAll()">all</kbd>`
    
    const uniqueArray = []
    data.forEach(product =>{

        if(uniqueArray.includes(product.category) === false){
            uniqueArray.push(product.category)

            const tabItem = document.createElement('kbd')
            
            tabItem.setAttribute('onclick','searchTab(event)')
            tabItem.classList.add('kbd','mx-3','hover:cursor-pointer','bg-gray-100')
            tabItem.innerText = product.category
            menuContainer.appendChild(tabItem)
            
        }
     
    })
    // active color function
    const tab = menuContainer.querySelectorAll('.kbd')
    tab.forEach(item=>{
        item.addEventListener('click',function(e){
            tab.forEach(element=>element.classList.remove('bg-pink-600','text-white'))
            e.target.classList.add('bg-pink-600','text-white')
        })
    })
}
spinner(true)
showAll()


// search condition

const searchData = async(value,isTrue)=>{
    
    const data = await loadProducts()
    spinner(false)
    let foundProduct
    if(isTrue){
        foundProduct =  data.filter(products=>products.category===(value))
    }
    else{
        foundProduct =  data.filter(products=>products.category.includes(value))
    }

    processing(foundProduct)


}

// all tab

const displayAll= ()=>{
   const all = ''
    searchData(all,false)
}

// search by tab

const searchTab = (e)=>{
    
    const fieldText = e.target.innerText
    searchData(fieldText,true)

}

// search field

const searchField = document.getElementById('search-field')

    searchField.addEventListener('keypress',(event)=>{
    spinner(true)

    const searchValue = searchField.value
    if(event.key ==='Enter'){
        document.querySelectorAll('.kbd').forEach(btn=>btn.classList.remove('bg-pink-600','text-white'))
       searchData(searchValue,false)
        
    }


})

document.getElementById('del-btn').addEventListener('click',()=>{
    searchField.value = ''
    spinner(false)
})

const processing = (foundProduct)=>{
        
        const container = document.getElementById('product-container')
        const errorMsg = document.getElementById('error-msg')
        errorMsg.textContent = ''
        container.textContent = ''
        if(foundProduct.length == 0){
            errorMsg.innerHTML = `
            <h2 class="text-xl text-red-500 fw-bold text-center">
            Nothing is found
            </h2>
            `
            return
        }

        foundProduct.forEach(product => {

            const {title, category, price, image, description,rating
            } = product

            const div = document.createElement('div')
            div.className = 'card w-full bg-whtie shadow-xl'
            div.innerHTML =   `
            
            <img src="${image}" class="h-52 object-contain p-5" alt="Shoes" />
            <div class="card-body">
              <h2 class="card-title">${category}</h2>
           
              <p class="truncate" title = "${title}">${title}</p>
              <div class="card-actions justify-between items-center pt-3">
                <h2 class="text-pink-600 font-semibold text-xl">$<span class="price">${price}</span> </h2>
                <label onclick= "display('${title.replace(/[']/g, '')}', '${image}', '${description.replace(/[']/g, '')}','${rating.rate}')" for="my-modal-6" class="modal-button py-1 px-4 bg-pink-600 rounded text-slate-100 hover:cursor-pointer">view details</label>
              </div>
            </div>
            
            `

            container.appendChild(div)
            
        });
        
}

const display = (title,image,description,rating)=>{

    const container = document.getElementById('detail-container')
    container.innerHTML = `
        
            <label for="my-modal-6" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <img src="${image}" class="h-52 object-contain p-5" alt="Shoes" />
            <h3 class="text-lg font-bold">${title}</h3>
            <p class="text-pink-600 font-bold">Ratings: <span class="text-orange-500">${rating} <sup><i class="fa-solid fa-star text-[10px]"></i></sup><span></p>
            <p class="py-4">${description}</p>
            
        
      `
     
}