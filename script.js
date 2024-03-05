const latestPostContainer = document.getElementById("latestPostContainer")
const postsContainer = document.getElementById("postsContainer")
const searchField = document.getElementById("searchField");
const readCount = document.getElementById("readCount");
const readContent = document.getElementById("readContent");
const loadingIcon = document.getElementById("loadingIcon");

// load initial data for All post
const loadAllPosts = async () => {
    const Data = await fetch("https://openapi.programming-hero.com/api/retro-forum/posts")
    const allPosts = await Data.json();
    createPost(allPosts.posts);
}

// create posts by using API data
const createPost = (allPosts) => {
    postsContainer.innerHTML = ``
    allPosts.forEach((post) => {
        const postDiv = document.createElement("div")
        postDiv.classList.add("bg-[#F3F3F5]", "rounded-2xl", "px-14", "py-9", "flex", "gap-6", "mb-4");
        postDiv.innerHTML = ` 
        <div class="indicator">
            <span class="indicator-item badge badge-${post.isActive ? "success" : "secondary"}"></span>
            <img src="${post.image}" alt="" class="w-16 h-16 rounded-2xl">
        </div>
        <div class="w-full">
            <p class="font-Inter font-medium text-[#12132DCC] text-sm flex gap-7">
                <span>#${post.category}</span>
                <span>Author : ${post.author.name}</span>
            </p>
            <h2 class="font-bold text-[#12132D] mb-2 mt-2">${post.title}</h2>
            <p class="font-normal text-[#12132D99] mb-4">${post.description}</p>
            <div class="flex justify-between">
                <div class="flex items-center gap-6">
                    <p class="text-[#12132D99]"><i class="fa-solid fa-comment"></i> ${post.comment_count}</p>
                    <p class="text-[#12132D99]"><i class="fa-solid fa-eye"></i> ${post.view_count}</p>
                    <p class="text-[#12132D99]"><i class="fa-regular fa-clock"></i> ${post.posted_time}</p> 
                </div>
                <div class="px-2 py-1 bg-green-400 rounded-[32px]">
                    <button onClick="markAsRead('${post.title}', '${post.view_count}')"><i class="fa-solid fa-inbox text-white"></i></button>
                </div>
            </div>
        </div>
        `
        postsContainer.appendChild(postDiv)
    })
}

// load all latest post in latest post section
const loadLatestPosts = async () => {
    const Data = await fetch("https://openapi.programming-hero.com/api/retro-forum/latest-posts");
    const latestPosts = await Data.json();
    latestPosts.forEach(latestPost => {
        const postDiv = document.createElement('div');
        postDiv.classList.add("p-3", "border", "border-[#12132D26]", "rounded-2xl");
        postDiv.innerHTML = `<img src="${latestPost.cover_image}" alt="" class="rounded-2xl">
        <p class="text-[#12132D99] mt-4">
            <i class="fa-regular fa-calendar"></i>
            <span class="ml-1">${latestPost.author.posted_date ? latestPost.author?.posted_date : "No publish date"}</span>
        </p>
        <h2 class="mt-3 font-extrabold text-xl text-[#12132D]">${latestPost.title}</h2>
        <p class="mt-4 font-normal text-base text-[#12132D99]">${latestPost.description}</p>
        <div class="flex items-center gap-3 mt-3">
            <img src="${latestPost.profile_image}" alt="" class="w-[50px] rounded-full">
            <div>
                <h2 class="font-bold text-[#12132D] text-base">${latestPost.author.name}</h2>
                <p class="text-[#12132D99] font-normal text-sm">${latestPost.author.designation ? latestPost.author.designation : "Unknown"}</p>
            </div>
        </div>`

        latestPostContainer.appendChild(postDiv)
    });
}

// create and manipulate total read post
const readPost = []
const markAsRead = (title, view) => {
    const readPost = document.createElement("div")
    readPost.classList.add('px-4', 'py-5', 'bg-white', 'rounded-3xl', 'mt-5', "flex", "justify-between", "items-center", "gap-4")
    readPost.innerHTML = `
    <h3 class="font-semibold text-lg text-black">${title}</h3>
    <p class="font-Inter font-normal text-[#12132D99] text-base flex items-center gap-2"><i
            class="fa-solid fa-eye"></i>
        <span>${view}</span>
    </p>
    `
    readContent.appendChild(readPost);
    readCount.innerText = parseInt(readCount.innerText) + 1;
}

// search post and display by search
const searchPost = async () => {
    if (searchField.value) {
        const Data = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchField.value}`)
        const categoryPosts = await Data.json()
        if (categoryPosts.posts.length !== 0) {
            loadingMoment(true)
            // slow loading for 2 second
            setTimeout(() => {
                createPost(categoryPosts.posts)
                loadingMoment(false)
            }, 2000);
            searchField.value = ''
        }
        else {
            alert("try with another keyword")
        }
    }
    else {
        alert("search field cannot be empty")
    }
}

// load data by loading icon when click on the search button
const loadingMoment = (loadingState) => {
    if (loadingState) {
        loadingIcon.classList.remove("hidden")
    }
    else {
        loadingIcon.classList.add("hidden")
    }
}

loadLatestPosts();
loadAllPosts()