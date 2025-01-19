class Pokemon:
    def __init__(self, name, t1, t2):
        self.name = name
        self.t1 = t1
        self.t2 = t2

    def print_poke(self):
        print(f'{self.name} - {self.t1} {self.t2}')

class Pokemon_Team:
    def __init__(self, name):
        self.name = name
        self.team = []

    def print_team(self):
        print(f'{self.name}''s Team:')
        for poke in self.team:
            poke.print_poke()

def fill_list():
    dex_list = []
    do_not_use = ["Name","spiritomb"]
    with open('sinnoh_dex.txt', 'r') as dex:
        for line in dex:
            row = line.rstrip('\n').split(',')
            if row[1] not in do_not_use:
                poke = Pokemon(row[1],row[2],row[3])
                dex_list.append(poke)

    return dex_list

my_dex = fill_list()
for poke in my_dex:
    poke.print_poke()