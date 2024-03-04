const latestPostContainer = document.getElementById("latestPostContainer")

const loadLatestPosts = async () => {
    const Data = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const latestPosts = await Data.json();
    latestPosts.forEach(latestPost => {
        const postDiv = document.createElement('div');
        postDiv.classList.add("p-3", "border", "border-[#12132D26]", "rounded-2xl");
        postDiv.innerHTML = `<img src="${latestPost.cover_image}" alt="" class="rounded-2xl">
        <p class="text-[#12132D99] mt-4">
            <i class="fa-regular fa-calendar"></i>
            <span class="ml-1">${latestPost.author.posted_date? latestPost.author?.posted_date: "No publish date"}</span>
        </p>
        <h2 class="mt-3 font-extrabold text-xl text-[#12132D]">${latestPost.title}</h2>
        <p class="mt-4 font-normal text-base text-[#12132D99]">${latestPost.description}</p>
        <div class="flex items-center gap-3 mt-3">
            <img src="${latestPost.profile_image}" alt="" class="w-[50px] rounded-full">
            <div>
                <h2 class="font-bold text-[#12132D] text-base">${latestPost.author.name}</h2>
                <p class="text-[#12132D99] font-normal text-sm">${latestPost.author.designation? latestPost.author.designation: "Unknown"}</p>
            </div>
        </div>`
        latestPostContainer.appendChild(postDiv)
    });
}

loadLatestPosts();