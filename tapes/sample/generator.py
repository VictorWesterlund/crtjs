import random

def rand():
	dec = random.randint(0,255)
	tohex = str(hex(dec).split("x")[-1])

	if(dec < 16):
		tohex = "0" + tohex

	return tohex

def randomColor():
	pixel = rand() + rand() + rand()
	return f"\"#{pixel}\""

# ----

file = open("data.json","a+")
file.write("[")

# 3 Seconds of 64x64px@10fps uncompressed video (~7MB)
for x in range(737280):
	file.write(randomColor() + ",")

file.write(randomColor())
file.write("]")
file.close()