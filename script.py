import json
from geopy.geocoders import GoogleV3
from geopy.geocoders import Nominatim
from geopy.exc import GeocoderTimedOut
from geopy.geocoders import Bing
import time

with open('data.json') as data_file:
    data = json.load(data_file)

# let's remove the meta informations
data = data['data']

geolocator_google = GoogleV3(api_key='AIzaSyCaAXe1p_-gIMrXlKuBDzfkJxJ8187GGD4')
geolocator_open_maps = Nominatim()
geolocator_microsoft = Bing(api_key='Ath1_nHTp4oY34uzWDMRpQ6Yxh_He-x2SB_av7ZT0QP5Ef5Mj8tVRygUBmjkKdvg')

refactored_data = []
n_movies = 0
n_locations = 0

for movie in data:
    refactored_movie = {}
    movie_description = '{} , San Francisco, California, USA'.format(movie[10])
    try:
        location = geolocator_microsoft.geocode(movie_description, timeout = 10)
    except(GeocoderTimedOut):
        print('nope for {}'.format(movie[10]))
    if location:
        refactored_movie['loc'] = [location.longitude, location.latitude]
        refactored_movie['title'], refactored_movie['year'], refactored_movie['location'] = movie[8], movie[9], movie[10]
        n_locations += 1
        refactored_data += [refactored_movie]
    n_movies += 1
    print (refactored_movie)

print('# movies {}'.format(n_movies))

print('# locations {}'.format(n_locations))

# title
# print(data[0][8])

# production year
# print(data[0][9])

# location(plain text)
# print(data[0][10])

with open('refactored_data.json', 'w') as outfile:
    json.dump(refactored_data, outfile)
