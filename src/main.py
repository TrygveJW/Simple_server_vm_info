import sys, os, time, subprocess, json


from get_config import get_config_info
from server_ping import ping_server
from server_vm_api import ServerVmAPI


server_status_fp = "src/.tmp/server_status_data.txt"
vm_status_fp = "src/.tmp/vm_status_data.txt"

class ServerMonitor:
    def __init__(self):
        self.config = get_config_info()
        self.vm_api = ServerVmAPI()

        if not os.path.exists("src/.tmp"):
            os.makedirs("src/.tmp")





    def update_server_pings(self):
        save_text = ""
        print("\nINITIATING SERVER PING")
        print("Current timestepp: {}".format(time.time()))
        save_obj = []

        for server in self.config["server"]:
            server_ip = server["server_adress"]
            server_name = server["server_name"]
            server_status = ping_server(server_ip)
            save_data = {
                "name": server["server_name"],
                "status": ping_server(server_ip),
                "ip": server["server_adress"]
            }
            #save_text += "{}${}${}\n".format(server_ip, server_name, server_status)
            save_obj.append(save_data)

            print("{:<10}@{:13}\tSTATUS:{}".format(server_name, server_ip, server_status))

        #print(os.listdir("./"))
        with open(server_status_fp, "w") as f:
            json.dump(save_obj, f)
            #f.write(save_text)

    def update_vm_data(self):
        print("\nINITIATING VM CHEK")

        save_obj = self.vm_api.get_data()
        with open(vm_status_fp, "w") as f:
            json.dump(save_obj, f)



    def run(self):
        last_vm_update = 0
        last_ping_update = 0
        while True:
            if time.time() - last_vm_update > int(self.config["vm_update_delay_seconds"]):
                try:
                    self.update_vm_data()
                except Exception:
                    print("ERROR FETCHING VM DATA")
                else:
                    last_vm_update = time.time()

            if time.time() - last_ping_update > int(self.config["ping_update_delay_seconds"]):
                try:
                    self.update_server_pings()
                except Exception:
                    print("ERROR PINGING SERVERS")
                else:
                    last_ping_update = time.time()




            time.sleep(10)




if __name__ == '__main__':
    server_monitor = ServerMonitor()
    server_monitor.run()
