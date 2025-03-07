import mammoth
import datetime
import docx
import os
import argparse

def get_created_date(docx_file):
    doc = docx.Document(docx_file)
    core_props = doc.core_properties
    return core_props.created

parser = argparse.ArgumentParser()
parser.add_argument('filename')
args = parser.parse_args()
filename = args.filename
if '.docx' in filename:
    file_path = filename
    article_name = file_path.replace('.docx','')
    created_date = datetime.datetime.strftime(get_created_date(file_path), "%B %d, %Y")
else:
    raise TypeError("File type must be .docx")

with open(file_path, "rb") as docx_file:
    result = mammoth.convert_to_html(docx_file)
    html = result.value # The generated HTML
    messages = result.messages # Any messages, such as warnings during conversion

head = '<!doctype html> \n \
<html lang="en-US"> \n\
  <head>\n\
    <meta charset="UTF-8" />\n\
    <title>{0}</title>\n\
    <link rel="icon" type="image/x-icon" href="../favicon.jpg">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1">\n\
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">\n\
  </head>\n<body><div class="w3-row">\
        <img src="../next_year_dc_banner_new.jpg" class="w3-image" style="width:100%"/>\
         <div class="w3-bar w3-border w3-light-grey">\
            <a href="/home" class="w3-bar-item w3-mobile w3-button w3-hover-blue">Home</a> \
            <a href="/home/about" class="w3-bar-item w3-mobile w3-button w3-hover-blue">About</a> \
            <a href="/NatsGMProject" class="w3-bar-item w3-mobile w3-button w3-hover-blue">Be Your Own Nats GM</a>\
            <a href="/SpringTrainingStoryCreator" class="w3-bar-item w3-mobile w3-button w3-hover-blue">Spring Training Story Creator</a>\
            <a href="/GarbageKyles" class="w3-bar-item w3-mobile w3-button w3-hover-blue">Garbage Kyles Quiz</a>\
        </div>\
    </div>\n<div class="w3-content w3-container" id="post">\n<h1>{0}</h1><b>{1}</b>'.format(article_name, created_date)
end = '\n<b>Follow me on <a href="https://bsky.app/profile/nextyeardc.bsky.social">BlueSky</a>.</b></div>\n</body>\n</html>'

html = html.replace('<table>', '<div class="w3-responsive"><table class="w3-table-all">')
html = html.replace('</table>','</table></div>')
with open("post/{}.html".format(article_name.replace(' ','')),'w',encoding='utf-8') as out_f:
    out_f.write(head)
    out_f.write(html)
    out_f.write(end)