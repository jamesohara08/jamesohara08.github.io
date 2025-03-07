function getDivFromHTML(htmlString, divId) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  const targetDiv = doc.getElementById(divId);
  return targetDiv;
}

async function fetchPost(url){
	const response = await fetch(url);
	const data = await response.text();
	const post_content = getDivFromHTML(data, 'post');
	const headline = post_content.getElementsByTagName("h1")[0];
	const date = post_content.getElementsByTagName("b")[0];
	const content = Array.prototype.slice.call(post_content.getElementsByTagName("p"),0,3);
	const read_more = document.createElement('a');
	read_more.setAttribute('href', url);
	read_more.textContent = "Read more...";
	read_more.className = "w3-text-indigo";
	const hr = document.createElement('hr');
	hr.style = "border-top: 3px solid #bbb;";
	const preview = document.createElement('div');
	preview.setAttribute('id','post');
	preview.className = "w3-content w3-container";
	preview.appendChild(headline);
	preview.appendChild(date);
	for(const p of content){
		preview.appendChild(p);
	}
	preview.appendChild(read_more);
	preview.appendChild(hr);
	return preview;
}

async function buildHomepage(){
	const response = await fetch("https://raw.githubusercontent.com/jamesohara08/home/refs/heads/main/bloglist.csv");
	const data = await response.text();
	var lines = data.split('\n');
	for(const line of lines){
		const filename = line.split(',')[0];
		if(filename != 'html_name'){
			console.log(filename);
			const url = "https://nextyeardc.com/post/" + filename;
			posts.push(url);
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

async function paginate(page_num){
	const content = document.getElementById('content');
	while(content.firstChild){
        content.removeChild(content.firstChild);
    }
	const start_index = (page_num - 1) * 10;
	for(i=start_index;i<start_index+10;i++){
		const post = await fetchPost(posts[i]);
		content.appendChild(post);
	}
	content.scrollIntoView();
}

const posts = [];
buildHomepage();