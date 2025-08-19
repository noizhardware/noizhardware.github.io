# TODO
# display name and size of the largest .html file in the folder (utile per implementare in C, con un megabuffer)

import os
import re

totalRedlinks = 0

def find_id(full_path, hashid):
	try:
		with open(full_path, 'r') as file:
			content = file.read()
			# Assuming your HTML id is in the format id="your_id"
			if f'id="{hashid}"' in content:
				return True
			else:
				return False
	except FileNotFoundError:
		return f"File not found: {full_path}"
	except Exception as e:
		return f"An error occurred: {e}"

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
				hashid = ""
				if link.__contains__('#'):
					splitted = link.split('#')
					link = splitted[0]
					hashid = splitted[1]
					#print("== HASHID: " + link + " | " + hashid)
				full_path = os.path.join(os.path.dirname(file_path), link)
				if os.path.isfile(full_path) and link not in found_links:
					# ok il file esiste, ora verifichiamo l'ID, se richiesto
					if hashid != "":
						if not find_id(full_path, hashid):
							print(f"- {link} # {hashid}")
							totalRedlinks += 1
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
			#if filename.startswith('_'):
			#	continue
			file_path = os.path.join(folder_path, filename)
			if os.path.isfile(file_path) and file_path.endswith('.html'): # ignorerà anche i file .htm
				print(f"== redlinks in [{filename}]:")
				find_links(file_path)
				print('\n' + '-'*30 + '\n')
	except FileNotFoundError:
		print(f"Folder not found: {folder_path}")
	except Exception as e:
		print(f"An error occurred: {e}")

# find in current folder:
folder_path = '.'
print("*********************************************************")
print("*********************************************************")
print("*********************************************************")
find_links_in_folder(folder_path)
print ("== Total redlinks found: " + str(totalRedlinks))
