import os

config_file_path = "./config.txt"




def _is_line_active(line):
    """
    returns true if the line is not comented or emty
    :param line: the line to chek if active
    :return: true if active false if not
    """
    active = True
    if len(line) == 1: # 1 is 0, 2 is 1
        active = False

    if line[0] == "#":
        active = False

    return active



def get_config_info():

    return_config_dict = {
        "ping_update_delay_seconds": "60",
        "vm_update_delay_seconds": "60",

        "ping_display_delay_seconds":"1",
        "vm_display_delay_seconds":"1",
        "username": " ",
        "password": " ",
        "host": " ",


        "server": [],
        "vm": [],
    }
    config_keys = list(return_config_dict.keys())


    with open(config_file_path, "r") as f:
        config_lines = f.readlines()

    for line in config_lines:
        if _is_line_active(line):
            line = line.strip("\n")
            if not "=" in line:
                # todo: mabye add what line the error is on
                raise Exception("invalid config key")

            key, value = line.split("=", 1)
            if key == "server":
                if not ":" in line:
                    raise Exception("invalid server key")
                server_adress, server_name = value.split(":", 1)
                return_config_dict["server"].append({"server_adress":server_adress, "server_name":server_name})

            elif key == "vm":
                print("LEGG INN HANDLING FOR VM PARAMS")

            else:

                if key not in config_keys:
                    raise Exception("invalid config key")
                else:
                    return_config_dict[key] = value


    return return_config_dict





















