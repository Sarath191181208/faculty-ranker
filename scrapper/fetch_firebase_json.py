import firebase_admin
from firebase_admin import credentials, firestore 

import json

def write_json(data: dict, filename: str) -> bool:
    """
    Writes data to a JSON file.

    Args:
    - data (dict or list): The Python dictionary or list to write as JSON.
    - filename (str): The name of the file to write to.

    Returns:
    - bool: True if the data was successfully written, False otherwise.
    """
    try:
        with open(filename, 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=4)
        print(f"JSON data successfully written to '{filename}'")
        return True
    except IOError as e:
        print(f"Error writing JSON data to '{filename}': {e}")
        return False

cred = credentials.Certificate('serviceAccountKey.json')  # Replace with your service account key path
firebase_admin.initialize_app(cred)

def main():
    db = firestore.client()

    fac_ref = db.collection("partitioned_faculty")
    docs = fac_ref.stream() 

    res_dict = dict()
    for idx, doc in enumerate(docs):
        key = doc.id
        res_dict[key] = doc.to_dict()

    write_json(res_dict, "data/fac.json")



if __name__ == "__main__":
    main()
