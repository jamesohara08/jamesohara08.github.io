function getDivFromHTML(htmlString, divId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetDiv = doc.getElementById(divId);
  return targetDiv;
}

async function fetchPost(url){
	const response = await fetch(url);
	const data = await response.text();
	var post_content = getDivFromHTML(data, 'post');
	document.getElementById('content').appendChild(post_content);
	return true;
}

async function buildHomepage(){
	const response = await fetch("https://raw.githubusercontent.com/jamesohara08/home/refs/heads/main/bloglist.csv");
	const data = await response.text();
	var lines = data.split('\n');
	for(const line of lines){
		const filename = line.split(',')[0];
		if(filename != 'html_name'){
			console.log(filename);
			const url = "https://jamesohara08.github.io/home/post/" + filename;
			fetchPost(url);
		}
	}
}
buildHomepage();