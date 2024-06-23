
import firebase_admin
from firebase_admin import credentials, firestore 

import json

def load_json(filename: str) -> dict | None:
    try:
        with open(filename, "r", encoding="utf-8") as file:
            data = json.load(file)
        return data
    except IOError as e:
        print(f"Error reading JSON data from '{filename}': {e}")
        return None


cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)

def main():
    db = firestore.client()

    fac_ref = db.collection("partition_faculty_2")
    docs = load_json("data/fac-4.json")

    if docs is None:
        print("Exiting... as there was an error reading the JSON data.")
        exit()

    for key, doc in docs.items():
        fac_ref.document(key).set(doc)
        print(f"Document '{key}' written to Firestore.")

if __name__ == "__main__":
    main()
