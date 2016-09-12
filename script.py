import json
import psycopg2

conn = psycopg2.connect('dbname=test_geometry user=test')
cur = conn.cursor()

with open('data.json') as data_file:
    data = json.load(data_file)

# let's remove the meta informations
data = data['data']

# title
# print(data[0][8])

# production year
# print(data[0][9])

# location(plain text)
# print(data[0][10])

cur.close()
conn.close()
