function getDivFromHTML(htmlString, divId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetDiv = doc.getElementById(divId);
  return targetDiv;
}

async function fetchPost(){
	const response = await fetch("https://jamesohara08.github.io/home/post/KevinLong.html");
	const data = await response.text();
	var post_content = getDivFromHTML(data, 'post');
	document.getElementById('content').appendChild(post_content);
}

fetchPost();