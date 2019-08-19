
import re

prompts = {
    "what": "What is a Video Game Console?",
    "use": "What are Video Game Consoles used for",
    "around": "Around what time did the first video games come out",
    "when": "When did the NES release in Japan",
    "best": "What is the best selling video game console"
}

responses = {
    "what": "A video game console is a computer device that outputs a video signal or visual image to display a video game that one or more people can play.",
    "use": "Video Game Console are used for video games to run on.",
    "around": "The first video games appeared in the 1960s.",
    "when": "In 1983, Nintendo released the Family Computer/Famicom/NES in America.",
    "best": "The Sony Playstation 2 is the Best Selling Video Game Console"
}

def processInput(userInput):
    userInput = re.sub(r'[^\w\s]', '', userInput)

    words = userInput.split(" ")
    #print(words) 
    matchingKeys = []

    for word in words:
        if word in responses.keys():
            matchingKeys.append(word) 

    if len(matchingKeys) == 0:
        return "I don't know that."
    elif len(matchingKeys) == 1:
        return responses[matchingKeys[0]],
    else:
        print("I am not sure what you mean. Did you mean: ")
        index = 1

        for key in matchingKeys:
            print(str(index) + ": " + prompts[key])
            index += 1

        valid = False
        
        while not valid:
            selected = int(input("#: "))

            if selected <= len(matchingKeys) and selected > 0:
                valid = True
            else:
                print("Please enter one of the above.")
        return responses[matchingKeys[selected - 1]]
def main():
    print("Welcome to Video Game Console Facts! I can talk to you about Video Game Consoles!\n")

    print("Ask me a question or type quit.\n")

    userInput = ""

    while userInput != "quit":
        userInput = input("Whats your question? ").lower()
        #print(useInput)
        if userInput != "quit":
            response = processInput(userInput)
            print(response)

    print("It was good talking to you, bye!")
main()