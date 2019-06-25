import os

def ping_server(serverIp):
    return_code = ""
    res = os.system("ping -c 1 -w2 " + serverIp + " > /dev/null 2>&1")

    if res == 0:
        return_code = "UP"
    else:
        return_code = "DOWN"

    return return_code

