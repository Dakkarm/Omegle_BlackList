# Omegle_BlackList

WHAT DOES THIS EXTENSION DO?
- Skips people you don't wanna meet anymore on Omegle.com by blacklisting their IP address
- Blocks the connection with every country in country_blacklist at line 17
- Deletes the annoying logo that omegle puts in front of the people you match with
_________________________________________________________________________

HOW TO USE:
1) Install the "Tampermonkey" extension from https://www.tampermonkey.net/ (Stable version recommended)
2) From the popup menù of Tampermonkey select "Add a new script"
3) Copy and paste the code I provided inside of the tab that Tampermonkey opened
4) Register to https://app.ipgeolocation.io/ and get an API Key
5) Edit the code by adding your own API Key at [line 22] and add/remove country names from country_blacklist at [line 17]
6) Save and you are good to go: everytime you will open https://www.omegle.com the script will be run automatically
___________________________________________________________________________

NOTE:
- The code requires a bit of time to start working perfectly, give it 1 minute and it will be fine 
- If somehow it doesn't work anymore it is probably because you've consumed all your 1000 daily API requests; consider upgrading your plan (or create another account and get a new API Key)
- If you made a mistake by inserting wrong inputs in the code you can go back to the Tampermonkey extension and edit it again, no worries
