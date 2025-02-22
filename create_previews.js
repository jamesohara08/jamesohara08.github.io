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
	const headline = post_content.getElementsByTagName("h1")[0];
	const headline_text = headline.innerHTML;
	headline.innerHTML = `<a href="${url}" class="w3-text-indigo">${headline_text}</a>`
	const hr = document.createElement('hr');
	hr.style = "border-top: 3px solid #bbb;"
	post_content.appendChild(hr);
	return post_content;
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
			const post = await fetchPost(url);
			posts.push(post);
		}
	}
	const num_of_pages = Math.floor(posts.length / 10) + 1;
	const pagination_bar = document.getElementById('pagination');
	for(i=1;i<num_of_pages+1;i++){
		const page_num = i.toString();
		const page_btn = document.createElement('button');
		page_btn.className = 'w3-button';
		page_btn.setAttribute('onclick',`paginate(${i})`);
		page_btn.textContent = page_num;
		pagination_bar.appendChild(page_btn);
	}
	paginate(1);
}

function paginate(page_num){
	const content = document.getElementById('content');
	while(content.firstChild){
        content.removeChild(content.firstChild);
    }
	const start_index = (page_num - 1) * 10;
	for(i=start_index;i<start_index+10;i++){
		content.appendChild(posts[i]);
	}
}

const posts = [];
buildHomepage();