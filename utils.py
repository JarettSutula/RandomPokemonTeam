import random

class Pokemon:
    def __init__(self, name, t1, t2):
        self.name = name
        self.t1 = t1
        self.t2 = t2

    def print_poke(self):
        print(f'{self.name:10} - {self.t1:8} {self.t2:8}')

class Pokemon_Team:
    def __init__(self, name, rerolls):
        self.name = name
        self.team = []
        self.rerolls = rerolls

    def print_team(self):
        print(f"{self.name}'s Team:")
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

def grab_three_pokemon(team, dex):
    return_list = []
    temps = []
    # given a list, grab two 'fakes' for loot box style roll and one final pick.
    fake_1 = random.choice(dex)
    temps.append(fake_1)
    return_list.append(fake_1)
    dex.remove(fake_1)

    fake_2 = random.choice(dex)
    temps.append(fake_2)
    dex.remove(fake_2)
    return_list.append(fake_2)

    can_pick_fire_type = True
    for poke in team:
        if poke.t1 == "fire":
            can_pick_fire_type = False
            print("Team already has a fire type.")

    if not can_pick_fire_type:
        for poke in dex:
            if poke.t1 == "fire":
                temps.append(poke)
                print(f'removed {poke.name} from dex for this roll.') 
                dex.remove(poke)    

    pick = random.choice(dex)
    dex.remove(pick)

    return_list.append(pick)

    # place fake picks back into dex!
    for poke in temps:
        dex.append(poke)
    
    # return picks and updated dex.
    return return_list, dex
