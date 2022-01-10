const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#topic-name').value.trim();
  const description = document.querySelector('#topic-description').value.trim();

  if (name && description) {
    const response = await fetch(`/api/topics`, {
      method: 'POST',
      body: JSON.stringify({name, description }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create topic');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/topics/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete topic');
    }
  }
};

document
  .querySelector('.new-topic-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.topic-list')
  .addEventListener('click', delButtonHandler);
