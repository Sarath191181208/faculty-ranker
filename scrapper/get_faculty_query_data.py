from merge_image_urls import load_json, save_json


fac_data = load_json("./data/fac-4.json")

if fac_data is None:
    print("Exiting... as there was an error reading the JSON data.")
    exit()

updated_data = list()

for partition in fac_data.keys():
    for key in fac_data[partition].keys():
        print("key")
        data = fac_data[partition][key]
        if data.get("name", None) is None:
            continue
        new_data = {
            "name": data["name"],
            "specialization": data["specialization"],
            "image_url": data["image_url"],
            "partition_number": int(partition),
            "id": key,
        }
        updated_data.append(new_data)

print(f"Total faculty: {len(updated_data)}")
save_json(updated_data, "./data/faculty_data.json")
