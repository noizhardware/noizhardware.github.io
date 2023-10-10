import os
import re

totalRedlinks = 0

def find_links(file_path):
    global totalRedlinks
    try:
        found_links = set()  # Use a set to store unique links
        with open(file_path, 'r') as file:
            content = file.read()
            comment_pattern = r'<!--.*?-->' # exclude html comments
            content_without_comments = re.sub(comment_pattern, '', content, flags=re.DOTALL)
            link_pattern = r'<a href="(?!http|mailto:)([^"]*)"'
            links = re.findall(link_pattern, content_without_comments)
            for link in links:
                full_path = os.path.join(os.path.dirname(file_path), link)
                if os.path.isfile(full_path) and link not in found_links:
                    #print(f"Link exists!!!: {link}")
                    #found_links.add(link)
                    pass
                elif link not in found_links:
                    print(f"- {link}")
                    found_links.add(link)
                    totalRedlinks += 1
    except FileNotFoundError:
        print(f"File not found: {file_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

def find_links_in_folder(folder_path):
    try:
        for filename in os.listdir(folder_path):
            file_path = os.path.join(folder_path, filename)
            if os.path.isfile(file_path) and file_path.endswith('.html'):
                print(f"== redlinks in [{filename}]:")
                find_links(file_path)
                print('\n' + '-'*30 + '\n')
    except FileNotFoundError:
        print(f"Folder not found: {folder_path}")
    except Exception as e:
        print(f"An error occurred: {e}")

# find in current folder:
folder_path = '.'
find_links_in_folder(folder_path)
print ("== Total redlinks found: " + str(totalRedlinks))