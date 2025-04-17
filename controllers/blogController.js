const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
            res.render('index', { title: 'All Blogs', blogs: result})
        })
        .catch((err) =>{
            console.log(err);
        })
}

const blog_details = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result, title: 'Blog Details' });
        })
        .catch(err => {
            console.log(err);
        })
}

const blog_create_get = (req, res) => {
    res.render('create', { title: 'Create a New Blog'});
}

const blog_create_post = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
        .then((result) =>{
            res.redirect('/blogs');
        })
        .catch((err) =>{
            console.log(err);
        })
}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) =>{
            console.log(err);
        })
}

const blog_edit_get = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('edit', { blog: result, title: 'Edit Blog' });
        })
        .catch(err => {
            console.log(err);
        });
};

const blog_edit_put = (req, res) => {
    const { title, snippet, body } = req.body;
    const id = req.params.id;

    Blog.findByIdAndUpdate(id, { title, snippet, body }, { new: true })
        .then(updatedBlog => {
            res.redirect(`/blogs/${updatedBlog._id}`);  // Redirect to the blog details page after editing
        })
        .catch(err => {
            console.log(err);
            res.redirect('/404');  // Redirect to a 404 if something goes wrong
        });
};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete,
    blog_edit_get,
    blog_edit_put
}