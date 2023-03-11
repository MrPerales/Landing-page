const id = 94;
const POKEAPI = `https://pokeapi.co/api/v2/pokemon/${id}`;
const user = 'MrPerales ';
const APIGIT = `https://api.github.com/users/${user}/repos`; //to view the repositories
const content = document.getElementById('content');



async function fetchData(urlApi) {
    const response = await fetch(urlApi);
    const data = await response.json();
    // console.log(data);
    return data;
}
(async () => {
    try {
        //////////////// pokeAPI
        const poke = await fetchData(POKEAPI);

        const viewPoke = ` 
        <div class="group relative">
            <div
                class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                <img src="${poke.sprites.front_shiny}" alt="${poke.species.name}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
                <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${poke.name}
                </h3>
            </div>
        </div>`;
        content.innerHTML = viewPoke;
        // console.log(poke);
        // console.log(poke.name);
        // console.log(poke.sprites.front_shiny);
        //////////////////////////
        //////////////GITHUB API
        const git = await fetchData(APIGIT);
        const viewRepositories = `
        ${git.map(repository => {
            if(repository.fork===false){
                return `
                <div class="group relative">
                    <div class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-50 lg:aspect-none">
                        <img src="${poke.sprites.front_shiny}" alt="${repository.name}" class="w-full">
                    </div>
                    <div class="mt-4 flex justify-between">
                        <h3 class="text-sm text-gray-700">
                            <span aria-hidden="true" class="absolute inset-0"></span>
                            <a href="${repository.html_url}">${repository.name}</a>
                        </h3>
                    </div>
                </div>
            ` 
            }
            
        }
           ).join('')}
       `;
        content.innerHTML=viewRepositories;

    } catch (error) {
        // console.log(error);
        throw new Error(error);
    }
})();