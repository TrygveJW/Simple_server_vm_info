from __future__ import print_function

from pyVim.connect import SmartConnect
from get_config import get_config_info
from pyVmomi import vim

import ssl

config = get_config_info()


uname = config["username"]
password = config["password"]
host = config["host"]

port = 443

"""


"""



class ServerVmAPI:
    def __init__(self):
        self.vm_list = []

    def _get_vm_info(self, vm):
        data_dict = {
            "name": " ",
            "os": " ",
            "ip": " ",
            "state": " ",
        }

        # if this is a group it will have children. if it does, recurse into them
        # and then return
        if hasattr(vm, 'childEntity'):
            vmList = vm.childEntity
            for c in vmList:
                self._get_vm_info(c)
            return

        # if this is a vApp, it likely contains child VMs
        # (vApps can nest vApps, but it is hardly a common usecase, so ignore that)
        if isinstance(vm, vim.VirtualApp):
            vmList = vm.vm
            for c in vmList:
                self._get_vm_info(c)
            return

        summary = vm.summary
        print(summary)


        data_dict["name"] = summary.config.name
        data_dict["os"] = summary.config.guestFullName

        data_dict["state"] = summary.runtime.powerState.strip("powered")

        if summary.guest != None:
            ip = summary.guest.ipAddress
            if ip != None and ip != "" :#and ":" not in ip:
                data_dict["ip"] = ip

        self.vm_list.append(data_dict)

    def get_data(self):
        self.vm_list = []

        context = None
        if hasattr(ssl, '_create_unverified_context'):
            context = ssl._create_unverified_context()

        si = SmartConnect(host=host,
                          user=uname,
                          pwd=password,
                          port=int(port),
                          sslContext=context)

        content = si.RetrieveContent()




        for child in content.rootFolder.childEntity:
            if hasattr(child, 'vmFolder'):
                datacenter = child
                vmFolder = datacenter.vmFolder
                vmList = vmFolder.childEntity
                for vm in vmList:
                    self._get_vm_info(vm)



        exit()

        return self.vm_list






