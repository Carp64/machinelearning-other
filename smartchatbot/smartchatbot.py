import requests


responses = {
    "what": "A video game console is a computer device that outputs a video signal or visual image to display a video game that one or more people can play.",
    "use": "Video Game Console are used for video games to run on.",
    "around": "The first video games appeared in the 1960s.",
    "when": "In 1983, Nintendo released the Famicom/NES in Japan.",
    "best": "The Sony Playstation 2 is the Best Selling Video Game Console"
}
# This function will pass your text to the machine learning model
# and return the top result with the highest confidence
def processIntent(intent):
    key = intent["class_name"].lower()
    confidence = intent["confidence"]

    if confidence < 40:
        return "I don't know that or their is a low confidence level in the answer."
        
    if key in responses:
        return "I am " + str(confidence) + "% sure you want to know: " + responses[key]
    else:
        return "I don't know that" 


    

def classify(text):
    key = "ec945ed0-c2b0-11e9-b559-83943ca9801a9b60b2e3-c3bd-4302-aefd-6ab331d2559a"
    url = "https://machinelearningforkids.co.uk/api/scratch/"+ key + "/classify"

    response = requests.get(url, params={ "data" : text })

    if response.ok:
        responseData = response.json()
        topMatch = responseData[0]
        return topMatch
    else:
        response.raise_for_status()

def main():
    print("Welcome to Video Game Console & Games Facts! I can talk to you about Video Game Consoles!\n")

    print("Ask me a question or type quit.\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("Whats your question? ").lower()
        #print(useInput)
        if userInput != "quit":
            intent = classify(userInput)
            response = processIntent(intent)
            print(response)

    print("It was good talking to you, bye!")
main()

#response = classify("What is the best selling game console")
#print(response) 
