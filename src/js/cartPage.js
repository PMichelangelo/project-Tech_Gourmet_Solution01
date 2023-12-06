const gallery = document.querySelector(".gallery");
 

const cartList = localStorage.getItems('cartItems');

const getPromises = () =>{
  return cartList.map(id => {
    const url = 'some_url'
    const headers = {
      body: 'id'
    }

    return fetch(url, { headers })
    .then(res => {
      if (!res.ok) {
        throw new Error('API request failed with status ' + res.status);
      }
      return res.json();
    })
    .catch(e => {
      console.log('Error:', e);
      return {};
    });
  })
}
// getPromises*() === [Promise, Promise, Promise]

const prodList = []

const fetch = () => {
  const promises = getPromises();
  Promise.all(promises)
  .then(res => {
    prodList.push(res)
  })
  .catch(e => console.log('Error:', e));
}

export {
  prodList
}