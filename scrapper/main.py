import os
import asyncio
import aiohttp

async def fetch_html(session, url):
    """
    Asynchronously fetches HTML content from the specified URL using aiohttp.

    Args:
    - session (aiohttp.ClientSession): aiohttp ClientSession object.
    - url (str): The URL of the HTML page to fetch.

    Returns:
    - str: The HTML content of the page as a string, or None if the request fails.
    """
    try:
        async with session.get(url) as response:
            if response.status == 200:
                return await response.text()
            else:
                print(f"Failed to retrieve HTML page '{url}'. Status code: {response.status}")
                return None
    except aiohttp.ClientError as e:
        print(f"An error occurred while fetching '{url}': {e}")
        return None

async def main():
    # URLs to fetch sequentially
    urls = [
        "https://www.vitap.ac.in/allfaculty",
        "https://cms.vitap.ac.in/api/faculty-profiles?populate=*&sort=Employee_Id:ASC"
    ]

    # Directory to save HTML content
    save_directory = 'data'

    async with aiohttp.ClientSession() as session:
        for idx, url in enumerate(urls):
            # Fetch HTML content asynchronously
            html_content = await fetch_html(session, url)

            sess: aiohttp.ClientSession = session

            # print the headers 
            print(sess.headers)

            # Save HTML content to file sequentially
            if html_content is not None:
                filename = f"html_content_{idx}.html"
                os.makedirs(save_directory, exist_ok=True)
                with open(os.path.join(save_directory, filename), 'w', encoding='utf-8') as file:
                    file.write(html_content)
                print(f"HTML content from '{url}' saved as '{filename}'")
            else:
                print(f"Skipping '{url}' due to previous errors.")

if __name__ == "__main__":
    asyncio.run(main())
