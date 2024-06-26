import json
from pprint import pprint
from difflib import SequenceMatcher


def similarity(a, b):
    return SequenceMatcher(None, a, b).ratio()


def load_json(filename: str) -> dict | None:
    try:
        with open(filename, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except IOError as e:
        print(f"Error reading JSON data from '{filename}': {e}")
        return None


def save_json(data: dict | list, filename: str) -> bool:
    try:
        with open(filename, "w", encoding="utf-8") as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        print(f"JSON data successfully written to '{filename}'")
        return True
    except IOError as e:
        print(f"Error writing JSON data to '{filename}': {e}")
        return False


def insert_reshaped_entry(new_dict: dict, entry: dict) -> None:
    key = entry["attributes"]["Name"]
    new_dict[key] = entry["attributes"]


def save_new_reshaped_json(fac_data: dict, actual_fac_data: dict):
    if fac_data is None or actual_fac_data is None:
        print("Exiting... as there was an error reading the JSON data.")
        return

    new_fac_data = dict()
    for doc in actual_fac_data:
        insert_reshaped_entry(new_fac_data, doc)

    save_json(new_fac_data, "data/new_faculty_data.json")


def get(data: dict, key: str):
    keys = key.split("/")
    for k in keys:
        if data is None:
            return None
        if k in data:
            data = data[k]
        else:
            return None
    return data


def merge_data(fac_data: dict, updated_fac_data: dict, failed_find_fac_list: list):
    rm_dict = dict()

    for partion_num in fac_data.keys():
        fac_data_part = fac_data[partion_num]
        for key_of_fac_in_part in fac_data_part.keys():
            fac_part_data = fac_data_part[key_of_fac_in_part]
            fac_name = get(fac_part_data, "name")
            if fac_name is None:
                continue
            if fac_name in updated_fac_data:
                q = f"{fac_name}/Photo/data/attributes/url"
                new_url = get(updated_fac_data, q)
                if new_url is None:
                    failed_find_fac_list.append(fac_name)
                    continue
                fac_data[partion_num][key_of_fac_in_part]["image_url"] = new_url
                fac_data[partion_num][key_of_fac_in_part]["cabin"] = get(
                    updated_fac_data, f"{fac_name}/Office_Address"
                )
                fac_data[partion_num][key_of_fac_in_part]["phone"] = get(
                    updated_fac_data, f"{fac_name}/Contact_No"
                )
                fac_data[partion_num][key_of_fac_in_part]["email"] = get(
                    updated_fac_data, f"{fac_name}/EMAIL"
                )
            else:
                # del fac_data[partion_num][key_of_fac_in_part]
                rm_dict[partion_num] = rm_dict.get(partion_num, [])
                rm_dict[partion_num].append(key_of_fac_in_part)
                print(f"Deleted faculty: {fac_name}")
                failed_find_fac_list.append(fac_name)

    for partion_num in rm_dict.keys():
        for key in rm_dict[partion_num]:
            del fac_data[partion_num][key]



def filter_name(name: str) -> str:
    """
    Remove the following from the name:
        - Everything starting from Head (or) Dean (or) Associate
    """

    if "Head" in name:
        return name.split("Head")[0].strip()
    if "Associate" in name:
        return name.split("Associate")[0].strip()
    if "Dean" in name:
        return name.split("Dean")[0].strip()
    return name


def find_similar_faculty(
    failed_find_fac_list: list[str],
    updated_fac_data_keys: list,
    similarity_dict: dict,
    **kwargs,
) -> None:
    for k in failed_find_fac_list:
        if k is None:
            continue
        similarity_list = [
            (similarity(filter_name(k), filter_name(key)), key)
            for key in updated_fac_data_keys
        ]
        # filter out similarity less than 0.5
        similarity_list = [
            (similarity, key)
            for similarity, key in similarity_list
            if similarity > kwargs.get("threshold", 0.5)
        ]

        if len(similarity_list) == 0:
            continue

        similarity_list.sort(key=lambda x: x[0], reverse=True)
        similarity_dict[k] = similarity_list


def upated_faculty_name(fac_data: dict, similarity_dict: dict):
    for partion_num in fac_data.keys():
        fac_data_part = fac_data[partion_num]
        for key_of_fac_in_part in fac_data_part.keys():
            data = fac_data_part[key_of_fac_in_part]
            fac_name = get(data, "name")
            if fac_name not in similarity_dict:
                continue
            idx = 0
            if len(similarity_dict[fac_name]) > 1:
                print(f"Fac name: {fac_name}")
                pprint(f"Similarity: {similarity_dict[fac_name]}")
                print("Enter the index of the correct faculty name: ")
                idx = int(input())
            new_fac_name = similarity_dict[fac_name][idx][1]
            fac_data[partion_num][key_of_fac_in_part]["name"] = new_fac_name
            print(f"{fac_name} -> {new_fac_name}")

def merge_new_data():
    fac_data = load_json("data/fac-3.json")
    updated_fac_data = load_json("data/new_faculty_data.json")

    if fac_data is None or updated_fac_data is None:
        print("Exiting... as there was an error reading the JSON data.")
        return

    all_faculty = set(updated_fac_data.keys())

    rm_dict = dict()

    for partion_num in fac_data.keys(): 
        fac_data_part = fac_data[partion_num]
        for key_of_fac_in_part in fac_data_part.keys():
            fac_part_data = fac_data_part[key_of_fac_in_part]
            fac_name = get(fac_part_data, "name")
            if fac_name is None:
                continue
            if fac_name not in all_faculty:
                # remove the fac from dict 
                rm_dict[partion_num] = rm_dict.get(partion_num, [])
                rm_dict[partion_num].append(key_of_fac_in_part)
            else:
                all_faculty.remove(fac_name)

    save_json(rm_dict, "data/rm_dict.json")
    print(f"Deleted faculty: {len(rm_dict)}")
    for partion_num in rm_dict.keys():
        for key in rm_dict[partion_num]:
            del fac_data[partion_num][key]

    # get all the previous inserted faculty 
    inserted_faculty = set() 
    for partion_num in fac_data.keys():
        for key in fac_data[partion_num].keys():
            if "name" in fac_data[partion_num][key]:
                inserted_faculty.add(fac_data[partion_num][key]["name"])

    partion_num = 19
    fac_data[partion_num] = dict()
    # put every 10 faculty in a partion
    for i, key in enumerate(updated_fac_data.keys()):
        print(key)
        if key in inserted_faculty:
            continue
        if i % 10 == 0:
            partion_num += 1
            fac_data[partion_num] = dict()
        fac_data[partion_num][key] = get_data(updated_fac_data[key])
        inserted_faculty.add(key)


    save_json(fac_data, "data/fac-4.json")

def get_data(data: dict) -> dict:
    return {
        "name": get(data, "Name"),
        "image_url": get(data, "Photo/data/attributes/url"),
        "specialization": get(data, "Research_area_of_specialization"),
        "attendance_rating": 0,
        "num_correction_ratings": 0,
        "teaching_rating": 0,
        "correction_rating": 0,
        "num_teaching_ratings": 0,
        "num_attendance_ratings": 0,
        "email": get(data, "EMAIL"),
        "phone": get(data, "Contact_No"),
        "cabin": get(data, "Office_Address"),
    }

def main():
    fac_data = load_json("data/fac-2.json")
    # save_new_reshaped_json(fac_data, load_json("data/faculty_data.json"))
    updated_fac_data = load_json("data/new_faculty_data.json")

    if fac_data is None or updated_fac_data is None:
        print("Exiting... as there was an error reading the JSON data.")
        return

    failed_find_fac_list = list(load_json("data/failed_find_fac_list.json") or list())
    updated_fac_data_keys = list(updated_fac_data.keys())
    similarity_dict = dict()
    find_similar_faculty(
        failed_find_fac_list, updated_fac_data_keys, similarity_dict, threshold=0.89
    )

    save_json(similarity_dict, "data/similarity_dict.json")
    pprint(similarity_dict)

    upated_faculty_name(fac_data, similarity_dict)
    save_json(fac_data, "data/fac-2.json")

    failed_find_fac_list = []
    merge_data(fac_data, updated_fac_data, failed_find_fac_list)

    save_json(fac_data, "data/fac-3.json")
    save_json(failed_find_fac_list, "data/failed_find_fac_list.json")

    pprint(
        {
            "Passed": len(fac_data) - len(failed_find_fac_list),
            "Failed": len(failed_find_fac_list),
        }
    )


if __name__ == "__main__":
    # main()
    merge_new_data()
