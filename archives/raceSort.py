import json
from collections import OrderedDict

# Read the existing races.json file
with open('races.json', 'r') as file:
    races = json.load(file)

# Sort the races alphabetically
sorted_races = OrderedDict(sorted(races.items()))

# Write the sorted races to a new file
with open('sorted_races.json', 'w') as file:
    json.dump(sorted_races, file, indent=2)

print("Sorted races have been written to sorted_races.json")