"""RMS e DFT didáticos. Dados sintéticos, não ensaio de sensor."""
import csv,json,math
from pathlib import Path
def analisar(rows):
    t=[float(r['t_s']) for r in rows];x=[float(r['ax_g_demo']) for r in rows];n=len(x);assert n>=4
    step=t[1]-t[0];assert step>0 and all(abs((t[i]-t[i-1])-step)<1e-8 for i in range(1,n))
    fs=1/step;mean=sum(x)/n;center=[v-mean for v in x]
    power={k:sum(v*math.cos(2*math.pi*k*i/n) for i,v in enumerate(center))**2+sum(v*math.sin(2*math.pi*k*i/n) for i,v in enumerate(center))**2 for k in range(1,n//2+1)}
    peak=max(power,key=power.get)
    return {'n':n,'fs_hz':fs,'rms_g_demo':math.sqrt(sum(v*v for v in x)/n),'frequencia_dominante_hz':peak*fs/n,'origem':'sintética'}
if __name__=='__main__':
    with Path(__file__).with_name('sinais_demo.csv').open() as f:print(json.dumps(analisar(list(csv.DictReader(f))),ensure_ascii=False,indent=2))
