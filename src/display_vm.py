import time, os, math, json

from colored import fg, bg, attr



row_sep_1_2 = "┃"
row_sep_3 = "╋"

row_inter_sep_1_2 = "│"
row_inter_sep_3 = "┿"

row_end_1_2 = "│"
row_end_3 = "┥"

horizontal_la = "━"

horisont_sm = "─"

top_l = "┍"
top_sep_sm = "┯"
top_sep_la = "┳"
top_r = "┑"

btm_l = "┕"
btm_sep_sm = "┷"
btm_sep_la = "┻"
btm_r = "┙"

update_delay = 3


def _make_box(row_content, name_len):

    box_line1 = "│"
    box_line2 = "│"
    box_line3 = "┝"

    num_items = len(row_content)

    for data in row_content:
        name = data["name"] if len(data["name"]) <= name_len else data["name"][:name_len - 2] + ".."

        dt1 = "ID: {:<" + str(name_len) + "} "
        dt2 = "IP: {:<" + str(name_len) + "} "

        box_line1 += dt1.format(name)
        box_line2 += dt2.format(data["ip"])
        box_line3 += f"{horizontal_la * (name_len + 5)}"

        status = data['state']
        color = ""
        if status == "On":
            color = fg("white") + bg("green")# + attr("bold")
        elif status == "Off":
            color = fg("white") + bg("red")# + attr("bold")


        box_line1 += f"{row_inter_sep_1_2}{color}Status:  {attr('reset')}{row_sep_1_2}"
        box_line2 += f"{row_inter_sep_1_2}{color}{status:<9}{attr('reset')}{row_sep_1_2}"
        box_line3 += f"{row_inter_sep_3}{horizontal_la * 9}{row_sep_3}"

    box_line1 = box_line1[:-1] + row_end_1_2
    box_line2 = box_line2[:-1] + row_end_1_2
    box_line3 = box_line3[:-1] + row_end_3

    return box_line1, box_line2, box_line3



def _make_closing_bars(num_cols, cell_width):
    unit_top = f"{horizontal_la * (cell_width + 5)}{top_sep_sm}{horizontal_la * 9}{top_sep_la}"
    unit_btm = f"{horizontal_la * (cell_width + 5)}{btm_sep_sm}{horizontal_la * 9}{btm_sep_la}"

    top_line = top_l + (unit_top * num_cols)[:-1] + top_r
    bottom_line = btm_l + (unit_btm * num_cols)[:-1] + btm_r

    return top_line, bottom_line

def draw_table(data, name_width, last_index):


    rows, columns = os.popen('stty size', 'r').read().split()
    unit_width = 16 + name_width
    num_cols = math.floor((int(columns)-1) / unit_width)
    num_cols = num_cols if num_cols > 0 else 1

    top_bar, btm_bar = _make_closing_bars(num_cols, name_width)



    '''
    
    num_full_rows = math.ceil(len(data)/num_cols)
    tmp = data.copy()
    
    while len(tmp)%num_cols != 0:
        tmp.append({"name": " ", "ip": " ", "state": " "})

    display_row_data_list = []

    for n in range(num_full_rows-1):
        blk = []
        for n in range(num_cols):
            blk.append(tmp.pop(0))

        display_row_data_list.append(blk)

    display_row_data_list.append(tmp)
    '''

    display_data = []

    for n in range(num_cols):
        #if last_index + 1 > len(data) - 1:
        #    last_index = 0

        display_data.append(data[last_index % len(data)])
        last_index = last_index + 1


    #
    # display
    #
    #print("\n\n\n\n\n\n\n\n\n\n")

    #print(top_bar)
    #for display_row in display_row_data_list[:-1]:
    #    r1, r2, r3, = _make_box(display_row, name_width)
    #    print(r1)
    #    print(r2)
    #    print(r3)

    r1, r2, r3 = _make_box(display_data, name_width)
    print(r3)
    print(r1)
    print(r2)

    print(btm_bar, end="\r")

    return last_index





def read_data():
    try:
        with open("src/.tmp/vm_status_data.txt") as f:
            js_data = json.load(f)
    except Exception:
        pass

    return js_data



def main():
    last_index = 0
    while True:

        last_index = draw_table(read_data(), 15, last_index)
        time.sleep(update_delay)


if __name__ == '__main__':
    main()