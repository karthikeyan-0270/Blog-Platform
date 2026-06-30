console.log("NEW SCRIPT LOADED");
const API = "/blogs";

// Load blogs when page opens
window.onload = () => {
    loadBlogs();
};

// Publish Blog
async function publishBlog() {

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const author = document.getElementById("author").value;

    if (!title || !content || !author) {
        alert("Please fill all fields");
        return;
    }

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title,
            content,
            author
        })
    });

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
    document.getElementById("author").value = "";

    loadBlogs();
}

// Display Blogs
async function loadBlogs() {

    const res = await fetch(API);
const blogs = await res.json();

console.log("Blogs received:", blogs);

const container = document.getElementById("blogs");
container.innerHTML = "";

    blogs.reverse().forEach(blog => {

        container.innerHTML += `
        <div class="blog-card">

            <h2>${blog.title}</h2>

            <p>${blog.content}</p>

            <p><b>Author:</b> ${blog.author}</p>

            <button onclick="editBlog('${blog._id}')">Edit</button>

            <button onclick="deleteBlog('${blog._id}')">Delete</button>

            <hr>

            <h3>Comments</h3>

            ${blog.comments.map(c => `
                <div class="comment">
                    <b>${c.username}</b><br>
                    ${c.text}
                </div>
            `).join("")}

            <input
                class="comment-input"
                id="comment-${blog._id}"
                placeholder="Write Comment">

            <button onclick="addComment('${blog._id}')">
                Add Comment
            </button>

        </div>
        `;

    });

}

// Delete
async function deleteBlog(id){

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadBlogs();

}

// Edit
async function editBlog(id){

    const title=prompt("New Title");

    const content=prompt("New Content");

    if(!title || !content) return;

    await fetch(API+"/"+id,{

        method:"PUT",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            title,
            content

        })

    });

    loadBlogs();

}

// Add Comment
async function addComment(id){

    const text=document.getElementById("comment-"+id).value;

    if(!text) return;

    await fetch(API+"/"+id+"/comments",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({

            username:"Guest",

            text

        })

    });

    loadBlogs();

}