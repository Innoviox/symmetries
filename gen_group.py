data = {}
n = 0
for i in range(1, 5):
    for j in range(1, 5):
        for k in range(1, 5):
            for l in range(1, 5):
                if len(set([i, j, k, l])) == 4:
                    m = [i, j, k, l]
                    cycles = []
                    used = []
                    for n in range(1, 5):
                        if n in used:
                            continue
                        cycle = []
                        p = n
                        while p not in cycle:
                            cycle.append(p)
                            used.append(p)
                            p = m[p - 1]
                        cycles.append(cycle)
                    s = ''
                    s2 = '#'
                    for q in cycles:
                        s += '(' + ''.join(str(r) for r in q) + ')'
                        s2 += ''.join(str(r) for r in q) + '-'
                    s2 = s2[:-1]
                    
                    d = input(s2 + "? ").split(" ")
                    data[s2] = [list(map(int, d[0])), list(map(int, d[1]))]
                    # print(data)
                    # print(f'<tr><td><button class="sigma" id="{s2}">{s}</button></td></tr>')
print(data)
