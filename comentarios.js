document.addEventListener('DOMContentLoaded', function() {
  const commentForm = document.getElementById('commentForm');
  const commentList = document.getElementById('commentList');

  // Cargar comentarios almacenados en localStorage al cargar la página
  loadComments();

  commentForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    const usernameInput = document.getElementById('usernameInput');
    const commentInput = document.getElementById('commentInput');
    const username = usernameInput.value.trim();
    const commentText = commentInput.value.trim();
    
    if (username !== '' && commentText !== '') {
      const newComment = createComment(username, commentText);
      commentList.appendChild(newComment);
      saveComment(username, commentText);
      usernameInput.value = '';
      commentInput.value = '';
    }
  });

  function createComment(username, text) {
    const comment = document.createElement('div');
    comment.classList.add('comment');

    const author = document.createElement('p');
    author.classList.add('author');
    author.textContent = username;
    comment.appendChild(author);

    const date = document.createElement('p');
    date.classList.add('date');
    const now = new Date();
    date.textContent = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    comment.appendChild(date);

    const commentText = document.createElement('p');
    commentText.textContent = text;
    comment.appendChild(commentText);

    return comment;
  }

  function saveComment(username, text) {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ username, text });
    localStorage.setItem('comments', JSON.stringify(comments));
  }

  function loadComments() {
    let comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(comment => {
      const newComment = createComment(comment.username, comment.text);
      commentList.appendChild(newComment);
    });
  }
});
