prompts = {
    "what": "What is a Video Game Console?",
    "use": "What are Video Game Consoles used for?",
    "around": "Around what time did the first video games come out.",
    "when": "When did the NES release.",
    "best": "What is the best selling video game console."
}

response = {
    "what": "A video game console is a computer device that outputs a video signal or visual image to display a video game that one or more people can play.",
    "use": ""
    "around": "The first video games appeared in the 1960s."
    "when": ""
}

def processInput(userInput):
    pass

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