const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data
  });

  checkFetch(res);

  return res.text();
}

const getResourse = async (url) => {
  const res = await fetch(url);

  checkFetch(res);

  return res.json();
}

function checkFetch(res) {
  if (!res.ok) {
    throw new Error(res.statusText + ' ' + res.status);
  }
}

export {postData, getResourse};