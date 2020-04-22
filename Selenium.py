from selenium import webdriver
import urllib
import time
import requests

i = 1 #File No.
j = 1 #Seite
profession = "Aerztin"
# provinces = ["Bayern", "BadenWuerttemberg", "Hessen","Niedersachsen", "NordrheinWestfalen", "RheinlandPfalz", "Sachsen", "Thueringen", "Berlin", "SchleswigHolstein"]

province = "SchleswigHolstein"
#Cities: Muenchen, Hamburg, Berlin, Stuttgart, Hannover, Mannheim, Frankfurt
# city = "Frankfurt"

code = 4
status = "freiberuflich"
#1: angestellt, 4: freiberuflich, 5: Inhaber
driver = webdriver.Chrome()
driver.get("https://login.xing.com//login")

username = driver.find_element_by_id("login_form_username")
password = driver.find_element_by_id("login_form_password")


username.send_keys("USERNAME")
password.send_keys("PASSWORD")

driver.find_element_by_name("button").click()

for x in range (2):
    #get by province
    driver.get("https://www.xing.com/search/members?_=1536825020943&advanced_form=true&facets%5B%5D=current_status_code&filters%5Bcurrent_status_code%5D%5B%5D="+str(code)+"&page="+str(j)+"&province="+province+"&section=members&title="+profession)

    #get by city
    # driver.get("https://www.xing.com/search/members?_=1536687921924&advanced_form=true&city="+city+"&filters%5Bcountry%5D%5B%5D=de&page="+str(j)+"&section=members&title="+profession)

    #get general: Inhaber
    # driver.get("https://www.xing.com/search/members?_=1536757474321&advanced_form=true&facets%5B%5D=current_status_code&filters%5Bcurrent_status_code%5D%5B%5D=5&page="+str(j)+"&section=members&title="+profession)

    #get general 300 pics
    # driver.get("https://www.xing.com/search/members?_=1536688628782&advanced_form=true&facets%5B%5D=current_status_code&filters%5Bcurrent_status_code%5D%5B%5D=1&page="+str(j)+"&section=members&title="+profession)
    images = driver.find_elements_by_class_name("user-photo")

    for image in images:
        src = image.get_attribute('src')
        source = src.replace("96x96", "1024x1024")
        print(source)
        # urllib.urlretrieve(source, "C:\Users\melte\Desktop\Fraunhofer\ImageScraper\images"+str(i)+".jpg")
        img_data = requests.get(source, timeout=10).content
        with open("C:\Users\melte\Desktop\Fraunhofer\ImageScraper\images\Aerztin\Aerztin_"+status+"_"+province+str(i)+".jpg", 'wb') as handler:
            handler.write(img_data)
        i = i + 1
    j = j + 1
    time.sleep(10)


driver.close()
