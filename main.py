from utils import Pokemon
from utils import Pokemon_Team
from utils import fill_list
from utils import grab_three_pokemon
import time

# start with filling the dex
dex = fill_list()

# Team Creation
teams = []
team_num = int(input("How many teams will there be? "))
rerolls = int(input("How many rerolls will each team get? "))

for i in range(team_num):
    name = input("What is Player " + str(i+1) + "'s name? ")
    new_team = Pokemon_Team(name, rerolls)
    teams.append(new_team)

# once teams are created, begin draft loop.
for i in range(6):
    # announce team, round, how many are left.
    print(f'\n========= ROUND {i+1} =========')
    print(f'There are {len(dex)} Pokemon remaining in the pool...')
    filler = input()

    for j in range(len(teams)):
        # announce team
        print(f'With Roll #{j+1} in Round {i+1}, {teams[j].name} rolls...')
        picks, dex = grab_three_pokemon(teams[j].team, dex)
        print(f'{picks[0].name}...')
        # time.sleep(1)
        print(f'{picks[1].name}...')
        # time.sleep(1)
        print(f'{picks[2].name}!')
        teams[j].team.append(picks[2])
        print()
        # time.sleep(2)


print(f'This concludes Team Creation. Results:')
for team in teams:
    team.print_team()
    print()