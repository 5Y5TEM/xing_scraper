import requests
from lxml import html

USERNAME = "<USERNAME>"
PASSWORD = "<PASSWORD>"

LOGIN_URL = "https://login.xing.com//login"
URL = "https://www.xing.com/search/members?_=1535121078113&advanced_form=true&keywords=Krankenschwester&page=2&province=Hessen&section=members"

def main():
    session_requests = requests.session()

    # Get login csrf token
    result = session_requests.get(LOGIN_URL)
    tree = html.fromstring(result.text)
    authenticity_token = list(set(tree.xpath("//input[@name='authenticity_token']/@value")))[0]

    # Create payload
    payload = {
        "login_form[username]": USERNAME,
        "login_form[password]": PASSWORD,
        # "authenticity_token": authenticity_token
        "login_form[token_param]":authenticity_token
    }

    # Perform login
    result = session_requests.post(LOGIN_URL, data = payload, headers = dict(referer = LOGIN_URL))
    # print(result.content)

    # Scrape url
    result = session_requests.get(URL, headers = dict(referer = URL))
    tree = html.fromstring(result.content)
    print(result.content)

    text_file = open("Output2.txt", "w")
    text_file.write(result.content)
    text_file.close()

    images = tree.xpath("//img[@class='user-photo']/text()")

    print(images)

if __name__ == '__main__':
    main()
