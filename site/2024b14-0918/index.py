# pip install beautifulsoup4
import os
from bs4 import BeautifulSoup

def create_index_html(folder_path):
    # Get all HTML files in the folder
    html_files = [f for f in os.listdir(folder_path) if f.endswith('.html')]

    # Create the index.html file
    with open(os.path.join(folder_path, 'index.html'), 'w') as index_file:
        # Write the HTML header
        index_file.write('<html><head><link rel="shortcut icon" href="../img/nhfavico_orange.png"><title>Index</title><link rel="stylesheet" type="text/css" href="../css/neu/main.css" /><link rel="stylesheet" type="text/css" href="../css/neu/bridge.css" /><link rel="stylesheet" type="text/css" href="../css/neu/themes/dark-hc.css" /></head><body>')

        # Iterate through each HTML file
        for html_file in html_files:
            file_path = os.path.join(folder_path, html_file)

            # Parse the HTML file with BeautifulSoup
            with open(file_path, 'r', encoding='utf-8') as f:
                soup = BeautifulSoup(f, 'html.parser')

                # Find the meta property="og:title" tag
                title_tag = soup.find('meta', property='og:title')

                # Get the content of the title tag
                title_content = title_tag['content'] if title_tag else html_file

                # Write the link to the HTML file
                index_file.write(f'<h2><a href="{html_file}" target="_blank" rel="noopener">{title_content}</a></h2>')

                # Find all elements with an 'id' attribute excluding specified ids
                excluded_ids = ["logo", "lxmenu", "email", "youtube", "instagram", "merveilles", "sourcehut", "github", "cc"]
                id_elements = [element for element in soup.find_all(id=True) if element['id'] not in excluded_ids]

                # Write links to each id with indentation
                for element in id_elements:
                    index_file.write(f'&emsp;&emsp;&emsp;&emsp;&emsp;<a href="{html_file}#{element["id"]}" target="_blank" rel="noopener">#{element["id"]}</a><br>')

        # Write the HTML footer
        index_file.write('</body></html>\n')

# Replace 'folder_path' with the actual path to your folder
folder_path = '.'
create_index_html(folder_path)
print("DONE.")

