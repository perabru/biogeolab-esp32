import csv,json
from pathlib import Path
def pico(rows):
    assert rows
    ordered=sorted(rows,key=lambda r:float(r['comprimento_onda_nm']))
    assert len({r['comprimento_onda_nm'] for r in ordered})==len(ordered)
    peak=max(ordered,key=lambda r:float(r['intensidade_demo']))
    return {'pico_nm':float(peak['comprimento_onda_nm']),'origem':'sintética','interpretacao':'pico didático; sem identificação química ou clínica'}
if __name__=='__main__':
    with Path(__file__).with_name('espectro_demo.csv').open() as f:print(json.dumps(pico(list(csv.DictReader(f))),ensure_ascii=False,indent=2))
