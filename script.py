import json
from geopy.geocoders import GoogleV3
from geopy.exc import GeocoderTimedOut
import time

with open('data.json') as data_file:
    data = json.load(data_file)

# let's remove the meta informations
data = data['data']

geolocator = GoogleV3(api_key='AIzaSyC9ldDPiaqCN97MXEXGJlr-GFTsRJ0542I')
refactored_data = []
n_movies = 0
n_locations = 0

for movie in data:
    refactored_movie = {}
    try:
        location = geolocator.geocode(movie[10], timeout = 10)
    except(GeocoderTimedOut):
        print('nope for {}'.format(movie[10]))
    if location:
        refactored_movie['latitude'], refactored_movie['longitude'] = location.latitude, location.longitude
        n_locations += 1

    refactored_movie['title'], refactored_movie['year'], refactored_movie['location'] = movie[8], movie[9], movie[10]

    n_movies += 1

    print (refactored_movie)
    refactored_data += [refactored_movie]

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
