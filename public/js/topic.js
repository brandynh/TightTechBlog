// Working on making post for topics work! BH

const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    const post = document.querySelector('#topic-post').value.trim();
  
    if ( post) {
      const response = await fetch(`/api/topics`, {
        method: 'POST',
        body: JSON.stringify({post}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/topic/:id');
      } else {
        alert('Failed to create post');
      }
    }
  };

  document
  .querySelector('.new-post-form')
  .addEventListener('submit', newPostFormHandler);